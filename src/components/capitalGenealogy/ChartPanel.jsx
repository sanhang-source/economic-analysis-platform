import React, { memo } from 'react';
import { Card, Empty, Spin } from 'antd';
import ReactECharts from 'echarts-for-react';

const ChartPanel = memo(({ 
  title, 
  chartOption, 
  data, 
  height = 380,
  loading = false,
  emptyText = '暂无数据'
}) => {
  return (
    <Card 
      title={title} 
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
