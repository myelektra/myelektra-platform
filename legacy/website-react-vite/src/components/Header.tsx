import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from './Icons';
import { solutions, navigationConfig } from '../data/content';

const navLinks = navigationConfig.desktop.map((link: any) => {
  if (link.submenu && link.label === 'Solutions') {
    return {
      ...link,
      submenu: solutions.map(s => ({ label: s.name, path: `/solutions/${s.id}` }))
    };
  }
  return link;
});

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileSubmenuOpen(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setDropdownOpen(false); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="logo-link" aria-label="Myelektra Home">
            <img src="https://files.catbox.moe/ih1ryw.png" alt="Myelektra" style={{ height: 28, width: 'auto', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ color: '#000', fontSize: 28, lineHeight: 1 }}>myelektra</span><span style={{ color: '#1877F2', fontSize: 14, lineHeight: 1 }}>.com</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="nav-dropdown"
                onMouseEnter={() => link.submenu && setDropdownOpen(true)}
                onMouseLeave={() => link.submenu && setDropdownOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`nav-link${isActive(link.path) ? ' active-teal' : ''}`}
                >
                  {link.label}
                  {link.submenu && <ChevronDownIcon size={14} />}
                </Link>
                {link.submenu && dropdownOpen && (
                  <div className="nav-dropdown-menu">
                    {link.submenu.map((item: any) => (
                      <Link key={item.path} to={item.path} className="dropdown-item">
                        {item.label}
                        <ChevronRightIcon size={14} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Link to={navigationConfig.headerCtaPath} className="header-cta">{navigationConfig.headerCta}</Link>

          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay${mobileOpen ? ' open' : ''}`}>
        <nav className="mobile-nav-inner" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <div key={link.path}>
              {link.submenu ? (
                <>
                  <button
                    onClick={() => setMobileSubmenuOpen(
                      mobileSubmenuOpen === link.path ? null : link.path
                    )}
                    className="mobile-submenu-toggle"
                  >
                    {link.label}
                    <ChevronDownIcon
                      size={18}
                      className={`transition-transform ${mobileSubmenuOpen === link.path ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileSubmenuOpen === link.path && (
                    <div className="mobile-submenu">
                      {link.submenu.map((item) => (
                        <Link key={item.path} to={item.path}>{item.label}</Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`mobile-nav-link${isActive(link.path) ? ' active' : ''}`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mobile-divider">
            <Link to={navigationConfig.headerCtaPath} className="mobile-cta">{navigationConfig.headerCta}</Link>
          </div>
        </nav>
      </div>
    </>
  );
};
