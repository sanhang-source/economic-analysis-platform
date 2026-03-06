import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Card,
  Input,
  Table,
  Tag,
  Space,
  Button,
  Tabs,
  Empty,
  Select,
} from 'antd';
import {
  SearchOutlined,
  TeamOutlined,
  ApartmentOutlined,
  ShopOutlined,
  ShoppingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  RightOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { industryChains, industryChainStats } from '../mock/industryChainMock';
import IndustryFlowGraph from '../components/industry/IndustryFlowGraph/index.jsx';

const { Search } = Input;

const { Option } = Select;

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
      creditCode: `91440300${Math.random().toString().slice(2, 10)}`,
      industry: suffix,
      scale: ['大型', '中型', '小型'][Math.floor(Math.random() * 3)],
      status: Math.random() > 0.1 ? '存续' : '注销',
    };
  });
};

// 格式化数字
const formatNum = (n) => n >= 10000 ? (n / 10000).toFixed(1) + '万' : n.toLocaleString();

export default function IndustryGraph() {
  // 状态管理
  const [selectedChainId, setSelectedChainId] = useState(industryChains[0]?.id);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('flow');
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // 计算选中产业链
  const selectedChain = useMemo(() =>
    industryChains.find(c => c.id === selectedChainId) || industryChains[0] || {}
  , [selectedChainId]);

  // 转换为 React Flow 所需的数据格式（四级结构）
  const flowGraphData = useMemo(() => {
    if (!selectedChain?.hierarchy) return null;

    const root = {
      name: selectedChain.name,
      shenzhen: selectedChain.stats?.shenzhenCount || 0,
      national: selectedChain.stats?.nationalCount || 0,
      percentage: selectedChain.stats?.percentage || 0,
    };

    // 三级结构：细分产业 → 细分行业 → 产品服务
    // hierarchy 数组包含所有细分产业（通信设备、终端设备、光通信等）
    // 每个细分产业的 children 是细分行业
    // 每个细分行业的 children 是产品服务
    const segments = selectedChain.hierarchy?.map(industry => ({
      name: industry.name,
      shenzhen: industry.enterpriseCount || 0,
      national: Math.round((industry.enterpriseCount || 0) / 0.635),
      percentage: 63.5,
      // 细分行业列表
      subSegments: industry.children?.map(subSegment => ({
        name: subSegment.name,
        shenzhen: Math.round(subSegment.enterpriseCount * 0.635),
        national: subSegment.enterpriseCount || 0,
        percentage: 63.5,
        // 产品服务列表
        products: subSegment.children?.map(product => ({
          name: product.name,
          shenzhen: Math.round(product.enterpriseCount * 0.635),
          national: product.enterpriseCount || 0,
          percentage: 63.5,
        })) || [],
      })) || [],
    })) || [];

    return { root, segments };
  }, [selectedChain]);

  // 过滤产业列表（按深圳企业数量降序排列）
  const filteredChains = useMemo(() => {
    const chains = searchText 
      ? industryChains.filter(c => c.name.includes(searchText)) 
      : [...industryChains];
    return chains.sort((a, b) => b.stats.shenzhenCount - a.stats.shenzhenCount);
  }, [searchText]);

  // 处理节点选择
  const handleSelectNode = useCallback((node) => {
    setSelectedNodeId(node.id);
    setActiveTab('enterprises');
  }, []);

  // 获取选中节点的企业列表
  const getNodeEnterprises = () => {
    if (!selectedNodeId) return [];
    const findNode = (nodes) => {
      for (const node of nodes) {
        if (node.id === selectedNodeId) return node;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    const node = findNode(selectedChain.hierarchy || []);
    if (!node) return [];
    
    const getTypeByLevel = (id) => {
      const parts = id.split('-');
      return parts.length <= 2 ? 'industry' : parts.length === 3 ? 'segment' : 'product';
    };
    
    return generateEnterprises(node.enterpriseCount || 10, getTypeByLevel(selectedNodeId));
  };

  // 渲染产业列表
  const renderChainList = () => (
    <div>
      {filteredChains.map((chain, index) => (
        <div key={chain.id}>
          {/* 分隔线：不是第一个，且当前未选中，且前一个未选中 */}
          {index > 0 && selectedChainId !== chain.id && selectedChainId !== filteredChains[index - 1]?.id && (
            <div className="h-px bg-gray-200 mx-3" />
          )}
          <div
            onClick={() => {
              setSelectedChainId(chain.id);
              setSelectedNodeId(null);
              setActiveTab('flow');
            }}
            className={`
              py-3 px-3 cursor-pointer transition-all
              ${selectedChainId === chain.id
                ? 'bg-blue-50 border-l-4 border-blue-500'
                : 'hover:bg-gray-50 border-l-4 border-transparent'
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* 序号 */}
                <div 
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                  {index + 1}
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: chain.color }}
                >
                  {chain.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{chain.name}</div>
                  {/* 显示缺失产业 */}
                  {(() => {
                    const missingIndustries = chain.hierarchy
                      ?.filter(item => item.enterpriseCount === 0)
                      ?.map(item => item.name);
                    if (missingIndustries?.length > 0) {
                      return (
                        <div className="text-xs text-orange-500 mt-1">
                          缺失产业：{missingIndustries.join('、')}</div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
              <RightOutlined className="text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white rounded p-2">
                <div className="text-sm font-bold" style={{ color: chain.color }}>
                  {formatNum(chain.stats.shenzhenCount)}</div>
                <div className="text-xs text-gray-500">
                  深圳企业</div>
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
        </div>
      ))}
    </div>
  );

  // 获取当前选中的节点信息
  const selectedNodeInfo = useMemo(() => {
    if (!selectedNodeId || !selectedChain?.hierarchy) return null;
    
    const findNode = (nodes) => {
      for (const node of nodes) {
        if (node.id === selectedNodeId) return node;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findNode(selectedChain.hierarchy);
  }, [selectedNodeId, selectedChain]);

  const nodeEnterprises = getNodeEnterprises();

  // 区域选择状态
  const [region, setRegion] = useState('全市');

  // 区域选项（与数字驾驶舱一致）
  const regionOptions = [
    { value: '全市', label: '全市' },
    { value: '南山区', label: '南山区' },
    { value: '福田区', label: '福田区' },
    { value: '宝安区', label: '宝安区' },
    { value: '龙岗区', label: '龙岗区' },
    { value: '龙华区', label: '龙华区' },
    { value: '罗湖区', label: '罗湖区' },
    { value: '光明区', label: '光明区' },
    { value: '盐田区', label: '盐田区' },
    { value: '坪山区', label: '坪山区' },
  ];

  // 计算统计数据
  const stats = useMemo(() => {
    let totalIndustries = 0;
    let totalSegments = 0;
    let totalProducts = 0;
    
    industryChains.forEach(chain => {
      chain.hierarchy?.forEach(industry => {
        totalIndustries++;
        industry.children?.forEach(segment => {
          totalSegments++;
          segment.children?.forEach(() => {
            totalProducts++;
          });
        });
      });
    });
    
    return {
      chainCount: industryChains.length,
      industryCount: totalIndustries,
      segmentCount: totalSegments,
      productCount: totalProducts,
      shenzhenEnterprises: industryChainStats.totalShenzhenEnterprises,
      nationalEnterprises: industryChainStats.totalNationalEnterprises,
      avgPercentage: industryChainStats.averagePercentage,
    };
  }, []);

  // 统计卡片组件
  const StatCard = ({ title, value, unit, color, icon }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-500 text-sm mb-1">{title}</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold" style={{ color }}>{value}</span>
            <span className="text-xs text-gray-400">{unit}</span>
          </div>
        </div>
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  // 企业表格列定义
  const enterpriseColumns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'creditCode',
      key: 'creditCode',
    },
    {
      title: '所属细分',
      dataIndex: 'industry',
      key: 'industry',
      render: (text) => <Tag size="small">{text}</Tag>,
    },
    {
      title: '企业规模',
      dataIndex: 'scale',
      key: 'scale',
      render: (text) => {
        const colors = { '大型': 'blue', '中型': 'green', '小型': 'orange' };
        return <Tag color={colors[text]}>{text}</Tag>;
      },
    },
    {
      title: '经营状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag color={text === '存续' ? 'success' : 'default'}>{text}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link" size="small">详情</Button>
      ),
    },
  ];

  // 企业表格组件
  const EnterpriseTable = ({ data }) => (
    <Table
      columns={enterpriseColumns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
      size="small"
    />
  );

  return (
    <div className="h-full flex flex-col">
      {/* 页面标题和区域选择 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">区域产业</h1>
          <p className="text-gray-500 text-sm mt-1">
            分析区域产业结构，洞察产业发展态势
          </p>
        </div>
        <Select value={region} onChange={setRegion} style={{ width: 120 }}>
          {regionOptions.map(option => (
            <Option key={option.value} value={option.value}>{option.label}</Option>
          ))}
        </Select>
      </div>

      {/* 数据概览卡片 */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        <StatCard
          title="产业链"
          value={stats.chainCount}
          unit="条"
          color="#1677ff"
          icon={<ApartmentOutlined />}
        />
        <StatCard
          title="细分产业"
          value={stats.industryCount}
          unit="个"
          color="#52c41a"
          icon={<ShopOutlined />}
        />
        <StatCard
          title="细分行业"
          value={stats.segmentCount}
          unit="个"
          color="#fa8c16"
          icon={<ShoppingOutlined />}
        />
        <StatCard
          title="产品服务"
          value={stats.productCount}
          unit="个"
          color="#722ed1"
          icon={<ShoppingOutlined />}
        />
        <StatCard
          title="覆盖企业"
          value={(stats.shenzhenEnterprises / 10000).toFixed(1)}
          unit="万家"
          color="#1890ff"
          icon={<TeamOutlined />}
        />
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Sidebar */}
        <Card
          className="w-80 flex-shrink-0"
          styles={{ body: { padding: 0, height: '100%' } }}
          title="产业链列表"
        >
          <div className="p-3 border-b">
            <Search
              placeholder="搜索产业链"
              allowClear
              size="small"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="overflow-auto p-3" style={{ maxHeight: '640px' }}>
            {renderChainList()}
          </div>
        </Card>

        {/* Right Content */}
        <Card
          className="flex-1 min-h-0"
          styles={{ body: { padding: 0, height: '100%', minHeight: '500px' } }}
          title={
            <div className="flex items-center justify-between">
              <span className="font-semibold">{selectedChain?.name} - 区域产业结构</span>
              {selectedNodeInfo && (
                <Button type="primary" size="small" onClick={() => setActiveTab('enterprises')}>
                  <TeamOutlined /> 查看企业清单
                </Button>
              )}
            </div>
          }
        >
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            style={{ height: '100%' }}
            className="h-full"
            items={[
              {
                key: 'flow',
                label: '横向分布图',
                style: { height: 'calc(100% - 44px)', overflow: 'auto' },
                children: (
                  <div style={{ width: '100%', minWidth: '900px', padding: '12px' }}>
                    <IndustryFlowGraph data={flowGraphData} />
                  </div>
                ),
              },
              {
                key: 'enterprises',
                label: selectedNodeInfo ? `${selectedNodeInfo.name} - 企业清单` : '企业清单',
                disabled: !selectedNodeId,
                style: { height: 'calc(100% - 44px)', padding: 16, overflow: 'auto' },
                children: selectedNodeInfo ? (
                  <div>
                    <Card size="small" className="mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {selectedNodeInfo.id?.split('-').length <= 2 ? (
                            <ApartmentOutlined style={{ color: selectedChain?.color, fontSize: 20 }} />
                          ) : selectedNodeInfo.id?.split('-').length === 3 ? (
                            <ShopOutlined style={{ color: '#52c41a', fontSize: 20 }} />
                          ) : (
                            <ShoppingOutlined style={{ color: '#fa8c16', fontSize: 20 }} />
                          )}
                          <span className="font-semibold text-lg">{selectedNodeInfo.name}</span>
                        </div>
                        <Space size="middle">
                          <Tag color={selectedChain?.color} style={{ fontSize: '12px', padding: '2px 8px' }}>
                            深圳: {Math.round(selectedNodeInfo.enterpriseCount * 0.635).toLocaleString()}
                          </Tag>
                          <Tag style={{ fontSize: '12px', padding: '2px 8px' }}>
                            全国: {selectedNodeInfo.enterpriseCount.toLocaleString()}
                          </Tag>
                          <Tag color="blue" style={{ fontSize: '12px', padding: '2px 8px' }}>
                            占比: 63.5%
                          </Tag>
                        </Space>
                      </div>
                    </Card>
                    <EnterpriseTable data={nodeEnterprises} />
                  </div>
                ) : (
                  <Empty description="请点击层级节点查看企业清单" />
                ),
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
