"use client";

import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/useToast";
import { usePersistedState } from "@/hooks/usePersistedState";
import { copyToClipboard } from "@/utils/clipboard";

export function useConverterState(pageKey: string = "converter") {
  const [input, setInput] = usePersistedState(`${pageKey}-input`, "");
  const { t } = useLanguage();
  const { toast, showToast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const copyResult = async (result: string) => {
    const ok = await copyToClipboard(result);
    showToast(ok ? t("common.toast.resultCopied") : t("common.toast.copyFailed"));
  };

  const clearInput = () => {
    setInput("");
    showToast(t("common.toast.cleared"));
  };

  return { input, setInput, toast, textareaRef, copyResult, clearInput, showToast };
}
