import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../app/providers/ThemeProvider';
import { HomePage } from '../routes/HomePage';
import { WorkDetailPage } from '../routes/WorkDetailPage';
import { NotFoundPage } from '../routes/NotFoundPage';
import { projects } from '../content/projects';

function renderAt(path: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<WorkDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('routing', () => {
  it('renders the home page hero', () => {
    renderAt('/');
    expect(
      screen.getByRole('heading', { level: 1, name: /ship the whole system/i }),
    ).toBeInTheDocument();
  });

  it('renders a case study for a real slug', () => {
    renderAt(`/work/${projects[0].slug}`);
    expect(
      screen.getByRole('heading', { level: 1, name: projects[0].title }),
    ).toBeInTheDocument();
    expect(screen.getByText('The problem')).toBeInTheDocument();
  });

  it('redirects an unknown slug to the 404 page', () => {
    renderAt('/work/does-not-exist');
    expect(
      screen.getByRole('heading', { level: 1, name: /doesn.t exist/i }),
    ).toBeInTheDocument();
  });
});
