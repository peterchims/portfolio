import { useEffect } from 'react';
import { siteMeta } from '../content/site';

interface SeoProps {
  title: string;
  description?: string;
  /** Path only, e.g. "/work/cashra-finance-manager". */
  path?: string;
  /** Extra JSON-LD to inject for this page. */
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Imperative head management — keeps the bundle small (no helmet dependency).
 * Each route renders exactly one <Seo />.
 */
export function Seo({ title, description = siteMeta.description, path = '/', jsonLd }: SeoProps) {
  useEffect(() => {
    const url = `${siteMeta.url}${path}`;
    document.title = title;

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertLink('canonical', url);

    const id = 'route-json-ld';
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [title, description, path, jsonLd]);

  return null;
}
