import React, { useState, useMemo, useEffect } from 'react';
import { ApartmentOutlined, ShopOutlined, ShoppingOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

/**
 * HorizontalTree - 高级版树形产业结构图
 * - 默认折叠：二级分类只展示Top 3
 * - 标签筛选：支持动态过滤
 * - 搜索定位：高亮并自动展开路径
 */

// 根据企业数量获取热力图颜色
const getHeatmapColor = (count) => {
  if (count === 0) return { bg: 'bg-gray-100', border: 'border-gray-200', bar: 'bg-gray-300', text: 'text-gray-500' };
  if (count <= 300) return { bg: 'bg-yellow-50', border: 'border-yellow-200', bar: 'bg-yellow-400', text: 'text-yellow-700' };
  if (count <= 800) return { bg: 'bg-orange-50', border: 'border-orange-200', bar: 'bg-orange-400', text: 'text-orange-700' };
  return { bg: 'bg-orange-100', border: 'border-orange-300', bar: 'bg-orange-600', text: 'text-orange-800' };
};

// 微型进度条
const MiniProgress = ({ value, max, color }) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>占比</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

const HorizontalTree = ({ chain, filterTag, searchKeyword, onNodeClick }) => {
  if (!chain?.hierarchy?.length) return null;

  // 展开的细分行业ID
  const [expandedSegments, setExpandedSegments] = useState(new Set());
  // 搜索高亮的节点ID
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());

  // 处理搜索高亮和自动展开
  useEffect(() => {
    if (!searchKeyword) {
      setHighlightedNodes(new Set());
      return;
    }

    const keyword = searchKeyword.toLowerCase();
    const highlights = new Set();
    const toExpand = new Set();

    chain.hierarchy.forEach((industry) => {
      // 检查产业是否匹配
      if (industry.name.toLowerCase().includes(keyword)) {
        highlights.add(industry.id);
      }

      industry.children?.forEach((segment) => {
        // 检查细分行业是否匹配
        if (segment.name.toLowerCase().includes(keyword)) {
          highlights.add(segment.id);
          highlights.add(industry.id);
          toExpand.add(segment.id);
        }

        // 检查产品是否匹配
        segment.children?.forEach((product) => {
          if (product.name.toLowerCase().includes(keyword)) {
            highlights.add(product.id);
            highlights.add(segment.id);
            highlights.add(industry.id);
            toExpand.add(segment.id);
          }
        });
      });
    });

    setHighlightedNodes(highlights);
    setExpandedSegments(toExpand);
  }, [searchKeyword, chain]);

  // 切换展开/折叠
  const toggleSegment = (segmentId) => {
    setExpandedSegments(prev => {
      const next = new Set(prev);
      if (next.has(segmentId)) {
        next.delete(segmentId);
      } else {
        next.add(segmentId);
      }
      return next;
    });
  };

  // 展开全部
  const expandAll = () => {
    const all = new Set();
    chain.hierarchy.forEach(industry => {
      industry.children?.forEach(segment => all.add(segment.id));
    });
    setExpandedSegments(all);
  };

  // 根据筛选标签过滤
  const shouldShowNode = (node, type) => {
    if (!filterTag) return true;

    switch (filterTag) {
      case 'shenzhen':
        // 只看深圳企业（企业数>0）
        return node.enterpriseCount > 0;
      case 'leader':
        // 只看细分龙头（企业数>500）
        return node.enterpriseCount > 500;
      case 'missing':
        // 只看缺失产业
        return node.enterpriseCount === 0;
      default:
        return true;
    }
  };

  // 节点卡片组件
  const NodeCard = ({ node, type, isHighlighted, onClick, children }) => {
    const heatmap = getHeatmapColor(node.enterpriseCount);
    const isMissing = node.enterpriseCount === 0;

    const icons = {
      industry: <ApartmentOutlined />,
      segment: <ShopOutlined />,
      product: <ShoppingOutlined />
    };

    const sizes = {
      industry: { icon: 'w-12 h-12 text-xl', text: 'text-lg font-bold', padding: 'p-4' },
      segment: { icon: 'w-10 h-10 text-lg', text: 'text-[15px] font-medium', padding: 'p-4' },
      product: { icon: 'w-8 h-8 text-sm', text: 'text-[14px]', padding: 'p-3' }
    };

    const size = sizes[type];

    return (
      <div
        onClick={onClick}
        className={`
          relative rounded-xl cursor-pointer transition-all border-2
          ${size.padding}
          ${heatmap.bg} ${heatmap.border}
          ${isHighlighted ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
          hover:shadow-md
        `}
      >
        {/* 高亮闪烁效果 */}
        {isHighlighted && (
          <div className="absolute inset-0 bg-blue-400/10 rounded-xl animate-pulse" />
        )}
        
        <div className="relative flex items-center gap-3">
          <div className={`
            ${size.icon} rounded-xl flex items-center justify-center
            ${type === 'industry' ? (isMissing ? 'bg-orange-200 text-orange-600' : 'bg-blue-200 text-blue-600') : ''}
            ${type === 'segment' ? 'bg-green-100 text-green-600' : ''}
            ${type === 'product' ? 'bg-orange-100 text-orange-500' : ''}
          `}>
            {icons[type]}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className={`${size.text} text-gray-800 truncate`}>{node.name}</div>
            <div className={`text-xs mt-1 ${heatmap.text}`}>
              <span className="font-semibold">{node.enterpriseCount?.toLocaleString() || 0}</span> 家
              {isMissing && type === 'industry' && (
                <span className="ml-2 text-orange-600 font-medium">缺失产业</span>
              )}
            </div>
          </div>
          
          {children}
        </div>

        {/* 三级卡片显示进度条 */}
        {type === 'product' && (
          <MiniProgress 
            value={node.enterpriseCount} 
            max={node.parentCount || 1000} 
            color={heatmap.bar}
          />
        )}
      </div>
    );
  };

  // 渲染细分行业组
  const SegmentGroup = ({ segment, industry, isFirst, isLast }) => {
    const products = segment.children || [];
    // 先按筛选条件过滤产品
    const filteredProducts = products.filter(p => shouldShowNode(p, 'product'));
    const isExpanded = expandedSegments.has(segment.id) || searchKeyword;
    const isHighlighted = highlightedNodes.has(segment.id);
    const showTop3 = !isExpanded && !searchKeyword && !filterTag;
    const displayProducts = showTop3 ? filteredProducts.slice(0, 3) : filteredProducts;
    const hasMore = filteredProducts.length > 3;

    // 如果筛选后没有产品，显示简化版（只有细分行业节点）
    if (products.length === 0 || (filterTag && filteredProducts.length === 0)) {
      return (
        <div className="mb-3 relative" style={{ marginLeft: 24 }}>
          {/* 垂直线 */}
          <div className="absolute left-0 top-1/2 w-6 h-1 bg-green-300 rounded-full transform -translate-y-1/2" style={{ marginLeft: -24 }} />
          <div 
            className="absolute left-0 w-1 bg-green-300 rounded-full"
            style={{
              marginLeft: -24,
              top: isFirst ? '50%' : '-16px',
              bottom: isLast ? '50%' : 'calc(100% + 16px)',
            }}
          />
          
          <div style={{ marginLeft: 24 }}>
            <NodeCard 
              node={segment} 
              type="segment"
              isHighlighted={isHighlighted}
              onClick={() => onNodeClick?.(segment)}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="mb-4 relative">
        {/* 细分行业节点 */}
        <div className="relative" style={{ marginLeft: 24 }}>
          <div className="absolute left-0 top-1/2 w-6 h-1 bg-green-300 rounded-full transform -translate-y-1/2" style={{ marginLeft: -24 }} />
          <div 
            className="absolute left-0 w-1 bg-green-300 rounded-full"
            style={{
              marginLeft: -24,
              top: isFirst ? '50%' : '-16px',
              bottom: isLast ? '50%' : 'calc(100% + 16px)',
            }}
          />
          
          <div style={{ marginLeft: 24 }}>
            <NodeCard 
              node={segment} 
              type="segment"
              isHighlighted={isHighlighted}
              onClick={() => onNodeClick?.(segment)}
            />
          </div>
        </div>

        {/* 产品服务列表 */}
        <div className="mt-3 relative">
          {/* 从细分行业到产品的垂直线 */}
          <div 
            className="absolute left-0 w-1 bg-orange-300 rounded-full"
            style={{
              marginLeft: 48,
              top: '-12px',
              bottom: hasMore && showTop3 ? '40px' : '12px',
            }}
          />
          
          <div className="space-y-2">
            {displayProducts.map((product) => (
              <div key={product.id} className="relative">
                <div 
                  className="absolute top-6 w-4 h-1 bg-orange-300 rounded-full"
                  style={{ marginLeft: 48 }}
                />
                <div style={{ marginLeft: 72 }}>
                  <NodeCard 
                    node={{...product, parentCount: segment.enterpriseCount}} 
                    type="product"
                    isHighlighted={highlightedNodes.has(product.id)}
                    onClick={() => onNodeClick?.(product)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 展开更多按钮 */}
          {hasMore && showTop3 && (
            <div className="mt-3 ml-16">
              <button
                onClick={() => toggleSegment(segment.id)}
                className="flex items-center gap-1 px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <span>展开更多 ({products.length - 3}个)</span>
                <DownOutlined />
              </button>
            </div>
          )}
          
          {/* 折叠按钮 */}
          {isExpanded && hasMore && (
            <div className="mt-3 ml-16">
              <button
                onClick={() => toggleSegment(segment.id)}
                className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span>收起</span>
                <UpOutlined />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 渲染产业组
  const IndustryGroup = ({ industry }) => {
    const segments = industry.children || [];
    const visibleSegments = segments.filter(s => shouldShowNode(s, 'segment'));

    if (filterTag && visibleSegments.length === 0 && !shouldShowNode(industry, 'industry')) {
      return null;
    }

    return (
      <div className="mb-10 relative">
        {/* 产业节点 */}
        <NodeCard 
          node={industry} 
          type="industry"
          isHighlighted={highlightedNodes.has(industry.id)}
          onClick={() => onNodeClick?.(industry)}
        />

        {visibleSegments.length > 0 && (
          <div className="mt-6 relative">
            {/* 主干垂直线 */}
            <div 
              className="absolute left-0 w-1.5 bg-green-300 rounded-full"
              style={{
                marginLeft: '24px',
                top: '-24px',
                bottom: '24px',
              }}
            />

            <div className="space-y-4">
              {visibleSegments.map((segment, idx) => (
                <SegmentGroup
                  key={segment.id}
                  segment={segment}
                  industry={industry}
                  isFirst={idx === 0}
                  isLast={idx === visibleSegments.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // 过滤后的产业列表
  const visibleIndustries = useMemo(() => {
    return chain.hierarchy.filter(industry => {
      if (!filterTag) return true;
      if (shouldShowNode(industry, 'industry')) return true;
      return industry.children?.some(s => shouldShowNode(s, 'segment'));
    });
  }, [chain, filterTag]);

  return (
    <div className="p-6 overflow-auto bg-white" style={{ minHeight: '500px' }}>
      {/* 展开全部按钮 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={expandAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          展开全部
        </button>
      </div>
      
      <div className="max-w-4xl">
        {visibleIndustries.map((industry) => (
          <IndustryGroup key={industry.id} industry={industry} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalTree;
