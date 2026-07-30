import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/ScrollAnimations';
import { ShieldIcon, ClockIcon, solutionIconMap } from '../components/Icons';
import { solutions, consultationPageConfig } from '../data/content';

const Consultation: React.FC = () => {
  const c = consultationPageConfig;
  useEffect(() => {
    if (!document.querySelector('script[src*="MeetingsEmbedCode.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
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

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Meetings Embed */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {c.scheduleHeadline}
                </h2>
                <p className="text-text-secondary mb-8">
                  {c.scheduleSubtitle}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll stagger={1}>
                <div
                  className="meetings-iframe-container"
                  data-src={c.hubspot.meetingsUrl}
                />
              </AnimateOnScroll>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <AnimateOnScroll stagger={1}>
                  <div className="bg-bg-light rounded-2xl p-6">
                    <h3 className="font-bold text-text-primary text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      {c.sidebarWhatToExpect.headline}
                    </h3>
                    <div className="space-y-4">
                      {c.sidebarWhatToExpect.items.map((item: { icon: string; title: string; description: string }) => (
                        <div key={item.title} className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center shrink-0">
                            {item.icon === 'clock' ? <ClockIcon size={20} className="text-teal" /> : <ShieldIcon size={20} className="text-teal" />}
                          </div>
                          <div>
                            <p className="font-medium text-text-primary text-sm">{item.title}</p>
                            <p className="text-text-secondary text-xs">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll stagger={2}>
                  <div className="bg-bg-light rounded-2xl p-6">
                    <h3 className="font-bold text-text-primary text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      {c.sidebarQuickLinks.headline}
                    </h3>
                    <div className="space-y-3">
                      {solutions.map(s => {
                        const IconComponent = solutionIconMap[s.icon];
                        return (
                          <Link
                            key={s.id}
                            to={`/solutions/${s.id}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors group"
                          >
                            <div className="w-8 h-8 bg-teal/10 rounded-md flex items-center justify-center">
                              {IconComponent && <IconComponent size={16} className="text-teal" />}
                            </div>
                            <div>
                              <p className="font-medium text-text-primary text-sm group-hover:text-teal transition-colors">{s.name}</p>
                              <p className="text-text-secondary text-xs">{s.price}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
