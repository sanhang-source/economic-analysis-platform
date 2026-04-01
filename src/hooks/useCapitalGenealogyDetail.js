import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { allClanList, memberCompaniesData, parseCapitalToNumber } from '../mock/capitalGenealogyMock';

// ==================== 常量定义 ====================

// 时间常量
const THREE_YEARS_AGO = dayjs().subtract(3, 'years');

// 成员级别筛选
const LEVEL_FILTER = ['core', 'first', 'second'];
const CORE_LEVELS = ['first', 'second'];

// 金额阈值（万元）
const THRESHOLDS = {
  MIN_CAPITAL: 5000,           // 最低注册资本
  MIN_REVENUE_MODEL1: 1,       // 模型1最低营收（亿）
  MIN_REVENUE_MANUFACTURING: 0.5, // 制造业最低营收（亿）
  LARGE_GROUP_MIN_MEMBERS: 30, // 大型集团最小成员数
};

// 评分配置
const SCORES = {
  PILLAR_BASE: 90,           // 支柱产业基础分
  PILLAR_RANGE: 10,          // 支柱产业随机范围
  EMERGING_BASE: 70,         // 新兴产业基础分
  EMERGING_RANGE: 15,        // 新兴产业随机范围
  OTHER_BASE: 40,            // 其他产业基础分
  OTHER_RANGE: 20,           // 其他产业随机范围
  LEVEL: {                   // 地位分
    core: 40,
    first: 30,
    second: 20,
    associate: 10,
  },
  PENETRATION_MULTIPLIER: 1.5, // 渗透率乘数
  PENETRATION_MAX: 60,       // 渗透率最大分值
  TOTAL_MAX: 100,            // 总分最大值
};

// 产业分类
const INDUSTRIES = {
  // 前海三大支柱产业
  PILLAR: ['金融', '现代物流', '科技服务', '互联网', '软件', '信息技术', '人工智能'],
  // 战略新兴产业
  EMERGING: ['人工智能', '新能源', '低空经济', 'AI', '新能源汽车', '生物医药', '半导体', '芯片'],
  // 制造业相关产业
  MANUFACTURING: ['制造业', '能源', '重工', '电气机械', '汽车制造', '装备制造', '金属制品'],
  // 商贸类产业关键词
  TRADING_KEYWORDS: ['批发', '贸易', '零售'],
  // 金融类产业关键词
  FINANCE_KEYWORDS: ['金融', '保险', '融资'],
};

// ==================== 工具函数 ====================

/**
 * 计算产业聚集度评分 (0-100)
 * 使用基于产业名称的哈希算法确保结果稳定
 * @param {string} industry - 产业名称
 * @returns {number} 评分
 */
const calcIndustryScore = (industry) => {
  // 生成稳定的哈希值
  const hash = industry.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);
  const normalizedHash = Math.abs(hash) % 100 / 100;

  if (INDUSTRIES.PILLAR.includes(industry)) {
    return SCORES.PILLAR_BASE + Math.floor(normalizedHash * SCORES.PILLAR_RANGE);
  }
  if ([...INDUSTRIES.MANUFACTURING, ...INDUSTRIES.EMERGING].includes(industry)) {
    return SCORES.EMERGING_BASE + Math.floor(normalizedHash * SCORES.EMERGING_RANGE);
  }
  return SCORES.OTHER_BASE + Math.floor(normalizedHash * SCORES.OTHER_RANGE);
};

/**
 * 计算集团紧密度评分 (0-100)
 * @param {string} level - 成员级别
 * @param {number} groupPenetrationRate - 集团渗透率
 * @returns {number} 评分
 */
const calcClosenessScore = (level, groupPenetrationRate) => {
  const levelScore = SCORES.LEVEL[level] || SCORES.LEVEL.associate;
  const penetrationScore = Math.min(
    Math.round(groupPenetrationRate * SCORES.PENETRATION_MULTIPLIER),
    SCORES.PENETRATION_MAX
  );
  return Math.min(levelScore + penetrationScore, SCORES.TOTAL_MAX);
};

/**
 * 检查产业是否匹配列表中的某个产业
 * @param {string} industry - 产业名称
 * @param {string[]} industryList - 产业列表
 * @returns {boolean}
 */
const matchesIndustry = (industry, industryList) => {
  return industryList.some(ind => industry.includes(ind) || ind.includes(industry));
};

/**
 * 检查企业产业是否包含关键词
 * @param {string} industry - 产业名称
 * @param {string[]} keywords - 关键词列表
 * @returns {boolean}
 */
const hasIndustryKeyword = (industry, keywords) => {
  return keywords.some(keyword => industry.includes(keyword));
};

// ==================== 模型筛选函数 ====================

/**
 * 模型1：产贸分离机会
 * 筛选条件：异地 + 核心层级(1/2级) + 营收>1亿 + 制造业/能源/重工 + 集团前海无商贸子公司
 */
