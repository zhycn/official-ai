/**
 * Cookie 工具函数 - 统一管理 Cookie 读写
 */

const COOKIE_NAME = 'locale';
const COOKIE_OPTIONS = {
  path: '/',
  maxAge: 31536000, // 1 年
  sameSite: 'Lax' as const,
};

/**
 * 获取 Cookie 值
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key) {
        acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
      return acc;
    }, {} as Record<string, string>);
    
    return cookies[name] || null;
  } catch (e) {
    return null;
  }
}

/**
 * 设置 Cookie
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    path?: string;
    maxAge?: number;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}
): void {
  if (typeof document === 'undefined') return;
  
  const opts = { ...COOKIE_OPTIONS, ...options };
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  if (opts.path) {
    cookieString += `; path=${opts.path}`;
  }
  
  if (opts.maxAge) {
    cookieString += `; max-age=${opts.maxAge}`;
  }
  
  if (opts.sameSite) {
    cookieString += `; SameSite=${opts.sameSite}`;
  }
  
  document.cookie = cookieString;
}

/**
 * 删除 Cookie
 */
export function deleteCookie(name: string, path = '/'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(name)}=; path=${path}; max-age=0`;
}

/**
 * 获取语言 Cookie
 */
export function getLocaleCookie(): string | null {
  return getCookie(COOKIE_NAME);
}

/**
 * 设置语言 Cookie
 */
export function setLocaleCookie(locale: string): void {
  setCookie(COOKIE_NAME, locale, COOKIE_OPTIONS);
}
