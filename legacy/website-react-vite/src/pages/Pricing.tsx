import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ArrowRightIcon, CheckIcon, solutionIconMap } from '../components/Icons';
import { solutions, disclaimer, pricingPageConfig } from '../data/content';
import PriceDisplay from '../components/PriceDisplay';

const Pricing: React.FC = () => {
  const c = pricingPageConfig;
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

      {/* Pricing Cards */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((sol, i) => {
              const IconComponent = solutionIconMap[sol.icon];
              const isPopular = sol.isPopular;
              return (
                <AnimateOnScroll key={sol.id} stagger={i + 1} className="h-full">
                  <div className={`bg-white rounded-2xl p-8 border h-full flex flex-col card-hover ${
                    isPopular
                      ? 'ring-2 ring-gold shadow-xl relative'
                      : 'border-border shadow-sm'
                  }`}>
                    {isPopular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-navy-dark text-xs font-bold rounded-full uppercase tracking-wider">
                        {c.popularBadge}
                      </span>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPopular ? 'bg-gold/10' : 'bg-teal/10'}`}>
                        {IconComponent && <IconComponent size={24} className={isPopular ? 'text-gold' : 'text-teal'} />}
                      </div>
                    </div>
                    <h3 className="font-bold text-text-primary text-xl mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sol.name}
                    </h3>
                    <PriceDisplay price={sol.price} className="text-teal font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-mono)' }} />
                    <p className="text-text-secondary text-sm mb-6">{sol.description}</p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {sol.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-text-secondary text-sm">
                          <CheckIcon size={16} className="text-teal shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/solutions/${sol.id}`}
                      className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold text-sm btn-transition ${
                        isPopular
                          ? 'bg-teal text-white hover:bg-teal-hover'
                          : 'bg-blue/10 text-blue hover:bg-blue/20'
                      }`}
                    >
                      {sol.cta}
                      <ArrowRightIcon size={16} className="ml-2" />
                    </Link>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.comparisonHeadline}
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll stagger={1}>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-navy-dark text-white">
                    <th className="text-left px-6 py-4 font-semibold text-sm">Feature</th>
                    {solutions.map(s => (
                      <th key={s.id} className="text-center px-4 py-4 font-semibold text-sm min-w-[140px]">{s.name.split(' ')[0]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">ICP Development</td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                  </tr>
                  <tr className="bg-bg-light/50">
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">Verified Contacts</td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">Assessment</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">HubSpot CRM Setup</td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                  </tr>
                  <tr className="bg-bg-light/50">
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">SDR Outreach</td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">Pipeline Management</td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                  </tr>
                  <tr className="bg-bg-light/50">
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">Revenue Forecasting</td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">AI Sales Playbook</td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                  </tr>
                  <tr className="bg-bg-light/50">
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">Revenue Leadership</td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><span className="text-text-secondary text-xs">—</span></td>
                    <td className="px-4 py-4 text-center"><CheckIcon size={18} className="text-teal mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bg-light rounded-xl p-6 border border-border/50">
            <p className="text-text-secondary text-sm leading-relaxed">{disclaimer}</p>
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

export default Pricing;
