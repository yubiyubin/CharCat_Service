"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function useConverterState() {
  const [input, setInput] = useState("");
  const [toast, setToast] = useState("");
  const { t } = useLanguage();
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
    showToast(t("common.toast.resultCopied"));
  };

  const clearInput = () => {
    setInput("");
    showToast(t("common.toast.cleared"));
  };

  return { input, setInput, toast, textareaRef, copyResult, clearInput, showToast };
}
