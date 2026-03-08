import React, { useState } from 'react';
import { Table, Button, Tag, Space, message, Tabs, Dropdown } from 'antd';
import { ExportOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';

/**
 * EnterpriseTable - 企业清单表格组件
 * 
 * 功能：
 * 1. 展示企业列表（产业、细分产业、细分行业、产品服务、成立日期、注册资本、地址）
 * 2. 支持筛选深圳/深圳外企业
 * 3. 支持导出Excel
 * 4. 支持加入招商库
 */

const { TabPane } = Tabs;

const EnterpriseTable = ({ 
  data, 
  currentNodeName,
  onExport,
  onJoinInvestment 
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [areaFilter, setAreaFilter] = useState('all'); // all | shenzhen | other

  // 区域筛选
  const filteredData = (() => {
    if (areaFilter === 'all') return data;
    if (areaFilter === 'shenzhen') return data.filter(item => item.isShenzhen);
    if (areaFilter === 'other') return data.filter(item => !item.isShenzhen);
    return data;
  })();

  // 表格列定义
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 200,
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-400">{record.creditCode}</div>
        </div>
      )
    },
    {
      title: '产业',
      dataIndex: 'belongsTo',
      key: 'chain',
      width: 120,
      render: (belongsTo) => {
        const chains = [...new Set(belongsTo.map(b => b.chain))];
        return (
          <div className="flex flex-wrap gap-1">
            {chains.map((chain, idx) => (
              <Tag key={idx} size="small" color="blue">{chain}</Tag>
            ))}
          </div>
        );
      }
    },
    {
      title: '细分产业',
      dataIndex: 'belongsTo',
      key: 'segment',
      width: 120,
      render: (belongsTo) => {
        const segments = [...new Set(belongsTo.map(b => b.segment))];
        return (
          <div className="flex flex-wrap gap-1">
            {segments.slice(0, 2).map((segment, idx) => (
              <Tag key={idx} size="small" color="cyan">{segment}</Tag>
            ))}
            {segments.length > 2 && <Tag size="small">+{segments.length - 2}</Tag>}
          </div>
        );
      }
    },
    {
      title: '细分行业',
      dataIndex: 'belongsTo',
      key: 'subSegment',
      width: 120,
      render: (belongsTo) => {
        const subSegments = [...new Set(belongsTo.map(b => b.subSegment))];
        return (
          <div className="flex flex-wrap gap-1">
            {subSegments.slice(0, 2).map((sub, idx) => (
              <Tag key={idx} size="small" color="purple">{sub}</Tag>
            ))}
            {subSegments.length > 2 && <Tag size="small">+{subSegments.length - 2}</Tag>}
          </div>
        );
      }
    },
    {
      title: '产品服务',
      dataIndex: 'belongsTo',
      key: 'product',
      width: 120,
      render: (belongsTo) => {
        const products = belongsTo.map(b => b.product).filter(Boolean);
        if (products.length === 0) return '-';
        return (
          <div className="flex flex-wrap gap-1">
            {products.slice(0, 2).map((prod, idx) => (
              <Tag key={idx} size="small" color="orange">{prod}</Tag>
            ))}
            {products.length > 2 && <Tag size="small">+{products.length - 2}</Tag>}
          </div>
        );
      }
    },
    {
      title: '地区',
      dataIndex: 'isShenzhen',
      key: 'area',
      width: 80,
      align: 'center',
      render: (isShenzhen) => (
        <Tag color={isShenzhen ? 'green' : 'default'}>
          {isShenzhen ? '深圳' : '外地'}
        </Tag>
      )
    },
    {
      title: '成立日期',
      dataIndex: 'establishDate',
      key: 'establishDate',
      width: 110,
    },
    {
      title: '注册资本',
      dataIndex: 'registeredCapital',
      key: 'registeredCapital',
      width: 150,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'investment',
                label: '加入招商库',
                onClick: () => handleJoin(record, 'investment')
              },
              {
                key: 'focus',
                label: '加入关注库',
                onClick: () => handleJoin(record, 'focus'),
                disabled: true
              },
              {
                key: 'compare',
                label: '加入对比库',
                onClick: () => handleJoin(record, 'compare'),
                disabled: true
              }
            ]
          }}
        >
          <Button type="primary" size="small">
            <PlusOutlined /> 加入 <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ];

  // 处理加入操作
  const handleJoin = (enterprise, type) => {
    if (type === 'investment') {
      onJoinInvestment?.(enterprise);
      message.success(`已将「${enterprise.name}」加入招商库`);
    }
  };

  // 处理批量加入
  const handleBatchJoin = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择企业');
      return;
    }
    const selectedEnterprises = data.filter(e => selectedRowKeys.includes(e.id));
    onJoinInvestment?.(selectedEnterprises);
    message.success(`已将 ${selectedEnterprises.length} 家企业加入招商库`);
    setSelectedRowKeys([]);
  };

  // 处理导出
  const handleExport = () => {
    onExport?.(filteredData);
    message.success(`已导出 ${filteredData.length} 家企业数据`);
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 筛选和操作栏 */}
      <div style={{ flexShrink: 0 }} className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <Tabs 
          activeKey={areaFilter} 
          onChange={setAreaFilter}
          size="small"
          className="enterprise-area-tabs"
        >
          <TabPane tab={`全部 (${data.length})`} key="all" />
          <TabPane tab={`深圳 (${data.filter(e => e.isShenzhen).length})`} key="shenzhen" />
          <TabPane tab={`深圳外 (${data.filter(e => !e.isShenzhen).length})`} key="other" />
        </Tabs>
        
        <Space>
          {selectedRowKeys.length > 0 && (
            <Button 
              type="primary" 
              size="small"
              onClick={handleBatchJoin}
            >
              <PlusOutlined /> 批量加入招商库 ({selectedRowKeys.length})
            </Button>
          )}
          <Button 
            icon={<ExportOutlined />} 
            size="small"
            onClick={handleExport}
          >
            导出Excel
          </Button>
        </Space>
      </div>

      {/* 表格 - 由Antd Table自己处理滚动 */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 1300, y: 'calc(100vh - 420px)' }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          size="small"
        />
      </div>
    </div>
  );
};

export default EnterpriseTable;
