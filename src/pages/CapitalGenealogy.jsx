import React from 'react';
import { Select } from 'antd';
import ClanList from '../components/capitalGenealogy/ClanList';
import CoreCompanyCard from '../components/capitalGenealogy/CoreCompanyCard';
import MemberTable from '../components/capitalGenealogy/MemberTable';
import { useCapitalGenealogy } from '../hooks/useCapitalGenealogy';

const { Option } = Select;

/**
 * CapitalGenealogy - 企业族谱页面（重构优化版）
 * 
 * 优化内容：
 * 1. mock数据抽离到单独文件
 * 2. 拆分为子组件（ClanList, CoreCompanyCard, MemberTable）
 * 3. 业务逻辑封装到自定义Hook
 */
const CapitalGenealogy = () => {
  const {
    selectedClan,
    setSelectedClan,
    searchValue,
    setSearchValue,
    region,
    setRegion,
    category,
    setCategory,
    loading,
    selectedRows,
    setSelectedRows,
    selectedRowKeys,
    setSelectedRowKeys,
    currentMembers,
    currentClan,
    clanList,
    filteredClanList,
    regionStats,
    regionOptions,
    handleExport,
    handleAddToInvestment,
    handleAddToWatchlist,
  } = useCapitalGenealogy();

  return (
    <div>
      {/* 页面标题和区域选择 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">企业族群</h1>
          <p className="text-gray-500 text-sm mt-1">
            分析企业族群结构，洞察龙头企业生态
          </p>
        </div>
        <Select value={region} onChange={setRegion} style={{ width: 120 }}>
          {regionOptions.map(option => (
            <Option key={option.value} value={option.value}>{option.label}</Option>
          ))}
        </Select>
      </div>
      
      {/* 主内容区 */}
      <div className="flex items-start" style={{ height: 'calc(100vh - 180px)' }}>
        {/* 左侧系族列表 */}
        <ClanList
          category={category}
          setCategory={setCategory}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          filteredClanList={filteredClanList}
          selectedClan={selectedClan}
          setSelectedClan={setSelectedClan}
          clanList={clanList}
        />

        {/* 右侧详情区 */}
        <div className="flex-1 bg-white overflow-auto h-full ml-4">
          {currentClan && (
            <>
              {/* 核心企业信息卡片 */}
              <CoreCompanyCard 
                currentClan={currentClan} 
                regionStats={regionStats} 
              />

              {/* 成员企业表格 */}
              <MemberTable
                currentMembers={currentMembers}
                loading={loading}
                selectedRows={selectedRows}
                selectedRowKeys={selectedRowKeys}
                setSelectedRows={setSelectedRows}
                setSelectedRowKeys={setSelectedRowKeys}
                handleAddToInvestment={handleAddToInvestment}
                handleAddToWatchlist={handleAddToWatchlist}
                handleExport={handleExport}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CapitalGenealogy;
