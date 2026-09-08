import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route change scroll to top. When the URL carries a hash, scroll that
 * section into view instead (react-router does not do this on its own).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
