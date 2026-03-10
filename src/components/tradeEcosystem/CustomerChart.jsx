import React from 'react';
import { Card, Table, Tag } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 客户分析图表
 */
const CustomerChart = ({ topCustomers, localSalesRatio }) => {
  // 柱状图配置
  const barOption = {
    title: {
      text: 'Top 10 客户销售额',
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
        item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name
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

  // 饼图配置 - 本地/外地占比
  const pieOption = {
    title: {
      text: '本地销售占比',
      left: 'center',
      top: 'center',
      textStyle: { fontSize: 12, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{d}%',
          fontSize: 11,
        },
        data: [
          { 
            value: (localSalesRatio * 100).toFixed(1), 
            name: '本地', 
            itemStyle: { color: '#52c41a' } 
          },
          { 
            value: (100 - localSalesRatio * 100).toFixed(1), 
            name: '外地', 
            itemStyle: { color: '#d9d9d9' } 
          },
        ],
      },
    ],
  };

  // 表格列
  const columns = [
    {
      title: '排名',
      width: 50,
      render: (_, __, index) => (
        <span className={`inline-block w-5 h-5 rounded-full text-center leading-5 text-xs font-bold ${
          index < 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {index + 1}
        </span>
      ),
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '地区',
      dataIndex: 'isLocal',
      width: 60,
      render: (isLocal) => (
        <Tag color={isLocal ? 'green' : 'default'} size="small">
          {isLocal ? '本地' : '外地'}
        </Tag>
      ),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      width: 80,
      align: 'right',
      render: (amount) => `¥${amount}`,
    },
  ];

  return (
    <Card title="企业十大客户（销售）" bordered={false} bodyStyle={{ padding: 12 }}>
      <div className="flex gap-3">
        <div className="flex-[2]">
          <ReactECharts option={barOption} style={{ height: 280 }} />
        </div>
        <div className="flex-1">
          <ReactECharts option={pieOption} style={{ height: 120 }} />
          <Table
            size="small"
            columns={columns}
            dataSource={topCustomers}
            pagination={false}
            rowKey="id"
            scroll={{ y: 140 }}
          />
        </div>
      </div>
    </Card>
  );
};

export default CustomerChart;
