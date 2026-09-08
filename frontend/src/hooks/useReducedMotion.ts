import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Thin wrapper so components never import motion internals directly and
 * always get a boolean (framer can return null before hydration).
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
