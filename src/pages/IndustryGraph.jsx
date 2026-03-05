import React, { useState, useMemo } from 'react';
import {
  Card,
  Input,
  Table,
  Tag,
  Space,
  Collapse,
  Badge,
  Button,
  Tabs,
  Empty
} from 'antd';
import {
  SearchOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  BankOutlined,
  ShopOutlined,
  ShoppingOutlined,
  DownOutlined,
  RightOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { industryChains, industryChainStats } from '../mock/industryChainMock';

const { Search } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;

// 生成企业列表数据
const generateEnterprises = (count, type) => {
  const prefixes = ['深圳', '广东', '华南', '南方', '鹏城', '宝安', '南山', '龙岗'];
  const suffixes = {
    chain: ['科技有限公司', '股份有限公司', '集团有限公司', '实业有限公司'],
    industry: ['通信设备', '电子科技', '网络技术', '信息工程', '智能制造'],
    segment: ['基站设备', '终端制造', '芯片设计', '软件开发', '系统集成'],
    product: ['产品制造', '技术服务', '解决方案', '研发中心', '生产基地']
  };

  return Array.from({ length: Math.min(count, 10) }, (_, i) => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[type][Math.floor(Math.random() * suffixes[type].length)];
    const name = `${prefix}${suffix}${i + 1}号`;
    return {
      key: i,
      name: name,
      location: Math.random() > 0.3 ? '深圳市' : ['广州市', '东莞市', '惠州市', '上海市'][Math.floor(Math.random() * 4)],
      type: Math.random() > 0.5 ? '生产企业' : '服务企业',
      scale: ['大型', '中型', '小型'][Math.floor(Math.random() * 3)],
      registeredCapital: Math.floor(Math.random() * 9000 + 1000) + '万',
      establishedYear: 2000 + Math.floor(Math.random() * 24),
      isShenzhen: Math.random() > 0.3
    };
  });
};

// 企业列表表格
const EnterpriseTable = ({ data }) => {
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <BankOutlined className="text-gray-400" />
          <span className="font-medium">{text}</span>
          {record.isShenzhen && <Tag color="blue" size="small">深圳</Tag>}
        </Space>
      )
    },
    {
      title: '所在地区',
      dataIndex: 'location',
      key: 'location',
      width: 100
    },
    {
      title: '企业类型',
      dataIndex: 'type',
      key: 'type',
      width: 90,
      render: (type) => <Tag size="small">{type}</Tag>
    },
    {
      title: '规模',
      dataIndex: 'scale',
      key: 'scale',
      width: 80,
      render: (scale) => {
        const colors = { '大型': 'red', '中型': 'orange', '小型': 'green' };
        return <Tag color={colors[scale]} size="small">{scale}</Tag>;
      }
    },
    {
      title: '注册资本',
      dataIndex: 'registeredCapital',
      key: 'registeredCapital',
      width: 100
    },
    {
      title: '成立年份',
      dataIndex: 'establishedYear',
      key: 'establishedYear',
      width: 90
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
      scroll={{ x: 'max-content' }}
    />
  );
};

// 统计标签组件
const StatTags = ({ shenzhenCount, nationalCount, percentage, color }) => {
  const formatNum = (n) => n >= 10000 ? (n / 10000).toFixed(1) + '万' : n.toLocaleString();

  return (
    <Space size="middle">
      <Tag color={color} style={{ fontSize: '12px', padding: '2px 8px' }}>
        深圳: {formatNum(shenzhenCount)}
      </Tag>
      <Tag style={{ fontSize: '12px', padding: '2px 8px' }}>
        全国: {formatNum(nationalCount)}
      </Tag>
      <Tag color="blue" style={{ fontSize: '12px', padding: '2px 8px' }}>
        占比: {percentage}%
      </Tag>
    </Space>
  );
};

