import React, { useState, useMemo } from 'react';
import {
  Card,
  Select,
  Radio,
  DatePicker,
  Button,
  Statistic,
  List,
  Tag,
  Space,
  Alert,
  Typography,
  Empty,
  Badge,
  Tooltip,
  Divider,
} from 'antd';
import {
  SearchOutlined,
  SwapOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  AlertOutlined,
  SafetyOutlined,
  BankOutlined,
  DollarOutlined,
  ShopOutlined,
  CarOutlined,
  GlobalOutlined,
  AimOutlined,
  EyeOutlined,
  WarningFilled,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * TradeEcosystem - 交易生态页面
 * 展示企业供应链资金流向、本地配套率、风险预警
 */
const TradeEcosystem = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [tradeDirection, setTradeDirection] = useState('both');
  const [timeRange, setTimeRange] = useState('1year');
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  // 核心企业选项
  const companyOptions = [
    { value: 'huawei', label: '华为技术有限公司', industry: '电子信息' },
    { value: 'tencent', label: '腾讯科技（深圳）有限公司', industry: '软件和信息服务' },
    { value: 'byd', label: '比亚迪股份有限公司', industry: '新能源汽车' },
    { value: 'dji', label: '大疆创新科技有限公司', industry: '智能制造' },
    { value: 'mindray', label: '迈瑞生物医疗电子股份有限公司', industry: '生物医药' },
  ];

  // 模拟桑基图数据
  const sankeyData = {
    nodes: [
      // 上游供应商
      { name: '英特尔(Intel)', category: 'supplier', isLocal: false },
      { name: '高通(Qualcomm)', category: 'supplier', isLocal: false },
      { name: '京东方(BOE)', category: 'supplier', isLocal: true },
      { name: '立讯精密', category: 'supplier', isLocal: true },
      { name: '比亚迪电子', category: 'supplier', isLocal: true },
      { name: '三星电子', category: 'supplier', isLocal: false },
      { name: '台积电(TSMC)', category: 'supplier', isLocal: false },
      { name: '欣旺达', category: 'supplier', isLocal: true },
      // 核心企业
      { name: '华为技术', category: 'core', isLocal: true },
      // 下游客户
      { name: '中国移动', category: 'customer', isLocal: true },
      { name: '中国电信', category: 'customer', isLocal: true },
      { name: '中国联通', category: 'customer', isLocal: true },
      { name: '亚马逊(Amazon)', category: 'customer', isLocal: false },
      { name: '德国电信', category: 'customer', isLocal: false },
      { name: '软银集团', category: 'customer', isLocal: false },
      { name: '法国电信', category: 'customer', isLocal: false },
    ],
    links: [
      // 供应商 -> 核心企业
      { source: '英特尔(Intel)', target: '华为技术', value: 8500 },
      { source: '高通(Qualcomm)', target: '华为技术', value: 6200 },
      { source: '京东方(BOE)', target: '华为技术', value: 5800 },
      { source: '立讯精密', target: '华为技术', value: 4200 },
      { source: '比亚迪电子', target: '华为技术', value: 3800 },
      { source: '三星电子', target: '华为技术', value: 3200 },
      { source: '台积电(TSMC)', target: '华为技术', value: 2800 },
      { source: '欣旺达', target: '华为技术', value: 2100 },
      // 核心企业 -> 客户
      { source: '华为技术', target: '中国移动', value: 12000 },
      { source: '华为技术', target: '中国电信', value: 9500 },
      { source: '华为技术', target: '中国联通', value: 8200 },
      { source: '华为技术', target: '亚马逊(Amazon)', value: 6800 },
      { source: '华为技术', target: '德国电信', value: 5200 },
      { source: '华为技术', target: '软银集团', value: 4800 },
      { source: '华为技术', target: '法国电信', value: 4200 },
    ],
  };

  // 本地配套率计算
  const localRatio = useMemo(() => {
    const suppliers = sankeyData.nodes.filter(n => n.category === 'supplier');
    const localSuppliers = suppliers.filter(n => n.isLocal).length;
    return Math.round((localSuppliers / suppliers.length) * 100);
  }, []);

  // 风险预警数据
  const riskAlerts = [
    {
      id: '1',
      level: 'high',
      company: '台积电(TSMC)',
      message: '存在产能受限风险，可能影响芯片供应稳定性',
      suggestion: '建议寻找替代供应商或提前备货',
    },
    {
      id: '2',
      level: 'medium',
      company: '高通(Qualcomm)',
      message: '近期专利诉讼可能影响供货价格',
      suggestion: '密切关注诉讼进展，评估成本影响',
    },
  ];

  // Top 5 交易伙伴
  const topPartners = [
    { name: '中国移动', type: 'customer', amount: 12000, isLocal: true, trend: 'up' },
    { name: '英特尔(Intel)', type: 'supplier', amount: 8500, isLocal: false, trend: 'stable' },
    { name: '中国电信', type: 'customer', amount: 9500, isLocal: true, trend: 'up' },
    { name: '中国联通', type: 'customer', amount: 8200, isLocal: true, trend: 'stable' },
    { name: '京东方(BOE)', type: 'supplier', amount: 5800, isLocal: true, trend: 'up' },
  ];

  // 桑基图配置
  const sankeyOption = useMemo(() => {
    return {
      title: {
        text: '供应链资金流向图',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'normal' },
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params) => {
          if (params.dataType === 'node') {
            const isLocal = params.data.isLocal;
            const location = isLocal ? '本地企业' : '外地企业';
            const color = isLocal ? '#52c41a' : '#999';
            return `
              <div style="padding: 8px;">
                <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
                <div style="color: ${color}; font-size: 12px;">${location}</div>
                <div style="color: #666; font-size: 12px; margin-top: 4px;">
                  交易总额: ¥${params.value}万
                </div>
              </div>
            `;
          } else {
            return `
              <div style="padding: 8px;">
                <div style="font-weight: bold; margin-bottom: 4px;">${params.data.source} → ${params.data.target}</div>
                <div style="color: #1677ff; font-size: 14px; font-weight: bold;">
                  交易金额: ¥${params.data.value}万
                </div>
              </div>
            `;
          }
        },
      },
      series: [
        {
          type: 'sankey',
          layout: 'none',
          emphasis: {
            focus: 'adjacency',
          },
          data: sankeyData.nodes.map(node => ({
            ...node,
            itemStyle: {
              color: node.category === 'core' 
                ? '#1677ff' 
                : node.isLocal 
                  ? '#52c41a' 
                  : '#d9d9d9',
              borderColor: node.category === 'core' ? '#1677ff' : 'transparent',
              borderWidth: node.category === 'core' ? 2 : 0,
            },
            label: {
              show: true,
              position: node.category === 'supplier' ? 'right' : node.category === 'customer' ? 'left' : 'inside',
              color: node.category === 'core' ? '#fff' : '#333',
              fontWeight: node.category === 'core' ? 'bold' : 'normal',
              fontSize: 10,
              distance: 5,
            },
          })),
          links: sankeyData.links.map(link => ({
            ...link,
            lineStyle: {
              color: '#1677ff',
              opacity: 0.4,
              curveness: 0.5,
            },
          })),
          left: '2%',
          right: '2%',
          top: '5%',
          bottom: '2%',
          nodeWidth: 20,
          nodeGap: 16,
          layoutIterations: 32,

        },
      ],
    };
  }, []);

  // 仪表盘配置
  const gaugeOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 5,
        itemStyle: {
          color: '#1677ff',
        },
        progress: {
          show: true,
          width: 20,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 20,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 10,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        axisLabel: {
          distance: 15,
          color: '#999',
          fontSize: 12,
        },
        pointer: {
          show: true,
          length: '60%',
          width: 6,
          itemStyle: {
            color: '#1677ff',
          },
        },
        title: {
          offsetCenter: [0, '30%'],
          fontSize: 14,
          color: '#666',
        },
        detail: {
          valueAnimation: true,
          fontSize: 28,
          fontWeight: 'bold',
          offsetCenter: [0, '65%'],
          formatter: '{value}%',
          color: '#1677ff',
        },
        data: [
          {
            value: localRatio,
            name: '本地配套率',
          },
        ],
      },
    ],
  };

  // 分析查询
  const handleAnalyze = () => {
    if (!selectedCompany) return;
    setLoading(true);
    setTimeout(() => {
      setHasResult(true);
      setLoading(false);
    }, 800);
  };

  // 查看企业详情
  const handleViewDetail = (company) => {
    console.log('View company detail:', company.name);
  };

  // 交易方向标签
  const directionLabels = {
    supplier: { text: '供应商', color: 'blue', icon: <ArrowUpOutlined /> },
    customer: { text: '客户', color: 'green', icon: <ArrowDownOutlined /> },
    both: { text: '双向', color: 'purple', icon: <SwapOutlined /> },
  };

  return (
    <div className="h-full flex flex-col -m-6">
      {/* 页面标题 */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <Title level={4} className="!mb-0">交易生态</Title>
        <Text type="secondary">洞察企业供应链资金流向，评估本地配套能力</Text>
      </div>

      <div className="flex-1 flex overflow-hidden bg-gray-50">
        {/* 左侧控制面板 */}
        <div className="w-72 bg-white border-r border-gray-200 overflow-auto">
          <div className="p-5">
            <Title level={5} className="!mb-4 flex items-center gap-2">
              <AimOutlined />
              分析配置
            </Title>

            {/* 核心企业选择 */}
            <div className="mb-5">
              <Text strong className="block mb-2">选择核心企业</Text>
              <Select
                showSearch
                placeholder="搜索企业名称"
                style={{ width: '100%' }}
                value={selectedCompany}
                onChange={setSelectedCompany}
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                options={companyOptions.map(c => ({
                  value: c.value,
                  label: c.label,
                }))}
              />
            </div>

            {/* 交易方向 */}
            <div className="mb-5">
              <Text strong className="block mb-2">交易方向</Text>
              <Radio.Group
                value={tradeDirection}
                onChange={(e) => setTradeDirection(e.target.value)}
                className="w-full"
              >
                <Space direction="vertical" className="w-full">
                  <Radio.Button value="supplier" className="w-full text-left">
                    <ArrowUpOutlined className="mr-1" />
                    供应商 (买入)
                  </Radio.Button>
                  <Radio.Button value="customer" className="w-full text-left">
                    <ArrowDownOutlined className="mr-1" />
                    客户 (卖出)
                  </Radio.Button>
                  <Radio.Button value="both" className="w-full text-left">
                    <SwapOutlined className="mr-1" />
                    双向
                  </Radio.Button>
                </Space>
              </Radio.Group>
            </div>

            {/* 时间范围 */}
            <div className="mb-5">
              <Text strong className="block mb-2">时间范围</Text>
              <Radio.Group
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full"
              >
                <Space direction="vertical" className="w-full">
                  <Radio.Button value="1year" className="w-full text-left">
                    近 1 年
                  </Radio.Button>
                  <Radio.Button value="3years" className="w-full text-left">
                    近 3 年
                  </Radio.Button>
                  <Radio.Button value="custom" className="w-full text-left">
                    自定义
                  </Radio.Button>
                </Space>
              </Radio.Group>
              {timeRange === 'custom' && (
                <RangePicker
                  className="w-full mt-2"
                  defaultValue={[dayjs().subtract(1, 'year'), dayjs()]}
                />
              )}
            </div>

            {/* 分析按钮 */}
            <Button
              type="primary"
              icon={<SearchOutlined />}
              loading={loading}
              onClick={handleAnalyze}
              disabled={!selectedCompany}
              block
              size="large"
            >
              开始分析
            </Button>
          </div>
        </div>

        {/* 中间图谱区 */}
        <div className="flex-1 p-5 overflow-auto">
          {!hasResult ? (
            <div className="h-full flex items-center justify-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="请选择核心企业并点击开始分析"
              />
            </div>
          ) : (
            <Card className="h-full" bodyStyle={{ height: '100%' }}>
              {/* 图例 */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <Space>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                    <Text type="secondary" className="text-xs">核心企业</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <Text type="secondary" className="text-xs">本地企业</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-400"></div>
                    <Text type="secondary" className="text-xs">外地企业</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-blue-500"></div>
                    <Text type="secondary" className="text-xs">资金流向</Text>
                  </div>
                </Space>
              </div>

              {/* 桑基图 */}
              <ReactECharts
                option={sankeyOption}
                style={{ height: 'calc(100% - 40px)', width: '100%' }}
              />
            </Card>
          )}
        </div>

        {/* 右侧供应链分析 */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-auto">
          <div className="p-5">
            {!hasResult ? (
              <Empty description="请先进行分析" />
            ) : (
              <>
                {/* 本地配套率仪表盘 */}
                <Card className="mb-4" size="small">
                  <Title level={5} className="!mb-0 text-center">本地配套率</Title>
                  <ReactECharts
                    option={gaugeOption}
                    style={{ height: 200 }}
                  />
                  <div className="text-center">
                    <Text type="secondary" className="text-xs">
                      该企业交易对象中，{localRatio}% 为本地企业
                    </Text>
                  </div>
                </Card>

                {/* 供应链风险预警 */}
                <div className="mb-4">
                  <Title level={5} className="!mb-3 flex items-center gap-2">
                    <WarningFilled className="text-red-500" />
                    风险预警
                  </Title>
                  {riskAlerts.map((alert) => (
                    <Alert
                      key={alert.id}
                      message={
                        <Space>
                          <Text strong>{alert.company}</Text>
                          <Tag color={alert.level === 'high' ? 'red' : 'orange'}>
                            {alert.level === 'high' ? '高风险' : '中风险'}
                          </Tag>
                        </Space>
                      }
                      description={
                        <div>
                          <div className="text-sm">{alert.message}</div>
                          <div className="text-xs mt-1 text-gray-500">
                            建议: {alert.suggestion}
                          </div>
                        </div>
                      }
                      type={alert.level === 'high' ? 'error' : 'warning'}
                      showIcon
                      className="mb-2"
                    />
                  ))}
                </div>

                <Divider />

                {/* Top 5 交易伙伴 */}
                <div>
                  <Title level={5} className="!mb-3 flex items-center gap-2">
                    <BankOutlined />
                    Top 5 交易伙伴
                  </Title>
                  <div className="space-y-2">
                    {topPartners.map((item, index) => (
                      <Card
                        key={item.name}
                        size="small"
                        className={`cursor-pointer hover:shadow-md transition-shadow ${
                          index < 3 ? 'border-l-4 border-l-blue-500' : ''
                        }`}
                        bodyStyle={{ padding: '8px 12px' }}
                        onClick={() => handleViewDetail(item)}
                      >
                        <div className="flex items-center justify-between">
                          {/* 左侧：排名 + 企业信息 */}
                          <div className="flex items-center gap-3">
                            {/* 排名 */}
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index < 3
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {index + 1}
                            </div>
                            {/* 企业信息 */}
                            <div>
                              <div className="flex items-center gap-2">
                                <Text strong className="text-sm">{item.name}</Text>
                                {item.isLocal ? (
                                  <Tag color="green" size="small" className="!text-xs !px-1">
                                    本地
                                  </Tag>
                                ) : (
                                  <Tag color="default" size="small" className="!text-xs !px-1">
                                    外地
                                  </Tag>
                                )}
                              </div>
                              <Tag
                                size="small"
                                icon={directionLabels[item.type].icon}
                                color={directionLabels[item.type].color}
                                className="!text-xs !mt-1"
                              >
                                {directionLabels[item.type].text}
                              </Tag>
                            </div>
                          </div>
                          {/* 右侧：交易金额 */}
                          <div className="text-right">
                            <Text strong className="text-base text-blue-600">
                              ¥{(item.amount / 10000).toFixed(1)}亿
                            </Text>
                            <div className="text-xs text-gray-400">
                              交易额
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 统计摘要 */}
                <Card className="mt-4" size="small">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Text type="secondary" className="text-xs block">供应商数量</Text>
                      <Text strong className="text-lg text-blue-600">8</Text>
                    </div>
                    <div className="text-center">
                      <Text type="secondary" className="text-xs block">客户数量</Text>
                      <Text strong className="text-lg text-green-600">7</Text>
                    </div>
                    <div className="text-center">
                      <Text type="secondary" className="text-xs block">总交易额</Text>
                      <Text strong className="text-lg">¥8.2亿</Text>
                    </div>
                    <div className="text-center">
                      <Text type="secondary" className="text-xs block">平均账期</Text>
                      <Text strong className="text-lg">45天</Text>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeEcosystem;
