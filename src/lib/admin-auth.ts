// Demo-only admin auth: hardcoded credentials + a localStorage flag, no backend.
export const ADMIN_CREDENTIALS = {
  email: "admin@amarawellness.com",
  password: "Amara@Admin123",
};

const ADMIN_SESSION_KEY = "amara:isAdmin";

export function isAdminCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}

export function setAdminSession() {
  if (typeof window !== "undefined") window.localStorage.setItem(ADMIN_SESSION_KEY, "true");
}

export function clearAdminSession() {
  if (typeof window !== "undefined") window.localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function hasAdminSession() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}
