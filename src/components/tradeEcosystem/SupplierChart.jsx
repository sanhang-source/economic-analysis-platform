import React from 'react';
import { Card, Tag } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 供应商分析图表（仅图表，无表格）
 */
const SupplierChart = ({ topSuppliers, localPurchaseRatio }) => {
  // 柱状图配置
  const barOption = {
    title: {
      text: '十大供应商采购额',
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
      data: topSuppliers.map(item => 
        item.name.length > 18 ? item.name.substring(0, 18) + '...' : item.name
      ).reverse(),
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        data: topSuppliers.map(item => ({
          value: item.amount,
          itemStyle: {
            color: item.isLocal ? '#1677ff' : '#d9d9d9',
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

  // 计算本地供应商数量和金额
  const localSuppliers = topSuppliers.filter(s => s.isLocal);
  const localAmount = localSuppliers.reduce((sum, s) => sum + s.amount, 0);
  const totalAmount = topSuppliers.reduce((sum, s) => sum + s.amount, 0);

  return (
    <Card title="十大供应商（采购）" bordered={false} bodyStyle={{ padding: 12 }}>
      <div className="flex gap-3">
        <div className="flex-[4]">
          <ReactECharts option={barOption} style={{ height: 320 }} />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-gray-500 text-sm mb-2">本地采购占比</div>
            <div className="text-3xl font-bold text-blue-600">
              {(localPurchaseRatio * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400 mt-2">
              本地{localSuppliers.length}家 / 共{topSuppliers.length}家
            </div>
            <div className="text-xs text-gray-400 mt-1">
              金额占比: {(localAmount / totalAmount * 100).toFixed(1)}%
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <Tag color="blue">本地 {localSuppliers.length}家</Tag>
            <Tag>外地 {topSuppliers.length - localSuppliers.length}家</Tag>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SupplierChart;
