import React, { useState, useMemo } from 'react';
import { Card, Progress, Tag, Tooltip, Badge, Statistic, Row, Col, Input, Empty } from 'antd';
import { 
  DownOutlined, 
  RightOutlined, 
  SearchOutlined,
  GlobalOutlined,
  HomeOutlined,
  ApartmentOutlined,
  TagOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { industryChains, industryChainStats } from '../mock/industryChainMock';

const { Search } = Input;

/**
 * 产业链图谱概览页
 * 展示深圳市所有产业链列表，按深圳企业占比排序
 * 支持展开查看层级树（产业链→产业→细分行业→产品服务）
 */
const IndustryGraph = () => {
  const [expandedChains, setExpandedChains] = useState(new Set());
  const [searchText, setSearchText] = useState('');

  // 切换产业链展开状态
  const toggleChain = (chainId) => {
    const newExpanded = new Set(expandedChains);
    if (newExpanded.has(chainId)) {
      newExpanded.delete(chainId);
    } else {
      newExpanded.add(chainId);
    }
    setExpandedChains(newExpanded);
  };

  // 根据搜索文本过滤产业链
  const filteredChains = useMemo(() => {
    if (!searchText.trim()) return industryChains;
    
    const lowerSearch = searchText.toLowerCase();
    return industryChains.filter(chain => {
      // 搜索产业链名称
      if (chain.name.toLowerCase().includes(lowerSearch)) return true;
      
      // 搜索层级树
      const searchHierarchy = (items) => {
        for (const item of items) {
          if (item.name.toLowerCase().includes(lowerSearch)) return true;
          if (item.children && searchHierarchy(item.children)) return true;
        }
        return false;
      };
      
      return searchHierarchy(chain.hierarchy);
    });
  }, [searchText]);

  // 格式化数字
  const formatNumber = (num) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return num.toLocaleString();
  };

  // 渲染层级树
  const renderHierarchy = (items, level = 0) => {
    return (
      <div className={`hierarchy-level-${level}`}>
        {items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="hierarchy-item">
            <div 
              className={`hierarchy-row level-${level}`}
              style={{ paddingLeft: level * 24 }}
            >
              {/* 缩进指示器 */}
              {level > 0 && (
                <span className="indent-line">
                  {level === 1 && '├─ '}
                  {level === 2 && '│  ├─ '}
                </span>
              )}
              
              {/* 层级图标 */}
              <span className="hierarchy-icon">
                {level === 0 && <ApartmentOutlined />}
                {level === 1 && <TagOutlined />}
                {level === 2 && <InfoCircleOutlined />}
              </span>
              
              {/* 名称 */}
              <span className="hierarchy-name">{item.name}</span>
              
              {/* 企业数量 */}
              <Badge 
                count={formatNumber(item.enterpriseCount)} 
                style={{ 
                  backgroundColor: level === 0 ? '#1677ff' : level === 1 ? '#52c41a' : '#fa8c16',
                  fontSize: '12px',
                  fontWeight: 500
                }}
                className="enterprise-badge"
              />
            </div>
            
            {/* 递归渲染子层级 */}
            {item.children && renderHierarchy(item.children, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="industry-chain-overview">
      {/* 页面标题和统计 */}
      <div className="overview-header">
        <div className="header-title">
          <GlobalOutlined className="title-icon" />
          <div>
            <h1>深圳市产业链图谱</h1>
            <p className="subtitle">按深圳企业全国占比排序，覆盖深圳20+8产业集群</p>
          </div>
        </div>
        
        {/* 统计卡片 */}
        <Row gutter={16} className="stats-row">
          <Col span={6}>
            <Card className="stat-card">
              <Statistic 
                title="产业链数量" 
                value={industryChainStats.totalChains}
                suffix="个"
                valueStyle={{ color: '#1677ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="stat-card">
              <Statistic 
                title="深圳企业总数" 
                value={formatNumber(industryChainStats.totalShenzhenEnterprises)}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="stat-card">
              <Statistic 
                title="全国企业总数" 
                value={formatNumber(industryChainStats.totalNationalEnterprises)}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="stat-card">
              <Statistic 
                title="平均占比" 
                value={industryChainStats.averagePercentage}
                suffix="%"
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 搜索框 */}
      <div className="search-section">
        <Search
          placeholder="搜索产业链、行业或产品服务..."
          allowClear
          enterButton={<><SearchOutlined /> 搜索</>}
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </div>

      {/* 产业链列表 */}
      <div className="chains-list">
        {filteredChains.length === 0 ? (
          <Empty 
            description="未找到匹配的产业链" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="empty-state"
          />
        ) : (
          filteredChains.map((chain, index) => (
            <Card 
              key={chain.id}
              className={`chain-card ${expandedChains.has(chain.id) ? 'expanded' : ''}`}
              bordered={false}
            >
              {/* 产业链头部 - 始终显示 */}
              <div 
                className="chain-header"
                onClick={() => toggleChain(chain.id)}
              >
                {/* 展开图标 */}
                <div className="expand-icon">
                  {expandedChains.has(chain.id) ? <DownOutlined /> : <RightOutlined />}
                </div>
                
                {/* 排名序号 */}
                <div className={`rank-badge rank-${index + 1}`}>
                  {index + 1}
                </div>
                
                {/* 产业链图标和名称 */}
                <div className="chain-icon" style={{ backgroundColor: chain.color }}>
                  {chain.icon}
                </div>
                
                <div className="chain-info">
                  <div className="chain-name-row">
                    <h3 className="chain-name">{chain.name}</h3>
                    <Tooltip title={chain.description}>
                      <InfoCircleOutlined className="info-icon" />
                    </Tooltip>
                  </div>
                  <Tag color={chain.color} className="chain-tag">
                    <HomeOutlined /> 深圳占比 {chain.stats.percentage}%
                  </Tag>
                </div>
                
                {/* 统计信息 */}
                <div className="chain-stats">
                  <div className="stat-item">
                    <span className="stat-label">深圳企业</span>
                    <span className="stat-value shenzhen">{formatNumber(chain.stats.shenzhenCount)}</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <span className="stat-label">全国企业</span>
                    <span className="stat-value national">{formatNumber(chain.stats.nationalCount)}</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item percentage">
                    <Progress
                      percent={chain.stats.percentage}
                      size="small"
                      strokeColor={chain.color}
                      showInfo={false}
                      className="percentage-bar"
                    />
                    <span className="percentage-text">{chain.stats.percentage}%</span>
                  </div>
                </div>
              </div>
              
              {/* 展开的层级树 */}
              {expandedChains.has(chain.id) && (
                <div className="chain-hierarchy">
                  <div className="hierarchy-header">
                    <ApartmentOutlined />
                    <span>产业链层级结构</span>
                    <span className="hierarchy-desc">产业 → 细分行业 → 产品服务</span>
                  </div>
                  <div className="hierarchy-content">
                    {renderHierarchy(chain.hierarchy)}
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* 样式 */}
      <style>{`
        .industry-chain-overview {
          padding: 24px;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
          min-height: calc(100vh - 64px);
        }

        /* 页面头部 */
        .overview-header {
          margin-bottom: 24px;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .title-icon {
          font-size: 36px;
          color: #1677ff;
          background: linear-gradient(135deg, #1677ff 0%, #36cfc9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-title h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: #1f2937;
        }

        .subtitle {
          margin: 4px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        /* 统计卡片 */
        .stats-row {
          margin-top: 16px;
        }

        .stat-card {
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .stat-card .ant-statistic-title {
          font-size: 14px;
          color: #6b7280;
        }

        .stat-card .ant-statistic-content {
          font-size: 28px;
          font-weight: 600;
        }

        /* 搜索框 */
        .search-section {
          margin-bottom: 24px;
        }

        .search-input {
          max-width: 600px;
        }

        .search-input .ant-input {
          border-radius: 8px 0 0 8px;
        }

        .search-input .ant-input-search-button {
          border-radius: 0 8px 8px 0;
        }

        /* 产业链列表 */
        .chains-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chain-card {
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .chain-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .chain-card.expanded {
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        .chain-card .ant-card-body {
          padding: 0;
        }

        /* 产业链头部 */
        .chain-header {
          display: flex;
          align-items: center;
          padding: 20px 24px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          gap: 16px;
        }

        .chain-header:hover {
          background-color: #f8fafc;
        }

        .expand-icon {
          color: #9ca3af;
          font-size: 14px;
          transition: all 0.2s ease;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chain-card.expanded .expand-icon {
          color: #1677ff;
        }

        .rank-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 13px;
          flex-shrink: 0;
        }

        .rank-badge.rank-1 {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4a 100%);
          color: #8b6914;
        }

        .rank-badge.rank-2 {
          background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
          color: #666;
        }

        .rank-badge.rank-3 {
          background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
          color: #fff;
        }

        .rank-badge:not(.rank-1):not(.rank-2):not(.rank-3) {
          background: #f3f4f6;
          color: #6b7280;
        }

        .chain-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .chain-info {
          flex: 1;
          min-width: 0;
        }

        .chain-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .chain-name {
          font-size: 17px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .info-icon {
          color: #9ca3af;
          font-size: 14px;
          cursor: help;
        }

        .info-icon:hover {
          color: #1677ff;
        }

        .chain-tag {
          font-size: 12px;
          border: none;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .chain-tag .anticon {
          margin-right: 4px;
        }

        /* 统计信息 */
        .chain-stats {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 80px;
        }

        .stat-label {
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 600;
        }

        .stat-value.shenzhen {
          color: #1677ff;
        }

        .stat-value.national {
          color: #52c41a;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: #e5e7eb;
        }

        .stat-item.percentage {
          min-width: 120px;
          align-items: stretch;
        }

        .percentage-bar {
          margin-bottom: 4px;
        }

        .percentage-bar .ant-progress-inner {
          background-color: #f3f4f6;
          border-radius: 4px;
        }

        .percentage-bar .ant-progress-bg {
          border-radius: 4px;
        }

        .percentage-text {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          text-align: right;
        }

        /* 层级树 */
        .chain-hierarchy {
          border-top: 1px solid #e5e7eb;
          background: #f8fafc;
        }

        .hierarchy-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #f1f5f9;
          font-size: 13px;
          color: #6b7280;
          border-bottom: 1px solid #e2e8f0;
        }

        .hierarchy-header .anticon {
          color: #1677ff;
        }

        .hierarchy-desc {
          margin-left: auto;
          font-size: 12px;
          color: #9ca3af;
        }

        .hierarchy-content {
          padding: 16px 24px;
        }

        .hierarchy-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
          margin-bottom: 4px;
        }

        .hierarchy-row:hover {
          background: #e2e8f0;
        }

        .hierarchy-row.level-0 {
          background: #eff6ff;
          font-weight: 600;
        }

        .hierarchy-row.level-0:hover {
          background: #dbeafe;
        }

        .hierarchy-row.level-1 {
          background: #f0fdf4;
        }

        .hierarchy-row.level-1:hover {
          background: #dcfce7;
        }

        .hierarchy-row.level-2 {
          background: transparent;
          padding: 8px 12px;
        }

        .indent-line {
          color: #9ca3af;
          font-family: monospace;
          font-size: 13px;
          width: 40px;
          flex-shrink: 0;
        }

        .hierarchy-icon {
          color: #9ca3af;
          font-size: 14px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hierarchy-row.level-0 .hierarchy-icon {
          color: #1677ff;
        }

        .hierarchy-row.level-1 .hierarchy-icon {
          color: #52c41a;
        }

        .hierarchy-row.level-2 .hierarchy-icon {
          color: #fa8c16;
        }

        .hierarchy-name {
          flex: 1;
          font-size: 14px;
          color: #374151;
        }

        .hierarchy-row.level-0 .hierarchy-name {
          color: #1e40af;
          font-size: 15px;
        }

        .enterprise-badge {
          margin-left: auto;
        }

        .enterprise-badge .ant-badge-count {
          box-shadow: none;
        }

        /* 空状态 */
        .empty-state {
          padding: 60px 0;
          background: #fff;
          border-radius: 12px;
        }

        /* 响应式 */
        @media (max-width: 1200px) {
          .chain-stats {
            flex-wrap: wrap;
            gap: 12px;
          }

          .stat-divider {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .industry-chain-overview {
            padding: 16px;
          }

          .chain-header {
            flex-wrap: wrap;
            padding: 16px;
          }

          .chain-stats {
            width: 100%;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
          }

          .hierarchy-content {
            padding: 12px 16px;
          }

          .hierarchy-row {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default IndustryGraph;
