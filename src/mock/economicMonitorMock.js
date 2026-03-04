/**
 * EconomicMonitor Mock Data - 经济监测模拟数据
  * 包含国标行业、产业、园区三个维度的数据
 */
// 一级国标行业分类 (GB/T 4754-2017 全部20个门类)
export const gbIndustries = [
  { title: '农林牧渔业', key: 'gb-a', count: 1200 },
  { title: '采矿业', key: 'gb-b', count: 800 },
  { title: '制造业', key: 'gb-c', count: 85600 },
  { title: '电力热力燃气及水生产和供应业', key: 'gb-d', count: 1200 },
  { title: '建筑业', key: 'gb-e', count: 41200 },
  { title: '批发和零售业', key: 'gb-f', count: 68200 },
  { title: '交通运输仓储和邮政业', key: 'gb-g', count: 15800 },
  { title: '住宿和餐饮业', key: 'gb-h', count: 28600 },
  { title: '信息传输软件和信息技术服务业', key: 'gb-i', count: 42500 },
  { title: '金融业', key: 'gb-j', count: 12800 },
  { title: '房地产业', key: 'gb-k', count: 25600 },
  { title: '租赁和商务服务业', key: 'gb-l', count: 32400 },
  { title: '科学研究和技术服务业', key: 'gb-m', count: 18500 },
  { title: '水利环境和公共设施管理业', key: 'gb-n', count: 3200 },
  { title: '居民服务修理和其他服务业', key: 'gb-o', count: 28600 },
  { title: '教育', key: 'gb-p', count: 5200 },
  { title: '卫生和社会工作', key: 'gb-q', count: 6800 },
  { title: '文化体育和娱乐业', key: 'gb-r', count: 9200 },
  { title: '公共管理社会保障和社会组织', key: 'gb-s', count: 4500 },
    { title: '国际组织', key: 'gb-t', count: 50 },
];
// 产业分类 - 深圳"20+8"产业集群（平铺展示）
export const industries = [
  // 战略性新兴产业（20个产业集群）
  { title: '网络与通信', key: 'industry-network' },
  { title: '半导体与集成电路', key: 'industry-semiconductor' },
  { title: '超高清视频显示', key: 'industry-display' },
  { title: '智能终端', key: 'industry-terminal' },
  { title: '智能传感器', key: 'industry-sensor' },
  { title: '软件与信息服务', key: 'industry-software' },
  { title: '数字创意', key: 'industry-digital-creative' },
  { title: '现代时尚', key: 'industry-fashion' },
  { title: '工业母机', key: 'industry-machine-tools' },
  { title: '智能机器人', key: 'industry-robot' },
  { title: '激光与增材制造', key: 'industry-laser' },
  { title: '精密仪器设备', key: 'industry-precision' },
  { title: '新能源', key: 'industry-energy' },
  { title: '安全节能环保', key: 'industry-safety' },
  { title: '智能网联汽车', key: 'industry-connected-car' },
  { title: '新材料', key: 'industry-material' },
  { title: '高端医疗器械', key: 'industry-medical-device' },
  { title: '生物医药', key: 'industry-biomed' },
  { title: '大健康', key: 'industry-health' },
  { title: '海洋产业', key: 'industry-marine' },
  // 未来产业（8大产业）
  { title: '合成生物', key: 'industry-synthetic-bio' },
  { title: '区块链', key: 'industry-blockchain' },
  { title: '细胞与基因', key: 'industry-cell-gene' },
  { title: '空天技术', key: 'industry-space' },
  { title: '脑科学与类脑智能', key: 'industry-brain' },
  { title: '深地深海', key: 'industry-deep' },
  { title: '可见光通信与光计算', key: 'industry-visible-light' },
   { title: '量子信息', key: 'industry-quantum' },
];
// 园区数据 - 深圳主要产业园区（important标记核心园区，默认展开）
export const parks = [
  // 核心园区（默认展示）
  { title: '南山科技园', key: 'park-nanshan', count: 28500, important: true },
  { title: '前海深港合作区', key: 'park-qianhai', count: 18600, important: true },
  { title: '深圳湾超级总部基地', key: 'park-shenzhenbay', count: 5600, important: true },
  { title: '光明科学城', key: 'park-guangming', count: 6800, important: true },
  { title: '坪山生物医药基地', key: 'park-pingshan-bio', count: 4200, important: true },
  { title: '坂雪岗科技城', key: 'park-banxuegang', count: 9200, important: true },
  { title: '留仙洞总部基地', key: 'park-liuxiandong', count: 7800, important: true },
  { title: '宝安尖岗山产业园', key: 'park-jianggangshan', count: 8500, important: true },
  // 其他园区（收起状态）
  { title: '福田保税区', key: 'park-futian-bonded', count: 3200, important: false },
  { title: '盐田综合保税区', key: 'park-yantian-bonded', count: 1800, important: false },
  { title: '大铲湾片区', key: 'park-dachanwan', count: 2100, important: false },
  { title: '龙岗天安数码城', key: 'park-tianan', count: 9800, important: false },
  { title: '龙华大浪时尚小镇', key: 'park-dalang', count: 4500, important: false },
  { title: '观澜高新区', key: 'park-guanlan', count: 6200, important: false },
  { title: '宝龙科技城', key: 'park-baolong', count: 7400, important: false },
  { title: '大运软件小镇', key: 'park-dayun', count: 3800, important: false },
  { title: '坪山高新区', key: 'park-pingshan-hitech', count: 5600, important: false },
  { title: '大鹏新区生命科学园', key: 'park-dapeng', count: 1200, important: false },
  { title: '深汕合作区', key: 'park-shenshan', count: 2100, important: false },
  { title: '罗湖大梧桐新兴产业带', key: 'park-wutong', count: 2800, important: false },
  { title: '福田河套深港科创区', key: 'park-hetao', count: 1500, important: false },
  { title: '盐田北山工业区', key: 'park-beishan', count: 900, important: false },
   { title: '深圳国家高新区', key: 'park-hitech', count: 18500, important: false },
];
// // 12个月份数据（2025-02 到 2026-01）
const months = ['2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'];
/**
 * 深圳真实经济数据 Mock（2025-02 至 2026-01）
 * 数据结构：总数、环比、同比 三者逻辑一致
 * 基准：2024年同期数据参考深圳统计年鉴
 */
