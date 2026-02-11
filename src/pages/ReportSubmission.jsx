import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Progress,
  Button,
  Space,
  Select,
  Badge,
  Tooltip,
  message,
  Modal,
  Statistic,
  Row,
  Col,
  Typography,
  Avatar,
  Timeline,
} from 'antd';
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  BellOutlined,
  ExportOutlined,
  EyeOutlined,
  MessageOutlined,
  SendOutlined,
  DownOutlined,
  CalendarOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { reportSubmissionMock } from '../mock/reportSubmissionMock';

const { Title, Text } = Typography;
const { Option } = Select;
const { Countdown } = Statistic;

/**
 * ReportSubmission - 报表填报页面
 * 任务列表 + 填报详情 + 批量操作
 */
const ReportSubmission = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isUrgeModalVisible, setIsUrgeModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  const { activeTasks, submissionData } = reportSubmissionMock;

  // 计算倒计时
  const calculateDeadline = (days) => {
    return Date.now() + days * 24 * 60 * 60 * 1000;
  };

  // 获取状态标签
  const getStatusTag = (status) => {
    const statusMap = {
      submitted: { color: 'success', text: '已填报', icon: <CheckCircleOutlined /> },
      draft: { color: 'warning', text: '草稿', icon: <WarningOutlined /> },
      notStarted: { color: 'error', text: '未填报', icon: <CloseCircleOutlined /> },
    };
    const config = statusMap[status];
    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>;
  };

  // 获取审核状态标签
  const getAuditTag = (status) => {
    const statusMap = {
      pending: { color: 'processing', text: '待审核' },
      approved: { color: 'success', text: '已通过' },
      rejected: { color: 'error', text: '已驳回' },
      '-': { color: 'default', text: '-' },
    };
    const config = statusMap[status];
    return <Badge status={config.color} text={config.text} />;
  };

  // 处理一键催报
  const handleBatchUrge = () => {
    const notSubmittedCount = submissionData.filter(
      (item) => item.status === 'notStarted'
    ).length;
    
    if (notSubmittedCount === 0) {
      message.info('当前没有未填报的企业');
      return;
    }
    
    setIsUrgeModalVisible(true);
  };

  // 确认发送催报
  const handleSendUrge = () => {
    message.success('催报短信已发送给 15 家未填报企业');
    setIsUrgeModalVisible(false);
  };

  // 查看详情
  const handleViewDetail = (record) => {
    setSelectedEnterprise(record);
    setIsDetailModalVisible(true);
  };

  // 单个催报
  const handleSingleUrge = (record) => {
    message.success(`已发送催报通知给 ${record.name}`);
  };

  // 表格列定义
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      width: 240,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            size="default"
            style={{ background: record.logoColor }}
          >
            {text.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium text-gray-800">{text}</div>
            <div className="text-xs text-gray-400">{record.code}</div>
          </div>
        </div>
      ),
    },
    {
      title: '填报状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status) => getStatusTag(status),
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: 160,
      render: (text) => text || '-',
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      key: 'auditStatus',
      width: 120,
      align: 'center',
      render: (status) => getAuditTag(status),
    },
    {
      title: '填报进度',
      dataIndex: 'progress',
      key: 'progress',
      width: 160,
      render: (value, record) => (
        <div>
          <Progress
            percent={value}
            size="small"
            status={record.status === 'submitted' ? 'success' : 'active'}
            strokeColor={record.status === 'notStarted' ? '#ff4d4f' : '#1677ff'}
          />
          <div className="text-xs text-gray-400 mt-1">
            {value === 100 ? '已完成' : `已完成 ${value}%`}
          </div>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            查看
          </Button>
          {record.status !== 'submitted' && (
            <Button
              type="link"
              size="small"
              icon={<BellOutlined />}
              onClick={() => handleSingleUrge(record)}
            >
              催报
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 筛选后的数据
  const filteredData = submissionData.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  // 统计数据
  const stats = {
    total: submissionData.length,
    submitted: submissionData.filter((i) => i.status === 'submitted').length,
    draft: submissionData.filter((i) => i.status === 'draft').length,
    notStarted: submissionData.filter((i) => i.status === 'notStarted').length,
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={4} className="!mb-1 flex items-center gap-2">
            <FileTextOutlined className="text-blue-500" />
            报表填报
          </Title>
          <Text type="secondary" className="text-sm">
            经济数据统计填报管理 · 催报提醒 · 数据审核
          </Text>
        </div>
        <Button type="primary" icon={<CalendarOutlined />}>
          填报日历
        </Button>
      </div>

      {/* 进行中的任务卡片 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClockCircleOutlined className="text-orange-500" />
            <span className="font-semibold text-gray-800">进行中的任务</span>
            <Badge count={activeTasks.length} style={{ backgroundColor: '#1677ff' }} />
          </div>
          <Button type="link">查看历史任务</Button>
        </div>

        <Row gutter={16}>
          {activeTasks.map((task) => (
            <Col span={12} key={task.id}>
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTask?.id === task.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedTask(task)}
                bodyStyle={{ padding: 20 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileTextOutlined className="text-blue-500" />
                      <span className="font-semibold text-gray-800">{task.name}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      填报周期：{task.period}
                    </div>
                    
                    {/* 填报进度 */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">填报进度</span>
                        <span className="font-medium text-blue-600">
                          {task.submitted}/{task.total} 家
                        </span>
                      </div>
                      <Progress
                        percent={Math.round((task.submitted / task.total) * 100)}
                        size="small"
                        strokeColor={task.progress >= 80 ? '#52c41a' : task.progress >= 50 ? '#faad14' : '#ff4d4f'}
                      />
                    </div>

                    {/* 截止时间 */}
                    <div className="flex items-center gap-2 text-sm">
                      <ClockCircleOutlined className="text-gray-400" />
                      <span className="text-gray-500">截止：</span>
                      <span className="font-medium text-gray-700">{task.deadline}</span>
                      <Tag 
                        color={task.urgency === 'high' ? 'red' : task.urgency === 'medium' ? 'orange' : 'blue'}
                        className="ml-2"
                      >
                        剩余 {task.daysLeft} 天
                      </Tag>
                    </div>
                  </div>

                  {/* 右侧统计 */}
                  <div className="text-right ml-4">
                    <div className="text-3xl font-bold text-gray-800">
                      {Math.round((task.submitted / task.total) * 100)}%
                    </div>
                    <div className="text-xs text-gray-400">完成率</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 选中任务的详情区域 */}
      {selectedTask && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* 任务标题和统计 */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title level={5} className="!mb-1">{selectedTask.name}</Title>
              <Text type="secondary">填报周期：{selectedTask.period}</Text>
            </div>
            <div className="flex gap-4 text-center">
              <Statistic title="应填企业" value={stats.total} suffix="家" />
              <Statistic title="已填报" value={stats.submitted} suffix="家" valueStyle={{ color: '#52c41a' }} />
              <Statistic title="草稿" value={stats.draft} suffix="家" valueStyle={{ color: '#faad14' }} />
              <Statistic title="未填报" value={stats.notStarted} suffix="家" valueStyle={{ color: '#ff4d4f' }} />
            </div>
          </div>

          {/* 批量操作栏 */}
          <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
            <Space>
              <Select
                placeholder="筛选状态"
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 120 }}
              >
                <Option value="all">全部状态</Option>
                <Option value="submitted">已填报</Option>
                <Option value="draft">草稿</Option>
                <Option value="notStarted">未填报</Option>
              </Select>
            </Space>

            <Space>
              <Button
                type="primary"
                danger
                icon={<MessageOutlined />}
                onClick={handleBatchUrge}
              >
                一键催报未填企业 ({stats.notStarted})
              </Button>
              <Button icon={<ExportOutlined />}>
                导出已填数据
              </Button>
            </Space>
          </div>

          {/* 填报详情表格 */}
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 家企业`,
            }}
            scroll={{ x: 1000 }}
            size="middle"
          />
        </div>
      )}

      {!selectedTask && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <FileTextOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />
          <div className="mt-4 text-gray-500">请点击上方任务卡片查看填报详情</div>
        </div>
      )}

      {/* 催报确认弹窗 */}
      <Modal
        title="一键催报"
        open={isUrgeModalVisible}
        onOk={handleSendUrge}
        onCancel={() => setIsUrgeModalVisible(false)}
        okText="确认发送"
        cancelText="取消"
      >
        <div className="py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <MessageOutlined className="text-orange-500 text-xl" />
            </div>
            <div>
              <div className="font-medium">短信催报</div>
              <div className="text-gray-500 text-sm">将向未填报企业发送催报短信</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="text-sm text-gray-600 mb-2">发送对象：</div>
            <div className="font-medium">{stats.notStarted} 家未填报企业</div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">短信内容预览：</div>
            <div className="text-sm">
              【XX市大数据局】{selectedTask?.name} 填报截止日期为 {selectedTask?.deadline}，
              请及时登录经济运行分析平台完成数据填报。如有疑问请联系：0755-12345678。
            </div>
          </div>
        </div>
      </Modal>

      {/* 企业填报详情弹窗 */}
      <Modal
        title="填报详情"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            关闭
          </Button>,
          selectedEnterprise?.status !== 'submitted' && (
            <Button key="urge" type="primary" onClick={() => {
              handleSingleUrge(selectedEnterprise);
              setIsDetailModalVisible(false);
            }}>
              发送催报
            </Button>
          ),
        ]}
        width={700}
      >
        {selectedEnterprise && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Avatar size={64} style={{ background: selectedEnterprise.logoColor }}>
                {selectedEnterprise.name.charAt(0)}
              </Avatar>
              <div>
                <div className="text-xl font-semibold">{selectedEnterprise.name}</div>
                <div className="text-gray-500">{selectedEnterprise.code}</div>
              </div>
              <div className="ml-auto">
                {getStatusTag(selectedEnterprise.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">填报状态</div>
                <div className="font-medium">{selectedEnterprise.status === 'submitted' ? '已提交' : selectedEnterprise.status === 'draft' ? '草稿' : '未开始'}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">提交时间</div>
                <div className="font-medium">{selectedEnterprise.submitTime || '-'}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">审核状态</div>
                <div className="font-medium">{selectedEnterprise.auditStatus === 'pending' ? '待审核' : selectedEnterprise.auditStatus === 'approved' ? '已通过' : selectedEnterprise.auditStatus === 'rejected' ? '已驳回' : '-'}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">填报进度</div>
                <div className="font-medium">{selectedEnterprise.progress}%</div>
              </div>
            </div>

            {selectedEnterprise.data && (
              <div>
                <div className="font-medium mb-3">填报数据</div>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">指标名称</th>
                        <th className="px-4 py-2 text-right">本月数值</th>
                        <th className="px-4 py-2 text-right">上月数值</th>
                        <th className="px-4 py-2 text-right">环比</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(selectedEnterprise.data).map(([key, value]) => (
                        <tr key={key} className="border-t">
                          <td className="px-4 py-2">{key}</td>
                          <td className="px-4 py-2 text-right font-medium">{value.current}</td>
                          <td className="px-4 py-2 text-right text-gray-500">{value.last}</td>
                          <td className={`px-4 py-2 text-right ${value.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {value.change >= 0 ? '+' : ''}{value.change}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!selectedEnterprise.data && (
              <div className="text-center py-8 text-gray-400">
                <FileTextOutlined style={{ fontSize: 48 }} className="mb-2" />
                <div>该企业尚未提交数据</div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReportSubmission;
