import React, { useState } from 'react';
import {
  Card,
  Table,
  Form,
  Input,
  Select,
  Button,
  Tag,
  Avatar,
  Space,
  Dropdown,
  Badge,
  Pagination,
  Row,
  Col,
  Typography,
  Tooltip,
  Divider,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  DownOutlined,
  PlusOutlined,
  ExportOutlined,
  TagsOutlined,
  BellOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  UpOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { enterpriseListMock } from '../mock/enterpriseListMock';

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * EnterpriseList - 企业名录页面
 * 可折叠筛选 + 表格列表 + 分页
 */
const EnterpriseList = () => {
  const [form] = Form.useForm();
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { enterprises, total } = enterpriseListMock;

  // 表格列定义
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      width: 280,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            size="large"
            style={{
              background: record.logoColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {text.charAt(0)}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-800">{text}</div>
            <div className="text-xs text-gray-400">{record.code}</div>
          </div>
        </div>
      ),
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      key: 'industry',
      width: 140,
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '本年产值',
      dataIndex: 'outputValue',
      key: 'outputValue',
      width: 150,
      align: 'right',
      sorter: (a, b) => a.outputValue - b.outputValue,
      render: (value) => {
        // value 单位是万元，转换为亿元显示
        const yi = value / 10000;
        if (yi >= 100) {
          return (
            <span className="font-bold text-gray-800">
              ¥{yi.toFixed(0)}亿
            </span>
          );
        } else if (yi >= 1) {
          return (
            <span className="font-medium text-gray-700">
              ¥{yi.toFixed(2)}亿
            </span>
          );
        } else {
          // 小于1亿，用万元显示
          return (
            <span className="font-medium text-gray-700">
              ¥{value}万
            </span>
          );
        }
      },
    },
    {
      title: '亩均评价',
      dataIndex: 'landEfficiency',
      key: 'landEfficiency',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.landEfficiency.localeCompare(b.landEfficiency),
      render: (grade) => {
        const colorMap = {
          A: { color: 'green', text: 'A类', bg: '#f6ffed', border: '#b7eb8f' },
          B: { color: 'blue', text: 'B类', bg: '#e6f7ff', border: '#91d5ff' },
          C: { color: 'orange', text: 'C类', bg: '#fff7e6', border: '#ffd591' },
          D: { color: 'red', text: 'D类', bg: '#fff1f0', border: '#ffa39e' },
        };
        const config = colorMap[grade];
        return (
          <Tag
            style={{
              background: config.bg,
              borderColor: config.border,
              color: config.color === 'green' ? '#52c41a' : config.color === 'blue' ? '#1677ff' : config.color === 'orange' ? '#fa8c16' : '#f5222d',
              fontWeight: 'bold',
              minWidth: 50,
              textAlign: 'center',
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: '纳税等级',
      dataIndex: 'taxGrade',
      key: 'taxGrade',
      width: 100,
      align: 'center',
      render: (grade) => {
        const colors = { A: 'success', B: 'processing', C: 'warning', D: 'error' };
        return <Badge status={colors[grade]} text={grade} />;
      },
    },
    {
      title: '企业标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (tags) => (
        <Space wrap>
          {tags.map((tag) => {
            const tagColors = {
              '专精特新': 'purple',
              '高新技术企业': 'geekblue',
              '隐形冠军': 'gold',
              '瞪羚企业': 'cyan',
              '上市企业': 'red',
            };
            return (
              <Tag key={tag} color={tagColors[tag]} size="small">
                {tag}
              </Tag>
            );
          })}
        </Space>
      ),
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
      width: 180,
      render: (contact) => (
        <div>
          <div className="text-gray-800">{contact.name}</div>
          <div className="text-xs text-gray-400">{contact.phone}</div>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="查看详情">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined className="text-blue-500" />}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined className="text-green-500" />}
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                { key: '1', label: '发送通知' },
                { key: '2', label: '调整标签' },
                { type: 'divider' },
                { key: '3', label: '删除', danger: true },
              ],
            }}
            placement="bottomRight"
          >
            <Button type="text" size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // 搜索表单提交
  const handleSearch = (values) => {
    console.log('搜索条件:', values);
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // 批量操作菜单
  const batchMenuItems = [
    { key: 'export', icon: <ExportOutlined />, label: '批量导出' },
    { key: 'tags', icon: <TagsOutlined />, label: '批量打标签' },
    { key: 'notify', icon: <BellOutlined />, label: '发送通知' },
  ];

  return (
    <div className="space-y-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={4} className="!mb-0 flex items-center gap-2">
            <BankOutlined className="text-blue-500" />
            企业名录
          </Title>
          <Text type="secondary" className="text-sm">
            管理辖区内所有入驻企业信息
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          新增企业
        </Button>
      </div>

      {/* 可折叠筛选区 */}
      <Card
        size="small"
        className="shadow-sm"
        title={
          <div className="flex items-center gap-2">
            <FilterOutlined />
            <span>筛选条件</span>
          </div>
        }
        extra={
          <Button
            type="link"
            onClick={() => setFilterCollapsed(!filterCollapsed)}
            icon={filterCollapsed ? <UpOutlined /> : <DownOutlined />}
          >
            {filterCollapsed ? '收起' : '展开'}
          </Button>
        }
      >
        <Form
          form={form}
          onFinish={handleSearch}
          className={filterCollapsed ? 'hidden' : 'block'}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="name" label="企业名称">
                <Input placeholder="请输入企业名称" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="industry" label="所属行业">
                <Select placeholder="请选择行业" allowClear>
                  <Option value="智能制造">智能制造</Option>
                  <Option value="新能源">新能源</Option>
                  <Option value="生物医药">生物医药</Option>
                  <Option value="电子信息">电子信息</Option>
                  <Option value="新材料">新材料</Option>
                  <Option value="现代物流">现代物流</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="outputRange" label="产值区间">
                <Select placeholder="请选择产值区间" allowClear>
                  <Option value="0-1000">1000万以下</Option>
                  <Option value="1000-5000">1000万-5000万</Option>
                  <Option value="5000-10000">5000万-1亿</Option>
                  <Option value="10000-50000">1亿-5亿</Option>
                  <Option value="50000+">5亿以上</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="taxGrade" label="纳税等级">
                <Select placeholder="请选择纳税等级" allowClear>
                  <Option value="A">A级</Option>
                  <Option value="B">B级</Option>
                  <Option value="C">C级</Option>
                  <Option value="D">D级</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="tags" label="企业标签">
                <Select placeholder="请选择标签" allowClear mode="multiple">
                  <Option value="专精特新">专精特新</Option>
                  <Option value="高新技术企业">高新技术企业</Option>
                  <Option value="隐形冠军">隐形冠军</Option>
                  <Option value="瞪羚企业">瞪羚企业</Option>
                  <Option value="上市企业">上市企业</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="landEfficiency" label="亩均评价">
                <Select placeholder="请选择亩均评价" allowClear>
                  <Option value="A">A类</Option>
                  <Option value="B">B类</Option>
                  <Option value="C">C类</Option>
                  <Option value="D">D类</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item className="flex justify-end">
                <Space>
                  <Button icon={<ReloadOutlined />} onClick={handleReset}>
                    重置
                  </Button>
                  <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                    搜索
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 操作栏 */}
      <Card size="small" className="shadow-sm">
        <div className="flex items-center justify-between">
          {/* 左侧：统计信息 */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              共 <span className="text-blue-600 font-semibold text-lg">{total}</span> 家企业
            </span>
            {selectedRowKeys.length > 0 && (
              <>
                <Divider type="vertical" />
                <span className="text-gray-600">
                  已选择 <span className="text-blue-600 font-semibold">{selectedRowKeys.length}</span> 项
                </span>
                <Button type="link" size="small" onClick={() => setSelectedRowKeys([])}>
                  取消选择
                </Button>
              </>
            )}
          </div>

          {/* 右侧：操作按钮组 */}
          <Space>
            <Button icon={<ExportOutlined />}>批量导出</Button>
            <Button icon={<TagsOutlined />}>批量打标签</Button>
            <Button icon={<BellOutlined />}>发送通知</Button>
            <Dropdown menu={{ items: batchMenuItems }} placement="bottomRight">
              <Button>
                更多操作 <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </div>
      </Card>

      {/* 数据表格 */}
      <Card className="shadow-sm" bodyStyle={{ padding: 0 }}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={enterprises}
          rowKey="id"
          pagination={false}
          scroll={{ x: 1400 }}
          size="middle"
        />

        {/* 分页器 */}
        <div className="flex justify-end p-4 border-t border-gray-100">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `共 ${total} 条记录，第 ${range[0]}-${range[1]} 条`
            }
            pageSizeOptions={[10, 20, 50, 100]}
            onChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default EnterpriseList;
