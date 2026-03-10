import React, { useState, useMemo } from 'react';
import { Card, Table, Button, Space, Tag, Tooltip, Dropdown, message } from 'antd';
import { PlusOutlined, DownOutlined, ExportOutlined } from '@ant-design/icons';

/**
 * 成员企业表格组件
 */
const MemberTable = ({
  currentMembers,
  loading,
  handleAddToInvestment,
  handleAddToWatchlist,
  handleExport,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [regionFilter, setRegionFilter] = useState('all'); // all | local | outside

  // 根据地区筛选过滤数据
  const filteredData = useMemo(() => {
    if (regionFilter === 'all') return currentMembers;
    if (regionFilter === 'local') return currentMembers.filter(item => item.region === 'local');
    if (regionFilter === 'outside') return currentMembers.filter(item => item.region === 'outside');
    return currentMembers;
  }, [currentMembers, regionFilter]);

  // 预计算各区域企业数量
  const counts = useMemo(() => ({
    all: currentMembers.length,
    local: currentMembers.filter(e => e.region === 'local').length,
    outside: currentMembers.filter(e => e.region === 'outside').length
  }), [currentMembers]);

  // 处理批量加入
  const handleBatchJoin = (type) => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择企业');
      return;
    }
    const selectedEnterprises = currentMembers.filter(e => selectedRowKeys.includes(e.id));
    if (type === 'investment') {
      handleAddToInvestment?.(selectedEnterprises);
      message.success(`已将 ${selectedEnterprises.length} 家企业加入招商库`);
    } else if (type === 'watchlist') {
      handleAddToWatchlist?.(selectedEnterprises);
      message.success(`已将 ${selectedEnterprises.length} 家企业加入关注库`);
    }
    setSelectedRowKeys([]);
  };

  // 处理导出
  const handleExportData = () => {
    handleExport?.(filteredData);
    message.success(`已导出 ${filteredData.length} 家企业数据`);
  };

  // 表格列定义
  const columns = useMemo(() => [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 220,
      render: (text, record) => (
        <div>
          <div className={record.level === 'core' ? 'font-semibold text-blue-600' : 'font-medium'}>
            {text}
          </div>
          <div className="text-xs text-gray-400">{record.creditCode || '-'}</div>
        </div>
      ),
    },
    {
      title: '成员级别',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      align: 'center',
      render: (level) => {
        const levelMap = {
          'core': { text: '0级', color: 'blue' },
          'first': { text: '1级', color: 'green' },
          'second': { text: '2级', color: 'orange' },
          'associate': { text: '参股', color: 'default' },
        };
        const config = levelMap[level] || levelMap['associate'];
        return <Tag color={config.color} size="small">{config.text}</Tag>;
      },
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      width: 100,
      render: (industry) => <Tag size="small" color="cyan">{industry || '-'}</Tag>,
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
      width: 120,
      render: (date) => date || '-',
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      width: 100,
      align: 'center',
      render: (region) => (
        <Tag color={region === 'local' ? 'green' : 'default'}>
          {region === 'local' ? '本地' : '外地'}
        </Tag>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 220,
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
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => console.log('查看企业:', record)}>
          查看
        </Button>
      ),
    },
  ], []);

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  return (
    <Card className="border-0 shadow-none bg-white" title="成员企业清单">
      {/* 筛选和操作栏 */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <Space size={8}>
          <Tag 
            color={regionFilter === 'all' ? 'blue' : 'default'}
            style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '14px' }}
            onClick={() => setRegionFilter('all')}
          >
            全部 ({counts.all})
          </Tag>
          <Tag 
            color={regionFilter === 'local' ? 'green' : 'default'}
            style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '14px' }}
            onClick={() => setRegionFilter('local')}
          >
            本地 ({counts.local})
          </Tag>
          <Tag 
            color={regionFilter === 'outside' ? 'orange' : 'default'}
            style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '14px' }}
            onClick={() => setRegionFilter('outside')}
          >
            外地 ({counts.outside})
          </Tag>
        </Space>
        
        <Space>
          <Dropdown
            disabled={selectedRowKeys.length === 0}
            menu={{
              items: [
                {
                  key: 'investment',
                  label: '加入招商库',
                  onClick: () => handleBatchJoin('investment')
                },
                {
                  key: 'watchlist',
                  label: '加入关注库',
                  disabled: true
                }
              ]
            }}
          >
            <Button 
              type="primary" 
              style={{ height: 30, padding: '4px 12px', fontSize: '14px', display: 'flex', alignItems: 'center' }}
              disabled={selectedRowKeys.length === 0}
            >
              <PlusOutlined /> 加入 <DownOutlined />
            </Button>
          </Dropdown>
          <Button 
            icon={<ExportOutlined />} 
            style={{ height: 30, padding: '4px 12px', fontSize: '14px', display: 'flex', alignItems: 'center' }}
            onClick={handleExportData}
          >
            导出
          </Button>
        </Space>
      </div>

      {/* 表格 */}
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        scroll={{ x: 1300 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        size="small"
      />
    </Card>
  );
};

export default MemberTable;
