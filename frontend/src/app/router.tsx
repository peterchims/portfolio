import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../routes/HomePage';

const WorkDetailPage = lazy(() =>
  import('../routes/WorkDetailPage').then((m) => ({ default: m.WorkDetailPage })),
);
const NotFoundPage = lazy(() =>
  import('../routes/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<WorkDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
