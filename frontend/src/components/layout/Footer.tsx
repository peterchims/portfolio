import { Link } from 'react-router-dom';
import { navItems } from '../../content/nav';
import { profile } from '../../content/profile';
import { footer } from '../../content/site';

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="mx-auto grid w-full max-w-content gap-8 px-5 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
            {profile.name}
          </p>
          <p className="mt-3 text-sm text-text-muted">{footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12 md:justify-end">
          <nav className="flex flex-col gap-2" aria-label="Footer">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                className="text-sm text-text-muted hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-text-muted hover:text-text"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-content px-5 pb-8 sm:px-6 lg:px-8">
        <p className="text-xs text-text-faint">
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript & care.
        </p>
      </div>
    </footer>
  );
}
