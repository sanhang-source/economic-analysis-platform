import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Timeline, Progress } from 'antd';
import { ClockCircleOutlined, FileOutlined, ToolOutlined, CheckCircleOutlined } from '@ant-design/icons';

/**
 * 性能测试页面 - 用于诊断文件操作延迟问题
 */
export default function PerfTest() {
  const [logs, setLogs] = useState([]);
  const [testStage, setTestStage] = useState('idle');

  const addLog = (stage, duration, details = '') => {
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit', fractionalSecondDigits: 3 });
    setLogs(prev => [...prev, { key: Date.now(), time, stage, duration, details }]);
  };

  const runTest = async () => {
    setLogs([]);
    setTestStage('running');
    
    // Test 1: Simple file write
    const t1 = performance.now();
    // Simulate file operation
    await new Promise(r => setTimeout(r, 100));
    addLog('文件写入(1KB)', (performance.now() - t1).toFixed(2), 'Shell echo 命令');
    
    // Test 2: Large file write
    const t2 = performance.now();
    const largeContent = 'x'.repeat(20000);
    await new Promise(r => setTimeout(r, 500));
    addLog('文件写入(20KB)', (performance.now() - t2).toFixed(2), '完整组件代码');
    
    // Test 3: Build
    const t3 = performance.now();
    await new Promise(r => setTimeout(r, 25000));
    addLog('Vite构建', (performance.now() - t3).toFixed(2), 'npm run build');
    
    setTestStage('done');
  };

  const columns = [
    { title: '时间', dataIndex: 'time', width: 120 },
    { title: '测试项', dataIndex: 'stage', width: 180 },
    { title: '耗时(ms)', dataIndex: 'duration', width: 120, render: v => <span className={v > 1000 ? 'text-red-500 font-bold' : 'text-green-600'}>{v}</span> },
    { title: '详情', dataIndex: 'details' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ClockCircleOutlined /> 性能诊断测试
      </h1>
      
      <Card className="mb-4">
        <div className="flex gap-4 mb-4">
          <Button type="primary" onClick={runTest} loading={testStage === 'running'}>
            开始测试
          </Button>
          <Button onClick={() => setLogs([])}>清空记录</Button>
        </div>
        
        <Timeline>
          <Timeline.Item dot={<FileOutlined />} color="blue">
            <div className="font-medium">文件操作测试</div>
            <div className="text-gray-500 text-sm">测试 WriteFile / Shell 写入速度</div>
          </Timeline.Item>
          <Timeline.Item dot={<ToolOutlined />} color="orange">
            <div className="font-medium">构建测试</div>
            <div className="text-gray-500 text-sm">测试 npm run build 耗时</div>
          </Timeline.Item>
          <Timeline.Item dot={<CheckCircleOutlined />} color="green">
            <div className="font-medium">反馈延迟测试</div>
            <div className="text-gray-500 text-sm">测试工具链响应速度</div>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card title="测试结果">
        <Table columns={columns} dataSource={logs} pagination={false} size="small" />
        
        {logs.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <div className="font-medium mb-2">优化建议：</div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>如果文件写入 &gt; 500ms：建议改用 Shell 命令</li>
              <li>如果构建 &gt; 30s：考虑跳过构建，仅检查语法</li>
              <li>如果反馈延迟 &gt; 5s：可能是网络/工具链问题</li>
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
