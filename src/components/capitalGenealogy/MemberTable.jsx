import React from 'react';
import { Card, Table, Button, Space, Tag } from 'antd';
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
  // 表格列定义
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
            style={{
              backgroundColor: record.level === 'core' ? '#1677ff' : 
                              record.level === 'first' ? '#52c41a' : 
                              record.level === 'second' ? '#faad14' : '#999',
            }}
          >
            {text.charAt(0)}
          </div>
          <span className={record.level === 'core' ? 'font-semibold' : ''}>{text}</span>
        </div>
      ),
    },
    {
      title: '级次',
      dataIndex: 'level',
      key: 'level',
      width: 110,
      render: (level) => {
        const levelMap = {
          'core': { text: '核心企业', color: 'blue' },
          'first': { text: '一级子公司', color: 'green' },
          'second': { text: '二级子公司', color: 'orange' },
          'associate': { text: '参股企业', color: 'default' },
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
      title: '持股比例',
      dataIndex: 'ratio',
      key: 'ratio',
      width: 130,
      render: (ratio) => (
        <div className="flex items-center gap-2">
          <div className="w-14 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{
                width: `${ratio}%`,
                backgroundColor: ratio >= 50 ? '#1677ff' : '#faad14',
              }}
            />
          </div>
          <span className="text-xs">{ratio}%</span>
        </div>
      ),
    },
    {
      title: '注册资本',
      dataIndex: 'capital',
      key: 'capital',
      width: 130,
    },
    {
      title: '所属区域',
      dataIndex: 'regionName',
      key: 'regionName',
      width: 110,
      render: (text, record) => (
        <Tag color={record.region === 'local' ? 'success' : 'default'} size="small">
          {record.region === 'local' ? '深圳' : '外地'}
        </Tag>
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
        <span className="text-gray-400 text-sm">共 {currentMembers.length} 家企业</span>
      }
    >
      {/* 操作按钮栏 */}
      <div className="flex justify-between items-center mb-4">
        <Space>
          <Button
            type="primary"
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
        </Space>
        <Button
          icon={<DownloadOutlined />}
          onClick={handleExport}
        >
          {selectedRows.length > 0 ? `导出选中(${selectedRows.length})` : '导出全部'}
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={currentMembers}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        size="small"
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default MemberTable;
