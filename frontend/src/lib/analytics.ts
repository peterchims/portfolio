import type { InteractionPayload } from '../types/portfolio';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';

/**
 * Fire-and-forget interaction tracking. Never throws, never blocks the UI.
 */
export function trackInteraction(payload: InteractionPayload): void {
  try {
    void fetch(`${API_BASE_URL}/api/interactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* analytics transport failure is not an app error */
    });
  } catch {
    /* ignore */
  }
}
