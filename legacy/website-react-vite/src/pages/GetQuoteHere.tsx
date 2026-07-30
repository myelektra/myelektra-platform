import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ArrowRightIcon } from '../components/Icons';
import { getQuotePageConfig } from '../data/content';

const HS_FORM_PORTAL = import.meta.env.VITE_HS_PORTAL || getQuotePageConfig.hubspot.portalId;
const HS_FORM_ID = import.meta.env.VITE_HS_FORM_ID || getQuotePageConfig.hubspot.formId;

const GetQuoteHere: React.FC = () => {
  const c = getQuotePageConfig;
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // load HubSpot forms script once
    if (!document.querySelector('script[src="//js.hsforms.net/forms/shell.js"]')) {
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/shell.js';
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = initForm;
      document.body.appendChild(script);
    } else if ((window as any).hbspt) {
      initForm();
    }

    function initForm() {
      if ((window as any).hbspt && formRef.current) {
        (window as any).hbspt.forms.create({
          portalId: HS_FORM_PORTAL,
          formId: HS_FORM_ID,
          target: `#${formRef.current!.id}`,
        });
      }
    }

    // retry if hbspt not ready yet
    const retry = setInterval(() => {
      if ((window as any).hbspt) {
        clearInterval(retry);
        initForm();
      }
    }, 500);
    setTimeout(() => clearInterval(retry), 10000);

    return () => clearInterval(retry);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
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

      {/* Quote Form Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {c.formHeadline}
                </h2>
                <p className="text-text-secondary mb-8">
                  {c.formSubtitle}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll stagger={1}>
                <div
                  id="hs-get-quote-form"
                  ref={formRef}
                  className="bg-bg-light rounded-2xl p-8"
                />
              </AnimateOnScroll>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <AnimateOnScroll stagger={2}>
                  <div className="bg-bg-light rounded-2xl p-6">
                    <h3 className="font-bold text-text-primary text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      {c.sidebar.headline}
                    </h3>
                    <ul className="space-y-3 text-sm text-text-secondary">
                      {c.sidebar.items.map((item: string) => (
                        <li key={item} className="flex items-start gap-2">✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
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

export default GetQuoteHere;
