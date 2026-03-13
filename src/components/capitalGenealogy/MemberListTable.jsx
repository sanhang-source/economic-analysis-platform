import React, { memo, useMemo } from 'react';
import { Table, Tag, Card, Typography } from 'antd';

const { Title } = Typography;

const LEVEL_CONFIG = {
  core: { text: '核心', color: 'blue' },
  first: { text: '一级', color: 'green' },
  second: { text: '二级', color: 'orange' },
  associate: { text: '参股', color: 'default' }
};

const MemberListTable = memo(({ 
  dataSource, 
  memberFilter,
  memberCounts,
  onFilterChange,
  loading = false 
}) => {
  const columns = useMemo(() => [
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <Tag size="small" color="cyan">{record.industry}</Tag>
        </div>
      ),
    },
    {
      title: '地区',
      dataIndex: 'regionName',
      width: 100,
      render: (text, record) => (
        <Tag color={record.region === 'local' ? 'green' : 'default'}>{text}</Tag>
      ),
    },
    {
      title: '级别',
      dataIndex: 'level',
      width: 90,
      render: (level) => {
        const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.associate;
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '注册资本',
      dataIndex: 'capital',
      width: 130,
    },
    {
      title: '成立日期',
      dataIndex: 'foundedDate',
      width: 110,
    },
    {
      title: '营收',
      dataIndex: 'revenue',
      width: 100,
      render: (value) => value ? `${value}亿` : '-',
    },
  ], []);

  const FilterTags = useMemo(() => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">筛选：</span>
      {[
        { key: 'all', label: `全部 (${memberCounts.all})`, color: 'blue' },
        { key: 'local', label: `本地 (${memberCounts.local})`, color: 'green' },
        { key: 'outside', label: `外地 (${memberCounts.outside})`, color: 'orange' }
      ].map(item => (
        <Tag 
          key={item.key}
          color={memberFilter === item.key ? item.color : 'default'}
          className="cursor-pointer"
          onClick={() => onFilterChange(item.key)}
        >
          {item.label}
        </Tag>
      ))}
    </div>
  ), [memberFilter, memberCounts, onFilterChange]);

  return (
    <Card 
      title={
        <div className="flex items-center justify-between">
          <Title level={5} className="!mb-0">成员企业清单</Title>
          {FilterTags}
        </div>
      }
      variant="borderless"
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{ 
          pageSize: 10, 
          showSizeChanger: true, 
          showTotal: (total) => `共 ${total} 家企业` 
        }}
        size="small"
        loading={loading}
      />
    </Card>
  );
});

MemberListTable.displayName = 'MemberListTable';

export default MemberListTable;
