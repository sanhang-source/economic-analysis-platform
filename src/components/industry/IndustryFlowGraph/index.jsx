import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './style.css';

/**
 * IndustryFlowGraph - 横向产业链分布图
 * 
 * 三级结构：细分产业 → 细分行业 → 产品服务
 * 产业链信息展示在图表上方
 */

// ============ 自定义节点组件 ============

// 细分产业节点 - 一级
const SegmentNode = ({ data }) => {
  const colorMap = {
    teal: { border: 'border-teal-200', bar: 'bg-teal-500' },
    blue: { border: 'border-blue-200', bar: 'bg-blue-500' },
    purple: { border: 'border-purple-200', bar: 'bg-purple-500' },
    orange: { border: 'border-orange-200', bar: 'bg-orange-500' },
    green: { border: 'border-green-200', bar: 'bg-green-500' },
    cyan: { border: 'border-cyan-200', bar: 'bg-cyan-500' },
    pink: { border: 'border-pink-200', bar: 'bg-pink-500' },
    indigo: { border: 'border-indigo-200', bar: 'bg-indigo-500' },
  };
  
  const colors = colorMap[data.color] || colorMap.teal;

  return (
    <div className={`flow-node-segment ${colors.border}`}>
      <Handle type="source" position={Position.Right} className="flow-handle-right" />
      
      <div className="flow-segment-header">
        <div className={`flow-segment-bar ${colors.bar}`} />
        <span className="flow-segment-label">细分产业</span>
      </div>
      
      <h4 className="flow-segment-title">{data.name}</h4>
      
      <div className="flow-segment-grid">
        <div className="flow-grid-cell blue">
          <div className="flow-grid-value">{(data.shenzhen / 10000).toFixed(1)}万</div>
          <div className="flow-grid-label">深圳</div>
        </div>
        <div className="flow-grid-cell gray">
          <div className="flow-grid-value-secondary">{(data.national / 10000).toFixed(1)}万</div>
          <div className="flow-grid-label">全国</div>
        </div>
        <div className="flow-grid-cell orange">
          <div className="flow-grid-highlight">{data.percentage}%</div>
          <div className="flow-grid-label">占比</div>
        </div>
      </div>
    </div>
  );
};

// 细分行业节点 - 二级
const SubSegmentNode = ({ data }) => {
  return (
    <div className="flow-node-subsegment">
      <Handle type="target" position={Position.Left} className="flow-handle-left" />
      <Handle type="source" position={Position.Right} className="flow-handle-right" />
      
      <div className="flow-subsegment-header">
        <span className="flow-subsegment-label">细分行业</span>
      </div>
      
      <h4 className="flow-subsegment-title">{data.name}</h4>
      
      <div className="flow-subsegment-stats">
        <div className="flow-subsegment-stat">
          <span className="flow-subsegment-value blue">{data.shenzhen.toLocaleString()}</span>
          <span className="flow-subsegment-label-text">深圳</span>
        </div>
        <div className="flow-subsegment-stat">
          <span className="flow-subsegment-value">{data.national.toLocaleString()}</span>
          <span className="flow-subsegment-label-text">全国</span>
        </div>
        <div className="flow-subsegment-stat">
          <span className="flow-subsegment-value orange">{data.percentage}%</span>
          <span className="flow-subsegment-label-text">占比</span>
        </div>
      </div>
    </div>
  );
};

// 产品服务节点 - 三级
const ProductNode = ({ data }) => {
  return (
    <div className="flow-node-product">
      <Handle type="target" position={Position.Left} className="flow-handle-left" />
      
      <div className="flow-product-header">
        <span className="flow-product-name">{data.name}</span>
        <span className="flow-product-tag">产品服务</span>
      </div>
      
      <div className="flow-product-stats">
        <div className="flow-product-stat">
          <div className="flow-product-value blue">{data.shenzhen.toLocaleString()}</div>
          <div className="flow-product-label">深圳</div>
        </div>
        <div className="flow-product-stat">
          <div className="flow-product-value">{data.national.toLocaleString()}</div>
          <div className="flow-product-label">全国</div>
        </div>
        <div className="flow-product-stat">
          <div className="flow-product-value orange">{data.percentage}%</div>
          <div className="flow-product-label">占比</div>
        </div>
      </div>
    </div>
  );
};

// 注册节点类型
const nodeTypes = {
  segment: SegmentNode,
  subSegment: SubSegmentNode,
  product: ProductNode,
};

// ============ 产业链信息头部组件 ============

