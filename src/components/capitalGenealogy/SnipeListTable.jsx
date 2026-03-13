import React, { memo, useMemo } from 'react';
import { Table, Tag, Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FilterDescription from './FilterDescription';

const LEVEL_MAP = { core: '核心', first: '一级', second: '二级' };

const SnipeListTable = memo(({ 
  type, 
  dataSource, 
  loading = false,
  onAddToPool 
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
      title: '所在地区',
      dataIndex: 'regionName',
      width: 100,
      render: (text, record) => (
        <Tag color={record.region === 'local' ? 'green' : 'red'}>{text}</Tag>
      ),
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
      title: type === 'cashcow' ? '营收' : '级别',
      dataIndex: type === 'cashcow' ? 'revenue' : 'level',
      width: 100,
      render: (value) => {
        if (type === 'cashcow') {
          return <span className="text-red-600 font-bold">{value || 0}亿</span>;
        }
        return <Tag color="blue">{LEVEL_MAP[value] || value}</Tag>;
      },
    },
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
