import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ArrowRightIcon, BrainIcon, HubSpotIcon, QualityIcon, ReportIcon, GlobeIcon, RevenueIcon, LinkedInIcon, InstagramIcon } from '../components/Icons';
import { whyMyelektra, aboutPageConfig } from '../data/content';

const whyIcons = [BrainIcon, HubSpotIcon, QualityIcon, ReportIcon, GlobeIcon, RevenueIcon];

const About: React.FC = () => {
  const c = aboutPageConfig;
  return (
    <div>
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
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

      {/* Company Story */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <AnimateOnScroll>
                <span className="text-teal font-semibold text-sm uppercase tracking-wider">{c.story.label}</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mt-2 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  {c.story.headline}
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll stagger={1}>
                <p className="text-text-secondary leading-relaxed mb-4">{c.story.paragraph1}</p>
              </AnimateOnScroll>
              <AnimateOnScroll stagger={2}>
                <p className="text-text-secondary leading-relaxed mb-4">{c.story.paragraph2}</p>
              </AnimateOnScroll>
              <AnimateOnScroll stagger={3}>
                <p className="text-text-secondary leading-relaxed">{c.story.paragraph3}</p>
              </AnimateOnScroll>
            </div>
            <div>
              <AnimateOnScroll stagger={2}>
                <div className="bg-bg-light rounded-2xl p-8 space-y-6">
                  {c.stats.map((stat: { value: string; label: string }, i: number) => (
                    <div key={stat.label}>
                      {i > 0 && <div className="border-t border-border pt-6" />}
                      <p className="text-teal font-bold text-3xl mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{stat.value}</p>
                      <p className="text-text-secondary text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="flex flex-col items-center text-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQHa2ssFNQpegA/profile-displayphoto-crop_800_800/B56Z2VjB12GgAM-/0/1776330483600?e=1785974400&v=beta&t=04iVjvHs__Mv4z_LEQnglqcLGaItfyvJsZ0n7uBAAB4"
                alt="Dian Satya"
                className="w-28 h-28 rounded-full object-cover border-4 border-teal/20 shadow-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Dian Satya, S.E.
              </h3>
              <p className="text-teal font-semibold text-sm mb-4">Founder & CEO Myelektra.com</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/diansatya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-teal transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon size={20} />
                </a>
                <a
                  href="https://www.instagram.com/dian_satyaa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-teal transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Why Myelektra */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary text-center mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Why Myelektra
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={1}>
            <div className="w-20 h-1 bg-gradient-to-r from-teal to-blue mx-auto mb-12 rounded-full" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyMyelektra.map((item, i) => {
              const IconComponent = whyIcons[i];
              return (
                <AnimateOnScroll key={item.title} stagger={i + 1} className="h-full">
                  <div className="bg-white rounded-xl p-7 shadow-sm border border-border/50 card-hover h-full">
                    <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                      {IconComponent && <IconComponent size={24} className="text-teal" />}
                    </div>
                    <h3 className="font-bold text-text-primary text-lg mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-sm">{item.description}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-navy-dark py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <span className="text-teal font-semibold text-sm uppercase tracking-wider">{c.mission.label}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.mission.headline}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll stagger={1}>
            <p className="text-text-dark/60 max-w-2xl mx-auto leading-relaxed">
              {c.mission.body}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.cta.headline}
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
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

export default About;
