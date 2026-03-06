import React from 'react';
import { ApartmentOutlined } from '@ant-design/icons';

/**
 * VerticalNav - 左侧垂直导航栏
 * 一级分类导航，类似Notion侧边栏
 */

const VerticalNav = ({ industries, selectedId, onSelect, chainColor }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50/50 border-r border-gray-200">
      {/* 标题 */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-700">产业分类</div>
        <div className="text-xs text-gray-500 mt-1">共 {industries.length} 个一级分类</div>
      </div>

      {/* 导航列表 */}
      <div className="flex-1 overflow-y-auto py-2">
        {industries.map((industry, index) => {
          const isSelected = selectedId === industry.id;
          const totalEnterprises = industry.children?.reduce(
            (sum, seg) => sum + (seg.enterpriseCount || 0), 
            0
          ) || 0;

          return (
            <button
              key={industry.id}
              onClick={() => onSelect(industry)}
              className={`
                w-full text-left px-4 py-3 mx-2 rounded-lg transition-all duration-200
                flex items-start gap-3 group
                max-w-[calc(100%-16px)]
                ${isSelected 
                  ? 'bg-white shadow-sm border border-gray-200' 
                  : 'hover:bg-gray-100 border border-transparent'
                }
              `}
            >
              {/* 序号/图标 */}
              <div 
                className={`
                  flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
                  ${isSelected 
                    ? 'text-white' 
                    : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                  }
                `}
                style={{ backgroundColor: isSelected ? chainColor : undefined }}
              >
                {index + 1}
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <div className={`
                  text-sm font-medium truncate
                  ${isSelected ? 'text-gray-900' : 'text-gray-700'}
                `}>
                  {industry.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {industry.children?.length || 0} 个细分行业
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {totalEnterprises.toLocaleString()} 家企业
                </div>
              </div>

              {/* 选中指示器 */}
              {isSelected && (
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                  style={{ backgroundColor: chainColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalNav;
