import * as echarts from 'echarts';
import { ANT_COLORS } from '../../constants/colors';

const CHART_COLORS = ['#1677ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1', '#13c2c2'];

export const createIndustryGapOption = (data) => ({
  title: { 
    text: '全国 vs 前海 行业营收落差分析', 
    left: 'center',
    textStyle: { fontSize: 16, fontWeight: 'bold' }
  },
  tooltip: { 
    trigger: 'axis', 
    axisPointer: { type: 'shadow' },
    formatter: (params) => {
      const qianhai = params.find(p => p.seriesName === '前海营收');
      const national = params.find(p => p.seriesName === '全国营收');
      const gap = Math.abs(national?.value || 0) - (qianhai?.value || 0);
      return `<b>${params[0].name}</b><br/>
              <span style="color:${ANT_COLORS.primary}">全国营收: ${Math.abs(national?.value || 0)}亿元</span><br/>
              <span style="color:${ANT_COLORS.success}">前海营收: ${qianhai?.value || 0}亿元</span><br/>
              <span style="color:${ANT_COLORS.error}">落差: ${gap}亿元</span>`;
    }
  },
  legend: { data: ['全国营收', '前海营收'], bottom: 0 },
  grid: { left: '8%', right: '8%', bottom: '12%', top: '12%', containLabel: true },
  xAxis: {
    type: 'value',
    name: '营收（亿元）',
    nameLocation: 'middle',
    nameGap: 25,
    axisLabel: { 
      formatter: (value) => `${Math.abs(value)}亿`
    },
    splitLine: { show: true, lineStyle: { type: 'dashed' } }
  },
  yAxis: { 
    type: 'category', 
    data: data.map(d => d.industry),
    axisLabel: { fontSize: 12 },
    axisTick: { show: false }
  },
  series: [
    {
      name: '全国营收',
      type: 'bar',
      data: data.map(d => -d.nationalRevenue),
      itemStyle: { 
        color: ANT_COLORS.primary,
        borderRadius: [4, 0, 0, 4]
      },
      barGap: '-100%',
      label: { show: false }
    },
    {
      name: '前海营收',
      type: 'bar',
      data: data.map(d => d.qianhaiRevenue),
      itemStyle: { 
        color: ANT_COLORS.success,
        borderRadius: [0, 4, 4, 0]
      },
      label: { show: false }
    }
  ]
});

export const createInvestmentTrendOption = (data) => ({
  title: { 
    text: '近三年战略投资偏好（注册资本分布）', 
    left: 'center',
    textStyle: { fontSize: 16, fontWeight: 'bold' }
  },
  tooltip: { 
    trigger: 'item',
    formatter: '{b}: {c}亿元 ({d}%)'
  },
  legend: { bottom: 0 },
  series: [{
    type: 'pie',
    radius: [30, 120],
    center: ['50%', '50%'],
    roseType: 'area',
    itemStyle: { borderRadius: 8 },
    data: data.map((d, i) => ({
      value: parseFloat(d.capital),
      name: d.industry,
      itemStyle: { color: CHART_COLORS[i % CHART_COLORS.length] }
    })),
    label: { show: false }
  }]
});

export const createCityFlowOption = (data) => ({
  title: { 
    text: '高能级新项目截流城市榜单（Top 5）', 
    left: 'center',
    textStyle: { fontSize: 16, fontWeight: 'bold' }
  },
  tooltip: { 
    trigger: 'axis', 
    axisPointer: { type: 'shadow' },
    formatter: '{b}: {c}亿元注册资本'
  },
  grid: { left: '3%', right: '8%', bottom: '10%', top: '12%', containLabel: true },
  xAxis: { 
    type: 'value', 
    name: '注册资本（亿元）',
    nameLocation: 'middle',
    nameGap: 25,
    axisLabel: { formatter: '{value}亿' }
  },
  yAxis: { 
    type: 'category', 
    data: data.map(d => d.city).reverse(),
    axisLabel: { fontSize: 12, fontWeight: 'bold' }
  },
  series: [{
    type: 'bar',
    data: data.map(d => parseFloat(d.capital)).reverse(),
    itemStyle: { 
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#ff7875' },
        { offset: 1, color: ANT_COLORS.error }
      ]),
      borderRadius: [0, 4, 4, 0]
    },
    barWidth: '50%',
    label: { show: false }
  }]
});
