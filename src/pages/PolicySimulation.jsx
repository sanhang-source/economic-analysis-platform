import React, { useState, useRef } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Typography,
  Tooltip,
  Popconfirm,
  message,
  Empty,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  CalculatorOutlined,
  ReloadOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  BuildOutlined,
  WalletOutlined,
  RiseOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * PolicySimulation - 政策试算页面
 * 提供政策条件配置、企业筛选、推演结果展示功能
 */
const PolicySimulation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [enterpriseData, setEnterpriseData] = useState([]);
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  // 模拟统计数据
  const [statistics, setStatistics] = useState({
    enterpriseCount: 0,
    totalSubsidy: 0,
    investmentEstimate: 0,
  });

  // 筛选条件字段选项
  const filterFields = [
    { value: 'revenue', label: '营业收入', unit: '元' },
    { value: 'tax', label: '纳税额', unit: '元' },
    { value: 'tax_growth', label: '纳税增长率', unit: '%' },
    { value: 'revenue_growth', label: '营收增长率', unit: '%' },
    { value: 'industry', label: '所属行业', unit: '' },
    { value: 'scale', label: '企业规模', unit: '' },
    { value: 'employee_count', label: '员工人数', unit: '人' },
    { value: 'rd_investment', label: '研发投入', unit: '元' },
  ];

  // 运算符选项
  const operators = [
    { value: '>', label: '大于' },
    { value: '>=', label: '大于等于' },
    { value: '<', label: '小于' },
    { value: '<=', label: '小于等于' },
    { value: '=', label: '等于' },
    { value: '!=', label: '不等于' },
    { value: 'contains', label: '包含' },
  ];

  // 补贴标准选项
  const subsidyTypes = [
    { value: 'revenue_growth', label: '营收增长奖励' },
    { value: 'tech_upgrade', label: '技改补贴' },
    { value: 'rd_investment', label: '研发投入补贴' },
    { value: 'talent_introduction', label: '人才引进补贴' },
    { value: 'energy_saving', label: '节能减排补贴' },
    { value: 'digital_upgrade', label: '数字化转型补贴' },
  ];

  // 模拟企业数据
  const mockEnterpriseData = [
    { key: '1', name: '华为技术有限公司', grid: '南山区', industry: '电子信息', scale: '规上', revenue: 8500000000, subsidyAmount: 100000 },
    { key: '2', name: '腾讯科技（深圳）有限公司', grid: '南山区', industry: '软件和信息服务', scale: '规上', revenue: 5600000000, subsidyAmount: 100000 },
    { key: '3', name: '比亚迪股份有限公司', grid: '坪山区', industry: '新能源汽车', scale: '规上', revenue: 4200000000, subsidyAmount: 100000 },
    { key: '4', name: '大疆创新科技有限公司', grid: '南山区', industry: '智能制造', scale: '规上', revenue: 1800000000, subsidyAmount: 100000 },
    { key: '5', name: '迈瑞生物医疗电子股份有限公司', grid: '南山区', industry: '生物医药', scale: '规上', revenue: 1200000000, subsidyAmount: 100000 },
    { key: '6', name: '中兴通讯股份有限公司', grid: '南山区', industry: '电子信息', scale: '规上', revenue: 1100000000, subsidyAmount: 100000 },
    { key: '7', name: '顺丰控股股份有限公司', grid: '福田区', industry: '现代物流', scale: '规上', revenue: 1500000000, subsidyAmount: 100000 },
    { key: '8', name: '立讯精密工业股份有限公司', grid: '宝安区', industry: '智能制造', scale: '规上', revenue: 980000000, subsidyAmount: 100000 },
    { key: '9', name: '欧菲光集团股份有限公司', grid: '光明区', industry: '电子信息', scale: '规上', revenue: 750000000, subsidyAmount: 100000 },
    { key: '10', name: '欣旺达电子股份有限公司', grid: '宝安区', industry: '新能源汽车', scale: '规上', revenue: 680000000, subsidyAmount: 100000 },
  ];

  // 行业分布数据
  const industryData = [
    { value: 35, name: '电子信息' },
    { value: 25, name: '新能源汽车' },
    { value: 18, name: '智能制造' },
    { value: 12, name: '生物医药' },
    { value: 10, name: '现代物流' },
  ];

  // 规模分布数据
  const scaleData = {
    categories: ['规上企业', '规下企业', '微型企业'],
    values: [128, 25, 5],
  };

  // 饼图配置
  const pieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}家 ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 12,
      },
    },
    series: [
      {
        name: '行业分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        data: industryData,
      },
    ],
    color: ['#1677ff', '#00d4aa', '#faad14', '#f5222d', '#722ed1'],
  };

  // 柱状图配置
  const barOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: scaleData.categories,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      name: '企业数（家）',
    },
    series: [
      {
        name: '企业数量',
        type: 'bar',
        barWidth: '50%',
        data: scaleData.values,
        itemStyle: {
          color: '#1677ff',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  // 表格列定义
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: '所属网格',
      dataIndex: 'grid',
      key: 'grid',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: '企业规模',
      dataIndex: 'scale',
      key: 'scale',
      render: (text) => (
        <Tag color={text === '规上' ? 'green' : 'default'}>{text}</Tag>
      ),
    },
    {
      title: '营业收入',
      dataIndex: 'revenue',
      key: 'revenue',
      align: 'right',
      render: (value) => `¥${(value / 100000000).toFixed(2)}亿`,
    },
    {
      title: '预估补贴金额',
      dataIndex: 'subsidyAmount',
      key: 'subsidyAmount',
      align: 'right',
      render: (value) => (
        <Text type="success" strong>
          ¥{value.toLocaleString()}
        </Text>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="确认移除"
          description={`确定要移除企业"${record.name}"吗？`}
          onConfirm={() => handleRemoveEnterprise(record.key)}
          okText="确认"
          cancelText="取消"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            移除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // 开始试算
  const handleCalculate = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟计算结果
      const count = mockEnterpriseData.length;
      const subsidyPerEnterprise = parseInt(values.subsidyAmount) || 10;
      const totalSubsidy = count * subsidyPerEnterprise * 10000;
      const investmentEstimate = totalSubsidy * 3.3; // 假设拉动投资比例为1:3.3

      setStatistics({
        enterpriseCount: count,
        totalSubsidy,
        investmentEstimate,
      });
      setEnterpriseData(mockEnterpriseData);
      setHasResult(true);
      message.success('试算完成！');
    } catch (error) {
      console.error('Form validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
    setHasResult(false);
    setEnterpriseData([]);
    setStatistics({
      enterpriseCount: 0,
      totalSubsidy: 0,
      investmentEstimate: 0,
    });
    message.info('已重置试算条件');
  };

  // 移除企业
  const handleRemoveEnterprise = (key) => {
    const newData = enterpriseData.filter((item) => item.key !== key);
    setEnterpriseData(newData);
    setStatistics((prev) => ({
      ...prev,
      enterpriseCount: newData.length,
      totalSubsidy: newData.length * 100000,
      investmentEstimate: newData.length * 100000 * 3.3,
    }));
    message.success('已移除企业');
  };

  return (
    <div className="h-full flex flex-col -m-6">
      {/* 页面标题 */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <Title level={4} className="!mb-0">政策试算</Title>
        <Text type="secondary">配置政策条件，模拟推演政策实施效果</Text>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* 左侧配置区 */}
        <div className="w-96 bg-white border-r border-gray-200 overflow-auto">
          <div className="p-5">
            <Title level={5} className="!mb-4 flex items-center gap-2">
              <CalculatorOutlined />
              政策试算条件配置
            </Title>

            <Form
              form={form}
              layout="vertical"
              initialValues={{
                subsidyType: 'revenue_growth',
                subsidyAmount: 10,
                conditions: [{}],
              }}
            >
              {/* 政策名称 */}
              <Form.Item
                label="政策名称"
                name="policyName"
                rules={[{ required: true, message: '请输入政策名称' }]}
              >
                <Input placeholder="请输入政策名称" />
              </Form.Item>

              {/* 补贴标准 */}
              <Form.Item label="补贴标准" required>
                <Space.Compact className="w-full">
                  <Form.Item
                    name="subsidyType"
                    noStyle
                    rules={[{ required: true, message: '请选择补贴类型' }]}
                  >
                    <Select style={{ width: '60%' }} placeholder="选择补贴类型">
                      {subsidyTypes.map((type) => (
                        <Option key={type.value} value={type.value}>
                          {type.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="subsidyAmount"
                    noStyle
                    rules={[{ required: true, message: '请输入金额' }]}
                  >
                    <Input
                      type="number"
                      style={{ width: '40%' }}
                      addonAfter="万元/家"
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>

              {/* 筛选条件 */}
              <div className="mb-2">
                <Text strong>筛选条件</Text>
              </div>

              <Form.List name="conditions">
                {(fields, { add, remove }) => (
                  <div className="space-y-3">
                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Tag color="blue">条件 {name + 1}</Tag>
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              className="text-red-500 cursor-pointer"
                              onClick={() => remove(name)}
                            />
                          )}
                        </div>

                        <Space direction="vertical" className="w-full" size="small">
                          <Form.Item
                            {...restField}
                            name={[name, 'field']}
                            rules={[{ required: true, message: '选择字段' }]}
                            className="!mb-2"
                          >
                            <Select placeholder="选择筛选字段">
                              {filterFields.map((field) => (
                                <Option key={field.value} value={field.value}>
                                  {field.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'operator']}
                            rules={[{ required: true, message: '选择运算符' }]}
                            className="!mb-2"
                          >
                            <Select placeholder="选择运算符">
                              {operators.map((op) => (
                                <Option key={op.value} value={op.value}>
                                  {op.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            rules={[{ required: true, message: '输入数值' }]}
                            className="!mb-0"
                          >
                            <Input placeholder="输入条件值" />
                          </Form.Item>
                        </Space>
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加筛选条件
                    </Button>
                  </div>
                )}
              </Form.List>

              {/* 操作按钮 */}
              <div className="mt-6 space-y-2">
                <Button
                  type="primary"
                  icon={<CalculatorOutlined />}
                  loading={loading}
                  onClick={handleCalculate}
                  block
                  size="large"
                >
                  开始试算
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleReset}
                  block
                >
                  重置
                </Button>
              </div>
            </Form>
          </div>
        </div>

        {/* 右侧推演结果区 */}
        <div className="flex-1 bg-gray-50 overflow-auto p-5">
          {!hasResult ? (
            <div className="h-full flex items-center justify-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="请先配置政策条件并点击开始试算"
              />
            </div>
          ) : (
            <div className="space-y-5">
              {/* KPI 卡片 */}
              <Row gutter={16}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="符合条件企业数"
                      value={statistics.enterpriseCount}
                      suffix="家"
                      valueStyle={{ color: '#1677ff' }}
                      prefix={<BuildOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="预计财政总支出"
                      value={statistics.totalSubsidy}
                      precision={0}
                      formatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
                      valueStyle={{ color: '#00d4aa' }}
                      prefix={<WalletOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title={
                        <span>
                          拉动投资预估
                          <Tooltip title="计算公式：预计财政总支出 × 3.3（基于历史数据模型）">
                            <InfoCircleOutlined className="ml-1 text-gray-400" />
                          </Tooltip>
                        </span>
                      }
                      value={statistics.investmentEstimate}
                      precision={0}
                      formatter={(value) => `¥${(value / 100000000).toFixed(2)}亿`}
                      valueStyle={{ color: '#faad14' }}
                      prefix={<RiseOutlined />}
                    />
                  </Card>
                </Col>
              </Row>

              {/* 企业分布图表 */}
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="符合条件企业行业分布">
                    <ReactECharts
                      ref={chartRef1}
                      option={pieOption}
                      style={{ height: 280 }}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="符合条件企业规模分布">
                    <ReactECharts
                      ref={chartRef2}
                      option={barOption}
                      style={{ height: 280 }}
                    />
                  </Card>
                </Col>
              </Row>

              {/* 企业明细列表 */}
              <Card
                title={`企业明细列表（共 ${enterpriseData.length} 家）`}
                extra={
                  <Space>
                    <Button type="link" icon={<DownloadOutlined />}>
                      导出名单
                    </Button>
                  </Space>
                }
              >
                <Table
                  columns={columns}
                  dataSource={enterpriseData}
                  pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 家企业`,
                  }}
                  size="small"
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicySimulation;
