import { useParams, Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ArrowRightIcon, CheckIcon, ChevronRightIcon, solutionIconMap } from '../components/Icons';
import { solutions, solutionDetailPageConfig } from '../data/content';
import PriceDisplay from '../components/PriceDisplay';

const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = solutions.find(s => s.id === id);
  const c = solutionDetailPageConfig;

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">{c.notFoundMessage}</h1>
          <Link to="/solutions" className="text-blue hover:underline">{c.notFoundBackLink}</Link>
        </div>
      </div>
    );
  }

  const IconComponent = solutionIconMap[solution.icon];
  const otherSolutions = solutions.filter(s => s.id !== solution.id);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-text-primary transition-colors">{c.breadcrumb.home}</Link>
            <ChevronRightIcon size={14} />
            <Link to="/solutions" className="hover:text-text-primary transition-colors">{c.breadcrumb.solutions}</Link>
            <ChevronRightIcon size={14} />
            <span className="text-teal">{solution.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white pt-4 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-teal/10 rounded-xl flex items-center justify-center">
                {IconComponent && <IconComponent size={28} className="text-teal" />}
              </div>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                  {solution.name}
                </h1>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={1}>
            <PriceDisplay price={solution.price} className="text-teal font-semibold text-lg mb-2" style={{ fontFamily: 'var(--font-mono)' }} />
          </AnimateOnScroll>
          <AnimateOnScroll stagger={2}>
            <p className="text-text-secondary text-lg max-w-2xl">{solution.description}</p>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={3}>
            <div className="mt-8">
              <Link
                to="/consultation"
                className="inline-flex items-center px-7 py-3.5 bg-teal text-white font-semibold rounded-lg hover:bg-teal-hover transition-colors btn-transition"
              >
                {solution.cta}
                <ArrowRightIcon size={18} className="ml-2" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <AnimateOnScroll>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  {c.includedHeadline}
                </h2>
              </AnimateOnScroll>
              <ul className="space-y-4">
                {solution.features.map((f, i) => (
                  <AnimateOnScroll key={f} stagger={i + 1}>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={14} className="text-teal" />
                      </div>
                      <span className="text-text-secondary leading-relaxed">{f}</span>
                    </li>
                  </AnimateOnScroll>
                ))}
              </ul>
            </div>

            <div>
              <AnimateOnScroll>
                <div className="bg-bg-light rounded-2xl p-8">
                  <h3 className="font-bold text-text-primary text-lg mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {c.bestForHeadline}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{solution.bestFor}</p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Mini Process */}
      {solution.steps && (
        <section className="bg-bg-light py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
                {c.howItWorksHeadline}
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.steps.map((step, i) => (
                <AnimateOnScroll key={step.title} stagger={i + 1}>
                  <div className="bg-white rounded-xl p-6 border border-border/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal to-blue rounded-full flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-mono)' }}>{i + 1}</span>
                    </div>
                    <h3 className="font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-navy-dark py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.ctaPrefix} {solution.name}{c.ctaSuffix}
            </h2>
            <p className="text-text-dark/60 mb-8 max-w-xl mx-auto">
              {c.ctaBody}
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center px-8 py-4 bg-teal text-white font-bold text-lg rounded-lg hover:bg-teal-hover transition-colors btn-transition shadow-lg shadow-teal/25"
            >
              {solution.cta}
              <ArrowRightIcon size={20} className="ml-2" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.relatedSolutionsHeadline}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherSolutions.map((sol, i) => {
              const OtherIcon = solutionIconMap[sol.icon];
              return (
                <AnimateOnScroll key={sol.id} stagger={i + 1}>
                  <Link to={`/solutions/${sol.id}`} className="block bg-white border border-border rounded-xl p-6 card-hover group">
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center mb-3">
                      {OtherIcon && <OtherIcon size={20} className="text-teal" />}
                    </div>
                    <h3 className="font-bold text-text-primary mb-1 group-hover:text-teal transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sol.name}
                    </h3>
                    <p className="text-teal text-xs font-semibold mb-2" style={{ fontFamily: 'var(--font-mono)' }}>{sol.price}</p>
                    <p className="text-text-secondary text-sm">{sol.description}</p>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionDetail;
