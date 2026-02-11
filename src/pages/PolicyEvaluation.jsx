import React, { useState, useRef } from 'react';
import {
  Card,
  Select,
  DatePicker,
  Row,
  Col,
  Statistic,
  Table,
  Typography,
  Tag,
  Space,
  Empty,
  Button,
  Tooltip,
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  InfoCircleOutlined,
  TrophyOutlined,
  WarningOutlined,
  SearchOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * PolicyEvaluation - 政策评估页面
 * 提供政策效果评估、核心指标对比、企业绩效分析功能
 */
const PolicyEvaluation = () => {
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const scatterRef = useRef(null);
  const trendRef = useRef(null);

  // 政策选项
  const policyOptions = [
    { value: 'policy_2022_high_tech', label: '2022年高企认定奖励' },
    { value: 'policy_2022_rd_subsidy', label: '2022年研发投入补贴' },
    { value: 'policy_2023_tech_upgrade', label: '2023年技改补贴' },
    { value: 'policy_2023_talent', label: '2023年人才引进补贴' },
    { value: 'policy_2023_energy', label: '2023年节能减排补贴' },
    { value: 'policy_2023_digital', label: '2023年数字化转型补贴' },
  ];

  // 核心指标数据
  const [metrics, setMetrics] = useState({
    revenue: { before: 0, after: 0, growth: 0 },
    tax: { before: 0, after: 0, growth: 0 },
    rdInvestment: { before: 0, after: 0, growth: 0 },
  });

  // 模拟散点图数据 - 补贴金额 vs 新增税收
  const scatterData = [
    [50, 80, '华为技术有限公司'],
    [30, 45, '腾讯科技（深圳）有限公司'],
    [80, 120, '比亚迪股份有限公司'],
    [20, 15, '大疆创新科技有限公司'],
    [60, 90, '迈瑞生物医疗电子股份有限公司'],
    [40, 35, '中兴通讯股份有限公司'],
    [100, 50, '某低效企业A'], // 高投入低产出
    [90, 40, '某低效企业B'], // 高投入低产出
    [25, 60, '顺丰控股股份有限公司'],
    [35, 55, '立讯精密工业股份有限公司'],
    [45, 25, '欧菲光集团股份有限公司'],
    [55, 75, '欣旺达电子股份有限公司'],
    [70, 30, '某低效企业C'], // 高投入低产出
    [15, 35, '某创新企业D'],
    [85, 95, '某高效企业E'],
  ];

  // 散点图配置
  const scatterOption = {
    title: {
      text: '补贴金额 vs 新增税收分布',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `${params.data[2]}<br/>补贴金额: ¥${params.data[0]}万<br/>新增税收: ¥${params.data[1]}万`;
      },
    },
    grid: { left: '10%', right: '10%', bottom: '15%', top: '20%' },
    xAxis: {
      name: '补贴金额（万元）',
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value',
      splitLine: { lineStyle: { type: 'dashed' } },
    },
    yAxis: {
      name: '新增税收（万元）',
      nameLocation: 'middle',
      nameGap: 40,
      type: 'value',
      splitLine: { lineStyle: { type: 'dashed' } },
    },
    series: [
      {
        name: '企业分布',
        type: 'scatter',
        symbolSize: 16,
        data: scatterData,
        itemStyle: {
          color: (params) => {
            // 高投入低产出：补贴金额 > 70 且 新增税收 < 50
            if (params.data[0] > 70 && params.data[1] < 50) {
              return '#f5222d'; // 红色预警
            }
            return '#1677ff';
          },
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.1)',
        },
        markLine: {
          silent: true,
          lineStyle: { type: 'dashed', color: '#999' },
          data: [
            { xAxis: 70, label: { formatter: '高投入线' } },
            { yAxis: 50, label: { formatter: '低产出线' } },
          ],
        },
        markArea: {
          silent: true,
          itemStyle: { color: 'rgba(245, 34, 45, 0.05)' },
          data: [
            [
              { xAxis: 70, yAxis: 0 },
              { xAxis: 120, yAxis: 50 },
            ],
          ],
        },
      },
    ],
  };

  // 双轴趋势图数据
  const trendMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const subsidyAmounts = [120, 132, 101, 134, 90, 230, 210, 180, 200, 250, 280, 300];
  const growthRates = [12, 15, 8, 18, 5, 25, 22, 19, 23, 28, 32, 35];

  // 双轴趋势图配置
  const trendOption = {
    title: {
      text: '补贴发放量与产值增长率趋势',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['补贴发放量', '产值增长率'],
      bottom: 10,
    },
    grid: { left: '10%', right: '10%', bottom: '15%', top: '20%' },
    xAxis: {
      type: 'category',
      data: trendMonths,
      axisPointer: { type: 'shadow' },
    },
    yAxis: [
      {
        type: 'value',
        name: '补贴发放量（万元）',
        position: 'left',
        axisLine: { show: true, lineStyle: { color: '#1677ff' } },
        axisLabel: { formatter: '{value}' },
      },
      {
        type: 'value',
        name: '产值增长率（%）',
        position: 'right',
        axisLine: { show: true, lineStyle: { color: '#00d4aa' } },
        axisLabel: { formatter: '{value}%' },
      },
    ],
    series: [
      {
        name: '补贴发放量',
        type: 'bar',
        data: subsidyAmounts,
        itemStyle: { color: '#1677ff', borderRadius: [4, 4, 0, 0] },
        barWidth: '50%',
      },
      {
        name: '产值增长率',
        type: 'line',
        yAxisIndex: 1,
        data: growthRates,
        itemStyle: { color: '#00d4aa' },
        lineStyle: { width: 3 },
        symbol: 'circle',
        symbolSize: 8,
      },
    ],
  };

  // 高绩效企业Top5
  const highPerformanceData = [
    { key: '1', name: '华为技术有限公司', subsidy: 50, contribution: 80, roi: 160, growth: 45 },
    { key: '2', name: '比亚迪股份有限公司', subsidy: 80, contribution: 120, roi: 150, growth: 68 },
    { key: '3', name: '迈瑞生物医疗电子股份有限公司', subsidy: 60, contribution: 90, roi: 150, growth: 52 },
    { key: '4', name: '顺丰控股股份有限公司', subsidy: 25, contribution: 60, roi: 240, growth: 38 },
    { key: '5', name: '某创新企业D', subsidy: 15, contribution: 35, roi: 233, growth: 42 },
  ];

  // 低绩效预警Top5
  const lowPerformanceData = [
    { key: '1', name: '某低效企业A', subsidy: 100, contribution: 50, roi: 50, growth: -12 },
    { key: '2', name: '某低效企业B', subsidy: 90, contribution: 40, roi: 44, growth: -8 },
    { key: '3', name: '某低效企业C', subsidy: 70, contribution: 30, roi: 43, growth: -15 },
    { key: '4', name: '欧菲光集团股份有限公司', subsidy: 45, contribution: 25, roi: 56, growth: -5 },
    { key: '5', name: '某低效企业E', subsidy: 55, contribution: 20, roi: 36, growth: -18 },
  ];

  // 高绩效表格列
  const highPerformanceColumns = [
    {
      title: '排名',
      dataIndex: 'key',
      width: 60,
      render: (text, record, index) => (
        <Tag color={index < 3 ? 'gold' : 'default'} style={{ fontWeight: 'bold' }}>
          {index + 1}
        </Tag>
      ),
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: '补贴金额',
      dataIndex: 'subsidy',
      align: 'right',
      render: (value) => `¥${value}万`,
    },
    {
      title: '税收贡献',
      dataIndex: 'contribution',
      align: 'right',
      render: (value) => `¥${value}万`,
    },
    {
      title: '投入产出比',
      dataIndex: 'roi',
      align: 'right',
      render: (value) => (
        <Text type="success" strong>
          {value}%
        </Text>
      ),
    },
    {
      title: '增长率',
      dataIndex: 'growth',
      align: 'right',
      render: (value) => (
        <Tag color="green" icon={<ArrowUpOutlined />}>
          {value}%
        </Tag>
      ),
    },
  ];

  // 低绩效表格列
  const lowPerformanceColumns = [
    {
      title: '排名',
      dataIndex: 'key',
      width: 60,
      render: (text, record, index) => (
        <Tag color="red" style={{ fontWeight: 'bold' }}>
          {index + 1}
        </Tag>
      ),
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: '补贴金额',
      dataIndex: 'subsidy',
      align: 'right',
      render: (value) => `¥${value}万`,
    },
    {
      title: '税收贡献',
      dataIndex: 'contribution',
      align: 'right',
      render: (value) => `¥${value}万`,
    },
    {
      title: '投入产出比',
      dataIndex: 'roi',
      align: 'right',
      render: (value) => (
        <Text type="danger" strong>
          {value}%
        </Text>
      ),
    },
    {
      title: '增长率',
      dataIndex: 'growth',
      align: 'right',
      render: (value) => (
        <Tag color="red" icon={<ArrowDownOutlined />}>
          {value}%
        </Tag>
      ),
    },
  ];

  // 执行评估
  const handleEvaluate = () => {
    if (!selectedPolicy) {
      return;
    }
    setLoading(true);

    // 模拟数据加载
    setTimeout(() => {
      setMetrics({
        revenue: { before: 125.8, after: 168.5, growth: 33.9 },
        tax: { before: 18.6, after: 26.2, growth: 40.9 },
        rdInvestment: { before: 8.2, after: 12.8, growth: 56.1 },
      });
      setHasResult(true);
      setLoading(false);
    }, 800);
  };

  // 对比卡片组件
  const ComparisonCard = ({ title, before, after, growth, prefix = '¥', suffix = '亿' }) => (
    <Card className="h-full">
      <div className="mb-4">
        <Text type="secondary">{title}</Text>
      </div>
      <Row gutter={16} align="middle">
        <Col span={11}>
          <Statistic
            title={<Text type="secondary">政策前</Text>}
            value={before}
            precision={1}
            prefix={prefix}
            suffix={suffix}
            valueStyle={{ color: '#999', fontSize: 20 }}
          />
        </Col>
        <Col span={2} className="text-center">
          <ArrowUpOutlined style={{ color: '#1677ff', fontSize: 20 }} />
        </Col>
        <Col span={11}>
          <Statistic
            title={<Text type="secondary">政策后</Text>}
            value={after}
            precision={1}
            prefix={prefix}
            suffix={suffix}
            valueStyle={{ color: '#1677ff', fontSize: 24, fontWeight: 'bold' }}
          />
          <div className="mt-1">
            <Tag color="blue" icon={<ArrowUpOutlined />}>
              +{growth}%
            </Tag>
          </div>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div className="h-full flex flex-col -m-6">
      {/* 页面标题 */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <Title level={4} className="!mb-0">政策评估</Title>
        <Text type="secondary">评估政策实施效果，分析企业绩效表现</Text>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50 p-5">
        {/* 顶部筛选栏 */}
        <Card className="mb-5">
          <Space size="large" align="center">
            <div>
              <Text type="secondary" className="mr-2">选择政策:</Text>
              <Select
                style={{ width: 280 }}
                placeholder="请选择要评估的政策"
                value={selectedPolicy}
                onChange={setSelectedPolicy}
                allowClear
              >
                {policyOptions.map((policy) => (
                  <Option key={policy.value} value={policy.value}>
                    {policy.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <Text type="secondary" className="mr-2">评估时间范围:</Text>
              <RangePicker
                picker="year"
                defaultValue={[dayjs('2022'), dayjs('2023')]}
                disabled
              />
              <Tooltip title="对比政策实施前后的年度数据">
                <InfoCircleOutlined className="ml-2 text-gray-400" />
              </Tooltip>
            </div>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              loading={loading}
              onClick={handleEvaluate}
              disabled={!selectedPolicy}
            >
              开始评估
            </Button>
            <Button icon={<DownloadOutlined />}>导出报告</Button>
          </Space>
        </Card>

        {!hasResult ? (
          <div className="bg-white rounded-lg h-96 flex items-center justify-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={selectedPolicy ? '点击"开始评估"查看政策效果' : '请先选择要评估的政策'}
            />
          </div>
        ) : (
          <div className="space-y-5">
            {/* 核心指标对比卡 */}
            <Row gutter={16}>
              <Col span={8}>
                <ComparisonCard
                  title="受惠企业营收总额"
                  before={metrics.revenue.before}
                  after={metrics.revenue.after}
                  growth={metrics.revenue.growth}
                />
              </Col>
              <Col span={8}>
                <ComparisonCard
                  title="受惠企业纳税总额"
                  before={metrics.tax.before}
                  after={metrics.tax.after}
                  growth={metrics.tax.growth}
                />
              </Col>
              <Col span={8}>
                <ComparisonCard
                  title="受惠企业研发投入"
                  before={metrics.rdInvestment.before}
                  after={metrics.rdInvestment.after}
                  growth={metrics.rdInvestment.growth}
                />
              </Col>
            </Row>

            {/* 成效分析图表 */}
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <div className="flex items-center justify-between mb-2">
                    <Title level={5} className="!mb-0">补贴效果散点分析</Title>
                    <Tooltip title="右下角红色区域为'高投入低产出'预警企业">
                      <InfoCircleOutlined className="text-gray-400" />
                    </Tooltip>
                  </div>
                  <Text type="secondary" className="text-xs block mb-2">
                    红色区域：高投入低产出预警
                  </Text>
                  <ReactECharts
                    ref={scatterRef}
                    option={scatterOption}
                    style={{ height: 350 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Title level={5} className="!mb-4">补贴发放与产值增长趋势</Title>
                  <ReactECharts
                    ref={trendRef}
                    option={trendOption}
                    style={{ height: 350 }}
                  />
                </Card>
              </Col>
            </Row>

            {/* 企业绩效红黑榜 */}
            <Row gutter={16}>
              <Col span={12}>
                <Card
                  title={
                    <Space>
                      <TrophyOutlined style={{ color: '#faad14' }} />
                      <span>高绩效企业 Top5</span>
                      <Tag color="success">拿钱少·贡献大</Tag>
                    </Space>
                  }
                >
                  <Table
                    columns={highPerformanceColumns}
                    dataSource={highPerformanceData}
                    pagination={false}
                    size="small"
                    rowClassName={(record, index) => (index < 3 ? 'bg-yellow-50' : '')}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title={
                    <Space>
                      <WarningOutlined style={{ color: '#f5222d' }} />
                      <span>低绩效预警 Top5</span>
                      <Tag color="error">拿钱多·贡献负增长</Tag>
                    </Space>
                  }
                >
                  <Table
                    columns={lowPerformanceColumns}
                    dataSource={lowPerformanceData}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyEvaluation;
