import React from 'react';
import { Input, List, Tag, Segmented } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
}) => {
  // 分类配置
  const categoryOptions = [
    { value: 'group', label: '集团系' },
    { value: 'listed', label: '上市系' },
    { value: 'top500', label: '中国500强' },
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* 顶部搜索 */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        {/* 分类分段控制器 */}
        <div className="mb-3">
          <Segmented
            value={category}
            onChange={(value) => { setCategory(value); }}
            options={categoryOptions}
            block
            size="small"
          />
        </div>
        
        <Input
          placeholder="搜索企业"
          allowClear
          size="small"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* 系族列表 */}
      <div className="flex-1 overflow-auto">
        <List
          dataSource={filteredClanList}
          renderItem={(item, index) => (
            <List.Item
              className={`cursor-pointer transition-colors px-0 ${
                selectedClan === item.id 
                  ? 'bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              style={{
                borderLeft: selectedClan === item.id ? '4px solid #1677ff' : '4px solid transparent',
              }}
              onClick={() => setSelectedClan(item.id)}
            >
              <div className="px-4 py-3 w-full">
                {/* 第一行：所属系 + 企业名称 */}
                <div className="flex items-center gap-2 mb-2">
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
                
                {/* 第二行：统计信息 - 三栏卡片样式 */}
                <div className="grid grid-cols-3 gap-2 text-center mt-2">
                  <div className="bg-gray-50 rounded p-2">
                    <div className="text-sm font-bold text-green-600">
                      {item.shenzhenCount}
                    </div>
                    <div className="text-xs text-gray-500">深圳企业</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="text-sm font-bold text-gray-700">
                      {item.count}
                    </div>
                    <div className="text-xs text-gray-500">成员企业</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
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
