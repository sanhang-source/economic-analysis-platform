import React from 'react';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 客户销售地区分布（横向柱状图）
 */
const RegionDistribution = ({ regionDistribution }) => {
  // 横向柱状图配置
  const barOption = {
    title: {
      text: '十大客户销售地区分布',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const data = regionDistribution[params[0].dataIndex];
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${data.name}</div>
            <div style="font-size: 12px; color: #666;">占比: ${data.value}%</div>
            <div style="font-size: 12px; color: #666;">销售额: ¥${(data.sales / 10000).toFixed(2)}亿</div>
          </div>
        `;
      },
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { 
        formatter: '{value}%',
        fontSize: 10,
      },
    },
    yAxis: {
      type: 'category',
      data: regionDistribution.map(item => item.name).reverse(),
      axisLabel: { fontSize: 11 },
    },
    series: [
      {
        type: 'bar',
        data: regionDistribution.map(item => ({
          value: item.value,
          itemStyle: {
            color: '#fa8c16',
          },
        })).reverse(),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          fontSize: 10,
        },
      },
    ],
  };

  return (
    <Card title="十大客户销售地区" variant="borderless" styles={{ body: { padding: 12 } }}>
      <ReactECharts option={barOption} style={{ height: 320 }} />
    </Card>
  );
};

export default RegionDistribution;
