"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Lang } from "./translations";

type T = (typeof translations)[Lang];

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("site-lang") as Lang | null;
    if (stored === "en" || stored === "es") {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("site-lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as T }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
