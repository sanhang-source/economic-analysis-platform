/**
 * 前海642产业导航大厅 Mock 数据
 * 6大现代服务业 + 4大战略性新兴产业 + 2大重点产业
 */

// 现代服务业（6类）
export const modernServiceIndustries = [
  {
    id: 'info-service',
    name: '信息服务',
    category: 'modern',
    enterpriseCount: 128,
    totalSales: 85600, // 万元
    totalPurchase: 42300,
    localSupportRatio: 28.5, // 本地配套率 %
    localSalesRatio: 72.3, // 本地销售率 %
    urgentChainNeeded: true, // 急需补链
    advantageChain: false,
  },
  {
    id: 'finance-service',
    name: '金融服务',
    category: 'modern',
    enterpriseCount: 86,
    totalSales: 125000,
    totalPurchase: 18500,
    localSupportRatio: 45.2,
    localSalesRatio: 88.5,
    urgentChainNeeded: false,
    advantageChain: false,
  },
  {
    id: 'trade-logistics',
    name: '贸易物流',
    category: 'modern',
    enterpriseCount: 215,
    totalSales: 168000,
    totalPurchase: 132000,
    localSupportRatio: 35.8,
    localSalesRatio: 68.2,
    urgentChainNeeded: false,
    advantageChain: true, // 优势强链
  },
  {
    id: 'professional-service',
    name: '专业服务',
    category: 'modern',
    enterpriseCount: 92,
    totalSales: 42000,
    totalPurchase: 15800,
    localSupportRatio: 22.5,
    localSalesRatio: 75.6,
    urgentChainNeeded: true,
    advantageChain: false,
  },
  {
    id: 'tech-service',
    name: '科技服务',
    category: 'modern',
    enterpriseCount: 156,
    totalSales: 68500,
    totalPurchase: 28500,
    localSupportRatio: 31.2,
    localSalesRatio: 65.8,
    urgentChainNeeded: false,
    advantageChain: false,
  },
  {
    id: 'culture-tourism',
    name: '文体旅商',
    category: 'modern',
    enterpriseCount: 68,
    totalSales: 28500,
    totalPurchase: 18500,
    localSupportRatio: 42.5,
    localSalesRatio: 58.2,
    urgentChainNeeded: false,
    advantageChain: false,
  },
];

// 战略性新兴产业（4类）
export const strategicIndustries = [
  {
    id: 'ai-robot',
    name: '人工智能与具身智能机器人',
    category: 'strategic',
    enterpriseCount: 45,
    totalSales: 42500,
    totalPurchase: 28500,
    localSupportRatio: 25.8,
    localSalesRatio: 55.2,
    urgentChainNeeded: true,
    advantageChain: false,
  },
  {
    id: 'marine',
    name: '海洋产业',
    category: 'strategic',
    enterpriseCount: 32,
    totalSales: 28500,
    totalPurchase: 18500,
    localSupportRatio: 18.5,
    localSalesRatio: 48.5,
    urgentChainNeeded: true,
    advantageChain: false,
  },
  {
    id: 'smart-terminal',
    name: '智能终端',
    category: 'strategic',
    enterpriseCount: 78,
    totalSales: 125000,
    totalPurchase: 85000,
    localSupportRatio: 52.5,
    localSalesRatio: 68.5,
    urgentChainNeeded: false,
    advantageChain: false,
  },
  {
    id: 'low-altitude',
    name: '低空经济',
    category: 'strategic',
    enterpriseCount: 28,
    totalSales: 18500,
    totalPurchase: 12500,
    localSupportRatio: 15.2,
    localSalesRatio: 42.5,
    urgentChainNeeded: true,
    advantageChain: false,
  },
];

// 重点产业（2类）
export const keyIndustries = [
  {
    id: 'cell-gene',
    name: '细胞与基因',
    category: 'key',
    enterpriseCount: 22,
    totalSales: 32500,
    totalPurchase: 18500,
    localSupportRatio: 12.5,
    localSalesRatio: 38.5,
    urgentChainNeeded: true,
    advantageChain: false,
  },
  {
    id: 'data-industry',
    name: '数据产业',
    category: 'key',
    enterpriseCount: 56,
    totalSales: 48500,
    totalPurchase: 22500,
    localSupportRatio: 28.5,
    localSalesRatio: 52.5,
    urgentChainNeeded: false,
    advantageChain: false,
  },
];

