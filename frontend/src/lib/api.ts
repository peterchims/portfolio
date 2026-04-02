import type {
  ApiHealth,
  ContactPayload,
  ContactResponse,
  InteractionPayload,
  PortfolioContent,
  SitePayload,
} from '../types/portfolio';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';

class ApiError extends Error {
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

export function fetchSiteContent(): Promise<SitePayload> {
  return request<SitePayload>('/api/site');
}

export function fetchHealth(): Promise<ApiHealth> {
  return request<ApiHealth>('/api/health');
}

export function sendContactRequest(
  payload: ContactPayload
): Promise<ContactResponse> {
  return request<ContactResponse>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface ChatConversationMessage {
  id: string;
  conversationId: string;
  content: string;
  sender: string;
  isAutomated: boolean;
  senderName?: string | null;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  visitorId: string;
  visitorName: string;
  visitorEmail: string;
  messages: ChatConversationMessage[];
  isActive: boolean;
  createdAt: string;
}

export async function trackInteraction(
  payload: InteractionPayload
): Promise<void> {
  try {
    await request<{ ok: boolean }>('/api/interactions', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Ignore analytics transport failures.
  }
}

export function startChatConversation(data: {
  visitorName: string;
  visitorEmail: string;
  initialMessage: string;
}): Promise<ChatConversation> {
  return request<ChatConversation>('/api/chat/start', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function sendChatMessage(
  conversationId: string,
  message: string
): Promise<ChatConversation> {
  return request<ChatConversation>('/api/chat/message', {
    method: 'POST',
    body: JSON.stringify({ conversationId, content: message }),
  });
}

export function getConversation(conversationId: string): Promise<ChatConversation> {
  return request<ChatConversation>(`/api/chat/${conversationId}`);
}

function createAdminHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function validateAdminSession(token: string): Promise<{ ok: boolean; message: string }> {
  return request<{ ok: boolean; message: string }>('/api/admin/session', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

export function fetchAdminSiteContent(token: string): Promise<PortfolioContent> {
  return request<PortfolioContent>('/api/admin/site-content', {
    headers: createAdminHeaders(token),
  });
}

export function updateAdminSiteContent(
  token: string,
  content: PortfolioContent
): Promise<SitePayload> {
  return request<SitePayload>('/api/admin/site-content', {
    method: 'PUT',
    headers: createAdminHeaders(token),
    body: JSON.stringify(content),
  });
}
