import React, { useState, useMemo } from 'react';
import {
  Layout,
  Menu,
  Button,
  Breadcrumb,
  Dropdown,
  theme,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  DownOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { menuConfig, userMenuConfig, breadcrumbMap } from '../../config/menu.jsx';

const { Header, Sider, Content } = Layout;

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

  // 处理用户菜单点击
  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      navigate('/login');
    }
  };

  // 获取当前面包屑 - 使用 useMemo 缓存
  const breadcrumbs = useMemo(() => {
    // 尝试精确匹配
    let paths = breadcrumbMap[location.pathname];
    // 如果没有精确匹配，尝试前缀匹配（用于详情页）
    // 按路径长度降序排序，确保最长的匹配优先
    if (!paths) {
      const sortedEntries = Object.entries(breadcrumbMap).sort(
        (a, b) => b[0].length - a[0].length
      );
      for (const [key, value] of sortedEntries) {
        if (location.pathname.startsWith(key)) {
          paths = value;
          break;
        }
      }
    }
    paths = paths || ['工作台'];
    return paths.map((path, index) => ({
      title: path,
      key: index,
    }));
  }, [location.pathname]);

  // 检测是否在供应链分析详情页
  const isSupplyChainDetail = location.pathname.includes('/industry/trade/detail/');
  const handleBackToList = () => {
    navigate('/industry/trade');
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
          selectedKeys={(() => {
            // 处理详情页菜单选中 - 供应链生态（产业详情页和企业详情页都选中供应链生态）
            if (location.pathname.startsWith('/industry/trade')) {
              return ['/industry/642-nav'];
            }
            // 处理详情页菜单选中 - 集团系挖潜
            if (location.pathname.startsWith('/industry/capital/detail/')) {
              return ['/industry/capital'];
            }
            return [location.pathname];
          })()}
          openKeys={collapsed ? [] : undefined}
          items={menuConfig}
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
            <Breadcrumb items={breadcrumbs} />
          </div>

          {/* 右侧：消息、驾驶舱、用户 */}
          <div className="flex items-center gap-4">
            {/* 消息铃铛 */}
            <Button
              type="text"
              icon={<BellOutlined className="text-lg" />}
              className="text-gray-600 hover:text-gray-900"
            />

            {/* 用户头像下拉 */}
            <Dropdown
              menu={{ items: userMenuConfig, onClick: handleUserMenuClick }}
              placement="bottomRight"
              arrow
            >
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition-colors">
                <UserOutlined
                  style={{ 
                    fontSize: 20, 
                    color: colorPrimary,
                    background: `${colorPrimary}15`,
                    padding: 4,
                    borderRadius: '50%'
                  }}
                />
                <span className="text-gray-700 text-sm font-medium">管理员</span>
                <DownOutlined className="text-gray-400 text-xs" />
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* 内容区域 - 浅灰色背景 */}
        <Content className="bg-gray-50 flex-1">
          <div className="p-4">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
