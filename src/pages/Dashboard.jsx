import React from 'react';
import { Card, Row, Col, Statistic, Badge, List, Avatar, Tag, Progress } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  BankOutlined,
  ProjectOutlined,
  FundOutlined,
  TeamOutlined,
  BellOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  LineChartOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import { dashboardMockData } from '../mock/dashboardMock';

/**
 * Dashboard - 工作台首页
 * 展示核心指标、待办事项、快捷入口等
 */
const Dashboard = () => {
  const { stats, todos, shortcuts, recentEnterprises } = dashboardMockData;

  // 图标映射
  const iconMap = {
    bank: <BankOutlined className="text-xl text-white" />,
    global: <GlobalOutlined className="text-xl text-white" />,
    apartment: <ApartmentOutlined className="text-xl text-white" />,
    lineChart: <LineChartOutlined className="text-xl text-white" />,
    fileSearch: <FileSearchOutlined className="text-xl text-white" />,
    team: <TeamOutlined className="text-xl text-white" />,
  };

  return (
    <div className="space-y-4">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">工作台</h1>
        <p className="text-gray-500 mt-1">欢迎回来，管理员 | 今天是 2026年2月10日 星期二</p>
      </div>

      {/* 核心指标卡片区 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-md transition-shadow">
            <Statistic
              title="入驻企业数"
              value={stats.enterpriseCount}
              prefix={<BankOutlined className="text-blue-500 mr-2" />}
              suffix="家"
              valueStyle={{ color: '#1677ff' }}
            />
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500 flex items-center">
                <ArrowUpOutlined /> 12.5%
              </span>
              <span className="text-gray-400 ml-2">较上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-md transition-shadow">
            <Statistic
              title="在谈项目数"
              value={stats.projectCount}
              prefix={<ProjectOutlined className="text-green-500 mr-2" />}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500 flex items-center">
                <ArrowUpOutlined /> 8.3%
              </span>
              <span className="text-gray-400 ml-2">较上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-md transition-shadow">
            <Statistic
              title="总投资额"
              value={stats.investmentAmount}
              prefix={<FundOutlined className="text-orange-500 mr-2" />}
              suffix="亿元"
              valueStyle={{ color: '#fa8c16' }}
            />
            <div className="mt-2 flex items-center text-sm">
              <span className="text-red-500 flex items-center">
                <ArrowDownOutlined /> 2.1%
              </span>
              <span className="text-gray-400 ml-2">较上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-md transition-shadow">
            <Statistic
              title="新增线索"
              value={stats.newLeads}
              prefix={<TeamOutlined className="text-purple-500 mr-2" />}
              suffix="条"
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500 flex items-center">
                <ArrowUpOutlined /> 23.6%
              </span>
              <span className="text-gray-400 ml-2">较上月</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 快捷入口 + 待办事项 */}
      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={16}>
          <Card
            title="快捷入口"
            className="h-full"
            bodyStyle={{ padding: '20px' }}
          >
            <Row gutter={[16, 16]}>
              {shortcuts.map((item) => (
                <Col span={8} key={item.key}>
                  <div
                    className="flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:shadow-sm"
                    style={{ border: '1px solid #f0f0f0' }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                      style={{ background: item.bgColor }}
                    >
                      {iconMap[item.iconType]}
                    </div>
                    <span className="text-gray-700 font-medium">{item.title}</span>
                    <span className="text-gray-400 text-xs mt-1">{item.desc}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="待办事项"
            className="h-full"
            extra={<Tag color="red">{todos.length} 待处理</Tag>}
          >
            <List
              dataSource={todos}
              renderItem={(item) => (
                <List.Item
                  className="cursor-pointer hover:bg-gray-50 px-2 rounded"
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dot={!item.completed} color={item.urgent ? 'red' : 'blue'}>
                        <Avatar
                          size="small"
                          icon={<BellOutlined />}
                          style={{ background: item.urgent ? '#ff4d4f' : '#1677ff' }}
                        />
                      </Badge>
                    }
                    title={
                      <span className={item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}>
                        {item.title}
                      </span>
                    }
                    description={
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <ClockCircleOutlined />
                        {item.time}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 最近入驻企业 */}
      <Row className="mt-4">
        <Col span={24}>
          <Card title="最近入驻企业">
            <List
              dataSource={recentEnterprises}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Tag color={item.status === '已签约' ? 'green' : 'orange'}>
                      {item.status}
                    </Tag>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="large"
                        style={{ background: item.avatarColor }}
                      >
                        {item.name.charAt(0)}
                      </Avatar>
                    }
                    title={
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{item.name}</span>
                        <Tag size="small">{item.industry}</Tag>
                      </div>
                    }
                    description={
                      <div className="text-gray-500 text-sm mt-1">
                        <span>投资额: <strong className="text-gray-700">{item.investment}亿元</strong></span>
                        <span className="mx-2">|</span>
                        <span>入驻时间: {item.joinDate}</span>
                        <span className="mx-2">|</span>
                        <span>联系人: {item.contact}</span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 经济运行概览 */}
      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={12}>
          <Card title="产业分布">
            <div className="space-y-4">
              {[
                { name: '智能制造', value: 85, color: '#1677ff' },
                { name: '新能源', value: 72, color: '#52c41a' },
                { name: '生物医药', value: 68, color: '#722ed1' },
                { name: '电子信息', value: 56, color: '#fa8c16' },
                { name: '新材料', value: 43, color: '#eb2f96' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-gray-500">{item.value}%</span>
                  </div>
                  <Progress
                    percent={item.value}
                    strokeColor={item.color}
                    showInfo={false}
                    strokeWidth={8}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="本月重点项目进度">
            <div className="space-y-4">
              {[
                { name: '新能源汽车产业园一期', progress: 92, status: 'normal' },
                { name: '生物医药研发中心', progress: 78, status: 'normal' },
                { name: '智能装备孵化基地', progress: 65, status: 'normal' },
                { name: '半导体封装测试项目', progress: 45, status: 'exception' },
                { name: '光伏组件生产基地', progress: 30, status: 'active' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 text-sm">{item.name}</span>
                    <span className="text-gray-500 text-sm">{item.progress}%</span>
                  </div>
                  <Progress
                    percent={item.progress}
                    status={item.status}
                    strokeWidth={8}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
