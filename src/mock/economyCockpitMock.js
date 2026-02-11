/**
 * EconomyCockpit Mock Data - 经济驾驶舱模拟数据
 * 针对深圳政府场景优化
 */

// GDP 数据
export const gdpData = {
  value: 36801.87, // GDP 总量（亿元）
  growth: 6.8, // 同比增长率
  completion: 94.5, // 年度目标完成率
  primary: 0.1, // 第一产业占比
  secondary: 37.2, // 第二产业占比
  tertiary: 62.7, // 第三产业占比
};

// 工业产值趋势
export const outputTrend = {
  months: ['1-2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  values: [1250, 1890, 2560, 3240, 4120, 4890, 5680, 6520, 7280, 8150, 9236],
};

// 产业结构
export const industryStructure = {
  primary: 0.1, // 第一产业
  secondary: 37.2, // 第二产业
  tertiary: 62.7, // 第三产业
};

// 能耗双控
export const energyData = {
  target: 2850, // 年度能耗目标（万吨标准煤）
  used: 2265.8, // 已用能耗
  percentage: 79.5, // 使用率
  reduction: 3.2, // 单位GDP能耗降低率
};

// 税收贡献 Top5
export const taxTop5 = {
  names: [
    '华为技术有限公司',
    '腾讯科技（深圳）有限公司',
    '平安保险（集团）股份有限公司',
    '招商银行股份有限公司',
    '比亚迪股份有限公司',
  ],
  values: [456.8, 385.6, 298.5, 245.3, 186.2], // 税收（亿元）
};

// 汇总导出
export const economyCockpitMock = {
  gdpData,
  outputTrend,
  industryStructure,
  energyData,
  taxTop5,
};

export default economyCockpitMock;
