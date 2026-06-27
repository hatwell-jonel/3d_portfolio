const TOUR_KEY = "portfolio-tour-completed";
const TTL_MS = 86_400_000; // 24 hours in milliseconds

export function hasTourCompleted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(TOUR_KEY);
    if (!raw) return false;
    const { timestamp } = JSON.parse(raw) as { timestamp: number };
    return Date.now() - timestamp < TTL_MS;
  } catch {
    return false;
  }
}

export function setTourCompleted(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TOUR_KEY, JSON.stringify({ timestamp: Date.now() }));
  } catch {
    /* storage full or blocked */
  }
}

export function resetTour(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TOUR_KEY);
  } catch {
    /* storage full or blocked */
  }
}
