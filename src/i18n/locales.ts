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
  },
};

// 获取当前语言
export function getLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh'; // 服务端默认中文
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
