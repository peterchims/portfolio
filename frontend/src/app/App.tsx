import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { ScrollToTop } from './ScrollToTop';
import { AppRoutes } from './router';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SkipLink } from '../components/ui/SkipLink';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SkipLink />
        <Header />
        <main id="main">
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
