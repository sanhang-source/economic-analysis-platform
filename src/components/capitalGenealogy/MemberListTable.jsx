import React, { memo, useMemo } from 'react';
import { Table, Tag, Card, Typography, Button, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LEVEL_MAP = { core: '0级', first: '1级', second: '2级', associate: '参股' };

const MemberListTable = memo(({ 
  dataSource, 
  memberFilter,
  memberCounts,
  onFilterChange,
  loading = false,
  onAddToPool
}) => {
  const handleExport = () => {
    const exportData = dataSource.map(item => ({
      '企业名称': item.name,
      '行业': item.industry,
      '所在地区': item.regionName,
      '成员级别': LEVEL_MAP[item.level] || item.level,
      '注册资本': item.capital,
      '成立日期': item.foundedDate,
      '营业收入': item.revenue ? `${item.revenue}亿` : '-',
    }));
    
    const headers = Object.keys(exportData[0] || {});
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => headers.map(h => row[h] || '-').join(','))
    ].join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `成员企业清单_${new Date().toLocaleDateString()}.csv`;
    link.click();
    
    message.success(`已导出 ${dataSource.length} 家企业数据`);
  };

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
      title: '所在地区',
      dataIndex: 'regionName',
      width: 120,
    },
    {
      title: '成员级别',
      dataIndex: 'level',
      width: 120,
      render: (level) => <Tag color="blue">{LEVEL_MAP[level] || level}</Tag>,
    },
    {
      title: '注册资本',
      dataIndex: 'capital',
      width: 120,
    },
    {
      title: '成立日期',
      dataIndex: 'foundedDate',
      width: 120,
    },
    {
      title: '营业收入',
      dataIndex: 'revenue',
      width: 120,
      render: (value) => value ? `${value}亿` : '-',
    },

  ], [onAddToPool]);

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
          <div className="flex items-center gap-4">
            {FilterTags}
            <Button 
              icon={<ExportOutlined />}
              onClick={handleExport}
            >
              导出
            </Button>
          </div>
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
