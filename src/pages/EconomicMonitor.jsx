import ReactECharts from 'echarts-for-react';
import {
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  DatePicker,
} from 'antd';

import { economicMonitorMock } from '../mock/economicMonitorMock';
import { useState } from 'react';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

/**
 * EconomicMonitor - 经济监测页面
 * 统一配色方案 - 与数字驾驶舱一致
 * 顶部维度选择 + 2x2图表布局
 */
const EconomicMonitor = () => {
  const [districts, setDistricts] = useState([]);
  const [gbIndustries, setGbIndustries] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [parks, setParks] = useState([]);
  const [showMoreDistricts, setShowMoreDistricts] = useState(false);
  const [showMoreGB, setShowMoreGB] = useState(false);
  const [showMoreIndustry, setShowMoreIndustry] = useState(false);
  const [showMoreParks, setShowMoreParks] = useState(false);
  const [selectedGBIndustry, setSelectedGBIndustry] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  
  // 计算每行能显示的标签数量（根据屏幕宽度自适应）
  const VISIBLE_COUNT = 12;
  const { districts: districtsData, gbIndustries: gbIndustriesData, industries: industriesData, parks: parksData, chartData, summaryStats } = economicMonitorMock;
  
  // 统一配色方案 - 与数字驾驶舱一致
  const unifiedColors = {
    blue: '#2563eb',
    green: '#10b981',
    orange: '#f59e0b',
    purple: '#8b5cf6',
    red: '#ef4444',
    cyan: '#06b6d4',
    gray: '#6b7280',
  };
  
  // 获取已选维度标签
  const getSelectedTags = () => {
    const tags = [];
    if (selectedGBIndustry) {
      const item = gbIndustries.find(i => i.key === selectedGBIndustry);
      if (item) tags.push({ label: item.title, key: selectedGBIndustry, type: '国标行业' });
    }
    if (selectedIndustry) {
      const findItem = (items) => {
        for (const item of items) {
          if (item.key === selectedIndustry) return item;
          if (item.children) {
            const found = item.children.find(c => c.key === selectedIndustry);
            if (found) return found;
          }
        }
        return null;
      };
      const item = findItem(industries);
      if (item) tags.push({ label: item.title, key: selectedIndustry, type: '产业' });
    }
    if (selectedPark) {
      const item = parks.find(i => i.key === selectedPark);
      if (item) tags.push({ label: item.title, key: selectedPark, type: '园区' });
    }
    return tags;
  };
  
  // 移除已选标签
  const removeTag = (type) => {
    if (type === '国标行业') {
      setSelectedGBIndustry(null);
    } else if (type === '产业') {
      setSelectedIndustry(null);
    } else if (type === '园区') {
      setSelectedPark(null);
    }
  };
  
  // 清除所有选择
  const clearAllSelections = () => {
    setSelectedGBIndustry(null);
    setSelectedIndustry(null);
    setSelectedPark(null);
  };
  
  const getIndustryChildren = (parentKey) => {
    const parent = industries.find((item) => item.key === parentKey);
    return parent ? parent.children : [];
  };
  
  // 切换选择（多选逻辑）
  const toggleSelection = (selected, setter, key) => {
    if (selected.includes(key)) {
      setter(selected.filter(k => k !== key));
    } else {
      setter([...selected, key]);
    }
  };
  
  // 重置所有选择
  const handleReset = () => {
    setDistricts([]);
    setGbIndustries([]);
    setIndustries([]);
    setParks([]);
  };
  
  // 渲染统计值
  const renderStat = (value, suffix = '') => {
    return (
      <div className="text-2xl font-bold">{value.toLocaleString()}{suffix}</div>
    );
  };
  
  // 企业数量趋势图表配置
  const enterpriseChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
    legend: {
      data: ['企业数', '环比增长率', '同比增长率'],
      top: 0,
      textStyle: { fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartData.months,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#6b7280', fontSize: 10, rotate: 45 },
    },
    yAxis: [
      {
        type: 'value',
        name: '企业数量（万家）',
        position: 'left',
        min: 230,
        max: 270,
        axisLine: { show: false },
        axisLabel: { formatter: '{value}', color: unifiedColors.blue },
        splitLine: { lineStyle: { color: '#f3f4f6', type: 'dashed' } },
      },
      {
        type: 'value',
        name: '增长率(%)',
        position: 'right',
        axisLine: { show: true, lineStyle: { color: unifiedColors.orange } },
        axisLabel: { formatter: '{value}%', color: unifiedColors.orange, fontSize: 11 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '企业总数（万家）',
        type: 'bar',
        data: chartData.enterprise.total.map(v => (v / 10000).toFixed(1)),
        barWidth: 12,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#2563eb' },
              { offset: 1, color: '#60a5fa' },
            ],
          },
        },
      },
      {
        name: '环比增长率',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.enterprise.mom,
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: { color: unifiedColors.cyan, width: 2, type: 'dashed' },
        itemStyle: {
          color: unifiedColors.orange,
          borderWidth: 2,
          borderColor: '#fff',
        },
      },
      {
        name: '同比增长率',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.enterprise.yoy,
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          color: unifiedColors.green,
          width: 2,
          type: 'dashed',
        },
        itemStyle: {
          color: unifiedColors.green,
          borderWidth: 2,
          borderColor: '#fff',
        },
      },
    ],
  };
  
  // 纳税图表配置（绿色系）
  const taxChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
    legend: {
      data: ['税收总额', '环比增长率', '同比增长率'],
      top: 0,
      textStyle: { fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartData.months,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#6b7280', fontSize: 10, rotate: 45 },
    },
    yAxis: [
      {
        type: 'value',
        name: '纳税额（亿元）',
        position: 'left',
        axisLine: { show: false },
        axisLabel: { formatter: '{value}', color: unifiedColors.green },
        splitLine: { lineStyle: { color: '#f3f4f6', type: 'dashed' } },
      },
      {
        type: 'value',
        name: '增长率(%)',
        position: 'right',
        axisLine: { show: true, lineStyle: { color: unifiedColors.orange } },
        axisLabel: { formatter: '{value}%', color: unifiedColors.orange, fontSize: 11 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '纳税总额（亿元）',
        type: 'bar',
        data: chartData.tax.values,
        barWidth: 12,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#10b981' },
              { offset: 1, color: '#34d399' },
            ],
          },
        },
      },
      {
        name: '环比增长率（%）',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.tax.mom,
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: { color: unifiedColors.green, width: 3 },
        itemStyle: {
          color: unifiedColors.orange,
          borderWidth: 2,
          borderColor: '#fff',
        },
      },
      {
        name: '同比增长率',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.tax.yoy,
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          color: unifiedColors.blue,
          width: 2,
          type: 'dashed',
        },
        itemStyle: {
          color: unifiedColors.blue,
          borderWidth: 2,
          borderColor: '#fff',
        },
        markLine: {
          data: [{ yAxis: 0, lineStyle: { color: '#d1d5db', type: 'dashed' } }],
        },
      },
    ],
  };
  
  // 用工图表配置（橙色系）
  const employmentChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
    legend: {
      data: ['用工人数', '环比增长率', '同比增长率'],
      top: 0,
      textStyle: { fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartData.months,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#6b7280', fontSize: 10, rotate: 45 },
    },
    yAxis: [
      {
        type: 'value',
        name: '用工数（万人）',
        position: 'left',
        min: 1140,
        max: 1200,
        axisLine: { show: false },
        axisLabel: { formatter: '{value}', color: unifiedColors.orange },
        splitLine: { lineStyle: { color: '#f3f4f6', type: 'dashed' } },
      },
      {
        type: 'value',
        name: '增长率(%)',
        position: 'right',
        axisLine: { show: true, lineStyle: { color: unifiedColors.orange } },
        axisLabel: { formatter: '{value}%', color: unifiedColors.orange, fontSize: 11 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '用工总数（万人）',
        type: 'bar',
        data: chartData.employment.values,
        barWidth: 12,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#f59e0b' },
              { offset: 1, color: '#fbbf24' },
            ],
          },
        },
      },
      {
        name: '环比增长率（%）',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.employment.mom,
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: { color: unifiedColors.red, width: 2 },
        itemStyle: {
          color: unifiedColors.orange,
          borderWidth: 2,
          borderColor: '#fff',
        },
      },
      {
        name: '同比增长率',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.employment.yoy,
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          color: unifiedColors.red,
          width: 2,
          type: 'dashed',
        },
        itemStyle: {
          color: unifiedColors.red,
          borderWidth: 2,
          borderColor: '#fff',
        },
        markLine: {
          data: [{ yAxis: 0, lineStyle: { color: '#d1d5db', type: 'dashed' } }],
        },
      },
    ],
  };
  
  // 专利图表配置（紫色系）
  const patentChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
    legend: {
      data: ['专利数量'],
      top: 0,
      textStyle: { fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartData.months,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#6b7280', fontSize: 10, rotate: 45 },
    },
    yAxis: {
      type: 'value',
      name: '专利数(件)',
      position: 'left',
      axisLine: { show: true, lineStyle: { color: '#666' } },
      axisLabel: { color: '#666', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
    },
    series: [
      {
        name: '专利数量',
        type: 'bar',
        data: chartData.patent.apply,
        barWidth: 12,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#8b5cf6' },
              { offset: 1, color: '#c4b5fd' },
            ],
          },
        },
      },
    ],
  };
  
  const selectedTags = getSelectedTags();
  
  return (
    <div className="h-full -m-6 p-5">
      {/* 维度选择卡片 - 轻量标签样式 */}
      <Card 
        className="mb-5 shadow-sm" 
        bodyStyle={{ padding: '12px 20px 16px' }}
        headStyle={{ padding: '12px 16px' }}
        title={
          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-medium text-base pl-0">维度筛选</span>
            <button 
              onClick={handleReset}
              className="px-3 py-1 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all border-0 outline-none mr-0"
            >
              重置
            </button>
          </div>
        }
      >
        {/* 区域 */}
        <div className="flex items-start gap-4 mb-4">
          <span className="text-gray-800 text-sm font-semibold whitespace-nowrap pt-0.5 w-14">区域</span>
          <div className="flex-1">
            <div className="flex flex-wrap gap-x-1 gap-y-2">
              <button
                onClick={() => setDistricts([])}
                className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                  districts.length === 0
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                全部
              </button>
              {districtsData.slice(0, VISIBLE_COUNT).map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleSelection(districts, setDistricts, item.key)}
                  className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                    districts.includes(item.key)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {item.title}
                </button>
              ))}
              {!showMoreDistricts && districtsData.length > VISIBLE_COUNT && (
                <button
                  onClick={() => setShowMoreDistricts(true)}
                  className="px-3 py-0.5 text-sm rounded transition-all border-0 outline-none text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  更多
                  <span>▼</span>
                </button>
              )}
            </div>
            {showMoreDistricts && (
              <div className="flex flex-wrap gap-x-1 gap-y-2 mt-2">
                {districtsData.slice(VISIBLE_COUNT).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleSelection(districts, setDistricts, item.key)}
                    className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                      districts.includes(item.key)
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
                <button
                  onClick={() => setShowMoreDistricts(false)}
                  className="px-3 py-0.5 text-sm rounded transition-all border-0 outline-none text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  收起
                  <span style={{ transform: 'rotate(180deg)' }}>▼</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* 国标行业 */}
        <div className="flex items-start gap-4 mb-4">
          <span className="text-gray-800 text-sm font-semibold whitespace-nowrap pt-0.5 w-14">行业</span>
          <div className="flex-1">
            <div className="flex flex-wrap gap-x-1 gap-y-2">
              <button
                onClick={() => setGbIndustries([])}
                className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                  gbIndustries.length === 0
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                全部
              </button>
              {gbIndustriesData.slice(0, VISIBLE_COUNT).map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleSelection(gbIndustries, setGbIndustries, item.key)}
                  className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                    gbIndustries.includes(item.key)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.title}
                </button>
              ))}
              {!showMoreGB && gbIndustriesData.length > VISIBLE_COUNT && (
                <button
                  onClick={() => setShowMoreGB(true)}
                  className="px-3 py-0.5 text-sm rounded transition-all border-0 outline-none text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  更多
                  <span>▼</span>
                </button>
              )}
            </div>
            {showMoreGB && (
              <div className="flex flex-wrap gap-x-1 gap-y-2 mt-2">
                {gbIndustriesData.slice(VISIBLE_COUNT).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleSelection(gbIndustries, setGbIndustries, item.key)}
                    className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                      gbIndustries.includes(item.key)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
                <button
                  onClick={() => setShowMoreGB(false)}
                  className="px-3 py-0.5 text-sm rounded transition-all border-0 outline-none text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  收起
                  <span style={{ transform: 'rotate(180deg)' }}>▼</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* 产业 */}
        <div className="flex items-start gap-4 mb-4">
          <span className="text-gray-800 text-sm font-semibold whitespace-nowrap pt-0.5 w-14">产业</span>
          <div className="flex-1">
            <div className="flex flex-wrap gap-x-1 gap-y-2">
              <button
                onClick={() => setIndustries([])}
                className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                  industries.length === 0
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                全部
              </button>
              {industriesData.slice(0, VISIBLE_COUNT).map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleSelection(industries, setIndustries, item.key)}
                  className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                    industries.includes(item.key)
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  {item.title}
                </button>
              ))}
              {!showMoreIndustry && industriesData.length > VISIBLE_COUNT && (
                <button
                  onClick={() => setShowMoreIndustry(true)}
                  className="px-3 py-0.5 text-sm rounded transition-all border-0 outline-none text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  更多
                  <span>▼</span>
                </button>
              )}
            </div>
            {showMoreIndustry && (
              <div className="flex flex-wrap gap-x-1 gap-y-2 mt-2">
                {industriesData.slice(VISIBLE_COUNT).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleSelection(industries, setIndustries, item.key)}
                    className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                      industries.includes(item.key)
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
                <button
                  onClick={() => setShowMoreIndustry(false)}
                  className="px-3 py-0.5 text-sm rounded transition-all border-0 outline-none text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  收起
                  <span style={{ transform: 'rotate(180deg)' }}>▼</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* 园区 */}
        <div className="flex items-start gap-4">
          <span className="text-gray-800 text-sm font-semibold whitespace-nowrap pt-0.5 w-14">园区</span>
          <div className="flex-1">
            <div className="flex flex-wrap gap-x-1 gap-y-2">
              <button
                onClick={() => setParks([])}
                className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                  parks.length === 0
                    ? 'bg-amber-50 text-amber-600'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                全部
              </button>
              {parksData.slice(0, VISIBLE_COUNT).map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleSelection(parks, setParks, item.key)}
                  className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                    parks.includes(item.key)
                      ? 'bg-amber-50 text-amber-600'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                  }`}
                >
                  {item.title}
                </button>
              ))}
              {!showMoreParks && parksData.length > VISIBLE_COUNT && (
                <button
                  onClick={() => setShowMoreParks(true)}
                  className="px-3 py-0.5 text-sm rounded transition-all border-0 outline-none text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  更多
                  <span>▼</span>
                </button>
              )}
            </div>
            {showMoreParks && (
              <div className="flex flex-wrap gap-x-1 gap-y-2 mt-2">
                {parksData.slice(VISIBLE_COUNT).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleSelection(parks, setParks, item.key)}
                    className={`px-3 py-0.5 text-sm rounded transition-all border-0 outline-none ${
                      parks.includes(item.key)
                        ? 'bg-amber-50 text-amber-600'
                        : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
                <button
                  onClick={() => setShowMoreParks(false)}
                  className="px-3 py-0.5 text-sm rounded transition-all border-0 outline-none text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  收起
                  <span style={{ transform: 'rotate(180deg)' }}>▼</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      {/* 统计概览 */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card size="small" className="shadow-sm">
            <Statistic
              title="企业数量"
              valueRender={() => renderStat(
                (summaryStats.enterpriseCount.total / 10000).toFixed(1),
                ' 万家'
              )}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" className="shadow-sm">
            <Statistic
              title="纳税金额"
              valueRender={() => renderStat(
                summaryStats.taxRevenue.total,
                ' 亿元'
              )}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="用工人数"
              valueRender={() => renderStat(
                summaryStats.employment.total,
                ' 万人'
              )}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" className="shadow-sm">
            <Statistic
              title="专利数量"
              valueRender={() => renderStat(
                (summaryStats.patents.total / 10000).toFixed(1),
                ' 万件'
              )}
            />
          </Card>
        </Col>
      </Row>
      
      {/* 图表区域 - 2x2 布局 */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="企业数量趋势"
            className="shadow-sm h-full"
            bodyStyle={{ padding: '12px' }}
          >
            <ReactECharts
              option={enterpriseChartOption}
              style={{ height: 280 }}
              opts={{ renderer: 'canvas' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="纳税金额趋势"
            className="shadow-sm h-full"
            bodyStyle={{ padding: '12px' }}
          >
            <ReactECharts
              option={taxChartOption}
              style={{ height: 280 }}
              opts={{ renderer: 'canvas' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="用工人数趋势"
            className="shadow-sm h-full"
            bodyStyle={{ padding: '12px' }}
          >
            <ReactECharts
              option={employmentChartOption}
              style={{ height: 280 }}
              opts={{ renderer: 'canvas' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="专利数量趋势"
            className="shadow-sm h-full"
            bodyStyle={{ padding: '12px' }}
          >
            <ReactECharts
              option={patentChartOption}
              style={{ height: 280 }}
              opts={{ renderer: 'canvas' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EconomicMonitor;
