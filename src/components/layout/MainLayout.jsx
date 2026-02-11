import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Input,
  Badge,
  Avatar,
  Button,
  Breadcrumb,
  Dropdown,
  theme,
} from 'antd';
import {
  DashboardOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  BankOutlined,
  LineChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  DownOutlined,
  SearchOutlined,
  AimOutlined,
  ProjectOutlined,
  ShareAltOutlined,
  LinkOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  FormOutlined,
  FileProtectOutlined,
  CalculatorOutlined,
  RadarChartOutlined,
  NodeIndexOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

/**
 * MainLayout - 经济运行分析平台 平台主布局
 * 包含：左侧深色侧边栏、顶部白色通栏、灰色内容区域
 */
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  // 菜单配置
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '数字驾驶舱',
    },
    {
      key: '/economy',
      icon: <LineChartOutlined />,
      label: '经济运行',
      children: [
        {
          key: '/economy/monitor',
          icon: <BarChartOutlined />,
          label: '经济监测',
        },
        {
          key: '/economy/reports',
          icon: <FormOutlined />,
          label: '报表填报',
        },
      ],
    },
    {
      key: '/industry',
      icon: <ApartmentOutlined />,
      label: '产业大脑',
      children: [
        {
          key: '/industry/graph',
          icon: <ShareAltOutlined />,
          label: '产业链图谱',
        },
        {
          key: '/industry/supply-chain',
          icon: <LinkOutlined />,
          label: '强链补链分析',
        },
        {
          key: '/industry/capital',
          icon: <NodeIndexOutlined />,
          label: '企业系族',
        },
        {
          key: '/industry/trade',
          icon: <SwapOutlined />,
          label: '交易生态',
        },
      ],
    },
    {
      key: '/policy',
      icon: <FileProtectOutlined />,
      label: '政策服务',
      children: [
        {
          key: '/policy/simulation',
          icon: <CalculatorOutlined />,
          label: '政策试算',
        },
        {
          key: '/policy/evaluation',
          icon: <BarChartOutlined />,
          label: '政策评估',
        },
      ],
    },
    {
      key: '/investment',
      icon: <GlobalOutlined />,
      label: '招商引资',
      children: [
        {
          key: '/investment/map',
          icon: <AimOutlined />,
          label: '招商地图',
        },
        {
          key: '/investment/leads',
          icon: <ShareAltOutlined />,
          label: '线索公海',
        },
        {
          key: '/investment/projects',
          icon: <ProjectOutlined />,
          label: '项目看板',
        },
      ],
    },
    {
      key: '/enterprise',
      icon: <BankOutlined />,
      label: '企业档案',
      children: [
        {
          key: '/enterprise/list',
          icon: <FileTextOutlined />,
          label: '企业名录',
        },
        {
          key: '/enterprise/profile',
          icon: <FileSearchOutlined />,
          label: '一企一档',
        },
        {
          key: '/enterprise/radar',
          icon: <RadarChartOutlined />,
          label: '企业雷达',
        },
      ],
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: 'profile',
      label: '个人中心',
    },
    {
      key: 'settings',
      label: '账号设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ];

  // 处理用户菜单点击
  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      navigate('/login');
    }
  };

  // 面包屑映射
  const breadcrumbMap = {
    '/dashboard': ['数字驾驶舱'],
    '/investment': ['招商引资'],
    '/investment/map': ['招商引资', '招商地图'],
    '/investment/leads': ['招商引资', '线索公海'],
    '/investment/projects': ['招商引资', '项目看板'],
    '/industry': ['产业大脑'],
    '/industry/graph': ['产业大脑', '产业链图谱'],
    '/industry/supply-chain': ['产业大脑', '强链补链分析'],
    '/industry/capital': ['产业大脑', '企业系族'],
    '/industry/trade': ['产业大脑', '交易生态'],
    '/enterprise': ['企业档案'],
    '/enterprise/list': ['企业档案', '企业名录'],
    '/enterprise/profile': ['企业档案', '一企一档'],
    '/enterprise/radar': ['企业档案', '企业雷达'],
    '/economy': ['经济运行'],
    '/economy/monitor': ['经济运行', '经济监测'],
    '/economy/reports': ['经济运行', '报表填报'],
    '/policy': ['政策服务'],
    '/policy/simulation': ['政策服务', '政策试算'],
    '/policy/evaluation': ['政策服务', '政策评估'],
    '/settings': ['系统设置'],
  };

  // 获取当前面包屑
  const getBreadcrumbs = () => {
    const paths = breadcrumbMap[location.pathname] || ['工作台'];
    return paths.map((path, index) => ({
      title: path,
      key: index,
    }));
  };

  // 处理菜单点击
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout className="min-h-screen">
      {/* 左侧侧边栏 - 深色主题 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        theme="dark"
        className="fixed left-0 top-0 h-screen z-50"
        style={{
          background: '#ffffff',
          boxShadow: '0 0 20px rgba(0,0,0,0.06), 4px 0 16px rgba(0,0,0,0.04)',
        }}
      >
        {/* Logo 区域 */}
        <div
          className="h-16 flex items-center justify-center border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ 
                background: 'linear-gradient(135deg, #1677ff 0%, #00d4aa 100%)',
              }}
            >
              <GlobalOutlined className="text-white text-lg" />
            </div>
            {!collapsed && (
              <span className="text-gray-800 text-lg font-semibold tracking-wide">
                经济运行分析平台
              </span>
            )}
          </div>
        </div>

        {/* 菜单 */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={collapsed ? [] : undefined}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            background: '#ffffff',
            borderRight: 0,
          }}
        />
      </Sider>

      {/* 右侧内容区 */}
      <Layout
        className="transition-all duration-200"
        style={{
          marginLeft: collapsed ? 80 : 250,
        }}
      >
        {/* 顶部通栏 - 白色背景 */}
        <Header
          className="bg-white flex items-center justify-between sticky top-0 z-40"
          style={{
            boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
            height: 64,
            padding: '0 24px',
          }}
        >
          {/* 左侧：收起按钮 + 面包屑 */}
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600 hover:text-gray-900"
            />
            <Breadcrumb items={getBreadcrumbs()} />
          </div>

          {/* 中间：全局搜索框 */}
          <div className="flex-1 flex items-center justify-center max-w-2xl mx-8">
            <Search
              placeholder="搜索企业、项目、政策、数据..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              className="w-full"
              style={{ 
                borderRadius: '20px',
              }}
              onSearch={(value) => console.log('搜索:', value)}
            />
          </div>

          {/* 右侧：消息、驾驶舱、用户 */}
          <div className="flex items-center gap-4">
            {/* 消息铃铛 */}
            <Badge count={12} size="small">
              <Button
                type="text"
                icon={<BellOutlined className="text-lg" />}
                className="text-gray-600 hover:text-gray-900"
              />
            </Badge>

            {/* 用户头像下拉 */}
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              placement="bottomRight"
              arrow
            >
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition-colors">
                <Avatar
                  size="default"
                  icon={<UserOutlined />}
                  style={{ background: colorPrimary }}
                />
                <span className="text-gray-700 text-sm font-medium">管理员</span>
                <DownOutlined className="text-gray-400 text-xs" />
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* 内容区域 - 浅灰色背景 */}
        <Content className="bg-gray-50 min-h-[calc(100vh-64px)] overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
