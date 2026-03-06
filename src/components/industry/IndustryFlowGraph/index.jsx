import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import './style.css';

/**
 * IndustryFlowGraph - 横向产业链分布图（四级结构，支持展开/收起）
 * 
 * 四级结构：产业链 → 细分产业 → 细分行业 → 产品服务
 */

// ============ 展开/收起按钮组件 ============

const ExpandButton = ({ isExpanded, onClick, hasChildren }) => {
  if (!hasChildren) return null;
  
  return (
    <button
      onClick={onClick}
      className="expand-button"
      style={{
        position: 'absolute',
        right: -12,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: '#fff',
        border: '2px solid #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {isExpanded ? (
        <DownOutlined style={{ fontSize: 12, color: '#64748b' }} />
      ) : (
        <RightOutlined style={{ fontSize: 12, color: '#64748b' }} />
      )}
    </button>
  );
};

// ============ 自定义节点组件 ============

// 产业链节点 - 最左侧
const ChainNode = (props) => {
  const { data, id } = props;
  const { expandedNodes, toggleExpand } = data._internal || {};
  const isExpanded = !expandedNodes?.has(id);
  
  return (
    <div className="flow-node-chain" style={{ position: 'relative' }}>
      <Handle type="source" position={Position.Right} className="flow-handle" />
      
      <div className="flow-chain-badge">产业链</div>
      
      <h3 className="flow-chain-title">{data.name}</h3>
      
      <div className="flow-chain-stats">
        <div className="flow-chain-row">
          <span className="flow-chain-label">深圳</span>
          <span className="flow-chain-value">{(data.shenzhen / 10000).toFixed(1)}万</span>
        </div>
        <div className="flow-chain-row">
          <span className="flow-chain-label">全国</span>
          <span className="flow-chain-value-secondary">{(data.national / 10000).toFixed(1)}万</span>
        </div>
        <div className="flow-chain-divider" />
        <div className="flow-chain-row">
          <span className="flow-chain-label">占比</span>
          <span className="flow-chain-highlight">{data.percentage}%</span>
        </div>
      </div>
      
      <ExpandButton 
        isExpanded={isExpanded} 
        onClick={() => {
          console.log('ChainNode toggle:', id);
          toggleExpand?.(id);
        }}
        hasChildren={data.hasChildren}
      />
    </div>
  );
};

// 细分产业节点 - 二级
const SegmentNode = ({ data, id }) => {
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
  const { expandedNodes, toggleExpand } = data._internal || {};
  const isExpanded = !expandedNodes?.has(id); // 不在集合中 = 展开

  return (
    <div className={`flow-node-segment ${colors.border}`} style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} className="flow-handle-left" />
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
      
      <ExpandButton 
        isExpanded={isExpanded} 
        onClick={() => toggleExpand?.(id)}
        hasChildren={data.hasChildren}
      />
    </div>
  );
};

// 细分行业节点 - 三级
const SubSegmentNode = ({ data, id }) => {
  const { expandedNodes, toggleExpand } = data._internal || {};
  const isExpanded = !expandedNodes?.has(id); // 不在集合中 = 展开

  return (
    <div className="flow-node-subsegment" style={{ position: 'relative' }}>
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
      
      <ExpandButton 
        isExpanded={isExpanded} 
        onClick={() => toggleExpand?.(id)}
        hasChildren={data.hasChildren}
      />
    </div>
  );
};

// 产品服务节点 - 四级
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
  chain: ChainNode,
  segment: SegmentNode,
  subSegment: SubSegmentNode,
  product: ProductNode,
};

// ============ 主组件 ============

