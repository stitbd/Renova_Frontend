const KEY = "renova_active_call";

export function saveCallSession(data) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function getCallSession() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(sessionStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function clearCallSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}