-- =============================================================================
-- Myelektra Platform - D1 Database Schema (Business Data Only)
-- =============================================================================
-- Purpose: Store operational and business data for MIC, Workspace, Analytics
-- Target: Cloudflare D1 (SQLite-compatible)
-- Version: 2.0
-- 
-- NOTE: Editorial content (pages, navigation, solutions, industries, etc.)
-- is managed by TinaCMS + Git. This schema is for BUSINESS DATA ONLY.
--
-- Architecture:
--   Content Layer: TinaCMS + Git + Markdown/MDX
--   Business Layer: Cloudflare D1 (this schema)
-- =============================================================================

-- =============================================================================
-- MIC (Myelektra Intelligence Console) TABLES
-- =============================================================================

-- Companies tracked by MIC
CREATE TABLE IF NOT EXISTS mic_companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  size TEXT, -- 'small', 'medium', 'enterprise'
  country TEXT,
  city TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  logo_url TEXT,
  description TEXT,
  tags JSON, -- Array of tags
  icp_score INTEGER DEFAULT 0, -- Ideal Customer Profile score 0-100
  status TEXT DEFAULT 'prospect', -- 'prospect', 'contacted', 'qualified', 'opportunity', 'customer', 'churned'
  source TEXT, -- 'manual', 'import', 'hubspot', 'ai-suggestion'
  hubspot_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mic_companies_domain ON mic_companies(domain);
CREATE INDEX IF NOT EXISTS idx_mic_companies_industry ON mic_companies(industry);
CREATE INDEX IF NOT EXISTS idx_mic_companies_status ON mic_companies(status);
CREATE INDEX IF NOT EXISTS idx_mic_companies_country ON mic_companies(country);

-- Contacts / Decision Makers
CREATE TABLE IF NOT EXISTS mic_contacts (
  id TEXT PRIMARY KEY,
  company_id TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  title TEXT,
  department TEXT,
  seniority TEXT, -- 'c-level', 'vp', 'director', 'manager', 'individual'
  persona TEXT, -- Buyer persona identifier
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'responded', 'meeting-booked', 'qualified', 'disqualified'
  lead_score INTEGER DEFAULT 0,
  hubspot_contact_id TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES mic_companies(id)
);

CREATE INDEX IF NOT EXISTS idx_mic_contacts_company ON mic_contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_mic_contacts_email ON mic_contacts(email);
CREATE INDEX IF NOT EXISTS idx_mic_contacts_status ON mic_contacts(status);
CREATE INDEX IF NOT EXISTS idx_mic_contacts_persona ON mic_contacts(persona);

-- Deal Pipeline
CREATE TABLE IF NOT EXISTS mic_deals (
  id TEXT PRIMARY KEY,
  company_id TEXT,
  contact_id TEXT,
  title TEXT NOT NULL,
  value REAL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  stage TEXT DEFAULT 'prospecting', -- 'prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'
  probability INTEGER DEFAULT 10, -- Win probability 0-100
  expected_close_date DATE,
  actual_close_date DATE,
  solution_id TEXT, -- Reference to solution being sold
  assigned_to TEXT,
  hubspot_deal_id TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES mic_companies(id),
  FOREIGN KEY (contact_id) REFERENCES mic_contacts(id)
);

CREATE INDEX IF NOT EXISTS idx_mic_deals_company ON mic_deals(company_id);
CREATE INDEX IF NOT EXISTS idx_mic_deals_stage ON mic_deals(stage);
CREATE INDEX IF NOT EXISTS idx_mic_deals_assigned ON mic_deals(assigned_to);

-- Activities / Interactions
CREATE TABLE IF NOT EXISTS mic_activities (
  id TEXT PRIMARY KEY,
  contact_id TEXT,
  company_id TEXT,
  deal_id TEXT,
  type TEXT NOT NULL, -- 'email', 'call', 'meeting', 'linkedin', 'note', 'task'
  direction TEXT, -- 'inbound', 'outbound'
  subject TEXT,
  body TEXT,
  outcome TEXT, -- 'positive', 'neutral', 'negative', 'no-response'
  next_action TEXT,
  scheduled_at DATETIME,
  completed_at DATETIME,
  hubspot_activity_id TEXT,
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_id) REFERENCES mic_contacts(id),
  FOREIGN KEY (company_id) REFERENCES mic_companies(id),
  FOREIGN KEY (deal_id) REFERENCES mic_deals(id)
);

CREATE INDEX IF NOT EXISTS idx_mic_activities_contact ON mic_activities(contact_id);
CREATE INDEX IF NOT EXISTS idx_mic_activities_type ON mic_activities(type);
CREATE INDEX IF NOT EXISTS idx_mic_activities_scheduled ON mic_activities(scheduled_at);

