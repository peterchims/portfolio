import { useEffect, useState } from 'react';
import { fallbackPortfolio } from '../content/fallbackPortfolio';
import { fetchHealth, fetchSiteContent, trackInteraction } from '../lib/api';
import type { ApiHealth, PortfolioContent } from '../types/portfolio';

interface ContentState {
  content: PortfolioContent;
  health: ApiHealth | null;
  source: 'api' | 'fallback';
  loading: boolean;
}

export function usePortfolioContent(): ContentState {
  const [state, setState] = useState<ContentState>({
    content: fallbackPortfolio,
    health: null,
    source: 'fallback',
    loading: true,
  });

  useEffect(() => {
    let active = true;

    const fallbackHealth: ApiHealth = {
      status: 'offline',
      timestamp: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      uptimeSeconds: 0,
      environment: 'unavailable',
    };

    const load = async () => {
      try {
        const [site, health] = await Promise.all([
          fetchSiteContent(),
          fetchHealth(),
        ]);

        if (!active) {
          return;
        }

        setState({
          content: site.data,
          health,
          source: 'api',
          loading: false,
        });
      } catch {
        try {
          const health = await fetchHealth();

          if (!active) {
            return;
          }

          setState({
            content: fallbackPortfolio,
            health,
            source: 'fallback',
            loading: false,
          });
        } catch {
          if (!active) {
            return;
          }

          setState({
            content: fallbackPortfolio,
            health: fallbackHealth,
            source: 'fallback',
            loading: false,
          });
        }
      }
    };

    void load();
    void trackInteraction({
      event: 'page_view',
      section: 'hero',
      label: 'portfolio-load',
    });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
