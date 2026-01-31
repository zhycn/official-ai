/**
 * DOM 操作工具函数 - 安全的 DOM 操作方法
 */

/**
 * HTML 转义函数 - 防止 XSS 攻击
 */
export function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 安全地设置元素文本内容
 */
export function setTextContent(element: HTMLElement | null, text: string): void {
  if (element) {
    element.textContent = text;
  }
}

/**
 * 安全地设置元素 HTML（已转义）
 */
export function setSafeHTML(element: HTMLElement | null, html: string): void {
  if (element) {
    element.innerHTML = html;
  }
}

/**
 * 创建文档片段 - 用于批量 DOM 操作
 */
export function createFragment(): DocumentFragment {
  return document.createDocumentFragment();
}

/**
 * 等待 DOM 元素出现
 */
export function waitForElement(
  selector: string,
  timeout = 5000
): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector) as HTMLElement;
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}

/**
 * 批量更新 DOM - 使用 DocumentFragment 优化性能
 */
export function batchUpdateDOM(
  container: HTMLElement,
  updates: (fragment: DocumentFragment) => void
): void {
  const fragment = createFragment();
  updates(fragment);
  container.innerHTML = '';
  container.appendChild(fragment);
}
