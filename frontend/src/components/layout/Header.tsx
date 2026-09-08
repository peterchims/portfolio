import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu } from 'lucide-react';
import { navItems } from '../../content/nav';
import { hero } from '../../content/site';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { cn } from '../../lib/cn';
import { buttonClass } from '../ui/button-classes';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Brand } from './Brand';
import { MobileNav } from './MobileNav';

const NAV_IDS = navItems.map((item) => item.id);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const activeId = useScrollSpy(NAV_IDS);
  const onHome = pathname === '/';

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled ? 'border-border bg-bg/75 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Brand />

        <nav className="hidden items-center md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const current = onHome && activeId === item.id;
            return (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                aria-current={current ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  current ? 'text-text' : 'text-text-muted hover:text-text',
                )}
              >
                {current && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-bg-subtle"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to={`/${hero.headerCta.href}`}
            className={cn(buttonClass('primary', 'md'), 'hidden sm:inline-flex')}
          >
            {hero.headerCta.label}
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:text-text md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
