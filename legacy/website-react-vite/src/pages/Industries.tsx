import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ArrowRightIcon, industryIconMap } from '../components/Icons';
import { industries, industriesPageConfig } from '../data/content';

const Industries: React.FC = () => {
  const c = industriesPageConfig;
  return (
    <div>
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Industries Detail */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {industries.map((ind, i) => {
            const IconComponent = industryIconMap[ind.icon];
            return (
              <AnimateOnScroll key={ind.id} stagger={i + 1}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal/10 to-blue/10 rounded-xl flex items-center justify-center">
                        {IconComponent && <IconComponent size={28} className="text-blue" />}
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                        {ind.name}
                      </h2>
                    </div>
                    <p className="text-text-secondary text-lg leading-relaxed">{ind.description}</p>
                  </div>
                  <div className="bg-bg-light rounded-2xl p-8">
                    <h3 className="font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">{c.personasHeadline}</h3>
                    <div className="space-y-3">
                      {ind.personas.map((p, pi) => (
                        <div key={p} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue font-semibold text-sm border border-border" style={{ fontFamily: 'var(--font-mono)' }}>
                            {String(pi + 1).padStart(2, '0')}
                          </div>
                          <span className="text-text-primary font-medium">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {i < industries.length - 1 && (
                  <div className="border-b border-border mt-16" />
                )}
              </AnimateOnScroll>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-light py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.cta.headline}
            </h2>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              {c.cta.body}
            </p>
            <Link
              to={c.cta.buttonPath}
              className="inline-flex items-center px-7 py-3.5 bg-teal text-white font-semibold rounded-lg hover:bg-teal-hover transition-colors btn-transition"
            >
              {c.cta.buttonLabel}
              <ArrowRightIcon size={18} className="ml-2" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
};

export default Industries;
