/**
 * 交易生态指标计算工具函数
 */

/**
 * 计算客户集中度 CR5/CR3
 * @param {Array} customers - 客户列表
 * @param {Number} totalSales - 总销售额
 * @param {Number} topN - 前几大，默认5
 */
export const calculateConcentrationRatio = (customers, totalSales, topN = 5) => {
  const topCustomers = [...customers]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, topN);
  const topAmount = topCustomers.reduce((sum, c) => sum + c.amount, 0);
  return {
    ratio: topAmount / totalSales,
    topAmount,
    count: topCustomers.length,
  };
};

/**
 * 计算本地配套率
 * @param {Array} list - 客户或供应商列表
 * @param {Number} totalAmount - 总金额
 */
export const calculateLocalRatio = (list, totalAmount) => {
  const localAmount = list
    .filter(item => item.isLocal)
    .reduce((sum, item) => sum + item.amount, 0);
  return {
    ratio: localAmount / totalAmount,
    localAmount,
    localCount: list.filter(item => item.isLocal).length,
  };
};

/**
 * 计算毛利率估算
 * @param {Number} sales - 销售额
 * @param {Number} purchase - 采购额
 */
export const calculateGrossMargin = (sales, purchase) => {
  const profit = sales - purchase;
  return {
    profit,
    margin: sales > 0 ? profit / sales : 0,
  };
};

/**
 * 计算供应链健康度评分
 * @param {Object} params - 各项指标
 */
export const calculateHealthScore = ({
  customerCR5,
  supplierCR5,
  grossMargin,
  localSalesRatio,
  localPurchaseRatio,
}) => {
  let score = 100;
  
  // 客户集中度扣分
  if (customerCR5 > 0.5) score -= 15;
  else if (customerCR5 > 0.4) score -= 8;
  
  // 供应商集中度扣分
  if (supplierCR5 > 0.5) score -= 15;
  else if (supplierCR5 > 0.4) score -= 8;
  
  // 毛利率加分/扣分
  if (grossMargin > 0.2) score += 10;
  else if (grossMargin < 0.1) score -= 10;
  
  // 本地配套率加分（适度本地化为佳）
  if (localSalesRatio > 0.3 && localSalesRatio < 0.7) score += 5;
  if (localPurchaseRatio > 0.3 && localPurchaseRatio < 0.7) score += 5;
  
  return Math.max(0, Math.min(100, score));
};

/**
 * 分析风险等级
 * @param {Object} metrics - 各项指标
 */
export const analyzeRisks = (metrics) => {
  const risks = [];
  
  // 客户集中度风险
  if (metrics.customerCR5 > 0.4) {
    risks.push({
      level: metrics.customerCR5 > 0.5 ? 'high' : 'medium',
      type: 'concentration',
      title: '客户集中度过高',
      message: `前5大客户销售额占比达${(metrics.customerCR5 * 100).toFixed(1)}%`,
      suggestion: '建议拓展新客户，降低对单一客户的依赖',
    });
  }
  
  // 供应商集中度风险
  if (metrics.supplierCR5 > 0.35) {
    risks.push({
      level: metrics.supplierCR5 > 0.5 ? 'high' : 'medium',
      type: 'concentration',
      title: '供应商集中度过高',
      message: `前5大供应商采购额占比达${(metrics.supplierCR5 * 100).toFixed(1)}%`,
      suggestion: '建议多元化供应商来源',
    });
  }
  
  // 毛利率风险
  if (metrics.grossMargin < 0.1) {
    risks.push({
      level: 'medium',
      type: 'profit',
      title: '毛利率偏低',
      message: `毛利率仅${(metrics.grossMargin * 100).toFixed(1)}%，盈利空间有限`,
      suggestion: '优化成本结构或提升产品附加值',
    });
  }
  
  // 区域集中风险
  if (metrics.topRegionRatio > 0.5) {
    risks.push({
      level: 'medium',
      type: 'region',
      title: '区域集中风险',
      message: `主要市场${metrics.topRegionName}占比${(metrics.topRegionRatio * 100).toFixed(1)}%`,
      suggestion: '建议拓展其他区域市场',
    });
  }
  
  return risks;
};

/**
 * 格式化金额（万元转亿元）
 * @param {Number} amount - 万元
 */
export const formatAmount = (amount) => {
  if (amount >= 10000) {
    return (amount / 10000).toFixed(2) + '亿';
  }
  return amount.toLocaleString() + '万';
};

/**
 * 计算月度同比/环比
 * @param {Array} monthlyData - 月度数据
 * @param {String} field - 字段名
 */
export const calculateGrowthRates = (monthlyData, field) => {
  const result = monthlyData.map((item, index) => {
    const current = item[field];
    let yoy = null; // 同比
    let mom = null; // 环比
    
    // 环比
    if (index > 0) {
      const prev = monthlyData[index - 1][field];
      mom = prev > 0 ? ((current - prev) / prev) * 100 : 0;
    }
    
    // 同比（假设数据是连续的，12个月前）
    if (index >= 12) {
      const lastYear = monthlyData[index - 12][field];
      yoy = lastYear > 0 ? ((current - lastYear) / lastYear) * 100 : 0;
    }
    
    return { ...item, [`${field}Mom`]: mom, [`${field}Yoy`]: yoy };
  });
  
  return result;
};
