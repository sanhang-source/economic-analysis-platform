import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Card,
  Button,
  Progress,
  Tag,
  Avatar,
  Empty,
  Badge,
  Tooltip,
  Space,
  Typography,
  Divider,
  Select,
} from 'antd';
import {
  PlusOutlined,
  AimOutlined,
  ApartmentOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  GlobalOutlined,
  RightOutlined,
  ReloadOutlined,
  DownloadOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { industryGraphMock, recommendedEnterprises } from '../mock/industryGraphMock';

const { Title, Text } = Typography;
const { Option } = Select;

// 产业选项
const industryOptions = [
  { value: 'network', label: '网络与通信', tag: '网络与通信' },
  { value: 'new-energy', label: '新能源汽车', tag: '新能源汽车' },
  { value: 'biomedical', label: '生物医药', tag: '生物医药' },
  { value: 'semiconductor', label: '半导体与集成电路', tag: '半导体' },
  { value: 'smart-manufacturing', label: '智能制造', tag: '智能制造' },
];

/**
 * IndustryGraph - 产业链图谱页面
 * 左侧ECharts Graph + 右侧链上招商推荐面板
 */
const IndustryGraph = () => {
  const chartRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('network');

  // 根据选择的产业获取对应的mock数据
  const getIndustryData = (industry) => {
    const dataMap = {
      'network': { title: '网络与通信产业链图谱', tag: '网络与通信' },
      'new-energy': { title: '新能源汽车产业链图谱', tag: '新能源汽车' },
      'biomedical': { title: '生物医药产业链图谱', tag: '生物医药' },
      'semiconductor': { title: '半导体产业链图谱', tag: '半导体' },
      'smart-manufacturing': { title: '智能制造产业链图谱', tag: '智能制造' },
    };
    return dataMap[industry] || dataMap['network'];
  };

  const currentIndustry = getIndustryData(selectedIndustry);

  // 图表配置
  const getOption = () => {
    const { nodes, links, categories } = industryGraphMock;

    return {
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.dataType === 'node') {
            const node = params.data;
            const status = node.hasLocal ? '本地已有' : '本地缺失';
            const color = node.hasLocal ? '#52c41a' : '#f5222d';
            return `
              <div style="padding: 8px;">
                <div style="font-weight: bold; margin-bottom: 4px;">${node.name}</div>
                <div style="color: ${color}; font-size: 12px;">${status}</div>
                ${node.enterpriseCount ? `<div style="color: #666; font-size: 12px; margin-top: 4px;">企业数: ${node.enterpriseCount}家</div>` : ''}
              </div>
            `;
          }
          return params.name;
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        textStyle: {
          color: '#333',
        },
        extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px;',
      },
      legend: {
        data: categories.map((c) => c.name),
        bottom: 20,
        left: 'center',
        itemWidth: 20,
        itemHeight: 14,
        textStyle: {
          fontSize: 12,
          color: '#666',
        },
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: nodes.map((node) => ({
            ...node,
            symbolSize: node.category === 0 ? 80 : node.category === 1 ? 60 : 45,
            itemStyle: {
              color: node.hasLocal ? '#1677ff' : '#f0f0f0',
              borderColor: node.hasLocal ? '#1677ff' : '#999',
              borderWidth: node.hasLocal ? 0 : 2,
              borderType: node.hasLocal ? 'solid' : 'dashed',
              shadowBlur: node.hasLocal ? 10 : 0,
              shadowColor: 'rgba(22, 119, 255, 0.3)',
            },
            label: {
              show: true,
              position: 'bottom',
              distance: 5,
              fontSize: node.category === 0 ? 14 : 12,
              fontWeight: node.category === 0 ? 'bold' : 'normal',
              color: '#333',
              formatter: (params) => {
                const n = params.data;
                return n.hasLocal ? n.name : `{a|${n.name}}`;
              },
              rich: {
                a: {
                  color: '#999',
                  textBorderColor: '#fff',
                  textBorderWidth: 2,
                },
              },
            },
          })),
          links: links.map((link) => ({
            ...link,
            lineStyle: {
              color: '#e0e0e0',
              width: 1,
              curveness: 0.2,
            },
          })),
          categories: categories,
          roam: true,
          draggable: true,
          focusNodeAdjacency: true,
          force: {
            repulsion: 300,
            gravity: 0.1,
            edgeLength: [80, 150],
            layoutAnimation: true,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 3,
              color: '#1677ff',
            },
          },
        },
      ],
    };
  };

  // 点击节点事件
  const handleChartClick = (params) => {
    if (params.dataType === 'node') {
      const node = params.data;
      setSelectedNode(node);

      // 如果是缺失节点，显示推荐企业
      if (!node.hasLocal) {
        const recs = recommendedEnterprises[node.name] || [];
        setRecommendations(recs);
      } else {
        setRecommendations([]);
      }
    }
  };

  // 图表事件绑定
  const onChartEvents = {
    click: handleChartClick,
  };

  // 重置视图
  const handleReset = () => {
    setSelectedNode(null);
    setRecommendations([]);
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().dispatchAction({
        type: 'restore',
      });
    }
  };

  return (
    <div className="h-[calc(100vh-64px-48px)] -mx-6 -mt-6 flex">
      {/* 左侧图谱区 - 70% */}
      <div className="w-[70%] relative bg-white">
        {/* 图谱标题栏 */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-lg shadow-md">
            <Space>
              <ApartmentOutlined className="text-blue-500" />
              <span className="font-semibold text-gray-800">{currentIndustry.title}</span>
              <Tag color="blue">{currentIndustry.tag}</Tag>
            </Space>
          </div>
        </div>

        {/* 图谱操作按钮 */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <Select
            value={selectedIndustry}
            onChange={setSelectedIndustry}
            style={{ width: 160 }}
            placeholder="选择产业"
            suffixIcon={<DownOutlined />}
          >
            {industryOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
          <Tooltip title="重置视图">
            <Button icon={<ReloadOutlined />} onClick={handleReset} />
          </Tooltip>
          <Tooltip title="导出图片">
            <Button icon={<DownloadOutlined />} />
          </Tooltip>
        </div>

        {/* 图例说明 - 左下角 */}
        <div className="absolute bottom-4 left-4 z-10 bg-white px-4 py-3 rounded-lg shadow-md">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#1677ff]" />
              <span className="text-sm text-gray-600">本地已有</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#f0f0f0] border-2 border-dashed border-gray-400" />
              <span className="text-sm text-gray-600">本地缺失（招商机会）</span>
            </div>
          </div>
        </div>

        {/* ECharts 图谱 */}
        <ReactECharts
          ref={chartRef}
          option={getOption()}
          onEvents={onChartEvents}
          style={{ width: '100%', height: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>

      {/* 右侧分析面板 - 30% */}
      <div className="w-[30%] bg-gray-50 border-l border-gray-200 flex flex-col">
        {/* 面板头部 */}
        <div className="bg-white px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <AimOutlined className="text-blue-500" />
            <Title level={5} className="!mb-0">链上招商推荐</Title>
          </div>
          <Text type="secondary" className="text-sm">
            点击图谱中的灰色节点，查看招商推荐企业
          </Text>
        </div>

        {/* 面板内容区 */}
        <div className="flex-1 overflow-y-auto p-4">
          {!selectedNode ? (
            // 默认状态
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-center">
                  <div className="text-gray-500 mb-2">请点击左侧图谱中的节点</div>
                  <div className="text-xs text-gray-400">
                    灰色虚线节点表示本地缺失，为重点招商方向
                  </div>
                </div>
              }
            />
          ) : selectedNode.hasLocal ? (
            // 已有节点详情
            <Card className="mb-4" size="small">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircleOutlined className="text-green-500 text-2xl" />
                <div>
                  <div className="font-semibold text-lg">{selectedNode.name}</div>
                  <Tag color="green">本地已有</Tag>
                </div>
              </div>
              <Divider className="my-3" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text type="secondary">企业数量</Text>
                  <Text strong>{selectedNode.enterpriseCount}家</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">年产值</Text>
                  <Text strong>¥{selectedNode.outputValue}亿元</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">覆盖率</Text>
                  <Text strong>{selectedNode.coverage}%</Text>
                </div>
              </div>
            </Card>
          ) : recommendations.length > 0 ? (
            // 缺失节点推荐列表
            <div>
              {/* 节点信息 */}
              <Card className="mb-4 bg-orange-50 border-orange-200" size="small">
                <div className="flex items-center gap-3">
                  <WarningOutlined className="text-orange-500 text-xl" />
                  <div>
                    <div className="font-semibold">{selectedNode.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      本地缺失，建议重点招商
                    </div>
                  </div>
                </div>
              </Card>

              {/* 推荐企业列表 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">推荐企业</span>
                  <Badge count={recommendations.length} className="site-badge-count-4" />
                </div>

                {recommendations.map((enterprise) => (
                  <Card
                    key={enterprise.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    size="small"
                    bodyStyle={{ padding: 12 }}
                  >
                    {/* 企业头部 */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar
                          size="large"
                          style={{ background: enterprise.avatarColor }}
                        >
                          {enterprise.name.charAt(0)}
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {enterprise.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {enterprise.location}
                          </div>
                        </div>
                      </div>
                      <Tag color={enterprise.tagColor}>{enterprise.tag}</Tag>
                    </div>

                    {/* 匹配度 */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">匹配度</span>
                        <span className="font-semibold text-blue-600">
                          {enterprise.matchRate}%
                        </span>
                      </div>
                      <Progress
                        percent={enterprise.matchRate}
                        size="small"
                        strokeColor={
                          enterprise.matchRate >= 90
                            ? '#52c41a'
                            : enterprise.matchRate >= 80
                            ? '#1677ff'
                            : '#faad14'
                        }
                        showInfo={false}
                      />
                    </div>

                    {/* 推荐理由 */}
                    <div className="bg-gray-50 rounded-lg p-2 mb-3">
                      <div className="text-xs text-gray-500 mb-1">推荐理由</div>
                      <div className="text-sm text-gray-700">
                        {enterprise.recommendReason}
                      </div>
                    </div>

                    {/* 关键指标 */}
                    <div className="flex gap-4 text-xs text-gray-500 mb-3">
                      <span>年营收: {enterprise.revenue}</span>
                      <span>员工: {enterprise.employees}</span>
                    </div>

                    {/* 操作按钮 */}
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlusOutlined />}
                      block
                    >
                      加入线索池
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // 无推荐数据
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无推荐企业数据"
            />
          )}
        </div>

        {/* 面板底部 */}
        <div className="bg-white px-4 py-3 border-t border-gray-200">
          <Button type="link" block icon={<GlobalOutlined />}>
            查看更多产业链数据
            <RightOutlined className="text-xs" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustryGraph;
