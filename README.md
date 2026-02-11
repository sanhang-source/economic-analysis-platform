# 产业大脑 SaaS 平台

面向政府（G端）的产业大脑 SaaS 平台，用于招商引资、企业管理和经济监测。

## 技术栈

- **前端框架**: React 18 (Functional Components + Hooks)
- **UI 组件库**: Ant Design v5
- **图表库**: ECharts
- **样式方案**: TailwindCSS
- **图标库**: Ant Design Icons + Lucide React
- **构建工具**: Vite
- **路由**: React Router v6

## 项目结构

```
├── index.html              # HTML 入口
├── package.json            # 项目依赖
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # TailwindCSS 配置
├── postcss.config.js       # PostCSS 配置
├── src/
│   ├── main.jsx           # 应用入口
│   ├── App.jsx            # 根组件（路由配置）
│   ├── index.css          # 全局样式
│   ├── components/        # 组件目录
│   │   └── layout/        # 布局组件
│   │       ├── MainLayout.jsx   # 主布局组件 ⭐
│   │       └── index.js         # 组件导出
│   ├── pages/             # 页面目录
│   │   └── Dashboard.jsx  # 工作台首页
│   └── mock/              # Mock 数据
│       └── dashboardMock.js     # 工作台模拟数据
```

## MainLayout 组件说明

### 特性

1. **左侧侧边栏 (Sider)**
   - 深色主题 (#001529)
   - 宽度 250px，可收缩至 80px
   - Logo 区域显示「产业大脑 SaaS」
   - 完整的菜单结构，支持子菜单

2. **顶部通栏 (Header)**
   - 白色背景，带阴影
   - 面包屑导航（自动根据路由生成）
   - 全局搜索框
   - 消息铃铛（Badge 提示）
   - 「进入驾驶舱」主色按钮
   - 用户头像下拉菜单

3. **内容区域 (Content)**
   - 浅灰色背景 (#f5f5f5)
   - 通过 `<Outlet />` 渲染子页面
   - 自动适配侧边栏收缩状态

### 菜单结构

```
工作台 (Dashboard)
招商引资
├── 招商地图
├── 线索公海
└── 项目看板
产业大脑
├── 产业链图谱
└── 强链补链
企业档案
├── 企业名录
└── 一企一档
经济运行
├── 经济监测
└── 报表填报
系统设置
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 构建生产版本

```bash
npm run build
```

## 使用 MainLayout

```jsx
import { MainLayout } from './components/layout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="investment/map" element={<InvestmentMap />} />
        {/* 更多子路由... */}
      </Route>
    </Routes>
  );
}
```

## 设计规范

| 项目 | 值 |
|------|-----|
| 主色调 | #1677ff (科技蓝) |
| 背景色 | #f5f5f5 |
| 卡片背景 | #ffffff |
| 侧边栏宽度 | 250px |
| 侧边栏收缩宽度 | 80px |
| 顶部高度 | 64px |
| 圆角 | 6px |

## 许可证

MIT