const ChainHeader = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="chain-header">
      <div className="chain-header-content">
        <div className="chain-header-title">{data.name}</div>
        <div className="chain-header-stats">
          <div className="chain-stat">
            <span className="chain-stat-label">深圳</span>
            <span className="chain-stat-value blue">{(data.shenzhen / 10000).toFixed(1)}万</span>
          </div>
          <div className="chain-stat-divider" />
          <div className="chain-stat">
            <span className="chain-stat-label">全国</span>
            <span className="chain-stat-value">{(data.national / 10000).toFixed(1)}万</span>
          </div>
          <div className="chain-stat-divider" />
          <div className="chain-stat">
            <span className="chain-stat-label">占比</span>
            <span className="chain-stat-value orange">{data.percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ 主组件 ============

const IndustryFlowGraph = ({ data }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // 生成节点和边的布局
  useEffect(() => {
    if (!data) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const newNodes = [];
    const newEdges = [];
    
    // 起始Y位置（留出头部空间）
    const startY = 80;
    
    // 颜色列表
    const colorList = ['teal', 'blue', 'purple', 'orange', 'green', 'cyan', 'pink', 'indigo'];
    
    // X轴位置配置 - 三列布局，增加间距确保都能显示
    const segmentX = 20;       // 细分产业 (一级)
    const subSegmentX = 340;   // 细分行业 (二级)
    const productX = 660;      // 产品服务 (三级)
    
    // 垂直间距
    const level1Gap = 160;     // 细分产业间距
    const level2Gap = 90;      // 细分行业间距
    const level3Gap = 60;      // 产品服务间距

    // 添加细分产业节点（一级）
    data.segments.forEach((segment, sIndex) => {
      const segmentId = `segment-${sIndex}`;
      const segmentY = startY - ((data.segments.length - 1) * level1Gap) / 2 + sIndex * level1Gap;
      const segmentColor = colorList[sIndex % colorList.length];
      
      newNodes.push({
        id: segmentId,
        type: 'segment',
        position: { x: segmentX, y: segmentY },
        data: { ...segment, color: segmentColor },
        draggable: true,
      });

      // 添加细分行业节点（二级）
      const subSegments = segment.subSegments || [];
      subSegments.forEach((subSegment, ssIndex) => {
        const subSegmentId = `subsegment-${sIndex}-${ssIndex}`;
        const subSegmentY = segmentY - ((subSegments.length - 1) * level2Gap) / 2 + ssIndex * level2Gap;
        
        newNodes.push({
          id: subSegmentId,
          type: 'subSegment',
          position: { x: subSegmentX, y: subSegmentY },
          data: subSegment,
          draggable: true,
        });

        // 连接细分产业到细分行业
        newEdges.push({
          id: `e-${segmentId}-${subSegmentId}`,
          source: segmentId,
          target: subSegmentId,
          type: 'smoothstep',
          style: { stroke: '#cbd5e1', strokeWidth: 2 },
        });

        // 添加产品服务节点（三级）
        const products = subSegment.products || [];
        products.forEach((product, pIndex) => {
          const productId = `product-${sIndex}-${ssIndex}-${pIndex}`;
          const productY = subSegmentY - ((products.length - 1) * level3Gap) / 2 + pIndex * level3Gap;
          
          newNodes.push({
            id: productId,
            type: 'product',
            position: { x: productX, y: productY },
            data: product,
            draggable: true,
          });

          // 连接细分行业到产品服务
          newEdges.push({
            id: `e-${subSegmentId}-${productId}`,
            source: subSegmentId,
            target: productId,
            type: 'smoothstep',
            style: { stroke: '#e2e8f0', strokeWidth: 1.5 },
          });
        });
      });
    });

    console.log('生成节点:', newNodes.length, '边:', newEdges.length);
    console.log('节点类型统计:', newNodes.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, {}));
    setNodes(newNodes);
    setEdges(newEdges);
  }, [data]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => nds.map((node) => {
      const change = changes.find((c) => c.id === node.id);
      if (change?.type === 'position') {
        return { ...node, position: change.position };
      }
      return node;
    }));
  }, []);

  const onEdgesChange = useCallback(() => {}, []);

  const onNodeClick = useCallback((event, node) => {
    // 可以在这里添加节点点击交互
  }, []);

  if (!data) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
        暂无数据
      </div>
    );
  }

  // 调试渲染
  console.log('Render - nodes:', nodes.length, 'container height: 520px');

  return (
    <div style={{ width: '100%', height: '550px', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: 8 }}>
      {/* 产业链信息头部 */}
      <ChainHeader data={data.root} />
      
      {/* React Flow 图表区域 */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        {nodes.length === 0 ? (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: '#64748b'
          }}>
            暂无数据
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.1}
            maxZoom={2}
            defaultEdgeOptions={{
              type: 'smoothstep',
              style: { strokeWidth: 2 },
            }}
            proOptions={{ hideAttribution: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <Controls />
            <Background color="#e2e8f0" gap={20} size={1} />
          </ReactFlow>
        )}
      </div>
    </div>
  );
};

export default IndustryFlowGraph;
