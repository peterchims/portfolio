import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HomePage } from '../routes/HomePage';
import { useReducedMotion } from '../hooks/useReducedMotion';

const WorkDetailPage = lazy(() =>
  import('../routes/WorkDetailPage').then((m) => ({ default: m.WorkDetailPage })),
);
const NotFoundPage = lazy(() =>
  import('../routes/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

export function AppRoutes() {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<WorkDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
