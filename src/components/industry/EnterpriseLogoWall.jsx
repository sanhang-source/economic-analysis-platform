import React from 'react';
import { TeamOutlined, RightOutlined } from '@ant-design/icons';

/**
 * EnterpriseLogoWall - 企业Logo墙
 * 展示行业内的知名企业Logo
 */

// 模拟企业Logo数据 - 实际项目中应从API获取
const generateMockEnterprises = (industryName, count = 12) => {
  const prefixes = ['深圳', '华为', '腾讯', '大疆', '比亚迪', '中兴', '顺丰', '迈瑞', '大族', '柔宇', '商汤', '云天励飞'];
  const suffixes = ['科技', '技术', '电子', '通信', '智能', '创新', '网络', '软件', '系统', '股份'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `ent-${i}`,
    name: `${prefixes[i % prefixes.length]}${suffixes[i % suffixes.length]}`,
    logo: null, // 实际项目中是图片URL
    isShenzhen: i < count * 0.6, // 60%是深圳企业
    size: i < 3 ? 'large' : i < 6 ? 'medium' : 'small', // 不同大小增加视觉节奏
  }));
};

const LogoItem = ({ enterprise }) => {
  const sizeClasses = {
    large: 'w-16 h-16 text-lg',
    medium: 'w-14 h-14 text-base',
    small: 'w-12 h-12 text-sm',
  };

  // 生成随机但固定的颜色
  const colors = ['#1677ff', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96', '#13c2c2'];
  const color = colors[enterprise.name.length % colors.length];
  const initial = enterprise.name.charAt(0);

  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      {/* Logo容器 */}
      <div 
        className={`
          ${sizeClasses[enterprise.size]} 
          rounded-xl flex items-center justify-center text-white font-bold
          shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300
        `}
        style={{ backgroundColor: color }}
      >
        {initial}
      </div>
      
      {/* 企业名称 */}
      <span className="text-xs text-gray-600 text-center truncate w-20 group-hover:text-blue-600 transition-colors">
        {enterprise.name}
      </span>

      {/* 深圳企业标识 */}
      {enterprise.isShenzhen && (
        <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full">
          深圳
        </span>
      )}
    </div>
  );
};

const EnterpriseLogoWall = ({ industry, onViewMore }) => {
  const enterprises = React.useMemo(() => {
    if (!industry) return [];
    // 根据行业规模生成不同数量的企业
    const count = Math.min(20, Math.max(8, (industry.children?.length || 0) * 3));
    return generateMockEnterprises(industry.name, count);
  }, [industry]);

  if (!industry) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <TeamOutlined className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">代表企业</h3>
            <p className="text-xs text-gray-500">{industry.name} 领域核心企业</p>
          </div>
        </div>
        <button 
          onClick={onViewMore}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          查看全部 <RightOutlined className="text-xs" />
        </button>
      </div>

      {/* Logo墙 */}
      <div className="flex flex-wrap gap-4 justify-center py-4">
        {enterprises.map((enterprise) => (
          <LogoItem key={enterprise.id} enterprise={enterprise} />
        ))}
      </div>

      {/* 统计 */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">{enterprises.length}+</div>
          <div className="text-xs text-gray-500">代表企业</div>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {enterprises.filter(e => e.isShenzhen).length}
          </div>
          <div className="text-xs text-gray-500">深圳企业</div>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div className="text-center">
          <div className="text-lg font-bold text-orange-500">
            {Math.round((enterprises.filter(e => e.isShenzhen).length / enterprises.length) * 100)}%
          </div>
          <div className="text-xs text-gray-500">本地占比</div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLogoWall;
