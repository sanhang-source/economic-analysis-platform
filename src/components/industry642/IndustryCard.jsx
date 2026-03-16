import React, { memo } from 'react';
import { Card, Tag, Statistic, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FireOutlined, TrophyOutlined } from '@ant-design/icons';

/**
 * IndustryCard - 产业卡片组件
 * 
 * @param {Object} data - 产业数据
 * @param {string} data.id - 产业ID
 * @param {string} data.name - 产业名称
 * @param {number} data.enterpriseCount - 样本企业数
 * @param {number} data.totalSales - 销售总额（万元）
 * @param {number} data.totalPurchase - 采购总额（万元）
 * @param {number} data.localSupportRatio - 本地采购率 %
 * @param {number} data.localSalesRatio - 本地销售率 %
 * @param {boolean} data.urgentChainNeeded - 是否急需补链
 * @param {boolean} data.advantageChain - 是否优势强链
 */
const IndustryCard = memo(({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/industry/trade?industry=${data.name}`);
  };

  // 格式化金额
  const formatAmount = (value) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}亿`;
    }
    return `${value}万`;
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
      styles={{ 
        body: { padding: '20px' },
      }}
    >
      {/* 标题行 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{data.name}</h3>
          <span className="text-sm text-gray-500">{data.enterpriseCount}家样本企业</span>
        </div>
        <Space direction="vertical" align="end" size={4}>
          {data.urgentChainNeeded && (
            <Tag color="error" icon={<FireOutlined />} className="m-0">
              急需补链
            </Tag>
          )}
          {data.advantageChain && (
            <Tag color="success" icon={<TrophyOutlined />} className="m-0">
              优势强链
            </Tag>
          )}
        </Space>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">采购总额</div>
          <div className="text-lg font-bold text-green-600">
            {formatAmount(data.totalPurchase)}
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">销售总额</div>
          <div className="text-lg font-bold text-blue-600">
            {formatAmount(data.totalSales)}
          </div>
        </div>
      </div>

      {/* 健康度指标 */}
      <div className="space-y-2">
        {/* 本地采购率 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">本地采购率</span>
          <div className="flex items-center gap-2">
            <div
              className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"
            >
              <div
                className={`h-full rounded-full transition-all ${
                  data.localSupportRatio < 30 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(data.localSupportRatio, 100)}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${
              data.localSupportRatio < 30 ? 'text-red-500' : 'text-green-600'
            }`}>
              {data.localSupportRatio}%
            </span>
          </div>
        </div>

        {/* 本地销售率 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">本地销售率</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(data.localSalesRatio, 100)}%` }}
              />
            </div>
            <span className="text-sm font-medium text-blue-600">
              {data.localSalesRatio}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
});

IndustryCard.displayName = 'IndustryCard';

export default IndustryCard;
