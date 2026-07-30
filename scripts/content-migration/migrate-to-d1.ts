/**
 * Myelektra Business Data Migration Script
 * 
 * Purpose: Seed initial business data into Cloudflare D1
 * 
 * NOTE: Editorial content (pages, navigation, solutions, industries, etc.)
 * is managed by TinaCMS + Git. This script only seeds BUSINESS DATA.
 * 
 * Usage:
 *   npx wrangler d1 execute myelektra-business --file=./d1-schema.sql
 *   npx tsx scripts/content-migration/migrate-to-d1.ts
 * 
 * Environment Variables:
 *   CLOUDFLARE_ACCOUNT_ID - Cloudflare account ID
 *   CLOUDFLARE_API_TOKEN - Cloudflare API token
 *   D1_DATABASE_ID - D1 database ID (business data database)
 */

import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// =============================================================================
// Types
// =============================================================================

interface MigrationResult {
  table: string;
  inserted: number;
  errors: string[];
}

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  is_enabled: boolean;
  rollout_percentage: number;
  target_roles: string[];
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
}

// Note: Editorial content (pages, navigation, solutions, industries, etc.)
// is managed by TinaCMS + Git, not D1. This script only handles business data.

// =============================================================================
// D1 Client
// =============================================================================

class D1Client {
  private accountId: string;
  private apiToken: string;
  private databaseId: string;

  constructor() {
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '';
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN || '';
    this.databaseId = process.env.D1_DATABASE_ID || '';

    if (!this.accountId || !this.apiToken || !this.databaseId) {
      throw new Error('Missing required environment variables: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, D1_DATABASE_ID');
    }
  }

