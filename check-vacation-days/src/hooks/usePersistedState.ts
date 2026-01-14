import { useEffect, useState } from "react";

export function useUserPersistedState<T>(
  userId: number | null,
  key: string,
  initialValue: T
) {
  const storageKey = userId ? `user_${userId}_${key}` : null;

  const [state, setState] = useState<T>(() => {
    if (!storageKey) return initialValue;
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [storageKey, state]);

  return [state, setState] as const;
}