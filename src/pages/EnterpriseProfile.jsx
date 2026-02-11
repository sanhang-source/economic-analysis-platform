import React, { useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Card,
  Tabs,
  Tag,
  Avatar,
  Statistic,
  Table,
  Badge,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  Descriptions,
  Progress,
  Tooltip,
} from 'antd';
import {
  BankOutlined,
  RiseOutlined,
  FallOutlined,
  WarningOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  EditOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { enterpriseProfileMock } from '../mock/enterpriseProfileMock';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

/**
 * EnterpriseProfile - 一企一档页面
 * 企业详情展示：头部信息 + 标签页 + 经营数据图表
 */
const EnterpriseProfile = () => {
  const [activeTab, setActiveTab] = useState('operating');
  const tabsRef = useRef(null);

  const { enterprise, operatingData, riskRecords } = enterpriseProfileMock;

  // 统计卡片数据
  const statCards = [
    {
      title: '本年营收',
      value: operatingData.currentYear.revenue,
      unit: '亿元',
      yoy: operatingData.currentYear.revenueYoy,
      icon: <BankOutlined className="text-blue-500" />,
      color: '#1677ff',
    },
    {
      title: '纳税总额',
      value: operatingData.currentYear.tax,
      unit: '亿元',
      yoy: operatingData.currentYear.taxYoy,
      icon: <FileTextOutlined className="text-green-500" />,
      color: '#52c41a',
    },
    {
      title: '研发投入',
      value: operatingData.currentYear.rdInvestment,
      unit: '亿元',
      yoy: operatingData.currentYear.rdYoy,
      icon: <RiseOutlined className="text-purple-500" />,
      color: '#722ed1',
      rdRatio: operatingData.currentYear.rdRatio,
    },
  ];

  // 营收与纳税趋势图配置
  const trendChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      textStyle: {
        color: '#333',
      },
    },
    legend: {
      data: ['营业收入', '纳税总额'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: operatingData.trend.years,
      axisLine: {
        lineStyle: {
          color: '#d9d9d9',
        },
      },
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '营业收入（亿元）',
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#1677ff',
          },
        },
        axisLabel: {
          formatter: '{value}',
          color: '#1677ff',
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0',
          },
        },
      },
      {
        type: 'value',
        name: '纳税总额（亿元）',
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#52c41a',
          },
        },
        axisLabel: {
          formatter: '{value}',
          color: '#52c41a',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: operatingData.trend.revenue,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#1677ff',
          width: 3,
        },
        itemStyle: {
          color: '#1677ff',
          borderWidth: 2,
          borderColor: '#fff',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(22, 119, 255, 0.2)' },
              { offset: 1, color: 'rgba(22, 119, 255, 0.02)' },
            ],
          },
        },
      },
      {
        name: '纳税总额',
        type: 'line',
        yAxisIndex: 1,
        data: operatingData.trend.tax,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#52c41a',
          width: 3,
        },
        itemStyle: {
          color: '#52c41a',
          borderWidth: 2,
          borderColor: '#fff',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(82, 196, 26, 0.2)' },
              { offset: 1, color: 'rgba(82, 196, 26, 0.02)' },
            ],
          },
        },
      },
    ],
  };

  // 风险列表列定义
  const riskColumns = [
    {
      title: '处罚日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '处罚机关',
      dataIndex: 'authority',
      key: 'authority',
      width: 240,
    },
    {
      title: '处罚事由',
      dataIndex: 'reason',
      key: 'reason',
      render: (text) => (
        <Text type="danger" className="font-medium">
          <ExclamationCircleOutlined className="mr-1" />
          {text}
        </Text>
      ),
    },
    {
      title: '处罚结果',
      dataIndex: 'result',
      key: 'result',
      width: 240,
      render: (text) => (
        <Text type="danger">{text}</Text>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Badge
          status={status === '已整改' ? 'success' : 'error'}
          text={status}
        />
      ),
    },
  ];

  return (
    <div className="h-full -mx-6 -mt-6">
      {/* 头部信息区 - 白色背景 */}
      <div className="bg-white px-6 py-5 shadow-sm">
        <div className="flex items-start justify-between">
          {/* 左侧：Logo + 标题 + 标签 */}
          <div className="flex items-start gap-4">
            <Avatar
              size={72}
              style={{
                background: enterprise.logoColor,
                fontSize: 28,
                fontWeight: 'bold',
              }}
            >
              {enterprise.name.charAt(0)}
            </Avatar>
            <div>
              <Title level={3} className="!mb-2 !mt-0">
                {enterprise.name}
              </Title>
              <Space wrap>
                {enterprise.tags.map((tag) => (
                  <Tag
                    key={tag.key}
                    color={tag.color}
                    icon={tag.icon}
                    className="px-3 py-1 text-sm"
                  >
                    {tag.label}
                  </Tag>
                ))}
              </Space>
            </div>
          </div>

          {/* 右侧：操作按钮 */}
          <Space>
            <Button icon={<EditOutlined />}>编辑档案</Button>
            <Button icon={<ShareAltOutlined />}>分享</Button>
            <Button icon={<DownloadOutlined />}>导出报告</Button>
          </Space>
        </div>

        {/* 基本信息概览 */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <Row gutter={48}>
            <Col>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <EnvironmentOutlined />
                <span>注册地址：{enterprise.address}</span>
              </div>
            </Col>
            <Col>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <PhoneOutlined />
                <span>联系电话：{enterprise.phone}</span>
              </div>
            </Col>
            <Col>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MailOutlined />
                <span>企业邮箱：{enterprise.email}</span>
              </div>
            </Col>
            <Col>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <GlobalOutlined />
                <span>统一社会信用代码：{enterprise.code}</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Tabs 导航 - Sticky 吸顶 */}
      <div
        ref={tabsRef}
        className="sticky top-0 z-50 bg-white border-b border-gray-200"
        style={{ top: 0, padding: '0 24px' }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          className="!mb-0"
        >
          <TabPane tab="基本信息" key="basic" />
          <TabPane tab="经营数据" key="operating" />
          <TabPane tab="能耗分析" key="energy" />
          <TabPane
            tab={
              <span>
                风险舆情
                {riskRecords.length > 0 && (
                  <Badge count={riskRecords.length} className="ml-1" />
                )}
              </span>
            }
            key="risk"
          />
          <TabPane tab="所获荣誉" key="honors" />
        </Tabs>
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        {/* 基本信息 Tab */}
        {activeTab === 'basic' && (
          <Card className="shadow-sm">
            <Descriptions
              title="工商登记信息"
              bordered
              column={2}
              labelStyle={{ width: 180, background: '#fafafa' }}
            >
              <Descriptions.Item label="企业名称">
                {enterprise.name}
              </Descriptions.Item>
              <Descriptions.Item label="企业类型">
                {enterprise.type}
              </Descriptions.Item>
              <Descriptions.Item label="法定代表人">
                {enterprise.legalPerson}
              </Descriptions.Item>
              <Descriptions.Item label="注册资本">
                {enterprise.registeredCapital}
              </Descriptions.Item>
              <Descriptions.Item label="成立日期">
                {enterprise.establishDate}
              </Descriptions.Item>
              <Descriptions.Item label="所属行业">
                <Tag color="blue">{enterprise.industry}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="企业规模">
                <Tag color="green">{enterprise.scale}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="员工人数">
                {enterprise.employees}人
              </Descriptions.Item>
              <Descriptions.Item label="注册地址" span={2}>
                {enterprise.address}
              </Descriptions.Item>
              <Descriptions.Item label="经营范围" span={2}>
                {enterprise.businessScope}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions
              title="联系信息"
              bordered
              column={2}
              labelStyle={{ width: 180, background: '#fafafa' }}
            >
              <Descriptions.Item label="联系人">
                {enterprise.contact.name}
              </Descriptions.Item>
              <Descriptions.Item label="联系电话">
                {enterprise.contact.phone}
              </Descriptions.Item>
              <Descriptions.Item label="电子邮箱">
                {enterprise.email}
              </Descriptions.Item>
              <Descriptions.Item label="企业官网">
                <a href={enterprise.website} target="_blank" rel="noreferrer">
                  {enterprise.website}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}

        {/* 经营数据 Tab */}
        {activeTab === 'operating' && (
          <div className="space-y-6">
            {/* 第一行：3个统计卡片 */}
            <Row gutter={24}>
              {statCards.map((card, index) => (
                <Col span={8} key={index}>
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-gray-500 text-sm mb-2">
                          {card.title}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span
                            className="text-3xl font-bold"
                            style={{ color: card.color }}
                          >
                            {card.value}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {card.unit}
                          </span>
                        </div>

                      </div>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: `${card.color}15` }}
                      >
                        {card.icon}
                      </div>
                    </div>
                    <Divider className="my-3" />
                    <div className="flex items-center gap-2">
                      {card.yoy >= 0 ? (
                        <RiseOutlined className="text-green-500" />
                      ) : (
                        <FallOutlined className="text-red-500" />
                      )}
                      <span
                        className={
                          card.yoy >= 0 ? 'text-green-600' : 'text-red-600'
                        }
                      >
                        {card.yoy >= 0 ? '+' : ''}
                        {card.yoy}%
                      </span>
                      <span className="text-gray-400 text-sm">同比</span>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* 第二行：趋势图 */}
            <Card
              title="近三年经营趋势"
              className="shadow-sm"
              extra={<Text type="secondary">单位：亿元</Text>}
            >
              <ReactECharts
                option={trendChartOption}
                style={{ height: 350 }}
                opts={{ renderer: 'canvas' }}
              />
            </Card>

            {/* 第三行：风险列表 */}
            <Card
              title={
                <span className="flex items-center gap-2">
                  <WarningOutlined className="text-red-500" />
                  行政处罚记录
                  <Badge count={riskRecords.length} className="ml-1" />
                </span>
              }
              className="shadow-sm border-red-100"
            >
              <Table
                columns={riskColumns}
                dataSource={riskRecords}
                rowKey="id"
                pagination={false}
                size="small"
              />
              {riskRecords.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  暂无行政处罚记录
                </div>
              )}
            </Card>
          </div>
        )}

        {/* 能耗分析 Tab */}
        {activeTab === 'energy' && (
          <Card className="shadow-sm">
            <Empty description="能耗分析模块开发中" />
          </Card>
        )}

        {/* 风险舆情 Tab */}
        {activeTab === 'risk' && (
          <Card className="shadow-sm">
            <Empty description="风险舆情模块开发中" />
          </Card>
        )}

        {/* 所获荣誉 Tab */}
        {activeTab === 'honors' && (
          <Card className="shadow-sm">
            <Empty description="所获荣誉模块开发中" />
          </Card>
        )}
      </div>
    </div>
  );
};

// Empty 占位组件
const Empty = ({ description }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="text-6xl mb-4">📊</div>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default EnterpriseProfile;
