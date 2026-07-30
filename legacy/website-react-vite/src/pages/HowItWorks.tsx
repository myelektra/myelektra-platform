import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ArrowRightIcon } from '../components/Icons';
import { processSteps, howItWorksConfig } from '../data/content';

const HowItWorks: React.FC = () => {
  const c = howItWorksConfig;
  return (
    <div>
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.hero.headline}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={1}>
            <p className="text-text-secondary text-lg max-w-2xl">
              {c.hero.subtitle}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {processSteps.map((step, i) => (
              <AnimateOnScroll key={step.number} stagger={i + 1}>
                <div className="flex gap-6 lg:gap-8 mb-12 last:mb-0">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal to-blue rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-teal/20">
                      <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-mono)' }}>
                        {String(step.number).padStart(2, '0')}
                      </span>
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-teal/40 via-blue/20 to-transparent mt-3 min-h-[40px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-4 flex-1">
                    <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      {step.title}
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-4">{step.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/5 border border-teal/20 rounded-lg">
                      <span className="text-teal text-xs font-bold uppercase tracking-wider">{c.outputLabel}</span>
                      <span className="w-px h-4 bg-teal/30" />
                      <span className="text-text-primary text-sm font-medium">{step.output}</span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Visual */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.summaryHeadline}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={1}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {processSteps.map((step, i) => (
                <div key={step.number} className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-white rounded-lg border border-border shadow-sm">
                    <span className="text-teal font-bold text-sm" style={{ fontFamily: 'var(--font-mono)' }}>{String(step.number).padStart(2, '0')}</span>
                    <span className="text-text-primary text-sm font-medium ml-2">{step.title}</span>
                  </div>
                  {i < processSteps.length - 1 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-teal shrink-0 hidden sm:block">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </AnimateOnScroll>
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

export default HowItWorks;
