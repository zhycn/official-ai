/**
 * 统一主题管理系统
 * 
 * 产品设计原则：
 * 1. 品牌一致性：所有交互元素使用 ProductHunt 橙色系
 * 2. 视觉层次：通过透明度和阴影建立清晰的视觉层次
 * 3. 可访问性：确保足够的对比度和可读性
 * 4. 响应式：适配不同设备和屏幕尺寸
 */

// 基础颜色定义
export const THEME_COLORS = {
  // 主品牌色
  primary: '#FF5A50',           // ProductHunt 主橙色
  primaryDark: '#FF6B60',       // 深色模式主橙色（稍亮）
  primaryHover: '#E84A3F',      // 悬停状态（更深）
  primaryDarkHover: '#FF8A80',  // 深色模式悬停
  
  // 背景色
  primaryLight: '#FFF5F4',      // 浅色背景
  primaryLightDark: 'rgba(255, 90, 80, 0.1)', // 深色模式浅色背景（10%透明度）
  
  // 透明度变体（统一管理）
  opacity: {
    subtle: 0.08,    // 极淡背景（悬停）
    light: 0.1,      // 浅背景（按钮悬停）
    medium: 0.12,    // 中等背景（选中状态）
    strong: 0.15,    // 较强背景（高亮）
    darker: 0.18,    // 更深背景（激活状态）
    outline: 0.2,    // 轮廓线
    shadow: 0.25,   // 阴影
    overlay: 0.3,   // 遮罩层
  },
  
  // 阴影配置
  shadows: {
    // 浅色模式
    light: {
      default: '0 1px 6px rgba(32, 33, 36, 0.28)',
      hover: '0 2px 8px rgba(32, 33, 36, 0.3)',
      focus: '0 2px 8px rgba(255, 90, 80, 0.25)',
      card: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    // 深色模式
    dark: {
      default: '0 1px 6px rgba(0, 0, 0, 0.4)',
      hover: '0 2px 8px rgba(0, 0, 0, 0.5)',
      focus: '0 4px 12px rgba(255, 107, 96, 0.3)',
      card: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
    },
  },
} as const;

// 主题工具函数
export const ThemeUtils = {
  /**
   * 生成 rgba 颜色
   */
  rgba(color: string, opacity: number): string {
    // 如果是 hex 颜色，转换为 rgba
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // 如果已经是 rgba，替换透明度
    if (color.startsWith('rgba')) {
      return color.replace(/[\d.]+\)$/g, `${opacity})`);
    }
    return color;
  },
  
  /**
   * 获取主色（根据主题模式）
   */
  getPrimary(isDark: boolean): string {
    return isDark ? THEME_COLORS.primaryDark : THEME_COLORS.primary;
  },
  
  /**
   * 获取悬停色（根据主题模式）
   */
  getPrimaryHover(isDark: boolean): string {
    return isDark ? THEME_COLORS.primaryDarkHover : THEME_COLORS.primaryHover;
  },
  
  /**
   * 获取浅色背景（根据主题模式）
   */
  getLightBackground(isDark: boolean): string {
    return isDark ? THEME_COLORS.primaryLightDark : THEME_COLORS.primaryLight;
  },
} as const;

// 导出兼容旧版本的 COLORS（保持向后兼容）
export const COLORS = {
  PRODUCTHUNT: THEME_COLORS.primary,
  PRODUCTHUNT_HOVER: THEME_COLORS.primaryHover,
  PRODUCTHUNT_LIGHT: THEME_COLORS.primaryLight,
  PRODUCTHUNT_DARK: THEME_COLORS.primaryDark,
  PRODUCTHUNT_DARK_HOVER: THEME_COLORS.primaryDarkHover,
} as const;
