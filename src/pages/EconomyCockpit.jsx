import React, { useState } from 'react';
import { Card, Row, Col, Select } from 'antd';
import ReactECharts from 'echarts-for-react';
import {
  BuildOutlined,
  BankOutlined,
  TeamOutlined,
  TrademarkOutlined,
} from '@ant-design/icons';
import { economyCockpitMock } from '../mock/economyCockpitMock';
import { UNIFIED_COLORS } from '../constants/colors';
import { formatNumber } from '../utils/format';
import MetricCard from '../components/MetricCard';
import { useEconomyCockpitCharts } from '../hooks/useEconomyCockpitCharts';

const { Option } = Select;

const EconomyCockpit = () => {
  const [region, setRegion] = useState('全市');

  const {
    coreMetrics,
    taxContribution,
    ...chartData
  } = economyCockpitMock;

  // 使用 hook 获取图表配置
  const {
    enterpriseTrendOption,
    taxTrendOption,
    employmentTrendOption,
    patentTrendOption,
    qualificationOption,
    industryOption,
    lifecycleOption,
    taxContributionOption,
    strategicIndustriesOption,
    employmentScaleOption,
  } = useEconomyCockpitCharts({ ...chartData, taxContribution });

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
            color={UNIFIED_COLORS.blue}
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
            color={UNIFIED_COLORS.green}
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
            color={UNIFIED_COLORS.orange}
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
            color={UNIFIED_COLORS.purple}
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