-- Revenue Metrics (aggregated data)
CREATE TABLE IF NOT EXISTS mic_revenue_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL, -- '2024-01', '2024-Q1', '2024'
  metric_type TEXT NOT NULL, -- 'mrr', 'arr', 'ltv', 'cac', 'churn-rate', 'pipeline-value'
  value REAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  metadata JSON, -- Additional context
  calculated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(period, metric_type)
);

CREATE INDEX IF NOT EXISTS idx_mic_revenue_period ON mic_revenue_metrics(period);

-- =============================================================================
-- SALES WORKSPACE TABLES
-- =============================================================================

-- Presentations
CREATE TABLE IF NOT EXISTS workspace_presentations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL, -- R2 or external URL
  file_type TEXT NOT NULL, -- 'pdf', 'pptx', 'key'
  file_size INTEGER,
  thumbnail_url TEXT,
  category TEXT, -- 'company-overview', 'solution-specific', 'industry-specific', 'custom'
  solution_id TEXT, -- Reference to solution if applicable
  version INTEGER DEFAULT 1,
  is_public BOOLEAN DEFAULT 0, -- Whether visible to all sales users
  created_by TEXT,
  view_count INTEGER DEFAULT 0,
  last_viewed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_workspace_presentations_category ON workspace_presentations(category);
CREATE INDEX IF NOT EXISTS idx_workspace_presentations_solution ON workspace_presentations(solution_id);

-- Proposals
CREATE TABLE IF NOT EXISTS workspace_proposals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  company_id TEXT,
  contact_id TEXT,
  deal_id TEXT,
  content JSON NOT NULL, -- Proposal sections and content
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'viewed', 'accepted', 'rejected'
  valid_until DATE,
  sent_at DATETIME,
  viewed_at DATETIME,
  accepted_at DATETIME,
  pdf_url TEXT, -- Generated PDF URL
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES mic_companies(id),
  FOREIGN KEY (contact_id) REFERENCES mic_contacts(id),
  FOREIGN KEY (deal_id) REFERENCES mic_deals(id)
);

CREATE INDEX IF NOT EXISTS idx_workspace_proposals_company ON workspace_proposals(company_id);
CREATE INDEX IF NOT EXISTS idx_workspace_proposals_status ON workspace_proposals(status);

-- Calculator Configurations (ROI Calculator)
CREATE TABLE IF NOT EXISTS workspace_calculators (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  config JSON NOT NULL, -- Calculator fields, formulas, defaults
  is_active BOOLEAN DEFAULT 1,
  usage_count INTEGER DEFAULT 0,
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sales Playbooks
CREATE TABLE IF NOT EXISTS workspace_playbooks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content JSON NOT NULL, -- Playbook sections, scripts, objection handling
  category TEXT, -- 'outbound', 'inbound', 'discovery', 'demo', 'negotiation'
  target_persona TEXT,
  is_active BOOLEAN DEFAULT 1,
  version INTEGER DEFAULT 1,
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_workspace_playbooks_category ON workspace_playbooks(category);

-- =============================================================================
-- ANALYTICS TABLES
-- =============================================================================

-- Page Views (aggregated)
CREATE TABLE IF NOT EXISTS analytics_page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  unique_visitors INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  bounce_rate REAL DEFAULT 0,
  avg_time_on_page REAL DEFAULT 0, -- seconds
  source TEXT, -- 'organic', 'direct', 'referral', 'social', 'paid'
  medium TEXT,
  campaign TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, page_path, source)
);

CREATE INDEX IF NOT EXISTS idx_analytics_page_views_date ON analytics_page_views(date);
CREATE INDEX IF NOT EXISTS idx_analytics_page_views_path ON analytics_page_views(page_path);

-- Events (custom tracking)
CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_name TEXT NOT NULL,
  event_category TEXT,
  event_label TEXT,
  event_value REAL,
  page_path TEXT,
  user_id TEXT,
  session_id TEXT,
  metadata JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_date ON analytics_events(created_at);

-- Conversions
CREATE TABLE IF NOT EXISTS analytics_conversions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversion_type TEXT NOT NULL, -- 'form-submission', 'meeting-booked', 'quote-request', 'demo-request'
  source TEXT,
  medium TEXT,
  campaign TEXT,
  page_path TEXT,
  contact_id TEXT,
  company_id TEXT,
  value REAL, -- Estimated conversion value
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_id) REFERENCES mic_contacts(id),
  FOREIGN KEY (company_id) REFERENCES mic_companies(id)
);

CREATE INDEX IF NOT EXISTS idx_analytics_conversions_type ON analytics_conversions(conversion_type);
CREATE INDEX IF NOT EXISTS idx_analytics_conversions_date ON analytics_conversions(created_at);

-- =============================================================================
-- USER MANAGEMENT TABLES
-- =============================================================================

-- Users (internal team members)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- 'admin', 'sales', 'marketing', 'viewer'
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- User Sessions
CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(token);

