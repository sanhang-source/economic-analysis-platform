import React, { useState, useMemo } from 'react';
import {
  Card,
  Button,
  Select,
  Radio,
  InputNumber,
  Table,
  Tag,
  Divider,
  Typography,
  Space,
  Pagination,
} from 'antd';
import {
  FilterOutlined,
  SearchOutlined,
  DownloadOutlined,
  FileTextOutlined,
  CloseCircleOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * PolicySimulation - 政策试算页面（企业筛选系统）
 * 参考 policy_engine.html 功能重构
 */
const PolicySimulation = () => {
  // 筛选条件状态
  const [filters, setFilters] = useState({
    establishedYear: '5+',
    status: 'active',
    registeredCapitalMin: null,
    registeredCapitalMax: null,
    paidInCapitalMin: null,
    paidInCapitalMax: null,
    capitalBackground: 'private',
    employeeCountMin: null,
    employeeCountMax: null,
    industry: 'tech',
  });

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 模拟企业数据
  const mockEnterpriseData = [
    {
      key: '1',
      name: '腾讯科技（深圳）有限公司',
      industry: '软件和信息技术服务业',
      creditCode: '9144030071526726XG',
      establishedDate: '2000-02-24',
      status: '存续',
      policyCount: 45,
      avatar: '腾',
      avatarColor: 'bg-blue-100 text-blue-600',
    },
    {
      key: '2',
      name: '比亚迪股份有限公司',
      industry: '汽车制造业',
      creditCode: '91440300192317458F',
      establishedDate: '1995-02-10',
      status: '存续',
      policyCount: 62,
      avatar: 'BYD',
      avatarColor: 'bg-gray-100 text-gray-600',
    },
    {
      key: '3',
      name: '深圳市大疆创新科技有限公司',
      industry: '计算机、通信和其他电子设备制造业',
      creditCode: '914403007954257495',
      establishedDate: '2006-11-06',
      status: '存续',
      policyCount: 28,
      avatar: 'DJI',
      avatarColor: 'bg-slate-200 text-slate-700',
    },
    {
      key: '4',
      name: '华为技术有限公司',
      industry: '计算机、通信和其他电子设备制造业',
      creditCode: '914403001922038216',
      establishedDate: '1987-09-15',
      status: '存续',
      policyCount: 89,
      avatar: 'HW',
      avatarColor: 'bg-red-100 text-red-600',
    },
    {
      key: '5',
      name: '顺丰控股股份有限公司',
      industry: '交通运输、仓储和邮政业',
      creditCode: '91440300MA5F11K58Y',
      establishedDate: '2016-12-05',
      status: '存续',
      policyCount: 33,
      avatar: 'SF',
      avatarColor: 'bg-stone-100 text-stone-600',
    },
    {
      key: '6',
      name: '中兴通讯股份有限公司',
      industry: '计算机、通信和其他电子设备制造业',
      creditCode: '91440300192312233X',
      establishedDate: '1997-11-11',
      status: '存续',
      policyCount: 56,
      avatar: '中兴',
      avatarColor: 'bg-blue-50 text-blue-500',
    },
    {
      key: '7',
      name: '迈瑞生物医疗电子股份有限公司',
      industry: '专用设备制造业',
      creditCode: '914403007084411869',
      establishedDate: '1999-01-25',
      status: '存续',
      policyCount: 41,
      avatar: 'MR',
      avatarColor: 'bg-green-100 text-green-600',
    },
    {
      key: '8',
      name: '招商银行股份有限公司',
      industry: '货币金融服务',
      creditCode: '9144030010001686XA',
      establishedDate: '1987-03-31',
      status: '存续',
      policyCount: 72,
      avatar: '招行',
      avatarColor: 'bg-red-50 text-red-500',
    },
    {
      key: '9',
      name: '平安科技（深圳）有限公司',
      industry: '软件和信息技术服务业',
      creditCode: '9144030071526726XG',
      establishedDate: '2008-09-24',
      status: '存续',
      policyCount: 38,
      avatar: 'PA',
      avatarColor: 'bg-orange-100 text-orange-600',
    },
    {
      key: '10',
      name: '深圳市投资控股有限公司',
      industry: '商务服务业',
      creditCode: '9144030071526726XG',
      establishedDate: '2004-10-21',
      status: '存续',
      policyCount: 25,
      avatar: '投控',
      avatarColor: 'bg-purple-100 text-purple-600',
    },
  ];

  // 总匹配数（模拟）
  const totalMatched = 1245;

  // 已选条件标签
  const activeFilters = useMemo(() => {
    const tags = [];
    if (filters.establishedYear) {
      const yearMap = {
        '0-1': '1年以内',
        '1-3': '1-3年',
        '3-5': '3-5年',
        '5+': '5年以上',
      };
      tags.push({ key: 'establishedYear', label: `成立年限：${yearMap[filters.establishedYear]}` });
    }
    if (filters.capitalBackground) {
      const bgMap = {
        state: '国有企业',
        private: '民营企业',
        hkt: '港澳台投资',
        foreign: '外商投资',
      };
      tags.push({ key: 'capitalBackground', label: `背景：${bgMap[filters.capitalBackground]}` });
    }
    if (filters.industry) {
      const industryMap = {
        tech: '信息传输、软件和信息技术服务业',
        make: '制造业',
        finance: '金融业',
        logistics: '交通运输、仓储和邮政业',
      };
      tags.push({ key: 'industry', label: `行业：${industryMap[filters.industry]}` });
    }
    return tags;
  }, [filters]);

  // 移除筛选条件
  const removeFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: key === 'status' ? 'active' : null }));
  };

  // 清空所有筛选
  const clearAllFilters = () => {
    setFilters({
      establishedYear: null,
      status: 'active',
      registeredCapitalMin: null,
      registeredCapitalMax: null,
      paidInCapitalMin: null,
      paidInCapitalMax: null,
      capitalBackground: null,
      employeeCountMin: null,
      employeeCountMax: null,
      industry: null,
    });
  };

  // 执行查询
  const handleSearch = () => {
    setCurrentPage(1);
    // 这里可以调用实际的查询API
  };

  // 表格列定义
  const columns = [
    {
      title: '企业名称 / 行业',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center">
          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${record.avatarColor}`}>
            {record.avatar}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-slate-900">{text}</div>
            <div className="text-xs text-slate-500 mt-0.5">{record.industry}</div>
          </div>
        </div>
      ),
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'creditCode',
      key: 'creditCode',
      render: (text) => <span className="text-sm text-slate-600 font-mono">{text}</span>,
    },
    {
      title: '成立日期',
      dataIndex: 'establishedDate',
      key: 'establishedDate',
      render: (text) => <span className="text-sm text-slate-600">{text}</span>,
    },
    {
      title: '经营状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag color="green" className="rounded-full">
          {text}
        </Tag>
      ),
    },
    {
      title: '历史申请政策数',
      dataIndex: 'policyCount',
      key: 'policyCount',
      align: 'center',
      render: (value) => (
        <span className="inline-flex items-center justify-center h-8 px-3 rounded text-sm font-bold bg-blue-50 text-blue-700 border border-blue-100">
          {value}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'right',
      render: () => (
        <a className="text-blue-600 hover:text-blue-800 text-sm font-medium">查看详情</a>
      ),
    },
  ];

  return (
    <div className="h-full flex -m-6">
      {/* 左侧筛选栏 */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        {/* 筛选标题 */}
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-semibold text-slate-700 flex items-center">
            <FilterOutlined className="mr-2 text-blue-600" />
            企业筛选条件
          </h2>
        </div>

        {/* 筛选表单 */}
        <div className="p-5 space-y-6 flex-1 overflow-y-auto">
          {/* 1. 基础信息 */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              基础信息
            </label>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">成立年限</label>
              <Select
                className="w-full"
                placeholder="全部"
                value={filters.establishedYear}
                onChange={(value) => setFilters((prev) => ({ ...prev, establishedYear: value }))}
              >
                <Option value="">全部</Option>
                <Option value="0-1">1年以内</Option>
                <Option value="1-3">1 - 3 年</Option>
                <Option value="3-5">3 - 5 年</Option>
                <Option value="5+">5 年以上</Option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">经营状态</label>
              <Radio.Group
                value={filters.status}
                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                className="flex space-x-2"
              >
                <Radio.Button value="active" className="text-xs">存续</Radio.Button>
                <Radio.Button value="inactive" className="text-xs">注销</Radio.Button>
                <Radio.Button value="revoked" className="text-xs">吊销</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <Divider className="!my-4" />

          {/* 2. 资本与背景 */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              资本与背景
            </label>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">注册资本 (万元)</label>
              <div className="flex items-center space-x-2">
                <InputNumber
                  className="w-full"
                  placeholder="0"
                  min={0}
                  value={filters.registeredCapitalMin}
                  onChange={(value) => setFilters((prev) => ({ ...prev, registeredCapitalMin: value }))}
                />
                <span className="text-slate-400">-</span>
                <InputNumber
                  className="w-full"
                  placeholder="不限"
                  min={0}
                  value={filters.registeredCapitalMax}
                  onChange={(value) => setFilters((prev) => ({ ...prev, registeredCapitalMax: value }))}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">实缴资本 (万元)</label>
              <div className="flex items-center space-x-2">
                <InputNumber
                  className="w-full"
                  placeholder="0"
                  min={0}
                  value={filters.paidInCapitalMin}
                  onChange={(value) => setFilters((prev) => ({ ...prev, paidInCapitalMin: value }))}
                />
                <span className="text-slate-400">-</span>
                <InputNumber
                  className="w-full"
                  placeholder="不限"
                  min={0}
                  value={filters.paidInCapitalMax}
                  onChange={(value) => setFilters((prev) => ({ ...prev, paidInCapitalMax: value }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">资本背景</label>
              <Select
                className="w-full"
                placeholder="不限"
                value={filters.capitalBackground}
                onChange={(value) => setFilters((prev) => ({ ...prev, capitalBackground: value }))}
              >
                <Option value="">不限</Option>
                <Option value="state">国有企业</Option>
                <Option value="private">民营企业</Option>
                <Option value="hkt">港澳台投资</Option>
                <Option value="foreign">外商投资</Option>
              </Select>
            </div>
          </div>

          <Divider className="!my-4" />

          {/* 3. 规模与行业 */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              规模与行业
            </label>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">社保人数 (人)</label>
              <div className="flex items-center space-x-2">
                <InputNumber
                  className="w-full"
                  placeholder="Min"
                  min={0}
                  value={filters.employeeCountMin}
                  onChange={(value) => setFilters((prev) => ({ ...prev, employeeCountMin: value }))}
                />
                <span className="text-slate-400">-</span>
                <InputNumber
                  className="w-full"
                  placeholder="Max"
                  min={0}
                  value={filters.employeeCountMax}
                  onChange={(value) => setFilters((prev) => ({ ...prev, employeeCountMax: value }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">行业分类</label>
              <Select
                className="w-full"
                placeholder="全部行业"
                value={filters.industry}
                onChange={(value) => setFilters((prev) => ({ ...prev, industry: value }))}
              >
                <Option value="">全部行业</Option>
                <Option value="tech">信息传输、软件和信息技术服务业</Option>
                <Option value="make">制造业</Option>
                <Option value="finance">金融业</Option>
                <Option value="logistics">交通运输、仓储和邮政业</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* 底部查询按钮 */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className="w-full"
            size="large"
            onClick={handleSearch}
          >
            执行查询
          </Button>
        </div>
      </aside>

      {/* 右侧主体内容 */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-100">
        {/* 顶部：已选条件 & 操作栏 */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm space-y-4 shrink-0">
          <div className="flex items-center justify-between">
            {/* 已选条件 */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-1 flex-1">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                已选条件:
              </span>
              <div className="flex space-x-2">
                {activeFilters.map((tag) => (
                  <Tag
                    key={tag.key}
                    color="blue"
                    closable
                    onClose={() => removeFilter(tag.key)}
                    className="px-3 py-1 text-sm"
                  >
                    {tag.label}
                  </Tag>
                ))}
              </div>
              {activeFilters.length > 0 && (
                <Button
                  type="link"
                  size="small"
                  className="text-xs"
                  onClick={clearAllFilters}
                  icon={<CloseCircleOutlined />}
                >
                  清空
                </Button>
              )}
            </div>

            {/* 匹配数量 */}
            <div className="text-right whitespace-nowrap pl-4">
              <span className="text-sm text-slate-500">当前匹配企业：</span>
              <span className="text-2xl font-bold text-blue-600">{totalMatched.toLocaleString()}</span>
              <span className="text-sm text-slate-500"> 家</span>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <Button icon={<DownloadOutlined />}>导出企业清单</Button>
            <Button type="primary" icon={<FileTextOutlined />} className="bg-indigo-600 hover:bg-indigo-700">
              生成政策制定报告
            </Button>
          </div>
        </div>

        {/* 企业列表区域 */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white shadow-sm rounded-lg border border-slate-200 flex flex-col">
            <Table
              columns={columns}
              dataSource={mockEnterpriseData}
              pagination={false}
              rowClassName="hover:bg-slate-50"
            />

            {/* 分页 */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="text-sm text-slate-500">
                显示 <span className="font-medium text-slate-900">{(currentPage - 1) * pageSize + 1}</span> 到{' '}
                <span className="font-medium text-slate-900">{Math.min(currentPage * pageSize, totalMatched)}</span>{' '}
                条，共 <span className="font-medium text-slate-900">{totalMatched.toLocaleString()}</span> 条
              </div>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalMatched}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                showSizeChanger
                showQuickJumper
                pageSizeOptions={['10', '20', '50', '100']}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolicySimulation;
