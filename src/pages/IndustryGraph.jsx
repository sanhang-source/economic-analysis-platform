import React, { useState, useMemo, useCallback } from 'react';
import {
  Card,
  Input,
  Tag,
  Space,
  Button,
  Tabs,
  Empty,
  Select,
  Checkbox,
} from 'antd';

import {
  SearchOutlined,
  ApartmentOutlined,
  ShopOutlined,
  ShoppingOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { industryChains, industryChainStats } from '../mock/industryChainMock';
import { enterprises } from '../mock/enterpriseMock';
import IndustryFlowGraph from '../components/industry/IndustryFlowGraph/index.jsx';
import EnterpriseTable from '../components/enterprise/EnterpriseTable.jsx';

const { Option } = Select;

// 格式化数字
const formatNum = (n) => n >= 10000 ? (n / 10000).toFixed(1) + '万' : n.toLocaleString();

// 统计卡片组件 - 移出主组件避免重复创建
const StatCard = React.memo(({ title, value, unit, color, icon }) => (
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
));

export default function IndustryGraph() {
  // 状态管理
  const [selectedChainId, setSelectedChainId] = useState(industryChains[0]?.id);
  const [searchText, setSearchText] = useState('');

  // 产业列表排序和筛选状态
  const [sortConfig, setSortConfig] = useState({
    field: 'shenzhenCount', // 'shenzhenCount' | 'percentage'
    order: 'desc' // 'asc' | 'desc'
  });
  const [showMissingOnly, setShowMissingOnly] = useState(false); // 是否只显示有缺失产业的产业

  const [activeTab, setActiveTab] = useState('flow');
  // 默认选中产业链根节点
  const defaultChain = industryChains[0];
  const [selectedNodeId, setSelectedNodeId] = useState('chain-root');
  const [selectedNodeData, setSelectedNodeData] = useState({
    id: 'chain-root',
    name: defaultChain?.name || '',
    shenzhen: defaultChain?.stats?.shenzhenCount || 0,
    national: defaultChain?.stats?.nationalCount || 0,
    percentage: defaultChain?.stats?.percentage || 0
  });

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
    
    // 辅助函数：计算占比（深圳企业/全国企业），保留1位小数
    const calcPercentage = (shenzhen, national) => {
      if (!national || national === 0) return 0;
      return parseFloat(((shenzhen / national) * 100).toFixed(1));
    };
    
    const segments = selectedChain.hierarchy?.map(industry => {
      // 优先使用 shenzhenCount/nationalCount 字段
      const shenzhen = industry.shenzhenCount !== undefined ? industry.shenzhenCount : (industry.enterpriseCount || 0);
      const national = industry.nationalCount !== undefined ? industry.nationalCount : (industry.enterpriseCount || shenzhen);
      return {
        name: industry.name,
        shenzhen,
        national,
        percentage: calcPercentage(shenzhen, national),
        // 细分行业列表
        subSegments: industry.children?.map(subSegment => {
          const subShenzhen = subSegment.shenzhenCount !== undefined ? subSegment.shenzhenCount : (subSegment.enterpriseCount || 0);
          const subNational = subSegment.nationalCount !== undefined ? subSegment.nationalCount : (subSegment.enterpriseCount || subShenzhen);
          return {
            name: subSegment.name,
            shenzhen: subShenzhen,
            national: subNational,
            percentage: calcPercentage(subShenzhen, subNational),
            // 产品服务列表
            products: subSegment.children?.map(product => {
              const prodShenzhen = product.shenzhenCount !== undefined ? product.shenzhenCount : (product.enterpriseCount || 0);
              const prodNational = product.nationalCount !== undefined ? product.nationalCount : (product.enterpriseCount || prodShenzhen);
              return {
                name: product.name,
                shenzhen: prodShenzhen,
                national: prodNational,
                percentage: calcPercentage(prodShenzhen, prodNational),
              };
            }) || [],
          };
        }) || [],
      };
    }) || [];

    return { root, segments };
  }, [selectedChain]);

  // 过滤、排序产业列表
  const filteredChains = useMemo(() => {
    let chains = searchText 
      ? industryChains.filter(c => c.name.includes(searchText)) 
      : [...industryChains];

    // 筛选：只显示有缺失产业的产业（递归检查所有层级节点）
    if (showMissingOnly) {
      chains = chains.filter(chain => {
        // 递归检查所有节点
        const checkHasMissing = (nodes) => {
          if (!nodes) return false;
          for (const node of nodes) {
            // 检查当前节点的 shenzhenCount 或 enterpriseCount
            const shenzhenCount = node.shenzhenCount !== undefined ? node.shenzhenCount : node.enterpriseCount;
            if (shenzhenCount === 0) {
              return true;
            }
            // 递归检查子节点
            if (node.children && node.children.length > 0) {
              if (checkHasMissing(node.children)) {
                return true;
              }
            }
          }
          return false;
        };
        return checkHasMissing(chain.hierarchy);
      });
    }

    // 排序
    chains.sort((a, b) => {
      let comparison = 0;
      if (sortConfig.field === 'shenzhenCount') {
        comparison = a.stats.shenzhenCount - b.stats.shenzhenCount;
      } else if (sortConfig.field === 'percentage') {
        comparison = a.stats.percentage - b.stats.percentage;
      }
      return sortConfig.order === 'asc' ? comparison : -comparison;
    });

    return chains;
  }, [searchText, sortConfig, showMissingOnly]);

  // 处理节点选择
  const handleSelectNode = useCallback((node) => {
    // node 包含 { id, name, type, data }
    setSelectedNodeId(node.id);
    setSelectedNodeData(node.data);
    setActiveTab('enterprises');
  }, []);

  // 获取选中节点的企业列表 - 使用 useMemo 优化
  const nodeEnterprises = useMemo(() => {
    if (!selectedNodeId || !selectedNodeData) return [];
    
    const nodeName = selectedNodeData.name;
    
    // 根据节点名称筛选企业（企业数据中包含该节点名称即匹配）
    const filtered = enterprises.filter(ent => {
      return ent.belongsTo.some(belong => {
        return Object.values(belong).includes(nodeName);
      });
    });
    
    // 如果没找到匹配的企业，返回所有企业（用于展示）
    return filtered.length > 0 ? filtered : enterprises;
  }, [selectedNodeId, selectedNodeData]);

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
              // 默认选中产业链根节点
              setSelectedNodeId('chain-root');
              setSelectedNodeData({
                id: 'chain-root',
                name: chain.name,
                shenzhen: chain.stats?.shenzhenCount || 0,
                national: chain.stats?.nationalCount || 0,
                percentage: chain.stats?.percentage || 0
              });
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
                  {/* 显示缺失产业 - 递归遍历所有层级节点 */}
                  {(() => {
                    const missingNames = [];
                    // 递归遍历所有节点
                    const traverse = (nodes) => {
                      if (!nodes) return;
                      for (const node of nodes) {
                        // 检查当前节点的 shenzhenCount 或 enterpriseCount
                        const shenzhenCount = node.shenzhenCount !== undefined ? node.shenzhenCount : node.enterpriseCount;
                        if (shenzhenCount === 0) {
                          missingNames.push(node.name);
                        }
                        // 递归检查子节点
                        if (node.children && node.children.length > 0) {
                          traverse(node.children);
                        }
                      }
                    };
                    traverse(chain.hierarchy);
                    
                    if (missingNames.length > 0) {
                      return (
                        <div className="text-xs text-orange-500 mt-1">
                          缺失产业：{missingNames.join('、')}
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
    if (!selectedNodeId || !selectedNodeData || !selectedChain) return null;
    
    // 构建完整路径名称
    const buildPathName = () => {
      const parts = [selectedChain.name]; // 母节点（产业链）
      
      if (selectedNodeId === 'chain-root') {
        return parts.join(' - ');
      }
      
      // 解析ID：segment-x, subsegment-x-y, product-x-y-z
      const idParts = selectedNodeId.split('-');
      
      if (idParts[0] === 'segment' && selectedChain.hierarchy) {
        const sIndex = parseInt(idParts[1]);
        const segment = selectedChain.hierarchy[sIndex];
        if (segment) parts.push(segment.name);
      } else if (idParts[0] === 'subsegment' && selectedChain.hierarchy) {
        const sIndex = parseInt(idParts[1]);
        const ssIndex = parseInt(idParts[2]);
        const segment = selectedChain.hierarchy[sIndex];
        if (segment) {
          parts.push(segment.name);
          if (segment.children && segment.children[ssIndex]) {
            parts.push(segment.children[ssIndex].name);
          }
        }
      } else if (idParts[0] === 'product' && selectedChain.hierarchy) {
        const sIndex = parseInt(idParts[1]);
        const ssIndex = parseInt(idParts[2]);
        const pIndex = parseInt(idParts[3]);
        const segment = selectedChain.hierarchy[sIndex];
        if (segment) {
          parts.push(segment.name);
          if (segment.children && segment.children[ssIndex]) {
            parts.push(segment.children[ssIndex].name);
            const subSegment = segment.children[ssIndex];
            if (subSegment.children && subSegment.children[pIndex]) {
              parts.push(subSegment.children[pIndex].name);
            }
          }
        }
      }
      
      return parts.join(' - ');
    };
    
    // 从 selectedNodeData 构建节点信息
    return {
      id: selectedNodeId,
      name: selectedNodeData.name,
      pathName: buildPathName(),
      enterpriseCount: selectedNodeData.shenzhen !== undefined ? selectedNodeData.shenzhen : selectedNodeData.enterpriseCount,
      ...selectedNodeData
    };
  }, [selectedNodeId, selectedNodeData, selectedChain]);

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
  }, [industryChains, industryChainStats]);

  return (
    <div>
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
          title="产业"
          value={stats.chainCount}
          unit="个"
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
          icon={<ApartmentOutlined />}
        />
      </div>

      <div className="flex gap-4 items-stretch" style={{ width: '100%', minWidth: 0 }}>
        {/* Left Sidebar */}
        <Card
          className="w-80 flex-shrink-0"
          style={{ maxHeight: 800 }}
          styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column', maxHeight: 743, overflow: 'hidden' } }}
          title="产业列表"
        >
          <div className="p-4 border-b space-y-2 flex-shrink-0">
            <Input
              placeholder="搜索产业"
              allowClear
              size="small"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
            {/* 排序和筛选 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 数量排序 */}
                <span
                  onClick={() => {
                    setSortConfig(prev => ({
                      field: 'shenzhenCount',
                      order: prev.field === 'shenzhenCount' && prev.order === 'desc' ? 'asc' : 'desc'
                    }));
                  }}
                  className={`text-xs cursor-pointer transition-colors ${
                    sortConfig.field === 'shenzhenCount' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  数量
                  {sortConfig.field === 'shenzhenCount' && (
                    <span className="ml-1">{sortConfig.order === 'desc' ? '↓' : '↑'}</span>
                  )}
                </span>
                {/* 占比排序 */}
                <span
                  onClick={() => {
                    setSortConfig(prev => ({
                      field: 'percentage',
                      order: prev.field === 'percentage' && prev.order === 'desc' ? 'asc' : 'desc'
                    }));
                  }}
                  className={`text-xs cursor-pointer transition-colors ${
                    sortConfig.field === 'percentage' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  占比
                  {sortConfig.field === 'percentage' && (
                    <span className="ml-1">{sortConfig.order === 'desc' ? '↓' : '↑'}</span>
                  )}
                </span>
              </div>
              {/* 有缺失产业 - 右对齐 */}
              <Checkbox 
                size="small"
                checked={showMissingOnly}
                onChange={e => setShowMissingOnly(e.target.checked)}
              >
                <span className="text-xs text-gray-600">有缺失产业</span>
              </Checkbox>
            </div>
          </div>
          <div className="overflow-auto p-4 flex-1">
            {filteredChains.length > 0 ? renderChainList() : (
              <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </Card>

        {/* Right Content */}
        <Card
          className="flex-1"
          style={{ maxHeight: 800, minWidth: 0, overflow: 'auto' }}
          styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column', overflow: 'visible' } }}
          title={
            <div className="flex items-center justify-between">
              <span className="font-semibold">产业结构</span>

            </div>
          }
        >
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="h-full industry-tabs"
            style={{ width: '100%' }}
            destroyInactiveTabPane={true}
            items={[
              {
                key: 'flow',
                label: '产业层级',
                children: (
                  <div style={{ width: '100%', height: 650, padding: 16 }}>
                    <IndustryFlowGraph data={flowGraphData} onNodeClick={handleSelectNode} />
                  </div>
                ),
              },
              {
                key: 'enterprises',
                label: '企业清单',
                // 企业清单tab默认可点击，默认选中产业链根节点
                // disabled: false,
                style: { padding: '0 16px 16px', display: 'flex', flexDirection: 'column' },
                children: selectedNodeInfo ? (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Card size="small" className="mb-4" style={{ width: '100%', flexShrink: 0 }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {selectedNodeInfo.id?.split('-').length <= 2 ? (
                            <ApartmentOutlined style={{ color: selectedChain?.color, fontSize: 20 }} />
                          ) : selectedNodeInfo.id?.split('-').length === 3 ? (
                            <ShopOutlined style={{ color: '#52c41a', fontSize: 20 }} />
                          ) : (
                            <ShoppingOutlined style={{ color: '#fa8c16', fontSize: 20 }} />
                          )}
                          <span className="font-semibold text-lg">{selectedNodeInfo.pathName}</span>
                        </div>
                        <Space size="middle">
                          <Tag color={selectedChain?.color} style={{ fontSize: '12px', padding: '2px 8px' }}>
                            深圳: {formatNum(selectedNodeInfo.shenzhen || selectedNodeInfo.enterpriseCount)}
                          </Tag>
                          <Tag style={{ fontSize: '12px', padding: '2px 8px' }}>
                            全国: {formatNum(selectedNodeInfo.national || selectedNodeInfo.enterpriseCount)}
                          </Tag>
                          <Tag color="blue" style={{ fontSize: '12px', padding: '2px 8px' }}>
                            占比: {selectedNodeInfo.percentage || Math.round(((selectedNodeInfo.shenzhen || selectedNodeInfo.enterpriseCount) / (selectedNodeInfo.national || selectedNodeInfo.enterpriseCount || 1)) * 100 * 10) / 10}%
                          </Tag>
                        </Space>
                      </div>
                    </Card>
                    <EnterpriseTable 
                      data={nodeEnterprises} 
                      currentNodeName={selectedNodeInfo?.name}
                      onExport={(data) => console.log('导出企业:', data)}
                      onJoinInvestment={(enterprise) => console.log('加入招商库:', enterprise)}
                    />
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
