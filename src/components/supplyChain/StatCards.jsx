import React from 'react';
import { Card, Row, Col } from 'antd';
import {
  TrophyOutlined,
  DollarOutlined,
} from '@ant-design/icons';

/**
 * 统计概览卡片
 */
const StatCards = ({ stats }) => {
  // 格式化金额 - 返回数值和单位分开
  const formatAmountValue = (amount) => {
    if (amount >= 10000) {
      return {
        value: (amount / 10000).toFixed(2),
        suffix: '亿元',
      };
    }
    return {
      value: amount.toLocaleString(),
      suffix: '万元',
    };
  };

  const invoiceData = formatAmountValue(stats.totalInvoiceAmount);
  const salesData = formatAmountValue(stats.totalSales || 0);
  const purchaseData = formatAmountValue(stats.totalPurchase || 0);

  const cards = [
    {
      title: '企业总数',
      value: stats.totalCount,
      suffix: '家',
      icon: <TrophyOutlined />,
      color: '#1677ff',
    },
    {
      title: '开票总额',
      value: invoiceData.value,
      suffix: invoiceData.suffix,
      icon: <DollarOutlined />,
      color: '#52c41a',
    },
    {
      title: '销售总额',
      value: salesData.value,
      suffix: salesData.suffix,
      icon: <DollarOutlined />,
      color: '#722ed1',
    },
    {
      title: '采购总额',
      value: purchaseData.value,
      suffix: purchaseData.suffix,
      icon: <DollarOutlined />,
      color: '#fa8c16',
    },
  ];

  return (
    <Row gutter={[16, 16]} className="mb-4">
      {cards.map((card, index) => (
        <Col span={6} key={index}>
          <Card variant="borderless" styles={{ body: { padding: 16 } }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm mb-1">{card.title}</div>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </span>
                  <span className="text-gray-500 text-sm">{card.suffix}</span>
                </div>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                style={{ backgroundColor: `${card.color}15`, color: card.color }}
              >
                {card.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatCards;
