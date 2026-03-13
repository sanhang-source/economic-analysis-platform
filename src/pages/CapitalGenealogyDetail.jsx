import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Tag, Table, Tabs, Statistic, Row, Col, Badge, Typography, Empty } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import { allClanList, memberCompaniesData, parseCapitalToNumber } from '../mock/capitalGenealogyMock';

const { Title, Text } = Typography;

// 常量：三年前日期
const THREE_YEARS_AGO = dayjs().subtract(3, 'years');

// 图表配置工厂函数 - 正负条形图（双向条形图）
const createIndustryGapOption = (data) => ({
  title: { 
    text: '全国 vs 前海 产业营收落差分析', 
    left: 'center',
    textStyle: { fontSize: 16, fontWeight: 'bold' }
  },
  tooltip: { 
    trigger: 'axis', 
    axisPointer: { type: 'shadow' },
    formatter: (params) => {
      const qianhai = params.find(p => p.seriesName === '前海营收');
      const national = params.find(p => p.seriesName === '全国营收');
      const gap = Math.abs(national?.value || 0) - (qianhai?.value || 0);
      return `<b>${params[0].name}</b><br/>
              <span style="color:#1677ff">全国营收: ${Math.abs(national?.value || 0)}亿元</span><br/>
              <span style="color:#52c41a">前海营收: ${qianhai?.value || 0}亿元</span><br/>
              <span style="color:#ff4d4f">落差: ${gap}亿元</span>`;
    }
  },
  legend: { data: ['全国营收', '前海营收'], bottom: 0 },
  grid: { left: '8%', right: '12%', bottom: '12%', top: '12%', containLabel: true },
  xAxis: {
    type: 'value',
    name: '营收（亿元）',
    nameLocation: 'middle',
    nameGap: 25,
    axisLabel: { 
      formatter: (value) => `${Math.abs(value)}亿`
    },
    splitLine: { show: true, lineStyle: { type: 'dashed' } }
  },
  yAxis: { 
    type: 'category', 
    data: data.map(d => d.industry),
    axisLabel: { fontSize: 12 },
    axisTick: { show: false }
  },
  series: [
    {
      name: '全国营收',
      type: 'bar',
      data: data.map(d => -d.nationalRevenue),
      itemStyle: { 
        color: '#1677ff',
        borderRadius: [4, 0, 0, 4]
      },
      barWidth: '35%',
      label: { show: false }
    },
    {
      name: '前海营收',
      type: 'bar',
      data: data.map(d => d.qianhaiRevenue),
      itemStyle: { 
        color: '#52c41a',
        borderRadius: [0, 4, 4, 0]
      },
      barWidth: '35%',
      label: { show: false }
    }
  ]
});

const createInvestmentTrendOption = (data) => ({
  title: { 
    text: '近三年战略投资偏好（注册资本分布）', 
    left: 'center',
    textStyle: { fontSize: 16, fontWeight: 'bold' }
  },
  tooltip: { 
    trigger: 'item',
    formatter: '{b}: {c}亿元 ({d}%)'
  },
  legend: { bottom: 0 },
  series: [{
    type: 'pie',
    radius: [30, 120],
    center: ['50%', '50%'],
    roseType: 'area',
    itemStyle: { borderRadius: 8 },
    data: data.map((d, i) => ({
      value: parseFloat(d.capital),
      name: d.industry,
      itemStyle: {
        color: ['#1677ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1', '#13c2c2'][i % 6]
      }
    })),
    label: {
      show: false
    }
  }]
});

const createCityFlowOption = (data) => ({
  title: { 
    text: '高能级新项目截流城市榜单（Top 5）', 
    left: 'center',
    textStyle: { fontSize: 16, fontWeight: 'bold' }
  },
  tooltip: { 
    trigger: 'axis', 
    axisPointer: { type: 'shadow' },
    formatter: '{b}: {c}亿元注册资本'
  },
  grid: { left: '3%', right: '15%', bottom: '10%', top: '12%', containLabel: true },
  xAxis: { 
    type: 'value', 
    name: '注册资本（亿元）',
    nameLocation: 'middle',
    nameGap: 25,
    axisLabel: { formatter: '{value}亿' }
  },
  yAxis: { 
    type: 'category', 
    data: data.map(d => d.city).reverse(),
    axisLabel: { fontSize: 12, fontWeight: 'bold' }
  },
  series: [{
    type: 'bar',
    data: data.map(d => parseFloat(d.capital)).reverse(),
    itemStyle: { 
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#ff7875' },
        { offset: 1, color: '#f5222d' }
      ]),
      borderRadius: [0, 4, 4, 0]
    },
    barWidth: '50%',
    label: { show: false }
  }]
});

/**
 * CapitalGenealogyDetail - 集团系挖潜工作台
 */
const CapitalGenealogyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cashcow');
  const [memberFilter, setMemberFilter] = useState('all'); // all | local | outside

  const clanInfo = useMemo(() => allClanList.find(c => c.id === id), [id]);
  const members = useMemo(() => memberCompaniesData[id] || [], [id]);

  const penetrationRate = useMemo(() => 
    clanInfo?.qianhaiRevenue && clanInfo?.groupTotalRevenue
      ? (clanInfo.qianhaiRevenue / clanInfo.groupTotalRevenue * 100)
      : 0
  , [clanInfo]);

  // 面板1：存量盘对标 - 按前海数据升序排列（0值排最上方）
  const industryGapData = useMemo(() => {
    const industryMap = {};
    
    members.forEach(m => {
      if (!industryMap[m.industry]) {
        industryMap[m.industry] = { 
          industry: m.industry, 
          nationalRevenue: 0, 
          qianhaiRevenue: 0 
        };
      }
      industryMap[m.industry].nationalRevenue += (m.revenue || 0);
      if (m.region === 'local') {
        industryMap[m.industry].qianhaiRevenue += (m.revenue || 0);
      }
    });
    
    // 按前海营收升序排列（0值排最上方，差距大的优先）
    return Object.values(industryMap)
      .filter(item => item.nationalRevenue > 0)
      .sort((a, b) => {
        // 前海营收为0的排在最前面
        if (a.qianhaiRevenue === 0 && b.qianhaiRevenue !== 0) return -1;
        if (a.qianhaiRevenue !== 0 && b.qianhaiRevenue === 0) return 1;
        return a.qianhaiRevenue - b.qianhaiRevenue;
      })
      .slice(0, 8);
  }, [members]);

  const industryGapOption = useMemo(() => 
    createIndustryGapOption(industryGapData)
  , [industryGapData]);

  // 面板2：增量盘风口
  const investmentTrendData = useMemo(() => {
    const newCompanies = members.filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        ['core', 'first', 'second'].includes(m.level) &&
        capitalNum >= 5000
      );
    });
    
    const industryCapital = {};
    newCompanies.forEach(m => {
      if (!industryCapital[m.industry]) {
        industryCapital[m.industry] = 0;
      }
      industryCapital[m.industry] += parseCapitalToNumber(m.capital);
    });
    
    return Object.entries(industryCapital)
      .map(([industry, capital]) => ({ industry, capital: (capital / 10000).toFixed(1) }))
      .sort((a, b) => parseFloat(b.capital) - parseFloat(a.capital));
  }, [members]);

  const investmentTrendOption = useMemo(() => 
    createInvestmentTrendOption(investmentTrendData)
  , [investmentTrendData]);

  // 面板3：增量盘流向
  const cityFlowData = useMemo(() => {
    const outsideNewCompanies = members.filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        ['core', 'first', 'second'].includes(m.level) &&
        capitalNum >= 5000 &&
        m.region !== 'local'
      );
    });
    
    const cityCapital = {};
    outsideNewCompanies.forEach(m => {
      if (!cityCapital[m.regionName]) {
        cityCapital[m.regionName] = 0;
      }
      cityCapital[m.regionName] += parseCapitalToNumber(m.capital);
    });
    
    return Object.entries(cityCapital)
      .map(([city, capital]) => ({ city, capital: (capital / 10000).toFixed(1) }))
      .sort((a, b) => parseFloat(b.capital) - parseFloat(a.capital))
      .slice(0, 5);
  }, [members]);

  const cityFlowOption = useMemo(() => 
    createCityFlowOption(cityFlowData)
  , [cityFlowData]);

  // 靶向狙击清单数据
  const cashCowList = useMemo(() => 
    members.filter(m => 
      m.region !== 'local' &&
      ['core', 'first', 'second'].includes(m.level) &&
      (m.revenue || 0) >= 1
    ).sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
  , [members]);

  const newProjectList = useMemo(() => 
    members.filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        m.region !== 'local' &&
        ['core', 'first', 'second'].includes(m.level) &&
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        capitalNum >= 5000
      );
    }).sort((a, b) => parseCapitalToNumber(b.capital) - parseCapitalToNumber(a.capital))
  , [members]);

  // 成员企业清单数据
  const filteredMembers = useMemo(() => {
    if (memberFilter === 'all') return members;
    if (memberFilter === 'local') return members.filter(m => m.region === 'local');
    if (memberFilter === 'outside') return members.filter(m => m.region !== 'local');
    return members;
  }, [members, memberFilter]);

  // 表格列配置
  const tableColumns = useMemo(() => [
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <Tag size="small" color="cyan">{record.industry}</Tag>
        </div>
      ),
    },
    {
      title: '所在地区',
      dataIndex: 'regionName',
      width: 100,
      render: (text, record) => (
        <Tag color={record.region === 'local' ? 'green' : 'red'}>{text}</Tag>
      ),
    },
    {
      title: '注册资本',
      dataIndex: 'capital',
      width: 130,
    },
    {
      title: '成立日期',
      dataIndex: 'foundedDate',
      width: 110,
    },
    {
      title: activeTab === 'cashcow' ? '营收' : '级别',
      dataIndex: activeTab === 'cashcow' ? 'revenue' : 'level',
      width: 100,
      render: (value) => {
        if (activeTab === 'cashcow') {
          return <span className="text-red-600 font-bold">{value || 0}亿</span>;
        }
        const levelMap = { core: '核心', first: '一级', second: '二级' };
        return <Tag color="blue">{levelMap[value] || value}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 130,
      render: () => (
        <Button type="primary" size="small" icon={<PlusOutlined />}>
          加入招商库
        </Button>
      ),
    },
  ], [activeTab]);

  const memberColumns = useMemo(() => [
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <Tag size="small" color="cyan">{record.industry}</Tag>
        </div>
      ),
    },
    {
      title: '地区',
      dataIndex: 'regionName',
      width: 100,
      render: (text, record) => (
        <Tag color={record.region === 'local' ? 'green' : 'default'}>{text}</Tag>
      ),
    },
    {
      title: '级别',
      dataIndex: 'level',
      width: 90,
      render: (level) => {
        const levelMap = { core: '核心', first: '一级', second: '二级', associate: '参股' };
        const colorMap = { core: 'blue', first: 'green', second: 'orange', associate: 'default' };
        return <Tag color={colorMap[level]}>{levelMap[level] || level}</Tag>;
      },
    },
    {
      title: '注册资本',
      dataIndex: 'capital',
      width: 130,
    },
    {
      title: '成立日期',
      dataIndex: 'foundedDate',
      width: 110,
    },
    {
      title: '营收',
      dataIndex: 'revenue',
      width: 100,
      render: (value) => value ? `${value}亿` : '-',
    },
  ], []);

  // 筛选条件显示组件
  const FilterDescription = ({ activeTab }) => {
    if (activeTab === 'cashcow') {
      return (
        <div className="mb-4 text-sm text-gray-500 bg-gray-50 px-4 py-3 rounded">
          筛选条件：外地企业、级别为核心/一级/二级、营收不低于1亿元
        </div>
      );
    }
    return (
      <div className="mb-4 text-sm text-gray-500 bg-gray-50 px-4 py-3 rounded">
        筛选条件：外地企业、级别为核心/一级/二级、近3年成立、注册资本不低于5000万元
      </div>
    );
  };

  const tabItems = useMemo(() => [
    {
      key: 'cashcow',
      label: (
        <span>
          <Badge color="red" /> 外地高产出现金牛（盯存量）
          <Tag color="red" className="ml-2">{cashCowList.length}家</Tag>
        </span>
      ),
      children: (
        <>
          <FilterDescription activeTab="cashcow" />
          {cashCowList.length > 0 ? (
            <Table
              columns={tableColumns}
              dataSource={cashCowList}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          ) : <Empty description="暂无符合条件的企业" />}
        </>
      ),
    },
    {
      key: 'newproject',
      label: (
        <span>
          <Badge color="orange" /> 外地高能级新项目（盯增量）
          <Tag color="orange" className="ml-2">{newProjectList.length}家</Tag>
        </span>
      ),
      children: (
        <>
          <FilterDescription activeTab="newproject" />
          {newProjectList.length > 0 ? (
            <Table
              columns={tableColumns}
              dataSource={newProjectList}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          ) : <Empty description="暂无符合条件的企业" />}
        </>
      ),
    },
  ], [cashCowList, newProjectList, tableColumns]);

  if (!clanInfo) {
    return (
      <div className="-m-4 p-4 bg-gray-50 min-h-full flex items-center justify-center">
        <Empty description="未找到该集团信息" />
      </div>
    );
  }

  return (
    <div className="-m-4 p-4 bg-gray-50 min-h-full">
      {/* 返回按钮 */}
      <Button 
        icon={<ArrowLeftOutlined />} 
        className="mb-4"
        onClick={() => navigate('/industry/capital')}
      >
        返回集团大盘
      </Button>

      {/* ==================== 头部企业信息卡片（简化版） ==================== */}
      <Card className="mb-6" variant="borderless">
        <Row gutter={24} align="middle">
          {/* 左侧：Logo和名称 */}
          <Col span={12}>
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                style={{ backgroundColor: clanInfo.color }}
              >
                {clanInfo.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <Title level={4} className="!mb-1 truncate">{clanInfo.name}</Title>
                <Text type="secondary" className="line-clamp-1">{clanInfo.coreCompany}</Text>
              </div>
            </div>
          </Col>

          {/* 右侧：营收数据 */}
          <Col span={12}>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic 
                  title="集团总营收" 
                  value={clanInfo.groupTotalRevenue} 
                  suffix="亿"
                  valueStyle={{ color: '#1677ff', fontSize: 20 }}
                />
              </Col>
              <Col span={6}>
                <Statistic 
                  title="前海总营收" 
                  value={clanInfo.qianhaiRevenue} 
                  suffix="亿"
                  valueStyle={{ color: '#52c41a', fontSize: 20 }}
                />
              </Col>
              <Col span={6}>
                <div className="text-sm text-gray-500 mb-1">前海营收渗透率</div>
                <div className="text-xl font-bold" style={{ 
                  color: penetrationRate < 10 ? '#ef4444' : penetrationRate < 25 ? '#f97316' : '#3b82f6'
                }}>
                  {penetrationRate.toFixed(1)}%
                </div>
                <Tag color={
                  penetrationRate < 10 ? 'error' : 
                  penetrationRate < 25 ? 'warning' : 'processing'
                } className="mt-1">
                  {penetrationRate < 10 ? '高潜能攻坚' : 
                   penetrationRate < 25 ? '重点扩容' : '稳健护盘'}
                </Tag>
              </Col>
              <Col span={6}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic 
                      title="成员企业" 
                      value={clanInfo.count} 
                      suffix="家"
                      valueStyle={{ color: '#1677ff', fontSize: 20 }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic 
                      title="前海企业" 
                      value={clanInfo.shenzhenCount} 
                      suffix="家"
                      valueStyle={{ color: '#52c41a', fontSize: 20 }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* ==================== 三大核心数据可视化面板 ==================== */}
      <Row gutter={16} className="mb-6">
        {/* 面板1：存量盘对标 */}
        <Col span={8}>
          <Card 
            title="存量盘对标" 
            variant="borderless"
            styles={{ body: { padding: 12 } }}
          >
            {industryGapData.length > 0 ? (
              <ReactECharts option={industryGapOption} style={{ height: 380 }} />
            ) : (
              <Empty description="暂无产业数据" style={{ height: 380 }} />
            )}
          </Card>
        </Col>

        {/* 面板2：增量盘风口 */}
        <Col span={8}>
          <Card 
            title="增量盘风口" 
            variant="borderless"
            styles={{ body: { padding: 12 } }}
          >
            {investmentTrendData.length > 0 ? (
              <ReactECharts option={investmentTrendOption} style={{ height: 380 }} />
            ) : (
              <Empty description="暂无近三年投资数据" style={{ height: 380 }} />
            )}
          </Card>
        </Col>

        {/* 面板3：增量盘流向 */}
        <Col span={8}>
          <Card 
            title="增量盘流向" 
            variant="borderless"
            styles={{ body: { padding: 12 } }}
          >
            {cityFlowData.length > 0 ? (
              <ReactECharts option={cityFlowOption} style={{ height: 380 }} />
            ) : (
              <Empty description="暂无外流数据，所有高质量新增企业均在前海" style={{ height: 380 }} />
            )}
          </Card>
        </Col>
      </Row>

      {/* ==================== 靶向狙击清单 ==================== */}
      <Card 
        title={<Title level={5} className="!mb-0">靶向狙击清单</Title>}
        className="mb-6"
        variant="borderless"
      >
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={tabItems}
        />
      </Card>

      {/* ==================== 成员企业清单 ==================== */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <Title level={5} className="!mb-0">成员企业清单</Title>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">筛选：</span>
              <Tag 
                color={memberFilter === 'all' ? 'blue' : 'default'}
                className="cursor-pointer"
                onClick={() => setMemberFilter('all')}
              >
                全部 ({members.length})
              </Tag>
              <Tag 
                color={memberFilter === 'local' ? 'green' : 'default'}
                className="cursor-pointer"
                onClick={() => setMemberFilter('local')}
              >
                本地 ({members.filter(m => m.region === 'local').length})
              </Tag>
              <Tag 
                color={memberFilter === 'outside' ? 'orange' : 'default'}
                className="cursor-pointer"
                onClick={() => setMemberFilter('outside')}
              >
                外地 ({members.filter(m => m.region !== 'local').length})
              </Tag>
            </div>
          </div>
        }
        variant="borderless"
      >
        <Table
          columns={memberColumns}
          dataSource={filteredMembers}
          rowKey="id"
          pagination={{ 
            pageSize: 10, 
            showSizeChanger: true, 
            showTotal: (total) => `共 ${total} 家企业` 
          }}
          size="small"
        />
      </Card>
    </div>
  );
};

export default CapitalGenealogyDetail;
