import React from 'react';
import { Input, List, Tag, Button } from 'antd';

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
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* 顶部搜索 */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        {/* 分类Tab */}
        <div className="flex gap-2 mb-3">
          <Button 
            type={category === 'group' ? 'primary' : 'default'}
            size="small"
            onClick={() => { setCategory('group'); setSelectedClan(null); }}
          >
            集团系
          </Button>
          <Button 
            type={category === 'listed' ? 'primary' : 'default'}
            size="small"
            onClick={() => { setCategory('listed'); setSelectedClan(null); }}
          >
            上市系
          </Button>
          <Button 
            type={category === 'top500' ? 'primary' : 'default'}
            size="small"
            onClick={() => { setCategory('top500'); setSelectedClan(null); }}
          >
            中国500强
          </Button>
        </div>
        
        <Input
          placeholder="搜索族群名称"
          allowClear
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* 系族列表 */}
      <div className="flex-1 overflow-auto">
        <List
          dataSource={filteredClanList}
          renderItem={(item) => (
            <List.Item
              className={`cursor-pointer hover:bg-gray-50 transition-colors px-0 ${
                selectedClan === item.id 
                  ? 'bg-blue-50 border-l-4 border-blue-500' 
                  : 'border-l-4 border-transparent'
              }`}
              onClick={() => setSelectedClan(item.id)}
            >
              <div className="px-4 py-3 w-full">
                {/* 第一行：核心企业名称 */}
                <div className="mb-2">
                  <span 
                    className={`text-base font-semibold ${
                      selectedClan === item.id ? 'text-blue-600' : 'text-gray-800'
                    }`}
                  >
                    {item.coreCompany}
                  </span>
                </div>
                {/* 第二行：标签 */}
                <div className="flex flex-wrap gap-1">
                  {/* 所属系族标签 */}
                  <Tag 
                    size="small"
                    color={selectedClan === item.id ? 'blue' : 'default'}
                  >
                    {item.name}
                  </Tag>
                  {/* 成员企业数量 */}
                  <Tag size="small" color="orange">
                    成员企业：{item.count}家
                  </Tag>
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
