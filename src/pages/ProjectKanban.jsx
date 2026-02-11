import React from 'react';
import {
  Card,
  Avatar,
  Tag,
  Badge,
  Dropdown,
  Button,
  Progress,
  Tooltip,
} from 'antd';
import {
  MoreOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  UserOutlined,
  FilterOutlined,
  SearchOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { projectKanbanMock } from '../mock/projectKanbanMock';

const { kanbanColumns, projectStats } = projectKanbanMock;

/**
 * ProjectKanban - 项目看板页面
 * 横向滚动看板，5个泳道列，项目卡片展示
 */
const ProjectKanban = () => {
  // 列配置
  const columns = [
    { key: 'initial', title: '初步接触', color: '#8c8c8c' },
    { key: 'visit', title: '实地考察', color: '#1677ff' },
    { key: 'negotiate', title: '商务谈判', color: '#faad14' },
    { key: 'signed', title: '正式签约', color: '#52c41a' },
    { key: 'started', title: '落地开工', color: '#722ed1' },
  ];

  // 根据状态获取列配置
  const getColumnConfig = (status) => {
    return columns.find((col) => col.key === status) || columns[0];
  };

  // 更多操作菜单
  const actionMenuItems = [
    { key: 'edit', label: '编辑项目' },
    { key: 'detail', label: '查看详情' },
    { key: 'timeline', label: '时间线' },
    { type: 'divider' },
    { key: 'delete', label: '删除', danger: true },
  ];

  return (
    <div className="h-full flex flex-col -mx-6 -mt-6">
      {/* 页面头部 */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">项目看板</h1>
            <p className="text-gray-500 mt-1">
              管理招商引资项目全生命周期 · 共 {projectStats.total} 个项目
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button icon={<FilterOutlined />}>筛选</Button>
            <Button icon={<SearchOutlined />}>搜索</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              新建项目
            </Button>
          </div>
        </div>

        {/* 统计栏 */}
        <div className="flex items-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <Badge color="#8c8c8c" />
            <span className="text-sm text-gray-600">初步接触</span>
            <span className="text-sm font-semibold text-gray-800">
              {projectStats.initial}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge color="#1677ff" />
            <span className="text-sm text-gray-600">实地考察</span>
            <span className="text-sm font-semibold text-gray-800">
              {projectStats.visit}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge color="#faad14" />
            <span className="text-sm text-gray-600">商务谈判</span>
            <span className="text-sm font-semibold text-gray-800">
              {projectStats.negotiate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge color="#52c41a" />
            <span className="text-sm text-gray-600">正式签约</span>
            <span className="text-sm font-semibold text-gray-800">
              {projectStats.signed}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge color="#722ed1" />
            <span className="text-sm text-gray-600">落地开工</span>
            <span className="text-sm font-semibold text-gray-800">
              {projectStats.started}
            </span>
          </div>
          <div className="flex-1" />
          <div className="text-sm text-gray-500">
            本月新增: <span className="text-green-500 font-semibold">+{projectStats.newThisMonth}</span>
          </div>
        </div>
      </div>

      {/* 看板容器 - 横向滚动 */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-100 p-6">
        <div className="flex gap-5 h-full" style={{ minWidth: 1400 }}>
          {columns.map((column) => {
            const columnProjects = kanbanColumns[column.key] || [];
            return (
              <KanbanColumn
                key={column.key}
                column={column}
                projects={columnProjects}
                actionMenuItems={actionMenuItems}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * 看板列组件
 */
const KanbanColumn = ({ column, projects, actionMenuItems }) => {
  return (
    <div className="flex flex-col w-72 flex-shrink-0">
      {/* 列标题 */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: column.color }}
          />
          <span className="font-semibold text-gray-800">{column.title}</span>
          <Badge
            count={projects.length}
            style={{
              backgroundColor: 'rgba(0,0,0,0.15)',
              color: '#666',
              fontSize: 12,
              fontWeight: 500,
            }}
          />
        </div>
        <Button
          type="text"
          size="small"
          icon={<PlusOutlined className="text-gray-400" />}
          className="hover:bg-gray-200"
        />
      </div>

      {/* 卡片列表区 */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            actionMenuItems={actionMenuItems}
          />
        ))}

        {/* 空状态提示 */}
        {projects.length === 0 && (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <span className="text-gray-400 text-sm">暂无项目</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 项目卡片组件
 */
const ProjectCard = ({ project, actionMenuItems }) => {
  // 滞留天数颜色
  const getStayDaysColor = (days) => {
    if (days >= 30) return '#f5222d';
    if (days >= 15) return '#fa8c16';
    return '#8c8c8c';
  };

  // 投资规模格式化
  const formatInvestment = (amount) => {
    if (amount >= 10) {
      return `¥${amount}亿`;
    }
    return `¥${amount * 10000}万`;
  };

  // 优先级标签颜色
  const priorityColors = {
    high: 'red',
    medium: 'orange',
    low: 'blue',
  };

  return (
    <Card
      className="cursor-move hover:shadow-lg transition-all duration-200 group"
      size="small"
      bodyStyle={{ padding: 12 }}
      style={{
        borderLeft: `3px solid ${project.statusColor}`,
      }}
    >
      {/* 卡片头部：项目名称 + 操作 */}
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-sm leading-tight flex-1 pr-2 line-clamp-2">
          {project.name}
        </h4>
        <Dropdown
          menu={{ items: actionMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button
            type="text"
            size="small"
            icon={<EllipsisOutlined className="text-gray-400" />}
            className="opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-1"
          />
        </Dropdown>
      </div>

      {/* 投资金额 */}
      <div className="flex items-center gap-1 mb-2">
        <DollarOutlined className="text-green-500 text-xs" />
        <span className="text-green-600 font-semibold text-sm">
          {formatInvestment(project.investment)}
        </span>
        <Tag
          size="small"
          color={priorityColors[project.priority]}
          className="ml-2 text-xs"
        >
          {project.priority === 'high' ? '高优' : project.priority === 'medium' ? '中优' : '普通'}
        </Tag>
      </div>

      {/* 行业标签 */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.map((tag) => (
          <Tag key={tag} size="small" className="text-xs">
            {tag}
          </Tag>
        ))}
      </div>

      {/* 进度条 */}
      {project.progress > 0 && (
        <div className="mb-3">
          <Progress
            percent={project.progress}
            size="small"
            strokeColor={project.statusColor}
            showInfo={false}
          />
        </div>
      )}

      {/* 底部：负责人 + 滞留天数 */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Tooltip title={`负责人: ${project.manager.name}`}>
            <Avatar
              size="small"
              src={project.manager.avatar}
              icon={<UserOutlined />}
              style={{ background: project.manager.avatar ? 'transparent' : '#1677ff' }}
            />
          </Tooltip>
          <span className="text-xs text-gray-500">{project.manager.department}</span>
        </div>

        {/* 滞留天数 */}
        <Tooltip title="在当前阶段停留天数">
          <div
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: getStayDaysColor(project.stayDays) }}
          >
            <ClockCircleOutlined />
            <span>已停留{project.stayDays}天</span>
          </div>
        </Tooltip>
      </div>

      {/* 更新提示 */}
      {project.hasUpdate && (
        <div className="mt-2 text-xs text-gray-400">
          更新于 {project.updateTime}
        </div>
      )}
    </Card>
  );
};

export default ProjectKanban;
