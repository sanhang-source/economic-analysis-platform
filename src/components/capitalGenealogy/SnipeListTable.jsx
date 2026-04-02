import React, { memo, useState } from 'react';
import { Table, Tag, Button, Empty, message, Card, Badge } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const LEVEL_MAP = { core: '0级', first: '1级', second: '2级', associate: '参股' };

// SaaS风格配色
const SAAS_COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  gray: '#64748b',
  light: '#f8fafc',
  border: '#e2e8f0',
};

// 4个模型的配置信息
const MODEL_CONFIG = {
  model1: {
    key: 'model1',
    label: '产贸分离',
    color: 'blue',
    badgeColor: '#3b82f6',
    content: {
      target: '异地高营收制造企业（核心层级，营收>1亿）',
      filter: '【非本地】+【1/2级子公司】+【营收>1亿】+【行业为制造/能源】+ 排除集团在前海已有商贸子公司的企业',
      policy: '前海15%企业所得税优惠目录（商务服务业）、前海总部经济扶持资金',
    },
  },
  model2: {
    key: 'model2',
    label: '新兴总部',
    color: 'purple',
    badgeColor: '#8b5cf6',
    content: {
      target: '异地重金新设赛道企业（AI/低空/新能源）',
      filter: '【非本地】+【近3年新设】+【注册资本>5000万】+【新兴产业】',
      policy: '前海科技创新专项资金、境外高端人才15%个税封顶补贴',
    },
  },
  model3: {
    key: 'model3',
    label: '产值统筹',
    color: 'orange',
    badgeColor: '#f59e0b',
    content: {
      target: '前海与异地均有工厂的大集团',
      filter: '【前海有存量制造企业】+【异地有制造企业】且【异地企业营收 > 1亿】',
      policy: '前海自由贸易（FT）账户跨境资金池政策、前海综合保税区通关与出口退税政策',
    },
  },
  model4: {
    key: 'model4',
    label: '供应链金融',
    color: 'green',
    badgeColor: '#10b981',
    content: {
      target: '异地千亿/百亿实体巨头（如车企、家电、央企）',
      filter: '【集团总营收>100亿】+【异地成员企业>50家】+【集团在前海无金融/保理/租赁类子公司】',
      policy: '前海商业保理与融资租赁高质量发展支持政策、深港跨境人民币直贷政策',
    },
  },
};

