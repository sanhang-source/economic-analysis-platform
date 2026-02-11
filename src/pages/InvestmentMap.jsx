import React, { useState, useMemo } from 'react';
import {
  Card,
  Input,
  Select,
  Button,
  Badge,
  Tag,
  Space,
  Tooltip,
  Divider,
  Radio,
  Typography,
  Empty,
  Popover,
  Checkbox,
} from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HeatMapOutlined,
  BorderOutlined,
  AimOutlined,
  CloseOutlined,
  DollarOutlined,
  TagOutlined,
  GlobalOutlined,
  PushpinOutlined,
  ApartmentOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

/**
 * InvestmentMap - 招商地图页面（重构版）
 * 全屏地图布局 + 悬浮UI层设计
 */
const InvestmentMap = () => {
  // 状态管理
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState('output');
  const [heatMapEnabled, setHeatMapEnabled] = useState(false);
  const [heatMapType, setHeatMapType] = useState('density');
  const [polygonMode, setPolygonMode] = useState(false);
  const [selectedLayers, setSelectedLayers] = useState(['scale_up', 'high_tech']);

  // 筛选器状态
  const [filters, setFilters] = useState({
    industry: undefined,
    scale: undefined,
    outputRange: undefined,
    tags: undefined,
  });

  // 模拟企业数据
  const enterpriseData = useMemo(() => [
    {
      id: '1',
      name: '华为技术有限公司',
      tags: ['高企', '规上', 'A类'],
      output: 8500,
      tax: 320,
      address: '深圳市龙岗区坂田华为基地',
      industry: '电子信息',
      distance: 0.5,
    },
    {
      id: '2',
      name: '腾讯科技（深圳）有限公司',
      tags: ['高企', '规上', 'A类'],
      output: 5600,
      tax: 280,
      address: '深圳市南山区海天二路33号',
      industry: '软件和信息服务',
      distance: 1.2,
    },
    {
      id: '3',
      name: '比亚迪股份有限公司',
      tags: ['高企', '规上', 'A类'],
      output: 4200,
      tax: 180,
      address: '深圳市坪山区比亚迪路3009号',
      industry: '新能源汽车',
      distance: 8.5,
    },
    {
      id: '4',
      name: '大疆创新科技有限公司',
      tags: ['高企', '规上', 'B类'],
      output: 1800,
      tax: 95,
      address: '深圳市南山区西丽街道',
      industry: '智能制造',
      distance: 2.1,
    },
    {
      id: '5',
      name: '迈瑞生物医疗电子股份有限公司',
      tags: ['高企', '规上', 'A类'],
      output: 1200,
      tax: 68,
      address: '深圳市南山区高新技术产业园区',
      industry: '生物医药',
      distance: 1.8,
    },
    {
      id: '6',
      name: '中兴通讯股份有限公司',
      tags: ['高企', '规上', 'A类'],
      output: 1100,
      tax: 58,
      address: '深圳市南山区高新技术产业园',
      industry: '电子信息',
      distance: 2.3,
    },
    {
      id: '7',
      name: '顺丰控股股份有限公司',
      tags: ['规上', 'B类'],
      output: 1500,
      tax: 42,
      address: '深圳市福田区万基商务大厦',
      industry: '现代物流',
      distance: 5.6,
    },
    {
      id: '8',
      name: '立讯精密工业股份有限公司',
      tags: ['高企', '规上', 'A类'],
      output: 980,
      tax: 38,
      address: '深圳市宝安区沙井街道',
      industry: '智能制造',
      distance: 12.3,
    },
    {
      id: '9',
      name: '欧菲光集团股份有限公司',
      tags: ['高企', '规上', 'B类'],
      output: 750,
      tax: 28,
      address: '深圳市光明区欧菲光科技园',
      industry: '电子信息',
      distance: 15.2,
    },
    {
      id: '10',
      name: '欣旺达电子股份有限公司',
      tags: ['高企', '规上', 'A类'],
      output: 680,
      tax: 32,
      address: '深圳市宝安区石岩街道',
      industry: '新能源汽车',
      distance: 11.8,
    },
  ], []);

  // 排序后的数据
  const sortedData = useMemo(() => {
    const data = [...enterpriseData];
    switch (sortBy) {
      case 'output':
        return data.sort((a, b) => b.output - a.output);
      case 'tax':
        return data.sort((a, b) => b.tax - a.tax);
      case 'distance':
        return data.sort((a, b) => a.distance - b.distance);
      default:
        return data;
    }
  }, [enterpriseData, sortBy]);

  // 处理定位
  const handleLocate = (company) => {
    console.log('Pan to company:', company.name);
  };

  // 处理加入线索
  const handleAddLead = (company) => {
    console.log('Add to leads:', company.name);
  };

  // 处理查看详情
  const handleViewDetail = (company) => {
    console.log('View detail:', company.name);
  };

  // 图层选项
  const layerOptions = [
    { label: '规上企业', value: 'scale_up', color: '#1677ff' },
    { label: '高新技术企业', value: 'high_tech', color: '#52c41a' },
    { label: '用地红线', value: 'red_line', color: '#f5222d' },
    { label: '招商地块', value: 'land', color: '#faad14' },
  ];

  // 企业卡片组件
  const EnterpriseCard = ({ company }) => (
    <Card
      size="small"
      className="mb-3 hover:shadow-md transition-shadow cursor-pointer"
      bodyStyle={{ padding: 12 }}
      onClick={() => handleLocate(company)}
    >
      {/* 第一行：企业名称 */}
      <div className="mb-2">
        <Text strong className="text-blue-600 text-base">
          {company.name}
        </Text>
      </div>

      {/* 第二行：标签组 */}
      <div className="mb-2">
        <Space size={4}>
          {company.tags.map((tag) => {
            const colorMap = {
              '高企': 'green',
              '规上': 'blue',
              'A类': 'gold',
              'B类': 'default',
            };
            return (
              <Tag key={tag} color={colorMap[tag]} size="small">
                {tag}
              </Tag>
            );
          })}
        </Space>
      </div>

      {/* 第三行：核心数据 */}
      <div className="mb-2 text-sm">
        <Space split={<Divider type="vertical" className="!mx-1" />}>
          <span>
            <Text type="secondary">产值:</Text>{' '}
            <Text strong>{company.output}万</Text>
          </span>
          <span>
            <Text type="secondary">税收:</Text>{' '}
            <Text strong>{company.tax}万</Text>
          </span>
        </Space>
      </div>

      {/* 第四行：地址 */}
      <div className="mb-3 text-xs">
        <EnvironmentOutlined className="text-gray-400 mr-1" />
        <Text type="secondary" ellipsis={{ tooltip: true }}>
          {company.address}
        </Text>
      </div>

      {/* 操作按钮 */}
      <Space size={8} className="w-full justify-end">
        <Tooltip title="定位">
          <Button
            type="text"
            size="small"
            icon={<PushpinOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleLocate(company);
            }}
          />
        </Tooltip>
        <Tooltip title="查看详情">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetail(company);
            }}
          />
        </Tooltip>
        <Tooltip title="加入线索">
          <Button
            type="primary"
            size="small"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleAddLead(company);
            }}
          >
            线索
          </Button>
        </Tooltip>
      </Space>
    </Card>
  );

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 64px)' }}>
      {/* 地图底层 */}
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <GlobalOutlined className="text-6xl text-gray-400 mb-4" />
          <Text className="text-xl text-gray-500 block">Map Container</Text>
          <Text type="secondary" className="text-sm">
            地图组件占位区域
          </Text>
        </div>
      </div>

      {/* 顶部悬浮搜索条 */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{ top: 20, width: '55%', minWidth: 500, maxWidth: 750 }}
      >
        <div className="bg-white rounded-xl shadow-lg p-4">
          {/* 搜索框 */}
          <Search
            placeholder="请输入企业名称、经营范围或法人"
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />}>搜索</Button>}
            size="large"
            className="mb-3"
          />

          {/* 筛选器 */}
          <Space wrap size="middle" className="w-full">
            <Select
              placeholder="所属行业"
              allowClear
              style={{ width: 140 }}
              value={filters.industry}
              onChange={(value) => setFilters({ ...filters, industry: value })}
              suffixIcon={<ApartmentOutlined />}
            >
              <Option value="electronics">电子信息</Option>
              <Option value="software">软件和信息服务</Option>
              <Option value="newenergy">新能源汽车</Option>
              <Option value="biotech">生物医药</Option>
              <Option value="manufacturing">智能制造</Option>
              <Option value="logistics">现代物流</Option>
            </Select>

            <Select
              placeholder="企业规模"
              allowClear
              style={{ width: 120 }}
              value={filters.scale}
              onChange={(value) => setFilters({ ...filters, scale: value })}
              suffixIcon={<TagOutlined />}
            >
              <Option value="large">大型企业</Option>
              <Option value="medium">中型企业</Option>
              <Option value="small">小型企业</Option>
              <Option value="micro">微型企业</Option>
            </Select>

            <Select
              placeholder="产值范围"
              allowClear
              style={{ width: 140 }}
              value={filters.outputRange}
              onChange={(value) => setFilters({ ...filters, outputRange: value })}
              suffixIcon={<DollarOutlined />}
            >
              <Option value="above1b">10亿以上</Option>
              <Option value="500mto1b">5-10亿</Option>
              <Option value="100mto500m">1-5亿</Option>
              <Option value="below100m">1亿以下</Option>
            </Select>

            <Select
              placeholder="企业标签"
              allowClear
              style={{ width: 120 }}
              value={filters.tags}
              onChange={(value) => setFilters({ ...filters, tags: value })}
              suffixIcon={<TagOutlined />}
            >
              <Option value="high_tech">高新技术企业</Option>
              <Option value="scale_up">规上企业</Option>
              <Option value="class_a">A类企业</Option>
              <Option value="class_b">B类企业</Option>
            </Select>
          </Space>
        </div>
      </div>

      {/* 左侧结果面板 */}
      <div
        className="absolute left-5 z-20 transition-all duration-300"
        style={{
          top: 140,
          bottom: 20,
          width: leftPanelCollapsed ? 48 : 350,
        }}
      >
        {leftPanelCollapsed ? (
          // 折叠状态
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<MenuUnfoldOutlined />}
            onClick={() => setLeftPanelCollapsed(false)}
            className="shadow-lg"
          />
        ) : (
          // 展开状态
          <Card
            className="h-full shadow-lg flex flex-col"
            bodyStyle={{ height: '100%', padding: 0, display: 'flex', flexDirection: 'column' }}
          >
            {/* 面板头部 */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Text type="secondary">当前区域共找到</Text>
                  <div>
                    <Text strong className="text-2xl text-blue-600">
                      {enterpriseData.length}
                    </Text>
                    <Text type="secondary" className="ml-1">家企业</Text>
                  </div>
                </div>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => setLeftPanelCollapsed(true)}
                />
              </div>

              {/* 排序选项 */}
              <div className="flex items-center gap-2">
                <Text type="secondary" className="text-sm">排序:</Text>
                <Radio.Group
                  size="small"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <Radio.Button value="output">按产值</Radio.Button>
                  <Radio.Button value="tax">按税收</Radio.Button>
                  <Radio.Button value="distance">按距离</Radio.Button>
                </Radio.Group>
              </div>
            </div>

            {/* 列表区 */}
            <div className="flex-1 overflow-auto p-4">
              {sortedData.length > 0 ? (
                sortedData.map((company) => (
                  <EnterpriseCard key={company.id} company={company} />
                ))
              ) : (
                <Empty description="暂无数据" />
              )}
            </div>
          </Card>
        )}
      </div>

      {/* 右侧工具栏 */}
      <div
        className="absolute right-5 z-20 flex flex-col gap-3"
        style={{ bottom: 80 }}
      >
        {/* 框选查询 */}
        <Tooltip title={polygonMode ? '退出框选模式' : '框选查询'} placement="left">
          <Button
            type={polygonMode ? 'primary' : 'default'}
            shape="circle"
            size="large"
            icon={<BorderOutlined />}
            className="shadow-lg"
            onClick={() => setPolygonMode(!polygonMode)}
          />
        </Tooltip>

        {/* 热力图开关 */}
        <Popover
          content={
            <Space direction="vertical">
              <Text strong>热力图类型</Text>
              <Radio.Group
                value={heatMapType}
                onChange={(e) => setHeatMapType(e.target.value)}
              >
                <Radio value="density">企业密度</Radio>
                <Radio value="output">产值热力</Radio>
              </Radio.Group>
              <Button
                type={heatMapEnabled ? 'primary' : 'default'}
                size="small"
                block
                onClick={() => setHeatMapEnabled(!heatMapEnabled)}
              >
                {heatMapEnabled ? '关闭热力图' : '开启热力图'}
              </Button>
            </Space>
          }
          trigger="click"
          placement="left"
        >
          <Tooltip title="热力图" placement="left">
            <Button
              type={heatMapEnabled ? 'primary' : 'default'}
              shape="circle"
              size="large"
              icon={<HeatMapOutlined />}
              className="shadow-lg"
            />
          </Tooltip>
        </Popover>

        {/* 图层控制 */}
        <Popover
          content={
            <Checkbox.Group
              value={selectedLayers}
              onChange={setSelectedLayers}
              direction="vertical"
            >
              {layerOptions.map((layer) => (
                <Checkbox key={layer.value} value={layer.value}>
                  <Space>
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: layer.color }}
                    />
                    {layer.label}
                  </Space>
                </Checkbox>
              ))}
            </Checkbox.Group>
          }
          trigger="click"
          placement="left"
        >
          <Tooltip title="图层控制" placement="left">
            <Button
              shape="circle"
              size="large"
              icon={<DatabaseOutlined />}
              className="shadow-lg"
            />
          </Tooltip>
        </Popover>

        {/* 我的位置 */}
        <Tooltip title="我的位置" placement="left">
          <Button
            shape="circle"
            size="large"
            icon={<AimOutlined />}
            className="shadow-lg"
            onClick={() => console.log('Back to center')}
          />
        </Tooltip>
      </div>

      {/* 多边形绘制模式提示 */}
      {polygonMode && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <Card className="bg-blue-50 border-blue-200">
            <div className="text-center">
              <Text strong className="text-blue-600 block mb-2">
                框选查询模式
              </Text>
              <Text type="secondary" className="text-sm">
                请在地图上点击绘制多边形区域
              </Text>
              <div className="mt-3">
                <Button
                  size="small"
                  onClick={() => setPolygonMode(false)}
                >
                  退出模式
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InvestmentMap;
