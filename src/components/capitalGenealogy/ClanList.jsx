import React from 'react';
import { Input, List, Tag, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/**
 * 排序选项组件
 */
const SortOption = ({ label, field, sortConfig, onSort }) => {
  const isActive = sortConfig.field === field;
  return (
    <span
      onClick={() => onSort(field)}
      className={`text-xs cursor-pointer transition-colors ${
        isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      {label}
      {isActive && (
        <span className="ml-1">{sortConfig.order === 'desc' ? '↓' : '↑'}</span>
      )}
    </span>
  );
};

/**
 * 系族列表组件 - 左侧边栏
 */
const ClanList = ({
  category,
  setCategory,
  searchValue,
  setSearchValue,
  filteredClanList,
  selectedClan,
  setSelectedClan,
  clanList,
  sortConfig,
  setSortConfig,
}) => {
  // 分类配置
  const categoryConfig = [
    { key: 'group', label: '集团系' },
    { key: 'listed', label: '上市系' },
    { key: 'top500', label: '中国500强' },
  ];
  
  // 处理排序
  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* 顶部搜索 */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        {/* 分类标签按钮 */}
        <div className="flex gap-2 mb-3">
          {categoryConfig.map((item) => (
            <Button
              key={item.key}
              type={category === item.key ? 'primary' : 'default'}
              size="small"
              className="flex-1"
              onClick={() => { setCategory(item.key); }}
            >
              {item.label}
            </Button>
          ))}
        </div>
        
        <Input
          placeholder="搜索企业"
          allowClear
          size="small"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        
        {/* 排序选项 */}
        <div className="flex items-center gap-4 mt-3">
          <SortOption 
            label="数量" 
            field="shenzhenCount" 
            sortConfig={sortConfig} 
            onSort={handleSort} 
          />
          <SortOption 
            label="占比" 
            field="percentage" 
            sortConfig={sortConfig} 
            onSort={handleSort} 
          />
        </div>
      </div>

      {/* 系族列表 */}
      <div className="flex-1 overflow-auto">
        <List
          dataSource={filteredClanList}
          renderItem={(item, index) => (
            <List.Item
              className={`cursor-pointer transition-all px-0 ${
                selectedClan === item.id 
                  ? 'bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedClan(item.id)}
            >
              <div className="px-3 py-3 w-full">
                {/* 第一行：所属系 + 企业名称 */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag 
                    size="small"
                    color={selectedClan === item.id ? 'blue' : 'default'}
                    className="flex-shrink-0"
                  >
                    {item.name}
                  </Tag>
                  <span 
                    className={`text-base font-semibold truncate ${
                      selectedClan === item.id ? 'text-blue-600' : 'text-gray-800'
                    }`}
                  >
                    {item.coreCompany}
                  </span>
                </div>
                
                {/* 第二行：统计信息 - 三栏卡片样式（白色背景） */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white rounded p-2">
                    <div className="text-sm font-bold text-green-600">
                      {item.shenzhenCount}
                    </div>
                    <div className="text-xs text-gray-500">深圳企业</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-sm font-bold text-gray-700">
                      {item.count}
                    </div>
                    <div className="text-xs text-gray-500">成员企业</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-sm font-bold text-blue-600">
                      {Math.round((item.shenzhenCount / item.count) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">深圳占比</div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ClanList;
