import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navItems } from '../../content/nav';
import { profile } from '../../content/profile';
import { projects } from '../../content/projects';
import { footer } from '../../content/site';
import { buttonClass } from '../ui/button-classes';
import { Reveal } from '../ui/Reveal';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-subtle">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-content px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* CTA band */}
        <Reveal className="flex flex-col gap-6 border-b border-border pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1 text-xs text-text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-positive" />
              </span>
              Available for work
            </span>
            <h2 className="mt-5 max-w-lg text-display-md font-semibold">
              Have something that needs building end to end?
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/#contact" className={buttonClass('primary', 'lg')}>
              Start a project
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className={buttonClass('secondary', 'lg')}
            >
              {profile.email}
            </a>
          </div>
        </Reveal>

        {/* Link columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-mono text-kicker uppercase text-text-faint">Peter Ogba</p>
            <p className="mt-3 max-w-xs text-sm text-text-muted">{footer.tagline}</p>
          </div>

          <FooterCol title="Navigate">
            {navItems.map((item) => (
              <FooterLink key={item.id} to={`/#${item.id}`}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Work">
            {projects.map((project) => (
              <FooterLink key={project.slug} to={`/work/${project.slug}`}>
                {project.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Elsewhere">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text"
                >
                  {social.label}
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </FooterCol>
        </div>

        {/* Wordmark */}
        <div className="border-t border-border pt-10">
          <p className="select-none bg-gradient-to-b from-text/20 to-text/[0.04] bg-clip-text font-display text-[clamp(2.5rem,11vw,7rem)] font-bold leading-none tracking-tight text-transparent">
            Peter Ogba
          </p>
          <div className="mt-6 flex flex-col gap-2 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {year} Peter Ogba · Built with React, TypeScript &amp; Tailwind
            </span>
            <a href="#home" className="transition-colors hover:text-text-muted">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-kicker uppercase text-text-faint">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-sm text-text-muted transition-colors hover:text-text">
        {children}
      </Link>
    </li>
  );
}
