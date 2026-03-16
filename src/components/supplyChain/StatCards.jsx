import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

/**
 * 统计概览卡片
 * 样式与产业供应链洞察的统计卡片保持一致
 */
const StatCards = ({ stats }) => {
  // 格式化金额 - 统一使用亿为单位
  const formatAmount = (amount) => {
    if (!amount || amount === 0) return 0;
    return (amount / 10000).toFixed(1);
  };

  return (
    <Row gutter={[12, 12]} className="mb-4">
      <Col flex="1">
        <Card size="small">
          <Statistic
            title="企业总数"
            value={stats.totalCount || 0}
            suffix="家"
          />
        </Card>
      </Col>
      <Col flex="1">
        <Card size="small">
          <Statistic
            title="开票总额"
            value={formatAmount(stats.totalInvoiceAmount)}
            suffix="亿"
          />
        </Card>
      </Col>
      <Col flex="1">
        <Card size="small">
          <Statistic
            title="采购总额"
            value={formatAmount(stats.totalPurchase)}
            suffix="亿"
          />
        </Card>
      </Col>
      <Col flex="1">
        <Card size="small">
          <Statistic
            title="销售总额"
            value={formatAmount(stats.totalSales)}
            suffix="亿"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatCards;
