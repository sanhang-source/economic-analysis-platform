import React, { useState, useMemo } from 'react';
import { Table, Button, Tag, Space, message, Dropdown } from 'antd';
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

const EnterpriseTable = ({ 
  data, 
  currentNodeName,
  onExport,
  onJoinInvestment 
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [areaFilter, setAreaFilter] = useState('all'); // all | shenzhen | other

  // 区域筛选 - 使用 useMemo 优化
  const filteredData = useMemo(() => {
    if (areaFilter === 'all') return data;
    if (areaFilter === 'shenzhen') return data.filter(item => item.isShenzhen);
    if (areaFilter === 'other') return data.filter(item => !item.isShenzhen);
    return data;
  }, [data, areaFilter]);

  // 预计算各区域企业数量
  const counts = useMemo(() => ({
    all: data.length,
    shenzhen: data.filter(e => e.isShenzhen).length,
    other: data.filter(e => !e.isShenzhen).length
  }), [data]);

  // 表格列定义 - 使用 useMemo 缓存
  const columns = useMemo(() => [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 220,
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
      width: 140,
      render: (belongsTo) => {
        const chains = [...new Set((belongsTo || []).map(b => b.chain))];
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
        const segments = [...new Set((belongsTo || []).map(b => b.segment))];
        return (
          <div className="flex flex-wrap gap-1">
            {segments.map((segment, idx) => (
              <Tag key={idx} size="small" color="cyan">{segment}</Tag>
            ))}
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
        const subSegments = [...new Set((belongsTo || []).map(b => b.subSegment))];
        return (
          <div className="flex flex-wrap gap-1">
            {subSegments.map((sub, idx) => (
              <Tag key={idx} size="small" color="purple">{sub}</Tag>
            ))}
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
        const products = (belongsTo || []).map(b => b.product).filter(Boolean);
        if (products.length === 0) return '-';
        return (
          <div className="flex flex-wrap gap-1">
            {products.map((prod, idx) => (
              <Tag key={idx} size="small" color="orange">{prod}</Tag>
            ))}
          </div>
        );
      }
    },
    {
      title: '地区',
      dataIndex: 'isShenzhen',
      key: 'area',
      width: 100,
      align: 'center',
      render: (isShenzhen) => (
        <Tag color={isShenzhen ? 'green' : 'default'}>
          {isShenzhen ? '本地' : '外地'}
        </Tag>
      )
    },
    {
      title: '成立日期',
      dataIndex: 'establishDate',
      key: 'establishDate',
      width: 120,
    },
    {
      title: '注册资本',
      dataIndex: 'registeredCapital',
      key: 'registeredCapital',
      width: 160,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 220,
      ellipsis: true,
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
      )
    }
  ], []);

  // 处理批量加入
  const handleBatchJoin = (type) => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择企业');
      return;
    }
    const selectedEnterprises = data.filter(e => selectedRowKeys.includes(e.id));
    if (type === 'investment') {
      onJoinInvestment?.(selectedEnterprises);
      message.success(`已将 ${selectedEnterprises.length} 家企业加入招商库`);
    }
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
        <Space size={8}>
          <Tag 
            color={areaFilter === 'all' ? 'blue' : 'default'}
            style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '14px' }}
            onClick={() => setAreaFilter('all')}
          >
            全部 ({counts.all})
          </Tag>
          <Tag 
            color={areaFilter === 'shenzhen' ? 'green' : 'default'}
            style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '14px' }}
            onClick={() => setAreaFilter('shenzhen')}
          >
            本地 ({counts.shenzhen})
          </Tag>
          <Tag 
            color={areaFilter === 'other' ? 'orange' : 'default'}
            style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '14px' }}
            onClick={() => setAreaFilter('other')}
          >
            外地 ({counts.other})
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
                  key: 'focus',
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
            onClick={handleExport}
          >
            导出
          </Button>
        </Space>
      </div>

      {/* 表格 - 由Antd Table自己处理滚动 */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 1300 }}
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
