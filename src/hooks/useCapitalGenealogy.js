import { useState, useEffect, useMemo } from 'react';
import { message } from 'antd';
import {
  groupList,
  listedList,
  top500List,
  memberCompaniesData,
  regionOptions,
  defaultMembers,
} from '../mock/capitalGenealogyMock';

/**
 * 企业族群页面业务逻辑Hook
 */
export const useCapitalGenealogy = () => {
  const [selectedClan, setSelectedClan] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [region, setRegion] = useState('全市');
  const [category, setCategory] = useState('group');
  const [loading, setLoading] = useState(false);
  const [currentMembers, setCurrentMembers] = useState(defaultMembers);

  // 根据分类获取列表
  const clanList = useMemo(() => {
    switch (category) {
      case 'listed': return listedList;
      case 'top500': return top500List;
      default: return groupList;
    }
  }, [category]);

  // 所有企业列表（用于查找当前选中的企业，不受分类切换影响）
  const allClans = useMemo(() => {
    return [...groupList, ...listedList, ...top500List];
  }, []);

  // 当前选中的系族（从所有企业中查找，不受分类切换影响）
  const currentClan = useMemo(() => {
    return allClans.find(c => c.id === selectedClan) || allClans[0];
  }, [selectedClan, allClans]);

  // 搜索过滤
  const filteredClanList = useMemo(() => {
    if (!searchValue) return clanList;
    return clanList.filter(c => 
      c.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      c.coreCompany.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, clanList]);

  // 统计深圳/外地企业数量及行业分布
  const regionStats = useMemo(() => {
    const localMembers = currentMembers.filter(m => m.region === 'local');
    const outsideMembers = currentMembers.filter(m => m.region === 'outside');
    const localCount = localMembers.length;
    const outsideCount = outsideMembers.length;
    
    // 深圳企业行业分布统计
    const localIndustryMap = {};
    localMembers.forEach(m => {
      if (m.industry) {
        localIndustryMap[m.industry] = (localIndustryMap[m.industry] || 0) + 1;
      }
    });
    
    // 外地企业行业分布统计
    const outsideIndustryMap = {};
    outsideMembers.forEach(m => {
      if (m.industry) {
        outsideIndustryMap[m.industry] = (outsideIndustryMap[m.industry] || 0) + 1;
      }
    });
    
    // 按数量排序
    const localIndustries = Object.entries(localIndustryMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
    
    const outsideIndustries = Object.entries(outsideIndustryMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
    
    return { localCount, outsideCount, localIndustries, outsideIndustries };
  }, [currentMembers]);

  // 模拟数据加载
  useEffect(() => {
    if (selectedClan) {
      setLoading(true);
      // 模拟API延迟
      const timer = setTimeout(() => {
        setCurrentMembers(memberCompaniesData[selectedClan] || defaultMembers);
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedClan]);

  // 初始化选中第一个
  useEffect(() => {
    if (!selectedClan && clanList.length > 0) {
      setSelectedClan(clanList[0].id);
    }
  }, []);

  // 导出企业名单
  const handleExport = (dataToExport) => {
    const exportData = dataToExport || currentMembers;
    
    // 构建CSV内容
    const headers = ['企业名称', '成员级别', '行业', '注册资本', '成立日期', '地区', '地址'];
    const rows = exportData.map(item => [
      item.name,
      item.level === 'core' ? '0级' : 
        item.level === 'first' ? '1级' : 
        item.level === 'second' ? '2级' : '参股',
      item.industry || '-',
      item.capital,
      item.foundedDate || '-',
      item.region === 'local' ? '本地' : '外地',
      item.address || '-',
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    // 下载文件
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${currentClan?.name}_企业名单_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    
    message.success(`已导出 ${exportData.length} 家企业`);
  };

  // 加入招商库
  const handleAddToInvestment = (enterprises) => {
    if (enterprises.length === 0) {
      message.warning('请先选择企业');
      return;
    }
    message.success(`已将 ${enterprises.length} 家企业加入招商库`);
  };

  // 加入关注库
  const handleAddToWatchlist = (enterprises) => {
    if (enterprises.length === 0) {
      message.warning('请先选择企业');
      return;
    }
    message.success(`已将 ${enterprises.length} 家企业加入关注库`);
  };

  return {
    // 状态
    selectedClan,
    setSelectedClan,
    searchValue,
    setSearchValue,
    region,
    setRegion,
    category,
    setCategory,
    loading,
    currentMembers,
    
    // 数据
    clanList,
    currentClan,
    filteredClanList,
    regionStats,
    regionOptions,
    
    // 方法
    handleExport,
    handleAddToInvestment,
    handleAddToWatchlist,
  };
};

export default useCapitalGenealogy;
