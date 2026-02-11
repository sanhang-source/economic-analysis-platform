import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Select, DatePicker, Space, Progress, Statistic, Row, Col } from 'antd';
import {
  DashboardOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import ChartCard from '../components/ChartCard';
import { economyCockpitMock } from '../mock/economyCockpitMock';

const { Option } = Select;
const { QuarterPicker } = DatePicker;

/**
 * EconomyCockpit - 经济驾驶舱页面
 * 3x3 Grid 布局，展示经济运行核心指标
 */
const EconomyCockpit = () => {
  const [year, setYear] = useState('2025');
  const [quarter, setQuarter] = useState('Q4');
  const [region, setRegion] = useState('全市');

  const { gdpData, outputTrend, industryStructure, energyData, taxTop5 } = economyCockpitMock;

  // GDP 大数字卡片
  const GDPCard = () => (
    <div className="h-full flex flex-col justify-center">
      <div className="text-center mb-6">
        <div className="text-sm text-gray-500 mb-2">地区生产总值 (GDP)</div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            {gdpData.value}
          </span>
          <span className="text-xl text-gray-600">亿元</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-2xl font-semibold text-green-500">
            <RiseOutlined /> +{gdpData.growth}%
          </span>
          <span className="text-gray-400">同比</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">年度目标完成率</span>
            <span className="font-semibold text-blue-600">{gdpData.completion}%</span>
          </div>
          <Progress
            percent={gdpData.completion}
            strokeColor={{
              '0%': '#1677ff',
              '100%': '#00d4aa',
            }}
            strokeWidth={12}
            showInfo={false}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">第一产业：{gdpData.primary}%</span>
          <span className="text-gray-500">第二产业：{gdpData.secondary}%</span>
          <span className="text-gray-500">第三产业：{gdpData.tertiary}%</span>
        </div>
      </div>
    </div>
  );

  // 产值趋势柱状图配置
  const outputChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 1,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: outputTrend.months,
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisLabel: { color: '#666' },
    },
    yAxis: {
      type: 'value',
      name: '亿元',
      axisLine: { show: false },
      axisLabel: { color: '#666' },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
    },
    series: [{
      name: '工业产值',
      type: 'bar',
      data: outputTrend.values,
      barWidth: '50%',
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#1677ff' },
            { offset: 1, color: '#00d4aa' },
          ],
        },
      },
    }],
  };

  // 产业结构饼图配置
  const industryPieOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      formatter: '{b}: {c}%',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: { color: '#666', fontSize: 12 },
    },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { 
          value: industryStructure.primary, 
          name: '第一产业',
          itemStyle: { color: '#00d4aa' }
        },
        { 
          value: industryStructure.secondary, 
          name: '第二产业',
          itemStyle: { color: '#1677ff' }
        },
        { 
          value: industryStructure.tertiary, 
          name: '第三产业',
          itemStyle: { color: '#722ed1' }
        },
      ],
    }],
  };

  // 能耗仪表盘配置
  const energyGaugeOption = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 5,
      radius: '90%',
      center: ['50%', '70%'],
      itemStyle: {
        color: energyData.percentage > 80 ? '#f5222d' : energyData.percentage > 60 ? '#faad14' : '#1677ff',
      },
      progress: {
        show: true,
        roundCap: true,
        width: 18,
      },
      pointer: {
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.23075,735.416212 2090.60697,735.47778 C2086.97388,735.539672 2084.06975,732.570018 2084.16927,728.937204 L2088.53509,617.312956 C2088.57985,616.194028 2089.4999,615.30999 2090.36389,615.30999 Z',
        length: '75%',
        width: 12,
        offsetCenter: [0, '5%'],
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 18,
          color: [[1, '#e8e8e8']],
        },
      },
      axisTick: {
        splitNumber: 2,
        lineStyle: {
          width: 2,
          color: '#999',
        },
      },
      splitLine: {
        length: 12,
        lineStyle: {
          width: 3,
          color: '#999',
        },
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 12,
      },
      title: {
        show: true,
        offsetCenter: [0, '35%'],
        fontSize: 12,
        color: '#666',
      },
      detail: {
        valueAnimation: true,
        fontSize: 20,
        fontWeight: 'bold',
        offsetCenter: [0, '60%'],
        formatter: '{value}%',
        color: 'inherit',
      },
      data: [{
        value: energyData.percentage,
        name: '能耗使用率',
      }],
    }],
  };

  // 税收贡献Top5横向柱状图配置
  const taxBarOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      formatter: '{b}: {c}亿元',
    },
    grid: {
      left: '3%',
      right: '15%',
      bottom: '3%',
      top: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { 
        color: '#666',
        formatter: '{value}亿',
      },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
    },
    yAxis: {
      type: 'category',
      data: taxTop5.names,
      axisLine: { show: false },
      axisLabel: { 
        color: '#666',
        fontSize: 11,
      },
      axisTick: { show: false },
    },
    series: [{
      type: 'bar',
      data: taxTop5.values,
      barWidth: '50%',
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#722ed1' },
            { offset: 1, color: '#1677ff' },
          ],
        },
      },
      label: {
        show: true,
        position: 'right',
        formatter: '{c}亿',
        color: '#666',
        fontSize: 11,
      },
    }],
  };

  return (
    <div className="h-full -m-6">
      {/* 顶部工具栏 */}
      <div className="bg-white py-4 px-6 shadow-sm flex items-center justify-between sticky top-0 z-50 rounded-lg m-6 mb-0">
        <div className="flex items-center gap-3">
          <DashboardOutlined className="text-blue-500 text-xl" />
          <span className="text-xl font-semibold text-gray-800">经济运行驾驶舱</span>
        </div>
        
        <Space size="middle">
          <Select
            value={year}
            onChange={setYear}
            style={{ width: 100 }}
            placeholder="年份"
          >
            <Option value="2023">2023年</Option>
            <Option value="2024">2024年</Option>
            <Option value="2025">2025年</Option>
          </Select>
          
          <Select
            value={quarter}
            onChange={setQuarter}
            style={{ width: 100 }}
            placeholder="季度"
          >
            <Option value="Q1">第一季度</Option>
            <Option value="Q2">第二季度</Option>
            <Option value="Q3">第三季度</Option>
            <Option value="Q4">第四季度</Option>
          </Select>
          
          <Select
            value={region}
            onChange={setRegion}
            style={{ width: 120 }}
            placeholder="区域"
          >
            <Option value="全市">全市</Option>
            <Option value="南山区">南山区</Option>
            <Option value="福田区">福田区</Option>
            <Option value="罗湖区">罗湖区</Option>
            <Option value="宝安区">宝安区</Option>
            <Option value="龙岗区">龙岗区</Option>
            <Option value="光明区">光明区</Option>
            <Option value="坪山区">坪山区</Option>
          </Select>
        </Space>
      </div>

      {/* 3x3 Grid 布局 */}
      <div className="p-6">
        <Row gutter={[24, 24]}>
          {/* 第一行 */}
          <Col span={8}>
            <ChartCard
              title="GDP总量"
              subtitle={`统计时间：${year}年 ${quarter}`}
              tooltip="地区生产总值，反映区域经济总规模"
              height={320}
            >
              <GDPCard />
            </ChartCard>
          </Col>
          
          <Col span={8}>
            <ChartCard
              title="工业产值趋势"
              subtitle="月度累计产值"
              tooltip="规模以上工业企业总产值"
              height={320}
            >
              <ReactECharts
                option={outputChartOption}
                style={{ height: 220 }}
                opts={{ renderer: 'canvas' }}
              />
            </ChartCard>
          </Col>
          
          <Col span={8}>
            <ChartCard
              title="产业结构"
              subtitle="三次产业占比"
              tooltip="第一、二、三产业增加值占比"
              height={320}
            >
              <ReactECharts
                option={industryPieOption}
                style={{ height: 220 }}
                opts={{ renderer: 'canvas' }}
              />
            </ChartCard>
          </Col>

          {/* 第二行 */}
          <Col span={8}>
            <ChartCard
              title="能耗双控"
              subtitle={`年度能耗指标：${energyData.target}万吨标煤`}
              tooltip="单位GDP能耗降低率及能耗总量控制"
              height={320}
            >
              <ReactECharts
                option={energyGaugeOption}
                style={{ height: 200 }}
                opts={{ renderer: 'canvas' }}
              />
              <div className="text-center mt-2">
                <span className="text-sm text-gray-500">
                  已用 {energyData.used} / 目标 {energyData.target} 万吨标煤
                </span>
              </div>
            </ChartCard>
          </Col>
          
          <Col span={8}>
            <ChartCard
              title="税收贡献Top5"
              subtitle="企业纳税排名"
              tooltip="全口径税收收入前5名企业"
              height={320}
            >
              <ReactECharts
                option={taxBarOption}
                style={{ height: 220 }}
                opts={{ renderer: 'canvas' }}
              />
            </ChartCard>
          </Col>
          
          <Col span={8}>
            <ChartCard
              title="固定资产投资"
              subtitle="累计增速"
              tooltip="固定资产投资完成额及增速"
              height={320}
            >
              <EmptyPlaceholder />
            </ChartCard>
          </Col>

          {/* 第三行 */}
          <Col span={8}>
            <ChartCard
              title="社会消费品零售"
              subtitle="总额及增速"
              tooltip="社会消费品零售总额"
              height={320}
            >
              <EmptyPlaceholder />
            </ChartCard>
          </Col>
          
          <Col span={8}>
            <ChartCard
              title="进出口贸易"
              subtitle="进出口总额"
              tooltip="货物进出口总额"
              height={320}
            >
              <EmptyPlaceholder />
            </ChartCard>
          </Col>
          
          <Col span={8}>
            <ChartCard
              title="居民收入"
              subtitle="人均可支配收入"
              tooltip="城镇居民人均可支配收入"
              height={320}
            >
              <EmptyPlaceholder />
            </ChartCard>
          </Col>
        </Row>
      </div>
    </div>
  );
};

// 空占位组件
const EmptyPlaceholder = () => (
  <div className="h-full flex flex-col items-center justify-center text-gray-400">
    <div className="text-4xl mb-2">📊</div>
    <div className="text-sm">数据开发中</div>
  </div>
);

export default EconomyCockpit;
