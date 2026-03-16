import React, { useState, memo } from 'react';
import { Card, Tabs, Table, Button, Tag, Row, Col, Statistic, Empty } from 'antd';
import { FireOutlined, TrophyOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

/**
 * IndustryInsightsPanel - 产业供应链洞察面板
 * 
 * @param {Object} props
 * @param {string} props.industryName - 当前选中的产业名称
 * @param {Object} props.insightsData - 洞察数据
 */
const IndustryInsightsPanel = memo(({ industryName, insightsData }) => {
  const [activeTab, setActiveTab] = useState('supplement');

  // 补链洞察数据（盯采购）
  const supplementData = insightsData?.supplement || [];
  
  // 强链洞察数据（盯销售）
  const strengthenData = insightsData?.strengthen || [];
  
  // 优势商品数据
  const topProducts = insightsData?.topProducts || [];

  // 补链表格列
  const supplementColumns = [
    {
      title: '排名',
      dataIndex: 'rank',
      width: 60,
      render: (rank) => (
        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${
          rank <= 3 ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          {rank}
        </span>
      ),
    },
    {
      title: '外地供应商名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '本地合作企业数量',
      dataIndex: 'serviceCount',
      width: 150,
      render: (count) => `${count}家`,
    },
    {
      title: '累计采购金额',
      dataIndex: 'amount',
      width: 150,
      render: (amount) => `${(amount / 10000).toFixed(1)}亿`,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Button type="primary" size="small" icon={<PlusOutlined />}>
          加入招商库
        </Button>
      ),
    },
  ];

  // 强链表格列
  const strengthenColumns = [
    {
      title: '排名',
      dataIndex: 'rank',
      width: 60,
      render: (rank) => (
        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${
          rank <= 3 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          {rank}
        </span>
      ),
    },
    {
      title: '外地客户名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '本地合作企业数量',
      dataIndex: 'serviceCount',
      width: 150,
      render: (count) => `${count}家`,
    },
    {
      title: '累计销售金额',
      dataIndex: 'amount',
      width: 150,
      render: (amount) => `${(amount / 10000).toFixed(1)}亿`,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Button type="primary" size="small" icon={<PlusOutlined />}>
          加入招商库
        </Button>
      ),
    },
  ];

  // 优势商品图表配置
  const productChartOption = {
    tooltip: {
      show: false,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value) => `${value}亿`,
      },
    },
    yAxis: {
      type: 'category',
      data: [...topProducts].reverse().map(p => p.name),
      axisLabel: {
        width: 100,
        overflow: 'truncate',
      },
    },
    series: [
      {
        type: 'bar',
        data: [...topProducts].reverse().map(p => ({
          value: (p.amount / 10000).toFixed(1),
          itemStyle: {
            color: '#52c41a',
            borderRadius: [0, 4, 4, 0],
          },
        })),
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          formatter: '{c}亿',
        },
      },
    ],
  };

  // Tab 配置
  const tabItems = [
    {
      key: 'supplement',
      label: (
        <span>
          <FireOutlined className="mr-1" />
          补链洞察（盯采购）
        </span>
      ),
      children: (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card
              title="补链靶向库"
              size="small"
              extra={<Tag color="error">急需引入</Tag>}
            >
              {supplementData.length > 0 ? (
                <Table
                  columns={supplementColumns}
                  dataSource={supplementData}
                  rowKey="rank"
                  pagination={false}
                  size="small"
                  scroll={{ y: 300 }}
                />
              ) : (
                <Empty description="暂无补链数据" />
              )}
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'strengthen',
      label: (
        <span>
          <TrophyOutlined className="mr-1" />
          强链洞察（盯销售）
        </span>
      ),
      children: (
        <Row gutter={[16, 16]} align="stretch">
          <Col span={14}>
            <Card
              title="强链目标库"
              size="small"
              extra={<Tag color="success">优势输出</Tag>}
              className="h-full"
            >
              {strengthenData.length > 0 ? (
                <Table
                  columns={strengthenColumns}
                  dataSource={strengthenData}
                  rowKey="rank"
                  pagination={false}
                  size="small"
                  scroll={{ y: 300 }}
                />
              ) : (
                <Empty description="暂无强链数据" />
              )}
            </Card>
          </Col>
          <Col span={10}>
            <Card title="优势输出商品" size="small" className="h-full" styles={{ body: { height: 'calc(100% - 48px)', padding: 0 } }}>
              {topProducts.length > 0 ? (
                <ReactECharts
                  option={productChartOption}
                  style={{ height: '100%' }}
                />
              ) : (
                <Empty description="暂无商品数据" />
              )}
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  // 基础看板统计
  const stats = insightsData?.stats || {};

  return (
    <Card
      title={`产业供应链洞察 - ${industryName || ''}`}
      className="mb-4"
      variant="borderless"
    >
      {/* 基础看板 */}
      <Row gutter={[12, 12]} className="mb-4">
        <Col flex="1">
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>样本企业数</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontSize: 24, fontWeight: 'bold', color: '#1677ff' }}>{stats.enterpriseCount || 0}</span>
                <span style={{ fontSize: 14, color: '#1677ff' }}>家</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col flex="1">
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>采购总额</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontSize: 24, fontWeight: 'bold', color: '#fa8c16' }}>{stats.totalPurchase ? (stats.totalPurchase / 10000).toFixed(1) : 0}</span>
                <span style={{ fontSize: 14, color: '#fa8c16' }}>亿</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col flex="1">
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>销售总额</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontSize: 24, fontWeight: 'bold', color: '#722ed1' }}>{stats.totalSales ? (stats.totalSales / 10000).toFixed(1) : 0}</span>
                <span style={{ fontSize: 14, color: '#722ed1' }}>亿</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col flex="1">
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>本地采购率</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontSize: 24, fontWeight: 'bold', color: (stats.localSupportRatio || 0) < 30 ? '#f5222d' : '#52c41a' }}>{stats.localSupportRatio || 0}</span>
                <span style={{ fontSize: 14, color: (stats.localSupportRatio || 0) < 30 ? '#f5222d' : '#52c41a' }}>%</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col flex="1">
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>本地销售率</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontSize: 24, fontWeight: 'bold', color: (stats.localSalesRatio || 0) < 30 ? '#f5222d' : '#52c41a' }}>{stats.localSalesRatio || 0}</span>
                <span style={{ fontSize: 14, color: (stats.localSalesRatio || 0) < 30 ? '#f5222d' : '#52c41a' }}>%</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tab 切换 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        type="card"
        tabBarExtraContent={
          <Button
            icon={<ExportOutlined />}
            onClick={() => {
              const data = activeTab === 'supplement' ? supplementData : strengthenData;
              const filename = activeTab === 'supplement' ? '外地供应商数据' : '外地客户数据';
              // 导出CSV
              const headers = activeTab === 'supplement'
                ? ['排名', '外地供应商名称', '本地合作企业数量', '累计采购金额(亿)']
                : ['排名', '外地客户名称', '本地合作企业数量', '累计销售金额(亿)'];
              const rows = data.map(item => [
                item.rank,
                item.name,
                `${item.serviceCount}家`,
                (item.amount / 10000).toFixed(1)
              ]);
              const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
              const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `${filename}-${industryName || '产业'}.csv`;
              link.click();
            }}
          >
            导出
          </Button>
        }
      />
    </Card>
  );
});

IndustryInsightsPanel.displayName = 'IndustryInsightsPanel';

export default IndustryInsightsPanel;
