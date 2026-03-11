import React from 'react';
import { Card } from 'antd';

/**
 * 核心指标概览（全宽布局）
 * 使用flex布局实现均匀分布
 */
const MetricOverview = ({ metrics, invoiceStats }) => {
  const metricCards = [
    {
      title: '本年度累计开票金额',
      value: (invoiceStats.annualAmount / 10000).toFixed(2),
      suffix: '亿元',
      color: '#1677ff',
    },
    {
      title: '本年度累计开票数量',
      value: invoiceStats.annualCount.toLocaleString(),
      suffix: '张',
      color: '#52c41a',
    },
    {
      title: '总销售额',
      value: (metrics.totalSales / 10000).toFixed(2),
      suffix: '亿元',
      color: '#722ed1',
    },
    {
      title: '总采购额',
      value: (metrics.totalPurchase / 10000).toFixed(2),
      suffix: '亿元',
      color: '#fa8c16',
    },
    {
      title: '毛利率估算',
      value: (metrics.grossMargin * 100).toFixed(1),
      suffix: '%',
      color: '#13c2c2',
    },
    {
      title: '客户数量',
      value: metrics.customerCount,
      suffix: '家',
      color: '#722ed1',
    },
    {
      title: '供应商数量',
      value: metrics.supplierCount,
      suffix: '家',
      color: '#fa8c16',
    },
  ];

  return (
    <Card variant="borderless" styles={{ body: { padding: 16 } }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {metricCards.map((card, index) => (
          <div key={index} style={{ textAlign: 'center', flex: 1 }}>
            <div className="text-gray-500 text-sm mb-1">{card.title}</div>
            <div className="flex items-baseline justify-center gap-1">
              <span 
                className="text-2xl font-bold"
                style={{ color: card.color }}
              >
                {card.value}
              </span>
              <span className="text-gray-500 text-sm">{card.suffix}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MetricOverview;
