/**
 * 项目常量定义
 */

export const ITEMS_PER_PAGE = 24;
export const SEARCH_DEBOUNCE_MS = 150;
export const FUSE_SEARCH_LIMIT = 8;
export const FUSE_SEARCH_THRESHOLD = 0.3;

// 主题颜色常量（向后兼容，推荐使用 theme.ts 中的 THEME_COLORS）
export { COLORS } from './theme';

// DOM 元素 ID
export const DOM_IDS = {
  TOOLS_CONTAINER: 'tools-container',
  PAGINATION_CONTAINER: 'pagination-container',
  SEARCH_INPUT: 'search-input',
  SEARCH_CLEAR: 'search-clear',
  SEARCH_CONTAINER: 'search-container',
  SEARCH_SUGGESTIONS: 'search-suggestions',
  SUGGESTIONS_LIST: 'suggestions-list',
  STATS_TEXT: 'stats-text',
  TOTAL_COUNT: 'total-count',
  LANGUAGE_TOGGLE: 'language-toggle',
  LANGUAGE_DISPLAY: 'language-display',
  THEME_TOGGLE: 'theme-toggle',
  MOBILE_SEARCH_TOGGLE: 'mobile-search-toggle',
  MOBILE_SEARCH_CONTAINER: 'mobile-search-container',
} as const;
