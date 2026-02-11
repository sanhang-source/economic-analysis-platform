/**
 * ChainAnalysis Mock Data - 强链补链分析模拟数据
 * 新能源汽车产业链分析
 */

// 概览统计数据
export const summary = {
  completeness: 85, // 产业链完整度
  localization: 40, // 本地配套率
  missingCount: 3, // 缺链环节数
  weakCount: 2, // 薄弱环节数
};

// 产业链环节数据
export const chainSegments = [
  {
    key: 'upstream',
    title: '上游原材料',
    type: 'upstream',
    desc: '矿产资源、基础材料供应',
    nodes: [
      {
        id: 'lithium',
        name: '锂矿',
        description: '电池级碳酸锂、氢氧化锂',
        status: 'missing',
        localEnterprises: 0,
        marketShare: 0,
      },
      {
        id: 'cathode',
        name: '正极材料',
        description: '磷酸铁锂、三元材料',
        status: 'strong',
        localEnterprises: 8,
        marketShare: 25,
      },
      {
        id: 'anode',
        name: '负极材料',
        description: '人造石墨、硅碳负极',
        status: 'strong',
        localEnterprises: 5,
        marketShare: 18,
      },
      {
        id: 'electrolyte',
        name: '电解液',
        description: '六氟磷酸锂、溶剂',
        status: 'strong',
        localEnterprises: 3,
        marketShare: 15,
      },
      {
        id: 'separator',
        name: '隔膜',
        description: '湿法隔膜、干法隔膜',
        status: 'missing',
        localEnterprises: 0,
        marketShare: 0,
      },
    ],
  },
  {
    key: 'midstream',
    title: '中游零部件',
    type: 'midstream',
    desc: '核心部件、系统集成',
    nodes: [
      {
        id: 'cell',
        name: '电芯',
        description: '动力电池电芯制造',
        status: 'strong',
        localEnterprises: 12,
        marketShare: 35,
      },
      {
        id: 'bms',
        name: 'BMS',
        description: '电池管理系统',
        status: 'weak',
        localEnterprises: 2,
        marketShare: 8,
      },
      {
        id: 'motor',
        name: '驱动电机',
        description: '永磁同步电机',
        status: 'strong',
        localEnterprises: 6,
        marketShare: 22,
      },
      {
        id: 'igbt',
        name: 'IGBT模块',
        description: '功率半导体器件',
        status: 'missing',
        localEnterprises: 0,
        marketShare: 0,
      },
      {
        id: 'pcb',
        name: 'PCB',
        description: '车用印制电路板',
        status: 'strong',
        localEnterprises: 15,
        marketShare: 30,
      },
    ],
  },
  {
    key: 'downstream',
    title: '下游整车',
    type: 'downstream',
    desc: '整车制造、销售服务',
    nodes: [
      {
        id: 'oem',
        name: '整车制造',
        description: '新能源汽车整车生产',
        status: 'strong',
        localEnterprises: 4,
        marketShare: 28,
      },
      {
        id: 'charging',
        name: '充电桩',
        description: '充电设备制造运营',
        status: 'strong',
        localEnterprises: 20,
        marketShare: 35,
      },
    ],
  },
];

// 补链推荐企业
export const recommendations = [
  {
    id: 1,
    name: '天齐锂业股份有限公司',
    targetSegment: '锂矿',
    targetStatus: 'missing',
    rating: 5,
    reason: '全球最大锂矿供应商之一，掌控优质锂矿资源，已与本地电池企业有合作基础，有意向设立华南加工基地。',
    revenue: '¥400亿',
    marketShare: 15,
    location: '四川',
    logoColor: '#1677ff',
  },
  {
    id: 2,
    name: '恩捷股份',
    targetSegment: '隔膜',
    targetStatus: 'missing',
    rating: 5,
    reason: '全球隔膜出货量第一，湿法隔膜技术领先，与本地电池企业配套需求强烈，计划建设新产能。',
    revenue: '¥120亿',
    marketShare: 32,
    location: '云南',
    logoColor: '#52c41a',
  },
  {
    id: 3,
    name: '斯达半导',
    targetSegment: 'IGBT模块',
    targetStatus: 'missing',
    rating: 4,
    reason: '国内IGBT模块龙头，车规级IGBT批量供货主流车企，亟需扩大产能满足新能源汽车需求增长。',
    revenue: '¥35亿',
    marketShare: 12,
    location: '浙江',
    logoColor: '#722ed1',
  },
  {
    id: 4,
    name: '均胜电子',
    targetSegment: 'BMS',
    targetStatus: 'weak',
    rating: 4,
    reason: '全球领先的汽车电子供应商，BMS技术成熟，客户覆盖德系、日系主流车企，有意布局华南研发中心。',
    revenue: '¥500亿',
    marketShare: 8,
    location: '浙江',
    logoColor: '#fa8c16',
  },
  {
    id: 5,
    name: '科大国创',
    targetSegment: 'BMS',
    targetStatus: 'weak',
    rating: 3,
    reason: '中科大背景，BMS技术实力强，已与多家主机厂合作，处于快速成长期，扩产意愿强烈。',
    revenue: '¥25亿',
    marketShare: 3,
    location: '安徽',
    logoColor: '#13c2c2',
  },
  {
    id: 6,
    name: '赣锋锂业',
    targetSegment: '锂矿',
    targetStatus: 'missing',
    rating: 4,
    reason: '全球第三大锂化合物生产商，氢氧化锂产能全球领先，与特斯拉等国际车企有长期合作。',
    revenue: '¥350亿',
    marketShare: 12,
    location: '江西',
    logoColor: '#eb2f96',
  },
];

// 汇总导出
export const chainAnalysisMock = {
  summary,
  chainSegments,
  recommendations,
};

export default chainAnalysisMock;
