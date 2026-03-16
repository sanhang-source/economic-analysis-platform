import React, { useState, memo } from 'react';
import { Card, Tabs, Table, Button, Tag, Row, Col, Statistic, Empty } from 'antd';
import { FireOutlined, TrophyOutlined, PlusOutlined } from '@ant-design/icons';
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
      title: '服务本地企业数',
      dataIndex: 'serviceCount',
      width: 130,
      render: (count) => <Tag color="blue">{count}家</Tag>,
    },
    {
      title: '累计交易金额',
      dataIndex: 'amount',
      width: 130,
      render: (amount) => `${(amount / 10000).toFixed(1)}亿`,
    },
    {
      title: '操作',
      key: 'action',
      width: 130,
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
      title: '服务本地企业数',
      dataIndex: 'serviceCount',
      width: 130,
      render: (count) => <Tag color="blue">{count}家</Tag>,
    },
    {
      title: '累计交易金额',
      dataIndex: 'amount',
      width: 130,
      render: (amount) => `${(amount / 10000).toFixed(1)}亿`,
    },
    {
      title: '操作',
      key: 'action',
      width: 130,
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
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: {c}亿 ({d}%)',
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
          <Col span={14}>
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
          <Col span={10}>
            <Card title="优势输出商品" size="small">
              {topProducts.length > 0 ? (
                <ReactECharts
                  option={productChartOption}
                  style={{ height: 320 }}
                />
              ) : (
                <Empty description="暂无商品数据" />
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
          强链/延链洞察（盯销售）
        </span>
      ),
      children: (
        <Row gutter={[16, 16]}>
          <Col span={14}>
            <Card 
              title="强链目标库" 
              size="small"
              extra={<Tag color="success">优势输出</Tag>}
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
            <Card title="优势输出商品" size="small">
              {topProducts.length > 0 ? (
                <ReactECharts
                  option={productChartOption}
                  style={{ height: 320 }}
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
      title={`${industryName || '产业'}供应链洞察`}
      className="mb-4"
      variant="borderless"
    >
      {/* 基础看板 */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="样本企业数"
              value={stats.enterpriseCount || 0}
              suffix="家"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="产业总交易额"
              value={stats.totalAmount ? (stats.totalAmount / 10000).toFixed(1) : 0}
              suffix="亿"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="本地配套率"
              value={stats.localSupportRatio || 0}
              suffix="%"
              valueStyle={{
                color: (stats.localSupportRatio || 0) < 30 ? '#f5222d' : '#52c41a',
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tab 切换 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        type="card"
      />
    </Card>
  );
});

IndustryInsightsPanel.displayName = 'IndustryInsightsPanel';

export default IndustryInsightsPanel;
