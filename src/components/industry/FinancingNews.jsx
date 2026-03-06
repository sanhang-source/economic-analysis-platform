import React from 'react';
import { RiseOutlined, FundOutlined, CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';

/**
 * FinancingNews - 最新融资动态
 * 展示行业内的最新融资信息
 */

// 模拟融资数据
const generateMockFinancing = (industryName, count = 6) => {
  const rounds = ['天使轮', 'Pre-A轮', 'A轮', 'A+轮', 'B轮', 'C轮', 'D轮', 'Pre-IPO', '战略融资'];
  const companies = ['智元科技', '芯驰半导体', '云从科技', '思谋科技', '优必选', '大疆创新', '丰巢科技', '柔宇科技', '奥比中光', '云天励飞'];
  const investors = ['红杉中国', '高瓴资本', 'IDG资本', '深创投', '达晨财智', '同创伟业', '松禾资本', '东方富海'];
  
  const data = [];
  for (let i = 0; i < count; i++) {
    const daysAgo = i * 3 + Math.floor(Math.random() * 3);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    data.push({
      id: `fin-${i}`,
      company: companies[i % companies.length],
      round: rounds[i % rounds.length],
      amount: `${(Math.floor(Math.random() * 10) + 1)}亿`,
      investor: investors[i % investors.length],
      date: `${daysAgo}天前`,
      isShenzhen: i < count * 0.7,
      hot: i < 3, // 前3条标记为热门
    });
  }
  return data;
};

const FinancingCard = ({ item }) => {
  return (
    <div className="group p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* 头部：公司名称和轮次 */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-800 group-hover:text-blue-700">
              {item.company}
            </span>
            {item.isShenzhen && (
              <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                深圳
              </span>
            )}
            {item.hot && (
              <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded flex items-center gap-1">
                <RiseOutlined /> 热门
              </span>
            )}
          </div>

          {/* 融资金额和轮次 */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg font-bold text-orange-600">{item.amount}</span>
            <span className="text-sm px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
              {item.round}
            </span>
          </div>

          {/* 投资方和时间 */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FundOutlined /> {item.investor}
            </span>
            <span className="flex items-center gap-1">
              <CalendarOutlined /> {item.date}
            </span>
          </div>
        </div>

        {/* 右侧箭头 */}
        <ArrowRightOutlined className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

const FinancingNews = ({ industry }) => {
  const financingData = React.useMemo(() => {
    if (!industry) return [];
    return generateMockFinancing(industry.name, 8);
  }, [industry]);

  if (!industry) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <RiseOutlined className="text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">最新融资</h3>
            <p className="text-xs text-gray-500">近30天 {industry.name} 领域融资动态</p>
          </div>
        </div>
      </div>

      {/* 融资列表 */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {financingData.map((item) => (
          <FinancingCard key={item.id} item={item} />
        ))}
      </div>

      {/* 底部统计 */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-500">本月融资：</span>
            <span className="font-semibold text-gray-800">{financingData.length} 起</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">深圳企业：</span>
            <span className="font-semibold text-blue-600">
              {financingData.filter(f => f.isShenzhen).length} 起
            </span>
          </div>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          查看更多 →
        </button>
      </div>
    </div>
  );
};

export default FinancingNews;
