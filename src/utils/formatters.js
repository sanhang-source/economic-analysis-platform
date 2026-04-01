/**
 * 格式化工具函数
 * 用于集团系挖潜等模块的数据格式化
 */

import { PENETRATION_COLORS } from '../constants/colors';

/**
 * 获取渗透率等级
 * @param {number} rate - 渗透率百分比
 * @returns {Object} 包含 label(标签)、color(颜色)、tagColor(标签颜色)
 */
export const getPenetrationLevel = (rate) => {
  if (rate < 10) return PENETRATION_COLORS.HIGH;
  if (rate < 25) return PENETRATION_COLORS.MEDIUM;
  return PENETRATION_COLORS.LOW;
};

/**
 * 格式化金额
 * @param {number} amount - 金额数值（万元）
 * @returns {Object} 包含 value(数值) 和 unit(单位)
 */
export const formatAmount = (amount) => {
  if (!amount) return { value: '0', unit: '亿' };
  if (amount >= 10000) return { value: (amount / 10000).toFixed(1), unit: '万亿' };
  return { value: amount.toString(), unit: '亿' };
};

/**
 * 格式化数字为千分位
 * @param {number} num - 数字
 * @returns {string} 格式化后的字符串
 */
export const formatNumber = (num) => {
  if (!num && num !== 0) return '-';
  return num.toLocaleString('zh-CN');
};

/**
 * 格式化百分比
 * @param {number} value - 小数或百分比数值
 * @param {number} decimals - 小数位数，默认1
 * @returns {string} 格式化后的百分比字符串
 */
export const formatPercent = (value, decimals = 1) => {
  if (!value && value !== 0) return '-';
  return `${value.toFixed(decimals)}%`;
};
