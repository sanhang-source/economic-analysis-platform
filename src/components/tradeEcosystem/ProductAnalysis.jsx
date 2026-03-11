import React from 'react';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 热销商品分析（仅图表，无表格）
 */
const ProductAnalysis = ({ topProducts }) => {
  // 条形图配置
  const barOption = {
    title: {
      text: '十大热销商品',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const data = topProducts[params[0].dataIndex];
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${data.name}</div>
            <div style="font-size: 12px; color: #666;">分类: ${data.category}</div>
            <div style="font-size: 12px; color: #666;">金额: ¥${data.amount.toLocaleString()}万</div>
            <div style="font-size: 12px; color: #666;">占比: ${data.ratio}%</div>
            ${data.price ? `<div style="font-size: 12px; color: #666;">单价: ¥${data.price}</div>` : ''}
          </div>
        `;
      },
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}万' },
    },
    yAxis: {
      type: 'category',
      data: topProducts.map(item => 
        item.name.length > 16 ? item.name.substring(0, 16) + '...' : item.name
      ).reverse(),
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        data: topProducts.map(item => ({
          value: item.amount,
          itemStyle: {
            color: '#13c2c2',
          },
        })).reverse(),
        label: {
          show: true,
          position: 'right',
          formatter: '¥{c}万',
          fontSize: 9,
        },
      },
    ],
  };

  return (
    <Card title="十大热销商品" bordered={false} bodyStyle={{ padding: 12 }}>
      <ReactECharts option={barOption} style={{ height: 320 }} />
    </Card>
  );
};

export default ProductAnalysis;
