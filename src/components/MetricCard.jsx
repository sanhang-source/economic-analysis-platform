import React from 'react';
import { Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

/**
 * MetricCard - 核心指标卡片组件
 * 用于数字驾驶舱展示关键指标数据
 */
const MetricCard = ({ title, value, unit, growth, growthMoM, icon, color, subText }) => (
  <Card className="h-full hover:shadow-lg transition-shadow" bodyStyle={{ padding: 20 }}>
    <div className="flex items-start justify-between">
      <div>
        <div className="text-gray-500 text-sm mb-2">{title}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold" style={{ color }}>{value}</span>
          <span className="text-gray-500 text-sm">{unit}</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            {growth >= 0 ? (
              <ArrowUpOutlined style={{ color: '#52c41a' }} />
            ) : (
              <ArrowDownOutlined style={{ color: '#f5222d' }} />
            )}
            <span style={{ color: growth >= 0 ? '#52c41a' : '#f5222d' }}>
              {Math.abs(growth)}%
            </span>
            <span className="text-gray-400 text-xs">同比</span>
          </div>
          <div className="flex items-center gap-1">
            {growthMoM >= 0 ? (
              <ArrowUpOutlined style={{ color: '#1677ff' }} />
            ) : (
              <ArrowDownOutlined style={{ color: '#fa8c16' }} />
            )}
            <span style={{ color: growthMoM >= 0 ? '#1677ff' : '#fa8c16' }}>
              {Math.abs(growthMoM)}%
            </span>
            <span className="text-gray-400 text-xs">环比</span>
          </div>
        </div>
      </div>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15` }}
      >
        <span style={{ color, fontSize: 24 }}>{icon}</span>
      </div>
    </div>
    {subText && (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">{subText}</span>
      </div>
    )}
  </Card>
);

export default MetricCard;
