import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tabs, Badge, Tag, Card, Typography, Empty, Spin, message, Row, Col } from 'antd';
import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons';
import { 
  ClanHeaderCard, 
  ChartPanel, 
  SnipeListTable, 
  MemberListTable,
  createIndustryGapOption,
  createInvestmentTrendOption,
  createCityFlowOption
} from '../components/capitalGenealogy';
import useCapitalGenealogyDetail from '../hooks/useCapitalGenealogyDetail';

const { Title } = Typography;

const LEVEL_MAP = { core: '0级', first: '1级', second: '2级' };

const CapitalGenealogyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cashcow');

  const {
    loading,
    clanInfo,
    penetrationRate,
    industryGapData,
    investmentTrendData,
    cityFlowData,
    cashCowList,
    newProjectList,
    filteredMembers,
    memberFilter,
    memberCounts,
    setMemberFilter,
    getPenetrationStatus
  } = useCapitalGenealogyDetail(id);

  const handleBack = useCallback(() => {
    navigate('/industry/capital');
  }, [navigate]);

  const handleAddToPool = useCallback((record) => {
    message.success(`已将 ${record.name} 加入招商库`);
  }, []);

  const handleExportSnipeList = useCallback(() => {
    const dataSource = activeTab === 'cashcow' ? cashCowList : newProjectList;
    const exportData = dataSource.map(item => ({
      '企业名称': item.name,
      '行业': item.industry,
      '所在地区': item.regionName,
      '注册资本': item.capital,
      '成立日期': item.foundedDate,
      '营业收入': item.revenue ? `${item.revenue}亿` : '-',
      '成员级别': LEVEL_MAP[item.level] || item.level,
    }));
    
    const headers = Object.keys(exportData[0] || {});
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => headers.map(h => row[h] || '-').join(','))
    ].join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${activeTab === 'cashcow' ? '盯存量企业清单' : '盯增量企业清单'}_${new Date().toLocaleDateString()}.csv`;
    link.click();
    
    message.success(`已导出 ${dataSource.length} 家企业数据`);
  }, [activeTab, cashCowList, newProjectList]);

  const chartConfigs = useMemo(() => ({
    industryGap: createIndustryGapOption(industryGapData),
    investmentTrend: createInvestmentTrendOption(investmentTrendData),
    cityFlow: createCityFlowOption(cityFlowData)
  }), [industryGapData, investmentTrendData, cityFlowData]);

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
        <SnipeListTable 
          type="cashcow" 
          dataSource={cashCowList} 
          loading={loading}
          onAddToPool={handleAddToPool}
        />
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
        <SnipeListTable 
          type="newproject" 
          dataSource={newProjectList} 
          loading={loading}
          onAddToPool={handleAddToPool}
        />
      ),
    },
  ], [cashCowList, newProjectList, loading, handleAddToPool]);

  if (!clanInfo) {
    return (
      <div className="-m-4 p-4 bg-gray-50 min-h-full flex items-center justify-center">
        <Empty description="未找到该集团信息" />
      </div>
    );
  }

  return (
    <div className="-m-4 p-4 bg-gray-50 min-h-full">
      <Button 
        icon={<ArrowLeftOutlined />} 
        className="mb-4"
        onClick={handleBack}
      >
        返回集团大盘
      </Button>

      <Spin spinning={loading} tip="加载中...">
        <ClanHeaderCard 
          clanInfo={clanInfo}
          penetrationRate={penetrationRate}
          getPenetrationStatus={getPenetrationStatus}
        />

        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <ChartPanel 
              title="存量盘对标"
              chartOption={chartConfigs.industryGap}
              data={industryGapData}
              loading={loading}
              emptyText="暂无产业数据"
            />
          </Col>
          <Col span={8}>
            <ChartPanel 
              title="增量盘风口"
              chartOption={chartConfigs.investmentTrend}
              data={investmentTrendData}
              loading={loading}
              emptyText="暂无近三年投资数据"
              tooltip="分析企业：成立日期在近3年内、成员级别为1级/2级、注册资本不低于5000万元"
            />
          </Col>
          <Col span={8}>
            <ChartPanel 
              title="增量盘流向"
              chartOption={chartConfigs.cityFlow}
              data={cityFlowData}
              loading={loading}
              emptyText="暂无外流数据，所有高质量新增企业均在前海"
              tooltip="分析企业：成立日期在近3年内、成员级别为1级/2级、注册资本不低于5000万元、非前海企业"
            />
          </Col>
        </Row>

        <Card 
          title={
            <div className="flex items-center justify-between">
              <Title level={5} className="!mb-0">靶向狙击清单</Title>
              <Button 
                icon={<ExportOutlined />}
                onClick={handleExportSnipeList}
              >
                导出
              </Button>
            </div>
          }
          className="mb-6"
          variant="borderless"
          styles={{ body: { paddingTop: 8 } }}
        >
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            items={tabItems}
          />
        </Card>

        <MemberListTable 
          dataSource={filteredMembers}
          memberFilter={memberFilter}
          memberCounts={memberCounts}
          onFilterChange={setMemberFilter}
          loading={loading}
          onAddToPool={handleAddToPool}
        />
      </Spin>
    </div>
  );
};

export default CapitalGenealogyDetail;
