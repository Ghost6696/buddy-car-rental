// Caren.io VehicleAPI HTTP client with session-based auth

const API_URL = import.meta.env.VITE_CAREN_API_URL || 'https://api.caren.is/VehicleAPI';
const USERNAME = import.meta.env.VITE_CAREN_USERNAME || '';
const PASSWORD = import.meta.env.VITE_CAREN_PASSWORD || '';

let sessionKey: string | null = null;
let sessionExpiry: number = 0;

/** Authenticate with Caren.io and get a session key */
async function login(): Promise<string> {
    const res = await fetch(`${API_URL}/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
    });

    if (!res.ok) throw new Error(`Caren login failed: ${res.status}`);

    const data = await res.json();
    sessionKey = data.sessionKey;
    // Session expires in 30 min; refresh 2 minutes early
    sessionExpiry = Date.now() + 28 * 60 * 1000;
    return sessionKey!;
}

/** Ensure we have a valid session */
async function ensureSession(): Promise<string> {
    if (!sessionKey || Date.now() >= sessionExpiry) {
        return login();
    }
    return sessionKey;
}

/** Make an authenticated GET request to Caren.io */
export async function carenGet<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const key = await ensureSession();
    const url = new URL(`${API_URL}${endpoint}`);
    url.searchParams.set('sessionKey', key);
    if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Caren API error: ${res.status} ${endpoint}`);
    return res.json();
}

/** Make an authenticated POST request to Caren.io */
export async function carenPost<T>(endpoint: string, body: unknown): Promise<T> {
    const key = await ensureSession();
    const url = new URL(`${API_URL}${endpoint}`);
    url.searchParams.set('sessionKey', key);

    const res = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Caren API error: ${res.status} ${endpoint}`);
    return res.json();
}

/** Make an authenticated PUT request */
export async function carenPut<T>(endpoint: string, body: unknown): Promise<T> {
    const key = await ensureSession();
    const url = new URL(`${API_URL}${endpoint}`);
    url.searchParams.set('sessionKey', key);

    const res = await fetch(url.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Caren API error: ${res.status} ${endpoint}`);
    return res.json();
}

/** Make an authenticated DELETE request */
export async function carenDelete<T>(endpoint: string): Promise<T> {
    const key = await ensureSession();
    const url = new URL(`${API_URL}${endpoint}`);
    url.searchParams.set('sessionKey', key);

    const res = await fetch(url.toString(), { method: 'DELETE' });
    if (!res.ok) throw new Error(`Caren API error: ${res.status} ${endpoint}`);
    return res.json();
}
