import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon, CheckIcon, GradCapIcon,
  solutionIconMap, industryIconMap, journeyIconMap, achievementIconMap, whyIconMap
} from '../components/Icons';
import { solutions, industries, countries, whyMyelektra, homepageConfig, clientLogos } from '../data/content';
import PriceDisplay from '../components/PriceDisplay';

const ClientLogos = clientLogos;

const Home: React.FC = () => {
  const h = homepageConfig;
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    let offset = 0;
    let frame = 0;
    el.style.transform = 'translateX(0)';
    const tick = () => {
      offset -= 0.6;
      if (offset <= -half) offset += half;
      el.style.transform = `translateX(${offset}px)`;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => cancelAnimationFrame(frame);
    const start = () => { stop(); tick(); };
    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', start);
    start();
    return () => { stop(); el.removeEventListener('mouseenter', stop); el.removeEventListener('mouseleave', start); };
  }, []);

  return (
    <div>
      {/* ===== SECTION 1: HERO ===== */}
      <section className="hero has-video">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="https://assets.mixkit.co/videos/46446/46446-720.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-grid-bg"></div>
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge anim">{h.hero.badge}</span>
            <h1 className="anim delay-1">
              {h.hero.headline.split(h.hero.headlineHighlight)[0]}
              <span className="gradient-text">{h.hero.headlineHighlight}</span>
            </h1>
            <p className="hero-subtitle anim delay-2">{h.hero.subtitle}</p>
            <div className="hero-buttons anim delay-3">
              <Link to={h.hero.ctaPrimary.path} className="btn btn-primary">
                {h.hero.ctaPrimary.label}
                <ArrowRightIcon size={18} />
              </Link>
              <Link to={h.hero.ctaSecondary.path} className="btn btn-outline">
                {h.hero.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLIENT LOGOS ===== */}
      <section className="experience-section">
        <div className="container text-center">
          <h2 className="section-title anim">{h.experience.headline}</h2>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track" ref={marqueeRef}>
            {ClientLogos.map((logo: { src: string; alt: string }) => (
              <img key={logo.src} src={logo.src} alt={logo.alt} className="marquee-logo" loading="lazy" />
            ))}
            {ClientLogos.map((logo: { src: string; alt: string }) => (
              <img key={`dup-${logo.src}`} src={logo.src} alt={logo.alt} className="marquee-logo" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: THE JOURNEY ===== */}
      <section className="section-light section-padding">
        <div className="container">
          <span className="section-label anim">{h.journey.sectionLabel}</span>
          <h2 className="section-title anim delay-1">{h.journey.headline}</h2>
          <p className="section-subtitle anim delay-2">{h.journey.intro}</p>

          <div className="grid-5" style={{ marginTop: 48 }}>
            {h.journey.cards.map((card: any, i: number) => {
              const IconComponent = journeyIconMap[card.icon];
              return (
                <div key={card.title} className={`card anim delay-${i + 1}`}>
                  <div className="card-icon card-icon-teal">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-desc">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: WHAT WE HELP YOU ACHIEVE ===== */}
      <section className="section-gray section-padding">
        <div className="container text-center">
          <h2 className="section-title anim">{h.achievements.headline}</h2>
          <div className="divider-line anim delay-1"></div>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {h.achievements.items.map((item: any, i: number) => {
              const IconComponent = achievementIconMap[item.icon];
              return (
                <div key={item.title} className={`card anim delay-${i + 1}`} style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', borderColor: 'rgba(226,232,240,0.5)' }}>
                  <div className="card-icon card-icon-gradient">
                    {IconComponent && <IconComponent size={28} />}
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SOLUTIONS OVERVIEW ===== */}
      <section className="section-dark section-padding">
        <div className="container text-center">
          <h2 className="section-title-white anim">{h.solutionsOverview.headline}</h2>
          <div className="divider-line anim delay-1"></div>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {solutions.map((sol, i) => {
              const IconComponent = solutionIconMap[sol.icon];
              return (
                <div key={sol.id} className={`solution-card anim delay-${i + 1}${sol.isPopular ? ' featured' : ''}`}>
                  {sol.isPopular && <span className="badge-popular">Most Popular</span>}
                  <div className="card-icon card-icon-teal">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <h3 className="card-title">{sol.name}</h3>
                  <PriceDisplay price={sol.price} className="solution-price" />
                  <p className="card-desc-dark">{sol.description}</p>
                  <div className="feature-list">
                    {sol.features.map((f: string) => (
                      <div key={f} className="feature-item">
                        <CheckIcon size={16} className="feature-check" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/solutions/${sol.id}`} className="learn-more">
                    Learn More
                    <ArrowRightIcon size={16} className="learn-more-arrow" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: COUNTRY TARGETING ===== */}
      <section className="section-gray section-padding">
        <div className="container text-center">
          <h2 className="section-title anim">{h.countryTargeting.headline}</h2>
          <p className="section-subtitle mx-auto anim delay-1">{h.countryTargeting.intro}</p>
          <div className="grid-3" style={{ textAlign: 'left', marginTop: 48 }}>
            {countries.map((country, i) => (
              <div key={country.name} className={`country-card ${country.flagAccent} anim delay-${i + 1}`}>
                <h3 className="card-title">{country.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>{h.countryTargeting.personasLabel}</p>
                <ul style={{ marginBottom: 16 }}>
                  {country.personas.map((p: string) => (
                    <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, padding: '2px 0' }}>
                      <span className="persona-dot"></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {h.countryTargeting.maxContactsNote}
                </p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(107,114,128,0.7)', maxWidth: 720, margin: '32px auto 0', lineHeight: 1.6 }}>
            {h.countryTargeting.disclaimer}
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: INDUSTRIES ===== */}
      <section className="section-light section-padding">
        <div className="container text-center">
          <h2 className="section-title anim">{h.industriesSection.headline}</h2>
          <div className="divider-line anim delay-1"></div>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {industries.map((ind, i) => {
              const IconComponent = industryIconMap[ind.icon];
              return (
                <div key={ind.id} className={`card anim delay-${i + 1}`}>
                  <div className="card-icon card-icon-blue">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <h3 className="card-title">{ind.name}</h3>
                  <p className="card-desc" style={{ marginBottom: 16 }}>{ind.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {ind.personas.map((p: string) => (
                      <span key={p} className="persona-tag">{p}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: WHY MYELEKTRA ===== */}
      <section className="section-dark section-padding">
        <div className="container text-center">
          <h2 className="section-title-white anim">{h.whyMyelektraSection.headline}</h2>
          <div className="divider-line anim delay-1"></div>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {whyMyelektra.map((item, i) => {
              const IconComponent = whyIconMap[item.icon];
              return (
                <div key={item.title} className={`card-dark anim delay-${i + 1}`}>
                  <div className="card-icon card-icon-teal">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <h3 className="card-title" style={{ color: '#fff' }}>{item.title}</h3>
                  <p className="card-desc-dark">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: ACADEMY TEASER ===== */}
      <section className="section-gradient section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', opacity: 0.3 }}></div>
        <div className="container text-center" style={{ position: 'relative' }}>
          <div className="anim" style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <GradCapIcon size={32} className="text-white" />
          </div>
          <h2 className="section-title-white anim delay-1">{h.academyTeaser.headline}</h2>
          <p className="anim delay-2" style={{ color: 'rgba(255,255,255,0.9)', fontSize: 20, fontWeight: 500, marginBottom: 12 }}>
            {h.academyTeaser.subheadline}
          </p>
          <p className="anim delay-3" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto 32px', fontSize: 18 }}>
            {h.academyTeaser.description}
          </p>
          <div className="anim delay-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginBottom: 32 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '20px 28px', textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{h.academyTeaser.pricing.publicClasses.badgeLabel}</p>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 24, fontFamily: 'var(--font-mono)' }}>{h.academyTeaser.pricing.publicClasses.price}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{h.academyTeaser.pricing.publicClasses.per}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '20px 28px', textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{h.academyTeaser.pricing.corporateTraining.badgeLabel}</p>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 24, fontFamily: 'var(--font-mono)' }}>{h.academyTeaser.pricing.corporateTraining.price}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{h.academyTeaser.pricing.corporateTraining.per}</p>
              </div>
            </div>
          </div>
          <Link to={h.academyTeaser.ctaPath} className="btn anim delay-5" style={{ background: '#fff', color: 'var(--blue)', fontSize: 16, padding: '14px 28px', borderRadius: 8, fontWeight: 600 }}>
            {h.academyTeaser.ctaLabel}
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </section>

      {/* ===== SECTION 10: FINAL CTA ===== */}
      <section className="section-dark section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,var(--navy-dark),rgba(26,115,232,0.15),rgba(0,200,150,0.08))' }}></div>
        <div className="container text-center" style={{ position: 'relative' }}>
          <h2 className="section-title-white anim" style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            {h.finalCta.headline}
          </h2>
          <p className="anim delay-1" style={{ color: 'rgba(232,236,241,0.6)', maxWidth: 720, margin: '0 auto 32px', fontSize: 18, lineHeight: 1.7 }}>
            {h.finalCta.body}
          </p>
          <p className="anim delay-2" style={{ color: 'var(--teal)', fontWeight: 600, fontSize: 20, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
            {h.finalCta.subheadline}
          </p>
          <p className="anim delay-3" style={{ color: 'rgba(232,236,241,0.5)', maxWidth: 560, margin: '0 auto 32px' }}>
            {h.finalCta.subbody}
          </p>
          <Link to={h.finalCta.ctaPath} className="btn btn-primary btn-large anim delay-4">
            {h.finalCta.ctaLabel}
            <ArrowRightIcon size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
