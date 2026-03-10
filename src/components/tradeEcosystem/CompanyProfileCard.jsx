import React from 'react';
import { Card, Tag, Typography } from 'antd';
import { 
  CalendarOutlined,
  BankOutlined, 
  TeamOutlined, 
  CreditCardOutlined, 
  SafetyOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
  ClusterOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

/**
 * 企业基本信息卡片（优化版）
 * 
 * 布局：
 * 第一行：企业名称 + 存续/资质标签 + 数据更新时间（右上角）
 * 第二行：成立时间 | 注册资本 | 参保人数 | 统一社会信用代码 | 纳税信用等级 | 最近一次开票
 * 第三行：行业 | 产业 | 经营地址
 */
const CompanyProfileCard = ({ companyInfo, invoiceStats, dataUpdateTime }) => {
  // 第一行信息（基础信息）
  const basicItems = [
    { icon: <CalendarOutlined />, label: '成立时间：', value: companyInfo.establishDate },
    { icon: <BankOutlined />, label: '注册资本：', value: companyInfo.registeredCapital },
    { icon: <TeamOutlined />, label: '参保人数：', value: `${companyInfo.employees.toLocaleString()}人` },
    { icon: <CreditCardOutlined />, label: '统一社会信用代码：', value: companyInfo.creditCode },
    { icon: <SafetyOutlined />, label: '纳税信用等级：', value: companyInfo.taxLevel },
    { icon: <ClockCircleOutlined />, label: '最近一次开票：', value: `${invoiceStats.lastInvoiceDate} ${invoiceStats.lastInvoiceTime}` },
  ];

  // 第二行信息（行业/产业/地址）
  const industryItems = [
    { icon: <AppstoreOutlined />, label: '行业：', value: companyInfo.industry },
    { icon: <ClusterOutlined />, label: '产业：', value: companyInfo.sector },
    { icon: <EnvironmentOutlined />, label: '经营地址：', value: companyInfo.address },
  ];

  return (
    <Card bordered={false} bodyStyle={{ padding: 16 }}>
      {/* 右上角数据更新时间 */}
      <div className="absolute top-4 right-4">
        <Text type="secondary" className="text-xs">
          数据更新时间：{dataUpdateTime}
        </Text>
      </div>

      {/* 第一行：企业名称 + 标签 */}
      <div className="flex items-center gap-3 mb-4">
        <Title level={4} className="!mb-0 !text-xl">
          {companyInfo.name}
        </Title>
        <div className="flex gap-1">
          {companyInfo.tags.map((tag, index) => {
            const colors = ['success', 'processing'];
            return (
              <Tag key={index} color={colors[index % colors.length]} size="small">
                {tag}
              </Tag>
            );
          })}
        </div>
      </div>

      {/* 第二行：成立时间、注册资本、参保人数、信用代码、纳税等级、开票时间 */}
      <div className="flex items-center gap-6 mb-3 flex-wrap">
        {basicItems.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className="text-gray-400">{item.icon}</span>
            <Text type="secondary" className="text-sm">{item.label}</Text>
            <Text className="text-sm">{item.value}</Text>
          </div>
        ))}
      </div>

      {/* 第三行：行业、产业、经营地址 */}
      <div className="flex items-center gap-6">
        {industryItems.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className="text-gray-400">{item.icon}</span>
            <Text type="secondary" className="text-sm">{item.label}</Text>
            <Text className="text-sm">{item.value}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CompanyProfileCard;
