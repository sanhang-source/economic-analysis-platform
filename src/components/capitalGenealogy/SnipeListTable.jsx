import React, { memo, useMemo } from 'react';
import { Table, Tag, Button, Empty, message } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import FilterDescription from './FilterDescription';

const LEVEL_MAP = { core: '0级', first: '1级', second: '2级' };

const SnipeListTable = memo(({ 
  type, 
  dataSource, 
  loading = false,
  onAddToPool,
  onExport
}) => {
  const handleExport = () => {
    const exportData = dataSource.map(item => ({
      '企业名称': item.name,
      '行业': item.industry,
      '所在地区': item.regionName,
      '注册资本': item.capital,
      '成立日期': item.foundedDate,
      '营业收入': item.revenue ? `${item.revenue}亿` : '-',
      '成员级别': LEVEL_MAP[item.level] || item.level,
    }));
    
    const headers = Object.keys(exportData[0] || {});
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => headers.map(h => row[h] || '-').join(','))
    ].join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${type === 'cashcow' ? '盯存量企业清单' : '盯增量企业清单'}_${new Date().toLocaleDateString()}.csv`;
    link.click();
    
    message.success(`已导出 ${dataSource.length} 家企业数据`);
    onExport?.(dataSource);
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
      width: 100,
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
      title: type === 'cashcow' ? '营业收入' : '成员级别',
      dataIndex: type === 'cashcow' ? 'revenue' : 'level',
      width: 100,
      render: (value) => {
        if (type === 'cashcow') {
          return <span className="text-red-600 font-bold">{value || 0}亿</span>;
        }
        return <Tag color="blue">{LEVEL_MAP[value] || value}</Tag>;
      },
    },
    ...(type === 'cashcow' ? [{
      title: '成员级别',
      dataIndex: 'level',
      width: 100,
      render: (value) => <Tag color="blue">{LEVEL_MAP[value] || value}</Tag>,
    }] : [{
      title: '营业收入',
      dataIndex: 'revenue',
      width: 100,
      render: (value) => value ? <span className="text-red-600 font-bold">{value}亿</span> : '-',
    }]),
    {
      title: '操作',
      key: 'action',
      width: 130,
      render: (_, record) => (
        <Button 
          type="primary" 
          size="small" 
          icon={<PlusOutlined />}
          onClick={() => onAddToPool?.(record)}
        >
          加入招商库
        </Button>
      ),
    },
  ], [type, onAddToPool]);

  return (
    <>
      <FilterDescription type={type} />
      {dataSource?.length > 0 ? (
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
          loading={loading}
        />
      ) : (
        <Empty description="暂无符合条件的企业" />
      )}
    </>
  );
});

SnipeListTable.displayName = 'SnipeListTable';

export default SnipeListTable;
