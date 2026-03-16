import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

/**
 * 企业列表表格
 */
const EnterpriseTable = ({
  data,
  pagination,
  onPageChange,
  loading,
}) => {
  const navigate = useNavigate();

  // 格式化金额
  const formatAmount = (amount) => {
    if (amount >= 10000) {
      return (amount / 10000).toFixed(2) + '亿';
    }
    return amount + '万';
  };

  const columns = [
    {
      title: '排名',
      dataIndex: 'displayRank',
      width: 60,
      align: 'center',
      render: (rank) => (
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
          rank <= 3 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          {rank}
        </span>
      ),
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      ellipsis: true,
      render: (name, record) => (
        <div>
          <div className="font-medium">{name}</div>
          <div className="flex gap-1 mt-1">
            {record.tags.map((tag, index) => (
              <Tag key={index} size="small" color={index === 0 ? 'blue' : index === 1 ? 'green' : 'orange'}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      width: 120,
    },
    {
      title: '所属区域',
      dataIndex: 'district',
      width: 100,
    },
    {
      title: '开票金额',
      dataIndex: 'annualInvoiceAmount',
      width: 120,
      align: 'right',
      sorter: (a, b) => a.annualInvoiceAmount - b.annualInvoiceAmount,
      defaultSortOrder: 'descend',
      render: (amount) => formatAmount(amount),
    },
    {
      title: '采购金额',
      dataIndex: 'annualPurchase',
      width: 120,
      align: 'right',
      sorter: (a, b) => a.annualPurchase - b.annualPurchase,
      render: (amount) => formatAmount(amount),
    },
    {
      title: '销售金额',
      dataIndex: 'annualSales',
      width: 120,
      align: 'right',
      sorter: (a, b) => a.annualSales - b.annualSales,
      render: (amount) => formatAmount(amount),
    },
    {
      title: '本地采购率',
      dataIndex: 'localPurchaseRatio',
      width: 120,
      align: 'right',
      sorter: (a, b) => a.localPurchaseRatio - b.localPurchaseRatio,
      render: (ratio) => `${(ratio * 100).toFixed(1)}%`,
    },
    {
      title: '本地销售率',
      dataIndex: 'localSalesRatio',
      width: 120,
      align: 'right',
      sorter: (a, b) => a.localSalesRatio - b.localSalesRatio,
      render: (ratio) => `${(ratio * 100).toFixed(1)}%`,
    },
    {
      title: '毛利率估算',
      dataIndex: 'grossMargin',
      width: 110,
      align: 'right',
      sorter: (a, b) => a.grossMargin - b.grossMargin,
      render: (margin) => `${(margin * 100).toFixed(1)}%`,
    },
    {
      title: '供应链健康度',
      dataIndex: 'healthScore',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.healthScore - b.healthScore,
      render: (score) => (
        <span className={`font-medium ${
          score >= 80 ? 'text-green-500' : score >= 60 ? 'text-orange-500' : 'text-red-500'
        }`}>
          {score}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<BarChartOutlined />}
          onClick={() => navigate(`/industry/trade/detail/${record.id}`)}
        >
          详细分析
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`,
        pageSizeOptions: ['10', '20', '50'],
      }}
      onChange={({ current, pageSize }) => onPageChange(current, pageSize)}
      scroll={{ x: 1500 }}
      size="middle"
    />
  );
};

export default EnterpriseTable;
