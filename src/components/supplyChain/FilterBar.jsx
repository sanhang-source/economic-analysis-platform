import React from 'react';
import { Select, Input, Button, Space } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

const { Option } = Select;

/**
 * 筛选栏组件
 */
const FilterBar = ({
  filters,
  filterOptions,
  onFilterChange,
  onReset,
  onExport,
  loading,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <Space wrap className="w-full justify-between">
        <Space wrap size={12}>
          {/* 时间范围 */}
          <Select
            value={filters.timeRange}
            onChange={(value) => onFilterChange('timeRange', value)}
            style={{ width: 120 }}
            placeholder="时间范围"
          >
            {filterOptions.timeRange.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>

          {/* 行业筛选 */}
          <Select
            value={filters.industry}
            onChange={(value) => onFilterChange('industry', value)}
            style={{ width: 140 }}
            placeholder="所属行业"
          >
            {filterOptions.industry.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>

          {/* 区域筛选 */}
          <Select
            value={filters.district}
            onChange={(value) => onFilterChange('district', value)}
            style={{ width: 120 }}
            placeholder="注册区域"
          >
            {filterOptions.district.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>

          {/* 搜索框 */}
          <Input
            placeholder="搜索企业名称"
            value={filters.searchKeyword}
            onChange={(e) => onFilterChange('searchKeyword', e.target.value)}
            style={{ width: 280 }}
            prefix={<SearchOutlined />}
            allowClear
          />

          {/* 重置按钮 */}
          <Button
            icon={<ReloadOutlined />}
            onClick={onReset}
          >
            重置
          </Button>
        </Space>

        {/* 导出按钮 */}
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={onExport}
          loading={loading}
        >
          导出数据
        </Button>
      </Space>
    </div>
  );
};

export default FilterBar;
