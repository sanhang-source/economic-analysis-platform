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
const months = ['2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'];
/**
 * 深圳真实经济数据 Mock（2025-02 至 2026-01）
 * 数据结构：总数、环比、同比 三者逻辑一致
 * 基准：2024年同期数据参考深圳统计年鉴
 */
// ==================== 1. 企业数量数据 ====================
// 深圳企业存量约280万家，月新增约2-3万家
// 总数（家）、环比（%）、同比（%）
const enterpriseData = [
  { total: 2208333, mom: 0.0, yoy: 8.0 },   // 2024-02
  { total: 2233333, mom: 1.1, yoy: 8.0 },   // 2024-03
  { total: 2257407, mom: 1.1, yoy: 8.0 },   // 2024-04
  { total: 2282407, mom: 1.1, yoy: 8.0 },   // 2024-05
  { total: 2307407, mom: 1.1, yoy: 8.0 },   // 2024-06
  { total: 2331481, mom: 1.0, yoy: 8.0 },   // 2024-07
  { total: 2354629, mom: 1.0, yoy: 8.0 },   // 2024-08
  { total: 2376851, mom: 0.9, yoy: 8.0 },   // 2024-09
  { total: 2399074, mom: 0.9, yoy: 8.0 },   // 2024-10
  { total: 2421296, mom: 0.9, yoy: 8.0 },   // 2024-11
  { total: 2444444, mom: 1.0, yoy: 8.0 },   // 2024-12
  { total: 2464814, mom: 0.8, yoy: 8.0 },   // 2025-01
  { total: 2385000, mom: -3.2, yoy: 8.0 },    // 2025-02
  { total: 2412000, mom: 1.1, yoy: 8.2 },    // 2025-03
  { total: 2438000, mom: 1.1, yoy: 7.8 },    // 2025-04
  { total: 2465000, mom: 1.1, yoy: 8.5 },    // 2025-05
  { total: 2492000, mom: 1.1, yoy: 8.0 },    // 2025-06
  { total: 2518000, mom: 1.0, yoy: 7.9 },    // 2025-07
  { total: 2543000, mom: 1.0, yoy: 8.3 },    // 2025-08
  { total: 2567000, mom: 0.9, yoy: 8.0 },    // 2025-09
  { total: 2591000, mom: 0.9, yoy: 7.6 },    // 2025-10
  { total: 2615000, mom: 0.9, yoy: 8.1 },    // 2025-11
  { total: 2640000, mom: 1.0, yoy: 7.9 },    // 2025-12
  { total: 2662000, mom: 0.8, yoy: 8.4 },    // 2026-01
];
// ==================== 2. 纳税数据 ====================
// 深圳月度税收约600-900亿元，年累计约9500亿
// 季度申报月（1、4、7、10月）较高，春节月较低
const taxData = [
  { total: 587.1, mom: 0.0, yoy: 6.5 },     // 2024-02
  { total: 672.1, mom: 14.5, yoy: 6.5 },    // 2024-03
  { total: 643.4, mom: -4.3, yoy: 6.5 },    // 2024-04
  { total: 655.9, mom: 1.9, yoy: 6.5 },     // 2024-05
  { total: 737.7, mom: 12.5, yoy: 6.5 },    // 2024-06
  { total: 643.5, mom: -12.8, yoy: 6.5 },   // 2024-07
  { total: 650.5, mom: 1.1, yoy: 6.5 },     // 2024-08
  { total: 699.7, mom: 7.6, yoy: 6.5 },     // 2024-09
  { total: 669.1, mom: -4.4, yoy: 6.5 },    // 2024-10
  { total: 712.0, mom: 6.4, yoy: 6.5 },     // 2024-11
  { total: 791.1, mom: 11.1, yoy: 6.5 },    // 2024-12
  { total: 749.8, mom: -5.2, yoy: 6.5 },    // 2025-01
  { total: 625.3, mom: -16.6, yoy: 6.5 },    // 2025-02
  { total: 715.8, mom: 14.5, yoy: 6.8 },    // 2025-03
  { total: 685.2, mom: -4.3, yoy: 6.2 },    // 2025-04
  { total: 698.5, mom: 1.9, yoy: 6.9 },     // 2025-05
  { total: 785.6, mom: 12.5, yoy: 6.3 },    // 2025-06
  { total: 685.3, mom: -12.8, yoy: 6.7 },   // 2025-07
  { total: 692.8, mom: 1.1, yoy: 6.4 },     // 2025-08
  { total: 745.2, mom: 7.6, yoy: 6.6 },     // 2025-09
  { total: 712.6, mom: -4.4, yoy: 6.1 },    // 2025-10
  { total: 758.3, mom: 6.4, yoy: 6.8 },     // 2025-11
  { total: 842.5, mom: 11.1, yoy: 6.2 },    // 2025-12
  { total: 798.5, mom: -5.2, yoy: 6.9 },    // 2026-01
];
// ==================== 3. 用工数据 ====================
// 深圳就业人口约1200万人，春节后3月回流高峰
const employmentData = [
  { total: 1178.1, mom: 0.0, yoy: 0.6 },    // 2024-02
  { total: 1178.3, mom: 0.0, yoy: 0.6 },    // 2024-03
  { total: 1181.0, mom: 0.2, yoy: 0.6 },    // 2024-04
  { total: 1182.3, mom: 0.1, yoy: 0.6 },    // 2024-05
  { total: 1183.6, mom: 0.1, yoy: 0.6 },    // 2024-06
  { total: 1184.6, mom: 0.1, yoy: 0.6 },    // 2024-07
  { total: 1185.6, mom: 0.1, yoy: 0.6 },    // 2024-08
  { total: 1186.5, mom: 0.1, yoy: 0.6 },    // 2024-09
  { total: 1187.4, mom: 0.1, yoy: 0.6 },    // 2024-10
  { total: 1188.1, mom: 0.1, yoy: 0.6 },    // 2024-11
  { total: 1188.8, mom: 0.1, yoy: 0.6 },    // 2024-12
  { total: 1188.9, mom: 0.0, yoy: 0.6 },    // 2025-01
  { total: 1185.2, mom: -0.3, yoy: 0.6 },    // 2025-02
  { total: 1185.4, mom: 0.0, yoy: 0.8 },    // 2025-03
  { total: 1188.1, mom: 0.2, yoy: 0.5 },    // 2025-04
  { total: 1189.4, mom: 0.1, yoy: 0.7 },    // 2025-05
  { total: 1190.7, mom: 0.1, yoy: 0.4 },    // 2025-06
  { total: 1191.7, mom: 0.1, yoy: 0.6 },    // 2025-07
  { total: 1192.7, mom: 0.1, yoy: 0.9 },    // 2025-08
  { total: 1193.6, mom: 0.1, yoy: 0.3 },    // 2025-09
  { total: 1194.5, mom: 0.1, yoy: 0.7 },    // 2025-10
  { total: 1195.2, mom: 0.1, yoy: 0.5 },    // 2025-11
  { total: 1195.9, mom: 0.1, yoy: 0.8 },    // 2025-12
  { total: 1196.0, mom: 0.0, yoy: 0.4 },    // 2026-01
];
// ==================== 4. 专利数据 ====================
const patentData = [
  { total: 213000, mom: 0.0, yoy: 12.0 },   // 2024-02
  { total: 215946, mom: 1.4, yoy: 12.0 },   // 2024-03
  { total: 219071, mom: 1.4, yoy: 12.0 },   // 2024-04
  { total: 222196, mom: 1.4, yoy: 12.0 },   // 2024-05
  { total: 225500, mom: 1.5, yoy: 12.0 },   // 2024-06
  { total: 228982, mom: 1.5, yoy: 12.0 },   // 2024-07
  { total: 232553, mom: 1.6, yoy: 12.0 },   // 2024-08
  { total: 236125, mom: 1.5, yoy: 12.0 },   // 2024-09
  { total: 239875, mom: 1.6, yoy: 12.0 },   // 2024-10
  { total: 243714, mom: 1.6, yoy: 12.0 },   // 2024-11
  { total: 249339, mom: 2.3, yoy: 12.0 },   // 2024-12
  { total: 255589, mom: 2.5, yoy: 12.0 },   // 2025-01
  { total: 238560, mom: -6.7, yoy: 12.0 },   // 2025-02
  { total: 241860, mom: 1.4, yoy: 11.7 },   // 2025-03
  { total: 245360, mom: 1.4, yoy: 12.3 },   // 2025-04
  { total: 248860, mom: 1.4, yoy: 11.5 },   // 2025-05
  { total: 252560, mom: 1.5, yoy: 12.8 },   // 2025-06
  { total: 256460, mom: 1.5, yoy: 11.2 },   // 2025-07
  { total: 260460, mom: 1.6, yoy: 12.5 },   // 2025-08
  { total: 264460, mom: 1.5, yoy: 11.9 },   // 2025-09
  { total: 268660, mom: 1.6, yoy: 12.4 },   // 2025-10
  { total: 272960, mom: 1.6, yoy: 11.6 },   // 2025-11
  { total: 279260, mom: 2.3, yoy: 12.1 },   // 2025-12
  { total: 286260, mom: 2.5, yoy: 11.8 },   // 2026-01
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
  // 专利（万件 + 环比 + 同比）
  patent: {
    total: patentData.map(d => d.total),
    mom: patentData.map(d => d.mom),
    yoy: patentData.map(d => d.yoy),
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
    total: patentData[11].total, // 使用最新月份数据
    mom: patentData[11].mom,
    yoy: patentData[11].yoy,
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
