import React from 'react';
import { Card, Tag } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 客户分析图表（仅图表，无表格）
 */
const CustomerChart = ({ topCustomers, localSalesRatio }) => {
  // 柱状图配置
  const barOption = {
    title: {
      text: '十大客户销售额',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: ¥{c}万',
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}' },
    },
    yAxis: {
      type: 'category',
      data: topCustomers.map(item => 
        item.name.length > 18 ? item.name.substring(0, 18) + '...' : item.name
      ).reverse(),
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        data: topCustomers.map(item => ({
          value: item.amount,
          itemStyle: {
            color: item.isLocal ? '#52c41a' : '#d9d9d9',
          },
        })).reverse(),
        label: {
          show: true,
          position: 'right',
          formatter: '¥{c}万',
          fontSize: 10,
        },
      },
    ],
  };

  // 计算本地客户数量和金额
  const localCustomers = topCustomers.filter(c => c.isLocal);
  const localAmount = localCustomers.reduce((sum, c) => sum + c.amount, 0);
  const totalAmount = topCustomers.reduce((sum, c) => sum + c.amount, 0);

  return (
    <Card title="十大客户（销售）" bordered={false} bodyStyle={{ padding: 12 }}>
      <div className="flex gap-3">
        <div className="flex-[4]">
          <ReactECharts option={barOption} style={{ height: 320 }} />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-gray-500 text-sm mb-2">本地销售金额占比</div>
            <div className="text-3xl font-bold text-green-600">
              {(localSalesRatio * 100).toFixed(1)}%
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <Tag color="green">本地 {localCustomers.length}家</Tag>
            <Tag>外地 {topCustomers.length - localCustomers.length}家</Tag>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerChart;
