/**
 * 搜索功能客户端脚本
 * 使用 Fuse.js 进行客户端搜索
 */

import Fuse from 'fuse.js';

// 导出初始化函数
export function createFuseIndex(toolsData, options = {}) {
  const {
    threshold = 0.3,
    keys = ['name', 'description'],
    includeScore = true
  } = options;
  
  return new Fuse(toolsData, {
    keys,
    threshold,
    includeScore,
  });
}

// 导出执行搜索函数
export function performFuseSearch(fuseInstance, query, limit = 8) {
  if (!fuseInstance || !query.trim()) {
    return [];
  }
  try {
    const results = fuseInstance.search(query, { limit });
    return results.map((result) => result.item);
  } catch (error) {
    console.error('[Search] Search error:', error);
    return [];
  }
}
