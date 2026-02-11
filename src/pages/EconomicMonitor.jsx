import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Card,
  Tree,
  DatePicker,
  Select,
  Alert,
  Table,
  Button,
  Space,
  Tag,
  Badge,
  Typography,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  WarningOutlined,
  LineChartOutlined,
  FilterOutlined,
  DownOutlined,
  UpOutlined,
  EyeOutlined,
  ExportOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { economicMonitorMock } from '../mock/economicMonitorMock';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * EconomicMonitor - 经济监测页面
 * 左侧树形筛选 + 右侧图表和数据分析
 */
const EconomicMonitor = () => {
  const [selectedKeys, setSelectedKeys] = useState(['all']);
  const [selectedMetrics, setSelectedMetrics] = useState(['output', 'tax']);
  const [dateRange, setDateRange] = useState(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const { treeData, chartData, alertData, enterpriseData, summaryStats } = economicMonitorMock;

  // 指标选项
  const metricOptions = [
    { label: '工业总产值', value: 'output', color: '#1677ff' },
    { label: '税收总额', value: 'tax', color: '#52c41a' },
    { label: '用电量', value: 'electricity', color: '#faad14' },
    { label: '用工人数', value: 'employees', color: '#722ed1' },
    { label: '利润总额', value: 'profit', color: '#eb2f96' },
  ];

  // 双轴图表配置
  const chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 1,
    },
    legend: {
      data: ['工业总产值', '同比增长率'],
      top: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartData.months,
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisLabel: { color: '#666' },
    },
    yAxis: [
      {
        type: 'value',
        name: '工业总产值（亿元）',
        position: 'left',
        axisLine: { show: true, lineStyle: { color: '#1677ff' } },
        axisLabel: { formatter: '{value}', color: '#1677ff' },
        splitLine: { lineStyle: { color: '#f0f0f0' } },
      },
      {
        type: 'value',
        name: '同比增长率（%）',
        position: 'right',
        axisLine: { show: true, lineStyle: { color: '#fa8c16' } },
        axisLabel: { formatter: '{value}%', color: '#fa8c16' },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '工业总产值',
        type: 'bar',
        data: chartData.outputValues,
        barWidth: '40%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#1677ff' },
              { offset: 1, color: '#69b1ff' },
            ],
          },
        },
      },
      {
        name: '同比增长率',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.growthRates,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#fa8c16',
          width: 3,
        },
        itemStyle: {
          color: '#fa8c16',
          borderWidth: 2,
          borderColor: '#fff',
        },
        markLine: {
          data: [{ yAxis: 0, lineStyle: { color: '#999', type: 'dashed' } }],
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
      width: 220,
      render: (text, record) => (
        <div>
          <div className="font-medium text-gray-800">{text}</div>
          <Tag size="small" color="blue">{record.industry}</Tag>
        </div>
      ),
    },
    {
      title: '本月产值（万元）',
      dataIndex: 'currentOutput',
      key: 'currentOutput',
      align: 'right',
      sorter: (a, b) => a.currentOutput - b.currentOutput,
      render: (value) => (
        <span className="font-medium">{value.toLocaleString()}</span>
      ),
    },
    {
      title: '上月产值（万元）',
      dataIndex: 'lastOutput',
      key: 'lastOutput',
      align: 'right',
      render: (value) => value.toLocaleString(),
    },
    {
      title: '环比变化',
      dataIndex: 'changeRate',
      key: 'changeRate',
      align: 'right',
      sorter: (a, b) => a.changeRate - b.changeRate,
      render: (value) => {
        const isNegative = value < 0;
        const isWarning = value < -30;
        return (
          <span
            className={`font-medium ${
              isNegative ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {isNegative ? <DownOutlined /> : <UpOutlined />}
            {Math.abs(value).toFixed(1)}%
            {isWarning && (
              <Badge
                count="异常"
                style={{ backgroundColor: '#ff4d4f', marginLeft: 8 }}
              />
            )}
          </span>
        );
      },
    },
    {
      title: '税收（万元）',
      dataIndex: 'tax',
      key: 'tax',
      align: 'right',
      render: (value) => value.toLocaleString(),
    },
    {
      title: '用电量（万度）',
      dataIndex: 'electricity',
      key: 'electricity',
      align: 'right',
      render: (value) => value.toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: () => (
        <Button type="link" size="small" icon={<EyeOutlined />}>
          详情
        </Button>
      ),
    },
  ];

  // 展开行内容
  const expandedRowRender = (record) => (
    <div className="p-4 bg-gray-50 rounded-lg">
      <Row gutter={24}>
        <Col span={6}>
          <Statistic title="员工人数" value={record.employees} suffix="人" />
        </Col>
        <Col span={6}>
          <Statistic title="利润总额" value={record.profit} suffix="万元" />
        </Col>
        <Col span={6}>
          <Statistic title="研发投入" value={record.rdInvestment} suffix="万元" />
        </Col>
        <Col span={6}>
          <Statistic title="亩均税收" value={record.landTax} suffix="万元/亩" />
        </Col>
      </Row>
      <div className="mt-4 text-gray-500 text-sm">
        <div className="mb-2">
          <span className="font-medium">预警分析：</span>
          {record.changeRate < -30 ? (
            <span className="text-red-500">
              该企业本月产值环比下降 {Math.abs(record.changeRate).toFixed(1)}%，
              主要原因是 {record.reason || '订单减少，产能利用率下降'}
            </span>
          ) : (
            <span>该企业生产经营正常</span>
          )}
        </div>
        <div>
          <span className="font-medium">建议措施：</span>
          {record.changeRate < -30 ? (
            <span>建议挂点领导走访调研，了解企业困难，协调解决问题</span>
          ) : (
            <span>继续保持关注</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex -mx-6 -mt-6">
      {/* 左侧筛选栏 */}
      <div className="w-[200px] bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <FilterOutlined />
            <span>筛选条件</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="mb-4">
            <Text type="secondary" className="text-xs">维度选择</Text>
          </div>
          <Tree
            treeData={treeData}
            selectedKeys={selectedKeys}
            onSelect={setSelectedKeys}
            defaultExpandAll
            blockNode
          />
        </div>
      </div>

      {/* 右侧主内容区 */}
      <div className="flex-1 p-6 overflow-auto">
        {/* 顶部筛选栏 */}
        <Card className="mb-6 shadow-sm" size="small">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <RangePicker
                placeholder={['开始日期', '结束日期']}
                onChange={setDateRange}
              />
              <Select
                mode="multiple"
                placeholder="选择监测指标"
                value={selectedMetrics}
                onChange={setSelectedMetrics}
                style={{ width: 300 }}
                maxTagCount={2}
              >
                {metricOptions.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    <span style={{ color: opt.color }}>●</span> {opt.label}
                  </Option>
                ))}
              </Select>
            </div>
            <Space>
              <Button icon={<ExportOutlined />}>导出报告</Button>
              <Button type="primary" icon={<BellOutlined />}>
                设置预警
              </Button>
            </Space>
          </div>
        </Card>

        {/* 统计概览 */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="监测企业数"
                value={summaryStats.enterpriseCount}
                suffix="家"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="本月总产值"
                value={summaryStats.totalOutput}
                suffix="亿元"
                valueStyle={{ color: '#1677ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="同比增长"
                value={summaryStats.yoyGrowth}
                suffix="%"
                valueStyle={{ color: summaryStats.yoyGrowth >= 0 ? '#52c41a' : '#ff4d4f' }}
                prefix={summaryStats.yoyGrowth >= 0 ? <UpOutlined /> : <DownOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="异常企业"
                value={summaryStats.abnormalCount}
                suffix="家"
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 主图表 */}
        <Card
          title={
            <div className="flex items-center gap-2">
              <LineChartOutlined className="text-blue-500" />
              <span>经济运行趋势</span>
            </div>
          }
          className="mb-6 shadow-sm"
          extra={<Text type="secondary">数据来源：市统计局</Text>}
        >
          <ReactECharts
            option={chartOption}
            style={{ height: 400 }}
            opts={{ renderer: 'canvas' }}
          />
        </Card>

        {/* 异常预警 */}
        <Alert
          message={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WarningOutlined className="text-red-500" />
                <span className="font-semibold">异常预警</span>
                <span>
                  本月监测到 {alertData.abnormalCount} 家企业产值异常波动（下降 &gt; 30%）
                </span>
              </div>
              <Button type="link" size="small">
                查看详情
              </Button>
            </div>
          }
          description="建议挂点领导及时走访，了解企业经营困难，协调解决问题"
          type="warning"
          showIcon={false}
          className="mb-6 border-red-200"
        />

        {/* 详细数据表 */}
        <Card
          title={
            <div className="flex items-center justify-between">
              <span>企业详细数据</span>
              <Text type="secondary" className="text-sm">
                点击行可展开查看详情
              </Text>
            </div>
          }
          className="shadow-sm"
        >
          <Table
            columns={columns}
            dataSource={enterpriseData}
            rowKey="id"
            expandable={{
              expandedRowRender,
              expandedRowKeys,
              onExpandedRowsChange: setExpandedRowKeys,
            }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 家企业`,
            }}
            size="middle"
          />
        </Card>
      </div>
    </div>
  );
};

export default EconomicMonitor;