  async execute(sql: string, params?: unknown[]): Promise<{ results: unknown[]; success: boolean }> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/d1/database/${this.databaseId}/query`;
    
    const body = params 
      ? { sql, params }
      : { sql };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json() as { success: boolean; result?: { results: unknown[] }; errors?: Array<{ message: string }> };
    
    if (!data.success) {
      throw new Error(`D1 query failed: ${data.errors?.map(e => e.message).join(', ')}`);
    }

    return {
      results: data.result?.results || [],
      success: data.success,
    };
  }
}

// =============================================================================
// Migration Functions
// =============================================================================

function escapeString(value: string): string {
  return value.replace(/'/g, "''");
}

function escapeJson(value: unknown): string {
  return escapeString(JSON.stringify(value));
}

async function migrateFeatureFlags(client: D1Client): Promise<MigrationResult> {
  const result: MigrationResult = { table: 'feature_flags', inserted: 0, errors: [] };
  
  const flags: FeatureFlag[] = [
    {
      id: 'workspace-presentation',
      name: 'Presentation Viewer',
      description: 'Enable the presentation viewer in sales workspace',
      is_enabled: false,
      rollout_percentage: 0,
      target_roles: ['admin', 'sales']
    },
    {
      id: 'workspace-proposal',
      name: 'Proposal Generator',
      description: 'Enable the proposal generator in sales workspace',
      is_enabled: false,
      rollout_percentage: 0,
      target_roles: ['admin', 'sales']
    },
    {
      id: 'workspace-calculator',
      name: 'ROI Calculator',
      description: 'Enable the ROI calculator in sales workspace',
      is_enabled: true,
      rollout_percentage: 100,
      target_roles: ['admin', 'sales', 'marketing']
    },
    {
      id: 'workspace-playbook',
      name: 'Sales Playbook',
      description: 'Enable the sales playbook in sales workspace',
      is_enabled: false,
      rollout_percentage: 0,
      target_roles: ['admin', 'sales']
    },
    {
      id: 'mic-ai-suggestions',
      name: 'AI Suggestions',
      description: 'Enable AI-powered suggestions in MIC',
      is_enabled: false,
      rollout_percentage: 0,
      target_roles: ['admin']
    },
    {
      id: 'analytics-dashboard',
      name: 'Analytics Dashboard',
      description: 'Enable the analytics dashboard',
      is_enabled: true,
      rollout_percentage: 100,
      target_roles: ['admin', 'marketing']
    }
  ];
  
  try {
    for (const flag of flags) {
      const sql = `
        INSERT OR REPLACE INTO feature_flags (id, name, description, is_enabled, rollout_percentage, target_roles, updated_at)
        VALUES (
          '${escapeString(flag.id)}',
          '${escapeString(flag.name)}',
          '${escapeString(flag.description)}',
          ${flag.is_enabled ? 1 : 0},
          ${flag.rollout_percentage},
          '${escapeJson(flag.target_roles)}',
          datetime('now')
        )
      `;
      
      await client.execute(sql);
      result.inserted++;
    }
  } catch (error) {
    result.errors.push(`Feature flags migration failed: ${error}`);
  }
  
  return result;
}

async function migrateDefaultUsers(client: D1Client): Promise<MigrationResult> {
  const result: MigrationResult = { table: 'users', inserted: 0, errors: [] };
  
  const users: User[] = [
    {
      id: 'admin-001',
      email: 'admin@myelektra.com',
      name: 'System Admin',
      role: 'admin',
      is_active: true
    }
  ];
  
  try {
    for (const user of users) {
      const sql = `
        INSERT OR REPLACE INTO users (id, email, name, role, is_active, updated_at)
        VALUES (
          '${escapeString(user.id)}',
          '${escapeString(user.email)}',
          '${escapeString(user.name)}',
          '${escapeString(user.role)}',
          ${user.is_active ? 1 : 0},
          datetime('now')
        )
      `;
      
      await client.execute(sql);
      result.inserted++;
    }
  } catch (error) {
    result.errors.push(`Users migration failed: ${error}`);
  }
  
  return result;
}

async function verifySchema(client: D1Client): Promise<{ tables: string[]; errors: string[] }> {
  const result = { tables: [] as string[], errors: [] as string[] };
  
  try {
    const sql = "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'";
    const response = await client.execute(sql);
    
    if (response.results && Array.isArray(response.results)) {
      result.tables = response.results.map((row: unknown) => (row as { name: string }).name);
    }
  } catch (error) {
    result.errors.push(`Schema verification failed: ${error}`);
  }
  
  return result;
}

// =============================================================================
// Main Migration
// =============================================================================

async function runMigration(): Promise<void> {
  console.log('🚀 Starting Myelektra Business Data Migration to D1...\n');
  console.log('📝 Note: Editorial content is managed by TinaCMS + Git\n');
  
  const client = new D1Client();
  const results: MigrationResult[] = [];
  
  // Run migrations in sequence
  const migrations = [
    () => migrateFeatureFlags(client),
    () => migrateDefaultUsers(client),
  ];
  
  for (const migration of migrations) {
    const result = await migration();
    results.push(result);
    
    if (result.errors.length > 0) {
      console.error(`❌ ${result.table}: ${result.errors.join(', ')}`);
    } else {
      console.log(`✅ ${result.table}: ${result.inserted} records inserted`);
    }
  }
  
  // Verify schema
  console.log('\n🔍 Verifying schema...');
  const schemaCheck = await verifySchema(client);
  
  if (schemaCheck.errors.length > 0) {
    console.error('❌ Schema verification failed:', schemaCheck.errors);
  } else {
    console.log('✅ Schema tables found:', schemaCheck.tables.join(', '));
  }
  
  // Summary
  console.log('\n📊 Migration Summary:');
  console.log('─'.repeat(50));
  
  let totalInserted = 0;
  let totalErrors = 0;
  
  for (const result of results) {
    totalInserted += result.inserted;
    totalErrors += result.errors.length;
  }
  
  console.log(`Total records inserted: ${totalInserted}`);
  console.log(`Total errors: ${totalErrors}`);
  
  console.log('\n📋 Architecture Reminder:');
  console.log('   Content Layer: TinaCMS + Git (editorial content)');
  console.log('   Business Layer: D1 (this database)');
  
  if (totalErrors === 0) {
    console.log('\n✅ Migration completed successfully!');
  } else {
    console.log('\n⚠️  Migration completed with errors. Please check the logs above.');
    process.exit(1);
  }
}

// =============================================================================
// Entry Point
// =============================================================================

runMigration().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
