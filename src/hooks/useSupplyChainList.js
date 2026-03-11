import { useState, useMemo, useCallback } from 'react';
import { message } from 'antd';
import {
  topEnterprises,
  filterOptions,
  getOverviewStats,
} from '../mock/supplyChainMock';

/**
 * 供应链分析列表页 Hook
 */
export const useSupplyChainList = () => {
  // 筛选状态
  const [filters, setFilters] = useState({
    timeRange: 'year',
    industry: 'all',
    district: 'all',
    enterpriseType: 'all',
    riskLevel: 'all',
    searchKeyword: '',
  });

  // 分页状态
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: topEnterprises.length,
  });

  // 加载状态
  const [loading, setLoading] = useState(false);

  // 筛选逻辑
  const filteredData = useMemo(() => {
    let result = [...topEnterprises];

    // 行业筛选
    if (filters.industry !== 'all') {
      result = result.filter(e => e.industry === filters.industry);
    }

    // 区域筛选
    if (filters.district !== 'all') {
      result = result.filter(e => e.district === filters.district);
    }

    // 企业类型筛选
    if (filters.enterpriseType !== 'all') {
      result = result.filter(e => e.tags.includes(filters.enterpriseType));
    }

    // 风险等级筛选
    if (filters.riskLevel !== 'all') {
      result = result.filter(e => e.riskLevel === filters.riskLevel);
    }

    // 搜索关键词
    if (filters.searchKeyword) {
      const keyword = filters.searchKeyword.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(keyword) ||
        e.industry.toLowerCase().includes(keyword)
      );
    }

    // 按年开票额倒序排序（默认）
    result.sort((a, b) => b.annualInvoiceAmount - a.annualInvoiceAmount);

    // 重新计算排名
    result = result.map((item, index) => ({
      ...item,
      displayRank: index + 1,
    }));

    return result;
  }, [filters]);

  // 分页数据
  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, pagination]);

  // 统计概览
  const overviewStats = useMemo(() => {
    return getOverviewStats(filteredData);
  }, [filteredData]);

  // 处理筛选变化
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 })); // 重置到第一页
  }, []);

  // 处理分页变化
  const handlePageChange = useCallback((page, pageSize) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }));
  }, []);

  // 重置筛选
  const handleReset = useCallback(() => {
    setFilters({
      timeRange: 'year',
      industry: 'all',
      district: 'all',
      enterpriseType: 'all',
      riskLevel: 'all',
      searchKeyword: '',
    });
    setPagination(prev => ({ ...prev, current: 1 }));
  }, []);

  // 导出数据
  const handleExport = useCallback(() => {
    setLoading(true);
    // 模拟导出
    setTimeout(() => {
      const exportData = filteredData.map(e => ({
        排名: e.displayRank,
        企业名称: e.name,
        行业: e.industry,
        区域: e.district,
        年开票额: e.annualInvoiceAmount,
        年销售额: e.annualSales,
        年采购额: e.annualPurchase,
        本地配套率: (e.localRatio * 100).toFixed(1) + '%',
        毛利率: (e.grossMargin * 100).toFixed(1) + '%',
        健康度: e.healthScore,
        风险等级: e.riskLevel === 'high' ? '高风险' : e.riskLevel === 'medium' ? '中风险' : '低风险',
      }));
      
      // 转换为 CSV
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => headers.map(h => row[h]).join(',')),
      ].join('\n');
      
      // 下载
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `供应链分析企业榜_${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      
      setLoading(false);
      message.success(`已导出 ${exportData.length} 家企业数据`);
    }, 500);
  }, [filteredData]);

  return {
    // 数据
    data: paginatedData,
    allData: filteredData,
    overviewStats,
    filterOptions,
    
    // 状态
    filters,
    pagination: {
      ...pagination,
      total: filteredData.length,
    },
    loading,
    
    // 方法
    handleFilterChange,
    handlePageChange,
    handleReset,
    handleExport,
  };
};

export default useSupplyChainList;
