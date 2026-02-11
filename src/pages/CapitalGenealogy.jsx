import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  Input,
  List,
  Tag,
  Space,
  Typography,
  Avatar,
  Button,
  Table,
  Progress,
  Badge,
  Modal,
  Empty,
  Statistic,
  Divider,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  TeamOutlined,
  GlobalOutlined,
  ExportOutlined,
  ShareAltOutlined,
  EyeOutlined,
  BankOutlined,
  AimOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
  CloseOutlined,
  ApartmentOutlined,
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Title, Text } = Typography;
const { Search } = Input;

/**
 * CapitalGenealogy - 企业族谱页面（重构版）
 * 左右分栏布局：左侧系族列表 + 右侧详情区
 */
const CapitalGenealogy = () => {
  const [selectedClan, setSelectedClan] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [graphModalVisible, setGraphModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // 模拟系族列表数据
  const clanList = [
    { id: '1', name: '腾讯系', coreCompany: '腾讯控股有限公司', count: 156, totalCapital: '850亿', owner: '马化腾', color: '#1677ff' },
    { id: '2', name: '阿里系', coreCompany: '阿里巴巴集团控股有限公司', count: 128, totalCapital: '720亿', owner: '张勇', color: '#fa8c16' },
    { id: '3', name: '吉利系', coreCompany: '浙江吉利控股集团有限公司', count: 86, totalCapital: '450亿', owner: '李书福', color: '#52c41a' },
    { id: '4', name: '华为系', coreCompany: '华为投资控股有限公司', count: 42, totalCapital: '380亿', owner: '任正非', color: '#fa541c' },
    { id: '5', name: '比亚迪系', coreCompany: '比亚迪股份有限公司', count: 38, totalCapital: '320亿', owner: '王传福', color: '#722ed1' },
    { id: '6', name: '大疆系', coreCompany: '深圳市大疆创新科技有限公司', count: 24, totalCapital: '180亿', owner: '汪滔', color: '#13c2c2' },
    { id: '7', name: '本地龙头A系', coreCompany: '深圳本地龙头企业集团', count: 32, totalCapital: '150亿', owner: '本地企业家', color: '#eb2f96' },
    { id: '8', name: '顺丰系', coreCompany: '顺丰控股股份有限公司', count: 28, totalCapital: '120亿', owner: '王卫', color: '#f5222d' },
    { id: '9', name: '中兴系', coreCompany: '中兴通讯股份有限公司', count: 35, totalCapital: '200亿', owner: '李自学', color: '#1890ff' },
    { id: '10', name: '迈瑞系', coreCompany: '迈瑞生物医疗电子股份有限公司', count: 18, totalCapital: '95亿', owner: '李西廷', color: '#2f4554' },
  ];

  // 模拟成员企业表格数据
  const memberCompaniesData = {
    '1': [
      { id: '101', name: '腾讯控股有限公司', level: 'core', ratio: 100, capital: '1000万港元', region: 'outside', regionName: '开曼群岛' },
      { id: '102', name: '深圳市腾讯计算机系统有限公司', level: 'first', ratio: 100, capital: '6500万人民币', region: 'local', regionName: '深圳南山' },
      { id: '103', name: '腾讯音乐娱乐集团', level: 'first', ratio: 58, capital: '5000万美元', region: 'local', regionName: '深圳南山' },
      { id: '104', name: '微信科技（深圳）有限公司', level: 'first', ratio: 100, capital: '1亿人民币', region: 'local', regionName: '深圳南山' },
      { id: '105', name: '腾讯科技（北京）有限公司', level: 'first', ratio: 100, capital: '8000万人民币', region: 'outside', regionName: '北京海淀' },
      { id: '106', name: '腾讯科技（上海）有限公司', level: 'first', ratio: 100, capital: '5000万人民币', region: 'outside', regionName: '上海徐汇' },
      { id: '107', name: '酷狗音乐科技（深圳）有限公司', level: 'second', ratio: 100, capital: '1200万人民币', region: 'local', regionName: '深圳福田' },
      { id: '108', name: '酷我音乐科技（深圳）有限公司', level: 'second', ratio: 100, capital: '1000万人民币', region: 'local', regionName: '深圳福田' },
      { id: '109', name: '京东集团股份有限公司', level: 'associate', ratio: 17, capital: '50亿美元', region: 'outside', regionName: '北京' },
      { id: '110', name: '美团', level: 'associate', ratio: 18, capital: '30亿美元', region: 'outside', regionName: '北京' },
      { id: '111', name: '拼多多', level: 'associate', ratio: 15, capital: '10亿美元', region: 'outside', regionName: '上海' },
    ],
    '2': [
      { id: '201', name: '阿里巴巴集团控股有限公司', level: 'core', ratio: 100, capital: '1亿美元', region: 'outside', regionName: '开曼群岛' },
      { id: '202', name: '淘宝（中国）软件有限公司', level: 'first', ratio: 100, capital: '4.5亿美元', region: 'outside', regionName: '杭州' },
      { id: '203', name: '天猫（中国）软件有限公司', level: 'first', ratio: 100, capital: '3.2亿美元', region: 'outside', regionName: '杭州' },
      { id: '204', name: '蚂蚁科技集团股份有限公司', level: 'first', ratio: 33, capital: '237亿人民币', region: 'outside', regionName: '杭州' },
      { id: '205', name: '菜鸟网络科技有限公司', level: 'first', ratio: 51, capital: '100亿人民币', region: 'outside', regionName: '杭州' },
      { id: '206', name: '阿里云智能科技有限公司', level: 'first', ratio: 100, capital: '10亿人民币', region: 'outside', regionName: '杭州' },
    ],
  };

  // 默认数据
  const defaultMembers = memberCompaniesData['1'] || [];

  // 当前选中的系族
  const currentClan = useMemo(() => {
    return clanList.find(c => c.id === selectedClan) || clanList[0];
  }, [selectedClan]);

  // 当前成员企业
  const [currentMembers, setCurrentMembers] = useState(defaultMembers);

  // 模拟数据加载
  useEffect(() => {
    if (selectedClan) {
      setLoading(true);
      setTimeout(() => {
        setCurrentMembers(memberCompaniesData[selectedClan] || defaultMembers);
        setLoading(false);
      }, 300);
    }
  }, [selectedClan]);

  // 初始化选中第一个
  useEffect(() => {
    if (!selectedClan) {
      setSelectedClan('1');
    }
  }, []);

  // 搜索过滤
  const filteredClanList = useMemo(() => {
    if (!searchValue) return clanList;
    return clanList.filter(c => 
      c.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      c.coreCompany.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  // 表格列定义
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar
            size="small"
            style={{
              backgroundColor: record.level === 'core' ? '#1677ff' : 
                              record.level === 'first' ? '#52c41a' : 
                              record.level === 'second' ? '#faad14' : '#999',
            }}
          >
            {text.charAt(0)}
          </Avatar>
          <Text strong={record.level === 'core'}>{text}</Text>
        </Space>
      ),
    },
    {
      title: '级次',
      dataIndex: 'level',
      key: 'level',
      width: 120,
      render: (level) => {
        const levelMap = {
          'core': { text: '核心企业', color: 'blue' },
          'first': { text: '一级子公司', color: 'green' },
          'second': { text: '二级子公司', color: 'orange' },
          'associate': { text: '参股企业', color: 'default' },
        };
        const config = levelMap[level] || levelMap['associate'];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '持股比例',
      dataIndex: 'ratio',
      key: 'ratio',
      width: 150,
      render: (ratio) => (
        <div className="flex items-center gap-2">
          <Progress
            percent={ratio}
            size="small"
            strokeColor={ratio >= 50 ? '#1677ff' : '#faad14'}
            showInfo={false}
            style={{ width: 80 }}
          />
          <Text className="text-xs">{ratio}%</Text>
        </div>
      ),
    },
    {
      title: '注册资本',
      dataIndex: 'capital',
      key: 'capital',
      width: 140,
    },
    {
      title: '所属区域',
      dataIndex: 'regionName',
      key: 'regionName',
      width: 120,
      render: (text, record) => (
        <Tag color={record.region === 'local' ? 'green' : 'default'}>
          {record.region === 'local' ? '本辖区' : '辖区外'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: () => (
        <Button type="link" size="small" icon={<EyeOutlined />}>
          详情
        </Button>
      ),
    },
  ];

  // 股权图谱树数据
  const treeData = {
    name: currentClan?.coreCompany || '腾讯控股有限公司',
    value: '100%',
    itemStyle: { color: '#1677ff' },
    children: [
      {
        name: '深圳市腾讯计算机系统有限公司',
        value: '100%',
        itemStyle: { color: '#52c41a' },
        children: [
          { name: '腾讯视频', value: '100%', itemStyle: { color: '#52c41a' } },
          { name: '微信科技', value: '100%', itemStyle: { color: '#52c41a' } },
        ],
      },
      {
        name: '腾讯音乐娱乐集团',
        value: '58%',
        itemStyle: { color: '#52c41a' },
        children: [
          { name: '酷狗音乐', value: '100%', itemStyle: { color: '#52c41a' } },
          { name: '酷我音乐', value: '100%', itemStyle: { color: '#52c41a' } },
        ],
      },
      {
        name: '腾讯科技（北京）',
        value: '100%',
        itemStyle: { color: '#d9d9d9' },
      },
      {
        name: '腾讯科技（上海）',
        value: '100%',
        itemStyle: { color: '#d9d9d9' },
      },
      {
        name: '京东集团',
        value: '17%',
        itemStyle: { color: '#d9d9d9' },
      },
    ],
  };

  // 树状图配置
  const treeOption = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: (params) => {
        const isLocal = params.data.itemStyle?.color === '#52c41a';
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold;">${params.name}</div>
            <div style="color: ${isLocal ? '#52c41a' : '#999'}; font-size: 12px;">
              ${isLocal ? '本辖区企业' : '辖区外企业'}
            </div>
            ${params.value ? `<div style="color: #1677ff; font-size: 12px;">持股: ${params.value}</div>` : ''}
          </div>
        `;
      },
    },
    series: [
      {
        type: 'tree',
        data: [treeData],
        top: '10%',
        left: '10%',
        bottom: '10%',
        right: '20%',
        symbolSize: 14,
        orient: 'RL',
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 12,
          formatter: (params) => {
            return params.value ? `{name|${params.name}} {ratio|${params.value}}` : params.name;
          },
          rich: {
            name: {
              fontSize: 12,
            },
            ratio: {
              fontSize: 11,
              color: '#1677ff',
              padding: [0, 0, 0, 8],
            },
          },
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
          },
        },
        emphasis: {
          focus: 'descendant',
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        lineStyle: {
          color: '#ccc',
          curveness: 0.5,
        },
      },
    ],
  };

  // 查看详情
  const handleViewDetail = (record) => {
    console.log('View detail:', record.name);
  };

  return (
    <div className="flex" style={{ height: 'calc(100vh - 64px)' }}>
      {/* 左侧系族列表 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* 顶部搜索 */}
        <div className="p-4 border-b border-gray-200">
          <Title level={5} className="!mb-3">企业系族</Title>
          <Search
            placeholder="搜索系族名称（如：阿里系）"
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            prefix={<SearchOutlined />}
            className="!mb-3"
          />
          <Button icon={<UploadOutlined />} block>
            导入企业系族名单
          </Button>
        </div>

        {/* 系族列表 */}
        <div className="flex-1 overflow-auto">
          <List
            dataSource={filteredClanList}
            renderItem={(item) => (
              <List.Item
                className={`cursor-pointer hover:bg-gray-50 transition-colors px-0 ${
                  selectedClan === item.id 
                    ? 'bg-blue-50 border-l-4 border-blue-500' 
                    : 'border-l-4 border-transparent'
                }`}
                onClick={() => setSelectedClan(item.id)}
              >
                <div className="px-4 py-3 w-full">
                  {/* 第一行：系族名称 */}
                  <div className="mb-1">
                    <Text 
                      strong 
                      className={`text-base ${selectedClan === item.id ? 'text-blue-600' : ''}`}
                    >
                      {item.name}
                    </Text>
                  </div>
                  {/* 第二行：核心企业 */}
                  <div className="mb-2">
                    <Text type="secondary" className="text-xs">
                      {item.coreCompany}
                    </Text>
                  </div>
                  {/* 第三行：企业数量 */}
                  <div>
                    <Badge 
                      count={`成员 ${item.count} 家`} 
                      style={{ 
                        backgroundColor: selectedClan === item.id ? '#1677ff' : '#f0f0f0',
                        color: selectedClan === item.id ? '#fff' : '#666',
                      }}
                    />
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* 右侧详情区 */}
      <div className="flex-1 bg-gray-50 overflow-auto p-5">
        {currentClan && (
          <>
            {/* 顶部概览卡片 */}
            <Card className="mb-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar
                    size={72}
                    style={{
                      backgroundColor: currentClan.color,
                      fontSize: 28,
                      fontWeight: 'bold',
                    }}
                  >
                    {currentClan.name.charAt(0)}
                  </Avatar>
                  <div>
                    <Title level={3} className="!mb-2">{currentClan.name}</Title>
                    <Space size="middle">
                      <Tag icon={<UserOutlined />} color="blue">
                        实际控制人: {currentClan.owner}
                      </Tag>
                      <Tag icon={<TeamOutlined />}>
                        成员企业: {currentClan.count} 家
                      </Tag>
                    </Space>
                  </div>
                </div>
                <Statistic
                  title="注册资本总额"
                  value={currentClan.totalCapital}
                  prefix={<BankOutlined />}
                  valueStyle={{ color: '#1677ff', fontSize: 24 }}
                />
              </div>

              <Divider />

              {/* 操作按钮 */}
              <Space>
                <Button
                  type="primary"
                  icon={<ShareAltOutlined />}
                  onClick={() => setGraphModalVisible(true)}
                >
                  查看股权图谱
                </Button>
                <Button icon={<DownloadOutlined />}>
                  导出企业名单
                </Button>
              </Space>
            </Card>

            {/* 成员企业表格 */}
            <Card title="成员企业列表" extra={<Text type="secondary">共 {currentMembers.length} 家企业</Text>}>
              <Table
                columns={columns}
                dataSource={currentMembers}
                rowKey="id"
                loading={loading}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `共 ${total} 条`,
                }}
                size="small"
              />
            </Card>
          </>
        )}
      </div>

      {/* 股权图谱弹窗 */}
      <Modal
        title={
          <Space>
            <ShareAltOutlined />
            <span>{currentClan?.name} - 股权结构图谱</span>
          </Space>
        }
        open={graphModalVisible}
        onCancel={() => setGraphModalVisible(false)}
        width="90%"
        style={{ top: 20 }}
        bodyStyle={{ height: 'calc(100vh - 200px)', padding: 0 }}
        footer={[
          <Button key="close" onClick={() => setGraphModalVisible(false)}>
            关闭
          </Button>,
        ]}
      >
        <div className="h-full p-4">
          {/* 图例 */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <Space>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <Text type="secondary" className="text-xs">核心企业</Text>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <Text type="secondary" className="text-xs">本辖区企业</Text>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <Text type="secondary" className="text-xs">辖区外企业</Text>
              </div>
            </Space>
          </div>

          {/* 树状图 */}
          <ReactECharts
            option={treeOption}
            style={{ height: 'calc(100% - 40px)', width: '100%' }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CapitalGenealogy;
