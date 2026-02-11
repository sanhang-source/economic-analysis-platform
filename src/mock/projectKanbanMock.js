/**
 * ProjectKanban Mock Data - 项目看板模拟数据
 * 针对深圳政府场景优化 - 突出深港合作、20+8产业集群
 */

// 深圳招商引资项目数据
const projects = [
  {
    id: 1,
    name: '香港中文大学（深圳）医学院附属医院项目',
    investment: 35,
    priority: 'high',
    tags: ['深港合作', '医疗教育', '重大项目'],
    manager: {
      name: '张处',
      department: '市卫健委招商办',
      avatar: '',
    },
    stayDays: 15,
    progress: 0,
    statusColor: '#8c8c8c',
    hasUpdate: true,
    updateTime: '2小时前',
    // 深圳特色
    source: '深港合作',
    leader: '分管副市长',
  },
  {
    id: 2,
    name: '比亚迪新能源汽车三电系统研发中心',
    investment: 80,
    priority: 'high',
    tags: ['20+8产业', '新能源', '总部经济'],
    manager: {
      name: '李科',
      department: '坪山区工信局',
      avatar: '',
    },
    stayDays: 8,
    progress: 0,
    statusColor: '#8c8c8c',
    hasUpdate: false,
    updateTime: '',
    source: '本土企业扩产',
    leader: '区工信局局长',
  },
  {
    id: 3,
    name: '腾讯前海数字经济总部大厦',
    investment: 120,
    priority: 'high',
    tags: ['数字经济', '总部企业', '前海'],
    manager: {
      name: '王处',
      department: '前海管理局',
      avatar: '',
    },
    stayDays: 32,
    progress: 30,
    statusColor: '#1677ff',
    hasUpdate: true,
    updateTime: '昨天',
    source: '本土企业',
    leader: '前海管理局副局长',
  },
  {
    id: 4,
    name: '香港科技园深圳分园（河套）',
    investment: 25,
    priority: 'high',
    tags: ['深港合作', '河套', '科创平台'],
    manager: {
      name: '赵科',
      department: '福田区科创局',
      avatar: '',
    },
    stayDays: 18,
    progress: 50,
    statusColor: '#1677ff',
    hasUpdate: false,
    updateTime: '',
    source: '港方推荐',
    leader: '福田区副区长',
  },
  {
    id: 5,
    name: '深圳医学科学院及深圳湾实验室二期',
    investment: 65,
    priority: 'high',
    tags: ['光明科学城', '生命科学', '重大设施'],
    manager: {
      name: '陈处',
      department: '市科技创新委',
      avatar: '',
    },
    stayDays: 45,
    progress: 70,
    statusColor: '#faad14',
    hasUpdate: true,
    updateTime: '3天前',
    source: '市委市政府决策',
    leader: '分管副市长',
  },
  {
    id: 6,
    name: '大疆创新全球总部及研发中心',
    investment: 55,
    priority: 'high',
    tags: ['20+8产业', '无人机', '留仙洞'],
    manager: {
      name: '刘科',
      department: '南山区工信局',
      avatar: '',
    },
    stayDays: 22,
    progress: 85,
    statusColor: '#faad14',
    hasUpdate: false,
    updateTime: '',
    source: '本土企业扩产',
    leader: '南山区副区长',
  },
  {
    id: 7,
    name: '华润微深圳12英寸集成电路生产线',
    investment: 220,
    priority: 'high',
    tags: ['20+8产业', '半导体', '重大项目'],
    manager: {
      name: '孙处',
      department: '宝安区工信局',
      avatar: '',
    },
    stayDays: 5,
    progress: 100,
    statusColor: '#52c41a',
    hasUpdate: true,
    updateTime: '今天',
    source: '央企招商',
    leader: '市工信局局长',
  },
  {
    id: 8,
    name: '香港大学深圳校区（选址）',
    investment: 90,
    priority: 'high',
    tags: ['深港合作', '高等教育', '龙岗'],
    manager: {
      name: '周科',
      department: '市教育局',
      avatar: '',
    },
    stayDays: 12,
    progress: 100,
    statusColor: '#52c41a',
    hasUpdate: false,
    updateTime: '',
    source: '深港合作',
    leader: '分管副市长',
  },
  {
    id: 9,
    name: '迈瑞医疗高端医疗器械制造基地',
    investment: 45,
    priority: 'medium',
    tags: ['20+8产业', '医疗器械', '光明'],
    manager: {
      name: '吴科',
      department: '光明区工信局',
      avatar: '',
    },
    stayDays: 3,
    progress: 100,
    statusColor: '#722ed1',
    hasUpdate: true,
    updateTime: '1周前',
    source: '本土企业扩产',
    leader: '光明区副区长',
  },
  {
    id: 10,
    name: '招商局集团前海自贸中心',
    investment: 180,
    priority: 'high',
    tags: ['前海', '总部经济', '现代服务'],
    manager: {
      name: '郑科',
      department: '前海管理局',
      avatar: '',
    },
    stayDays: 28,
    progress: 100,
    statusColor: '#722ed1',
    hasUpdate: false,
    updateTime: '',
    source: '央企招商',
    leader: '前海管理局局长',
  },
];

// 按状态分组
export const kanbanColumns = {
  initial: projects.filter((p) => p.id === 1 || p.id === 2), // 初步接触
  visit: projects.filter((p) => p.id === 3 || p.id === 4), // 实地考察
  negotiate: projects.filter((p) => p.id === 5 || p.id === 6), // 商务谈判
  signed: projects.filter((p) => p.id === 7 || p.id === 8), // 正式签约
  started: projects.filter((p) => p.id === 9 || p.id === 10), // 落地开工
};

// 深圳招商引资统计数据
export const projectStats = {
  total: projects.length,
  initial: kanbanColumns.initial.length,
  visit: kanbanColumns.visit.length,
  negotiate: kanbanColumns.negotiate.length,
  signed: kanbanColumns.signed.length,
  started: kanbanColumns.started.length,
  newThisMonth: 8,
  // 深圳特色指标
  hkProjects: 3, // 港资项目
  fortune500: 2, // 世界500强
  unicorn: 1, // 独角兽
};

// 汇总导出
export const projectKanbanMock = {
  kanbanColumns,
  projectStats,
  projects,
};

export default projectKanbanMock;
