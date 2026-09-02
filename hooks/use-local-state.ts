"use client";

import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from "react";

/**
 * `useState` that survives a refresh by living in localStorage. Handy for
 * prototypes that need "persistence" without a backend. Server render and
 * hydration use `initial`; the stored value shows right after.
 *
 *   const [todos, setTodos, reset] = useLocalState<Todo[]>("todos", []);
 *   setTodos((prev) => [...prev, todo]);
 */

const listeners = new Map<string, Set<() => void>>();

function emit(key: string) {
  listeners.get(key)?.forEach((l) => l());
}

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useLocalState<T>(key: string, initial: T) {
  // Latest `initial`, readable from callbacks without making them unstable.
  const initialRef = useRef(initial);
  useEffect(() => {
    initialRef.current = initial;
  });

  const subscribe = useCallback(
    (cb: () => void) => {
      let set = listeners.get(key);
      if (!set) {
        set = new Set();
        listeners.set(key, set);
      }
      set.add(cb);
      // Changes made in other tabs
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) cb();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        set.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    [key],
  );

  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );

  // Parse once per stored string so consumers get a stable object.
  const parsed = useMemo<{ v: T } | null>(() => {
    if (raw === null) return null;
    try {
      return { v: JSON.parse(raw) as T };
    } catch {
      return null;
    }
  }, [raw]);

  const value = parsed ? parsed.v : initial;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      let current = initialRef.current;
      const r = read(key);
      if (r !== null) {
        try {
          current = JSON.parse(r) as T;
        } catch {
          /* fall back to initial */
        }
      }
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(current) : next;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        /* storage disabled — non-fatal */
      }
      emit(key);
    },
    [key],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    emit(key);
  }, [key]);

  return [value, setValue, reset] as const;
}
