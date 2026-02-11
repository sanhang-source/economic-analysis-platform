import React from 'react';
import { Card, Tooltip } from 'antd';
import {
  InfoCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons';

/**
 * ChartCard - 通用图表卡片组件
 * 用于驾驶舱等数据展示场景
 */
const ChartCard = ({
  title,
  subtitle,
  extra,
  tooltip,
  children,
  className = '',
  bodyStyle = {},
  loading = false,
  height = 'auto',
}) => {
  return (
    <Card
      className={`shadow-md hover:shadow-lg transition-shadow rounded-xl ${className}`}
      bodyStyle={{
        padding: '20px',
        ...bodyStyle,
      }}
      style={{ height }}
      loading={loading}
    >
      {/* 卡片头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-800">{title}</span>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </Tooltip>
          )}
        </div>
        <div className="flex items-center gap-2">
          {extra}
          <MoreOutlined className="text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>
      
      {/* 副标题 */}
      {subtitle && (
        <div className="text-xs text-gray-400 mb-3">{subtitle}</div>
      )}
      
      {/* 内容区域 */}
      <div style={{ height: 'calc(100% - 60px)', overflow: 'hidden' }}>
        {children}
      </div>
    </Card>
  );
};

export default ChartCard;
