import React, { memo } from 'react';
import { Card, Empty, Spin, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const ChartPanel = memo(({ 
  title, 
  chartOption, 
  data, 
  height = 380,
  loading = false,
  emptyText = '暂无数据',
  tooltip
}) => {
  const renderTitle = () => {
    if (!tooltip) return title;
    
    return (
      <div className="flex items-center gap-1">
        <span>{title}</span>
        <Tooltip title={tooltip}>
          <QuestionCircleOutlined className="text-gray-400 cursor-help" />
        </Tooltip>
      </div>
    );
  };

  return (
    <Card 
      title={renderTitle()} 
      variant="borderless"
      styles={{ body: { padding: 12 } }}
    >
      <Spin spinning={loading}>
        {data?.length > 0 ? (
          <ReactECharts 
            option={chartOption} 
            style={{ height }} 
            opts={{ renderer: 'canvas' }}
          />
        ) : (
          <Empty description={emptyText} style={{ height }} />
        )}
      </Spin>
    </Card>
  );
});

ChartPanel.displayName = 'ChartPanel';

export default ChartPanel;
