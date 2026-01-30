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
}

export const translations: Record<Locale, Translations> = {
  zh: {
    nav: {
      login: '登录',
    },
    search: {
      placeholder: '搜索官方AI工具...',
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
      title: 'Official AI',
      stats: '已收录',
      statsSearch: '搜索结果',
      items: '项',
    },
    pagination: {
      page: '页',
      prev: '上一页',
      next: '下一页',
    },
    toolCard: {
      favorite: '收藏',
    },
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
  },
  en: {
    nav: {
      login: 'Login',
      submit: 'Submit Link',
    },
    search: {
      placeholder: 'Search Official AI tools...',
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
      title: 'Official AI',
      stats: 'Browse the official AI tools directory',
      statsSearch: 'Search for',
      items: 'items',
    },
    pagination: {
      page: 'Page',
      prev: 'Previous',
      next: 'Next',
    },
    toolCard: {
      favorite: 'Favorite',
    },
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
  },
};

// 导出翻译对象供客户端使用
export const clientTranslations = translations;

// 从请求中获取语言偏好（服务端使用）
export function getLocaleFromRequest(request: Request): Locale {
  // 从 Cookie 中读取语言偏好
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    const locale = cookies['locale'];
    if (locale === 'zh' || locale === 'en') {
      return locale;
    }
  }
  
  // 如果没有 Cookie，尝试从 Accept-Language 请求头读取
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    if (acceptLanguage.toLowerCase().includes('zh')) {
      return 'zh';
    }
    if (acceptLanguage.toLowerCase().includes('en')) {
      return 'en';
    }
  }
  
  return 'zh'; // 默认中文
}

// 获取当前语言
export function getLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh'; // 服务端默认中文（需要 request 对象时使用 getLocaleFromRequest）
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
