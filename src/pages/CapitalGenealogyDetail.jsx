import React, { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Empty, Spin, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
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

const CapitalGenealogyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    clanInfo,
    penetrationRate,
    industryGapData,
    investmentTrendData,
    cityFlowData,
    filteredMembers,
    memberFilter,
    memberCounts,
    setMemberFilter,
    getPenetrationStatus,
    // 新增
    modelData,
    modelStats,
  } = useCapitalGenealogyDetail(id);

  const handleBack = useCallback(() => {
    navigate('/industry/capital');
  }, [navigate]);

  /**
   * TODO: 实现加入招商库功能
   * 需要接入全局状态管理或调用 API 将企业加入招商库
   * @param {Object} record - 企业数据
   */
  const handleAddToPool = useCallback((record) => {
    console.log(`已将 ${record.name} 加入招商库`);
    // TODO: 接入实际的后端 API 或全局状态管理
  }, []);

  const chartConfigs = useMemo(() => ({
    industryGap: createIndustryGapOption(industryGapData),
    investmentTrend: createInvestmentTrendOption(investmentTrendData),
    cityFlow: createCityFlowOption(cityFlowData)
  }), [industryGapData, investmentTrendData, cityFlowData]);

  if (!clanInfo) {
    return (
      <div className="-m-4 p-4 bg-page min-h-full flex items-center justify-center">
        <Empty description="未找到该集团信息" className="text-secondary-text" />
      </div>
    );
  }

  return (
    <div className="-m-4 p-4 bg-page min-h-full theme-deep-blue">
      <Button 
        icon={<ArrowLeftOutlined />} 
        className="mb-4 bg-elevated text-primary-text border-custom hover:text-accent"
        onClick={handleBack}
      >
        返回集团大盘
      </Button>

      <Spin spinning={loading} tip="加载中...">
        {/* 集团信息头 */}
        <ClanHeaderCard 
          clanInfo={clanInfo}
          penetrationRate={penetrationRate}
          getPenetrationStatus={getPenetrationStatus}
        />

        {/* 原有3个图表保留 */}
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

        {/* 4模型靶向狙击清单（含雷达图+控制面板+企业列表） */}
        <SnipeListTable
          modelData={modelData}
          modelStats={modelStats}
          loading={loading}
          onAddToPool={handleAddToPool}
        />

        {/* 成员企业清单 */}
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
