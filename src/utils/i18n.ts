// 国际化工具函数（客户端使用）

import type { Locale, Translations } from '../i18n/locales';
import { translations } from '../i18n/locales';

// 获取当前语言
export function getLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh';
  }
  return (localStorage.getItem('locale') || 'zh') as Locale;
}

// 设置语言
export function setLocale(locale: Locale) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
    window.dispatchEvent(new CustomEvent('localechange', { detail: { locale } }));
  }
}

// 获取翻译文本
export function t(key: string, locale?: Locale): string {
  const currentLocale = locale || getLocale();
  const keys = key.split('.');
  let value: any = translations[currentLocale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

// 获取所有翻译
export function getTranslations(locale?: Locale): Translations {
  const currentLocale = locale || getLocale();
  return translations[currentLocale];
}
