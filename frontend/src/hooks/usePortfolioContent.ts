import { useEffect, useState } from 'react';
import { fetchHealth, fetchSiteContent, trackInteraction } from '../lib/api';
import type { ApiHealth, PortfolioContent } from '../types/portfolio';

interface ContentState {
  content: PortfolioContent | null;
  health: ApiHealth | null;
  loading: boolean;
  error: string | null;
}

function createOfflineHealth(): ApiHealth {
  const timestamp = new Date().toISOString();

  return {
    status: 'offline',
    timestamp,
    startedAt: timestamp,
    uptimeSeconds: 0,
    environment: 'unavailable',
  };
}

export function usePortfolioContent(): ContentState {
  const [state, setState] = useState<ContentState>({
    content: null,
    health: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const site = await fetchSiteContent();
        let health: ApiHealth | null = null;

        try {
          health = await fetchHealth();
        } catch {
          health = createOfflineHealth();
        }

        if (!active) {
          return;
        }

        setState({
          content: site.data,
          health,
          loading: false,
          error: null,
        });
      } catch (error) {
        let health: ApiHealth | null = null;

        try {
          health = await fetchHealth();
        } catch {
          health = createOfflineHealth();
        }

        if (!active) {
          return;
        }

        setState({
          content: null,
          health,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Portfolio content is unavailable right now.',
        });
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
