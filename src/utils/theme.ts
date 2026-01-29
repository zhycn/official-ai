// 主题管理工具函数（全局共享）

export type Theme = 'light' | 'dark' | 'auto';

// 获取当前主题
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'auto';
  return (localStorage.getItem('theme') as Theme) || 'auto';
}

// 设置主题
export function setTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}

// 应用主题到 DOM
export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  
  const html = document.documentElement;
  
  // 先移除 dark 类
  html.classList.remove('dark');
  
  if (theme === 'dark') {
    html.classList.add('dark');
  } else if (theme === 'auto') {
    // 自动模式：根据系统偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      html.classList.add('dark');
    }
  }
  // light 模式：不添加 dark 类
}

// 获取下一个主题
export function getNextTheme(currentTheme: Theme): Theme {
  const themes: Theme[] = ['light', 'dark', 'auto'];
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
}

// 设置系统主题监听器
let systemThemeListener: ((e: MediaQueryListEvent) => void) | null = null;
let mediaQuery: MediaQueryList | null = null;

export function setupSystemThemeListener() {
  if (typeof window === 'undefined') return;
  
  // 移除旧的监听器
  if (systemThemeListener && mediaQuery) {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', systemThemeListener);
    } else if ((mediaQuery as any).removeListener) {
      (mediaQuery as any).removeListener(systemThemeListener);
    }
  }
  
  // 创建新的监听器
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemThemeListener = function(e: MediaQueryListEvent) {
    if (getTheme() === 'auto') {
      const html = document.documentElement;
      if (e.matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  };
  
  // 添加监听器
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', systemThemeListener);
  } else if ((mediaQuery as any).addListener) {
    (mediaQuery as any).addListener(systemThemeListener);
  }
}

// 移除系统主题监听器
export function removeSystemThemeListener() {
  if (systemThemeListener && mediaQuery) {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', systemThemeListener);
    } else if ((mediaQuery as any).removeListener) {
      (mediaQuery as any).removeListener(systemThemeListener);
    }
    systemThemeListener = null;
  }
}
