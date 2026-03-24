"use client";

import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState("");

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  }, []);

  return { toast, showToast };
}
