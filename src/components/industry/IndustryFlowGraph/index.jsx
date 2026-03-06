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
      
      {/* 标题行：名称 + 标签 */}
      <div className="flow-chain-header-row">
        <h3 className="flow-chain-title">{data.name}</h3>
        <span className="flow-chain-badge">产业链</span>
      </div>
      
      {/* 统计信息 - 数字在上，文字在下 */}
      <div className="flow-chain-stats-grid">
        <div className="flow-chain-stat-item">
          <div className="flow-chain-value">{(data.shenzhen / 10000).toFixed(1)}万</div>
          <div className="flow-chain-label">深圳</div>
        </div>
        <div className="flow-chain-stat-item">
          <div className="flow-chain-value-secondary">{(data.national / 10000).toFixed(1)}万</div>
          <div className="flow-chain-label">全国</div>
        </div>
        <div className="flow-chain-stat-item">
          <div className="flow-chain-highlight">{data.percentage}%</div>
          <div className="flow-chain-label">占比</div>
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
  const { expandedNodes, toggleExpand } = data._internal || {};
  const isExpanded = !expandedNodes?.has(id);

  return (
    <div className="flow-node-segment" style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} className="flow-handle-left" />
      <Handle type="source" position={Position.Right} className="flow-handle-right" />
      
      {/* 名称 + 标签 */}
      <div className="flow-segment-header-row">
        <h4 className="flow-segment-title">{data.name}</h4>
        <span className="flow-segment-badge">细分产业</span>
      </div>
      
      {/* 数据展示 - 无背景色 */}
      <div className="flow-segment-stats-row">
        <div className="flow-segment-stat">
          <div className="flow-segment-value blue">{(data.shenzhen / 10000).toFixed(1)}万</div>
          <div className="flow-segment-label">深圳</div>
        </div>
        <div className="flow-segment-stat">
          <div className="flow-segment-value gray">{(data.national / 10000).toFixed(1)}万</div>
          <div className="flow-segment-label">全国</div>
        </div>
        <div className="flow-segment-stat">
          <div className="flow-segment-value orange">{data.percentage}%</div>
          <div className="flow-segment-label">占比</div>
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
  const isExpanded = expandedNodes?.has(id); // 在集合中 = 展开产品服务

  return (
    <div className="flow-node-subsegment" style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} className="flow-handle-left" />
      <Handle type="source" position={Position.Right} className="flow-handle-right" />
      
      {/* 名称 + 标签 */}
      <div className="flow-subsegment-header-row">
        <h4 className="flow-subsegment-title">{data.name}</h4>
        <span className="flow-subsegment-badge">细分行业</span>
      </div>
      
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
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  // 切换展开/收起状态
  const toggleExpand = useCallback((nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      
      if (nodeId.startsWith('subsegment-')) {
        if (newSet.has(nodeId)) {
          newSet.delete(nodeId);
        } else {
          Array.from(newSet).forEach(id => {
            if (id.startsWith('subsegment-')) {
              newSet.delete(id);
            }
          });
          newSet.add(nodeId);
        }
      } else {
        if (newSet.has(nodeId)) {
          newSet.delete(nodeId);
        } else {
          newSet.add(nodeId);
        }
      }
      
      return newSet;
    });
  }, []);

  // ============ 树形布局算法 ============
  useEffect(() => {
    if (!data) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const newNodes = [];
    const newEdges = [];
    
    const startY = 100;
    const nodeGap = 100;      // 基础节点间距
    const chainX = 20;
    const segmentX = 400;
    const subSegmentX = 780;
    const productX = 1160;

    const isExpanded = (id) => !expandedNodes.has(id);
    const isSubSegmentExpanded = (id) => expandedNodes.has(id);

    // 创建产业链节点
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
      setNodes(newNodes);
      setEdges(newEdges);
      return;
    }

    // ========== 第一步：构建树结构并计算每棵子树所需高度 ==========
    
    // 递归计算子树高度
    function calcSubTreeHeight(segment, sIndex) {
      if (!isExpanded(`segment-${sIndex}`)) {
        return { height: nodeGap, type: 'collapsed' };
      }

      const subSegments = segment.subSegments || [];
      if (subSegments.length === 0) {
        return { height: nodeGap, type: 'leaf' };
      }

      let childrenHeight = 0;
      const children = [];

      subSegments.forEach((subSegment, ssIndex) => {
        const subSegmentId = `subsegment-${sIndex}-${ssIndex}`;
        const productCount = isSubSegmentExpanded(subSegmentId) 
          ? (subSegment.products?.length || 0) 
          : 0;
        
        // 子节点高度 = 自身 + 产品
        const childHeight = nodeGap + productCount * nodeGap;
        childrenHeight += childHeight;
        children.push({ subSegmentId, ssIndex, subSegment, productCount, childHeight });
      });

      // 子节点之间的间距
      const gaps = (subSegments.length - 1) * nodeGap;
      const totalHeight = Math.max(nodeGap, childrenHeight + gaps);

      return { height: totalHeight, children, segment };
    }

    // 计算所有细分产业的树信息
    const trees = data.segments.map((segment, sIndex) => ({
      id: `segment-${sIndex}`,
      sIndex,
      segment,
      ...calcSubTreeHeight(segment, sIndex)
    }));

    // ========== 第二步：计算细分产业的Y位置 ==========
    // 策略：根据子树高度动态分配Y坐标，确保子树不重叠
    
    let currentY = startY;
    const segmentPositions = [];
    
    trees.forEach((tree, index) => {
      const segmentY = currentY;
      segmentPositions.push({ id: tree.id, y: segmentY, tree });
      
      // 下一个细分产业的Y位置 = 当前位置 + 当前子树高度的一半 + 间距 + 下一个子树高度的一半
      if (index < trees.length - 1) {
        const nextTree = trees[index + 1];
        const gap = (tree.height / 2) + nodeGap + (nextTree.height / 2);
        currentY += gap;
      }
    });

    // ========== 第三步：计算细分行业和产品的Y位置 ==========
    const subSegmentYMap = new Map();
    const productYMap = new Map();

    trees.forEach(tree => {
      if (!tree.children || tree.children.length === 0) return;

      const segmentPos = segmentPositions.find(p => p.id === tree.id);
      const segmentY = segmentPos.y;

      // 计算子节点在子树中的起始Y位置
      const childrenTotalHeight = tree.children.reduce((sum, c) => sum + c.childHeight, 0);
      const childrenTotalGaps = (tree.children.length - 1) * nodeGap;
      const childrenTreeHeight = childrenTotalHeight + childrenTotalGaps;
      
      // 让子树以细分产业节点为中心
      let childY = segmentY - childrenTreeHeight / 2;

      tree.children.forEach((child, idx) => {
        // 细分行业的Y位置（子节点自身的中心）
        const subSegmentY = childY + child.childHeight / 2;
        subSegmentYMap.set(child.subSegmentId, subSegmentY);

        // 产品服务的Y位置
        if (child.productCount > 0) {
          const products = child.subSegment.products || [];
          products.forEach((product, pIdx) => {
            const productId = `product-${tree.sIndex}-${child.ssIndex}-${pIdx}`;
            const productY = subSegmentY + (pIdx + 1) * nodeGap;
            productYMap.set(productId, productY);
          });
        }

        // 下一个子节点的起始位置
        childY += child.childHeight;
        if (idx < tree.children.length - 1) {
          childY += nodeGap;
        }
      });
    });

    // ========== 第四步：创建所有节点和边 ==========
    
    trees.forEach(tree => {
      const segmentY = segmentPositions.find(p => p.id === tree.id).y;
      
      // 细分产业节点
      newNodes.push({
        id: tree.id,
        type: 'segment',
        position: { x: segmentX, y: segmentY },
        data: { 
          ...tree.segment, 
          hasChildren: tree.segment.subSegments && tree.segment.subSegments.length > 0,
          _internal: { expandedNodes, toggleExpand }
        },
        draggable: true,
      });

      newEdges.push({
        id: `e-chain-${tree.id}`,
        source: chainId,
        target: tree.id,
        type: 'smoothstep',
        style: { stroke: '#cbd5e1', strokeWidth: 2 },
      });

      if (!tree.children) return;

      // 细分行业和产品
      tree.children.forEach(child => {
        const subSegmentY = subSegmentYMap.get(child.subSegmentId);
        
        newNodes.push({
          id: child.subSegmentId,
          type: 'subSegment',
          position: { x: subSegmentX, y: subSegmentY },
          data: { 
            ...child.subSegment,
            hasChildren: child.subSegment.products && child.subSegment.products.length > 0,
            _internal: { expandedNodes, toggleExpand }
          },
          draggable: true,
        });

        newEdges.push({
          id: `e-${tree.id}-${child.subSegmentId}`,
          source: tree.id,
          target: child.subSegmentId,
          type: 'smoothstep',
          style: { stroke: '#cbd5e1', strokeWidth: 2 },
        });

        // 产品服务
        if (child.productCount > 0) {
          const products = child.subSegment.products || [];
          products.forEach((product, pIdx) => {
            const productId = `product-${tree.sIndex}-${child.ssIndex}-${pIdx}`;
            const productY = productYMap.get(productId);
            
            if (productY !== undefined) {
              newNodes.push({
                id: productId,
                type: 'product',
                position: { x: productX, y: productY },
                data: product,
                draggable: true,
              });

              newEdges.push({
                id: `e-${child.subSegmentId}-${productId}`,
                source: child.subSegmentId,
                target: productId,
                type: 'smoothstep',
                style: { stroke: '#cbd5e1', strokeWidth: 2 },
              });
            }
          });
        }
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

  if (!data) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
        暂无数据
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '550px', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: 8 }}>
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
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2, includeHiddenNodes: false }}
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
