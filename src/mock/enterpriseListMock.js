/**
 * EnterpriseList Mock Data - 企业名录模拟数据
 * 针对深圳政府场景优化 - 突出国高企业、专精特新、20+8产业
 */

// 深圳企业列表数据 - 基于真实产业背景虚构
export const enterprises = [
  {
    id: 1,
    name: '华为技术有限公司',
    code: '91440300192383298W',
    industry: '网络通信/智能终端',
    outputValue: 70420000, // 7042亿元
    landEfficiency: 'A',
    taxGrade: 'A',
    tags: ['国高企业', '世界500强', '制造业单项冠军', '总部企业'],
    contact: {
      name: '张平安',
      phone: '138****8888',
    },
    logoColor: '#FF0000',
    // 深圳特色字段
    district: '龙岗区',
    park: '坂雪岗科技城',
    isFortune500: true,
    isUnicorn: false,
    gaoXinYear: 2000,
  },
  {
    id: 2,
    name: '腾讯科技（深圳）有限公司',
    code: '9144030071526726XG',
    industry: '软件信息/数字创意',
    outputValue: 56000000, // 5600亿元
    landEfficiency: 'A',
    taxGrade: 'A',
    tags: ['国高企业', '世界500强', '总部企业', '数字经济'],
    contact: {
      name: '马化腾',
      phone: '139****6666',
    },
    logoColor: '#0052D9',
    district: '南山区',
    park: '深圳湾科技生态园',
    isFortune500: true,
    isUnicorn: false,
    gaoXinYear: 2000,
  },
  {
    id: 3,
    name: '深圳大疆创新科技有限公司',
    code: '91440300589150582C',
    industry: '无人机/智能装备',
    outputValue: 3010000, // 301亿元
    landEfficiency: 'A',
    taxGrade: 'A',
    tags: ['国高企业', '独角兽', '专精特新', '制造业单项冠军'],
    contact: {
      name: '汪滔',
      phone: '137****9999',
    },
    logoColor: '#00C1DE',
    district: '南山区',
    park: '留仙洞总部基地',
    isFortune500: false,
    isUnicorn: true,
    gaoXinYear: 2008,
  },
  {
    id: 4,
    name: '比亚迪股份有限公司',
    code: '91440300192348886G',
    industry: '新能源汽车/电池',
    outputValue: 60230000, // 6023亿元
    landEfficiency: 'A',
    taxGrade: 'A',
    tags: ['国高企业', '世界500强', '上市公司', '20+8产业'],
    contact: {
      name: '王传福',
      phone: '136****7777',
    },
    logoColor: '#1E4D2B',
    district: '坪山区',
    park: '坪山国家新能源产业基地',
    isFortune500: true,
    isUnicorn: false,
    gaoXinYear: 2000,
  },
  {
    id: 5,
    name: '中兴通讯股份有限公司',
    code: '91440300192381899W',
    industry: '通信设备/半导体',
    outputValue: 12290000, // 1229亿元
    landEfficiency: 'A',
    taxGrade: 'A',
    tags: ['国高企业', '上市公司', '制造业单项冠军'],
    contact: {
      name: '李自学',
      phone: '135****5555',
    },
    logoColor: '#0066CC',
    district: '南山区',
    park: '科技园中区',
    isFortune500: false,
    isUnicorn: false,
    gaoXinYear: 2000,
  },
  {
    id: 6,
    name: '迈瑞生物医疗电子股份有限公司',
    code: '914403007084678371',
    industry: '高端医疗器械',
    outputValue: 3490000, // 349亿元
    landEfficiency: 'A',
    taxGrade: 'A',
    tags: ['国高企业', '上市公司', '制造业单项冠军', '20+8产业'],
    contact: {
      name: '李西廷',
      phone: '134****4444',
    },
    logoColor: '#00A0E9',
    district: '光明区',
    park: '光明科学城',
    isFortune500: false,
    isUnicorn: false,
    gaoXinYear: 1999,
  },
  {
    id: 7,
    name: '深圳市优必选科技股份有限公司',
    code: '9144030030582935X0',
    industry: '智能机器人/AI',
    outputValue: 10500, // 10.5亿元（仍在成长期）
    landEfficiency: 'B',
    taxGrade: 'B',
    tags: ['国高企业', '独角兽', '专精特新', '20+8产业'],
    contact: {
      name: '周剑',
      phone: '133****3333',
    },
    logoColor: '#FF6A00',
    district: '南山区',
    park: '南山智园',
    isFortune500: false,
    isUnicorn: true,
    gaoXinYear: 2014,
  },
  {
    id: 8,
    name: '深圳云天励飞技术股份有限公司',
    code: '91440300319601467W',
    industry: '人工智能/芯片',
    outputValue: 5200, // 5.2亿元
    landEfficiency: 'C',
    taxGrade: 'B',
    tags: ['国高企业', '专精特新', '20+8产业', '科创板'],
    contact: {
      name: '陈宁',
      phone: '132****2222',
    },
    logoColor: '#1890FF',
    district: '南山区',
    park: '深圳湾科技生态园',
    isFortune500: false,
    isUnicorn: false,
    gaoXinYear: 2015,
  },
  {
    id: 9,
    name: '深圳市新产业生物医学工程股份有限公司',
    code: '91440300192354528X',
    industry: '生物医药/体外诊断',
    outputValue: 398000, // 39.8亿元
    landEfficiency: 'A',
    taxGrade: 'A',
    tags: ['国高企业', '上市公司', '专精特新', '坪山生物'],
    contact: {
      name: '饶微',
      phone: '131****1111',
    },
    logoColor: '#2FC25B',
    district: '坪山区',
    park: '坪山国家生物产业基地',
    isFortune500: false,
    isUnicorn: false,
    gaoXinYear: 1998,
  },
  {
    id: 10,
    name: '深圳光峰科技股份有限公司',
    code: '91440300757643115C',
    industry: '激光显示/光电子',
    outputValue: 256000, // 25.6亿元
    landEfficiency: 'A',
    taxGrade: 'A',
    tags: ['国高企业', '科创板', '专精特新', '20+8产业'],
    contact: {
      name: '李屹',
      phone: '130****0000',
    },
    logoColor: '#722ED1',
    district: '南山区',
    park: '南山智园',
    isFortune500: false,
    isUnicorn: false,
    gaoXinYear: 2006,
  },
  {
    id: 11,
    name: '深圳市德方纳米科技股份有限公司',
    code: '9144030066418112X9',
    industry: '新能源/纳米材料',
    outputValue: 2250000, // 225亿元
    landEfficiency: 'B',
    taxGrade: 'A',
    tags: ['国高企业', '上市公司', '制造业单项冠军', '20+8产业'],
    contact: {
      name: '孔令涌',
      phone: '138****1234',
    },
    logoColor: '#FAAD14',
    district: '南山区',
    park: '深圳湾科技生态园',
    isFortune500: false,
    isUnicorn: false,
    gaoXinYear: 2007,
  },
  {
    id: 12,
    name: '深圳微芯生物科技股份有限公司',
    code: '91440300715269059M',
    industry: '生物医药/创新药',
    outputValue: 5200, // 5.2亿元（研发投入大）
    landEfficiency: 'C',
    taxGrade: 'B',
    tags: ['国高企业', '科创板', '原创新药', '坪山生物'],
    contact: {
      name: '鲁先平',
      phone: '139****5678',
    },
    logoColor: '#EB2F96',
    district: '坪山区',
    park: '坪山国家生物产业基地',
    isFortune500: false,
    isUnicorn: false,
    gaoXinYear: 2001,
  },
];

// 深圳统计数据 - 国家高新技术企业数量（深圳实际超过2.3万家）
export const total = 23856;

// 汇总导出
export const enterpriseListMock = {
  enterprises,
  total,
};

export default enterpriseListMock;
