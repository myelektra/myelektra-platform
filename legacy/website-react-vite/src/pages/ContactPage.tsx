import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ArrowRightIcon } from '../components/Icons';
import { contactPageConfig, brandConfig } from '../data/content';

const ContactPage: React.FC = () => {
  const c = contactPageConfig;
  const b = brandConfig;
  return (
    <div>
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

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <AnimateOnScroll>
                <div className="flex flex-wrap gap-4">
                  {c.ctaButtons.map((btn: { label: string; path: string; variant: string }) => (
                    <Link
                      key={btn.path}
                      to={btn.path}
                      className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors btn-transition ${
                        btn.variant === 'primary'
                          ? 'bg-teal text-white hover:bg-teal-hover'
                          : 'border border-teal text-teal hover:bg-teal/5'
                      }`}
                    >
                      {btn.label} <ArrowRightIcon size={16} className="ml-2" />
                    </Link>
                  ))}
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll>
                <div>
                  <h3 className="font-bold text-text-primary text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{c.officeHeadline}</h3>
                  <p className="text-text-secondary">{b.address.line1}</p>
                  <p className="text-text-secondary">{b.address.line2}</p>
                  <p className="text-text-secondary">{b.address.country}</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll stagger={1}>
                <div>
                  <h3 className="font-bold text-text-primary text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{c.contactInfoHeadline}</h3>
                  <p className="text-text-secondary font-medium">{b.company}</p>
                  <a href={`tel:${b.phone}`} className="text-teal hover:text-teal-hover transition-colors">{b.phone}</a>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll stagger={2}>
                <div>
                  <h3 className="font-bold text-text-primary text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{c.hoursHeadline}</h3>
                  <p className="text-text-secondary">{b.hours}</p>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Google Maps */}
            <AnimateOnScroll stagger={3}>
              <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-border">
                <iframe
                  src="https://maps.google.com/maps?q=88+Office+Kota+Kasablanka+South+Jakarta&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="88 Office Location"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
