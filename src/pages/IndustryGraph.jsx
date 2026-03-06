import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
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
  BankOutlined,
  RightOutlined,
  TeamOutlined,
  ApartmentOutlined,
  ShopOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { industryChains, industryChainStats, getAllNodePaths } from '../mock/industryChainMock';
import TreeNode from '../components/industry/TreeNode';

const { Search } = Input;
const { TabPane } = Tabs;
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

// 格式化数字
const formatNum = (n) => n >= 10000 ? (n / 10000).toFixed(1) + '万' : n.toLocaleString();

export default function IndustryGraph() {
  // 状态管理
  const [selectedChainId, setSelectedChainId] = useState(industryChains[0]?.id);
  const [searchText, setSearchText] = useState('');
  const [treeSearchText, setTreeSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState([]);

  // 计算选中产业链
  const selectedChain = useMemo(() =>
    industryChains.find(c => c.id === selectedChainId) || industryChains[0] || {}
  , [selectedChainId]);

  // 过滤产业列表（按深圳企业数量降序排列）
  const filteredChains = useMemo(() => {
    const chains = searchText 
      ? industryChains.filter(c => c.name.includes(searchText)) 
      : [...industryChains];
    // 按深圳企业数量降序排列
    return chains.sort((a, b) => b.stats.shenzhenCount - a.stats.shenzhenCount);
  }, [searchText]);

  // 搜索树节点
  const searchResults = useMemo(() => {
    if (!treeSearchText || !selectedChainId) return [];
    const paths = getAllNodePaths(selectedChainId);
    return paths.filter(p => 
      p.name.toLowerCase().includes(treeSearchText.toLowerCase())
    );
  }, [treeSearchText, selectedChainId]);

  // 处理展开/收起
  const handleToggle = useCallback((nodeId) => {
    setExpandedKeys(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  }, []);

  // 处理节点选择
  const handleSelectNode = useCallback((node) => {
    setSelectedNodeId(node.id);
    setActiveTab('enterprises');
  }, []);

  // 获取选中节点的企业列表
  const getNodeEnterprises = () => {
    if (!selectedNodeId) return [];
    // 查找节点数据
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
    
    // 根据层级确定类型
    const getTypeByLevel = (id) => {
      const parts = id.split('-');
      return parts.length <= 2 ? 'industry' : parts.length === 3 ? 'segment' : 'product';
    };
    
    return generateEnterprises(node.enterpriseCount || 10, getTypeByLevel(selectedNodeId));
  };

  // 展开全部
  const expandAll = useCallback(() => {
    const allIds = [];
    const collectIds = (nodes) => {
      nodes.forEach(node => {
        if (node.children?.length > 0) {
          allIds.push(node.id);
          collectIds(node.children);
        }
      });
    };
    collectIds(selectedChain.hierarchy || []);
    setExpandedKeys(allIds);
  }, [selectedChain]);

  // 收起全部
  const collapseAll = useCallback(() => {
    setExpandedKeys([]);
  }, []);

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
              setExpandedKeys([]);
              setActiveTab('overview');
            }}
            className={`
              py-4 px-3 cursor-pointer transition-all
              ${selectedChainId === chain.id
                ? 'bg-blue-50'
                : 'bg-white hover:bg-gray-50'
              }
            `}
          >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* 序号 */}
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
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
                        缺失产业：{missingIndustries.join('、')}
                      </div>
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
        </div>
      ))}
    </div>
  );

  // 渲染树形层级
  const renderTree = () => {
    if (!selectedChain?.hierarchy?.length) {
      return <Empty description="暂无数据" />;
    }

    // 如果有搜索结果，高亮显示
    const highlightIds = searchResults.map(r => r.id);

    return (
      <div className="tree-container">
        {/* 树搜索和操作栏 */}
        <div className="flex items-center gap-2 mb-4">
          <Search
            placeholder="搜索节点..."
            allowClear
            size="small"
            value={treeSearchText}
            onChange={e => setTreeSearchText(e.target.value)}
            className="flex-1"
          />
          <Button size="small" onClick={expandAll}>展开全部</Button>
          <Button size="small" onClick={collapseAll}>收起全部</Button>
        </div>

        {/* 搜索结果提示 */}
        {treeSearchText && (
          <div className="mb-3 px-3 py-2 bg-blue-50 rounded text-sm text-blue-700">
            找到 {searchResults.length} 个匹配项
          </div>
        )}

        {/* 树节点 */}
        <div className="space-y-1">
          {selectedChain.hierarchy.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              chainColor={selectedChain.color}
              expandedKeys={expandedKeys}
              selectedKey={selectedNodeId}
              onToggle={handleToggle}
              onSelect={handleSelectNode}
              searchHighlight={highlightIds}
            />
          ))}
        </div>
      </div>
    );
  };

  const nodeEnterprises = getNodeEnterprises();

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

  // 右侧内容区域 ref，用于滚动控制
  const rightContentRef = useRef(null);

  // 区域选择状态
  const [region, setRegion] = useState('全市');

  // 当选择产业链时，自动滚动右侧内容区域到顶部
  useEffect(() => {
    if (rightContentRef.current) {
      rightContentRef.current.scrollTop = 0;
    }
  }, [selectedChainId]);

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
    // 计算产业总数
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
          bodyStyle={{ padding: 0, height: '100%' }}
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
          className="flex-1"
          bodyStyle={{ padding: 0 }}
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
          <div 
            ref={rightContentRef}
            style={{ height: 'calc(100% - 57px)', overflow: 'auto', padding: 16 }}
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
                  <Space size="middle">
                    <Tag color={selectedChain?.color} style={{ fontSize: '12px', padding: '2px 8px' }}>
                      深圳: {formatNum(selectedChain?.stats?.shenzhenCount || 0)}
                    </Tag>
                    <Tag style={{ fontSize: '12px', padding: '2px 8px' }}>
                      全国: {formatNum(selectedChain?.stats?.nationalCount || 0)}
                    </Tag>
                    <Tag color="blue" style={{ fontSize: '12px', padding: '2px 8px' }}>
                      占比: {selectedChain?.stats?.percentage || 0}%
                    </Tag>
                  </Space>
                </div>
              </Card>

              {/* 树形层级结构 */}
              {renderTree()}
            </TabPane>

            <TabPane
              tab={selectedNodeInfo ? `${selectedNodeInfo.name} - 企业清单` : '企业清单'}
              key="enterprises"
              disabled={!selectedNodeId}
            >
              {selectedNodeInfo ? (
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
              )}
            </TabPane>
          </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}
