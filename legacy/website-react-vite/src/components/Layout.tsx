import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ArrowUpIcon, CloseIcon } from './Icons';
import { useScrollReveal } from './ScrollReveal';
import { globalConfig } from '../data/content';

export const Layout: React.FC = () => {
  const [showFloating, setShowFloating] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [floatingDismissed, setFloatingDismissed] = useState(false);
  const location = useLocation();
  const g = globalConfig;

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowFloating(y > (g.floatingCta.showAfterScrollPx || 600) && !floatingDismissed);
      setShowBackToTop(y > (g.backToTop.showAfterScrollPx || 500));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [floatingDismissed, g.floatingCta.showAfterScrollPx, g.backToTop.showAfterScrollPx]);

  useEffect(() => {
    const dismissed = localStorage.getItem('cookie-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShowCookie(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dismissCookie = () => {
    setShowCookie(false);
    localStorage.setItem('cookie-dismissed', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Floating CTA */}
      <div className={`floating-cta${showFloating ? ' show' : ''}`}>
        <div className="floating-cta-inner">
          <p className="hide-mobile" style={{ color: 'var(--text-dark)', fontSize: 14 }}>
            {g.floatingCta.text}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            <Link to={g.floatingCta.buttonPath} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
              {g.floatingCta.buttonLabel}
            </Link>
            <button
              onClick={() => setFloatingDismissed(true)}
              style={{ color: 'rgba(232,236,241,0.5)', padding: 4 }}
              aria-label="Dismiss"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`back-to-top${showBackToTop ? ' show' : ''}`}
        aria-label="Back to top"
      >
        <ArrowUpIcon size={18} />
      </button>

      {/* Cookie Banner */}
      {showCookie && (
        <div className="cookie-banner" style={{ display: 'block' }}>
          <div className="cookie-inner">
            <p className="cookie-text">
              {g.cookieBanner.text}
            </p>
            <div className="cookie-buttons">
              <button onClick={dismissCookie} className="cookie-accept">{g.cookieBanner.acceptLabel}</button>
              <button onClick={dismissCookie} className="cookie-learn">{g.cookieBanner.learnMoreLabel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
