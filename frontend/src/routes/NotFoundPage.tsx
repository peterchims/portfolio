import { Link } from 'react-router-dom';
import { siteMeta } from '../content/site';
import { Seo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { buttonClass } from '../components/ui/button-classes';

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <Seo title={`Page not found — ${siteMeta.title}`} path="/404" />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-display-sm font-semibold">This page doesn’t exist.</h1>
      <p className="mt-3 max-w-md text-text-muted">
        The link may be broken or the page may have moved.
      </p>
      <Link to="/" className={`${buttonClass('primary', 'md')} mt-8`}>
        Back to home
      </Link>
    </Container>
  );
}
