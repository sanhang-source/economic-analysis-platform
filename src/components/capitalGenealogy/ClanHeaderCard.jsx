import React, { memo } from 'react';
import { Card, Row, Col, Tag, Typography } from 'antd';
import { 
  TeamOutlined, 
  BankOutlined, 
  DollarOutlined, 
  WalletOutlined,
  PieChartOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

// SaaS风格配色
const SAAS_COLORS = {
  primary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  slate: '#64748b',
};

// SaaS风格图标背景
const IconBg = ({ children, color }) => (
  <div 
    className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
    style={{ 
      backgroundColor: color + '15',
      color: color,
    }}
  >
    {children}
  </div>
);

const ClanHeaderCard = memo(({ clanInfo, penetrationRate, getPenetrationStatus }) => {
  if (!clanInfo) return null;

  const status = getPenetrationStatus(penetrationRate);

  // 统计项组件（不含标签）
  const StatItem = ({ icon, label, value, unit, color }) => (
    <div className="flex flex-col items-center justify-center h-full px-3">
      <IconBg color={color}>{icon}</IconBg>
      <div className="text-xs text-white mb-1 font-medium tracking-wide">{label}</div>
      <div className="text-xl font-bold" style={{ color }}>
        {value}<span className="text-sm font-medium ml-1 text-white">{unit}</span>
      </div>
    </div>
  );

  return (
    <Card className="mb-6 bg-card border-custom" variant="borderless">
      <Row gutter={24} align="middle">
        {/* 左侧：集团信息 */}
        <Col span={6}>
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg"
              style={{ 
                backgroundColor: clanInfo.color,
                boxShadow: clanInfo.color + '40',
              }}
            >
              {clanInfo.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <Title level={4} className="!mb-1 truncate text-lg" style={{ color: '#ffffff' }}>{clanInfo.name}</Title>
              <Text className="text-xs line-clamp-1 text-white">{clanInfo.coreCompany}</Text>
            </div>
          </div>
        </Col>

        {/* 右侧：5个统计指标 + 独立标签 */}
        <Col span={18}>
          <div className="flex justify-around items-center" style={{ height: '100px' }}>
            <StatItem 
              icon={<TeamOutlined style={{ fontSize: 20 }} />}
              label="成员企业" 
              value={clanInfo.count} 
              unit="家" 
              color={SAAS_COLORS.primary}
            />
            <div className="w-px h-10 bg-border-custom" />
            <StatItem 
              icon={<BankOutlined style={{ fontSize: 20 }} />}
              label="前海企业" 
              value={clanInfo.shenzhenCount} 
              unit="家" 
              color={SAAS_COLORS.success}
            />
            <div className="w-px h-10 bg-slate-200" />
            <StatItem 
              icon={<DollarOutlined style={{ fontSize: 20 }} />}
              label="集团营收" 
              value={clanInfo.groupTotalRevenue.toLocaleString()} 
              unit="亿" 
              color={SAAS_COLORS.primary}
            />
            <div className="w-px h-10 bg-slate-200" />
            <StatItem 
              icon={<WalletOutlined style={{ fontSize: 20 }} />}
              label="前海营收" 
              value={clanInfo.qianhaiRevenue} 
              unit="亿" 
              color={SAAS_COLORS.success}
            />
            <div className="w-px h-10 bg-slate-200" />
            {/* 渗透率指标 + 独立标签区域 */}
            <div className="flex flex-col items-center justify-center h-full px-3">
              <StatItem 
                icon={<PieChartOutlined style={{ fontSize: 20 }} />}
                label="前海营收渗透率" 
                value={penetrationRate.toFixed(1)} 
                unit="%" 
                color={status.color}
              />
              {/* 标签放在容器外 */}
              <Tag 
                color={status.tagColor} 
                size="small" 
                className="text-xs font-medium px-2 py-0 rounded-full -mb-6"
              >
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