// ==================== 1. 企业数量数据 ====================
// 深圳企业存量约280万家，月新增约2-3万家
// 总数（家）、环比（%）、同比（%）
const enterpriseData = [
  { total: 2558200, mom: 0.8, yoy: 8.5 },   // 2025-02 春节月
  { total: 2586400, mom: 1.1, yoy: 8.8 },   // 2025-03 返工高峰
  { total: 2615800, mom: 1.1, yoy: 9.0 },   // 2025-04
  { total: 2639200, mom: 0.9, yoy: 8.9 },   // 2025-05
  { total: 2661800, mom: 0.9, yoy: 8.7 },   // 2025-06
  { total: 2684500, mom: 0.9, yoy: 8.6 },   // 2025-07
  { total: 2706800, mom: 0.8, yoy: 8.4 },   // 2025-08
  { total: 2728900, mom: 0.8, yoy: 8.3 },   // 2025-09
  { total: 2745600, mom: 0.6, yoy: 8.1 },   // 2025-10
  { total: 2762300, mom: 0.6, yoy: 7.9 },   // 2025-11
  { total: 2779800, mom: 0.6, yoy: 7.8 },   // 2025-12
  { total: 2796500, mom: 0.6, yoy: 7.6 },   // 2026-01
];
// ==================== 2. 纳税数据 ====================
// 深圳月度税收约600-900亿元，年累计约9500亿
// 季度申报月（1、4、7、10月）较高，春节月较低
const taxData = [
  { total: 628.5, mom: -18.5, yoy: 5.2 },   // 2025-02 春节低谷
  { total: 765.2, mom: 21.8, yoy: 6.8 },    // 2025-03 恢复增长
  { total: 892.4, mom: 16.6, yoy: 8.5 },    // 2025-04 季报高峰
  { total: 738.6, mom: -17.2, yoy: 7.2 },   // 2025-05
  { total: 712.3, mom: -3.6, yoy: 6.5 },    // 2025-06
  { total: 845.8, mom: 18.7, yoy: 7.8 },    // 2025-07 季报高峰
  { total: 798.4, mom: -5.6, yoy: 6.9 },    // 2025-08
  { total: 756.2, mom: -5.3, yoy: 6.2 },    // 2025-09
  { total: 825.6, mom: 9.2, yoy: 7.5 },     // 2025-10 季报高峰
  { total: 788.9, mom: -4.4, yoy: 6.8 },    // 2025-11
  { total: 742.3, mom: -5.9, yoy: 5.9 },    // 2025-12
  { total: 865.4, mom: 16.6, yoy: 7.2 },    // 2026-01 年末高峰
];
// ==================== 3. 用工数据 ====================
// 深圳就业人口约1200万人，春节后3月回流高峰
const employmentData = [
  { total: 1128.5, mom: -3.2, yoy: 0.8 },   // 2025-02 春节返乡
  { total: 1185.6, mom: 5.1, yoy: 1.2 },    // 2025-03 返工高峰
  { total: 1192.3, mom: 0.6, yoy: 1.0 },    // 2025-04
  { total: 1195.8, mom: 0.3, yoy: 0.9 },    // 2025-05
  { total: 1196.5, mom: 0.1, yoy: 0.8 },    // 2025-06
  { total: 1197.2, mom: 0.1, yoy: 0.7 },    // 2025-07
  { total: 1196.8, mom: -0.0, yoy: 0.6 },   // 2025-08
  { total: 1197.5, mom: 0.1, yoy: 0.6 },    // 2025-09
  { total: 1198.2, mom: 0.1, yoy: 0.5 },    // 2025-10
  { total: 1198.8, mom: 0.0, yoy: 0.5 },    // 2025-11
  { total: 1199.2, mom: 0.0, yoy: 0.4 },    // 2025-12
  { total: 1198.6, mom: -0.0, yoy: 0.3 },   // 2026-01 春节前夕
];
// ==================== 4. 专利数据 ====================
// 深圳月度专利申请2-3万件，授权1.2-1.8万件，授权率55-60%
const patentData = [
  { apply: 21800, grant: 12500, applyMom: -12.5, applyYoy: 8.2, grantMom: -8.2, grantYoy: 12.5 },   // 2025-02 春节
  { apply: 28500, grant: 16200, applyMom: 30.7, applyYoy: 15.6, grantMom: 29.6, grantYoy: 18.2 },  // 2025-03 高峰
  { apply: 26800, grant: 15400, applyMom: -6.0, applyYoy: 12.8, grantMom: -4.9, grantYoy: 15.6 },  // 2025-04
  { apply: 24200, grant: 13800, applyMom: -9.7, applyYoy: 10.5, grantMom: -10.4, grantYoy: 12.8 }, // 2025-05
  { apply: 22800, grant: 13200, applyMom: -5.8, applyYoy: 8.9, grantMom: -4.3, grantYoy: 11.2 },  // 2025-06
  { apply: 25600, grant: 14800, applyMom: 12.3, applyYoy: 11.2, grantMom: 12.1, grantYoy: 13.5 }, // 2025-07
  { apply: 23800, grant: 13600, applyMom: -7.0, applyYoy: 9.8, grantMom: -8.1, grantYoy: 10.8 },  // 2025-08
  { apply: 26500, grant: 15200, applyMom: 11.3, applyYoy: 12.5, grantMom: 11.8, grantYoy: 14.2 }, // 2025-09
  { apply: 27200, grant: 15800, applyMom: 2.6, applyYoy: 13.8, grantMom: 3.9, grantYoy: 15.6 },   // 2025-10
  { apply: 25800, grant: 14800, applyMom: -5.1, applyYoy: 11.5, grantMom: -6.3, grantYoy: 12.8 }, // 2025-11
  { apply: 28900, grant: 16800, applyMom: 12.0, applyYoy: 14.2, grantMom: 13.5, grantYoy: 16.8 }, // 2025-12 年底高峰
  { apply: 31200, grant: 18200, applyMom: 8.0, applyYoy: 16.5, grantMom: 8.3, grantYoy: 18.5 },   // 2026-01 年初高峰
];
// 图表数据导出
export const chartData = {
  months,
  // 企业数量（万家 + 环比 + 同比）
  enterprise: {
    total: enterpriseData.map(d => (d.total / 10000).toFixed(1)),
    mom: enterpriseData.map(d => d.mom),
    yoy: enterpriseData.map(d => d.yoy),
    raw: enterpriseData,
  },
  // 纳税（亿元 + 环比 + 同比）
  tax: {
    values: taxData.map(d => d.total),
    mom: taxData.map(d => d.mom),
    yoy: taxData.map(d => d.yoy),
    raw: taxData,
  },
  // 用工（万人 + 环比 + 同比）
  employment: {
    values: employmentData.map(d => d.total),
    mom: employmentData.map(d => d.mom),
    yoy: employmentData.map(d => d.yoy),
    raw: employmentData,
  },
  // 专利（申请/授权 + 环比 + 同比）
  patent: {
    apply: patentData.map(d => d.apply),
    grant: patentData.map(d => d.grant),
    applyMom: patentData.map(d => d.applyMom),
    applyYoy: patentData.map(d => d.applyYoy),
    grantRate: patentData.map(d => ((d.grant / d.apply) * 100).toFixed(1)),
    raw: patentData,
  },
};
// 汇总统计（最新月份 2026-01 数据）
export const summaryStats = {
  enterpriseCount: {
    total: enterpriseData[11].total,
    mom: enterpriseData[11].mom,
    yoy: enterpriseData[11].yoy,
  },
  taxRevenue: {
    total: taxData[11].total,
    mom: taxData[11].mom,
    yoy: taxData[11].yoy,
  },
  employment: {
    total: employmentData[11].total,
    mom: employmentData[11].mom,
    yoy: employmentData[11].yoy,
  },
  patents: {
    total: patentData.reduce((sum, d) => sum + d.apply, 0), // 12个月累计
    apply: patentData[11].apply,
    grant: patentData[11].grant,
    grantRate: ((patentData[11].grant / patentData[11].apply) * 100).toFixed(1),
   },
};
// 区域数据 - 深圳行政区
export const districts = [
  { title: '福田区', key: 'district-futian' },
  { title: '罗湖区', key: 'district-luohu' },
  { title: '南山区', key: 'district-nanshan' },
  { title: '盐田区', key: 'district-yantian' },
  { title: '宝安区', key: 'district-baoan' },
  { title: '龙岗区', key: 'district-longgang' },
  { title: '龙华区', key: 'district-longhua' },
  { title: '坪山区', key: 'district-pingshan' },
  { title: '光明区', key: 'district-guangming' },
  { title: '大鹏新区', key: 'district-dapeng' },
  { title: '深汕合作区', key: 'district-shenshan' },
];
// 汇总导出
export const economicMonitorMock = {
  gbIndustries,
  industries,
  parks,
  districts,
  chartData,
  summaryStats,
};
