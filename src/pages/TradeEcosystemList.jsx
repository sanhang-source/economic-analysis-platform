import React, { useMemo } from 'react';
import { Card, Button } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons';
import { useSupplyChainList } from '../hooks/useSupplyChainList';

// 子组件
import FilterBar from '../components/supplyChain/FilterBar';
import StatCards from '../components/supplyChain/StatCards';
import EnterpriseTable from '../components/supplyChain/EnterpriseTable';
import IndustryInsightsPanel from '../components/industry642/IndustryInsightsPanel';

// Mock数据
import {
  chainSupplementData,
  chainStrengthenData,
  topProductsByIndustry,
  allIndustries642,
} from '../mock/industry642Mock';

/**
 * TradeEcosystemList - 产业供应链工作台（重构）
 *
 * 路由：/industry/trade?industry=[产业名]
 *
 * UI布局：上下分层结构
 * - 上半部分：产业供应链洞察（可折叠）
 * - 下半部分：核心企业清单
 */
const TradeEcosystemList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const industryName = searchParams.get('industry');

  const {
    data,
    overviewStats,
    filterOptions,
    filters,
    pagination,
    loading,
    handleFilterChange,
    handlePageChange,
    handleReset,
    handleExport,
  } = useSupplyChainList();

  // 根据产业名称获取洞察数据
  const insightsData = useMemo(() => {
    if (!industryName) return null;

    const industry = allIndustries642.find((item) => item.name === industryName);
    if (!industry) return null;

    return {
      supplement: chainSupplementData[industry.id] || [],
      strengthen: chainStrengthenData[industry.id] || [],
      topProducts: topProductsByIndustry[industry.id] || [],
      stats: {
        enterpriseCount: industry.enterpriseCount,
        totalSales: industry.totalSales,
        totalPurchase: industry.totalPurchase,
        localSalesRatio: industry.localSalesRatio,
        localSupportRatio: industry.localSupportRatio,
      },
    };
  }, [industryName]);

  // 返回供应链生态页面
  const handleBackToOverview = () => {
    navigate('/industry/642-nav');
  };

  return (
    <div className="-m-4 min-h-full bg-gray-50 p-4">
      {/* 返回按钮 */}
      <div className="mb-4">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBackToOverview}>
          返回产业大盘
        </Button>
      </div>

      {/* 上半部分：产业供应链洞察 */}
      {industryName && insightsData && (
        <IndustryInsightsPanel industryName={industryName} insightsData={insightsData} />
      )}

      {/* 下半部分：核心企业清单 */}
      <Card
        title={
          <div className="flex items-center justify-between">
            <span>产业核心企业清单{industryName ? `-${industryName}` : ''}</span>
            <Button icon={<ExportOutlined />} onClick={handleExport}>
              导出
            </Button>
          </div>
        }
        variant="borderless"
        className="mb-4"
      >
        {/* 统计卡片 */}
        <StatCards stats={overviewStats} />

        {/* 筛选栏 */}
        <FilterBar
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          loading={loading}
        />

        {/* 企业列表 */}
        <Card variant="borderless" className="mt-4">
          <EnterpriseTable
            data={data}
            pagination={pagination}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </Card>
      </Card>
    </div>
  );
};

export default TradeEcosystemList;
