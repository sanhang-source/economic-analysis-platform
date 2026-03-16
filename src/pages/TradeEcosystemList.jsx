import React, { useState, useMemo } from 'react';
import { Typography, Card, Collapse, Empty } from 'antd';
import { useSearchParams } from 'react-router-dom';
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

const { Title, Text } = Typography;
const { Panel } = Collapse;

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
  const industryName = searchParams.get('industry');
  
  // 洞察面板折叠状态
  const [insightsExpanded, setInsightsExpanded] = useState(!!industryName);

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
    
    const industry = allIndustries642.find(item => item.name === industryName);
    if (!industry) return null;

    return {
      supplement: chainSupplementData[industry.id] || [],
      strengthen: chainStrengthenData[industry.id] || [],
      topProducts: topProductsByIndustry[industry.id] || [],
      stats: {
        enterpriseCount: industry.enterpriseCount,
        totalAmount: industry.totalSales + industry.totalPurchase,
        localSupportRatio: industry.localSupportRatio,
      },
    };
  }, [industryName]);

  // 页面标题
  const pageTitle = industryName 
    ? `${industryName} - 产业供应链工作台` 
    : '产业供应链工作台';

  return (
    <div className="-m-4 p-4 bg-gray-50 min-h-full">
      {/* 页面标题 */}
      <div className="mb-4">
        <Title level={4} className="!mb-0">{pageTitle}</Title>
        <Text type="secondary">
          {industryName 
            ? `基于发票数据分析，展示${industryName}的供应链生态与补链强链机会`
            : '基于发票数据分析，展示产业供应链生态与核心企业清单'
          }
        </Text>
      </div>

      {/* 上半部分：产业供应链洞察（可折叠） */}
      {industryName && insightsData && (
        <Collapse
          activeKey={insightsExpanded ? ['insights'] : []}
          onChange={(keys) => setInsightsExpanded(keys.includes('insights'))}
          className="mb-4"
          ghost
        >
          <Panel 
            header="产业供应链洞察" 
            key="insights"
            className="bg-white rounded-lg"
          >
            <IndustryInsightsPanel
              industryName={industryName}
              insightsData={insightsData}
            />
          </Panel>
        </Collapse>
      )}

      {/* 下半部分：核心企业清单 */}
      <Card 
        title="产业核心企业清单" 
        variant="borderless"
        className="mb-4"
      >
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
