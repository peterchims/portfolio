import type {
  ApiHealth,
  ContactPayload,
  ContactResponse,
} from '../types/portfolio';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = (await response.json()) as { message?: string };
      throw new ApiError(data.message || 'Request failed.');
    }
    throw new ApiError((await response.text()) || 'Request failed.');
  }

  return (await response.json()) as T;
}

export function sendContactRequest(
  payload: ContactPayload,
): Promise<ContactResponse> {
  return request<ContactResponse>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchHealth(): Promise<ApiHealth> {
  return request<ApiHealth>('/api/health');
}
