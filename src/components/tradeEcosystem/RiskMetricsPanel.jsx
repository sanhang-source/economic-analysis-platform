import React from 'react';
import { Card, Progress, Row, Col, Tooltip } from 'antd';
import { 
  SafetyOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  PercentageOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

/**
 * 风险洞察指标面板（仅展示指标数据，不展示风险预警）
 */
const RiskMetricsPanel = ({ metrics }) => {
  const metricItems = [
    {
      title: '供应链健康度',
      value: metrics.healthScore,
      suffix: '分',
      icon: <SafetyOutlined />,
      color: metrics.healthScore >= 80 ? '#52c41a' : metrics.healthScore >= 60 ? '#faad14' : '#f5222d',
      progress: true,
      tooltip: '综合客户集中度、供应商集中度、毛利率、本地配套率等指标计算得出',
    },
    {
      title: '客户集中度(CR5)',
      value: (metrics.customerCR5 * 100).toFixed(1),
      suffix: '%',
      icon: <TeamOutlined />,
      color: metrics.customerCR5 > 0.5 ? '#f5222d' : metrics.customerCR5 > 0.4 ? '#faad14' : '#52c41a',
      progress: true,

      tooltip: '前5大客户销售额占总销售额的比例',
    },
    {
      title: '供应商集中度(CR5)',
      value: (metrics.supplierCR5 * 100).toFixed(1),
      suffix: '%',
      icon: <ShoppingCartOutlined />,
      color: metrics.supplierCR5 > 0.5 ? '#f5222d' : metrics.supplierCR5 > 0.4 ? '#faad14' : '#52c41a',
      progress: true,

      tooltip: '前5大供应商采购额占总采购额的比例',
    },
    {
      title: '毛利率估算',
      value: (metrics.grossMargin * 100).toFixed(1),
      suffix: '%',
      icon: <PercentageOutlined />,
      color: metrics.grossMargin < 0.1 ? '#f5222d' : metrics.grossMargin < 0.2 ? '#faad14' : '#52c41a',
      progress: true,

      tooltip: '(销售额 - 采购额) / 销售额',
    },
    {
      title: '本地销售占比',
      value: (metrics.localSalesRatio * 100).toFixed(1),
      suffix: '%',
      icon: <PieChartOutlined />,
      color: '#1677ff',
      progress: true,
      tooltip: '本地客户销售额占总销售额的比例',
    },
    {
      title: '本地采购占比',
      value: (metrics.localPurchaseRatio * 100).toFixed(1),
      suffix: '%',
      icon: <PieChartOutlined />,
      color: '#52c41a',
      progress: true,
      tooltip: '本地供应商采购额占总采购额的比例',
    },
  ];

  return (
    <Card 
      title="风险洞察指标" 
      variant="borderless"
      styles={{ body: { padding: 16 } }}
    >
      <Row gutter={[24, 16]}>
        {metricItems.map((item, index) => (
          <Col span={8} key={index}>
            <Tooltip title={item.tooltip} placement="top">
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-500 text-sm mb-1">{item.title}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span 
                      className="text-xl font-bold"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </span>
                    <span className="text-gray-400 text-sm">{item.suffix}</span>
                  </div>
                  {item.progress && (
                    <Progress 
                      percent={parseFloat(item.value)} 
                      size="small" 
                      strokeColor={item.color}
                      showInfo={false}
                    />
                  )}
                  {item.threshold && (
                    <div className="text-xs text-gray-400 mt-1">{item.threshold}</div>
                  )}
                </div>
              </div>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RiskMetricsPanel;
