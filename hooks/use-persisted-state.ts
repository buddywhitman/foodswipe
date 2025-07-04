import { useState, useEffect } from "react"

export function usePersistedState<T>(
  key: string,
  initialValue: T,
  options?: { session?: boolean }
): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const storage = options?.session ? window.sessionStorage : window.localStorage
      const stored = storage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setPersistedState = (val: T | ((prev: T) => T)) => {
    setState((prev) => {
      const next = typeof val === "function" ? (val as (prev: T) => T)(prev) : val
      return next
    })
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storage = options?.session ? window.sessionStorage : window.localStorage
        storage.setItem(key, JSON.stringify(state))
      } catch {}
    }
  }, [key, state])

  return [state, setPersistedState]
}
