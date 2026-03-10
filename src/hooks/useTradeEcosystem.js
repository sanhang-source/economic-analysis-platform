import { useState, useMemo } from 'react';
import {
  companyInfo,
  invoiceStats,
  monthlyTrend,
  topSuppliers,
  topCustomers,
  regionDistribution,
  topProducts,
  riskAlerts as mockRiskAlerts,
  dataUpdateTime,
} from '../mock/tradeEcosystemMock';
import {
  calculateConcentrationRatio,
  calculateLocalRatio,
  calculateGrossMargin,
  calculateHealthScore,
  analyzeRisks,
} from '../utils/tradeCalculations';

/**
 * 交易生态页面业务逻辑 Hook
 */
export const useTradeEcosystem = () => {
  const [activeTab, setActiveTab] = useState('supplier'); // supplier | customer | region | product
  const [timeRange, setTimeRange] = useState('12months'); // 12months | 6months | 3months
  const [loading, setLoading] = useState(false);

  // 计算总销售额和采购额
  const totalSales = useMemo(() => {
    return topCustomers.reduce((sum, c) => sum + c.amount, 0);
  }, []);

  const totalPurchase = useMemo(() => {
    return topSuppliers.reduce((sum, s) => sum + s.amount, 0);
  }, []);

  // 客户集中度 CR5
  const customerCR5 = useMemo(() => {
    return calculateConcentrationRatio(topCustomers, totalSales, 5);
  }, [topCustomers, totalSales]);

  // 供应商集中度 CR5
  const supplierCR5 = useMemo(() => {
    return calculateConcentrationRatio(topSuppliers, totalPurchase, 5);
  }, [topSuppliers, totalPurchase]);

  // 本地配套率
  const localSalesRatio = useMemo(() => {
    return calculateLocalRatio(topCustomers, totalSales);
  }, [topCustomers, totalSales]);

  const localPurchaseRatio = useMemo(() => {
    return calculateLocalRatio(topSuppliers, totalPurchase);
  }, [topSuppliers, totalPurchase]);

  // 毛利率
  const grossMargin = useMemo(() => {
    return calculateGrossMargin(totalSales, totalPurchase);
  }, [totalSales, totalPurchase]);

  // 区域集中度
  const topRegion = useMemo(() => {
    const sorted = [...regionDistribution].sort((a, b) => b.value - a.value);
    return sorted[0];
  }, []);

  // 商品集中度
  const topProductRatio = useMemo(() => {
    const top1 = topProducts[0];
    const total = topProducts.reduce((sum, p) => sum + p.amount, 0);
    return {
      name: top1.name,
      ratio: top1.amount / total,
    };
  }, []);

  // 健康度评分
  const healthScore = useMemo(() => {
    return calculateHealthScore({
      customerCR5: customerCR5.ratio,
      supplierCR5: supplierCR5.ratio,
      grossMargin: grossMargin.margin,
      localSalesRatio: localSalesRatio.ratio,
      localPurchaseRatio: localPurchaseRatio.ratio,
    });
  }, [customerCR5, supplierCR5, grossMargin, localSalesRatio, localPurchaseRatio]);

  // 风险分析
  const risks = useMemo(() => {
    const calculatedRisks = analyzeRisks({
      customerCR5: customerCR5.ratio,
      supplierCR5: supplierCR5.ratio,
      grossMargin: grossMargin.margin,
      topRegionRatio: topRegion.value / 100,
      topRegionName: topRegion.name,
    });
    return [...calculatedRisks, ...mockRiskAlerts.filter(r => !calculatedRisks.find(cr => cr.type === r.type))];
  }, [customerCR5, supplierCR5, grossMargin, topRegion]);

  // 根据时间范围过滤月度数据
  const filteredMonthlyData = useMemo(() => {
    const months = {
      '3months': 3,
      '6months': 6,
      '12months': 12,
    }[timeRange] || 12;
    return monthlyTrend.slice(-months);
  }, [timeRange]);

  // 核心指标
  const metrics = useMemo(() => ({
    totalSales,
    totalPurchase,
    grossProfit: grossMargin.profit,
    grossMargin: grossMargin.margin,
    customerCount: invoiceStats.downstreamCount,
    supplierCount: invoiceStats.upstreamCount,
    customerCR5: customerCR5.ratio,
    supplierCR5: supplierCR5.ratio,
    localSalesRatio: localSalesRatio.ratio,
    localPurchaseRatio: localPurchaseRatio.ratio,
    healthScore,
  }), [totalSales, totalPurchase, grossMargin, customerCR5, supplierCR5, localSalesRatio, localPurchaseRatio, healthScore]);

  return {
    // 状态
    activeTab,
    setActiveTab,
    timeRange,
    setTimeRange,
    loading,
    setLoading,

    // 原始数据
    companyInfo,
    invoiceStats,
    monthlyTrend: filteredMonthlyData,
    topSuppliers,
    topCustomers,
    regionDistribution,
    topProducts,
    dataUpdateTime,

    // 计算指标
    metrics,
    risks,
  };
};

export default useTradeEcosystem;
