"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * sessionStorage에 값을 자동 저장/복원하는 useState 래퍼.
 * 탭 간 전환 시 입력 내용이 유지됩니다.
 */
export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = sessionStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // sessionStorage 용량 초과 시 무시
    }
  }, [key, value]);

  const clear = useCallback(() => {
    setValue(initialValue);
    sessionStorage.removeItem(key);
  }, [key, initialValue]);

  return [value, setValue, clear] as const;
}
