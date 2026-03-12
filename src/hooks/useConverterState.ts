"use client";

import { useRef, useEffect, useState } from "react";

export function useConverterState() {
  const [input, setInput] = useState("");
  const [toast, setToast] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const copyResult = (result: string) => {
    navigator.clipboard.writeText(result);
    showToast("변환 결과가 복사되었습니다");
  };

  const clearInput = () => {
    setInput("");
    showToast("초기화되었습니다");
  };

  return {
    input,
    setInput,
    toast,
    textareaRef,
    copyResult,
    clearInput,
    showToast,
  };
}
