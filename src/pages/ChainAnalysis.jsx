import React, { useState } from 'react';
import {
  Card,
  Steps,
  Tag,
  List,
  Avatar,
  Rate,
  Badge,
  Tooltip,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Progress,
  Divider,
  Select,
} from 'antd';
import {
  LinkOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  AimOutlined,
  RightOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  GlobalOutlined,
  ToolOutlined,
  CarOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { chainAnalysisMock } from '../mock/chainAnalysisMock';

const { Title, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

// 产业选项
const industryOptions = [
  { value: 'new-energy', label: '新能源汽车' },
  { value: 'network', label: '网络与通信' },
  { value: 'biomedical', label: '生物医药' },
  { value: 'semiconductor', label: '半导体与集成电路' },
  { value: 'smart-manufacturing', label: '智能制造' },
];

/**
 * ChainAnalysis - 强链补链分析页面
 * 产业链完整度分析、薄弱环节识别、补链推荐
 */
const ChainAnalysis = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState('new-energy');
  const { summary, chainSegments, recommendations } = chainAnalysisMock;

  // 根据选择的产业获取标题
  const getIndustryTitle = (industry) => {
    const titleMap = {
      'new-energy': '新能源汽车产业链',
      'network': '网络与通信产业链',
      'biomedical': '生物医药产业链',
      'semiconductor': '半导体产业链',
      'smart-manufacturing': '智能制造产业链',
    };
    return titleMap[industry] || '新能源汽车产业链';
  };

  const currentIndustryTitle = getIndustryTitle(selectedIndustry);

  // 统计卡片数据
  const statCards = [
    {
      title: '产业链完整度',
      value: summary.completeness,
      unit: '%',
      icon: <LinkOutlined className="text-blue-500" />,
      color: '#1677ff',
      desc: '核心环节覆盖情况',
    },
    {
      title: '本地配套率',
      value: summary.localization,
      unit: '%',
      icon: <CheckCircleOutlined className="text-green-500" />,
      color: '#52c41a',
      desc: '本地企业供应占比',
    },
    {
      title: '缺链环节',
      value: summary.missingCount,
      unit: '个',
      icon: <CloseCircleOutlined className="text-gray-400" />,
      color: '#8c8c8c',
      desc: '本地完全缺失环节',
    },
    {
      title: '薄弱环节',
      value: summary.weakCount,
      unit: '个',
      icon: <WarningOutlined className="text-orange-500" />,
      color: '#faad14',
      desc: '竞争力不足环节',
    },
  ];

  // 获取环节状态样式
  const getSegmentStyle = (status) => {
    switch (status) {
      case 'missing':
        return {
          border: '2px dashed #d9d9d9',
          background: '#f5f5f5',
          color: '#8c8c8c',
        };
      case 'weak':
        return {
          border: '2px solid #faad14',
          background: '#fffbe6',
          color: '#faad14',
        };
      case 'strong':
      default:
        return {
          border: '2px solid #52c41a',
          background: '#f6ffed',
          color: '#52c41a',
        };
    }
  };

  // 获取状态标签
  const getStatusTag = (status) => {
    const statusMap = {
      missing: { text: '本地无', color: 'default', icon: <CloseCircleOutlined /> },
      weak: { text: '本地弱', color: 'warning', icon: <WarningOutlined /> },
      strong: { text: '本地有', color: 'success', icon: <CheckCircleOutlined /> },
    };
    const config = statusMap[status];
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  // 产业链环节图标
  const getSegmentIcon = (type) => {
    const iconMap = {
      upstream: <GlobalOutlined className="text-blue-500" />,
      midstream: <ToolOutlined className="text-cyan-500" />,
      downstream: <CarOutlined className="text-purple-500" />,
    };
    return iconMap[type] || <LinkOutlined />;
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={4} className="!mb-1 flex items-center gap-2">
            <AimOutlined className="text-blue-500" />
            强链补链分析
          </Title>
          <Text type="secondary" className="text-sm">
            {currentIndustryTitle} · 识别薄弱环节 · 精准补链招商
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={selectedIndustry}
            onChange={setSelectedIndustry}
            style={{ width: 160 }}
            placeholder="选择产业"
            suffixIcon={<DownOutlined />}
          >
            {industryOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
          <Button type="primary" icon={<PlusOutlined />}>
            添加分析维度
          </Button>
        </div>
      </div>

      {/* 顶部概览 - 4个统计指标 */}
      <Row gutter={16}>
        {statCards.map((card, index) => (
          <Col span={6} key={index}>
            <Card className="hover:shadow-md transition-shadow h-[120px]" size="small" bodyStyle={{ padding: '16px', height: '100%' }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-gray-500 text-sm mb-1">{card.title}</div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: card.color }}
                    >
                      {card.value}
                    </span>
                    <span className="text-gray-500 text-sm">{card.unit}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{card.desc}</div>
                </div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ background: `${card.color}15` }}
                >
                  {card.icon}
                </div>
              </div>

            </Card>
          </Col>
        ))}
      </Row>

      {/* 中间可视化区 - 产业链流程 */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <LinkOutlined className="text-blue-500" />
            <span>产业链流程分析</span>
            <Tag color="blue">{currentIndustryTitle.replace('产业链', '')}</Tag>
          </div>
        }
        className="shadow-sm"
      >
        {/* 产业链流程步骤 */}
        <div className="py-6">
          <Steps
            current={-1}
            className="mb-8"
            items={[
              { title: '上游原材料', description: '矿产资源、基础材料' },
              { title: '中游零部件', description: '核心部件、系统集成' },
              { title: '下游整车', description: '整车制造、销售服务' },
            ]}
          />

          {/* 各环节卡片流 */}
          <div className="space-y-6">
            {chainSegments.map((segment, segmentIndex) => (
              <div key={segment.key}>
                <div className="flex items-center gap-2 mb-4">
                  {getSegmentIcon(segment.type)}
                  <span className="font-semibold text-gray-800">{segment.title}</span>
                  <Badge count={segment.nodes.length} style={{ backgroundColor: '#1677ff' }} />
                  <Text type="secondary" className="text-sm ml-2">
                    {segment.desc}
                  </Text>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  {segment.nodes.map((node, nodeIndex) => (
                    <Tooltip
                      key={node.id}
                      title={
                        <div>
                          <div className="font-medium">{node.name}</div>
                          <div className="text-xs mt-1">{node.description}</div>
                          {node.localEnterprises > 0 && (
                            <div className="text-xs mt-1">
                              本地企业: {node.localEnterprises}家
                            </div>
                          )}
                        </div>
                      }
                    >
                      <div
                        className="relative px-5 py-4 rounded-lg cursor-pointer transition-all hover:shadow-md min-w-[160px] mr-4"
                        style={getSegmentStyle(node.status)}
                        onClick={() => setSelectedSegment(node)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">
                            {node.name}
                          </span>
                          {getStatusTag(node.status)}
                        </div>
                        
                        {node.status !== 'missing' && (
                          <div className="text-xs text-gray-500 mt-2">
                            本地{node.localEnterprises}家
                            {node.marketShare && (
                              <span className="ml-2">市占{node.marketShare}%</span>
                            )}
                          </div>
                        )}

                        {node.status === 'missing' && (
                          <div className="text-xs text-gray-400 mt-2">
                            需外部引进
                          </div>
                        )}



                        {/* 箭头连接符 */}
                        {nodeIndex < segment.nodes.length - 1 && (
                          <div 
                            className="absolute -right-7 top-1/2 transform -translate-y-1/2 text-gray-300 z-10"
                            style={{ marginLeft: '4px' }}
                          >
                            <ArrowRightOutlined />
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  ))}

                  {/* 阶段间的箭头 */}
                  {segmentIndex < chainSegments.length - 1 && (
                    <div className="flex items-center text-gray-300 mx-4 z-10">
                      <RightOutlined className="text-2xl" />
                    </div>
                  )}
                </div>

                {segmentIndex < chainSegments.length - 1 && (
                  <Divider className="my-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 底部推荐区 - 补链目标推荐 */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <AimOutlined className="text-orange-500" />
            <span>补链目标推荐</span>
            <Tag color="orange">针对缺失/薄弱环节</Tag>
          </div>
        }
        className="shadow-sm"
        extra={<Button type="link">查看更多</Button>}
      >
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={recommendations}
          renderItem={(item) => (
            <List.Item>
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer h-full"
                size="small"
                bodyStyle={{ padding: 16 }}
              >
                <div className="flex items-start gap-4">
                  {/* 企业Logo */}
                  <Avatar
                    size={64}
                    style={{
                      background: item.logoColor,
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.name.charAt(0)}
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    {/* 头部：名称 + 推荐指数 */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-gray-800 text-base">
                          {item.name}
                        </div>
                        <Tag
                          size="small"
                          color={item.targetStatus === 'missing' ? 'default' : 'warning'}
                          className="mt-1"
                        >
                          匹配环节：{item.targetSegment}
                        </Tag>
                      </div>
                      <div className="text-right">
                        <Rate
                          disabled
                          defaultValue={item.rating}
                          style={{ fontSize: 14 }}
                        />
                        <div className="text-xs text-gray-400 mt-1">
                          推荐指数
                        </div>
                      </div>
                    </div>

                    {/* 推荐理由 */}
                    <Tooltip title={item.reason} placement="topLeft">
                      <div 
                        className="text-sm text-gray-600 mb-3 truncate"
                        style={{ maxWidth: '100%' }}
                      >
                        {item.reason}
                      </div>
                    </Tooltip>

                    {/* 关键指标 */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>营收: {item.revenue}</span>
                      <span>市占率: {item.marketShare}%</span>
                      <span>总部: {item.location}</span>
                    </div>

                    {/* 操作按钮 */}
                    <Space>
                      <Button type="primary" size="small" icon={<PlusOutlined />}>
                        加入线索池
                      </Button>
                      <Button size="small">查看详情</Button>
                    </Space>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ChainAnalysis;
