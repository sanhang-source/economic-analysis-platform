import React from 'react';
import {
  DashboardOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  BankOutlined,
  LineChartOutlined,
  SettingOutlined,
  AimOutlined,
  ProjectOutlined,
  ShareAltOutlined,
  LinkOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  FileProtectOutlined,
  CalculatorOutlined,
  RadarChartOutlined,
  NodeIndexOutlined,
  SwapOutlined,
} from '@ant-design/icons';

/**
 * Menu Config - 菜单配置
 */

// 侧边栏菜单配置
export const menuConfig = [
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

// 用户下拉菜单配置
export const userMenuConfig = [
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

// 面包屑映射配置
export const breadcrumbMap = {
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
  '/policy': ['政策服务'],
  '/policy/simulation': ['政策服务', '政策试算'],
  '/policy/evaluation': ['政策服务', '政策评估'],
  '/settings': ['系统设置'],
};
