import { useEffect, useState } from 'react';

/**
 * True while the section (by id) still occupies the header's own strip at
 * the top of the viewport — lets a floating header re-theme itself to stay
 * legible over a section with its own dark background, like the cinematic
 * hero, instead of assuming it always sits on the page's base surface.
 */
export function useHeroOverlap(sectionId: string, headerHeight: number): boolean {
  const [over, setOver] = useState(true);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) {
      setOver(false);
      return;
    }

    let ticking = false;
    const measure = () => {
      setOver(el.getBoundingClientRect().bottom > headerHeight);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionId, headerHeight]);

  return over;
}
