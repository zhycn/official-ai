/**
 * URL 工具函数
 */

/**
 * 获取 URL 查询参数
 */
export function getURLParam(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * 获取 URL 查询参数（数字类型）
 */
export function getURLParamNumber(name: string): number | null {
  const value = getURLParam(name);
  return value ? parseInt(value, 10) : null;
}

/**
 * 更新 URL 参数（不刷新页面）
 */
export function updateURLParam(name: string, value: string | number | null | undefined): void {
  const url = new URL(window.location.href);
  
  if (value === null || value === undefined || value === '' || value === 1) {
    // 如果是第一页或无效值，移除参数
    url.searchParams.delete(name);
  } else {
    url.searchParams.set(name, String(value));
  }
  
  window.history.pushState({ [name]: value }, '', url);
}

/**
 * 移除 URL 参数
 */
export function removeURLParam(name: string): void {
  updateURLParam(name, null);
}

/**
 * 获取当前页面路径
 */
export function getCurrentPath(): string {
  return window.location.pathname;
}

/**
 * 检查是否为有效页码
 */
export function isValidPage(page: number | null, totalPages: number): boolean {
  return page !== null && page > 0 && page <= totalPages;
}