const filterModel1 = (members, membersWithScore) => {
  const hasQianhaiTrading = members.some(m =>
    m.region === 'local' &&
    hasIndustryKeyword(m.industry, INDUSTRIES.TRADING_KEYWORDS)
  );

  if (hasQianhaiTrading) return [];

  return membersWithScore
    .filter(m =>
      m.region !== 'local' &&
      CORE_LEVELS.includes(m.level) &&
      (m.revenue || 0) >= THRESHOLDS.MIN_REVENUE_MODEL1 &&
      matchesIndustry(m.industry, INDUSTRIES.MANUFACTURING)
    )
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
};

/**
 * 模型2：新兴产业功能总部引入
 * 筛选条件：异地 + 核心层级(1/2级) + 近3年新成立 + 注资>5000万 + 战略新兴产业
 */
const filterModel2 = (membersWithScore) => {
  return membersWithScore
    .filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        m.region !== 'local' &&
        CORE_LEVELS.includes(m.level) &&
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        capitalNum >= THRESHOLDS.MIN_CAPITAL &&
        matchesIndustry(m.industry, INDUSTRIES.EMERGING)
      );
    })
    .sort((a, b) => parseCapitalToNumber(b.capital) - parseCapitalToNumber(a.capital));
};

/**
 * 模型3：跨区域制造产值统筹与结算归集
 * 筛选条件：前海有实体制造(>5000万) + 异地有同类核心子公司(>5000万)
 */
const filterModel3 = (members, membersWithScore) => {
  const hasQianhaiManufacturing = members.some(m =>
    m.region === 'local' &&
    (m.revenue || 0) >= THRESHOLDS.MIN_REVENUE_MANUFACTURING &&
    matchesIndustry(m.industry, INDUSTRIES.MANUFACTURING)
  );

  if (!hasQianhaiManufacturing) return [];

  return membersWithScore
    .filter(m =>
      m.region !== 'local' &&
      CORE_LEVELS.includes(m.level) &&
      (m.revenue || 0) >= THRESHOLDS.MIN_REVENUE_MANUFACTURING &&
      matchesIndustry(m.industry, INDUSTRIES.MANUFACTURING)
    )
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
};

/**
 * 模型4：大型实体集团供应链金融中心引入
 * 筛选条件：千亿级/百亿级大集团 + 成员>50家 + 前海无金融类子公司
 */
const filterModel4 = (members, clanInfo, penetrationRate, clanId) => {
  const isLargeGroup = members.length > THRESHOLDS.LARGE_GROUP_MIN_MEMBERS;

  const hasQianhaiFinance = members.some(m =>
    m.region === 'local' &&
    hasIndustryKeyword(m.industry, INDUSTRIES.FINANCE_KEYWORDS)
  );

  if (!isLargeGroup || hasQianhaiFinance) return [];

  return [{
    id: `model4-${clanId}`,
    name: clanInfo?.coreCompany || '',
    industry: '供应链金融',
    region: 'outside',
    regionName: '异地总部',
    capital: '100亿人民币',
    foundedDate: clanInfo?.coreInfo?.foundedDate || '-',
    revenue: 0,
    level: 'core',
    industryScore: 95,
    closenessScore: calcClosenessScore('core', penetrationRate),
    isModel4Target: true,
  }];
};

// ==================== Hook 主函数 ====================

