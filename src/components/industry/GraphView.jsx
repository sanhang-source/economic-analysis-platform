import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Empty } from 'antd';

/**
 * GraphView - 力导向图谱视图组件
 * 将产业链层级结构转换为图数据展示
 */
const GraphView = ({ chain, selectedNodeId, onNodeClick }) => {
  // 将层级数据转换为图数据
  const graphData = useMemo(() => {
    if (!chain || !chain.hierarchy) return null;

    const nodes = [];
    const links = [];
    const categories = [
      { name: '产业链', itemStyle: { color: chain.color } },
      { name: '产业', itemStyle: { color: '#52c41a' } },
      { name: '细分行业', itemStyle: { color: '#fa8c16' } },
      { name: '产品服务', itemStyle: { color: '#722ed1' } },
    ];

    // 添加根节点（产业链本身）
    nodes.push({
      id: chain.id,
      name: chain.name,
      value: chain.stats.shenzhenCount,
      category: 0,
      symbolSize: 60,
      label: {
        show: true,
        fontSize: 14,
        fontWeight: 'bold',
      },
      itemStyle: {
        color: chain.color,
      },
    });

    // 递归遍历层级结构
    const traverse = (nodes_list, parentId, level) => {
      nodes_list.forEach((node, index) => {
        const nodeId = node.id || `${parentId}-${index}`;
        const category = Math.min(level, 3);
        
        // 添加节点
        nodes.push({
          id: nodeId,
          name: node.name,
          value: node.enterpriseCount,
          category,
          symbolSize: Math.max(20, 50 - level * 10),
          label: {
            show: true,
            fontSize: Math.max(10, 12 - level),
          },
          // 标记是否选中
          itemStyle: selectedNodeId === nodeId ? {
            borderColor: '#1677ff',
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: '#1677ff',
          } : undefined,
        });

        // 添加连接
        links.push({
          source: parentId,
          target: nodeId,
          value: node.enterpriseCount,
        });

        // 递归处理子节点
        if (node.children && node.children.length > 0) {
          traverse(node.children, nodeId, level + 1);
        }
      });
    };

    traverse(chain.hierarchy, chain.id, 1);

    return { nodes, links, categories };
  }, [chain, selectedNodeId]);

  if (!graphData) {
    return <Empty description="暂无数据" />;
  }

  // 图谱配置
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.dataType === 'node') {
          const data = params.data;
          return `
            <div style="padding: 8px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${data.name}</div>
              <div style="color: #666;">企业数量: ${data.value?.toLocaleString() || 0}</div>
            </div>
          `;
        }
        return params.name;
      },
    },
    legend: {
      data: graphData.categories.map(c => c.name),
      bottom: 0,
      textStyle: {
        fontSize: 11,
      },
    },
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: graphData.nodes,
        links: graphData.links,
        categories: graphData.categories,
        roam: true,
        draggable: true,
        label: {
          position: 'bottom',
          formatter: '{b}',
        },
        force: {
          repulsion: 300,
          gravity: 0.1,
          edgeLength: [80, 150],
          layoutAnimation: true,
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4,
          },
        },
        lineStyle: {
          color: 'source',
          curveness: 0.1,
          opacity: 0.6,
          width: 1.5,
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          shadowBlur: 5,
          shadowColor: 'rgba(0,0,0,0.1)',
        },
        selectedMode: 'single',
        select: {
          itemStyle: {
            borderColor: '#1677ff',
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: '#1677ff',
          },
        },
      },
    ],
  };

  // 处理节点点击
  const handleClick = (params) => {
    if (params.dataType === 'node') {
      onNodeClick?.(params.data);
    }
  };

  return (
    <div className="graph-view h-full">
      <ReactECharts
        option={option}
        style={{ height: '100%', minHeight: 500 }}
        onEvents={{
          click: handleClick,
        }}
      />
    </div>
  );
};

export default GraphView;
