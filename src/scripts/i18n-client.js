/**
 * 客户端国际化工具 - 统一实现
 * 注意：这是 JavaScript 文件，可以在 Astro script 标签中使用
 */

/**
 * 获取当前语言（客户端）
 * 优先级：localStorage > Cookie > navigator.language > 默认值(zh)
 */
export function getClientLocale() {
  if (typeof window === 'undefined') {
    return 'zh';
  }
  
  try {
    // 1. 优先从 localStorage 读取
    const saved = localStorage.getItem('locale');
    if (saved === 'zh' || saved === 'en') {
      return saved;
    }
    
    // 2. 如果 localStorage 没有，尝试从 Cookie 读取（同步服务端状态）
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key) {
        try {
          acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
        } catch (e) {
          acc[key] = value || '';
        }
      }
      return acc;
    }, {});
    
    if (cookies.locale === 'zh' || cookies.locale === 'en') {
      // 同步到 localStorage
      localStorage.setItem('locale', cookies.locale);
      return cookies.locale;
    }
    
    // 3. 从浏览器语言检测
    const browserLang = navigator.language || navigator.userLanguage || '';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('en')) return 'en';
  } catch (e) {
    // localStorage/Cookie 不可用时使用默认值
  }
  
  return 'zh';
}

/**
 * 设置语言（客户端）
 * 同时设置 localStorage 和 Cookie，确保服务端和客户端一致
 */
export function setClientLocale(locale) {
  if (typeof window === 'undefined') return;
  
  try {
    // 1. 设置 localStorage（客户端持久化）
    localStorage.setItem('locale', locale);
    
    // 2. 设置 Cookie（服务端可读取，避免刷新闪烁）
    document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // 3. 更新 HTML lang 属性
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    
    // 4. 触发全局语言变更事件（供页面监听）
    window.dispatchEvent(new CustomEvent('localechange', { 
      detail: { locale } 
    }));
  } catch (e) {
    // localStorage/Cookie 不可用时忽略
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

/**
 * HTML 转义函数
 */
export function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 国际化更新器类 - 自动更新页面中的所有国际化文本
 */
export class I18nUpdater {
  constructor(translations, colors) {
    this.translations = translations;
    this.colors = colors;
  }
  
  /**
   * 更新所有页面文本
   */
  updateAll(locale) {
    const t = this.translations[locale] || this.translations['zh'];
    
    // 更新搜索框占位符
    const searchInput = document.getElementById('search-input');
    if (searchInput && searchInput.tagName === 'INPUT') {
      searchInput.placeholder = t.search.placeholder;
    }
    
    // 更新清除按钮
    const clearBtn = document.getElementById('search-clear');
    if (clearBtn) {
      clearBtn.setAttribute('aria-label', t.search.clear);
    }
    
    // 更新统计信息
    this.updateStats(locale);
    
    // 更新分页文本
    this.updatePagination(locale);
    
    // 更新空状态文本
    this.updateEmptyState(locale);
    
    // 更新提交按钮
    const submitBtn = document.querySelector('[data-i18n="nav.submit"]');
    if (submitBtn) {
      submitBtn.textContent = t.nav.submit;
    }
  }
  
  /**
   * 更新统计信息
   */
  updateStats(locale, total, isSearching = false) {
    const statsText = document.getElementById('stats-text');
    if (!statsText) return;
    
    const t = this.translations[locale] || this.translations['zh'];
    const statsLabel = isSearching ? t.page.statsSearch : t.page.stats;
    const totalCount = total !== undefined ? String(total) : (document.getElementById('total-count')?.textContent || '0');
    
    statsText.innerHTML = `<span class="inline-flex items-center gap-2">
      <span class="px-2.5 py-1 rounded-md bg-[${this.colors.PRODUCTHUNT_LIGHT}] dark:bg-[${this.colors.PRODUCTHUNT}]/10 text-sm font-medium text-[${this.colors.PRODUCTHUNT}] dark:text-[${this.colors.PRODUCTHUNT_DARK}]">${escapeHtml(statsLabel)}</span>
      <span id="total-count" class="font-semibold text-gray-900 dark:text-white">${escapeHtml(totalCount)}</span>
      <span>${escapeHtml(t.page.items)}</span>
    </span>`;
  }
  
  /**
   * 更新分页文本
   */
  updatePagination(locale) {
    const t = this.translations[locale] || this.translations['zh'];
    
    const pageInfo = document.getElementById('pagination-page-info');
    if (pageInfo) {
      const match = pageInfo.textContent?.match(/(\d+)\s*\/\s*(\d+)/);
      if (match) {
        pageInfo.innerHTML = `${escapeHtml(t.pagination.page)} <span class="font-semibold text-gray-900 dark:text-white">${match[1]}</span> / <span class="font-semibold text-gray-900 dark:text-white">${match[2]}</span>`;
      }
    }
    
    const prevText = document.getElementById('prev-page-text');
    if (prevText) {
      prevText.textContent = t.pagination.prev;
    }
    
    const nextText = document.getElementById('next-page-text');
    if (nextText) {
      nextText.textContent = t.pagination.next;
    }
  }
  
  /**
   * 更新空状态文本
   */
  updateEmptyState(locale) {
    const messageEl = document.getElementById('empty-state-message');
    const descEl = document.getElementById('empty-state-description');
    
    if (messageEl && descEl) {
      const t = this.translations[locale] || this.translations['zh'];
      messageEl.textContent = t.emptyState.message;
      descEl.textContent = t.emptyState.description;
    }
  }
  
  /**
   * 更新语言显示
   */
  updateLanguageDisplay(locale) {
    const t = this.translations[locale] || this.translations['zh'];
    const languageConfig = t.language;
    
    const display = document.getElementById('language-display');
    if (display) {
      display.textContent = languageConfig.display[locale] || languageConfig.display.zh;
    }
    
    const button = document.getElementById('language-toggle');
    if (button) {
      button.setAttribute('title', languageConfig.toggle);
      button.setAttribute('aria-label', languageConfig.ariaLabel);
    }
  }
}