export const useCapitalGenealogyDetail = (clanId) => {
  const [loading, setLoading] = useState(false);
  const [memberFilter, setMemberFilter] = useState('all');

  const clanInfo = useMemo(() => allClanList.find(c => c.id === clanId), [clanId]);
  const members = useMemo(() => memberCompaniesData[clanId] || [], [clanId]);

  const penetrationRate = useMemo(() => {
    if (!clanInfo?.qianhaiRevenue || !clanInfo?.groupTotalRevenue) return 0;
    return (clanInfo.qianhaiRevenue / clanInfo.groupTotalRevenue) * 100;
  }, [clanInfo]);

  // 给成员添加评分
  const membersWithScore = useMemo(() => {
    return members.map(m => ({
      ...m,
      industryScore: calcIndustryScore(m.industry),
      closenessScore: calcClosenessScore(m.level, penetrationRate),
    }));
  }, [members, penetrationRate]);

  // 四个模型的数据
  const model1Data = useMemo(() => filterModel1(members, membersWithScore), [members, membersWithScore]);
  const model2Data = useMemo(() => filterModel2(membersWithScore), [membersWithScore]);
  const model3Data = useMemo(() => filterModel3(members, membersWithScore), [members, membersWithScore]);
  const model4Data = useMemo(
    () => filterModel4(members, clanInfo, penetrationRate, clanId),
    [members, clanInfo, penetrationRate, clanId]
  );

  // 模型统计数据（用于雷达图）
  const modelStats = useMemo(() => ({
    model1: model1Data.length,
    model2: model2Data.length,
    model3: model3Data.length,
    model4: model4Data.length,
  }), [model1Data, model2Data, model3Data, model4Data]);

  // 组合所有模型数据
  const modelData = useMemo(() => ({
    model1: model1Data,
    model2: model2Data,
    model3: model3Data,
    model4: model4Data,
  }), [model1Data, model2Data, model3Data, model4Data]);

  // 产业落差数据
  const industryGapData = useMemo(() => {
    const industryMap = {};

    members.forEach(m => {
      if (!industryMap[m.industry]) {
        industryMap[m.industry] = {
          industry: m.industry,
          nationalRevenue: 0,
          qianhaiRevenue: 0
        };
      }
      industryMap[m.industry].nationalRevenue += (m.revenue || 0);
      if (m.region === 'local') {
        industryMap[m.industry].qianhaiRevenue += (m.revenue || 0);
      }
    });

    return Object.values(industryMap)
      .filter(item => item.nationalRevenue > 0)
      .map(item => ({
        ...item,
        gap: item.nationalRevenue - item.qianhaiRevenue
      }))
      .sort((a, b) => a.gap - b.gap)
      .slice(0, 8);
  }, [members]);

  // 投资趋势数据
  const investmentTrendData = useMemo(() => {
    const newCompanies = members.filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        LEVEL_FILTER.includes(m.level) &&
        capitalNum >= THRESHOLDS.MIN_CAPITAL
      );
    });

    const industryCapital = {};
    newCompanies.forEach(m => {
      industryCapital[m.industry] = (industryCapital[m.industry] || 0) + parseCapitalToNumber(m.capital);
    });

    return Object.entries(industryCapital)
      .map(([industry, capital]) => ({ industry, capital: (capital / 10000).toFixed(1) }))
      .sort((a, b) => parseFloat(b.capital) - parseFloat(a.capital));
  }, [members]);

  // 城市流向数据
  const cityFlowData = useMemo(() => {
    const outsideNewCompanies = members.filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        LEVEL_FILTER.includes(m.level) &&
        capitalNum >= THRESHOLDS.MIN_CAPITAL &&
        m.region !== 'local'
      );
    });

    const cityCapital = {};
    outsideNewCompanies.forEach(m => {
      cityCapital[m.regionName] = (cityCapital[m.regionName] || 0) + parseCapitalToNumber(m.capital);
    });

    return Object.entries(cityCapital)
      .map(([city, capital]) => ({ city, capital: (capital / 10000).toFixed(1) }))
      .sort((a, b) => parseFloat(b.capital) - parseFloat(a.capital))
      .slice(0, 5);
  }, [members]);

  // 保留原有列表用于兼容性
  const cashCowList = useMemo(() =>
    members
      .filter(m =>
        m.region !== 'local' &&
        LEVEL_FILTER.includes(m.level) &&
        (m.revenue || 0) >= THRESHOLDS.MIN_REVENUE_MODEL1
      )
      .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
  , [members]);

  const newProjectList = useMemo(() =>
    members
      .filter(m => {
        const foundedDate = dayjs(m.foundedDate);
        const capitalNum = parseCapitalToNumber(m.capital);
        return (
          m.region !== 'local' &&
          LEVEL_FILTER.includes(m.level) &&
          foundedDate.isAfter(THREE_YEARS_AGO) &&
          capitalNum >= THRESHOLDS.MIN_CAPITAL
        );
      })
      .sort((a, b) => parseCapitalToNumber(b.capital) - parseCapitalToNumber(a.capital))
  , [members]);

  // 成员筛选
  const filteredMembers = useMemo(() => {
    switch (memberFilter) {
      case 'local': return members.filter(m => m.region === 'local');
      case 'outside': return members.filter(m => m.region !== 'local');
      default: return members;
    }
  }, [members, memberFilter]);

  // 成员统计
  const memberCounts = useMemo(() => {
    let local = 0;
    let outside = 0;
    members.forEach(m => {
      if (m.region === 'local') local++;
      else outside++;
    });
    return { all: members.length, local, outside };
  }, [members]);

  // 渗透率状态
  const getPenetrationStatus = (rate) => {
    if (rate < 10) return { color: '#ef4444', tagColor: 'error', label: '高潜能攻坚' };
    if (rate < 25) return { color: '#f97316', tagColor: 'warning', label: '重点扩容' };
    return { color: '#3b82f6', tagColor: 'processing', label: '稳健护盘' };
  };

  return {
    loading,
    setLoading,
    memberFilter,
    setMemberFilter,
    clanInfo,
    members,
    penetrationRate,
    industryGapData,
    investmentTrendData,
    cityFlowData,
    cashCowList,
    newProjectList,
    filteredMembers,
    memberCounts,
    getPenetrationStatus,
    modelData,
    modelStats,
  };
};

export default useCapitalGenealogyDetail;
