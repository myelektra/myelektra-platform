import { Link } from 'react-router-dom';
import { LinkedInIcon, InstagramIcon } from './Icons';
import { solutions, disclaimer, footerConfig, brandConfig } from '../data/content';

export const Footer: React.FC = () => {
  const f = footerConfig;
  const b = brandConfig;
  return (
    <footer className="bg-navy-dark text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={b.logo.catboxUrl} alt="Myelektra" style={{ height: 28, width: 'auto', display: 'block' }} />
              <span className="font-bold" style={{ fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'baseline', gap: 0 }}>
                <span style={{ color: '#FFFFFF', fontSize: 28, lineHeight: 1 }}>myelektra</span><span style={{ color: '#1877F2', fontSize: 14, lineHeight: 1 }}>.com</span>
              </span>
            </Link>
            <p className="text-teal text-sm font-semibold mb-1">{b.positioning}</p>
            <p className="text-text-dark/60 text-sm mb-4">{b.tagline}</p>
            <div className="text-text-dark/60 text-xs leading-relaxed mb-4 space-y-0.5">
              <p className="font-semibold text-text-dark/70">Corporate Office</p>
              <p>{b.address.line1}</p>
              <p>{b.address.line2}</p>
              <p>{b.address.country}</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={b.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dark/60 hover:text-teal transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={20} />
              </a>
              <a
                href={b.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dark/60 hover:text-teal transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{f.columns[1].title || 'Solutions'}</h4>
            <ul className="space-y-2.5">
              {solutions.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/solutions/${s.id}`}
                    className="text-text-dark/60 hover:text-teal text-sm transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{f.columns[2].title}</h4>
            <ul className="space-y-2.5">
              {f.columns[2].links.map((link: { label: string; path: string }) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-text-dark/60 hover:text-teal text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{f.columns[3].title}</h4>
            <ul className="space-y-2.5">
              <li className="text-text-dark/70 text-sm font-medium">{b.company}</li>
              <li>
                <a href={`tel:${b.phone}`} className="text-text-dark/60 hover:text-teal text-sm transition-colors">
                  {b.phone}
                </a>
              </li>
              {f.columns[3].links.map((link: any) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors ${
                      link.highlight ? 'text-teal hover:text-teal-hover font-medium' : 'text-text-dark/60 hover:text-teal'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-text-dark/40 text-xs leading-relaxed mb-4">{disclaimer}</p>
          <p className="text-text-dark/40 text-xs">
            {f.copyright.replace('{year}', String(new Date().getFullYear()))}
          </p>
        </div>
      </div>
    </footer>
  );
};
