import { useEffect, useRef, useState } from 'react';

/**
 * Parallax Hook
 * Creates a parallax scrolling effect based on scroll position
 * @param speed - Multiplier for the parallax effect (0.1 - 0.9 recommended)
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const elementTop = ref.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in view
      if (elementTop < windowHeight && elementTop > -ref.current.clientHeight) {
        const scrolled = window.scrollY;
        const elementOffsetTop = ref.current.offsetTop;
        const parallaxOffset = (scrolled - elementOffsetTop) * speed;
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

export default useParallax;
