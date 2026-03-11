import React from 'react';
import { Typography, Card } from 'antd';
import { useSupplyChainList } from '../hooks/useSupplyChainList';

// 子组件
import FilterBar from '../components/supplyChain/FilterBar';
import StatCards from '../components/supplyChain/StatCards';
import EnterpriseTable from '../components/supplyChain/EnterpriseTable';

const { Title, Text } = Typography;

/**
 * TradeEcosystemList - 供应链分析列表页
 * 
 * 展示深圳市交易额TOP20企业列表
 */
const TradeEcosystemList = () => {
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

  return (
    <div className="-m-4 p-4 bg-gray-50 min-h-full">
      {/* 页面标题 */}
      <div className="mb-4">
        <Title level={4} className="!mb-0">供应链分析</Title>
        <Text type="secondary">
          基于发票数据分析，展示企业交易活跃度与供应链生态
        </Text>
      </div>

      {/* 筛选栏 */}
      <FilterBar
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        onExport={handleExport}
        loading={loading}
      />

      {/* 统计卡片 */}
      <StatCards stats={overviewStats} />

      {/* 企业列表 */}
      <Card variant="borderless">
        <EnterpriseTable
          data={data}
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default TradeEcosystemList;
