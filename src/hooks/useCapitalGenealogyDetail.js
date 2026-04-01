import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { allClanList, memberCompaniesData, parseCapitalToNumber } from '../mock/capitalGenealogyMock';

const THREE_YEARS_AGO = dayjs().subtract(3, 'years');

const LEVEL_FILTER = ['core', 'first', 'second'];

// 前海三大支柱产业
const PILLAR_INDUSTRIES = ['金融', '现代物流', '科技服务', '互联网', '软件', '信息技术', '人工智能'];

// 战略新兴产业
const EMERGING_INDUSTRIES = ['人工智能', '新能源', '低空经济', 'AI', '新能源汽车', '生物医药', '半导体', '芯片'];

// 制造业相关产业
const MANUFACTURING_INDUSTRIES = ['制造业', '能源', '重工', '电气机械', '汽车制造', '装备制造', '金属制品'];

// 计算产业聚集度评分 (0-100)
const calcIndustryScore = (industry) => {
  if (PILLAR_INDUSTRIES.includes(industry)) return 90 + Math.floor(Math.random() * 10);
  if ([...MANUFACTURING_INDUSTRIES, ...EMERGING_INDUSTRIES].includes(industry)) return 70 + Math.floor(Math.random() * 15);
  return 40 + Math.floor(Math.random() * 20);
};

// 计算集团紧密度评分 (0-100)
const calcClosenessScore = (level, groupPenetrationRate) => {
  // 地位分：core=40, first=30, second=20, associate=10
  const levelScore = { core: 40, first: 30, second: 20, associate: 10 }[level] || 10;
  // 熟客分：渗透率越高分越高 (0-60分)
  const penetrationScore = Math.min(Math.round(groupPenetrationRate * 1.5), 60);
  return Math.min(levelScore + penetrationScore, 100);
};

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

  // 模型1：产贸分离机会
  // 筛选条件：异地 + 核心层级(1/2级) + 营收>1亿 + 制造业/能源/重工 + 集团前海无商贸子公司
  const model1Data = useMemo(() => {
    // 检查集团在前海是否有商贸类子公司（简化：检查是否有"商贸""贸易"类企业）
    const hasQianhaiTrading = members.some(m => 
      m.region === 'local' && 
      (m.industry.includes('批发') || m.industry.includes('贸易') || m.industry.includes('零售'))
    );
    
    if (hasQianhaiTrading) return []; // 已有商贸子公司则不显示
    
    return membersWithScore
      .filter(m => 
        m.region !== 'local' &&
        ['first', 'second'].includes(m.level) &&
        (m.revenue || 0) >= 1 &&
        MANUFACTURING_INDUSTRIES.some(ind => m.industry.includes(ind) || ind.includes(m.industry))
      )
      .sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
  }, [membersWithScore]);

  // 模型2：新兴产业功能总部引入
  // 筛选条件：异地 + 核心层级(1/2级) + 近3年新成立 + 注资>5000万 + 战略新兴产业
  const model2Data = useMemo(() => {
    return membersWithScore
      .filter(m => {
        const foundedDate = dayjs(m.foundedDate);
        const capitalNum = parseCapitalToNumber(m.capital);
        return (
          m.region !== 'local' &&
          ['first', 'second'].includes(m.level) &&
          foundedDate.isAfter(THREE_YEARS_AGO) &&
          capitalNum >= 5000 &&
          EMERGING_INDUSTRIES.some(ind => m.industry.includes(ind) || ind.includes(m.industry))
        );
      })
      .sort((a, b) => parseCapitalToNumber(b.capital) - parseCapitalToNumber(a.capital));
  }, [membersWithScore]);

  // 模型3：跨区域制造产值统筹与结算归集
  // 筛选条件：前海有实体制造(>5000万) + 异地有同类核心子公司(>5000万)
  const model3Data = useMemo(() => {
    // 检查前海是否有制造业且营收>5000万
    const hasQianhaiManufacturing = members.some(m =>
      m.region === 'local' &&
      (m.revenue || 0) >= 0.5 &&
      MANUFACTURING_INDUSTRIES.some(ind => m.industry.includes(ind) || ind.includes(m.industry))
    );
    
    if (!hasQianhaiManufacturing) return [];
    
    // 返回异地的同类制造业企业
    return membersWithScore
      .filter(m =>
        m.region !== 'local' &&
        ['first', 'second'].includes(m.level) &&
        (m.revenue || 0) >= 0.5 &&
        MANUFACTURING_INDUSTRIES.some(ind => m.industry.includes(ind) || ind.includes(m.industry))
      )
      .sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
  }, [membersWithScore, members]);

  // 模型4：大型实体集团供应链金融中心引入
  // 筛选条件：千亿级/百亿级大集团 + 成员>50家 + 前海无金融类子公司
  const model4Data = useMemo(() => {
    // 简化：成员数>30家视为大型集团
    const isLargeGroup = members.length > 30;
    
    // 检查前海是否已有金融类子公司
    const hasQianhaiFinance = members.some(m =>
      m.region === 'local' &&
      (m.industry.includes('金融') || m.industry.includes('保险') || m.industry.includes('融资'))
    );
    
    if (!isLargeGroup || hasQianhaiFinance) return [];
    
    // 返回集团本身作为目标客户
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
      isModel4Target: true, // 标记为模型4特殊目标
    }];
  }, [membersWithScore, members, clanInfo, penetrationRate, clanId]);

  // 4个模型的统计数据（用于雷达图）
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

  // 原有数据（保留用于现有图表）
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

  const investmentTrendData = useMemo(() => {
    const newCompanies = members.filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        LEVEL_FILTER.includes(m.level) &&
        capitalNum >= 5000
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

  const cityFlowData = useMemo(() => {
    const outsideNewCompanies = members.filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        LEVEL_FILTER.includes(m.level) &&
        capitalNum >= 5000 &&
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

  // 保留原有cashCowList和newProjectList用于兼容性
  const cashCowList = useMemo(() => 
    members
      .filter(m => 
        m.region !== 'local' &&
        LEVEL_FILTER.includes(m.level) &&
        (m.revenue || 0) >= 1
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
          capitalNum >= 5000
        );
      })
      .sort((a, b) => parseCapitalToNumber(b.capital) - parseCapitalToNumber(a.capital))
  , [members]);

  const filteredMembers = useMemo(() => {
    switch (memberFilter) {
      case 'local': return members.filter(m => m.region === 'local');
      case 'outside': return members.filter(m => m.region !== 'local');
      default: return members;
    }
  }, [members, memberFilter]);

  const memberCounts = useMemo(() => ({
    all: members.length,
    local: members.filter(m => m.region === 'local').length,
    outside: members.filter(m => m.region !== 'local').length
  }), [members]);

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
    // 新增
    modelData,
    modelStats,
  };
};

export default useCapitalGenealogyDetail;