const IndustryFlowGraph = ({ data }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set()); // 默认全部展开

  // 切换展开/收起状态
  const toggleExpand = useCallback((nodeId) => {
    console.log('toggleExpand called:', nodeId);
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
        console.log('Node expanded:', nodeId);
      } else {
        newSet.add(nodeId);
        console.log('Node collapsed:', nodeId);
      }
      return newSet;
    });
  }, []);

  // 生成节点和边的布局
  useEffect(() => {
    if (!data) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const newNodes = [];
    const newEdges = [];
    
    // 起始Y位置
    const startY = 100;
    
    // 颜色列表
    const colorList = ['teal', 'blue', 'purple', 'orange', 'green', 'cyan', 'pink', 'indigo'];
    
    // X轴位置配置 - 四列布局
    const chainX = 20;         // 产业链 (一级)
    const segmentX = 320;      // 细分产业 (二级)
    const subSegmentX = 620;   // 细分行业 (三级)
    const productX = 900;      // 产品服务 (四级)
    
    // 垂直间距
    const level1Gap = 160;     // 细分产业间距
    const level2Gap = 90;      // 细分行业间距
    const level3Gap = 60;      // 产品服务间距

    // 检查节点是否展开
    const isExpanded = (id) => !expandedNodes.has(id); // 不在集合中 = 展开

    // 添加产业链节点（一级）
    const chainId = 'chain-root';
    const chainHasChildren = data.segments && data.segments.length > 0;
    
    newNodes.push({
      id: chainId,
      type: 'chain',
      position: { x: chainX, y: startY },
      data: { 
        ...data.root, 
        hasChildren: chainHasChildren,
        _internal: { expandedNodes, toggleExpand }
      },
      draggable: true,
    });

    if (!isExpanded(chainId)) {
      // 如果产业链收起，只渲染产业链节点
      setNodes(newNodes);
      setEdges(newEdges);
      return;
    }

    // 添加细分产业节点（二级）
    data.segments.forEach((segment, sIndex) => {
      const segmentId = `segment-${sIndex}`;
      const segmentY = startY - ((data.segments.length - 1) * level1Gap) / 2 + sIndex * level1Gap;
      const segmentColor = colorList[sIndex % colorList.length];
      const segmentHasChildren = segment.subSegments && segment.subSegments.length > 0;
      
      newNodes.push({
        id: segmentId,
        type: 'segment',
        position: { x: segmentX, y: segmentY },
        data: { 
          ...segment, 
          color: segmentColor,
          hasChildren: segmentHasChildren,
          _internal: { expandedNodes, toggleExpand }
        },
        draggable: true,
      });

      // 连接产业链到细分产业
      newEdges.push({
        id: `e-chain-${segmentId}`,
        source: chainId,
        target: segmentId,
        type: 'smoothstep',
        style: { stroke: '#94a3b8', strokeWidth: 2.5 },
      });

      if (!isExpanded(segmentId)) {
        // 如果细分产业收起，跳过子节点但继续处理其他细分产业
        return;
      }

      // 添加细分行业节点（三级）
      const subSegments = segment.subSegments || [];
      subSegments.forEach((subSegment, ssIndex) => {
        const subSegmentId = `subsegment-${sIndex}-${ssIndex}`;
        const subSegmentY = segmentY - ((subSegments.length - 1) * level2Gap) / 2 + ssIndex * level2Gap;
        const subSegmentHasChildren = subSegment.products && subSegment.products.length > 0;
        
        newNodes.push({
          id: subSegmentId,
          type: 'subSegment',
          position: { x: subSegmentX, y: subSegmentY },
          data: { 
            ...subSegment,
            hasChildren: subSegmentHasChildren,
            _internal: { expandedNodes, toggleExpand }
          },
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

        if (!isExpanded(subSegmentId)) return; // 如果细分行业收起，不渲染子节点

        // 添加产品服务节点（四级）
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

    setNodes(newNodes);
    setEdges(newEdges);
  }, [data, expandedNodes, toggleExpand]);

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

  return (
    <div style={{ width: '100%', height: '550px', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: 8 }}>
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
            fitViewOptions={{ padding: 0.1 }}
            minZoom={0.12}
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
