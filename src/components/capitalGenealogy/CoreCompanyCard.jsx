import React from 'react';
import { Card, Avatar, Divider } from 'antd';
import {
  BankOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';

/**
 * 核心企业信息卡片组件
 */
const CoreCompanyCard = ({ currentClan, regionStats }) => {
  if (!currentClan) return null;

  return (
    <Card className="border-0 shadow-none mb-4 bg-white">
      {/* 头部：头像和名称 */}
      <div className="flex items-start gap-4 mb-4">
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
        <div className="flex-1">
          {/* 企业名称 */}
          <h3 className="text-xl font-bold mb-2">{currentClan.coreCompany}</h3>
          
          {currentClan.coreInfo && (
            <>
              {/* 第一行：成立时间、注册资本、统一社会信用代码 */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <CalendarOutlined className="text-gray-400" />
                  <span>成立时间：{currentClan.coreInfo.foundedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BankOutlined className="text-gray-400" />
                  <span>注册资本：{currentClan.coreInfo?.registeredCapital || currentClan.totalCapital}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCardOutlined className="text-gray-400" />
                  <span>统一社会信用代码：</span>
                  <span className="font-mono">{currentClan.coreInfo?.creditCode || '91440300XXXXXXXXXX'}</span>
                </div>
              </div>
              
              {/* 第二行：注册地址 */}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <EnvironmentOutlined className="text-gray-400" />
                <span>注册地址：{currentClan.coreInfo.address}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <Divider />

      {/* 成员分布统计 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AppstoreOutlined className="text-blue-500" />
          <span className="font-semibold">成员企业分布</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* 本地企业 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">本地企业</span>
              <span className="text-2xl font-bold text-green-600">{regionStats.localCount}<span className="text-sm font-normal ml-1">家</span></span>
            </div>
            <div className="flex flex-wrap gap-1">
              {regionStats.localIndustries.slice(0, 8).map((ind, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded"
                  title={`${ind.count}家企业`}
                >
                  {ind.name}({ind.count})
                </span>
              ))}
              {regionStats.localIndustries.length > 8 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  +{regionStats.localIndustries.length - 8}
                </span>
              )}
            </div>
          </div>
          
          {/* 外地企业 */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">外地企业</span>
              <span className="text-2xl font-bold text-orange-600">{regionStats.outsideCount}<span className="text-sm font-normal ml-1">家</span></span>
            </div>
            <div className="flex flex-wrap gap-1">
              {regionStats.outsideIndustries.slice(0, 8).map((ind, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded"
                  title={`${ind.count}家企业`}
                >
                  {ind.name}({ind.count})
                </span>
              ))}
              {regionStats.outsideIndustries.length > 8 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  +{regionStats.outsideIndustries.length - 8}
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
