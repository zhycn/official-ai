/**
 * 主题工具函数 - 用于动态生成 HTML 时获取颜色值
 * 
 * 这些函数用于在 JavaScript 中动态生成 HTML 时获取主题颜色
 * 避免硬编码颜色值，确保主题一致性
 */

import { THEME_COLORS } from './theme';

/**
 * 获取主题颜色值（用于内联样式或动态 HTML）
 */
export function getThemeColor(colorKey: keyof typeof THEME_COLORS): string {
  return THEME_COLORS[colorKey] as string;
}

/**
 * 获取带透明度的颜色值
 */
export function getThemeColorWithOpacity(
  colorKey: keyof typeof THEME_COLORS,
  opacity: number
): string {
  const color = THEME_COLORS[colorKey] as string;
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

/**
 * 获取预定义的透明度值
 */
export function getThemeOpacity(opacityKey: keyof typeof THEME_COLORS.opacity): number {
  return THEME_COLORS.opacity[opacityKey];
}

/**
 * 生成工具卡片样式类（用于动态 HTML）
 * 返回完整的 class 字符串，使用 CSS 变量
 */
export function getToolCardClasses(): string {
  return 'group relative block p-5 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 card-hover-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-[var(--theme-primary-light)]/0 before:via-[var(--theme-primary-light)]/0 before:to-[var(--theme-primary-light)]/0 hover:before:from-[var(--theme-primary-light)]/60 hover:before:via-[var(--theme-primary-light)]/30 hover:before:to-transparent dark:hover:before:from-[var(--theme-primary)]/5 dark:hover:before:via-[var(--theme-primary)]/3 dark:hover:before:to-transparent before:transition-all before:duration-300 before:-z-10';
}

/**
 * 生成分页按钮样式类（用于动态 HTML）
 */
export function getPaginationButtonClasses(): string {
  return 'pagination-btn inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700 disabled:hover:shadow-none dark:disabled:hover:bg-gray-800 dark:disabled:hover:border-gray-700 dark:disabled:hover:text-gray-300 touch-manipulation';
}
