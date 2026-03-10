/**
 * 交易生态页面模拟数据
 * 按月更新，离线报表
 */

// 企业基本信息
export const companyInfo = {
  name: '深圳市智云创新科技股份有限公司',
  tags: ['存续(在营)', '高新技术企业'],
  industry: '电子信息',
  sector: '智能硬件制造',
  establishDate: '2015-08-18',
  registeredCapital: '12,000万人民币',
  employees: 1856,
  creditCode: '91440300MA5D...',
  taxLevel: 'A级',
  address: '深圳市南山区科技园南区高新南一道',
};

// 数据更新时间
export const dataUpdateTime = '2026-02';

// 开票统计数据
export const invoiceStats = {
  lastInvoiceDate: '2026-01-19',
  lastInvoiceTime: '15:42:09',
  invoiceType: '增值税专票',
  daysSinceLast: 0,
  annualAmount: 68500, // 万元
  annualAmountGrowth: 15.2, // 同比%
  annualCount: 13724,
  annualCountGrowth: 8.4,
  upstreamCount: 218,
  downstreamCount: 1042,
};

// 月度趋势数据（近12个月）
export const monthlyTrend = [
  { month: '2025-02', sales: 5200, purchase: 4100, salesCount: 980, purchaseCount: 850 },
  { month: '2025-03', sales: 5800, purchase: 4500, salesCount: 1100, purchaseCount: 920 },
  { month: '2025-04', sales: 6100, purchase: 4800, salesCount: 1150, purchaseCount: 980 },
  { month: '2025-05', sales: 5900, purchase: 4600, salesCount: 1120, purchaseCount: 940 },
  { month: '2025-06', sales: 6200, purchase: 4900, salesCount: 1180, purchaseCount: 1000 },
  { month: '2025-07', sales: 6400, purchase: 5100, salesCount: 1220, purchaseCount: 1050 },
  { month: '2025-08', sales: 5800, purchase: 4700, salesCount: 1100, purchaseCount: 960 },
  { month: '2025-09', sales: 6500, purchase: 5200, salesCount: 1250, purchaseCount: 1100 },
  { month: '2025-10', sales: 6800, purchase: 5400, salesCount: 1300, purchaseCount: 1150 },
  { month: '2025-11', sales: 7100, purchase: 5600, salesCount: 1350, purchaseCount: 1200 },
  { month: '2025-12', sales: 7200, purchase: 5700, salesCount: 1380, purchaseCount: 1220 },
  { month: '2026-01', sales: 5800, purchase: 4600, salesCount: 1124, purchaseCount: 980 },
];

// 十大供应商（采购）
export const topSuppliers = [
  { id: 1, name: '深圳市华芯半导体有限公司', amount: 8500, isLocal: true, trend: 'up' },
  { id: 2, name: '东莞新能源科技股份有限公司', amount: 6200, isLocal: true, trend: 'stable' },
  { id: 3, name: '京东方科技集团(深圳)有限公司', amount: 5400, isLocal: true, trend: 'up' },
  { id: 4, name: '顺丰速运有限公司', amount: 3100, isLocal: true, trend: 'stable' },
  { id: 5, name: '德州仪器半导体(上海)有限公司', amount: 2800, isLocal: false, trend: 'down' },
  { id: 6, name: '深圳市大族激光科技股份有限公司', amount: 2100, isLocal: true, trend: 'up' },
  { id: 7, name: '惠州亿纬锂能股份有限公司', amount: 1900, isLocal: true, trend: 'stable' },
  { id: 8, name: '深圳汇川技术股份有限公司', amount: 1650, isLocal: true, trend: 'up' },
  { id: 9, name: '立讯精密工业股份有限公司', amount: 1400, isLocal: true, trend: 'stable' },
  { id: 10, name: '深圳供电局有限公司', amount: 1100, isLocal: true, trend: 'stable' },
];

