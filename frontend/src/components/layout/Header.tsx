import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu } from 'lucide-react';
import { navItems } from '../../content/nav';
import { hero } from '../../content/site';
import { useHeaderState } from '../../hooks/useHeaderState';
import { useHeroOverlap } from '../../hooks/useHeroOverlap';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { cn } from '../../lib/cn';
import { buttonClass } from '../ui/button-classes';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Brand } from './Brand';
import { MobileNav } from './MobileNav';

const NAV_IDS = navItems.map((item) => item.id);
/** Must match the `h-14` header row below. */
const HEADER_HEIGHT = 56;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, hidden } = useHeaderState();
  const { pathname } = useLocation();
  const activeId = useScrollSpy(NAV_IDS);
  const onHome = pathname === '/';
  const overHero = useHeroOverlap('home', HEADER_HEIGHT);
  const dark = onHome && overHero;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300',
          dark && 'header-on-dark',
          scrolled &&
            dark &&
            'border-b border-white/10 bg-black/40 shadow-[0_1px_0_rgba(0,0,0,0.3),0_8px_24px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl',
          scrolled &&
            !dark &&
            'border-b border-border bg-bg/70 shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-16px_rgba(0,0,0,0.3)] backdrop-blur-xl',
          !scrolled && 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-content items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <Brand />

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-border/70 bg-bg-subtle/60 px-1 py-1 backdrop-blur-sm transition-colors lg:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const current = onHome && activeId === item.id;
              return (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  aria-current={current ? 'true' : undefined}
                  className={cn(
                    'relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors',
                    current ? 'text-text' : 'text-text-muted hover:text-text',
                  )}
                >
                  {current && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface shadow-sm ring-1 ring-border"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <item.Icon
                    size={13}
                    strokeWidth={2}
                    className={cn('transition-opacity', current ? 'opacity-100' : 'opacity-60')}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to={`/${hero.headerCta.href}`}
              className={cn(
                buttonClass('primary', 'md'),
                'hidden h-8 gap-1.5 px-3.5 text-[0.78rem] sm:inline-flex',
              )}
            >
              {hero.headerCta.label}
              <ArrowUpRight size={14} strokeWidth={2.25} />
            </Link>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:text-text lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={17} />
            </button>
          </div>
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
          aria-hidden
        />
      </motion.header>

      {/* Rendered outside the header so it never inherits `.header-on-dark`'s
          light-on-dark token overrides — the panel must stay fully opaque
          and readable regardless of what the header looks like right now. */}
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
