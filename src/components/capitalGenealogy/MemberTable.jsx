import React, { useState, useMemo } from 'react';
import { Card, Table, Button, Space, Tag, Tooltip, Segmented } from 'antd';
import { PlusOutlined, StarOutlined, DownloadOutlined } from '@ant-design/icons';

/**
 * 成员企业表格组件
 */
const MemberTable = ({
  currentMembers,
  loading,
  selectedRows,
  selectedRowKeys,
  setSelectedRows,
  setSelectedRowKeys,
  handleAddToInvestment,
  handleAddToWatchlist,
  handleExport,
}) => {
  // 地区筛选状态
  const [regionFilter, setRegionFilter] = useState('all');

  // 根据地区筛选过滤数据
  const filteredMembers = useMemo(() => {
    if (regionFilter === 'all') return currentMembers;
    return currentMembers.filter(item => item.region === regionFilter);
  }, [currentMembers, regionFilter]);

  // 表格列定义
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
        <div className="flex flex-col">
          <span className={record.level === 'core' ? 'font-semibold text-blue-600' : ''}>{text}</span>
          <span className="text-xs text-gray-400 mt-1">{record.creditCode || '-'}</span>
        </div>
      ),
    },
    {
      title: '成员级别',
      dataIndex: 'level',
      key: 'level',
      width: 90,
      align: 'center',
      render: (level) => {
        const levelMap = {
          'core': { text: '0级', color: 'blue' },
          'first': { text: '1级', color: 'green' },
          'second': { text: '2级', color: 'orange' },
          'associate': { text: '参股', color: 'default' },
        };
        const config = levelMap[level] || levelMap['associate'];
        return (
          <Tag color={config.color} size="small">{config.text}</Tag>
        );
      },
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      width: 100,
      render: (industry) => (
        <Tag size="small" color="cyan">{industry || '-'}</Tag>
      ),
    },
    {
      title: '注册资本',
      dataIndex: 'capital',
      key: 'capital',
      width: 120,
    },
    {
      title: '成立日期',
      dataIndex: 'foundedDate',
      key: 'foundedDate',
      width: 100,
      render: (date) => date || '-',
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      width: 80,
      align: 'center',
      render: (region) => (
        <Tag color={region === 'local' ? 'success' : 'default'} size="small">
          {region === 'local' ? '本地' : '外地'}
        </Tag>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      ellipsis: true,
      render: (address) => (
        <Tooltip title={address} placement="topLeft">
          <span>{address || '-'}</span>
        </Tooltip>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Button 
          type="link" 
          size="small"
          onClick={() => console.log('查看企业:', record.name)}
        >
          查看
        </Button>
      ),
    },
  ];

  // 表格行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    },
  };

  // 地区筛选选项
  const regionOptions = [
    { value: 'all', label: `全部(${currentMembers.length})` },
    { value: 'local', label: `本地(${currentMembers.filter(m => m.region === 'local').length})` },
    { value: 'outside', label: `外地(${currentMembers.filter(m => m.region === 'outside').length})` },
  ];

  return (
    <Card 
      className="border-0 shadow-none"
      title={
        <div className="flex items-center gap-2">
          <span>成员企业列表</span>
          {selectedRows.length > 0 && (
            <Tag color="blue">已选 {selectedRows.length} 家</Tag>
          )}
        </div>
      }
      extra={
        <span className="text-gray-400 text-sm">共 {filteredMembers.length} 家企业</span>
      }
    >
      {/* 筛选项和按钮栏 */}
      <div className="flex justify-between items-center mb-4">
        {/* 左侧：地区筛选项 */}
        <Segmented
          value={regionFilter}
          onChange={setRegionFilter}
          options={regionOptions}
          size="small"
        />
        
        {/* 右侧：操作按钮 */}
        <Space>
          <Button
            type="primary"
            ghost
            icon={<PlusOutlined />}
            onClick={handleAddToInvestment}
            disabled={selectedRows.length === 0}
          >
            加入招商库
          </Button>
          <Button
            icon={<StarOutlined />}
            onClick={handleAddToWatchlist}
            disabled={selectedRows.length === 0}
          >
            加入关注库
          </Button>
          <Button
            type="primary"
            ghost
            icon={<DownloadOutlined />}
            onClick={handleExport}
          >
            导出
          </Button>
        </Space>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredMembers}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        size="small"
        scroll={{ x: 1000 }}
      />
    </Card>
  );
};

export default MemberTable;
