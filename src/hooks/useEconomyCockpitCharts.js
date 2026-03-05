import { useMemo } from 'react';
import { UNIFIED_COLORS } from '../constants/colors';

/**
 * useEconomyCockpitCharts - 数字驾驶舱图表配置 Hook
 * 封装所有图表配置，使用 useMemo 优化性能
 */
export const useEconomyCockpitCharts = (data) => {
  const {
    enterpriseTrend,
    taxTrend,
    employmentTrend,
    patentTrend,
    taxContribution,
  } = data;

  // 企业总数趋势图配置
  const enterpriseTrendOption = useMemo(() => ({
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'cross' },
      formatter: (params) => {
        let result = params[0].name + '<br/>';
        params.forEach(item => {
          const value = item.seriesName === '企业总数' 
            ? (item.value / 10000).toFixed(1) 
            : Number(item.value).toFixed(1);
          result += item.marker + item.seriesName + ': ' + value + '<br/>';
        });
        return result;
      }
    },
    legend: { data: ['企业总数', '新增'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: enterpriseTrend.months, axisLabel: { rotate: 45, fontSize: 10 } },
    yAxis: [
      { type: 'value', name: '总数（万家）', position: 'left', min: 2300000, max: 2700000, interval: 100000, axisLabel: { formatter: (value) => (value / 10000).toFixed(0) } },
      { type: 'value', name: '新增（万家）', position: 'right', min: 1, max: 3, interval: 0.5, splitLine: { show: false }, axisLabel: { formatter: '{value}' } },
    ],
    series: [
      { name: '企业总数', type: 'line', data: enterpriseTrend.total, smooth: true, itemStyle: { color: UNIFIED_COLORS.blue }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37, 99, 235, 0.3)' }, { offset: 1, color: 'rgba(37, 99, 235, 0.05)' }] } } },
      { name: '新增', type: 'bar', yAxisIndex: 1, data: enterpriseTrend.newAdded, itemStyle: { color: UNIFIED_COLORS.blue, borderRadius: [4, 4, 0, 0] }, barWidth: 12 },
    ],
  }), [enterpriseTrend]);

  // 纳税趋势图配置
  const taxTrendOption = useMemo(() => ({
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'cross' },
      formatter: (params) => {
        let result = params[0].name + '<br/>';
        params.forEach(item => {
          const value = Number(item.value).toFixed(1);
          result += item.marker + item.seriesName + ': ' + value + '<br/>';
        });
        return result;
      }
    },
    legend: { data: ['环比', '纳税总额'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: taxTrend.months, axisLabel: { rotate: 45, fontSize: 10 } },
    yAxis: [
      { type: 'value', name: '总额（亿元）', position: 'left' },
      { type: 'value', name: '环比（%）', position: 'right', min: -15, max: 15, interval: 6, splitLine: { show: false }, axisLabel: { formatter: '{value}' } },
    ],
    series: [
      { name: '纳税总额', type: 'bar', data: taxTrend.values, itemStyle: { color: UNIFIED_COLORS.green, borderRadius: [4, 4, 0, 0] }, barWidth: 12 },
      { name: '环比', type: 'line', yAxisIndex: 1, data: taxTrend.momGrowth, smooth: true, itemStyle: { color: UNIFIED_COLORS.green }, lineStyle: { width: 3 }, symbol: 'emptyCircle', symbolSize: 6 },
    ],
  }), [taxTrend]);

  // 用工趋势图配置
  const employmentTrendOption = useMemo(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['用工总数', '新增'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: employmentTrend.months, axisLabel: { rotate: 45, fontSize: 10 } },
    yAxis: [
      { type: 'value', name: '总数（万人）', position: 'left', min: 1180, max: 1200, interval: 5 },
      { type: 'value', name: '新增（万人）', position: 'right', min: 0, max: 3, interval: 0.5, splitLine: { show: false } },
    ],
    series: [
      { name: '用工总数', type: 'line', data: employmentTrend.total, smooth: true, itemStyle: { color: UNIFIED_COLORS.orange }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(245, 158, 11, 0.3)' }, { offset: 1, color: 'rgba(245, 158, 11, 0.05)' }] } } },
      { name: '新增', type: 'bar', yAxisIndex: 1, data: employmentTrend.newAdded, itemStyle: { color: UNIFIED_COLORS.orange, borderRadius: [4, 4, 0, 0] }, barWidth: 12 },
    ],
  }), [employmentTrend]);

  // 专利趋势图配置
  const patentTrendOption = useMemo(() => ({
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'cross' },
      formatter: (params) => {
        let result = params[0].name + '<br/>';
        params.forEach(item => {
          const value = item.seriesName === '专利总数' ? (item.value / 10000).toFixed(1) : Number(item.value).toFixed(1);
          result += item.marker + item.seriesName + ': ' + value + '<br/>';
        });
        return result;
      }
    },
    legend: { data: ['专利总数', '新增'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: patentTrend.months, axisLabel: { rotate: 45, fontSize: 10 } },
    yAxis: [
      { type: 'value', name: '总数（万件）', position: 'left', min: 230000, max: 290000, interval: 12000, axisLabel: { formatter: (value) => (value / 10000).toFixed(0) } },
      { type: 'value', name: '新增（万件）', position: 'right', min: 0, max: 1, interval: 0.2, splitLine: { show: false }, axisLabel: { formatter: '{value}' } },
    ],
    series: [
      { name: '专利总数', type: 'line', data: patentTrend.total, smooth: true, itemStyle: { color: UNIFIED_COLORS.purple }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(139, 92, 246, 0.3)' }, { offset: 1, color: 'rgba(139, 92, 246, 0.05)' }] } } },
      { name: '新增', type: 'bar', yAxisIndex: 1, data: patentTrend.newAdded, itemStyle: { color: UNIFIED_COLORS.purple, borderRadius: [4, 4, 0, 0] }, barWidth: 12 },
    ],
  }), [patentTrend]);

  // 资质企业分布图配置（横向条形图）
  const qualificationOption = useMemo(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}家' },
    grid: { left: '3%', right: '18%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { formatter: (value) => value >= 10000 ? (value / 10000) + '万' : value, fontSize: 10 }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    yAxis: { type: 'category', data: ['独角兽', '上市公司', '专精特新', '规上企业', '国高企业'], axisLabel: { fontSize: 11 }, inverse: true },
    series: [{
      type: 'bar',
      data: [
        { value: 55, itemStyle: { color: UNIFIED_COLORS.red, borderRadius: [0, 4, 4, 0] } },
        { value: 420, itemStyle: { color: UNIFIED_COLORS.orange, borderRadius: [0, 4, 4, 0] } },
        { value: 8650, itemStyle: { color: UNIFIED_COLORS.green, borderRadius: [0, 4, 4, 0] } },
        { value: 12860, itemStyle: { color: UNIFIED_COLORS.blue, borderRadius: [0, 4, 4, 0] } },
        { value: 23450, itemStyle: { color: UNIFIED_COLORS.gray, borderRadius: [0, 4, 4, 0] } },
      ],
      barWidth: 20,
      label: { show: true, position: 'right', formatter: (params) => { const value = params.value; return value >= 10000 ? (value / 10000).toFixed(1) + '万' : value.toLocaleString(); }, fontSize: 11 },
    }],
  }), []);

  // 行业分布图配置（饼图）
  const industryOption = useMemo(() => ({
    tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
    legend: { orient: 'vertical', right: 5, top: 'middle', itemWidth: 10, itemHeight: 10, textStyle: { fontSize: 10, lineHeight: 14 }, itemGap: 6 },
    series: [{
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['35%', '50%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 485000, name: '电子信息', itemStyle: { color: UNIFIED_COLORS.blue } },
        { value: 425000, name: '软件和信息服务', itemStyle: { color: UNIFIED_COLORS.green } },
        { value: 368000, name: '智能制造', itemStyle: { color: UNIFIED_COLORS.orange } },
        { value: 158000, name: '现代物流', itemStyle: { color: UNIFIED_COLORS.purple } },
        { value: 135000, name: '新能源', itemStyle: { color: UNIFIED_COLORS.cyan } },
        { value: 105000, name: '生物医药', itemStyle: { color: UNIFIED_COLORS.red } },
        { value: 92000, name: '金融科技', itemStyle: { color: UNIFIED_COLORS.gray } },
      ],
    }],
  }), []);

  // 企业年限结构图配置（环形图）
  const lifecycleOption = useMemo(() => ({
    tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
    legend: { orient: 'vertical', right: 5, top: 'middle', itemWidth: 10, itemHeight: 10, textStyle: { fontSize: 10, lineHeight: 14 }, itemGap: 8 },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 268000, name: '1年内(新设)', itemStyle: { color: UNIFIED_COLORS.blue } },
        { value: 398000, name: '1-3年(初创)', itemStyle: { color: UNIFIED_COLORS.green } },
        { value: 485000, name: '3-5年(成长)', itemStyle: { color: UNIFIED_COLORS.orange } },
        { value: 652000, name: '5-10年(稳定)', itemStyle: { color: UNIFIED_COLORS.purple } },
        { value: 775000, name: '10年+(成熟)', itemStyle: { color: UNIFIED_COLORS.gray } },
      ],
    }],
  }), []);

  // 税收贡献分层图配置（横向条形图）
  const taxContributionOption = useMemo(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}家' },
    grid: { left: '3%', right: '15%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { formatter: (value) => value >= 10000 ? (value / 10000) + '万' : value, fontSize: 10 }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    yAxis: { type: 'category', data: taxContribution.levels, axisLabel: { fontSize: 11 }, inverse: true },
    series: [{
      type: 'bar',
      data: [
        { value: 3200, itemStyle: { color: UNIFIED_COLORS.red, borderRadius: [0, 4, 4, 0] } },
        { value: 28500, itemStyle: { color: UNIFIED_COLORS.orange, borderRadius: [0, 4, 4, 0] } },
        { value: 185000, itemStyle: { color: UNIFIED_COLORS.green, borderRadius: [0, 4, 4, 0] } },
        { value: 895000, itemStyle: { color: UNIFIED_COLORS.blue, borderRadius: [0, 4, 4, 0] } },
        { value: 1473300, itemStyle: { color: UNIFIED_COLORS.gray, borderRadius: [0, 4, 4, 0] } },
      ],
      barWidth: 20,
      label: { show: true, position: 'right', formatter: (params) => { const value = params.value; return value >= 10000 ? (value / 10000).toFixed(1) + '万' : value; }, fontSize: 10 },
    }],
  }), [taxContribution]);

  // 产业分布图配置（饼图）
  const strategicIndustriesOption = useMemo(() => ({
    tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
    legend: { orient: 'vertical', right: 5, top: 'middle', itemWidth: 10, itemHeight: 10, textStyle: { fontSize: 10, lineHeight: 14 }, itemGap: 8 },
    series: [{
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['35%', '50%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 468000, name: '新一代信息技术', itemStyle: { color: UNIFIED_COLORS.blue } },
        { value: 118000, name: '高端装备制造', itemStyle: { color: UNIFIED_COLORS.green } },
        { value: 98000, name: '生物医药', itemStyle: { color: UNIFIED_COLORS.orange } },
        { value: 72000, name: '新材料', itemStyle: { color: UNIFIED_COLORS.purple } },
        { value: 45800, name: '新能源', itemStyle: { color: UNIFIED_COLORS.cyan } },
        { value: 39800, name: '节能环保', itemStyle: { color: UNIFIED_COLORS.red } },
        { value: 35200, name: '新能源汽车', itemStyle: { color: UNIFIED_COLORS.gray } },
      ],
    }],
  }), []);

  // 用工规模结构图配置（横向条形图）
  const employmentScaleOption = useMemo(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { formatter: (value) => value >= 10000 ? (value / 10000) + '万' : value } },
    yAxis: { type: 'category', data: ['1000人以上', '500-999人', '300-499人', '100-299人', '50-99人', '50人以下'], axisLabel: { fontSize: 11 }, inverse: true },
    series: [{
      type: 'bar',
      data: [920, 2150, 4850, 14200, 32800, 2536080],
      itemStyle: { color: UNIFIED_COLORS.blue, borderRadius: [0, 4, 4, 0] },
      barWidth: 16,
      label: { show: true, position: 'right', formatter: (params) => {
        const value = params.value;
        return value >= 10000 ? (value / 10000).toFixed(1) + '万' : value.toLocaleString();
      }, fontSize: 10 },
    }],
  }), []);

  return {
    enterpriseTrendOption,
    taxTrendOption,
    employmentTrendOption,
    patentTrendOption,
    qualificationOption,
    industryOption,
    lifecycleOption,
    taxContributionOption,
    strategicIndustriesOption,
    employmentScaleOption,
  };
};

export default useEconomyCockpitCharts;
