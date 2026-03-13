import React, { memo } from 'react';
import { Card, Row, Col, Statistic, Tag, Typography } from 'antd';

const { Title, Text } = Typography;

const ClanHeaderCard = memo(({ clanInfo, penetrationRate, getPenetrationStatus }) => {
  if (!clanInfo) return null;

  const status = getPenetrationStatus(penetrationRate);

  return (
    <Card className="mb-6" variant="borderless">
      <Row gutter={24} align="middle">
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

        <Col span={12}>
          <div className="flex justify-between items-start">
            <div style={{ width: '18%' }}>
              <Statistic 
                title="成员企业" 
                value={clanInfo.count} 
                suffix="家"
                valueStyle={{ color: '#1677ff', fontSize: 20 }}
              />
            </div>
            <div style={{ width: '18%' }}>
              <Statistic 
                title="前海企业" 
                value={clanInfo.shenzhenCount} 
                suffix="家"
                valueStyle={{ color: '#52c41a', fontSize: 20 }}
              />
            </div>
            <div style={{ width: '18%' }}>
              <Statistic 
                title="集团营收" 
                value={clanInfo.groupTotalRevenue} 
                suffix="亿"
                valueStyle={{ color: '#1677ff', fontSize: 20 }}
              />
            </div>
            <div style={{ width: '18%' }}>
              <Statistic 
                title="前海营收" 
                value={clanInfo.qianhaiRevenue} 
                suffix="亿"
                valueStyle={{ color: '#52c41a', fontSize: 20 }}
              />
            </div>
            <div style={{ width: '18%' }}>
              <div className="text-sm text-gray-500 mb-1">前海营收渗透率</div>
              <div className="text-xl font-bold" style={{ color: status.color }}>
                {penetrationRate.toFixed(1)}%
              </div>
              <Tag color={status.tagColor} className="mt-1">
                {status.label}
              </Tag>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
});

ClanHeaderCard.displayName = 'ClanHeaderCard';

export default ClanHeaderCard;