export default function IndustryGraph() {
  const [selectedChainId, setSelectedChainId] = useState(industryChains[0]?.id);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNode, setSelectedNode] = useState(null);

  const selectedChain = useMemo(() =>
    industryChains.find(c => c.id === selectedChainId) || industryChains[0] || {}
  , [selectedChainId]);

  const filteredChains = useMemo(() =>
    searchText ? industryChains.filter(c => c.name.includes(searchText)) : industryChains
  , [searchText]);

  const formatNum = (n) => n >= 10000 ? (n / 10000).toFixed(1) + '万' : n.toLocaleString();

  // 计算统计数据
  const calculateStats = (enterpriseCount) => {
    const percentage = selectedChain?.stats?.percentage || 0;
    const shenzhenCount = Math.round(enterpriseCount * (percentage / 100));
    return { shenzhenCount, nationalCount: enterpriseCount, percentage };
  };

  // 处理节点点击
  const handleNodeClick = (node, type) => {
    setSelectedNode({ ...node, type });
    setActiveTab('enterprises');
  };

  // 获取选中节点的企业列表
  const getNodeEnterprises = () => {
    if (!selectedNode) return [];
    return generateEnterprises(selectedNode.enterpriseCount || 10, selectedNode.type);
  };

  // 渲染产品服务层级
  const renderProducts = (products, parentColor) => {
    if (!products?.length) return null;

    return (
      <div className="ml-8 mt-2 space-y-2">
        {products.map((product, idx) => {
          const stats = calculateStats(product.enterpriseCount);
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100 hover:border-orange-300 hover:shadow-sm cursor-pointer transition-all"
              onClick={() => handleNodeClick(product, 'product')}
            >
              <div className="flex items-center gap-3">
                <ShoppingOutlined className="text-orange-500" />
                <span className="font-medium text-gray-800">{product.name}</span>
              </div>
              <StatTags {...stats} color="#fa8c16" />
            </div>
          );
        })}
      </div>
    );
  };

  // 渲染细分行业层级
  const renderSegments = (segments, parentColor) => {
    if (!segments?.length) return null;

    return (
      <div className="ml-6 mt-2 space-y-2">
        {segments.map((segment, idx) => {
          const stats = calculateStats(segment.enterpriseCount);
          const hasChildren = segment.children?.length > 0;

          return (
            <div key={idx} className="border-l-2 border-green-200 pl-4">
              <div
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 hover:border-green-300 hover:shadow-sm cursor-pointer transition-all"
                onClick={() => handleNodeClick(segment, 'segment')}
              >
                <div className="flex items-center gap-3">
                  <ShopOutlined className="text-green-600" />
                  <span className="font-medium text-gray-800">{segment.name}</span>
                  {hasChildren && (
                    <Badge count={segment.children.length} style={{ backgroundColor: '#52c41a' }} />
                  )}
                </div>
                <StatTags {...stats} color="#52c41a" />
              </div>
              {hasChildren && renderProducts(segment.children, parentColor)}
            </div>
          );
        })}
      </div>
    );
  };

  // 渲染产业层级
  const renderIndustries = () => {
    if (!selectedChain?.hierarchy?.length) {
      return <Empty description="暂无数据" />;
    }

    return (
      <div className="space-y-4">
        {selectedChain.hierarchy.map((industry, idx) => {
          const stats = calculateStats(industry.enterpriseCount);
          const hasChildren = industry.children?.length > 0;

          return (
            <Card
              key={idx}
              size="small"
              className="border-l-4"
              style={{ borderLeftColor: selectedChain.color }}
              title={
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ApartmentOutlined style={{ color: selectedChain.color, fontSize: 18 }} />
                    <span className="font-semibold text-gray-800">{industry.name}</span>
                    {hasChildren && (
                      <Badge count={industry.children.length} style={{ backgroundColor: selectedChain.color }} />
                    )}
                  </div>
                  <StatTags {...stats} color={selectedChain.color} />
                </div>
              }
            >
              {hasChildren && renderSegments(industry.children, selectedChain.color)}
            </Card>
          );
        })}
      </div>
    );
  };

  // 渲染产业链列表
  const renderChainList = () => (
    <div className="space-y-3">
      {filteredChains.map((chain) => (
        <div
          key={chain.id}
          onClick={() => { setSelectedChainId(chain.id); setSelectedNode(null); setActiveTab('overview'); }}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedChainId === chain.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                style={{ backgroundColor: chain.color }}
              >
                {chain.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{chain.name}</div>
                <div className="text-xs text-gray-500">{chain.description}</div>
              </div>
            </div>
            <RightOutlined className="text-gray-400" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white rounded p-2">
              <div className="text-sm font-bold" style={{ color: chain.color }}>
                {formatNum(chain.stats.shenzhenCount)}
              </div>
              <div className="text-xs text-gray-500">深圳企业</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-sm font-bold text-gray-700">
                {formatNum(chain.stats.nationalCount)}
              </div>
              <div className="text-xs text-gray-500">全国企业</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-sm font-bold text-blue-600">
                {chain.stats.percentage}%
              </div>
              <div className="text-xs text-gray-500">深圳占比</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const nodeEnterprises = getNodeEnterprises();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <GlobalOutlined className="text-blue-500" />
          产业链图谱
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          共 <span className="text-blue-600 font-semibold">{industryChainStats.totalChains}</span> 个产业链，
          覆盖 <span className="text-blue-600 font-semibold">{formatNum(industryChainStats.totalShenzhenEnterprises)}</span> 家深圳企业
        </p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Sidebar */}
        <Card
          className="w-80 flex-shrink-0"
          bodyStyle={{ padding: 0, height: '100%' }}
          title="产业链列表"
        >
          <div className="p-3 border-b">
            <Search
              placeholder="搜索产业链..."
              allowClear
              size="small"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="overflow-auto h-[calc(100%-60px)] p-3">
            {renderChainList()}
          </div>
        </Card>

        {/* Right Content */}
        <Card
          className="flex-1"
          bodyStyle={{ padding: 16, height: 'calc(100% - 57px)', overflow: 'auto' }}
          title={
            <div className="flex items-center justify-between">
              <span className="font-semibold">{selectedChain?.name} - 产业层级结构</span>
              {selectedNode && (
                <Button type="primary" size="small" onClick={() => setActiveTab('enterprises')}>
                  <TeamOutlined /> 查看企业清单
                </Button>
              )}
            </div>
          }
        >
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="层级概览" key="overview">
              {/* 产业链总体统计 */}
              <Card size="small" className="mb-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: selectedChain?.color || '#1677ff' }}
                    >
                      {selectedChain?.name?.charAt(0) || '-'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{selectedChain?.name || '-'}</div>
                      <div className="text-xs text-gray-500">{selectedChain?.description || ''}</div>
                    </div>
                  </div>
                  <StatTags
                    shenzhenCount={selectedChain?.stats?.shenzhenCount || 0}
                    nationalCount={selectedChain?.stats?.nationalCount || 0}
                    percentage={selectedChain?.stats?.percentage || 0}
                    color={selectedChain?.color || '#1677ff'}
                  />
                </div>
              </Card>

              {/* 树形层级结构 */}
              {renderIndustries()}
            </TabPane>

            <TabPane
              tab={selectedNode ? `${selectedNode.name} - 企业清单` : '企业清单'}
              key="enterprises"
              disabled={!selectedNode}
            >
              {selectedNode ? (
                <div>
                  <Card size="small" className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {selectedNode.type === 'industry' && <ApartmentOutlined style={{ color: selectedChain?.color, fontSize: 20 }} />}
                        {selectedNode.type === 'segment' && <ShopOutlined style={{ color: '#52c41a', fontSize: 20 }} />}
                        {selectedNode.type === 'product' && <ShoppingOutlined style={{ color: '#fa8c16', fontSize: 20 }} />}
                        <span className="font-semibold text-lg">{selectedNode.name}</span>
                      </div>
                      <StatTags
                        {...calculateStats(selectedNode.enterpriseCount)}
                        color={selectedNode.type === 'industry' ? selectedChain?.color : selectedNode.type === 'segment' ? '#52c41a' : '#fa8c16'}
                      />
                    </div>
                  </Card>
                  <EnterpriseTable data={nodeEnterprises} />
                </div>
              ) : (
                <Empty description="请点击层级节点查看企业清单" />
              )}
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
