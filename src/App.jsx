import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { MainLayout } from './components/layout';

import InvestmentMap from './pages/InvestmentMap';
import ProjectKanban from './pages/ProjectKanban';
import IndustryGraph from './pages/IndustryGraph';
import EnterpriseList from './pages/EnterpriseList';
import EnterpriseProfile from './pages/EnterpriseProfile';
import EconomyCockpit from './pages/EconomyCockpit';
import LoginPage from './pages/LoginPage';
import LeadsPool from './pages/LeadsPool';
import ChainAnalysis from './pages/ChainAnalysis';
import CapitalGenealogy from './pages/CapitalGenealogy';
import TradeEcosystem from './pages/TradeEcosystem';
import EconomicMonitor from './pages/EconomicMonitor';
import ReportSubmission from './pages/ReportSubmission';
import PolicySimulation from './pages/PolicySimulation';
import PolicyEvaluation from './pages/PolicyEvaluation';
import EnterpriseRadar from './pages/EnterpriseRadar';

/**
 * App - 应用入口
 * 配置 Ant Design 主题和路由
 */
const App = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
        components: {
          Layout: {
            headerBg: '#ffffff',
            siderBg: '#ffffff',
          },
          Menu: {
            itemBg: '#ffffff',
            itemSelectedBg: 'rgba(22, 119, 255, 0.08)',
            itemHoverBg: 'rgba(0, 0, 0, 0.04)',
            itemSelectedColor: '#1677ff',
            subMenuItemBg: '#ffffff',
            activeBarWidth: 3,
            activeBarHeight: 24,
            activeBarBorderWidth: 0,
          },
        },
      }}
    >
      <HashRouter>
        <Routes>
          {/* 登录页 - 独立布局 */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* 主布局路由 */}
          <Route path="/" element={<MainLayout />}>
            {/* 默认页面：驾驶舱 */}
            <Route index element={<EconomyCockpit />} />
            <Route path="dashboard" element={<EconomyCockpit />} />
            
            {/* 招商引资子页面 */}
            <Route path="investment/map" element={<InvestmentMap />} />
            <Route path="investment/leads" element={<LeadsPool />} />
            <Route path="investment/projects" element={<ProjectKanban />} />
            
            {/* 产业大脑子页面 */}
            <Route path="industry/graph" element={<IndustryGraph />} />
            <Route path="industry/supply-chain" element={<ChainAnalysis />} />
            <Route path="industry/capital" element={<CapitalGenealogy />} />
            <Route path="industry/trade" element={<TradeEcosystem />} />
            
            {/* 企业档案子页面 */}
            <Route path="enterprise/list" element={<EnterpriseList />} />
            <Route path="enterprise/profile" element={<EnterpriseProfile />} />
            <Route path="enterprise/radar" element={<EnterpriseRadar />} />
            
            {/* 经济运行子页面 */}
            <Route path="economy/monitor" element={<EconomicMonitor />} />
            <Route path="economy/reports" element={<ReportSubmission />} />
            
            {/* 政策服务子页面 */}
            <Route path="policy/simulation" element={<PolicySimulation />} />
            <Route path="policy/evaluation" element={<PolicyEvaluation />} />
            
            {/* 系统设置 */}
            <Route path="settings" element={<PlaceholderPage title="系统设置" />} />
            

          </Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  );
};

/**
 * PlaceholderPage - 占位页面组件
 * 用于展示未实现的页面
 */
const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px]">
    <div className="text-6xl mb-4">🚧</div>
    <h2 className="text-2xl font-bold text-gray-700 mb-2">{title}</h2>
    <p className="text-gray-500">该页面正在开发中，敬请期待...</p>
  </div>
);

export default App;
