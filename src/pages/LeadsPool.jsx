import React, { useState } from 'react';
import {
  Table,
  Input,
  Tag,
  Button,
  Badge,
  Space,
  Tooltip,
  message,
  Dropdown,
  Modal,
  Form,
  Select,
  DatePicker,
  Upload,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  SettingOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  MoreOutlined,
  DownloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { leadsPoolMock } from '../mock/leadsPoolMock';

const { Search } = Input;
const { Option } = Select;

/**
 * LeadsPool - 线索公海页面
 * 线索管理、分配、跟进
 */
const LeadsPool = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'assign' | 'import'
  const [selectedLead, setSelectedLead] = useState(null);
  const [form] = Form.useForm();

  const { leads, statistics } = leadsPoolMock;

  // 状态筛选配置
  const statusTabs = [
    { key: 'all', label: '全部', count: statistics.total },
    { key: 'new', label: '新线索', count: statistics.new },
    { key: 'following', label: '已跟进', count: statistics.following },
    { key: 'pending', label: '搁置', count: statistics.pending },
  ];

  // 处理领取线索
  const handleClaim = (record) => {
    message.success('领取成功，请在「我的项目」中查看');
  };

  // 处理指派
  const handleAssign = (record) => {
    setSelectedLead(record);
    setModalType('assign');
    setIsModalVisible(true);
  };

  // 处理导入
  const handleImport = () => {
    setModalType('import');
    setIsModalVisible(true);
  };

  // 处理手动录入
  const handleManualAdd = () => {
    message.info('手动录入功能开发中...');
  };

  // 处理分配规则设置
  const handleSetting = () => {
    message.info('分配规则设置功能开发中...');
  };

  // 确认指派
  const handleAssignConfirm = () => {
    form.validateFields().then((values) => {
      message.success(`已将「${selectedLead?.name}」指派给 ${values.assignee}`);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  // 表格列定义
  const columns = [
    {
      title: '线索名称',
      dataIndex: 'name',
      key: 'name',
      width: 280,
      render: (text, record) => (
        <div>
          <div className="font-medium text-gray-800">{text}</div>
          <div className="text-xs text-gray-400 mt-1">{record.description}</div>
        </div>
      ),
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width: 120,
      render: (source) => {
        const sourceColors = {
          '展会': 'blue',
          '官网': 'cyan',
          '转介绍': 'green',
          '电话咨询': 'orange',
          '邮件咨询': 'purple',
          '社交媒体': 'pink',
          '合作伙伴': 'geekblue',
          '上门拜访': 'gold',
        };
        return <Tag color={sourceColors[source] || 'default'}>{source}</Tag>;
      },
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
      width: 200,
      render: (contact) => (
        <div>
          <div className="flex items-center gap-1">
            <UserOutlined className="text-gray-400 text-xs" />
            <span className="font-medium">{contact.name}</span>
            <Tag size="small" className="text-xs ml-1">{contact.position}</Tag>
          </div>
          <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
            <PhoneOutlined className="text-xs" />
            {contact.phone}
          </div>
          <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
            <MailOutlined className="text-xs" />
            {contact.email}
          </div>
        </div>
      ),
    },
    {
      title: '预计投资',
      dataIndex: 'investment',
      key: 'investment',
      width: 120,
      align: 'right',
      render: (value) => (
        <span className="font-medium text-gray-700">
          ¥{value >= 1 ? `${value}亿` : `${value * 10000}万`}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status) => {
        const statusMap = {
          '待分配': { color: 'error', text: '待分配' },
          '待跟进': { color: 'processing', text: '待跟进' },
          '跟进中': { color: 'warning', text: '跟进中' },
          '已搁置': { color: 'default', text: '已搁置' },
        };
        const config = statusMap[status];
        return <Badge status={config.color} text={config.text} />;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          {record.status === '待分配' && (
            <Button
              type="primary"
              size="small"
              onClick={() => handleClaim(record)}
            >
              领取
            </Button>
          )}
          <Button
            size="small"
            onClick={() => handleAssign(record)}
          >
            指派
          </Button>
          <Dropdown
            menu={{
              items: [
                { key: 'view', label: '查看详情' },
                { key: 'edit', label: '编辑' },
                { key: 'follow', label: '添加跟进' },
                { type: 'divider' },
                { key: 'delete', label: '删除', danger: true },
              ],
            }}
            placement="bottomRight"
          >
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // 筛选后的数据
  const filteredData = leads.filter((item) => {
    const matchStatus = statusFilter === 'all' || item.statusKey === statusFilter;
    const matchSearch = !searchText || 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.contact.name.includes(searchText) ||
      item.contact.phone.includes(searchText);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">线索公海</h1>
          <p className="text-gray-500 mt-1">
            共 {statistics.total} 条线索 · 新线索 {statistics.new} 条
          </p>
        </div>
      </div>

      {/* 顶部工具栏 */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
        {/* 左侧：快速搜索 */}
        <Search
          placeholder="搜索企业名/联系人/手机号"
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={setSearchText}
          style={{ width: 280 }}
          prefix={<SearchOutlined className="text-gray-400" />}
        />

        {/* 中间：状态筛选 */}
        <Space size="small">
          {statusTabs.map((tab) => (
            <Tag
              key={tab.key}
              color={statusFilter === tab.key ? 'blue' : 'default'}
              className="cursor-pointer px-3 py-1 text-sm"
              onClick={() => setStatusFilter(tab.key)}
            >
              {tab.label}
              <span className="ml-1 text-xs opacity-70">({tab.count})</span>
            </Tag>
          ))}
        </Space>

        {/* 右侧：按钮组 */}
        <Space>
          <Button icon={<UploadOutlined />} onClick={handleImport}>
            导入线索
          </Button>
          <Button icon={<DownloadOutlined />}>
            下载模板
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleManualAdd}>
            手动录入
          </Button>
          <Button icon={<SettingOutlined />} onClick={handleSetting}>
            分配规则
          </Button>
        </Space>
      </div>

      {/* 数据表格 */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </div>

      {/* 指派弹窗 */}
      <Modal
        title="指派线索"
        open={isModalVisible && modalType === 'assign'}
        onOk={handleAssignConfirm}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText="确认指派"
        cancelText="取消"
      >
        <div className="mb-4">
          <div className="text-gray-600 mb-2">线索名称：</div>
          <div className="font-medium">{selectedLead?.name}</div>
        </div>
        <Form form={form} layout="vertical">
          <Form.Item
            name="assignee"
            label="指派人"
            rules={[{ required: true, message: '请选择指派人' }]}
          >
            <Select placeholder="请选择招商专员">
              <Option value="张经理">张经理（招商一部）</Option>
              <Option value="李总监">李总监（招商二部）</Option>
              <Option value="王主任">王主任（招商三部）</Option>
              <Option value="赵专员">赵专员（产业促进科）</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="deadline"
            label="跟进截止日期"
          >
            <DatePicker style={{ width: '100%' }} placeholder="选择截止日期" />
          </Form.Item>
          <Form.Item
            name="remark"
            label="备注"
          >
            <Input.TextArea rows={3} placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 导入弹窗 */}
      <Modal
        title="批量导入线索"
        open={isModalVisible && modalType === 'import'}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        okText="开始导入"
        cancelText="取消"
      >
        <div className="text-center py-8">
          <Upload.Dragger
            name="file"
            accept=".xlsx,.xls,.csv"
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ fontSize: 48, color: '#1677ff' }} />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint text-gray-400">
              支持 .xlsx、.xls、.csv 格式，文件大小不超过 10MB
            </p>
          </Upload.Dragger>
          <div className="mt-4 text-left text-sm text-gray-500">
            <div className="font-medium mb-2">导入说明：</div>
            <ul className="list-disc list-inside space-y-1">
              <li>请先下载导入模板，按模板格式填写数据</li>
              <li>必填字段：线索名称、联系人、联系电话</li>
              <li>系统会自动去重，重复线索将跳过</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeadsPool;
