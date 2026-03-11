import React, { useState } from 'react';
import { Card, Tag, Button, Table } from 'antd';
import ReactECharts from 'echarts-for-react';
import { BarChartOutlined, TableOutlined } from '@ant-design/icons';

/**
 * 客户分析图表（支持图表/列表切换）
 */
const CustomerChart = ({ topCustomers, localSalesRatio }) => {
  const [viewMode, setViewMode] = useState('chart'); // 'chart' | 'list'

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
        item.name.length > 14 ? item.name.substring(0, 14) + '...' : item.name
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

  // 列表表格列
  const columns = [
    {
      title: '排名',
      width: 50,
      align: 'center',
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
      title: '销售金额',
      dataIndex: 'amount',
      width: 90,
      align: 'right',
      render: (amount) => `¥${amount.toLocaleString()}万`,
    },
  ];

  // 计算本地客户数量
  const localCustomers = topCustomers.filter(c => c.isLocal);

  return (
    <Card 
      title="十大客户（销售）" 
      variant="borderless" 
      styles={{ body: { padding: 12 } }}
      extra={
        <Button 
          size="small" 
          icon={viewMode === 'chart' ? <TableOutlined /> : <BarChartOutlined />}
          onClick={() => setViewMode(viewMode === 'chart' ? 'list' : 'chart')}
        >
          {viewMode === 'chart' ? '列表展示' : '图表展示'}
        </Button>
      }
    >
      {viewMode === 'chart' ? (
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
      ) : (
        <Table
          size="small"
          columns={columns}
          dataSource={topCustomers}
          pagination={false}
          rowKey="id"
          scroll={{ y: 320 }}
        />
      )}
    </Card>
  );
};

export default CustomerChart;