// 合并所有产业
export const allIndustries642 = [
  ...modernServiceIndustries,
  ...strategicIndustries,
  ...keyIndustries,
];

// 产业分类配置
export const industryCategories = [
  {
    key: 'modern',
    title: '现代服务业（6类）',
    color: '#1677ff',
    bgColor: '#e6f4ff',
  },
  {
    key: 'strategic',
    title: '战略性新兴产业（4类）',
    color: '#52c41a',
    bgColor: '#f6ffed',
  },
  {
    key: 'key',
    title: '重点产业（2类）',
    color: '#fa8c16',
    bgColor: '#fff7e6',
  },
];

// 补链洞察 - Top外地供应商聚合（按产业）
export const chainSupplementData = {
  'info-service': [
    { rank: 1, name: '北京字节跳动科技有限公司', serviceCount: 45, amount: 12500 },
    { rank: 2, name: '杭州阿里巴巴云计算有限公司', serviceCount: 38, amount: 9800 },
    { rank: 3, name: '上海商汤智能科技有限公司', serviceCount: 28, amount: 7200 },
    { rank: 4, name: '北京百度网讯科技有限公司', serviceCount: 22, amount: 5800 },
    { rank: 5, name: '广州网易计算机系统有限公司', serviceCount: 18, amount: 4200 },
  ],
  'ai-robot': [
    { rank: 1, name: '北京智源人工智能研究院', serviceCount: 15, amount: 8500 },
    { rank: 2, name: '上海傅利叶智能科技有限公司', serviceCount: 12, amount: 6200 },
    { rank: 3, name: '苏州汇川技术有限公司', serviceCount: 10, amount: 4800 },
    { rank: 4, name: '北京优必选科技有限公司', serviceCount: 8, amount: 3500 },
    { rank: 5, name: '上海达闼机器人有限公司', serviceCount: 6, amount: 2200 },
  ],
  'marine': [
    { rank: 1, name: '中国船舶集团有限公司', serviceCount: 12, amount: 7200 },
    { rank: 2, name: '青岛海洋科学与技术国家实验室', serviceCount: 8, amount: 4800 },
    { rank: 3, name: '上海海洋大学', serviceCount: 6, amount: 2800 },
    { rank: 4, name: '广州海洋地质调查局', serviceCount: 5, amount: 2200 },
    { rank: 5, name: '厦门海洋工程装备研究院', serviceCount: 4, amount: 1500 },
  ],
  'low-altitude': [
    { rank: 1, name: '广州亿航智能技术有限公司', serviceCount: 8, amount: 4200 },
    { rank: 2, name: '北京中航智科技有限公司', serviceCount: 6, amount: 2800 },
    { rank: 3, name: '上海峰飞航空科技有限公司', serviceCount: 5, amount: 2200 },
    { rank: 4, name: '成都纵横自动化技术股份有限公司', serviceCount: 4, amount: 1500 },
    { rank: 5, name: '珠海紫燕无人飞行器有限公司', serviceCount: 3, amount: 980 },
  ],
  'cell-gene': [
    { rank: 1, name: '北京百济神州生物科技有限公司', serviceCount: 8, amount: 8500 },
    { rank: 2, name: '上海药明康德新药开发有限公司', serviceCount: 6, amount: 6200 },
    { rank: 3, name: '苏州信达生物制药有限公司', serviceCount: 5, amount: 4800 },
    { rank: 4, name: '南京传奇生物科技有限公司', serviceCount: 4, amount: 3200 },
    { rank: 5, name: '杭州启函生物科技有限公司', serviceCount: 3, amount: 1800 },
  ],
};

