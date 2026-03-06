import React from 'react';
import { ShoppingOutlined, CrownOutlined, FireOutlined } from '@ant-design/icons';

/**
 * MasonryGrid - 瀑布流布局
 * 三级卡片（产品服务）使用瀑布流展示，适应不同长度的名称
 */

// 根据企业数量获取热力图颜色
const getHeatmapColor = (count) => {
  if (count === 0) return { bg: 'bg-gray-50', border: 'border-gray-200', bar: 'bg-gray-300', text: 'text-gray-500', badge: 'bg-gray-100' };
  if (count <= 300) return { bg: 'bg-yellow-50', border: 'border-yellow-200', bar: 'bg-yellow-400', text: 'text-yellow-700', badge: 'bg-yellow-100' };
  if (count <= 800) return { bg: 'bg-orange-50', border: 'border-orange-200', bar: 'bg-orange-400', text: 'text-orange-700', badge: 'bg-orange-100' };
  return { bg: 'bg-orange-100', border: 'border-orange-300', bar: 'bg-orange-600', text: 'text-orange-800', badge: 'bg-orange-200' };
};

// 单张卡片
const ProductCard = ({ product, segment, onClick }) => {
  const heatmap = getHeatmapColor(product.enterpriseCount);
  const isLeader = product.enterpriseCount > 500;
  const isHot = product.enterpriseCount > 1000;

  return (
    <div
      onClick={() => onClick?.(product)}
      className={`
        group relative rounded-xl border-2 p-4 cursor-pointer
        transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${heatmap.bg} ${heatmap.border}
      `}
    >
      {/* 标签 */}
      <div className="flex items-center gap-2 mb-3">
        {isLeader && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
            <CrownOutlined /> 龙头
          </span>
        )}
        {isHot && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
            <FireOutlined /> 热门
          </span>
        )}
        {product.enterpriseCount === 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
            缺失
          </span>
        )}
      </div>

      {/* 标题 */}
      <h4 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
        {product.name}
      </h4>

      {/* 所属细分行业 */}
      <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
        <ShoppingOutlined />
        {segment.name}
      </div>

      {/* 企业数量 */}
      <div className={`text-2xl font-bold ${heatmap.text} mb-2`}>
        {product.enterpriseCount?.toLocaleString() || 0}
        <span className="text-sm font-normal ml-1">家</span>
      </div>

      {/* 进度条 - 相对于所属细分行业的占比 */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>占{segment.name}</span>
          <span>{segment.enterpriseCount > 0 ? Math.round((product.enterpriseCount / segment.enterpriseCount) * 100) : 0}%</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${heatmap.bar} rounded-full transition-all duration-500`}
            style={{ width: `${segment.enterpriseCount > 0 ? (product.enterpriseCount / segment.enterpriseCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* 悬停遮罩 - 显示查看更多 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
        <span className="text-white text-sm font-medium">点击查看企业列表 →</span>
      </div>
    </div>
  );
};

// 瀑布流布局
const MasonryGrid = ({ segments, onProductClick }) => {
  // 收集所有产品
  const allProducts = React.useMemo(() => {
    const products = [];
    segments.forEach(segment => {
      segment.children?.forEach(product => {
        products.push({ ...product, segment });
      });
    });
    // 按企业数量降序排列
    return products.sort((a, b) => (b.enterpriseCount || 0) - (a.enterpriseCount || 0));
  }, [segments]);

  // 将产品分成3列（瀑布流）
  const columns = React.useMemo(() => {
    const cols = [[], [], []];
    allProducts.forEach((product, index) => {
      cols[index % 3].push(product);
    });
    return cols;
  }, [allProducts]);

  if (allProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="text-center">
          <ShoppingOutlined className="text-4xl mb-2" />
          <p>暂无产品服务数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {column.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              segment={product.segment}
              onClick={onProductClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
