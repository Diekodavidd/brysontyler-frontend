import { getToken, clearToken } from "./token";

// Base URL of the Express/Render backend
const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

// Prevent multiple redirect-on-expiry calls
let isLoggingOut = false;

async function request(url, method, payload, config = {}) {
  const controller = new AbortController();
  const timeout = config.timeout ?? 15000;
  const id = setTimeout(() => controller.abort(), timeout);

  // Allow absolute URLs to pass through
  const fullUrl = /^https?:\/\//.test(url) ? url : `${API_BASE}${url}`;
  const token = getToken();

  try {
    const res = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(config.headers || {}),
      },
      body: payload ? JSON.stringify(payload) : undefined,
      signal: controller.signal,
      ...config,
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      clearToken();
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    if (!res.ok) {
      throw data || { message: "Request failed" };
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }

    const errorMessage =
      error?.message || error?.error || "Network error";

    throw new Error(errorMessage);
  } finally {
    clearTimeout(id);
  }
}

export default request;