import React from 'react';
import { Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useTradeEcosystem } from '../hooks/useTradeEcosystem';

// 子组件
import CompanyProfileCard from '../components/tradeEcosystem/CompanyProfileCard';
import MetricOverview from '../components/tradeEcosystem/MetricOverview';
import RiskMetricsPanel from '../components/tradeEcosystem/RiskMetricsPanel';
import SupplierChart from '../components/tradeEcosystem/SupplierChart';
import CustomerChart from '../components/tradeEcosystem/CustomerChart';
import TrendChart from '../components/tradeEcosystem/TrendChart';
import RegionDistribution from '../components/tradeEcosystem/RegionDistribution';
import ProductAnalysis from '../components/tradeEcosystem/ProductAnalysis';

/**
 * TradeEcosystem - 供应链分析详情页
 * 
 * 展示单个企业的供应链生态详情
 */
const TradeEcosystem = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 获取企业ID
  
  const {
    companyInfo,
    invoiceStats,
    monthlyTrend,
    topSuppliers,
    topCustomers,
    regionDistribution,
    topProducts,
    metrics,
    dataUpdateTime,
  } = useTradeEcosystem();

  return (
    <div className="-m-4 p-4 bg-gray-50 min-h-full space-y-4">
      {/* 返回列表按钮 */}
      <div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/industry/trade')}
        >
          返回列表
        </Button>
      </div>

      {/* 1. 企业基本信息 */}
      <CompanyProfileCard 
        companyInfo={companyInfo} 
        invoiceStats={invoiceStats}
        dataUpdateTime={dataUpdateTime}
      />

      {/* 2. 数据概览卡片 */}
      <MetricOverview metrics={metrics} invoiceStats={invoiceStats} />

      {/* 3. 风险洞察指标 */}
      <RiskMetricsPanel metrics={metrics} />

      {/* 4. 月度交易趋势 */}
      <TrendChart monthlyTrend={monthlyTrend} />

      {/* 5. 十大客户 | 十大供应商 */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <CustomerChart 
            topCustomers={topCustomers} 
            localSalesRatio={metrics.localSalesRatio}
          />
        </Col>
        <Col span={12}>
          <SupplierChart 
            topSuppliers={topSuppliers} 
            localPurchaseRatio={metrics.localPurchaseRatio}
          />
        </Col>
      </Row>

      {/* 6. 地区分布 | 商品分析 */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <RegionDistribution regionDistribution={regionDistribution} />
        </Col>
        <Col span={12}>
          <ProductAnalysis topProducts={topProducts} />
        </Col>
      </Row>
    </div>
  );
};

export default TradeEcosystem;
