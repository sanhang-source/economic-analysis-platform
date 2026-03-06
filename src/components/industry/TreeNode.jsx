import React from 'react';
import { Badge } from 'antd';
import {
  ApartmentOutlined,
  ShopOutlined,
  ShoppingOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { UNIFIED_COLORS } from '../../constants/colors';

/**
 * StatTag - 统计标签组件
 */
const StatTag = ({ value, type = 'default' }) => {
  const colors = {
    shenzhen: { bg: UNIFIED_COLORS.blue, text: '#fff' },
    national: { bg: '#f5f5f5', text: '#666', border: '#d9d9d9' },
    percentage: { bg: '#e6f7ff', text: UNIFIED_COLORS.blue, border: '#91d5ff' },
  };
  
  const style = colors[type];
  
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: style.border ? `1px solid ${style.border}` : 'none',
      }}
    >
      {type === 'shenzhen' && '深圳: '}
      {type === 'national' && '全国: '}
      {type === 'percentage' && '占比: '}
      {value}
      {type === 'percentage' && '%'}
    </span>
  );
};

/**
 * TreeNode - 树形节点组件
 */
const TreeNode = ({
  node,
  level = 0,
  chainColor,
  expandedKeys,
  selectedKey,
  onToggle,
  onSelect,
  searchHighlight,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.includes(node.id);
  const isSelected = selectedKey === node.id;
  const isHighlighted = searchHighlight && searchHighlight.includes(node.id);
  
  // 根据层级获取图标
  const getIcon = () => {
    const iconStyle = { fontSize: 16 };
    switch (level) {
      case 0:
        return <ApartmentOutlined style={{ ...iconStyle, color: chainColor }} />;
      case 1:
        return <ShopOutlined style={{ ...iconStyle, color: '#52c41a' }} />;
      case 2:
        return <ShoppingOutlined style={{ ...iconStyle, color: '#fa8c16' }} />;
      default:
        return <ShoppingOutlined style={{ ...iconStyle, color: '#999' }} />;
    }
  };
  
  // 根据层级获取缩进
  const getIndent = () => {
    switch (level) {
      case 0:
        return 0;
      case 1:
        return 24;
      case 2:
        return 48;
      default:
        return level * 24;
    }
  };
  
  // 计算深圳企业数
  const shenzhenCount = Math.round(node.enterpriseCount * 0.635);
  const percentage = 63.5;
  
  const handleClick = () => {
    onSelect(node);
  };
  
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(node.id);
  };
  
  return (
    <div className="tree-node-wrapper">
      <div
        className={`
          tree-node flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer
          transition-all duration-200 border
          ${isSelected 
            ? 'bg-blue-50 border-blue-300 shadow-sm' 
            : isHighlighted
              ? 'bg-yellow-50 border-yellow-300'
              : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
          }
        `}
        style={{ marginLeft: getIndent() }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* 展开/收起按钮 */}
          {hasChildren && (
            <span
              className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-200 transition-colors"
              onClick={handleToggle}
            >
              {isExpanded ? (
                <CaretDownOutlined className="text-gray-500" />
              ) : (
                <CaretRightOutlined className="text-gray-500" />
              )}
            </span>
          )}
          {!hasChildren && <span className="w-5" />}
          
          {/* 图标 */}
          <span className="flex-shrink-0">{getIcon()}</span>
          
          {/* 节点名称 */}
          <span className="font-medium text-gray-800 truncate flex-1">
            {node.name}
          </span>
          
          {/* 子节点数量标记 */}
          {hasChildren && (
            <Badge 
              count={node.children.length} 
              style={{ 
                backgroundColor: level === 0 ? chainColor : level === 1 ? '#52c41a' : '#fa8c16',
                fontSize: '10px',
                minWidth: '16px',
                height: '16px',
                lineHeight: '16px'
              }} 
            />
          )}
        </div>
        
        {/* 统计数据 */}
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <StatTag value={shenzhenCount.toLocaleString()} type="shenzhen" />
          <StatTag value={node.enterpriseCount.toLocaleString()} type="national" />
          <StatTag value={percentage} type="percentage" />
        </div>
      </div>
      
      {/* 子节点 */}
      {hasChildren && isExpanded && (
        <div className="tree-children mt-1">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              chainColor={chainColor}
              expandedKeys={expandedKeys}
              selectedKey={selectedKey}
              onToggle={onToggle}
              onSelect={onSelect}
              searchHighlight={searchHighlight}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
