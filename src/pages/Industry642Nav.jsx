import React from 'react';
import { Typography, Row, Col, Divider, Card } from 'antd';
import IndustryCard from '../components/industry642/IndustryCard';
import {
  modernServiceIndustries,
  strategicIndustries,
  keyIndustries,
  industryCategories,
} from '../mock/industry642Mock';

const { Title, Text } = Typography;

/**
 * Industry642Nav - 供应链生态页面
 * 
 * 路由：/industry/642-nav
 * 
 * 展示前海6+4+2产业体系：
 * - 现代服务业（6个）：信息服务、金融服务、贸易物流、专业服务、科技服务、文体旅商
 * - 战略性新兴产业（4个）：人工智能与具身智能机器人、海洋产业、智能终端、低空经济
 * - 重点产业（2个）：细胞与基因、数据产业
 */
const Industry642Nav = () => {
  // 按分类组织产业数据
  const industriesByCategory = {
    modern: modernServiceIndustries,
    strategic: strategicIndustries,
    key: keyIndustries,
  };

  // 统计数据
  const totalIndustries = modernServiceIndustries.length + strategicIndustries.length + keyIndustries.length;
  const totalEnterprises = [
    ...modernServiceIndustries,
    ...strategicIndustries,
    ...keyIndustries,
  ].reduce((sum, item) => sum + item.enterpriseCount, 0);
  const urgentChainCount = [
    ...modernServiceIndustries,
    ...strategicIndustries,
    ...keyIndustries,
  ].filter(item => item.urgentChainNeeded).length;
  const totalSales = [
    ...modernServiceIndustries,
    ...strategicIndustries,
    ...keyIndustries,
  ].reduce((sum, item) => sum + item.totalSales, 0);
  const totalPurchase = [
    ...modernServiceIndustries,
    ...strategicIndustries,
    ...keyIndustries,
  ].reduce((sum, item) => sum + item.totalPurchase, 0);

  // 格式化金额（统一使用亿为单位）
  const formatAmount = (value) => {
    return `${(value / 10000).toFixed(1)}`;
  };

  return (
    <div className="-m-4 p-6 bg-gray-50 min-h-full">
      {/* 页面标题 */}
      <div className="mb-4">
        <Title level={4} className="!mb-2">供应链生态</Title>
        <Text type="secondary">
          基于发票数据分析，展示前海6大现代服务业、4大战略性新兴产业、2大重点产业的供应链生态
        </Text>
      </div>

      {/* 数据概览 */}
      <Card className="mb-6" variant="borderless">
        <div className="grid grid-cols-5 gap-8 text-center">
          <div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-bold text-purple-600">{totalIndustries}</span>
              <span className="text-xs text-purple-600">个</span>
            </div>
            <div className="text-sm text-gray-500">重点产业</div>
          </div>
          <div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-bold text-cyan-600">{totalEnterprises}</span>
              <span className="text-xs text-cyan-600">家</span>
            </div>
            <div className="text-sm text-gray-500">样本企业</div>
          </div>
          <div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-bold text-green-600">{formatAmount(totalPurchase)}</span>
              <span className="text-xs text-green-600">亿</span>
            </div>
            <div className="text-sm text-gray-500">采购总额</div>
          </div>
          <div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-bold text-blue-600">{formatAmount(totalSales)}</span>
              <span className="text-xs text-blue-600">亿</span>
            </div>
            <div className="text-sm text-gray-500">销售总额</div>
          </div>
          <div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-bold text-orange-600">{urgentChainCount}</span>
              <span className="text-xs text-orange-600">个</span>
            </div>
            <div className="text-sm text-gray-500">急需补链产业</div>
          </div>
        </div>
      </Card>

      {/* 产业分类展示 */}
      {industryCategories.map((category, index) => (
        <div key={category.key} className="mb-8">
          {/* 分类标题 */}
          <div 
            className="flex items-center gap-3 mb-4 px-4 py-2 rounded-lg"
            style={{ backgroundColor: category.bgColor }}
          >
            <div 
              className="w-1.5 h-6 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <Title level={5} className="!mb-0" style={{ color: category.color }}>
              {category.title}
            </Title>
          </div>

          {/* 产业卡片网格 */}
          <Row gutter={[16, 16]}>
            {industriesByCategory[category.key]?.map((industry) => (
              <Col key={industry.id} xs={24} sm={12} lg={8} xl={6}>
                <IndustryCard data={industry} />
              </Col>
            ))}
          </Row>

          {index < industryCategories.length - 1 && (
            <Divider className="mt-8" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Industry642Nav;