// 十大客户（销售）
export const topCustomers = [
  { id: 1, name: '华为终端有限公司', amount: 12500, isLocal: true, trend: 'up' },
  { id: 2, name: '深圳市大疆创新科技有限公司', amount: 9800, isLocal: true, trend: 'up' },
  { id: 3, name: '比亚迪汽车工业有限公司', amount: 8700, isLocal: true, trend: 'stable' },
  { id: 4, name: '小米通讯技术有限公司', amount: 6500, isLocal: false, trend: 'up' },
  { id: 5, name: '深圳传音控股股份有限公司', amount: 5200, isLocal: true, trend: 'stable' },
  { id: 6, name: '联想(北京)有限公司', amount: 4100, isLocal: false, trend: 'down' },
  { id: 7, name: '中兴通讯股份有限公司', amount: 3600, isLocal: true, trend: 'stable' },
  { id: 8, name: '荣耀终端有限公司', amount: 3100, isLocal: true, trend: 'up' },
  { id: 9, name: 'TCL科技集团股份有限公司', amount: 2400, isLocal: false, trend: 'stable' },
  { id: 10, name: '亚马逊(中国)投资有限公司', amount: 1800, isLocal: false, trend: 'down' },
];

// 客户销售地区分布
export const regionDistribution = [
  { name: '广东省', value: 45.2, sales: 30962 },
  { name: '香港特别行政区', value: 15.8, sales: 10823 },
  { name: '上海市', value: 12.5, sales: 8562 },
  { name: '北京市', value: 10.3, sales: 7055 },
  { name: '江苏省', value: 6.8, sales: 4658 },
  { name: '浙江省', value: 4.5, sales: 3082 },
  { name: '四川省', value: 3.2, sales: 2192 },
  { name: '海外(直接出口)', value: 1.7, sales: 1166 },
];

// 十大热销商品
export const topProducts = [
  { id: 1, category: '通信设备', name: '智能主控模组', amount: 15420.5, price: 285.00, ratio: 22.5 },
  { id: 2, category: '电子元件', name: '柔性PCB电路板', amount: 12100.0, price: 45.00, ratio: 17.6 },
  { id: 3, category: '计算机集成', name: '工业控制软件', amount: 8540.0, price: null, ratio: 12.4 },
  { id: 4, category: '电池组件', name: '聚合物锂电池组', amount: 6980.5, price: 120.00, ratio: 10.2 },
  { id: 5, category: '光学仪器', name: '高清摄像头模组', amount: 5850.0, price: 65.00, ratio: 8.2 },
  { id: 6, category: '技术服务', name: '研发技术咨询费', amount: 4200.0, price: null, ratio: 6.1 },
  { id: 7, category: '非金属矿物制品', name: '精密玻璃盖板', amount: 3150.2, price: 12.50, ratio: 4.6 },
  { id: 8, category: '塑料制品', name: '环保包装托盘', amount: 1820.0, price: 2.50, ratio: 2.7 },
  { id: 9, category: '物流辅助', name: '仓储配送服务', amount: 950.0, price: null, ratio: 1.4 },
  { id: 10, category: '专用设备', name: '自动化测试治具', amount: 680.8, price: 3500.00, ratio: 1.0 },
];

// 风险预警数据
export const riskAlerts = [
  {
    id: '1',
    level: 'high',
    type: 'concentration',
    title: '客户集中度过高',
    message: '前3大客户销售额占比达52.3%，超过50%警戒线',
    suggestion: '建议拓展新客户，降低对单一客户的依赖',
  },
  {
    id: '2',
    level: 'medium',
    type: 'region',
    title: '区域集中风险',
    message: '广东省内销售额占比45.2%，区域市场集中',
    suggestion: '可考虑拓展华东、华北市场',
  },
  {
    id: '3',
    level: 'medium',
    type: 'product',
    title: '商品集中风险',
    message: '智能主控模组销售额占比22.5%，单一产品依赖度较高',
    suggestion: '建议丰富产品线，分散经营风险',
  },
];
