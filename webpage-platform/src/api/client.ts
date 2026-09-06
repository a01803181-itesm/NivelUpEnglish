import { auth } from "../lib/firebase";
import { config } from "../lib/app-params";

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const user = auth.currentUser;
    let token: string = "";

    if (user) {
        token = await user.getIdToken();
    }

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${config.apiUrl}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || `API error: ${response.status}`);
    }

    return response.json();
}