import React from 'react';
import { Card, Table, Tag, Progress } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 热销商品分析
 */
const ProductAnalysis = ({ topProducts }) => {
  // 条形图配置
  const barOption = {
    title: {
      text: 'Top 10 热销商品',
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
        item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name
      ).reverse(),
      axisLabel: { fontSize: 9 },
    },
    series: [
      {
        type: 'bar',
        data: topProducts.map(item => ({
          value: item.amount,
          itemStyle: {
            color: item.ratio > 15 ? '#1677ff' : item.ratio > 8 ? '#52c41a' : '#faad14',
          },
        })).reverse(),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}万',
          fontSize: 9,
        },
      },
    ],
  };

  // 表格列
  const columns = [
    {
      title: '排名',
      dataIndex: 'id',
      width: 45,
      render: (id) => (
        <span className={`inline-block w-5 h-5 rounded-full text-center leading-5 text-xs font-bold ${
          id <= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {id}
        </span>
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      width: 80,
      align: 'right',
      render: (amount) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '占比',
      dataIndex: 'ratio',
      width: 80,
      render: (ratio) => (
        <div className="flex items-center gap-1">
          <span className="text-xs">{ratio}%</span>
          <Progress 
            percent={ratio} 
            size="small" 
            showInfo={false}
            strokeColor={ratio > 15 ? '#1677ff' : ratio > 8 ? '#52c41a' : '#faad14'}
            style={{ width: 40 }}
          />
        </div>
      ),
    },
  ];

  return (
    <Card title="十大热销商品信息" bordered={false} bodyStyle={{ padding: 12 }}>
      <div className="flex gap-3">
        <div className="flex-[2]">
          <ReactECharts option={barOption} style={{ height: 300 }} />
        </div>
        <div className="flex-[3]">
          <Table
            size="small"
            columns={columns}
            dataSource={topProducts}
            pagination={false}
            rowKey="id"
            scroll={{ y: 250 }}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductAnalysis;
