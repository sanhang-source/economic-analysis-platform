import React, { useState, useMemo, useEffect } from 'react';
import { Card, Tag, Progress, Input, Radio, Typography, Badge, Row, Col, Empty, Tooltip, Pagination } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { groupList } from '../mock/capitalGenealogyMock';
import { getPenetrationLevel, formatAmount } from '../utils/formatters';

const { Title, Text } = Typography;

/**
 * CapitalGenealogy - 集团系挖潜
 * 
 * 重构要点：
 * 1. 全宽布局，突出高潜能集团
 * 2. 新增前海营收渗透率筛选和展示
 * 3. 默认按渗透率升序排序（潜力最大的排最上面）
 * 4. 点击卡片进入详情页
 */
const CapitalGenealogy = () => {
  const navigate = useNavigate();
  
  // 筛选状态
  const [searchValue, setSearchValue] = useState('');
  const [penetrationFilter, setPenetrationFilter] = useState('all'); // all | high | medium | low

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // 筛选变化时重置分页
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, penetrationFilter]);

  // 集团数据（仅集团系）- 计算渗透率
  const allGroups = useMemo(() => {
    return groupList.map(group => ({
      ...group,
      penetrationRate: group.groupTotalRevenue && group.localRevenue
        ? ((group.localRevenue / group.groupTotalRevenue) * 100)
        : 0,
    }));
  }, []);

  // 搜索过滤 + 渗透率筛选
  const filteredGroups = useMemo(() => {
    let list = allGroups;
    
    // 搜索过滤
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      list = list.filter(g => 
        g.name.toLowerCase().includes(searchLower) ||
        g.coreCompany.toLowerCase().includes(searchLower)
      );
    }
    
    // 渗透率筛选
    if (penetrationFilter !== 'all') {
      list = list.filter(g => {
        const rate = g.penetrationRate;
        if (penetrationFilter === 'high') return rate < 10;
        if (penetrationFilter === 'medium') return rate >= 10 && rate < 25;
        if (penetrationFilter === 'low') return rate >= 25;
        return true;
      });
    }
    
    return list;
  }, [allGroups, searchValue, penetrationFilter]);

  // 排序：默认按渗透率升序（潜力最大的排最上面）
  const sortedGroups = useMemo(() => {
    return [...filteredGroups].sort((a, b) => a.penetrationRate - b.penetrationRate);
  }, [filteredGroups]);

  // 分页数据
  const paginatedGroups = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedGroups.slice(start, end);
  }, [sortedGroups, currentPage, pageSize]);

  // 缓存统计值，避免重复计算 - 使用单次遍历优化性能
  const stats = useMemo(() => {
    let highPotential = 0;
    let mediumPotential = 0;
    let totalRevenue = 0;

    sortedGroups.forEach(g => {
      if (g.penetrationRate < 10) highPotential++;
      else if (g.penetrationRate < 25) mediumPotential++;
      totalRevenue += g.groupTotalRevenue || 0;
    });

    return {
      total: sortedGroups.length,
      highPotential,
      mediumPotential,
      totalRevenue
    };
  }, [sortedGroups]);

  return (
    <div className="-m-4 p-4 bg-page min-h-full theme-deep-blue">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <Title level={4} className="!mb-0" style={{ color: '#ffffff' }}>集团系挖潜</Title>
          <Text className="text-secondary-text">聚焦重点企业，开展集团系增量挖潜，精准识别招商机会</Text>
        </div>
      </div>

      {/* 筛选栏 */}
      <Card className="mb-6 bg-card border-custom" variant="borderless">
        <div className="flex flex-wrap gap-4 items-center">
          {/* 渗透率快捷筛选 */}
          <Radio.Group 
            value={penetrationFilter} 
            onChange={(e) => setPenetrationFilter(e.target.value)}
            className="theme-radio-group"
          >
            <Radio.Button value="all" className="bg-elevated text-primary-text border-custom">全部</Radio.Button>
            <Radio.Button value="high" className="bg-elevated text-primary-text border-custom">
              <Badge color="red" /> 高潜能攻坚
            </Radio.Button>
            <Radio.Button value="medium" className="bg-elevated text-primary-text border-custom">
              <Badge color="orange" /> 重点扩容
            </Radio.Button>
            <Radio.Button value="low" className="bg-elevated text-primary-text border-custom">
              <Badge color="blue" /> 稳健护盘
            </Radio.Button>
          </Radio.Group>

          {/* 潜能分类说明提示 */}
          <Tooltip 
            title={
              <div className="text-xs space-y-2 py-1">
                <div className="flex items-start gap-2">
                  <Badge color="red" />
                  <div>
                    <span className="font-medium text-red-400">高潜能攻坚</span>
                    <div className="text-gray-300">营收渗透率 &lt; 10%，集团体量与本地贡献极不匹配，优先对接攻坚</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge color="orange" />
                  <div>
                    <span className="font-medium text-orange-400">重点扩容</span>
                    <div className="text-gray-300">营收渗透率 10%-25%，已有扎实落地基础，推动增量优先落户</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge color="blue" />
                  <div>
                    <span className="font-medium text-blue-400">稳健护盘</span>
                    <div className="text-gray-300">营收渗透率 &gt; 25%，属于本地核心经济支柱，提供顶格服务稳固</div>
                  </div>
                </div>
              </div>
            }
            placement="bottomLeft"
            overlayStyle={{ maxWidth: 400 }}
          >
            <QuestionCircleOutlined className="text-muted hover:text-accent cursor-pointer text-base ml-1" />
          </Tooltip>

          <div className="flex-1" />

          {/* 搜索框 */}
          <Input
            placeholder="搜索集团名称"
            prefix={<SearchOutlined className="text-muted" />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 240, backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            className="theme-input"
            allowClear
          />
        </div>
      </Card>

      {/* 统计概览 - 使用缓存的统计值 */}
      <div className="mb-6">
        <Row gutter={16}>
          <Col span={6}>
            <Card variant="borderless" className="bg-card border-custom">
              <div className="text-sm mb-1" style={{ color: '#ffffff' }}>集团总数量</div>
              <div className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                {stats.total} <span className="text-sm font-normal" style={{ color: '#ffffff' }}>家</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless" className="bg-card border-custom">
              <div className="text-sm mb-1" style={{ color: '#ffffff' }}>高潜能攻坚集团</div>
              <div className="text-2xl font-bold text-accent-danger">
                {stats.highPotential} <span className="text-sm font-normal" style={{ color: '#ffffff' }}>家</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless" className="bg-card border-custom">
              <div className="text-sm mb-1" style={{ color: '#ffffff' }}>重点扩容集团</div>
              <div className="text-2xl font-bold text-accent-warning">
                {stats.mediumPotential} <span className="text-sm font-normal" style={{ color: '#ffffff' }}>家</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless" className="bg-card border-custom">
              <div className="text-sm mb-1" style={{ color: '#ffffff' }}>集团总营收</div>
              <div className="text-2xl font-bold text-accent-info">
                {(() => {
                  // 统一使用亿为单位，超过1万亿也显示为亿
                  const value = stats.totalRevenue ? stats.totalRevenue.toLocaleString('zh-CN') : '0';
                  return (
                    <>
                      {value} <span className="text-sm font-normal" style={{ color: '#ffffff' }}>亿</span>
                    </>
                  );
                })()}
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 集团卡片列表 */}
      {sortedGroups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {paginatedGroups.map((group) => {
            const level = getPenetrationLevel(group.penetrationRate);
            return (
              <Card
                key={group.id}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-card border-custom"
                variant="borderless"
                onClick={() => navigate(`/industry/capital/detail/${group.id}`)}
                styles={{ body: { padding: 16 } }}
              >
                {/* 头部：集团名称 + 评级标签 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: group.color }}
                      />
                      <Text strong className="text-lg truncate text-primary-text">{group.name}</Text>
                    </div>
                    <Text className="text-sm line-clamp-1 text-secondary-text">
                      {group.coreCompany}
                    </Text>
                  </div>
                  <Tag color={level.tagColor} className="flex-shrink-0 ml-2">
                    {level.label}
                  </Tag>
                </div>

                {/* 核心指标 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg p-3" style={{ backgroundColor: '#022066' }}>
                    <div className="text-xs mb-1" style={{ color: '#ffffff' }}>集团营收</div>
                    <div className="text-lg font-bold text-primary-text">
                      {(() => {
                        // 统一使用亿为单位展示，超过1万亿也显示为亿
                        const value = group.groupTotalRevenue ? group.groupTotalRevenue.toLocaleString('zh-CN') : '0';
                        return `${value}亿`;
                      })()}
                    </div>
                  </div>
                  <div className="bg-highlight rounded-lg p-3">
                    <div className="text-xs text-accent mb-1">前海营收</div>
                    <div className="text-lg font-bold text-accent">
                      {(() => {
                        const { value, unit } = formatAmount(group.localRevenue);
                        return `${value}${unit}`;
                      })()}
                    </div>
                  </div>
                </div>

                {/* 渗透率进度条 */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <Text style={{ color: '#ffffff' }}>前海营收渗透率</Text>
                    <Text strong style={{ color: level.color }}>
                      {group.penetrationRate.toFixed(1)}%
                    </Text>
                  </div>
                  <Progress 
                    percent={Math.min(group.penetrationRate, 100)} 
                    size="small"
                    status={group.penetrationRate < 10 ? 'exception' : 'normal'}
                    strokeColor={group.penetrationRate < 10 ? '#f5222d' : group.penetrationRate < 25 ? '#fa8c16' : '#1677ff'}
                    showInfo={false}
                  />
                </div>

                {/* 底部统计 */}
                <div className="flex justify-between text-sm pt-3 border-t border-custom" style={{ color: '#ffffff' }}>
                  <span>成员企业: {group.count}家</span>
                  <span>前海企业: {group.shenzhenCount}家</span>
                </div>
              </Card>
            );
          })}
          </div>

          {/* 分页器 */}
          <div className="flex justify-end mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={sortedGroups.length}
              showSizeChanger
              showTotal={(total) => <span style={{ color: '#ffffff' }}>共 {total} 个集团</span>}
              pageSizeOptions={['12', '24', '48']}
              onChange={(page, size) => {
                setCurrentPage(page);
                if (size !== pageSize) {
                  setPageSize(size);
                  setCurrentPage(1);
                }
              }}
            />
          </div>
        </>
      ) : (
        <Empty 
          description="暂无符合条件的集团" 
          className="py-20 text-secondary-text"
        />
      )}
    </div>
  );
};

export default CapitalGenealogy;
