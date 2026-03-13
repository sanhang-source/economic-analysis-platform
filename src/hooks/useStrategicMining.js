import { useMemo } from 'react';
import dayjs from 'dayjs';
import { parseCapitalToNumber } from '../mock/capitalGenealogyMock';

/**
 * 集团系挖潜分析Hook
 * 基于前端Mock数据进行战略挖潜分析
 * 
 * @param {Array} members - 集团成员企业列表
 * @param {Object} clanInfo - 集团基本信息
 * @returns {Object} 挖潜分析结果
 */
export const useStrategicMining = (members, clanInfo) => {
  return useMemo(() => {
    if (!members || members.length === 0) {
      return {
        highValueNewMembers: [],
        industryGap: { global: {}, local: {} },
        strategicShiftDist: {},
        cityFlowDist: {},
        targetHuntingList: [],
        aiInsight: null,
        qianhaiPenetrationRate: 0,
      };
    }

    const THREE_YEARS_AGO = dayjs().subtract(3, 'years');
    
    // ==========================================
    // 1. 挤水分：获取高质量增量企业库
    // 条件：近3年成立 + 1/2级子公司 + 注册资本>5000万元
    // ==========================================
    const highValueNewMembers = members.filter(m => {
      const foundedDate = dayjs(m.foundedDate);
      const capitalNum = parseCapitalToNumber(m.capital);
      return (
        foundedDate.isAfter(THREE_YEARS_AGO) &&
        ['core', 'first', 'second'].includes(m.level) &&
        capitalNum >= 5000
      );
    });

    // ==========================================
    // 2. 存量缺口对标 (模块B)
    // ==========================================
    const localMembers = members.filter(m => m.region === 'local');
    
    // 按行业分组统计
    const groupByIndustry = (list) => {
      return list.reduce((acc, item) => {
        const industry = item.industry || '其他';
        if (!acc[industry]) {
          acc[industry] = { count: 0, capital: 0, members: [] };
        }
        acc[industry].count += 1;
        acc[industry].capital += parseCapitalToNumber(item.capital);
        acc[industry].members.push(item);
        return acc;
      }, {});
    };

    const globalIndustryDist = groupByIndustry(members);
    const localIndustryDist = groupByIndustry(localMembers);

    // 计算缺口行业（全国占比高但前海占比低）
    const industryGaps = Object.entries(globalIndustryDist)
      .map(([industry, globalData]) => {
        const localData = localIndustryDist[industry] || { count: 0, capital: 0 };
        const globalRatio = members.length > 0 ? (globalData.count / members.length) : 0;
        const localRatio = localMembers.length > 0 ? (localData.count / localMembers.length) : 0;
        const gap = globalRatio - localRatio;
        
        return {
          industry,
          globalCount: globalData.count,
          localCount: localData.count,
          globalRatio,
          localRatio,
          gap,
          isGap: gap > 0.1 && globalData.count >= 3, // 差距>10%且全国有3家以上
        };
      })
      .sort((a, b) => b.gap - a.gap);

    // ==========================================
    // 3. 增量战略投向 (模块C - 气泡图数据)
    // ==========================================
    const strategicShiftDist = highValueNewMembers.reduce((acc, item) => {
      const industry = item.industry || '其他';
      if (!acc[industry]) {
        acc[industry] = { count: 0, capital: 0, members: [] };
      }
      acc[industry].count += 1;
      acc[industry].capital += parseCapitalToNumber(item.capital);
      acc[industry].members.push(item);
      return acc;
    }, {});

    // 转换为气泡图数据格式
    const bubbleChartData = Object.entries(strategicShiftDist).map(([industry, data]) => ({
      name: industry,
      value: [
        data.count, // x轴：企业数量
        data.capital / 10000, // y轴：注册资本总额（亿元）
        data.capital / 10000, // 气泡大小
      ],
      itemStyle: { color: getIndustryColor(industry) },
    }));

    // ==========================================
    // 4. 竞对城市资金流向 (模块C - 城市排行)
    // ==========================================
    const outsideHighValue = highValueNewMembers.filter(m => m.region !== 'local');
    
    const cityFlowDist = outsideHighValue.reduce((acc, item) => {
      const city = item.regionName || '其他城市';
      if (!acc[city]) {
        acc[city] = { count: 0, capital: 0, members: [] };
      }
      acc[city].count += 1;
      acc[city].capital += parseCapitalToNumber(item.capital);
      acc[city].members.push(item);
      return acc;
    }, {});

    // 转换为排行数据
    const cityRanking = Object.entries(cityFlowDist)
      .map(([city, data]) => ({
        city,
        count: data.count,
        capital: data.capital,
        members: data.members,
      }))
      .sort((a, b) => b.capital - a.capital);

    // ==========================================
    // 5. 靶向狙击清单 (模块D)
    // ==========================================
    const targetHuntingList = outsideHighValue
      .sort((a, b) => parseCapitalToNumber(b.capital) - parseCapitalToNumber(a.capital));

    // ==========================================
    // 6. 前海渗透率计算
    // ==========================================
    const qianhaiPenetrationRate = clanInfo?.groupTotalRevenue && clanInfo?.qianhaiRevenue
      ? ((clanInfo.qianhaiRevenue / clanInfo.groupTotalRevenue) * 100)
      : 0;

    // ==========================================
    // 7. AI智能洞察生成 (模块A)
    // ==========================================
    const generateAIInsight = () => {
      // 前海存量支柱产业
      const localTopIndustry = Object.entries(localIndustryDist)
        .sort((a, b) => b[1].count - a[1].count)[0];
      
      // 战略扩张行业（高质量新增企业中占比最高的）
      const expansionIndustries = Object.entries(strategicShiftDist)
        .sort((a, b) => b[1].capital - a[1].capital)
        .slice(0, 2)
        .map(([industry]) => industry);
      
      // 主要外流城市
      const topFlowCities = cityRanking.slice(0, 2).map(item => item.city);
      
      // 新增核心资本总额
      const totalNewCapital = highValueNewMembers.reduce(
        (sum, m) => sum + parseCapitalToNumber(m.capital), 0
      );

      // 评级标签
      let ratingLabel = '';
      let ratingColor = '';
      if (qianhaiPenetrationRate < 10) {
        ratingLabel = '高潜能攻坚';
        ratingColor = 'red';
      } else if (qianhaiPenetrationRate < 25) {
        ratingLabel = '重点扩容';
        ratingColor = 'orange';
      } else {
        ratingLabel = '稳健护盘';
        ratingColor = 'blue';
      }

      return {
        ratingLabel,
        ratingColor,
        localPillarIndustry: localTopIndustry ? localTopIndustry[0] : '未知',
        expansionIndustries: expansionIndustries.length > 0 ? expansionIndustries : ['暂无数据'],
        topFlowCities: topFlowCities.length > 0 ? topFlowCities : ['暂无数据'],
        totalNewCapital: (totalNewCapital / 10000).toFixed(1), // 转为亿元
        newMembersCount: highValueNewMembers.length,
        suggestion: expansionIndustries[0] || '核心业务',
      };
    };

    const aiInsight = generateAIInsight();

    return {
      // 高质量增量企业
      highValueNewMembers,
      
      // 存量缺口分析
      industryGap: {
        global: globalIndustryDist,
        local: localIndustryDist,
        gaps: industryGaps,
      },
      
      // 战略投向
      strategicShiftDist,
      bubbleChartData,
      
      // 竞对城市流向
      cityFlowDist,
      cityRanking,
      
      // 靶向狙击清单
      targetHuntingList,
      
      // AI洞察
      aiInsight,
      
      // 渗透率
      qianhaiPenetrationRate,
    };
  }, [members, clanInfo]);
};

// 行业颜色映射
const industryColors = {
  '互联网': '#1677ff',
  '游戏': '#722ed1',
  '金融科技': '#fa8c16',
  '云计算': '#13c2c2',
  '人工智能': '#f5222d',
  '芯片': '#fa541c',
  '通信设备': '#1890ff',
  '消费电子': '#52c41a',
  '新能源汽车': '#722ed1',
  '电池': '#13c2c2',
  '汽车制造': '#eb2f96',
  '医疗器械': '#faad14',
  '保险': '#fa8c16',
  '银行': '#1677ff',
  '证券': '#1890ff',
  '房地产': '#52c41a',
  '物流': '#f5222d',
  '智能制造': '#2f4554',
  '跨境电商': '#eb2f96',
  '数字娱乐': '#722ed1',
};

const getIndustryColor = (industry) => {
  return industryColors[industry] || '#999';
};

export default useStrategicMining;