// 模型内容展示组件 - 方案1：彩色标签 + 卡片阴影
const ModelContent = ({ config }) => {
  // 三个字段的颜色配置
  const fields = [
    { key: 'target', label: '靶向对象', color: '#ef4444', bgColor: '#fef2f2' },
    { key: 'filter', label: '筛选条件', color: '#f59e0b', bgColor: '#fffbeb' },
    { key: 'policy', label: '对应政策', color: '#10b981', bgColor: '#ecfdf5' },
  ];
  
  return (
    <div
      className="h-full"
    >
      <div className="h-full flex flex-col justify-between py-1">
        {fields.map((field) => (
          <div key={field.key} className="flex items-start gap-3">
            {/* 彩色圆点 */}
            <div 
              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style={{ backgroundColor: field.color }}
            />
            <div className="flex-1">
              {/* 字段标签 - 带背景色 */}
              <div
                className="inline-block text-xs font-semibold px-2 py-0.5 rounded mb-1"
                style={{
                  color: '#ffffff',
                  backgroundColor: field.color
                }}
              >
                {field.label}
              </div>
              {/* 字段内容 */}
              <div className="text-sm text-white leading-snug">
                {config.content[field.key]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SnipeListTable = memo(({ 
  modelData,
  modelStats,
  loading = false,
  onAddToPool,
}) => {
  const [activeModel, setActiveModel] = useState('model1');

  const currentConfig = MODEL_CONFIG[activeModel];
  const currentData = modelData?.[activeModel] || [];

  // SaaS风格雷达图配置
  const radarOption = {
    title: {
      text: '招商机会分布',
      left: 'center',
      top: 5,
      textStyle: {
        fontSize: 14,
        fontWeight: 600,
        color: '#ffffff'
      }
    },
    radar: {
      indicator: [
        { name: '产贸分离', max: Math.max(modelStats?.model1 || 0, 10) },
        { name: '新兴总部', max: Math.max(modelStats?.model2 || 0, 10) },
        { name: '产值统筹', max: Math.max(modelStats?.model3 || 0, 10) },
        { name: '供应链金融', max: Math.max(modelStats?.model4 || 0, 10) },
      ],
      radius: '55%',
      center: ['50%', '55%'],
      axisName: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 500,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(100, 255, 218, 0.02)', 'rgba(100, 255, 218, 0.04)', 'rgba(100, 255, 218, 0.06)', 'rgba(100, 255, 218, 0.08)'],
        },
      },
      splitLine: {
        lineStyle: {
          color: 'var(--chart-grid)',
          width: 1,
        },
      },
      axisLine: {
        lineStyle: {
          color: 'var(--chart-grid)',
          width: 1,
        },
      },
    },
    series: [{
      type: 'radar',
      data: [{
        value: [
          modelStats?.model1 || 0,
          modelStats?.model2 || 0,
          modelStats?.model3 || 0,
          modelStats?.model4 || 0,
        ],
        name: '招商机会',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(99, 102, 241, 0.4)' },
            { offset: 1, color: 'rgba(139, 92, 246, 0.2)' }
          ]),
        },
        lineStyle: {
          color: '#6366f1',
          width: 2.5,
        },
        itemStyle: {
          color: '#6366f1',
          borderColor: '#fff',
          borderWidth: 2,
        },
        symbol: 'circle',
        symbolSize: 6,
      }],
    }],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'var(--chart-tooltip-bg)',
      borderColor: 'var(--chart-tooltip-border)',
      borderWidth: 1,
      textStyle: {
        color: 'var(--chart-text)',
      },
      padding: 12,
      formatter: (params) => {
        const indicators = ['产贸分离', '新兴总部', '产值统筹', '供应链金融'];
        const values = params.value;
        let html = `<div style="font-weight:600;margin-bottom:8px;color:var(--text-primary);">${params.name}</div>`;
        indicators.forEach((ind, i) => {
          const color = values[i] > 0 ? 'var(--accent-primary)' : 'var(--text-muted)';
          html += `<div style="display:flex;align-items:center;margin:4px 0;font-size:13px;">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${color};margin-right:8px;"></span>
            <span style="flex:1;color:var(--text-muted);">${ind}:</span>
            <span style="font-weight:600;color:${color};">${values[i]}家</span>
          </div>`;
        });
        return html;
      },
    },
  };

  const handleExport = () => {
    const exportData = currentData.map(item => ({
      '企业名称': item.name,
      '行业': item.industry,
      '所在地区': item.regionName,
      '注册资本': item.capital,
      '成立日期': item.foundedDate,
      '营业收入': item.revenue ? `${item.revenue}亿` : '-',
      '成员级别': LEVEL_MAP[item.level] || item.level,
      '产业聚集度': item.industryScore || 0,
      '集团紧密度': item.closenessScore || 0,
    }));
    
    const headers = Object.keys(exportData[0] || {});
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => headers.map(h => row[h] || '-').join(','))
    ].join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${currentConfig.label}_企业清单_${new Date().toLocaleDateString()}.csv`;
    link.click();
    
    message.success(`已导出 ${currentData.length} 家企业数据`);
  };

  const columns = [
    {
      title: <span className="text-white">企业名称</span>,
      dataIndex: 'name',
      render: (text, record) => (
        <div>
          <div className="font-medium text-white">{text}</div>
          <Tag size="small" color="cyan">{record.industry}</Tag>
        </div>
      ),
    },
    {
      title: <span className="text-white">招商机会</span>,
      width: 120,
      render: () => (
        <Tag size="small" style={{ backgroundColor: currentConfig.badgeColor + '20', color: currentConfig.badgeColor, borderColor: currentConfig.badgeColor }}>
          {currentConfig.label}
        </Tag>
      ),
    },
    {
      title: <span className="text-white">所在地区</span>,
      dataIndex: 'regionName',
      width: 120,
      render: (text) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">成员级别</span>,
      dataIndex: 'level',
      width: 120,
      render: (level) => <Tag color="blue">{LEVEL_MAP[level] || level}</Tag>,
    },
    {
      title: <span className="text-white">注册资本</span>,
      dataIndex: 'capital',
      width: 180,
      render: (text) => {
        // 将亿人民币转换为万元（1亿人民币 = 10000万元）
        const valueInWan = parseFloat(text) * 10000;
        return <span className="text-white">{valueInWan.toLocaleString('zh-CN')}万元人民币</span>;
      },
    },
    {
      title: <span className="text-white">成立日期</span>,
      dataIndex: 'foundedDate',
      width: 120,
      render: (text) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">营业收入</span>,
      dataIndex: 'revenue',
      width: 120,
      render: (value) => <span className="text-white">{value ? `${value}亿` : '-'}</span>,
    },
  ];

  // 模型Tab按钮
  const ModelTabs = (
    <div className="flex gap-2 mb-4 flex-wrap">
      {Object.values(MODEL_CONFIG).map((config) => {
        const count = modelData?.[config.key]?.length || 0;
        const isActive = activeModel === config.key;
        return (
          <Button
            key={config.key}
            type={isActive ? 'primary' : 'default'}
            size="small"
            onClick={() => setActiveModel(config.key)}
            style={{
              background: isActive ? config.badgeColor : '#fff',
              borderColor: config.badgeColor,
              color: isActive ? '#fff' : config.badgeColor,
              borderRadius: '6px',
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {config.label}
            <Badge 
              count={count} 
              style={{ 
                backgroundColor: isActive ? 'rgba(255,255,255,0.9)' : config.badgeColor,
                color: isActive ? config.badgeColor : '#fff',
                marginLeft: 8,
                fontWeight: 600,
              }} 
            />
          </Button>
        );
      })}
    </div>
  );

  return (
    <Card 
      title={<span className="text-primary-text font-semibold">靶向招商清单</span>}
      className="mb-6 bg-card border-custom"
      variant="borderless"
    >
      {/* 上方布局：左侧雷达图 + 右侧控制面板 */}
      <div className="flex gap-6 mb-6">
        {/* 左侧：雷达图 */}
        <div className="w-1/3">
          <div className="h-64 bg-card rounded-xl p-2 border-2 border-white/20 shadow-lg">
            <ReactECharts
              option={radarOption}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        </div>

        {/* 右侧：模型Tab + 模型内容 */}
        <div className="w-2/3 h-64 flex flex-col bg-card rounded-xl border-2 border-white/20 shadow-lg p-3">
          {/* 模型Tab */}
          {ModelTabs}

          {/* 当前模型内容 - 高度和左侧雷达图一致 */}
          <div className="flex-1 min-h-0 pb-[1px] pr-[1px] overflow-auto">
            <ModelContent config={currentConfig} />
          </div>
        </div>
      </div>

      {/* 导出按钮 */}
      <div className="flex justify-end mb-4">
        <Button 
          icon={<ExportOutlined />}
          onClick={handleExport}
          className="bg-elevated text-primary-text border-custom hover:text-accent"
        >
          导出
        </Button>
      </div>

      {/* 下方：数据表格 */}
      {currentData?.length > 0 ? (
        <Table
          columns={columns}
          dataSource={currentData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
          loading={loading}
        />
      ) : (
        <Empty description="暂无符合条件的企业" className="text-muted" />
      )}
    </Card>
  );
});

SnipeListTable.displayName = 'SnipeListTable';

export default SnipeListTable;
