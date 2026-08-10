import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import en from './en.json'
import ar from './ar.json'

export type Lang = 'en' | 'ar'
export type Dictionary = typeof en
export type ArticleCopy = (typeof en.articles)[keyof typeof en.articles]

const dictionaries: Record<Lang, Dictionary> = { en, ar }

export const LANG_STORAGE_KEY = 'rmlingo-lang'

/** Resolve the initial language from the pre-paint <html> attribute (set in
 *  main.tsx), falling back to the saved preference, then to Arabic. */
export function detectLang(): Lang {
  if (typeof document !== 'undefined') {
    const htmlLang = document.documentElement.lang
    if (htmlLang === 'en' || htmlLang === 'ar') return htmlLang
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY)
      if (saved === 'en' || saved === 'ar') return saved
    } catch {
      /* storage unavailable */
    }
  }
  return 'ar'
}

/** Apply a language to <html> (dir + lang) and persist the choice. */
export function applyLang(lang: Lang) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
  } catch {
    /* private mode */
  }
}

/** Interpolate `{placeholders}` in a template string. */
export function format(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? vars[key] : `{${key}}`,
  )
}

type I18nValue = {
  lang: Lang
  dict: Dictionary
  setLang: (lang: Lang) => void
  toggle: () => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dict: dictionaries[lang],
      setLang: (next) => {
        applyLang(next)
        setLangState(next)
      },
      toggle: () => {
        const next: Lang = lang === 'ar' ? 'en' : 'ar'
        applyLang(next)
        setLangState(next)
      },
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    // Fallback for isolated component renders (unit tests without a provider):
    // read the current direction statically from <html>.
    const lang: Lang =
      typeof document !== 'undefined' &&
      document.documentElement.lang === 'en'
        ? 'en'
        : 'ar'
    return {
      lang,
      dict: dictionaries[lang],
      setLang: applyLang,
      toggle: () => applyLang(lang === 'ar' ? 'en' : 'ar'),
    }
  }
  return ctx
}
