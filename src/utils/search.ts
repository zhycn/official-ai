/**
 * 搜索工具函数
 */

import Fuse from 'fuse.js';
import type { Locale, Translations } from '../i18n/locales';
import { escapeHtml } from './dom';
import { FUSE_SEARCH_LIMIT, FUSE_SEARCH_THRESHOLD } from './constants';

export interface Tool {
  id?: string;
  name: string;
  description: string;
  url: string;
}

/**
 * 初始化 Fuse.js 搜索实例
 */
export function createFuseIndex(tools: Tool[]): Fuse<Tool> {
  return new Fuse(tools, {
    keys: ['name', 'description'],
    threshold: FUSE_SEARCH_THRESHOLD,
    includeScore: true,
  });
}

/**
 * 执行搜索
 */
export function performFuseSearch(
  fuse: Fuse<Tool>,
  query: string,
  limit?: number
): Tool[] {
  if (!query.trim()) {
    return [];
  }
  
  try {
    const results = fuse.search(query, { limit: limit || FUSE_SEARCH_LIMIT });
    return results.map((result) => result.item);
  } catch (error) {
    return [];
  }
}

/**
 * 高亮匹配文本
 */
export function highlightText(text: string, query: string): string {
  if (!query || !text) return escapeHtml(text);
  
  const escapedText = escapeHtml(text);
  const escapedQuery = escapeHtml(query);
  const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapedText.replace(regex, '<span class="highlight">$1</span>');
}

/**
 * 生成工具卡片 HTML
 */
export function generateToolCardHTML(
  tool: Tool,
  translations: Record<Locale, Translations>,
  locale: Locale
): string {
  const t = translations[locale] || translations['zh'];
  const openLinkLabel = t.toolCard.openLink || 'Open link';
  
  return `
    <a
      href="${escapeHtml(tool.url)}"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative block p-5 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-[#FF5A50] dark:hover:border-[#FF6B60] hover:shadow-lg hover:shadow-[#FF5A50]/10 dark:hover:shadow-[#FF6B60]/20 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-[#FFF5F4]/0 before:via-[#FFF5F4]/0 before:to-[#FFF5F4]/0 hover:before:from-[#FFF5F4]/60 hover:before:via-[#FFF5F4]/30 hover:before:to-transparent dark:hover:before:from-[#FF5A50]/5 dark:hover:before:via-[#FF5A50]/3 dark:hover:before:to-transparent before:transition-all before:duration-300 before:-z-10"
    >
      <div class="relative z-10 flex items-start justify-between mb-3 sm:mb-4">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <span class="flex-shrink-0 w-2.5 h-2.5 bg-gradient-to-br from-[#FF5A50] via-[#FF6B60] to-[#FF5A50] rounded-full mt-1 shadow-sm shadow-[#FF5A50]/50 ring-1 ring-[#FF5A50]/20"></span>
          <h3 class="font-semibold text-gray-900 dark:text-white truncate group-hover:text-[#FF5A50] dark:group-hover:text-[#FF6B60] transition-colors duration-300 text-base sm:text-lg leading-snug">
            ${escapeHtml(tool.name)}
          </h3>
        </div>
        <button
          class="flex-shrink-0 p-1.5 sm:p-2 text-gray-400 dark:text-gray-500 hover:text-[#FF5A50] dark:hover:text-[#FF6B60] hover:bg-[#FFF5F4] dark:hover:bg-[#FF5A50]/10 rounded-lg transition-all duration-300 active:scale-95 touch-manipulation"
          aria-label="${escapeHtml(openLinkLabel)}"
          onclick="event.preventDefault(); event.stopPropagation(); window.open('${escapeHtml(tool.url)}', '_blank', 'noopener,noreferrer');"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
      <p class="relative z-10 text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed min-h-[3.25rem] sm:min-h-[3.5rem]">
        ${escapeHtml(tool.description)}
      </p>
    </a>
  `;
}

/**
 * 生成空状态 HTML
 */
export function generateEmptyStateHTML(
  translations: Record<Locale, Translations>,
  locale: Locale
): string {
  const t = translations[locale] || translations['zh'];
  const emptyState = t.emptyState;
  
  return `
    <div class="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div class="w-24 h-24 mb-6 rounded-full bg-[#FFF5F4] dark:bg-[#FF5A50]/10 flex items-center justify-center">
        <svg class="w-12 h-12 text-[#FF5A50] dark:text-[#FF6B60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 id="empty-state-message" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        ${escapeHtml(emptyState.message)}
      </h3>
      <p id="empty-state-description" class="text-gray-500 dark:text-gray-400 text-center max-w-md">
        ${escapeHtml(emptyState.description)}
      </p>
    </div>
  `;
}
