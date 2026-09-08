import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { navItems } from '../../content/nav';
import { hero } from '../../content/site';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { buttonClass } from '../ui/button-classes';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute right-0 top-0 flex h-full w-[min(20rem,80vw)] flex-col border-l border-border bg-surface p-6"
            initial={reduced ? undefined : { x: '100%' }}
            animate={reduced ? undefined : { x: 0 }}
            exit={reduced ? undefined : { x: '100%' }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-4 flex flex-col gap-1" aria-label="Primary">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-text-muted hover:bg-bg-subtle hover:text-text"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              to={`/${hero.headerCta.href}`}
              onClick={onClose}
              className={buttonClass('primary', 'lg', 'mt-auto w-full')}
            >
              {hero.headerCta.label}
            </Link>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
