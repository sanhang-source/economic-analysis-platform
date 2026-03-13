import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { allClanList, memberCompaniesData, parseCapitalToNumber } from '../mock/capitalGenealogyMock';

const THREE_YEARS_AGO = dayjs().subtract(3, 'years');

const LEVEL_FILTER = ['core', 'first', 'second'];

export const useCapitalGenealogyDetail = (clanId) => {
  const [loading, setLoading] = useState(false);
  const [memberFilter, setMemberFilter] = useState('all');

  const clanInfo = useMemo(() => allClanList.find(c => c.id === clanId), [clanId]);

  const members = useMemo(() => memberCompaniesData[clanId] || [], [clanId]);

  const penetrationRate = useMemo(() => {
    if (!clanInfo?.qianhaiRevenue || !clanInfo?.groupTotalRevenue) return 0;
    return (clanInfo.qianhaiRevenue / clanInfo.groupTotalRevenue) * 100;
  }, [clanInfo]);

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
    getPenetrationStatus
  };
};

export default useCapitalGenealogyDetail;
