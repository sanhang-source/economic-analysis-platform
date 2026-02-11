/**
 * Dashboard Mock Data - 工作台模拟数据
 * 针对深圳政府场景优化
 */

// 核心统计数据 - 深圳特色指标
export const stats = {
  // 国高企业数（深圳核心指标）
  enterpriseCount: 23856,
  // 在谈项目数（深港合作、湾区项目）
  projectCount: 186,
  // 总投资额（亿元）
  investmentAmount: 2868.5,
  // 新增线索（专精特新、小巨人）
  newLeads: 642,
};

// 待办事项 - 深圳政府工作场景
export const todos = [
  {
    id: 1,
    title: '审核专精特新"小巨人"申报材料：深圳大疆创新科技有限公司',
    completed: false,
    urgent: true,
    time: '2小时前',
  },
  {
    id: 2,
    title: '跟进前海深港合作重点项目：某香港高校科研成果转化',
    completed: false,
    urgent: true,
    time: '今天 09:30',
  },
  {
    id: 3,
    title: '坪山生物医药产业园月度投资进度填报截止提醒',
    completed: false,
    urgent: false,
    time: '今天 18:00',
  },
  {
    id: 4,
    title: '光明科学城脑科学与类脑智能产业园项目签约仪式准备',
    completed: false,
    urgent: false,
    time: '明天 10:00',
  },
  {
    id: 5,
    title: '更新南山区半导体与集成电路产业链图谱数据',
    completed: true,
    urgent: false,
    time: '昨天',
  },
];

// 快捷入口
export const shortcuts = [
  {
    key: 'enterprise',
    title: '国高企业录入',
    desc: '新增国家高新技术企业',
    iconType: 'bank',
    bgColor: '#1677ff',
  },
  {
    key: 'investment',
    title: '深港项目线索',
    desc: '添加深港合作项目',
    iconType: 'global',
    bgColor: '#52c41a',
  },
  {
    key: 'industry',
    title: '20+8产业图谱',
    desc: '查看战新产业集群',
    iconType: 'apartment',
    bgColor: '#722ed1',
  },
  {
    key: 'report',
    title: '工业投资填报',
    desc: '月度工业投资报表',
    iconType: 'lineChart',
    bgColor: '#fa8c16',
  },
  {
    key: 'search',
    title: '专精特新查询',
    desc: '小巨人企业查询',
    iconType: 'fileSearch',
    bgColor: '#eb2f96',
  },
  {
    key: 'visit',
    title: '领导挂点服务',
    desc: '记录企业走访日志',
    iconType: 'team',
    bgColor: '#13c2c2',
  },
];

// 最近入驻企业 - 深圳代表性企业
export const recentEnterprises = [
  {
    id: 1,
    name: '深圳大疆创新科技有限公司',
    industry: '无人机/智能终端',
    investment: 45.8,
    joinDate: '2026-02-08',
    contact: '张经理 138****8888',
    status: '已签约',
    avatarColor: '#1677ff',
    // 深圳特色标签
    tags: ['国高企业', '独角兽', '专精特新'],
    location: '南山留仙洞总部基地',
  },
  {
    id: 2,
    name: '迈瑞生物医疗电子股份有限公司',
    industry: '高端医疗器械',
    investment: 28.6,
    joinDate: '2026-02-06',
    contact: '李总监 139****6666',
    status: '已签约',
    avatarColor: '#52c41a',
    tags: ['上市公司', '国高企业', '制造业单项冠军'],
    location: '光明科学城',
  },
  {
    id: 3,
    name: '深圳晶泰科技有限公司',
    industry: '人工智能/新药研发',
    investment: 15.2,
    joinDate: '2026-02-05',
    contact: '王博士 137****9999',
    status: '洽谈中',
    avatarColor: '#722ed1',
    tags: ['独角兽', '河套合作区', '合成生物'],
    location: '河套深港科技创新合作区',
  },
  {
    id: 4,
    name: '深圳新宙邦科技股份有限公司',
    industry: '新能源/电池材料',
    investment: 22.5,
    joinDate: '2026-02-03',
    contact: '赵总 136****7777',
    status: '已签约',
    avatarColor: '#fa8c16',
    tags: ['上市公司', '国高企业', '专精特新'],
    location: '坪山国家新能源产业基地',
  },
  {
    id: 5,
    name: '深圳微芯生物科技股份有限公司',
    industry: '生物医药/创新药',
    investment: 18.6,
    joinDate: '2026-02-01',
    contact: '陈主任 135****5555',
    status: '洽谈中',
    avatarColor: '#eb2f96',
    tags: ['科创板上市', '国高企业', '坪山生物'],
    location: '坪山国家生物产业基地',
  },
];

// 汇总导出
export const dashboardMockData = {
  stats,
  todos,
  shortcuts,
  recentEnterprises,
};

export default dashboardMockData;
