const origin = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), 60000);
  try {
    const response = await fetch(`${origin}${path}`, {...init, signal: timeout.signal});
    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  } finally { clearTimeout(timer); }
}
