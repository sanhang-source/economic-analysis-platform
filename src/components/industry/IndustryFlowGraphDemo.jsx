import React from 'react';
import IndustryFlowGraph from './IndustryFlowGraph';

/**
 * IndustryFlowGraphDemo - 演示数据
 * 
 * 展示如何使用 IndustryFlowGraph 组件
 */

// 示例数据：软件与信息服务产业链
const demoData = {
  root: {
    name: '软件与信息服务',
    shenzhen: 43000,
    national: 98000,
    percentage: 43.1,
  },
  segments: [
    {
      name: '基础软件',
      shenzhen: 18000,
      national: 42000,
      percentage: 42.8,
      products: [
        { name: '操作系统', shenzhen: 1150, national: 2800, percentage: 41 },
        { name: '数据库', shenzhen: 1680, national: 3900, percentage: 43 },
        { name: '中间件', shenzhen: 3370, national: 7800, percentage: 43 },
        { name: '办公软件', shenzhen: 2850, national: 6600, percentage: 43 },
        { name: '开发工具', shenzhen: 4200, national: 9800, percentage: 43 },
      ],
    },
    {
      name: '云计算',
      shenzhen: 34000,
      national: 78000,
      percentage: 43.6,
      products: [
        { name: 'IaaS', shenzhen: 2100, national: 4900, percentage: 43 },
        { name: 'PaaS', shenzhen: 3050, national: 7100, percentage: 43 },
        { name: 'SaaS', shenzhen: 2650, national: 6200, percentage: 43 },
        { name: '云存储', shenzhen: 4200, national: 9800, percentage: 43 },
        { name: '云安全', shenzhen: 3800, national: 8800, percentage: 43 },
      ],
    },
    {
      name: '人工智能',
      shenzhen: 49000,
      national: 115000,
      percentage: 42.6,
      products: [
        { name: 'AI芯片', shenzhen: 2650, national: 6200, percentage: 43 },
        { name: '算法框架', shenzhen: 1890, national: 4400, percentage: 43 },
        { name: '机器学习', shenzhen: 4200, national: 9800, percentage: 43 },
        { name: '计算机视觉', shenzhen: 5100, national: 11800, percentage: 43 },
        { name: '自然语言处理', shenzhen: 3800, national: 8800, percentage: 43 },
        { name: '智能语音', shenzhen: 3200, national: 7400, percentage: 43 },
      ],
    },
    {
      name: '大数据',
      shenzhen: 28000,
      national: 65000,
      percentage: 43.1,
      products: [
        { name: '数据采集', shenzhen: 3200, national: 7400, percentage: 43 },
        { name: '数据存储', shenzhen: 2800, national: 6500, percentage: 43 },
        { name: '数据分析', shenzhen: 4500, national: 10500, percentage: 43 },
        { name: '数据可视化', shenzhen: 2100, national: 4900, percentage: 43 },
      ],
    },
    {
      name: '工业互联网',
      shenzhen: 22000,
      national: 52000,
      percentage: 42.3,
      products: [
        { name: '工业软件', shenzhen: 3800, national: 8800, percentage: 43 },
        { name: '工业APP', shenzhen: 2600, national: 6000, percentage: 43 },
        { name: '工业大数据', shenzhen: 1800, national: 4200, percentage: 43 },
        { name: '工业安全', shenzhen: 1500, national: 3500, percentage: 43 },
      ],
    },
  ],
};

// 另一个示例：新能源
const demoData2 = {
  root: {
    name: '新能源',
    shenzhen: 8500,
    national: 28000,
    percentage: 30.4,
  },
  segments: [
    {
      name: '动力电池',
      shenzhen: 3200,
      national: 10500,
      percentage: 30.5,
      products: [
        { name: '三元锂电池', shenzhen: 850, national: 2800, percentage: 30 },
        { name: '磷酸铁锂', shenzhen: 1200, national: 3900, percentage: 31 },
        { name: '固态电池', shenzhen: 320, national: 1050, percentage: 30 },
        { name: '电池管理系统', shenzhen: 650, national: 2100, percentage: 31 },
      ],
    },
    {
      name: '新能源汽车',
      shenzhen: 4200,
      national: 13800,
      percentage: 30.4,
      products: [
        { name: '纯电动乘用车', shenzhen: 1200, national: 3900, percentage: 31 },
        { name: '插电混动', shenzhen: 850, national: 2800, percentage: 30 },
        { name: '氢燃料电池车', shenzhen: 210, national: 700, percentage: 30 },
        { name: '电驱动系统', shenzhen: 650, national: 2100, percentage: 31 },
        { name: '充电桩', shenzhen: 980, national: 3200, percentage: 31 },
      ],
    },
    {
      name: '光伏产业',
      shenzhen: 2100,
      national: 7000,
      percentage: 30.0,
      products: [
        { name: '硅片', shenzhen: 320, national: 1050, percentage: 30 },
        { name: '电池片', shenzhen: 280, national: 920, percentage: 30 },
        { name: '组件', shenzhen: 420, national: 1400, percentage: 30 },
        { name: '逆变器', shenzhen: 580, national: 1900, percentage: 31 },
      ],
    },
  ],
};

const IndustryFlowGraphDemo = () => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">软件与信息服务产业链</h2>
        <IndustryFlowGraph data={demoData} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">新能源产业链</h2>
        <IndustryFlowGraph data={demoData2} />
      </div>
    </div>
  );
};

export { demoData, demoData2 };
export default IndustryFlowGraphDemo;
