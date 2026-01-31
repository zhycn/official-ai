/**
 * 搜索管理器 - 使用 Fuse.js 进行模糊搜索
 */

import type { Translations } from '../i18n/locales';
import { FUSE_SEARCH_LIMIT, FUSE_SEARCH_THRESHOLD } from './constants';
import { escapeHtml } from './dom';
import { logger } from './logger';

export interface Tool {
  id?: string;
  name: string;
  description: string;
  url: string;
}

declare global {
  interface Window {
    Fuse?: any;
  }
}

/**
 * 搜索管理器类
 */
export class SearchManager {
  private toolsData: Tool[];
  private translations: Record<string, Translations>;
  private fuse: any = null;
  private isInitialized = false;
  private initPromise: Promise<boolean> | null = null;
  private fuseLoadPromise: Promise<any> | null = null;

  constructor(toolsData: Tool[], translations: Record<string, Translations>) {
    this.toolsData = toolsData;
    this.translations = translations;
  }

  /**
   * 加载 Fuse.js（使用 CDN）
   */
  private async loadFuse(): Promise<any> {
    // 如果已经加载，直接返回
    if (typeof window !== 'undefined' && window.Fuse) {
      return window.Fuse;
    }

    // 如果正在加载，等待加载完成
    if (this.fuseLoadPromise) {
      return this.fuseLoadPromise;
    }

    // 创建加载 Promise
    this.fuseLoadPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Window is not available'));
        return;
      }

      // 检查是否已经通过 script 标签加载
      if (window.Fuse) {
        resolve(window.Fuse);
        return;
      }

      // 创建 script 标签加载 Fuse.js
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.min.js';
      script.async = true;
      script.onload = () => {
        if (window.Fuse) {
          resolve(window.Fuse);
        } else {
          reject(new Error('Fuse.js loaded but not available on window'));
        }
      };
      script.onerror = () => {
        reject(new Error('Failed to load Fuse.js from CDN'));
      };
      document.head.appendChild(script);
    });

    return this.fuseLoadPromise;
  }

  /**
   * 初始化 Fuse.js 搜索索引
   */
  async init(): Promise<boolean> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      try {
        // 加载 Fuse.js
        const Fuse = await this.loadFuse();

        if (!Fuse || typeof Fuse !== 'function') {
          throw new Error('Fuse.js not available');
        }

        // 创建搜索索引
        this.fuse = new Fuse(this.toolsData, {
          keys: ['name', 'description'],
          threshold: FUSE_SEARCH_THRESHOLD,
          includeScore: true,
        });

        this.isInitialized = true;
        logger.log('Fuse.js initialized successfully');
        return true;
      } catch (error) {
        logger.error('Failed to initialize Fuse.js:', error);
        this.isInitialized = false;
        return false;
      }
    })();

    return this.initPromise;
  }

  /**
   * 执行搜索（去重）
   */
  search(query: string, limit: number = FUSE_SEARCH_LIMIT): Tool[] {
    if (!this.isInitialized || !this.fuse || !query.trim()) {
      return [];
    }

    try {
      const results = this.fuse.search(query, { limit });
      const items = results.map((result: any) => result.item);
      
      // 去重：基于 id 或 name
      const seen = new Set<string>();
      return items.filter((tool: Tool) => {
        const key = tool.id || tool.name;
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
    } catch (error) {
      logger.error('Search error:', error);
      return [];
    }
  }

  /**
   * 高亮匹配文本
   */
  highlightText(text: string, query: string): string {
    if (!query || !text) return escapeHtml(text);
    const escapedText = escapeHtml(text);
    const escapedQuery = escapeHtml(query);
    const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return escapedText.replace(regex, '<span class="highlight">$1</span>');
  }

  /**
   * 等待初始化完成
   */
  async waitForInit(): Promise<boolean> {
    if (this.isInitialized) {
      return true;
    }
    if (!this.initPromise) {
      await this.init();
    }
    return this.initPromise || Promise.resolve(false);
  }
}
