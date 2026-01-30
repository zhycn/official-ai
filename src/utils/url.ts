/**
 * URL 工具函数
 */

/**
 * 获取 URL 参数（数字类型）
 */
export function getURLParamNumber(name: string): number | null {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(name);
  return value ? parseInt(value, 10) : null;
}

/**
 * 更新 URL 参数（不刷新页面）
 */
export function updateURLParam(name: string, value: number | string | null | undefined): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (value === null || value === undefined || value === '' || value === 1) {
    url.searchParams.delete(name);
  } else {
    url.searchParams.set(name, String(value));
  }
  window.history.pushState({ [name]: value }, '', url);
}

/**
 * 获取当前页码
 */
export function getCurrentPage(): number {
  const page = getURLParamNumber('page');
  return page && page > 0 ? page : 1;
}
