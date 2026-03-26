"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language } from "@/locales";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Use "ko" firmly as the default for matching Server-Side-Rendering
  const [language, setLanguage] = useState<Language>("ko");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run this code on the browser after hydration
    const saved = localStorage.getItem("language") as Language | null;
    
    if (saved === "ko" || saved === "en") {
      // eslint-disable-next-line
      setLanguage(saved);
    } else {
      const browserLang = window.navigator.language.toLowerCase();
      if (!browserLang.startsWith("ko")) {
        setLanguage("en");
      }
    }
    
    setIsMounted(true);
  }, []);

  // Hydration fix: don't render translating children until language is confirmed
  if (!isMounted) {
    return null;
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = dictionaries[language];
    
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }
    
    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
