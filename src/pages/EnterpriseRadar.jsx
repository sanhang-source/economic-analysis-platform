import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Tabs,
  Table,
  Tag,
  Button,
  Drawer,
  Timeline,
  Typography,
  Badge,
  Space,
  Tooltip,
  Statistic,
  Empty,
} from 'antd';
import {
  WarningOutlined,
  ExportOutlined,
  LineChartOutlined,
  SafetyOutlined,
  PhoneOutlined,
  FileTextOutlined,
  SendOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  AlertOutlined,
  RiseOutlined,
  FallOutlined,
  RightOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

/**
 * EnterpriseRadar - 企业雷达监测页面
 * 提供企业风险预警、外迁监测、机遇发现功能
 */
const EnterpriseRadar = () => {
  const [activeTab, setActiveTab] = useState('risk');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  // 顶部统计数据
  const dashboardStats = {
    highRisk: 12,
    relocation: 3,
    opportunity: 8,
  };

  // 风险监测数据
  const riskData = [
    {
      key: '1',
      name: '深圳市某科技有限公司',
      riskType: '欠税',
      riskLevel: 'high',
      warningTime: '2024-01-15',
      status: 'pending',
      amount: '128.5万',
    },
    {
      key: '2',
      name: '深圳创新电子有限公司',
      riskType: '裁员',
      riskLevel: 'high',
      warningTime: '2024-01-14',
      status: 'processing',
      employeeChange: '-35%',
    },
    {
      key: '3',
      name: '华南智能制造股份有限公司',
      riskType: '社保断缴',
      riskLevel: 'medium',
      warningTime: '2024-01-13',
      status: 'pending',
      months: '2个月',
    },
    {
      key: '4',
      name: '深圳新能源科技有限公司',
      riskType: '欠税',
      riskLevel: 'high',
      warningTime: '2024-01-12',
      status: 'resolved',
      amount: '85.2万',
    },
    {
      key: '5',
      name: '鹏程物流集团有限公司',
      riskType: '社保断缴',
      riskLevel: 'medium',
      warningTime: '2024-01-10',
      status: 'processing',
      months: '1个月',
    },
  ];

  // 外迁监测数据
  const relocationData = [
    {
      key: '1',
      name: '深圳前海某金融服务有限公司',
      signal: '工商地址变更',
      probability: 95,
      targetLocation: '海南自贸区',
      lastActivity: '2024-01-10',
    },
    {
      key: '2',
      name: '华南生物医药科技有限公司',
      signal: '异地开票激增',
      probability: 88,
      targetLocation: '苏州工业园区',
      invoiceChange: '+320%',
    },
    {
      key: '3',
      name: '深圳智能制造装备有限公司',
      signal: '跨区设立分公司',
      probability: 75,
      targetLocation: '东莞松山湖',
      branchStatus: '已注册',
    },
  ];

  // 机遇监测数据
  const opportunityData = [
    {
      key: '1',
      name: '华为技术有限公司',
      type: '中标大单',
      description: '中标政府智慧城市项目',
      amount: '5.2亿',
      time: '2024-01-15',
    },
    {
      key: '2',
      name: '腾讯科技（深圳）有限公司',
      type: '获得融资',
      description: '旗下腾讯云完成新一轮融资',
      amount: '50亿美元',
      time: '2024-01-14',
    },
    {
      key: '3',
      name: '大疆创新科技有限公司',
      type: '新增专利',
      description: '本月新增发明专利12项',
      patentCount: 12,
      time: '2024-01-13',
    },
    {
      key: '4',
      name: '比亚迪股份有限公司',
      type: '中标大单',
      description: '中标公交集团新能源车辆采购',
      amount: '8.6亿',
      time: '2024-01-12',
    },
    {
      key: '5',
      name: '迈瑞生物医疗电子股份有限公司',
      type: '新增专利',
      description: '医疗器械领域核心专利获批',
      patentCount: 5,
      time: '2024-01-11',
    },
    {
      key: '6',
      name: '深圳某AI芯片有限公司',
      type: '获得融资',
      description: '完成B轮融资',
      amount: '3亿人民币',
      time: '2024-01-10',
    },
    {
      key: '7',
      name: '中兴通讯股份有限公司',
      type: '中标大单',
      description: '中标5G基站建设项目',
      amount: '12.8亿',
      time: '2024-01-09',
    },
    {
      key: '8',
      name: '顺丰控股股份有限公司',
      type: '新增专利',
      description: '物流自动化技术专利获批',
      patentCount: 8,
      time: '2024-01-08',
    },
  ];

  // 监测信号时间轴数据
  const timelineData = {
    '1': [
      { time: '2024-01-15', title: '欠税预警触发', desc: '累计欠税金额达128.5万元', type: 'warning' },
      { time: '2024-01-10', title: '税务申报异常', desc: '连续2个月未按时申报', type: 'info' },
      { time: '2024-01-05', title: '营收下滑', desc: '月度营收环比下降45%', type: 'info' },
      { time: '2023-12-20', title: '法人变更', desc: '企业法人发生变更', type: 'info' },
    ],
    '2': [
      { time: '2024-01-14', title: '大规模裁员预警', desc: '员工数量减少35%', type: 'warning' },
      { time: '2024-01-08', title: '社保人数骤降', desc: '社保缴纳人数减少120人', type: 'danger' },
      { time: '2024-01-03', title: '产能收缩', desc: '生产设备利用率下降至40%', type: 'info' },
    ],
  };

  // 风险类型标签
  const riskTypeMap = {
    '欠税': { color: 'red', icon: <FallOutlined /> },
    '裁员': { color: 'orange', icon: <UserOutlined /> },
    '社保断缴': { color: 'volcano', icon: <WarningOutlined /> },
  };

  // 状态标签
  const statusMap = {
    'pending': { text: '待核实', color: 'default' },
    'processing': { text: '处置中', color: 'processing' },
    'resolved': { text: '已处置', color: 'success' },
  };

  // 机遇类型标签
  const opportunityTypeMap = {
    '中标大单': { color: 'blue', icon: <FileTextOutlined /> },
    '获得融资': { color: 'green', icon: <RiseOutlined /> },
    '新增专利': { color: 'purple', icon: <SafetyOutlined /> },
  };

  // 风险监测表格列
  const riskColumns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text, record) => (
        <Button
          type="link"
          className="p-0"
          onClick={() => openDrawer(record)}
        >
          <Text strong>{text}</Text>
        </Button>
      ),
    },
    {
      title: '风险类型',
      dataIndex: 'riskType',
      width: 120,
      render: (type) => (
        <Tag
          icon={riskTypeMap[type]?.icon}
          color={riskTypeMap[type]?.color}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: '详细信息',
      key: 'detail',
      render: (_, record) => {
        if (record.amount) return <Text>欠税金额: {record.amount}</Text>;
        if (record.employeeChange) return <Text>裁员比例: {record.employeeChange}</Text>;
        if (record.months) return <Text>断缴时长: {record.months}</Text>;
        return '-';
      },
    },
    {
      title: '预警时间',
      dataIndex: 'warningTime',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => (
        <Badge
          status={
            status === 'pending'
              ? 'default'
              : status === 'processing'
              ? 'processing'
              : 'success'
          }
          text={statusMap[status]?.text}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<PhoneOutlined />}
          disabled={record.status === 'resolved'}
        >
          派单核查
        </Button>
      ),
    },
  ];

  // 外迁监测表格列
  const relocationColumns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text, record) => (
        <Button type="link" className="p-0" onClick={() => openDrawer(record)}>
          <Text strong>{text}</Text>
        </Button>
      ),
    },
    {
      title: '外迁信号',
      dataIndex: 'signal',
      width: 140,
      render: (signal) => <Tag color="orange">{signal}</Tag>,
    },
    {
      title: '目标区域',
      dataIndex: 'targetLocation',
      width: 120,
      render: (loc) => <Text type="secondary">{loc}</Text>,
    },
    {
      title: '流失概率',
      dataIndex: 'probability',
      width: 100,
      render: (value) => (
        <Text
          strong
          style={{
            color: value >= 90 ? '#f5222d' : value >= 70 ? '#faad14' : '#52c41a',
          }}
        >
          {value}%
        </Text>
      ),
    },
    {
      title: '信号详情',
      key: 'detail',
      render: (_, record) => {
        if (record.invoiceChange) return <Text>异地开票增幅: {record.invoiceChange}</Text>;
        if (record.branchStatus) return <Text>分公司状态: {record.branchStatus}</Text>;
        return <Text type="secondary">最近活动: {record.lastActivity}</Text>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: () => (
        <Button type="primary" danger size="small" icon={<UserOutlined />}>
          上门挽留
        </Button>
      ),
    },
  ];

  // 机遇监测表格列
  const opportunityColumns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text, record) => (
        <Button type="link" className="p-0" onClick={() => openDrawer(record)}>
          <Text strong>{text}</Text>
        </Button>
      ),
    },
    {
      title: '机遇类型',
      dataIndex: 'type',
      width: 120,
      render: (type) => (
        <Tag
          icon={opportunityTypeMap[type]?.icon}
          color={opportunityTypeMap[type]?.color}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: '详情',
      key: 'detail',
      render: (_, record) => {
        if (record.amount) return <Text>金额: {record.amount}</Text>;
        if (record.patentCount) return <Text>专利数: {record.patentCount}项</Text>;
        return '-';
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '发现时间',
      dataIndex: 'time',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: () => (
        <Button size="small" type="primary" icon={<PhoneOutlined />}>
          联系走访
        </Button>
      ),
    },
  ];

  // 打开详情抽屉
  const openDrawer = (record) => {
    setSelectedEnterprise(record);
    setDrawerVisible(true);
  };

  // 关闭抽屉
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedEnterprise(null);
  };

  // 切换Tab
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // 时间轴图标
  const getTimelineIcon = (type) => {
    switch (type) {
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'danger':
        return <AlertOutlined style={{ color: '#f5222d' }} />;
      default:
        return <ClockCircleOutlined style={{ color: '#1677ff' }} />;
    }
  };

  return (
    <div className="h-full flex flex-col -m-6">
      {/* 页面标题 */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <Title level={4} className="!mb-0">企业雷达监测</Title>
        <Text type="secondary">实时监测企业风险、外迁信号与发展机遇</Text>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50 p-5">
        {/* 顶部看板 */}
        <Row gutter={16} className="mb-5">
          <Col span={8}>
            <Card
              hoverable
              className="cursor-pointer"
              bodyStyle={{ padding: 20 }}
              onClick={() => handleTabChange('risk')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Text type="secondary">高危风险预警</Text>
                  <div className="mt-2">
                    <Statistic
                      value={dashboardStats.highRisk}
                      suffix="家"
                      valueStyle={{ color: '#f5222d', fontSize: 32, fontWeight: 'bold' }}
                    />
                  </div>
                </div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(245, 34, 45, 0.1)' }}
                >
                  <WarningOutlined style={{ fontSize: 28, color: '#f5222d' }} />
                </div>
              </div>
              <div className="mt-3 flex items-center text-red-500">
                <Text type="secondary" className="text-xs">点击查看风险列表</Text>
                <RightOutlined className="ml-1 text-xs" />
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              className="cursor-pointer"
              bodyStyle={{ padding: 20 }}
              onClick={() => handleTabChange('relocation')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Text type="secondary">疑似外迁预警</Text>
                  <div className="mt-2">
                    <Statistic
                      value={dashboardStats.relocation}
                      suffix="家"
                      valueStyle={{ color: '#faad14', fontSize: 32, fontWeight: 'bold' }}
                    />
                  </div>
                </div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(250, 173, 20, 0.1)' }}
                >
                  <ExportOutlined style={{ fontSize: 28, color: '#faad14' }} />
                </div>
              </div>
              <div className="mt-3 flex items-center text-orange-500">
                <Text type="secondary" className="text-xs">点击查看外迁列表</Text>
                <RightOutlined className="ml-1 text-xs" />
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              className="cursor-pointer"
              bodyStyle={{ padding: 20 }}
              onClick={() => handleTabChange('opportunity')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Text type="secondary">高潜发展机遇</Text>
                  <div className="mt-2">
                    <Statistic
                      value={dashboardStats.opportunity}
                      suffix="家"
                      valueStyle={{ color: '#52c41a', fontSize: 32, fontWeight: 'bold' }}
                    />
                  </div>
                </div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(82, 196, 26, 0.1)' }}
                >
                  <LineChartOutlined style={{ fontSize: 28, color: '#52c41a' }} />
                </div>
              </div>
              <div className="mt-3 flex items-center text-green-500">
                <Text type="secondary" className="text-xs">点击查看机遇列表</Text>
                <RightOutlined className="ml-1 text-xs" />
              </div>
            </Card>
          </Col>
        </Row>

        {/* 核心监测列表 */}
        <Card>
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={[
              {
                key: 'risk',
                label: (
                  <span>
                    <WarningOutlined />
                    风险监测
                    <Badge
                      count={dashboardStats.highRisk}
                      style={{ marginLeft: 8, backgroundColor: '#f5222d' }}
                    />
                  </span>
                ),
                children: (
                  <Table
                    columns={riskColumns}
                    dataSource={riskData}
                    pagination={{ pageSize: 5 }}
                    size="small"
                    rowClassName={(record) =>
                      record.riskLevel === 'high' ? 'bg-red-50' : ''
                    }
                  />
                ),
              },
              {
                key: 'relocation',
                label: (
                  <span>
                    <ExportOutlined />
                    外迁监测
                    <Badge
                      count={dashboardStats.relocation}
                      style={{ marginLeft: 8, backgroundColor: '#faad14' }}
                    />
                  </span>
                ),
                children: (
                  <Table
                    columns={relocationColumns}
                    dataSource={relocationData}
                    pagination={{ pageSize: 5 }}
                    size="small"
                    rowClassName={(record) =>
                      record.probability >= 90 ? 'bg-orange-50' : ''
                    }
                  />
                ),
              },
              {
                key: 'opportunity',
                label: (
                  <span>
                    <RiseOutlined />
                    机遇监测
                    <Badge
                      count={dashboardStats.opportunity}
                      style={{ marginLeft: 8, backgroundColor: '#52c41a' }}
                    />
                  </span>
                ),
                children: (
                  <Table
                    columns={opportunityColumns}
                    dataSource={opportunityData}
                    pagination={{ pageSize: 5 }}
                    size="small"
                  />
                ),
              },
            ]}
          />
        </Card>
      </div>

      {/* 右侧详情抽屉 */}
      <Drawer
        title={
          <Space>
            <SafetyOutlined />
            <span>企业监测详情</span>
          </Space>
        }
        placement="right"
        width={480}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        {selectedEnterprise && (
          <div>
            {/* 企业基本信息 */}
            <Card className="mb-4" size="small">
              <Title level={5} className="!mb-2">
                {selectedEnterprise.name}
              </Title>
              <Space direction="vertical" size="small" className="w-full">
                <Text type="secondary">统一社会信用代码: 91440300XXXXXXXXXX</Text>
                <Text type="secondary">所属网格: 南山区科技园</Text>
                <Text type="secondary">行业类别: 软件和信息技术服务业</Text>
              </Space>
            </Card>

            {/* 监测信号时间轴 */}
            <Card title="监测信号时间轴" size="small">
              <Timeline mode="left">
                {(timelineData[selectedEnterprise.key] || timelineData['1']).map(
                  (item, index) => (
                    <Timeline.Item
                      key={index}
                      dot={getTimelineIcon(item.type)}
                      label={item.time}
                    >
                      <div>
                        <Text strong>{item.title}</Text>
                        <div>
                          <Text type="secondary" className="text-xs">
                            {item.desc}
                          </Text>
                        </div>
                      </div>
                    </Timeline.Item>
                  )
                )}
              </Timeline>
            </Card>

            {/* 快速操作 */}
            <Card className="mt-4" size="small" title="快速操作">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<PhoneOutlined />}>
                  联系企业
                </Button>
                <Button block icon={<FileTextOutlined />}>
                  查看完整档案
                </Button>
                <Button block icon={<CheckCircleOutlined />}>
                  标记已处理
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default EnterpriseRadar;
