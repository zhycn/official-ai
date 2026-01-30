/**
 * 客户端工具函数 - 用于 Astro 客户端脚本
 * 注意：这些函数与 src/utils/dom.ts 和 src/utils/i18n-client.ts 保持一致
 */

/**
 * HTML 转义函数 - 防止 XSS 攻击
 */
export function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 获取当前语言（客户端）
 */
export function getClientLocale() {
  try {
    const saved = localStorage.getItem('locale');
    if (saved === 'zh' || saved === 'en') {
      return saved;
    }
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('en')) return 'en';
  } catch (e) {
    // localStorage 不可用时使用默认值
  }
  return 'zh';
}

/**
 * 设置语言（客户端）
 */
export function setClientLocale(locale) {
  try {
    localStorage.setItem('locale', locale);
    window.dispatchEvent(new CustomEvent('localechange', { 
      detail: { locale } 
    }));
  } catch (e) {
    // localStorage 不可用时忽略
  }
}

/**
 * 客户端翻译函数
 */
export function tClient(key, translations, locale) {
  const currentLocale = locale || getClientLocale();
  const keys = key.split('.');
  let value = translations[currentLocale];
  
  for (const k of keys) {
    if (value == null || typeof value !== 'object') {
      break;
    }
    value = value[k];
  }
  
  return typeof value === 'string' ? value : key;
}
