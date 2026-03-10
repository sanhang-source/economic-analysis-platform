import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 月度趋势图表（左右排列）
 */
const TrendChart = ({ monthlyTrend }) => {
  // 月度交易金额趋势（左侧）
  const amountOption = {
    title: {
      text: '月度交易金额趋势',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['销售额', '采购额'],
      bottom: 0,
    },
    grid: { left: '3%', right: '4%', bottom: '12%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: monthlyTrend.map(item => item.month.substring(5)),
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      name: '金额(万元)',
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: '销售额',
        type: 'line',
        data: monthlyTrend.map(item => item.sales),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2, color: '#52c41a' },
        itemStyle: { color: '#52c41a' },
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
              { offset: 1, color: 'rgba(82, 196, 26, 0.05)' },
            ],
          },
        },
      },
      {
        name: '采购额',
        type: 'line',
        data: monthlyTrend.map(item => item.purchase),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2, color: '#1677ff' },
        itemStyle: { color: '#1677ff' },
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(22, 119, 255, 0.3)' },
              { offset: 1, color: 'rgba(22, 119, 255, 0.05)' },
            ],
          },
        },
      },
    ],
  };

  // 月度开票数量趋势（右侧）
  const countOption = {
    title: {
      text: '月度开票数量趋势',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['销售开票', '采购开票'],
      bottom: 0,
    },
    grid: { left: '3%', right: '4%', bottom: '12%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: monthlyTrend.map(item => item.month.substring(5)),
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      name: '张数',
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: '销售开票',
        type: 'bar',
        data: monthlyTrend.map(item => item.salesCount),
        itemStyle: { color: '#52c41a' },
        barWidth: '30%',
      },
      {
        name: '采购开票',
        type: 'bar',
        data: monthlyTrend.map(item => item.purchaseCount),
        itemStyle: { color: '#1677ff' },
        barWidth: '30%',
      },
    ],
  };

  return (
    <Card bordered={false} bodyStyle={{ padding: 12 }}>
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <ReactECharts option={amountOption} style={{ height: 280 }} />
        </Col>
        <Col span={12}>
          <ReactECharts option={countOption} style={{ height: 280 }} />
        </Col>
      </Row>
    </Card>
  );
};

export default TrendChart;
