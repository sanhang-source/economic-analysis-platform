import React, { useState } from 'react';
import { ShopOutlined, DownOutlined, RightOutlined, FilterOutlined } from '@ant-design/icons';
import MasonryGrid from './MasonryGrid';
import EnterpriseLogoWall from './EnterpriseLogoWall';
import FinancingNews from './FinancingNews';

/**
 * IndustryDetailPanel - 产业详情面板
 * 展示选中一级分类的二级导航、三级瀑布流、企业Logo墙和融资动态
 */

const IndustryDetailPanel = ({ industry, chainColor, onNodeClick }) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState(null);
  const [filterTag, setFilterTag] = useState(null); // 'all' | 'shenzhen' | 'leader' | 'missing'

  // 如果没有选中产业
  if (!industry) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4">🏭</div>
          <p className="text-lg">请从左侧选择一个产业分类</p>
          <p className="text-sm text-gray-400 mt-2">查看详细的产业链结构和企业分布</p>
        </div>
      </div>
    );
  }

  const segments = industry.children || [];
  
  // 过滤细分行业
  const filteredSegments = React.useMemo(() => {
    if (!filterTag) return segments;
    
    return segments.filter(segment => {
      switch (filterTag) {
        case 'shenzhen':
          return segment.enterpriseCount > 0;
        case 'leader':
          return segment.enterpriseCount > 500;
        case 'missing':
          return segment.enterpriseCount === 0;
        default:
          return true;
      }
    });
  }, [segments, filterTag]);

  // 当前选中的细分行业（默认为全部）
  const displaySegments = selectedSegmentId 
    ? filteredSegments.filter(s => s.id === selectedSegmentId)
    : filteredSegments;

  return (
    <div className="h-full flex flex-col">
      {/* 顶部：产业标题 */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: chainColor }}
          >
            {industry.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{industry.name}</h2>
            <p className="text-sm text-gray-500">
              共 {segments.length} 个细分行业，
              {segments.reduce((sum, s) => sum + (s.children?.length || 0), 0)} 个产品服务
            </p>
          </div>
        </div>

        {/* 二级导航：细分行业标签 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedSegmentId(null)}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
              transition-colors
              ${!selectedSegmentId 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <ShopOutlined />
            全部细分
          </button>
          
          {filteredSegments.map((segment) => (
            <button
              key={segment.id}
              onClick={() => setSelectedSegmentId(segment.id)}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                transition-colors
                ${selectedSegmentId === segment.id 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {segment.name}
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full
                ${selectedSegmentId === segment.id 
                  ? 'bg-white/20' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                {segment.children?.length || 0}
              </span>
            </button>
          ))}
        </div>

        {/* 筛选标签 */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <FilterOutlined className="text-gray-400 text-sm" />
          <span className="text-sm text-gray-500">筛选：</span>
          {[
            { key: null, label: '全部' },
            { key: 'shenzhen', label: '只看深圳企业' },
            { key: 'leader', label: '只看细分龙头' },
            { key: 'missing', label: '只看缺失产业' },
          ].map(({ key, label }) => (
            <button
              key={label}
              onClick={() => setFilterTag(key)}
              className={`
                text-sm px-3 py-1 rounded-full transition-colors
                ${filterTag === key 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 内容区域：瀑布流 + 侧边信息 */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          <div className="flex gap-6">
            {/* 左侧：瀑布流产品卡片 */}
            <div className="flex-1 min-w-0">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: chainColor }} />
                  产品服务分布
                </h3>
                <span className="text-sm text-gray-500">
                  共 {displaySegments.reduce((sum, s) => sum + (s.children?.length || 0), 0)} 个
                </span>
              </div>
              
              <MasonryGrid 
                segments={displaySegments} 
                onProductClick={onNodeClick}
              />
            </div>

            {/* 右侧：企业Logo墙 + 融资动态 */}
            <div className="w-80 flex-shrink-0 space-y-6">
              <EnterpriseLogoWall 
                industry={industry} 
                onViewMore={() => onNodeClick?.(industry)}
              />
              <FinancingNews industry={industry} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryDetailPanel;
