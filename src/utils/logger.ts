/**
 * 日志工具 - 生产环境自动禁用
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log('[Official AI]', ...args);
    }
  },
  
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error('[Official AI]', ...args);
    }
  },
  
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn('[Official AI]', ...args);
    }
  },
  
  info: (...args: unknown[]) => {
    if (isDev) {
      console.info('[Official AI]', ...args);
    }
  },
};
