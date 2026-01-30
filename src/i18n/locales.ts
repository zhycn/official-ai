// 国际化语言配置
export type Locale = 'zh' | 'en';

export interface Translations {
  // 导航栏
  nav: {
    login: string;
    submit: string;
  };
  // 搜索框
  search: {
    placeholder: string;
    noResults: string;
    clear: string;
  };
  // 主题切换
  theme: {
    light: string;
    dark: string;
    auto: string;
    toggle: string;
  };
  // 页面内容
  page: {
    title: string;
    stats: string;
    statsSearch: string;
    items: string;
  };
  // 分页
  pagination: {
    page: string;
    prev: string;
    next: string;
  };
  // 工具卡片
  toolCard: {
    favorite: string;
  };
  // 404 页面
  notFound: {
    title: string;
    description: string;
    backHome: string;
    goBack: string;
  };
  // 空状态
  emptyState: {
    message: string;
    description: string;
  };
  
  // 语言切换
  language: {
    display: {
      zh: string;
      en: string;
    };
    toggle: string;
    ariaLabel: string;
  };
}

export const translations: Record<Locale, Translations> = {
  zh: {
    nav: { login: '登录', submit: '提交链接' },
    search: {
      placeholder: '搜索 AI 工具...',
      noResults: '未找到匹配的工具',
      clear: '清除搜索',
    },
    theme: {
      light: '亮色',
      dark: '暗色',
      auto: '自动',
      toggle: '点击切换主题：亮色 / 暗色 / 自动',
    },
    page: {
      title: 'AI Tools',
      stats: '已收录',
      statsSearch: '搜索结果',
      items: '项',
    },
    pagination: { page: '页', prev: '上一页', next: '下一页' },
    toolCard: { favorite: '收藏' },
    notFound: {
      title: '页面未找到',
      description: '抱歉，您访问的页面不存在或已被移除。',
      backHome: '返回首页',
      goBack: '返回上一页',
    },
    emptyState: {
      message: '未找到相关工具',
      description: '尝试调整搜索条件或浏览所有工具',
    },
    language: {
      display: {
        zh: 'CN',
        en: 'EN',
      },
      toggle: '切换语言：中文 / English',
      ariaLabel: '切换语言',
    },
  },
  en: {
    nav: { login: 'Login', submit: 'Submit' },
    search: {
      placeholder: 'Search AI tools...',
      noResults: 'No matching tools found',
      clear: 'Clear search',
    },
    theme: {
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto',
      toggle: 'Click to toggle theme: Light / Dark / Auto',
    },
    page: {
      title: 'AI Tools',
      stats: 'Collected',
      statsSearch: 'Search for',
      items: 'items',
    },
    pagination: { page: 'Page', prev: 'Previous', next: 'Next' },
    toolCard: { favorite: 'Favorite' },
    notFound: {
      title: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been removed.',
      backHome: 'Back to Home',
      goBack: 'Go Back',
    },
    emptyState: {
      message: 'No tools found',
      description: 'Try adjusting your search or browse all tools',
    },
    language: {
      display: {
        zh: 'CN',
        en: 'EN',
      },
      toggle: 'Switch language: 中文 / English',
      ariaLabel: 'Switch language',
    },
  },
};

// 导出翻译对象供客户端使用
export const clientTranslations = translations;

// ========================
// 从请求中安全获取语言偏好（服务端使用）
// ========================
export function getLocaleFromRequest(request: Request): Locale {
  // 1. 优先从 Cookie 获取（需解码并验证）
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    try {
      const cookies = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .reduce((acc, cookie) => {
          const [key, value] = cookie.split('=');
          if (key && value) {
            acc[decodeURIComponent(key)] = decodeURIComponent(value);
          }
          return acc;
        }, {} as Record<string, string>);

      const locale = cookies['locale'];
      if (locale === 'zh' || locale === 'en') {
        return locale;
      }
    } catch (e) {
      // 忽略 Cookie 解析错误，降级到 Accept-Language
    }
  }

  // 2. 从 Accept-Language 请求头解析（支持 zh-CN, en-US 等）
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // 按权重排序（如: "zh-CN,zh;q=0.9,en;q=0.8"）
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, q] = lang.trim().split(';q=');
        return {
          code: code.toLowerCase(),
          weight: q ? parseFloat(q) : 1.0,
        };
      })
      .sort((a, b) => b.weight - a.weight);

    for (const { code } of languages) {
      // 匹配主语言（如 zh-CN → zh）
      if (code.startsWith('zh')) return 'zh';
      if (code.startsWith('en')) return 'en';
    }
  }

  // 3. 默认中文
  return 'zh';
}

// ========================
// 客户端：获取当前语言（浏览器环境）
// ========================
export function getClientLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh'; // 服务端默认
  }
  // 优先 localStorage，其次 navigator.language
  const saved = localStorage.getItem('locale');
  if (saved === 'zh' || saved === 'en') {
    return saved;
  }
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('en')) return 'en';
  return 'zh'; // 兜底
}

// ========================
// 统一翻译函数（服务端/客户端通用）
// ========================
export function t(key: string, locale?: Locale): string {
  const currentLocale = locale || (typeof window === 'undefined' ? 'zh' : getClientLocale());

  // 安全遍历嵌套 key（如 'notFound.title'）
  const keys = key.split('.');
  let value: any = translations[currentLocale];

  for (const k of keys) {
    if (value == null || typeof value !== 'object') {
      break;
    }
    value = value[k];
  }

  // 返回翻译文本，或原始 key（便于调试）
  return typeof value === 'string' ? value : key;
}

// ========================
// 设置语言（仅客户端）
// ========================
export function setLocale(locale: Locale) {
  if (typeof window === 'undefined') return;

  localStorage.setItem('locale', locale);
  // 触发全局语言变更事件（供页面监听）
  window.dispatchEvent(new CustomEvent('localechange', { detail: { locale } }));
}


