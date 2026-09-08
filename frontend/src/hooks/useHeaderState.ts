import { useEffect, useState } from 'react';

interface HeaderState {
  /** Page has been scrolled past the top — switch to the solid treatment. */
  scrolled: boolean;
  /** Hide the header (scrolling down, away from the top). */
  hidden: boolean;
}

/**
 * Drives a reveal-on-scroll-up / hide-on-scroll-down header.
 * Ignores tiny jitter and always shows the header near the top of the page.
 */
export function useHeaderState(revealThreshold = 6, hideAfter = 120): HeaderState {
  const [state, setState] = useState<HeaderState>({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      setState((prev) => {
        const scrolled = y > 8;
        let hidden = prev.hidden;
        if (y < hideAfter) hidden = false;
        else if (delta > revealThreshold) hidden = true;
        else if (delta < -revealThreshold) hidden = false;
        return scrolled === prev.scrolled && hidden === prev.hidden
          ? prev
          : { scrolled, hidden };
      });

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [revealThreshold, hideAfter]);

  return state;
}
