import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { ScrollToTop } from './ScrollToTop';
import { AppRoutes } from './router';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SkipLink } from '../components/ui/SkipLink';
import { CustomCursor } from '../components/ui/CustomCursor';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <CustomCursor />
        <ScrollToTop />
        <SkipLink />
        <Header />
        <main id="main" className="pt-14">
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