// 强链/延链洞察 - Top外地客户聚合（按产业）
export const chainStrengthenData = {
  'trade-logistics': [
    { rank: 1, name: '京东物流集团有限公司', serviceCount: 85, amount: 28500 },
    { rank: 2, name: '顺丰速运有限公司', serviceCount: 72, amount: 22800 },
    { rank: 3, name: '菜鸟网络科技有限公司', serviceCount: 58, amount: 18500 },
    { rank: 4, name: '德邦物流股份有限公司', serviceCount: 45, amount: 14200 },
    { rank: 5, name: '中通快递股份有限公司', serviceCount: 38, amount: 11500 },
  ],
  'smart-terminal': [
    { rank: 1, name: '小米通讯技术有限公司', serviceCount: 28, amount: 28500 },
    { rank: 2, name: '联想(北京)有限公司', serviceCount: 22, amount: 22800 },
    { rank: 3, name: 'OPPO广东移动通信有限公司', serviceCount: 18, amount: 18500 },
    { rank: 4, name: '维沃移动通信有限公司', serviceCount: 15, amount: 14200 },
    { rank: 5, name: '荣耀终端有限公司', serviceCount: 12, amount: 11500 },
  ],
};

// 优势输出商品（按产业聚合）
export const topProductsByIndustry = {
  'info-service': [
    { name: '云计算服务', amount: 28500, ratio: 33.3 },
    { name: '大数据分析', amount: 18500, ratio: 21.6 },
    { name: '人工智能算法', amount: 12500, ratio: 14.6 },
    { name: '软件开发服务', amount: 9800, ratio: 11.4 },
    { name: '网络安全服务', amount: 7200, ratio: 8.4 },
  ],
  'ai-robot': [
    { name: '智能机器人整机', amount: 18500, ratio: 43.5 },
    { name: 'AI视觉模组', amount: 8500, ratio: 20.0 },
    { name: '运动控制模块', amount: 6200, ratio: 14.6 },
    { name: '语音识别系统', amount: 4200, ratio: 9.9 },
    { name: '传感器套件', amount: 2800, ratio: 6.6 },
  ],
  'smart-terminal': [
    { name: '智能手机整机', amount: 68500, ratio: 54.8 },
    { name: '平板电脑', amount: 22500, ratio: 18.0 },
    { name: '智能手表', amount: 18500, ratio: 14.8 },
    { name: '无线耳机', amount: 9800, ratio: 7.8 },
    { name: 'AR/VR设备', amount: 5800, ratio: 4.6 },
  ],
  'trade-logistics': [
    { name: '跨境物流服务', amount: 58500, ratio: 34.8 },
    { name: '仓储管理服务', amount: 38500, ratio: 22.9 },
    { name: '供应链金融服务', amount: 28500, ratio: 17.0 },
    { name: '冷链物流服务', amount: 22500, ratio: 13.4 },
    { name: '智能配送服务', amount: 20000, ratio: 11.9 },
  ],
};

// 产业核心企业清单（示例）
export const industryEnterprises = {
  'info-service': [
    { id: 'tencent', name: '腾讯科技（深圳）有限公司', district: '南山区', annualSales: 38000, annualPurchase: 22000, localSalesRatio: 0.88, localPurchaseRatio: 0.82 },
    { id: 'huawei-cloud', name: '华为云计算技术有限公司', district: '龙岗区', annualSales: 28500, annualPurchase: 18500, localSalesRatio: 0.75, localPurchaseRatio: 0.68 },
    { id: 'pingan-tech', name: '平安科技（深圳）有限公司', district: '福田区', annualSales: 18500, annualPurchase: 9800, localSalesRatio: 0.82, localPurchaseRatio: 0.78 },
  ],
  'ai-robot': [
    { id: 'ubtech', name: '深圳市优必选科技股份有限公司', district: '南山区', annualSales: 12500, annualPurchase: 8500, localSalesRatio: 0.65, localPurchaseRatio: 0.58 },
    { id: 'dji', name: '深圳市大疆创新科技有限公司', district: '南山区', annualSales: 32000, annualPurchase: 15000, localSalesRatio: 0.72, localPurchaseRatio: 0.78 },
  ],
  'smart-terminal': [
    { id: 'huawei', name: '华为技术有限公司', district: '龙岗区', annualSales: 52000, annualPurchase: 35000, localSalesRatio: 0.62, localPurchaseRatio: 0.74 },
    { id: 'zte', name: '中兴通讯股份有限公司', district: '南山区', annualSales: 28500, annualPurchase: 18500, localSalesRatio: 0.68, localPurchaseRatio: 0.72 },
    { id: 'transsion', name: '深圳传音控股股份有限公司', district: '南山区', annualSales: 22500, annualPurchase: 14200, localSalesRatio: 0.45, localPurchaseRatio: 0.52 },
  ],
};
