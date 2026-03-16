import React, { useState, useMemo } from 'react';
import { Card, Tag, Progress, Input, Radio, Typography, Badge, Row, Col, Empty, Tooltip } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { groupList } from '../mock/capitalGenealogyMock';

const { Title, Text } = Typography;

// 工具函数：提取到组件外，避免每次渲染重新创建
const getPenetrationLevel = (rate) => {
  if (rate < 10) return { label: '高潜能攻坚', color: '#f5222d', tagColor: 'error' };
  if (rate < 25) return { label: '重点扩容', color: '#fa8c16', tagColor: 'warning' };
  return { label: '稳健护盘', color: '#1677ff', tagColor: 'processing' };
};

const formatAmount = (amount) => {
  if (!amount) return { value: '0', unit: '亿' };
  if (amount >= 10000) return { value: (amount / 10000).toFixed(1), unit: '万亿' };
  return { value: amount.toString(), unit: '亿' };
};

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

  // 集团数据（仅集团系）- 计算渗透率
  const allGroups = useMemo(() => {
    return groupList.map(group => ({
      ...group,
      penetrationRate: group.groupTotalRevenue && group.qianhaiRevenue
        ? ((group.qianhaiRevenue / group.groupTotalRevenue) * 100)
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

  // 缓存统计值，避免重复计算
  const stats = useMemo(() => ({
    total: sortedGroups.length,
    highPotential: sortedGroups.filter(g => g.penetrationRate < 10).length,
    mediumPotential: sortedGroups.filter(g => g.penetrationRate >= 10 && g.penetrationRate < 25).length,
    totalRevenue: sortedGroups.reduce((sum, g) => sum + (g.groupTotalRevenue || 0), 0)
  }), [sortedGroups]);

  return (
    <div className="-m-4 p-4 bg-gray-50 min-h-full">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <Title level={4} className="!mb-0">集团系挖潜</Title>
          <Text type="secondary">聚焦重点企业，开展集团系增量挖潜，精准识别招商机会</Text>
        </div>
      </div>

      {/* 筛选栏 */}
      <Card className="mb-6" variant="borderless">
        <div className="flex flex-wrap gap-4 items-center">
          {/* 渗透率快捷筛选 */}
          <Radio.Group 
            value={penetrationFilter} 
            onChange={(e) => setPenetrationFilter(e.target.value)}
          >
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="high">
              <Badge color="red" /> 高潜能攻坚
            </Radio.Button>
            <Radio.Button value="medium">
              <Badge color="orange" /> 重点扩容
            </Radio.Button>
            <Radio.Button value="low">
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
            <QuestionCircleOutlined className="text-gray-400 hover:text-blue-500 cursor-pointer text-base ml-1" />
          </Tooltip>

          <div className="flex-1" />

          {/* 搜索框 */}
          <Input
            placeholder="搜索集团名称"
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />
        </div>
      </Card>

      {/* 统计概览 - 使用缓存的统计值 */}
      <div className="mb-6">
        <Row gutter={16}>
          <Col span={6}>
            <Card variant="borderless">
              <div className="text-gray-500 text-sm mb-1">集团总数</div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.total} <span className="text-sm font-normal">家</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless">
              <div className="text-gray-500 text-sm mb-1">高潜能攻坚集团</div>
              <div className="text-2xl font-bold text-red-500">
                {stats.highPotential} <span className="text-sm font-normal">家</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless">
              <div className="text-gray-500 text-sm mb-1">重点扩容集团</div>
              <div className="text-2xl font-bold text-orange-500">
                {stats.mediumPotential} <span className="text-sm font-normal">家</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless">
              <div className="text-gray-500 text-sm mb-1">集团总营收规模</div>
              <div className="text-2xl font-bold text-blue-500">
                {(() => {
                  const { value, unit } = formatAmount(stats.totalRevenue);
                  return (
                    <>
                      {value} <span className="text-sm font-normal">{unit}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedGroups.map((group) => {
            const level = getPenetrationLevel(group.penetrationRate);
            return (
              <Card
                key={group.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
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
                      <Text strong className="text-lg truncate">{group.name}</Text>
                    </div>
                    <Text type="secondary" className="text-sm line-clamp-1">
                      {group.coreCompany}
                    </Text>
                  </div>
                  <Tag color={level.tagColor} className="flex-shrink-0 ml-2">
                    {level.label}
                  </Tag>
                </div>

                {/* 核心指标 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">集团营收</div>
                    <div className="text-lg font-bold text-gray-800">
                      {(() => {
                        const { value, unit } = formatAmount(group.groupTotalRevenue);
                        return `${value}${unit}`;
                      })()}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-blue-600 mb-1">前海营收</div>
                    <div className="text-lg font-bold text-blue-600">
                      {(() => {
                        const { value, unit } = formatAmount(group.qianhaiRevenue);
                        return `${value}${unit}`;
                      })()}
                    </div>
                  </div>
                </div>

                {/* 渗透率进度条 */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <Text type="secondary">前海营收渗透率</Text>
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
                <div className="flex justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                  <span>成员企业: {group.count}家</span>
                  <span>前海企业: {group.shenzhenCount}家</span>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Empty 
          description="暂无符合条件的集团" 
          className="py-20"
        />
      )}
    </div>
  );
};

export default CapitalGenealogy;
