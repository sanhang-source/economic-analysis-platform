import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
} from '@ant-design/icons';

/**
 * 核心指标概览（全宽布局）
 */
const MetricOverview = ({ metrics, invoiceStats }) => {
  // 格式化金额
  const formatAmount = (amount) => {
    if (amount >= 10000) {
      return (amount / 10000).toFixed(2) + '亿';
    }
    return amount.toLocaleString() + '万';
  };

  const metricCards = [
    {
      title: '本年度累计开票金额',
      value: formatAmount(invoiceStats.annualAmount),
      suffix: '',
      growth: invoiceStats.annualAmountGrowth,
      color: '#1677ff',
    },
    {
      title: '本年度累计开票数量',
      value: invoiceStats.annualCount.toLocaleString(),
      suffix: '张',
      growth: invoiceStats.annualCountGrowth,
      color: '#52c41a',
    },
    {
      title: '总销售额',
      value: formatAmount(metrics.totalSales),
      suffix: '',
      subTitle: `客户数 ${metrics.customerCount}家`,
      color: '#722ed1',
    },
    {
      title: '总采购额',
      value: formatAmount(metrics.totalPurchase),
      suffix: '',
      subTitle: `供应商数 ${metrics.supplierCount}家`,
      color: '#fa8c16',
    },
    {
      title: '毛利率估算',
      value: (metrics.grossMargin * 100).toFixed(1),
      suffix: '%',
      subTitle: `毛利 ${formatAmount(metrics.grossProfit)}`,
      color: '#13c2c2',
    },
    {
      title: '供应链健康度',
      value: metrics.healthScore,
      suffix: '分',
      color: metrics.healthScore >= 80 ? '#52c41a' : metrics.healthScore >= 60 ? '#faad14' : '#f5222d',
    },
  ];

  return (
    <Card bordered={false} bodyStyle={{ padding: 16 }}>
      <Row gutter={[16, 16]}>
        {metricCards.map((card, index) => (
          <Col span={4} key={index}>
            <div>
              <div className="text-gray-500 text-sm mb-1">{card.title}</div>
              <div className="flex items-baseline gap-1">
                <span 
                  className="text-2xl font-bold"
                  style={{ color: card.color }}
                >
                  {card.value}
                </span>
                {card.suffix && (
                  <span className="text-gray-500 text-sm">{card.suffix}</span>
                )}
              </div>
              
              {card.growth && (
                <div className="mt-1">
                  <span className={`text-xs ${card.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {card.growth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    同比 {Math.abs(card.growth)}%
                  </span>
                </div>
              )}
              
              {card.subTitle && (
                <div className="mt-1 text-xs text-gray-400">
                  {card.subTitle}
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default MetricOverview;
