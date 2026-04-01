/**
 * 颜色常量配置
 * 统一应用中的颜色使用，避免硬编码
 */

// ==================== 主题色 ====================
export const THEME_COLORS = {
  // 主色调
  PRIMARY: '#1677ff',
  PRIMARY_LIGHT: '#4096ff',
  PRIMARY_DARK: '#0958d9',

  // 成功色
  SUCCESS: '#52c41a',
  SUCCESS_LIGHT: '#73d13d',

  // 警告色
  WARNING: '#faad14',
  WARNING_LIGHT: '#ffc53d',

  // 错误色
  ERROR: '#f5222d',
  ERROR_LIGHT: '#ff4d4f',

  // 信息色
  INFO: '#1677ff',
};

// ==================== 深色主题色 ====================
export const DARK_THEME_COLORS = {
  // 背景色
  BG_PAGE: '#0a1628',
  BG_CARD: '#0d1e3a',
  BG_ELEVATED: '#132743',
  BG_HOVER: '#1a3a5c',

  // 文字色
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: 'rgba(255, 255, 255, 0.85)',
  TEXT_MUTED: 'rgba(255, 255, 255, 0.45)',

  // 边框色
  BORDER: 'rgba(255, 255, 255, 0.1)',

  // 强调色
  ACCENT: '#3b82f6',
  ACCENT_LIGHT: '#60a5fa',
};

// ==================== 图表颜色 ====================
export const CHART_COLORS = {
  // 主色系
  BLUE: '#3b82f6',
  GREEN: '#10b981',
  ORANGE: '#f97316',
  RED: '#ef4444',
  PURPLE: '#8b5cf6',
  CYAN: '#06b6d4',
  YELLOW: '#f59e0b',
  PINK: '#ec4899',

  // 渐变色
  BLUE_GRADIENT: ['#3b82f6', '#60a5fa'],
  GREEN_GRADIENT: ['#10b981', '#34d399'],
  ORANGE_GRADIENT: ['#f97316', '#fb923c'],
};

// ==================== 渗透率等级颜色 ====================
export const PENETRATION_COLORS = {
  HIGH: {
    color: '#ef4444',
    tagColor: 'error',
    label: '高潜能攻坚',
  },
  MEDIUM: {
    color: '#f97316',
    tagColor: 'warning',
    label: '重点扩容',
  },
  LOW: {
    color: '#3b82f6',
    tagColor: 'processing',
    label: '稳健护盘',
  },
};

// ==================== Ant Design 标准色 ====================
export const ANT_COLORS = {
  BLUE: '#1677ff',
  GREEN: '#52c41a',
  ORANGE: '#fa8c16',
  RED: '#f5222d',
  CYAN: '#13c2c2',
  PURPLE: '#722ed1',
  YELLOW: '#fadb14',
  MAGENTA: '#eb2f96',
};

// ==================== 统一颜色（小写命名，兼容旧代码）====================
export const UNIFIED_COLORS = {
  blue: '#2563eb',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  gray: '#6b7280',
  yellow: '#eab308',
};
