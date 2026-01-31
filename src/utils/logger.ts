/**
 * 日志工具 - 开发环境日志记录
 */

/**
 * 检查是否为开发环境
 */
function isDev(): boolean {
  return typeof window !== 'undefined' && window.location.hostname === 'localhost';
}

/**
 * 日志工具对象
 */
export const logger = {
  log: (...args: unknown[]): void => {
    if (isDev()) {
      console.log('[Official AI]', ...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (isDev()) {
      console.error('[Official AI]', ...args);
    }
  },
  warn: (...args: unknown[]): void => {
    if (isDev()) {
      console.warn('[Official AI]', ...args);
    }
  },
};
