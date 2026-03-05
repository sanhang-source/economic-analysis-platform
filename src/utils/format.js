/**
 * Format Utils - 格式化工具函数
 */

/**
 * 格式化数字 - 大于等于10000显示为"x.x万"
 * @param {number} num - 数字
 * @returns {string} 格式化后的字符串
 */
export const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
};

/**
 * 格式化百分比
 * @param {number} value - 数值
 * @param {number} decimals - 小数位数，默认1
 * @returns {string} 格式化后的百分比
 */
export const formatPercent = (value, decimals = 1) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

/**
 * 格式化金额 - 添加千分位
 * @param {number} value - 金额
 * @param {string} suffix - 后缀，默认空
 * @returns {string} 格式化后的金额
 */
export const formatAmount = (value, suffix = '') => {
  return value.toLocaleString() + suffix;
};
