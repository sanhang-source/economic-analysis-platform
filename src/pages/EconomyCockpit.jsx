import React, { useState } from 'react';
import { Card, Row, Col, Select } from 'antd';
import ReactECharts from 'echarts-for-react';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  BuildOutlined,
  BankOutlined,
  TeamOutlined,
  TrademarkOutlined,
} from '@ant-design/icons';
import { economyCockpitMock } from '../mock/economyCockpitMock';

const { Option } = Select;

const EconomyCockpit = () => {
  const [region, setRegion] = useState('全市');

  const {
    coreMetrics,
    enterpriseTrend,
    taxTrend,
    employmentTrend,
    patentTrend,
    qualificationDistribution,
    industryDistribution,
    employmentScale,
    lifecycleDistribution,
    taxContribution,
    strategicIndustries,
  } = economyCockpitMock;

  // 统一配色方案 - 商务色系
  const unifiedColors = {
    blue: '#2563eb',
    green: '#10b981',
    orange: '#f59e0b',
    purple: '#8b5cf6',
    red: '#ef4444',
    cyan: '#06b6d4',
    gray: '#6b7280',
  };

  // 格式化数字
  const formatNumber = (num) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return num.toLocaleString();
  };

  // 核心指标卡片组件
  const MetricCard = ({ title, value, unit, growth, growthMoM, icon, color, subText }) => (
    <Card className="h-full hover:shadow-lg transition-shadow" bodyStyle={{ padding: 20 }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-gray-500 text-sm mb-2">{title}</div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold" style={{ color }}>{value}</span>
            <span className="text-gray-500 text-sm">{unit}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              {growth >= 0 ? (
                <ArrowUpOutlined style={{ color: '#52c41a' }} />
              ) : (
                <ArrowDownOutlined style={{ color: '#f5222d' }} />
              )}
              <span style={{ color: growth >= 0 ? '#52c41a' : '#f5222d' }}>
                {Math.abs(growth)}%
              </span>
              <span className="text-gray-400 text-xs">同比</span>
            </div>
            <div className="flex items-center gap-1">
              {growthMoM >= 0 ? (
                <ArrowUpOutlined style={{ color: '#1677ff' }} />
              ) : (
                <ArrowDownOutlined style={{ color: '#fa8c16' }} />
              )}
              <span style={{ color: growthMoM >= 0 ? '#1677ff' : '#fa8c16' }}>
                {Math.abs(growthMoM)}%
              </span>
              <span className="text-gray-400 text-xs">环比</span>
            </div>
          </div>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <span style={{ color, fontSize: 24 }}>{icon}</span>
        </div>
      </div>
      {subText && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">{subText}</span>
        </div>
      )}
    </Card>
  );

  // 企业总数趋势图配置
  const enterpriseTrendOption = {
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'cross' },
      formatter: (params) => {
        let result = params[0].name + '<br/>';
        params.forEach(item => {
          const value = item.seriesName === '企业总数' 
            ? (item.value / 10000).toFixed(1) 
            : Number(item.value).toFixed(1);
          result += item.marker + item.seriesName + ': ' + value + '<br/>';
        });
        return result;
      }
    },
    legend: { data: ['企业总数', '新增'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: enterpriseTrend.months, axisLabel: { rotate: 45, fontSize: 10 } },
    yAxis: [
      { type: 'value', name: '总数（万家）', position: 'left', min: 2300000, max: 2700000, interval: 100000, axisLabel: { formatter: (value) => (value / 10000).toFixed(0) } },
      { type: 'value', name: '新增（万家）', position: 'right', min: 1, max: 3, interval: 0.5, splitLine: { show: false }, axisLabel: { formatter: '{value}' } },
    ],
    series: [
      { name: '企业总数', type: 'line', data: enterpriseTrend.total, smooth: true, itemStyle: { color: unifiedColors.blue }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37, 99, 235, 0.3)' }, { offset: 1, color: 'rgba(37, 99, 235, 0.05)' }] } } },
      { name: '新增', type: 'bar', yAxisIndex: 1, data: enterpriseTrend.newAdded, itemStyle: { color: unifiedColors.blue, borderRadius: [4, 4, 0, 0] }, barWidth: 12 },
    ],
  };

  // 纳税趋势图配置
  const taxTrendOption = {
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'cross' },
      formatter: (params) => {
        let result = params[0].name + '<br/>';
        params.forEach(item => {
          const value = Number(item.value).toFixed(1);
          result += item.marker + item.seriesName + ': ' + value + '<br/>';
        });
        return result;
      }
    },
    legend: { data: ['环比', '纳税总额'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: taxTrend.months, axisLabel: { rotate: 45, fontSize: 10 } },
    yAxis: [
      { type: 'value', name: '总额（亿元）', position: 'left' },
      { type: 'value', name: '环比（%）', position: 'right', min: -15, max: 15, interval: 6, splitLine: { show: false }, axisLabel: { formatter: '{value}' } },
    ],
    series: [
      { name: '纳税总额', type: 'bar', data: taxTrend.values, itemStyle: { color: unifiedColors.green, borderRadius: [4, 4, 0, 0] }, barWidth: 12 },
      { name: '环比', type: 'line', yAxisIndex: 1, data: taxTrend.momGrowth, smooth: true, itemStyle: { color: unifiedColors.green }, lineStyle: { width: 3 }, symbol: 'emptyCircle', symbolSize: 6 },
    ],
  };

  // 用工趋势图配置
  const employmentTrendOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['用工总数', '新增'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: employmentTrend.months, axisLabel: { rotate: 45, fontSize: 10 } },
    yAxis: [
      { type: 'value', name: '总数（万人）', position: 'left', min: 1180, max: 1200, interval: 5 },
      { type: 'value', name: '新增（万人）', position: 'right', min: 0, max: 3, interval: 0.5, splitLine: { show: false } },
    ],
    series: [
      { name: '用工总数', type: 'line', data: employmentTrend.total, smooth: true, itemStyle: { color: unifiedColors.orange }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(245, 158, 11, 0.3)' }, { offset: 1, color: 'rgba(245, 158, 11, 0.05)' }] } } },
      { name: '新增', type: 'bar', yAxisIndex: 1, data: employmentTrend.newAdded, itemStyle: { color: unifiedColors.orange, borderRadius: [4, 4, 0, 0] }, barWidth: 12 },
    ],
  };

  // 专利趋势图配置
  const patentTrendOption = {
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'cross' },
      formatter: (params) => {
        let result = params[0].name + '<br/>';
        params.forEach(item => {
          const value = item.seriesName === '专利总数' ? (item.value / 10000).toFixed(1) : Number(item.value).toFixed(1);
          result += item.marker + item.seriesName + ': ' + value + '<br/>';
        });
        return result;
      }
    },
    legend: { data: ['专利总数', '新增'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: patentTrend.months, axisLabel: { rotate: 45, fontSize: 10 } },
    yAxis: [
      { type: 'value', name: '总数（万件）', position: 'left', min: 230000, max: 290000, interval: 12000, axisLabel: { formatter: (value) => (value / 10000).toFixed(0) } },
      { type: 'value', name: '新增（万件）', position: 'right', min: 0, max: 1, interval: 0.2, splitLine: { show: false }, axisLabel: { formatter: '{value}' } },
    ],
    series: [
      { name: '专利总数', type: 'line', data: patentTrend.total, smooth: true, itemStyle: { color: unifiedColors.purple }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(139, 92, 246, 0.3)' }, { offset: 1, color: 'rgba(139, 92, 246, 0.05)' }] } } },
      { name: '新增', type: 'bar', yAxisIndex: 1, data: patentTrend.newAdded, itemStyle: { color: unifiedColors.purple, borderRadius: [4, 4, 0, 0] }, barWidth: 12 },
    ],
  };

  // 资质企业分布图配置（横向条形图）
  const qualificationOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}家' },
    grid: { left: '3%', right: '18%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { formatter: (value) => value >= 10000 ? (value / 10000) + '万' : value, fontSize: 10 }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    yAxis: { type: 'category', data: ['独角兽', '上市公司', '专精特新', '规上企业', '国高企业'], axisLabel: { fontSize: 11 }, inverse: true },
    series: [{
      type: 'bar',
      data: [
        { value: 55, itemStyle: { color: unifiedColors.red, borderRadius: [0, 4, 4, 0] } },
        { value: 420, itemStyle: { color: unifiedColors.orange, borderRadius: [0, 4, 4, 0] } },
        { value: 8650, itemStyle: { color: unifiedColors.green, borderRadius: [0, 4, 4, 0] } },
        { value: 12860, itemStyle: { color: unifiedColors.blue, borderRadius: [0, 4, 4, 0] } },
        { value: 23450, itemStyle: { color: unifiedColors.gray, borderRadius: [0, 4, 4, 0] } },
      ],
      barWidth: 20,
      label: { show: true, position: 'right', formatter: (params) => { const value = params.value; return value >= 10000 ? (value / 10000).toFixed(1) + '万' : value.toLocaleString(); }, fontSize: 11 },
    }],
  };

  // 行业分布图配置（饼图）
  const industryOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
    legend: { orient: 'vertical', right: 5, top: 'middle', itemWidth: 10, itemHeight: 10, textStyle: { fontSize: 10, lineHeight: 14 }, itemGap: 6 },
    series: [{
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['35%', '50%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 485000, name: '电子信息', itemStyle: { color: unifiedColors.blue } },
        { value: 425000, name: '软件和信息服务', itemStyle: { color: unifiedColors.green } },
        { value: 368000, name: '智能制造', itemStyle: { color: unifiedColors.orange } },
        { value: 158000, name: '现代物流', itemStyle: { color: unifiedColors.purple } },
        { value: 135000, name: '新能源', itemStyle: { color: unifiedColors.cyan } },
        { value: 105000, name: '生物医药', itemStyle: { color: unifiedColors.red } },
        { value: 92000, name: '金融科技', itemStyle: { color: unifiedColors.gray } },
      ],
    }],
  };

  // 企业年限结构图配置（环形图）
  const lifecycleOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
    legend: { orient: 'vertical', right: 5, top: 'middle', itemWidth: 10, itemHeight: 10, textStyle: { fontSize: 10, lineHeight: 14 }, itemGap: 8 },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 268000, name: '1年内(新设)', itemStyle: { color: unifiedColors.blue } },
        { value: 398000, name: '1-3年(初创)', itemStyle: { color: unifiedColors.green } },
        { value: 485000, name: '3-5年(成长)', itemStyle: { color: unifiedColors.orange } },
        { value: 652000, name: '5-10年(稳定)', itemStyle: { color: unifiedColors.purple } },
        { value: 775000, name: '10年+(成熟)', itemStyle: { color: unifiedColors.gray } },
      ],
    }],
  };

  // 税收贡献分层图配置（横向条形图）
  const taxContributionOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}家' },
    grid: { left: '3%', right: '15%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { formatter: (value) => value >= 10000 ? (value / 10000) + '万' : value, fontSize: 10 }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    yAxis: { type: 'category', data: taxContribution.levels, axisLabel: { fontSize: 11 }, inverse: true },
    series: [{
      type: 'bar',
      data: [
        { value: 3200, itemStyle: { color: unifiedColors.red, borderRadius: [0, 4, 4, 0] } },
        { value: 28500, itemStyle: { color: unifiedColors.orange, borderRadius: [0, 4, 4, 0] } },
        { value: 185000, itemStyle: { color: unifiedColors.green, borderRadius: [0, 4, 4, 0] } },
        { value: 895000, itemStyle: { color: unifiedColors.blue, borderRadius: [0, 4, 4, 0] } },
        { value: 1473300, itemStyle: { color: unifiedColors.gray, borderRadius: [0, 4, 4, 0] } },
      ],
      barWidth: 20,
      label: { show: true, position: 'right', formatter: (params) => { const value = params.value; return value >= 10000 ? (value / 10000).toFixed(1) + '万' : value; }, fontSize: 10 },
    }],
  };

  // 产业分布图配置（饼图）
  const strategicIndustriesOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
    legend: { orient: 'vertical', right: 5, top: 'middle', itemWidth: 10, itemHeight: 10, textStyle: { fontSize: 10, lineHeight: 14 }, itemGap: 8 },
    series: [{
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['35%', '50%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 468000, name: '新一代信息技术', itemStyle: { color: unifiedColors.blue } },
        { value: 118000, name: '高端装备制造', itemStyle: { color: unifiedColors.green } },
        { value: 98000, name: '生物医药', itemStyle: { color: unifiedColors.orange } },
        { value: 72000, name: '新材料', itemStyle: { color: unifiedColors.purple } },
        { value: 45800, name: '新能源', itemStyle: { color: unifiedColors.cyan } },
        { value: 39800, name: '节能环保', itemStyle: { color: unifiedColors.red } },
        { value: 35200, name: '新能源汽车', itemStyle: { color: unifiedColors.gray } },
      ],
    }],
  };

  // 用工规模结构图配置（横向条形图）
  const employmentScaleOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { formatter: (value) => value >= 10000 ? (value / 10000) + '万' : value } },
    yAxis: { type: 'category', data: ['1000人以上', '500-999人', '300-499人', '100-299人', '50-99人', '50人以下'], axisLabel: { fontSize: 11 }, inverse: true },
    series: [{
      type: 'bar',
      data: [920, 2150, 4850, 14200, 32800, 2536080],
      itemStyle: { color: unifiedColors.blue, borderRadius: [0, 4, 4, 0] },
      barWidth: 16,
      label: { show: true, position: 'right', formatter: (params) => formatNumber(params.value), fontSize: 10 },
    }],
  };

  return (
    <div className="h-full -m-6 p-5">
      {/* 页面标题栏 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">经济运行驾驶舱</h1>
          <p className="text-gray-500 text-sm mt-1">实时监测企业动态，洞察经济发展趋势 · 更新时间：2026-02-15</p>
        </div>
        <div className="flex gap-3">
          <Select value={region} onChange={setRegion} style={{ width: 120 }}>
            <Option value="全市">全市</Option>
            <Option value="南山区">南山区</Option>
            <Option value="福田区">福田区</Option>
            <Option value="宝安区">宝安区</Option>
            <Option value="龙岗区">龙岗区</Option>
            <Option value="龙华区">龙华区</Option>
            <Option value="罗湖区">罗湖区</Option>
            <Option value="光明区">光明区</Option>
            <Option value="盐田区">盐田区</Option>
            <Option value="坪山区">坪山区</Option>
          </Select>
        </div>
      </div>

      {/* 第一行：核心指标总量卡片 */}
      <Row gutter={[16, 16]} className="mb-5">
        <Col span={6}>
          <MetricCard
            title="企业总数"
            value={(coreMetrics.enterpriseCount.total / 10000).toFixed(1)}
            unit="万家"
            growth={coreMetrics.enterpriseCount.growth}
            growthMoM={coreMetrics.enterpriseCount.growthMoM}
            icon={<BuildOutlined />}
            color={unifiedColors.blue}
            subText={`本月新增 ${(coreMetrics.enterpriseCount.newThisMonth / 10000).toFixed(1)} 万家`}
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="纳税总额"
            value={coreMetrics.taxRevenue.total}
            unit="亿元"
            growth={coreMetrics.taxRevenue.growth}
            growthMoM={coreMetrics.taxRevenue.growthMoM}
            icon={<BankOutlined />}
            color={unifiedColors.green}
            subText={`本年累计 ${coreMetrics.taxRevenue.total} 亿元 · 本月新增 ${coreMetrics.taxRevenue.monthTotal} 亿元`}
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="用工总数"
            value={coreMetrics.employment.total}
            unit="万人"
            growth={coreMetrics.employment.growth}
            growthMoM={coreMetrics.employment.growthMoM}
            icon={<TeamOutlined />}
            color={unifiedColors.orange}
            subText={`本月新增 0.1 万人`}
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="专利总数"
            value={(coreMetrics.patents.total / 10000).toFixed(1)}
            unit="万件"
            growth={coreMetrics.patents.growth}
            growthMoM={coreMetrics.patents.growthMoM}
            icon={<TrademarkOutlined />}
            color={unifiedColors.purple}
            subText={`本月新增 ${((coreMetrics.patents.invention + coreMetrics.patents.utility + coreMetrics.patents.design) / 10000).toFixed(1)} 万件`}
          />
        </Col>
      </Row>

      {/* 第二行：趋势分析（2x2布局） */}
      <Row gutter={[16, 16]} className="mb-5">
        <Col span={12}>
          <Card title="企业总数趋势（近12个月）" bodyStyle={{ padding: 12, height: 320 }}>
            <ReactECharts key="enterprise-trend" option={enterpriseTrendOption} style={{ height: '100%' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="纳税总额趋势（近12个月）" bodyStyle={{ padding: 12, height: 320 }}>
            <ReactECharts option={taxTrendOption} style={{ height: '100%' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mb-5">
        <Col span={12}>
          <Card title="用工总数趋势（近12个月）" bodyStyle={{ padding: 12, height: 320 }}>
            <ReactECharts key="employment-trend" option={employmentTrendOption} style={{ height: '100%' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="专利总数趋势（近12个月）" bodyStyle={{ padding: 12, height: 320 }}>
            <ReactECharts option={patentTrendOption} style={{ height: '100%' }} />
          </Card>
        </Col>
      </Row>

      {/* 第三行：结构分析（第一行：3列） */}
      <Row gutter={[16, 16]} className="mb-5">
        <Col span={8}>
          <Card title={<span>资质企业分布<span className="text-gray-400 text-xs ml-1">（家）</span></span>} bodyStyle={{ padding: 12, height: 300 }}>
            <ReactECharts option={qualificationOption} style={{ height: '100%' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<span>行业分布<span className="text-gray-400 text-xs ml-1">（家）</span></span>} bodyStyle={{ padding: 12, height: 300 }}>
            <ReactECharts option={industryOption} style={{ height: '100%' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<span>企业年限结构<span className="text-gray-400 text-xs ml-1">（家）</span></span>} bodyStyle={{ padding: 12, height: 300 }}>
            <ReactECharts option={lifecycleOption} style={{ height: '100%' }} />
          </Card>
        </Col>
      </Row>

      {/* 第四行：结构分析（第二行：3列） */}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title={<span>税收贡献分层<span className="text-gray-400 text-xs ml-1">（家）</span></span>} bodyStyle={{ padding: 12, height: 300 }}>
            <ReactECharts option={taxContributionOption} style={{ height: '100%' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<span>产业分布<span className="text-gray-400 text-xs ml-1">（家）</span></span>} bodyStyle={{ padding: 12, height: 300 }}>
            <ReactECharts option={strategicIndustriesOption} style={{ height: '100%' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<span>用工规模结构<span className="text-gray-400 text-xs ml-1">（家）</span></span>} bodyStyle={{ padding: 12, height: 300 }}>
            <ReactECharts option={employmentScaleOption} style={{ height: '100%' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EconomyCockpit;
