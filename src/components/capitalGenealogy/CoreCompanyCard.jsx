import React from 'react';
import { Card, Avatar, Statistic, Divider, Row, Col } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  MailOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

/**
 * 核心企业信息卡片组件
 */
const CoreCompanyCard = ({ currentClan, regionStats }) => {
  if (!currentClan) return null;

  return (
    <Card className="border-0 shadow-none">
      {/* 头部：头像和名称 */}
      <div className="flex items-start justify-between mb-4">
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
            <h3 className="text-xl font-bold mb-2">{currentClan.coreCompany}</h3>
            <div className="flex gap-4">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm">
                <UserOutlined />
                实际控制人: {currentClan.owner}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                <TeamOutlined />
                成员企业: {currentClan.count} 家
              </span>
            </div>
          </div>
        </div>
        <Statistic
          title="注册资本"
          value={currentClan.coreInfo?.registeredCapital || currentClan.totalCapital}
          prefix={<BankOutlined />}
          valueStyle={{ color: '#1677ff', fontSize: 20 }}
        />
      </div>

      <Divider />

      {/* 核心企业详细信息 */}
      {currentClan.coreInfo && (
        <div className="mb-4">
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <div className="flex items-center gap-2 text-sm">
                <CalendarOutlined className="text-gray-400" />
                <span className="text-gray-500">成立时间：</span>
                <span>{currentClan.coreInfo.foundedDate}</span>
              </div>
            </Col>
            <Col span={8}>
              <div className="flex items-center gap-2 text-sm">
                <TeamOutlined className="text-gray-400" />
                <span className="text-gray-500">员工规模：</span>
                <span>{currentClan.coreInfo.employees}</span>
              </div>
            </Col>
            <Col span={8}>
              <div className="flex items-center gap-2 text-sm">
                <MailOutlined className="text-gray-400" />
                <span className="text-gray-500">联系邮箱：</span>
                <span>{currentClan.coreInfo.email}</span>
              </div>
            </Col>
            <Col span={24}>
              <div className="flex items-start gap-2 text-sm">
                <EnvironmentOutlined className="text-gray-400 mt-0.5" />
                <span className="text-gray-500">注册地址：</span>
                <span>{currentClan.coreInfo.address}</span>
              </div>
            </Col>
          </Row>
          
          <Divider />
        </div>
      )}

      {/* 成员分布统计 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AppstoreOutlined className="text-blue-500" />
          <span className="font-semibold">成员企业分布</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-gray-500 text-xs mb-1">深圳企业</div>
            <div className="text-2xl font-bold text-green-600">{regionStats.localCount}<span className="text-sm font-normal ml-1">家</span></div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="text-gray-500 text-xs mb-1">外地企业</div>
            <div className="text-2xl font-bold text-orange-600">{regionStats.outsideCount}<span className="text-sm font-normal ml-1">家</span></div>
          </div>
          <div className="col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-gray-500 text-xs mb-2">行业分布</div>
            <div className="flex flex-wrap gap-1">
              {regionStats.industries.slice(0, 6).map((ind, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded cursor-pointer"
                  title={`${ind.count}家企业`}
                >
                  {ind.name}({ind.count})
                </span>
              ))}
              {regionStats.industries.length > 6 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  +{regionStats.industries.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CoreCompanyCard;
