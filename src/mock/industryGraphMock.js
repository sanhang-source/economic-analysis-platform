/**
 * IndustryGraph Mock Data - 产业链图谱模拟数据
 * 针对深圳政府场景优化 - 20+8产业集群、深圳本地优势与缺口
 */

// 节点数据 - 以"网络与通信"（深圳优势产业）为例
export const nodes = [
  // 中心节点 - 网络与通信（深圳20+8产业集群之一）
  {
    id: '0',
    name: '网络与通信',
    category: 0,
    hasLocal: true,
    enterpriseCount: 2860,
    outputValue: 8500, // 亿元
    coverage: 92,
    symbolSize: 80,
    description: '深圳优势产业集群，华为、中兴全球领先',
  },
  // 一级节点 - 核心设备
  {
    id: '1',
    name: '通信设备',
    category: 1,
    hasLocal: true,
    enterpriseCount: 586,
    outputValue: 4200,
    coverage: 95,
    description: '华为、中兴全球市占率第一',
  },
  {
    id: '2',
    name: '终端设备',
    category: 1,
    hasLocal: true,
    enterpriseCount: 1250,
    outputValue: 3100,
    coverage: 88,
    description: '手机、IoT设备制造',
  },
  {
    id: '3',
    name: '光通信',
    category: 1,
    hasLocal: true,
    enterpriseCount: 320,
    outputValue: 890,
    coverage: 85,
    description: '光模块、光纤光缆',
  },
  {
    id: '4',
    name: '卫星通信',
    category: 1,
    hasLocal: false,
    enterpriseCount: 0,
    outputValue: 0,
    coverage: 0,
    description: '低轨卫星、地面终端',
  },
  // 二级节点 - 核心零部件
  {
    id: '5',
    name: '基站设备',
    category: 2,
    hasLocal: true,
    enterpriseCount: 86,
    outputValue: 1500,
    coverage: 95,
  },
  {
    id: '6',
    name: '交换机/路由器',
    category: 2,
    hasLocal: true,
    enterpriseCount: 156,
    outputValue: 980,
    coverage: 90,
  },
  {
    id: '7',
    name: '5G芯片',
    category: 2,
    hasLocal: false,
    enterpriseCount: 0,
    outputValue: 0,
    coverage: 0,
    description: '海思受限，本地设计能力不足',
  },
  {
    id: '8',
    name: '射频器件',
    category: 2,
    hasLocal: true,
    enterpriseCount: 68,
    outputValue: 420,
    coverage: 75,
  },
  {
    id: '9',
    name: 'PCB电路板',
    category: 2,
    hasLocal: true,
    enterpriseCount: 420,
    outputValue: 680,
    coverage: 92,
    description: '鹏鼎、景旺等龙头聚集',
  },
  {
    id: '10',
    name: '结构件/散热器',
    category: 2,
    hasLocal: true,
    enterpriseCount: 580,
    outputValue: 520,
    coverage: 88,
  },
  {
    id: '11',
    name: '光模块',
    category: 2,
    hasLocal: true,
    enterpriseCount: 95,
    outputValue: 450,
    coverage: 82,
    description: '中际旭创、新易盛等',
  },
  {
    id: '12',
    name: '光纤预制棒',
    category: 2,
    hasLocal: false,
    enterpriseCount: 0,
    outputValue: 0,
    coverage: 0,
    description: '核心材料依赖进口',
  },
  {
    id: '13',
    name: '天线/滤波器',
    category: 2,
    hasLocal: true,
    enterpriseCount: 120,
    outputValue: 280,
    coverage: 78,
  },
  {
    id: '14',
    name: '卫星地面终端',
    category: 2,
    hasLocal: false,
    enterpriseCount: 0,
    outputValue: 0,
    coverage: 0,
  },
  {
    id: '15',
    name: '通信软件',
    category: 2,
    hasLocal: true,
    enterpriseCount: 890,
    outputValue: 1200,
    coverage: 95,
    description: '深圳软件产业全国领先',
  },
];

// 连接关系
export const links = [
  // 中心到一级
  { source: '0', target: '1' },
  { source: '0', target: '2' },
  { source: '0', target: '3' },
  { source: '0', target: '4' },
  // 通信设备到子项
  { source: '1', target: '5' },
  { source: '1', target: '6' },
  { source: '1', target: '15' },
  // 终端设备到子项
  { source: '2', target: '7' },
  { source: '2', target: '8' },
  { source: '2', target: '9' },
  { source: '2', target: '10' },
  { source: '2', target: '13' },
  // 光通信到子项
  { source: '3', target: '11' },
  { source: '3', target: '12' },
  // 卫星通信到子项
  { source: '4', target: '14' },
];

