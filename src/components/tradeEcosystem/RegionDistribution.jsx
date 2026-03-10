import React from 'react';
import { Card, Table, Tag } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 客户销售地区分布
 */
const RegionDistribution = ({ regionDistribution }) => {
  // 环形图配置
  const pieOption = {
    title: {
      text: '客户销售地区分布',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%<br/>销售额: ¥{d}万',
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontSize: 10 },
    },
    series: [
      {
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 10,
        },
        emphasis: {
          label: { show: true, fontSize: 12, fontWeight: 'bold' },
        },
        data: regionDistribution.map((item, index) => ({
          name: item.name,
          value: item.value,
          d: item.sales,
          itemStyle: {
            color: ['#1677ff', '#13c2c2', '#722ed1', '#eb2f96', '#fa8c16', '#52c41a', '#fadb14', '#bfbfbf'][index % 8],
          },
        })),
      },
    ],
  };

  // 表格列
  const columns = [
    {
      title: '排名',
      width: 50,
      render: (_, __, index) => (
        <Tag color={index < 3 ? 'blue' : 'default'} size="small">{index + 1}</Tag>
      ),
    },
    {
      title: '地区',
      dataIndex: 'name',
    },
    {
      title: '占比',
      dataIndex: 'value',
      width: 60,
      align: 'right',
      render: (value) => `${value}%`,
    },
    {
      title: '销售额',
      dataIndex: 'sales',
      width: 90,
      align: 'right',
      render: (sales) => `¥${(sales / 10000).toFixed(2)}亿`,
    },
  ];

  return (
    <Card title="十大客户销售地区分布" bordered={false} bodyStyle={{ padding: 12 }}>
      <div className="flex gap-3">
        <div className="flex-[3]">
          <ReactECharts option={pieOption} style={{ height: 300 }} />
        </div>
        <div className="flex-[2]">
          <Table
            size="small"
            columns={columns}
            dataSource={regionDistribution}
            pagination={false}
            rowKey="name"
            scroll={{ y: 250 }}
          />
        </div>
      </div>
    </Card>
  );
};

export default RegionDistribution;
