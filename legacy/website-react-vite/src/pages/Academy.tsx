import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ArrowRightIcon, CheckIcon, GradCapIcon } from '../components/Icons';
import { academyTopics, academyConfig } from '../data/content';

const Academy: React.FC = () => {
  const c = academyConfig;
  return (
    <div>
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center mb-6">
              <GradCapIcon size={32} className="text-teal" />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={1}>
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.hero.headline}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={2}>
            <p className="text-teal text-xl font-semibold mb-4">{c.hero.subheadline}</p>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={3}>
            <p className="text-text-secondary text-lg max-w-2xl">
              {c.hero.description}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Training Topics */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.topicsHeadline}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={1}>
            <p className="text-text-secondary mb-10 max-w-2xl">
              {c.topicsSubtitle}
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {academyTopics.map((topic, i) => (
              <AnimateOnScroll key={topic} stagger={i + 1}>
                <div className="flex items-start gap-4 bg-bg-light rounded-xl p-5 border border-border/50 card-hover">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal to-blue rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-base">{topic}</h3>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.pricingHeadline}
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <AnimateOnScroll stagger={1}>
              <div className="bg-white rounded-2xl p-8 border border-border shadow-sm card-hover">
                <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-primary text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {c.publicClasses.name}
                </h3>
                <p className="text-teal font-bold text-2xl mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{c.publicClasses.price}</p>
                <p className="text-text-secondary text-sm mb-6">{c.publicClasses.priceDetail}</p>
                <ul className="space-y-2 mb-6">
                  {c.publicClasses.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 text-text-secondary text-sm">
                      <CheckIcon size={16} className="text-teal shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={c.publicClasses.ctaPath}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue text-white font-semibold text-sm rounded-lg hover:bg-blue-hover transition-colors btn-transition"
                >
                  {c.publicClasses.cta}
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll stagger={2}>
              <div className="bg-white rounded-2xl p-8 border border-border shadow-sm card-hover ring-2 ring-gold/50 relative">
                <span className="absolute -top-3 right-6 px-3 py-1 bg-gold text-navy-dark text-xs font-bold rounded-full">
                  {c.corporateTraining.badge}
                </span>
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                    <path d="M2 20h20" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 20V8l5 4V8l5 4V4h3a2 2 0 0 1 2 2v14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-primary text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {c.corporateTraining.name}
                </h3>
                <p className="text-teal font-bold text-2xl mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{c.corporateTraining.price}</p>
                <p className="text-text-secondary text-sm mb-6">{c.corporateTraining.priceDetail}</p>
                <ul className="space-y-2 mb-6">
                  {c.corporateTraining.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 text-text-secondary text-sm">
                      <CheckIcon size={16} className="text-teal shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={c.corporateTraining.ctaPath}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-teal text-white font-semibold text-sm rounded-lg hover:bg-teal-hover transition-colors btn-transition"
                >
                  {c.corporateTraining.cta}
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-dark py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.cta.headline}
            </h2>
            <p className="text-text-dark/60 mb-8 max-w-xl mx-auto">
              {c.cta.body}
            </p>
            <Link
              to={c.cta.buttonPath}
              className="inline-flex items-center px-8 py-4 bg-teal text-white font-bold text-lg rounded-lg hover:bg-teal-hover transition-colors btn-transition shadow-lg shadow-teal/25"
            >
              {c.cta.buttonLabel}
              <ArrowRightIcon size={20} className="ml-2" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
};

export default Academy;
