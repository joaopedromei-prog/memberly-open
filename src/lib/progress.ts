export const STORAGE_KEYS = {
  completed: 'memberly:completedLessons',
} as const;

export function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeWrite(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const PATENTES = [
  { name: 'Recruta', minPct: 0, level: 0 },
  { name: 'Soldado', minPct: 0.25, level: 1 },
  { name: 'Cabo', minPct: 0.5, level: 2 },
  { name: 'Sargento', minPct: 0.75, level: 3 },
  { name: 'Tenente', minPct: 1, level: 4 },
] as const;

export type PatenteName = (typeof PATENTES)[number]['name'];

export function getPatente(
  completedCount: number,
  totalCount: number
): (typeof PATENTES)[number] {
  const pct = totalCount > 0 ? completedCount / totalCount : 0;
  let current: (typeof PATENTES)[number] = PATENTES[0];
  for (const p of PATENTES) {
    if (pct >= p.minPct) current = p;
  }
  return current;
}
