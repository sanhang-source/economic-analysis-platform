import React, { useMemo } from 'react';
import { Card, Row, Col, Progress, Empty } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * ChainComparison - 产业链对比组件
 */
const ChainComparison = ({ chains }) => {
  if (!chains || chains.length < 2) {
    return (
      <Empty 
        description="请选择至少两个产业链进行对比" 
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  // 准备对比数据
  const comparisonData = useMemo(() => {
    return chains.map(chain => ({
      name: chain.name,
      shenzhen: chain.stats.shenzhenCount,
      national: chain.stats.nationalCount,
      percentage: chain.stats.percentage,
      color: chain.color,
    }));
  }, [chains]);

  // 计算最大值
  const maxShenzhen = Math.max(...comparisonData.map(d => d.shenzhen));
  const maxNational = Math.max(...comparisonData.map(d => d.national));

  // 横向柱状图配置（企业数量）
  const barChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        let result = params[0].name + '<br/>';
        params.forEach(item => {
          result += item.marker + item.seriesName + ': ' + item.value.toLocaleString() + '<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['深圳企业', '全国企业'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value) => value >= 10000 ? (value / 10000) + '万' : value,
      },
    },
    yAxis: {
      type: 'category',
      data: comparisonData.map(d => d.name),
      axisLabel: {
        fontSize: 12,
      },
    },
    series: [
      {
        name: '深圳企业',
        type: 'bar',
        data: comparisonData.map((d, i) => ({
          value: d.shenzhen,
          itemStyle: {
            color: d.color,
            borderRadius: [0, 4, 4, 0],
          },
        })),
        barWidth: 20,
      },
      {
        name: '全国企业',
        type: 'bar',
        data: comparisonData.map(d => ({
          value: d.national,
          itemStyle: {
            color: '#e8e8e8',
            borderRadius: [0, 4, 4, 0],
          },
        })),
        barWidth: 20,
      },
    ],
  };

  // 占比柱状图配置
  const percentageChartOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const item = params[0];
        return `${item.name}<br/>${item.marker}深圳占比: ${item.value}%`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: comparisonData.map(d => d.name),
      axisLabel: {
        fontSize: 11,
        rotate: 15,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%',
      },
    },
    series: [{
      type: 'bar',
      data: comparisonData.map(d => ({
        value: d.percentage,
        itemStyle: {
          color: d.color,
          borderRadius: [4, 4, 0, 0],
        },
      })),
      barWidth: 40,
      label: {
        show: true,
        position: 'top',
        formatter: '{c}%',
        fontSize: 12,
        fontWeight: 'bold',
      },
    }],
  };

  return (
    <div className="chain-comparison space-y-4">
      {/* 对比概览卡片 */}
      <Row gutter={[16, 16]}>
        {chains.map((chain) => (
          <Col span={12} key={chain.id}>
            <Card 
              size="small" 
              className="h-full"
              style={{ borderLeft: `4px solid ${chain.color}` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{chain.icon}</span>
                <span className="font-semibold text-gray-800">{chain.name}</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">深圳企业</span>
                    <span className="font-medium">{chain.stats.shenzhenCount.toLocaleString()}</span>
                  </div>
                  <Progress 
                    percent={Math.round((chain.stats.shenzhenCount / maxShenzhen) * 100)} 
                    showInfo={false}
                    strokeColor={chain.color}
                    size="small"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">全国企业</span>
                    <span className="font-medium">{chain.stats.nationalCount.toLocaleString()}</span>
                  </div>
                  <Progress 
                    percent={Math.round((chain.stats.nationalCount / maxNational) * 100)} 
                    showInfo={false}
                    strokeColor="#999"
                    size="small"
                  />
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-500">深圳占比</span>
                  <span 
                    className="text-lg font-bold"
                    style={{ color: chain.color }}
                  >
                    {chain.stats.percentage}%
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 企业数量对比图 */}
      <Card size="small" title="企业数量对比">
        <ReactECharts 
          option={barChartOption} 
          style={{ height: 250 }}
        />
      </Card>

      {/* 占比对比图 */}
      <Card size="small" title="深圳占比对比">
        <ReactECharts 
          option={percentageChartOption} 
          style={{ height: 220 }}
        />
      </Card>
    </div>
  );
};

export default ChainComparison;