-- =============================================================================
-- FEATURE FLAGS TABLES
-- =============================================================================

-- Feature Flags
CREATE TABLE IF NOT EXISTS feature_flags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_enabled BOOLEAN DEFAULT 0,
  rollout_percentage INTEGER DEFAULT 0, -- 0-100
  target_roles JSON, -- Array of roles that can see this feature
  target_users JSON, -- Array of specific user IDs
  metadata JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feature_flags_name ON feature_flags(name);

-- Feature Flag Evaluations (audit log)
CREATE TABLE IF NOT EXISTS feature_flag_evaluations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flag_id TEXT NOT NULL,
  user_id TEXT,
  is_enabled BOOLEAN,
  reason TEXT, -- 'default', 'rollout', 'role', 'user', 'override'
  evaluated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (flag_id) REFERENCES feature_flags(id)
);

CREATE INDEX IF NOT EXISTS idx_feature_flag_evaluations_flag ON feature_flag_evaluations(flag_id);

-- =============================================================================
-- INTEGRATION TABLES
-- =============================================================================

-- HubSpot Sync Log
CREATE TABLE IF NOT EXISTS integration_hubspot_sync (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_type TEXT NOT NULL, -- 'contact', 'company', 'deal', 'activity'
  entity_id TEXT NOT NULL,
  hubspot_id TEXT,
  sync_direction TEXT NOT NULL, -- 'push', 'pull'
  sync_status TEXT NOT NULL, -- 'pending', 'success', 'failed'
  error_message TEXT,
  synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hubspot_sync_entity ON integration_hubspot_sync(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_hubspot_sync_status ON integration_hubspot_sync(sync_status);

-- API Request Logs
CREATE TABLE IF NOT EXISTS integration_api_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service TEXT NOT NULL, -- 'hubspot', 'tina', 'internal'
  method TEXT NOT NULL, -- 'GET', 'POST', 'PUT', 'DELETE'
  endpoint TEXT NOT NULL,
  status_code INTEGER,
  request_body JSON,
  response_body JSON,
  duration_ms INTEGER,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_api_logs_service ON integration_api_logs(service);
CREATE INDEX IF NOT EXISTS idx_api_logs_created ON integration_api_logs(created_at);

-- =============================================================================
-- SEED DATA: Default Feature Flags
-- =============================================================================

INSERT INTO feature_flags (id, name, description, is_enabled, rollout_percentage, target_roles)
VALUES 
  ('workspace-presentation', 'Presentation Viewer', 'Enable the presentation viewer in sales workspace', 0, 0, '["admin", "sales"]'),
  ('workspace-proposal', 'Proposal Generator', 'Enable the proposal generator in sales workspace', 0, 0, '["admin", "sales"]'),
  ('workspace-calculator', 'ROI Calculator', 'Enable the ROI calculator in sales workspace', 1, 100, '["admin", "sales", "marketing"]'),
  ('workspace-playbook', 'Sales Playbook', 'Enable the sales playbook in sales workspace', 0, 0, '["admin", "sales"]'),
  ('mic-ai-suggestions', 'AI Suggestions', 'Enable AI-powered suggestions in MIC', 0, 0, '["admin"]'),
  ('analytics-dashboard', 'Analytics Dashboard', 'Enable the analytics dashboard', 1, 100, '["admin", "marketing"]');

-- =============================================================================
-- SEED DATA: Default Admin User
-- =============================================================================

INSERT INTO users (id, email, name, role, is_active)
VALUES (
  'admin-001',
  'admin@myelektra.com',
  'System Admin',
  'admin',
  1
);

-- =============================================================================
-- VIEWS: Useful query views
-- =============================================================================

-- View: Active deals in pipeline
CREATE VIEW IF NOT EXISTS v_active_deals AS
SELECT 
  d.*,
  c.name as company_name,
  ct.first_name || ' ' || ct.last_name as contact_name
FROM mic_deals d
LEFT JOIN mic_companies c ON d.company_id = c.id
LEFT JOIN mic_contacts ct ON d.contact_id = ct.id
WHERE d.stage NOT IN ('closed-won', 'closed-lost')
ORDER BY d.expected_close_date;

-- View: Recent activities
CREATE VIEW IF NOT EXISTS v_recent_activities AS
SELECT 
  a.*,
  ct.first_name || ' ' || ct.last_name as contact_name,
  c.name as company_name
FROM mic_activities a
LEFT JOIN mic_contacts ct ON a.contact_id = ct.id
LEFT JOIN mic_companies c ON a.company_id = c.id
ORDER BY a.created_at DESC
LIMIT 100;

-- View: Enabled feature flags
CREATE VIEW IF NOT EXISTS v_enabled_features AS
SELECT id, name, description, rollout_percentage, target_roles
FROM feature_flags
WHERE is_enabled = 1;

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
