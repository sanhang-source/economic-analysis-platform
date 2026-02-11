/**
 * EnterpriseProfile Mock Data - 一企一档模拟数据
 */

// 企业基本信息
export const enterprise = {
  id: 1,
  name: '深圳大疆创新科技有限公司',
  code: '91440300589150582C',
  logoColor: '#00C1DE',
  // 关键标签
  tags: [
    { key: 'gaoxin', label: '高新技术企业', color: 'blue' },
    { key: 'guishang', label: '规上企业', color: 'green' },
    { key: 'a-class', label: 'A类', color: 'red' },
    { key: 'focus', label: '重点关注', color: 'gold' },
  ],
  // 工商信息
  type: '有限责任公司',
  legalPerson: '汪滔',
  registeredCapital: '3000万元人民币',
  establishDate: '2006-11-06',
  industry: '无人机制造/智能装备',
  scale: '大型企业',
  employees: 14256,
  address: '深圳市南山区西丽街道仙元路55号大疆天空之城',
  businessScope:
    '航空电子设备、自动控制设备、无人驾驶航空器、无线电数据传输系统、电子元器件、计算机软件的生产及其应用的技术开发、批发、进出口及相关配套业务；飞行控制系统、云台控制系统、数据传输系统、图像处理系统的技术开发、技术咨询、技术服务、技术转让；展览展示策划；从事广告业务；无人机租赁；教育培训。',
  // 联系信息
  phone: '0755-26656677',
  email: 'contact@dji.com',
  website: 'https://www.dji.com',
  contact: {
    name: '张明华',
    phone: '138****8888',
    position: '政府事务总监',
  },
};

// 经营数据
export const operatingData = {
  currentYear: {
    revenue: 301.5, // 本年营收（亿元）
    revenueYoy: 18.6, // 营收同比增长
    tax: 45.8, // 纳税总额（亿元）
    taxYoy: 22.3, // 纳税同比增长
    rdInvestment: 48.2, // 研发投入（亿元）
    rdYoy: 25.6, // 研发投入同比增长
    rdRatio: 16.0, // 研发投入占比
  },
  // 近三年趋势数据
  trend: {
    years: ['2023年', '2024年', '2025年'],
    revenue: [215.8, 254.2, 301.5], // 营收（亿元）
    tax: [32.4, 37.5, 45.8], // 纳税（亿元）
  },
};

// 行政处罚记录（风险列表）
export const riskRecords = [
  {
    id: 1,
    date: '2025-08-15',
    authority: '深圳市市场监督管理局南山监管局',
    reason: '产品标识不符合规定（部分无人机产品未按规定标注警示标识）',
    result: '罚款人民币5万元，责令改正',
    status: '已整改',
  },
  {
    id: 2,
    date: '2025-11-22',
    authority: '深圳市生态环境局南山管理局',
    reason: '危险废物贮存不规范（废锂电池未按规范分类存放）',
    result: '罚款人民币8万元，限期整改',
    status: '整改中',
  },
];

// 能耗数据（预留）
export const energyData = {
  currentYear: {
    electricity: 12580, // 用电量（万千瓦时）
    water: 856, // 用水量（万吨）
    carbon: 4520, // 碳排放量（吨）
  },
  trend: {
    years: ['2023年', '2024年', '2025年'],
    electricity: [9850, 11250, 12580],
    water: [720, 785, 856],
  },
};

// 荣誉资质
export const honors = [
  {
    id: 1,
    name: '国家高新技术企业',
    level: '国家级',
    issueDate: '2008-12-01',
    expiryDate: '2026-12-01',
    issuer: '深圳市科技创新委员会',
  },
  {
    id: 2,
    name: '国家制造业单项冠军示范企业',
    level: '国家级',
    issueDate: '2021-11-08',
    expiryDate: '2024-11-07',
    issuer: '工业和信息化部',
  },
  {
    id: 3,
    name: '广东省工程技术研究中心',
    level: '省级',
    issueDate: '2019-06-20',
    expiryDate: '2025-06-19',
    issuer: '广东省科学技术厅',
  },
  {
    id: 4,
    name: '深圳市总部企业',
    level: '市级',
    issueDate: '2020-03-15',
    expiryDate: '长期有效',
    issuer: '深圳市发展和改革委员会',
  },
  {
    id: 5,
    name: '中国专利金奖',
    level: '国家级',
    issueDate: '2023-07-21',
    expiryDate: '-',
    issuer: '国家知识产权局',
  },
];

// 汇总导出
export const enterpriseProfileMock = {
  enterprise,
  operatingData,
  riskRecords,
  energyData,
  honors,
};

export default enterpriseProfileMock;