// 分类
export const categories = [
  { name: '产业集群', itemStyle: { color: '#1677ff' } },
  { name: '核心系统', itemStyle: { color: '#52c41a' } },
  { name: '关键零部件', itemStyle: { color: '#faad14' } },
];

// 推荐企业数据（按缺失节点分类）- 深圳招商重点方向
export const recommendedEnterprises = {
  '5G芯片': [
    {
      id: 1,
      name: '紫光展锐',
      location: '上海',
      tag: '国产替代',
      tagColor: 'red',
      matchRate: 95,
      recommendReason: '国内公开市场5G芯片主要供应商，产品已大规模商用，有意布局华南研发中心',
      revenue: '¥120亿',
      employees: '4500人',
      avatarColor: '#1677ff',
    },
    {
      id: 2,
      name: '翱捷科技',
      location: '上海',
      tag: '科创板上市',
      tagColor: 'blue',
      matchRate: 88,
      recommendReason: '蜂窝基带芯片设计企业，5G芯片研发进展顺利，与深圳终端厂商合作意愿强',
      revenue: '¥25亿',
      employees: '1100人',
      avatarColor: '#52c41a',
    },
    {
      id: 3,
      name: '联发科（深圳研发中心扩建）',
      location: '中国台湾',
      tag: '全球前三',
      tagColor: 'gold',
      matchRate: 92,
      recommendReason: '全球最大手机芯片厂商之一，已在深圳设点，拟扩大本地研发团队',
      revenue: '¥1400亿',
      employees: '19000人',
      avatarColor: '#faad14',
    },
  ],
  '光纤预制棒': [
    {
      id: 4,
      name: '长飞光纤',
      location: '湖北武汉',
      tag: '行业龙头',
      tagColor: 'red',
      matchRate: 93,
      recommendReason: '全球最大光纤预制棒供应商，市占率全球第一，有意华南设厂',
      revenue: '¥130亿',
      employees: '8000人',
      avatarColor: '#1677ff',
    },
    {
      id: 5,
      name: '亨通光电',
      location: '江苏苏州',
      tag: '500强',
      tagColor: 'blue',
      matchRate: 90,
      recommendReason: '全球光纤通信前三强，光棒自给率高，与深圳运营商关系密切',
      revenue: '¥460亿',
      employees: '15000人',
      avatarColor: '#722ed1',
    },
  ],
  '卫星通信': [
    {
      id: 6,
      name: '银河航天',
      location: '北京',
      tag: '独角兽',
      tagColor: 'purple',
      matchRate: 91,
      recommendReason: '国内商业航天独角兽，低轨宽带卫星互联网领军企业，计划建设地面终端产线',
      revenue: 'B轮融资',
      employees: '800人',
      avatarColor: '#eb2f96',
    },
    {
      id: 7,
      name: '华力创通',
      location: '北京',
      tag: '北斗龙头',
      tagColor: 'cyan',
      matchRate: 87,
      recommendReason: '卫星导航和通信设备龙头，天通卫星通信基带芯片自主可控',
      revenue: '¥6.8亿',
      employees: '1200人',
      avatarColor: '#13c2c2',
    },
  ],
  '卫星地面终端': [
    {
      id: 8,
      name: '海格通信',
      location: '广东广州',
      tag: '军工+民用',
      tagColor: 'orange',
      matchRate: 89,
      recommendReason: '北斗导航设备龙头，卫星通信终端产品齐全，有意深圳设点服务大湾区',
      revenue: '¥56亿',
      employees: '8000人',
      avatarColor: '#fa8c16',
    },
    {
      id: 9,
      name: '华为（卫星通信事业部）',
      location: '深圳本地',
      tag: '本地培育',
      tagColor: 'green',
      matchRate: 96,
      recommendReason: 'Mate60已实现卫星通话，建议本地政策扶持，打造卫星通信终端产业',
      revenue: '-',
      employees: '-',
      avatarColor: '#52c41a',
    },
  ],
};

// 汇总导出
export const industryGraphMock = {
  nodes,
  links,
  categories,
};

export default {
  industryGraphMock,
  recommendedEnterprises,
};
