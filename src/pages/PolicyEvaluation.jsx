import React, { useState, useMemo } from 'react';
import {
  Card,
  Button,
  DatePicker,
  Statistic,
  Row,
  Col,
  Tag,
  Divider,
  Typography,
  Space,
  Badge,
} from 'antd';
import {
  CalculatorOutlined,
  ExperimentOutlined,
  BarChartOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  AreaChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

/**
 * PolicyEvaluation - 政策评估页面（成效评估系统）
 * 参考 policy_effect.html 功能重构
 * 基于 DID (Difference-in-Differences) 双重差分模型测算政策净效应
 */
const PolicyEvaluation = () => {
  // 评估区间
  const [dateRange, setDateRange] = useState([dayjs('2025-01-01'), dayjs('2025-12-31')]);
  
  // 导入状态
  const [testGroup, setTestGroup] = useState({ imported: true, count: 85 });
  const [controlGroup, setControlGroup] = useState({ imported: true, count: 120 });
  
  // 是否已测算
  const [hasResult, setHasResult] = useState(true);

  // 实验组数据
  const testGroupData = {
    tax: { value: 4.25, unit: '亿', growth: 12.5 },
    employment: { value: 1240, unit: '人', growth: 5.3 },
    ip: { value: 320, unit: '件', growth: 18.0 },
  };

  // 对照组数据
  const controlGroupData = {
    tax: { value: 3.80, unit: '亿', growth: 4.1 },
    employment: { value: 1105, unit: '人', growth: 0.2 },
    ip: { value: 180, unit: '件', growth: 6.5 },
  };

  // DID 净效应计算
  const netEffects = useMemo(() => {
    return {
      tax: (testGroupData.tax.growth - controlGroupData.tax.growth).toFixed(1),
      employment: (testGroupData.employment.growth - controlGroupData.employment.growth).toFixed(1),
      ip: (testGroupData.ip.growth - controlGroupData.ip.growth).toFixed(1),
    };
  }, []);

  // 纳税趋势图配置
  const taxTrendOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['实验组 (享受政策)', '对照组 (未享受)'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: { lineStyle: { color: '#94a3b8' } },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: '实验组 (享受政策)',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 2, color: '#0ea5e9' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(14, 165, 233, 0.3)' },
              { offset: 1, color: 'rgba(14, 165, 233, 0.05)' },
            ],
          },
        },
        data: [100, 102, 105, 110, 115, 122, 130, 138, 145, 150, 155, 162],
      },
      {
        name: '对照组 (未享受)',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 2, color: '#94a3b8', type: 'dashed' },
        data: [100, 101, 102, 103, 104, 106, 108, 110, 112, 113, 115, 116],
      },
    ],
  };

  // 知识产权结构图配置
  const ipStructureOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['实验组', '对照组'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['发明专利', '实用新型', '外观设计', '软件著作权'],
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#64748b' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b' },
    },
    series: [
      {
        name: '实验组',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          color: '#0ea5e9',
          borderRadius: [4, 4, 0, 0],
        },
        data: [120, 80, 50, 70],
      },
      {
        name: '对照组',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          color: '#cbd5e1',
          borderRadius: [4, 4, 0, 0],
        },
        data: [60, 50, 40, 30],
      },
    ],
  };

  // 开始测算
  const handleCalculate = () => {
    setHasResult(true);
  };

  // 指标卡片组件
  const MetricCard = ({ title, value, unit, growth, isTestGroup = true }) => (
    <div className={`rounded-lg p-4 border transition hover:shadow-md ${isTestGroup ? 'bg-slate-50 border-slate-100' : 'bg-slate-50 border-slate-100 grayscale opacity-90'}`}>
      <div className="text-xs text-slate-500 mb-1">{title}</div>
      <div className="text-xl font-bold text-slate-800">
        {unit === '¥' && '¥ '}{value} {unit !== '¥' && unit}
      </div>
      <div className={`text-sm font-bold mt-1 flex items-center ${growth > 0 ? 'text-green-600' : 'text-slate-500'}`}>
        <ArrowUpOutlined className="mr-1" />
        +{growth}%
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col -m-6 bg-slate-100">
      {/* 页面标题 */}
      <div className="bg-white px-6 py-4 border-b border-slate-200">
        <Title level={4} className="!mb-0 flex items-center">
          <AreaChartOutlined className="mr-2" />
          政策绩效评估中心
        </Title>
        <Text type="secondary">基于 DID (Difference-in-Differences) 双重差分模型测算政策净效应</Text>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* 1. 顶部配置与导入区 */}
        <Card className="mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-800">成效评估配置</h1>
              <p className="text-sm text-slate-500 mt-1">
                基于 <span className="font-mono text-blue-600 bg-blue-50 px-1 rounded">DID (Difference-in-Differences)</span> 双重差分模型测算政策净效应。
              </p>
            </div>

            {/* 时间选择器 */}
            <div className="flex items-center bg-slate-50 border border-slate-300 rounded-md px-3 py-2">
              <CalendarOutlined className="text-slate-400 mr-3" />
              <span className="text-sm text-slate-500 mr-2">评估区间:</span>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                className="bg-transparent border-0"
                style={{ width: 240 }}
              />
            </div>
          </div>

          <Divider className="my-4" />

          <div className="flex flex-wrap gap-4 items-center">
            {/* 导入实验组 */}
            <Button
              type="dashed"
              className="h-auto py-2 px-4 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 border-2"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                  <ExperimentOutlined className="text-blue-700" />
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-70">Step 1</div>
                  <div>导入实验组 (享受政策)</div>
                </div>
                {testGroup.imported && (
                  <Badge
                    count={`已导入 ${testGroup.count} 家`}
                    style={{ backgroundColor: '#fff', color: '#1677ff', border: '1px solid #d9d9d9' }}
                    className="ml-3"
                  />
                )}
              </div>
            </Button>

            {/* 导入对照组 */}
            <Button
              type="dashed"
              className="h-auto py-2 px-4 border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 border-2"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                  <BarChartOutlined className="text-slate-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-70">Step 2</div>
                  <div>导入对照组 (未享受)</div>
                </div>
                {controlGroup.imported && (
                  <Badge
                    count={`已导入 ${controlGroup.count} 家`}
                    style={{ backgroundColor: '#fff', color: '#666', border: '1px solid #d9d9d9' }}
                    className="ml-3"
                  />
                )}
              </div>
            </Button>

            <div className="flex-1"></div>

            {/* 开始测算按钮 */}
            <Button
              type="primary"
              size="large"
              icon={<CalculatorOutlined />}
              onClick={handleCalculate}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-md"
            >
              开始测算
            </Button>
          </div>
        </Card>

        {/* 2. 中部核心指标对比 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 实验组 */}
          <Card
            className="shadow-sm border-t-4 border-t-blue-500"
            title={
              <div className="flex items-center">
                <span className="w-2 h-6 bg-blue-500 rounded mr-3"></span>
                <span className="text-lg font-bold text-slate-800">实验组数据</span>
                <Tag color="blue" className="ml-2">政策受益群体</Tag>
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                title="纳税总额"
                value={testGroupData.tax.value}
                unit="亿"
                growth={testGroupData.tax.growth}
                isTestGroup={true}
              />
              <MetricCard
                title="用工规模"
                value={testGroupData.employment.value}
                unit="人"
                growth={testGroupData.employment.growth}
                isTestGroup={true}
              />
              <MetricCard
                title="新增知识产权"
                value={testGroupData.ip.value}
                unit="件"
                growth={testGroupData.ip.growth}
                isTestGroup={true}
              />
            </div>
          </Card>

          {/* 对照组 */}
          <Card
            className="shadow-sm border-t-4 border-t-slate-400"
            title={
              <div className="flex items-center">
                <span className="w-2 h-6 bg-slate-400 rounded mr-3"></span>
                <span className="text-lg font-bold text-slate-700">对照组数据</span>
                <Tag className="ml-2">自然增长基准</Tag>
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                title="纳税总额"
                value={controlGroupData.tax.value}
                unit="亿"
                growth={controlGroupData.tax.growth}
                isTestGroup={false}
              />
              <MetricCard
                title="用工规模"
                value={controlGroupData.employment.value}
                unit="人"
                growth={controlGroupData.employment.growth}
                isTestGroup={false}
              />
              <MetricCard
                title="新增知识产权"
                value={controlGroupData.ip.value}
                unit="件"
                growth={controlGroupData.ip.growth}
                isTestGroup={false}
              />
            </div>
          </Card>
        </div>

        {/* 中部横幅：净效应展示 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg p-5 text-white shadow-lg mb-6 relative overflow-hidden">
          {/* 装饰背景 */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white/20 p-3 rounded-full mr-4 backdrop-blur-sm">
                <BarChartOutlined className="text-2xl" />
              </div>
              <div>
                <div className="font-bold text-xl tracking-tight">政策净效应评估 (DID)</div>
                <div className="text-indigo-100 text-sm opacity-90 mt-1">
                  净效应 = (实验组变化 - 对照组变化)，剔除市场自然增长因素
                </div>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="text-center group cursor-default">
                <div className="text-xs text-indigo-200 uppercase tracking-wider font-semibold mb-1 group-hover:text-white transition">
                  纳税净增效
                </div>
                <div className="font-bold text-3xl text-white group-hover:scale-110 transition-transform">
                  +{netEffects.tax}%
                </div>
              </div>
              <div className="text-center border-l border-white/20 pl-10 group cursor-default">
                <div className="text-xs text-indigo-200 uppercase tracking-wider font-semibold mb-1 group-hover:text-white transition">
                  就业净增效
                </div>
                <div className="font-bold text-3xl text-white group-hover:scale-110 transition-transform">
                  +{netEffects.employment}%
                </div>
              </div>
              <div className="text-center border-l border-white/20 pl-10 group cursor-default">
                <div className="text-xs text-indigo-200 uppercase tracking-wider font-semibold mb-1 group-hover:text-white transition">
                  创新净增效
                </div>
                <div className="font-bold text-3xl text-white group-hover:scale-110 transition-transform">
                  +{netEffects.ip}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 下部趋势图表 */}
        <Row gutter={24}>
          <Col span={12}>
            <Card
              className="shadow-sm"
              title={
                <div className="flex items-center">
                  <AreaChartOutlined className="mr-2 text-blue-600" />
                  <span className="font-bold text-slate-700">纳税趋势对比图</span>
                </div>
              }
              extra={
                <div className="flex items-center space-x-2 text-xs">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                    实验组
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-slate-400 mr-1"></span>
                    对照组
                  </span>
                </div>
              }
            >
              <ReactECharts option={taxTrendOption} style={{ height: 280 }} />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              className="shadow-sm"
              title={
                <div className="flex items-center">
                  <PieChartOutlined className="mr-2 text-purple-600" />
                  <span className="font-bold text-slate-700">知识产权结构分布</span>
                </div>
              }
              extra={
                <select className="text-xs border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none">
                  <option>按总量统计</option>
                  <option>按人均统计</option>
                </select>
              }
            >
              <ReactECharts option={ipStructureOption} style={{ height: 280 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PolicyEvaluation;
