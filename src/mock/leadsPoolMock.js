/**
 * LeadsPool Mock Data - 线索公海模拟数据
 */

// 线索数据
export const leads = [
  {
    id: 1,
    name: '某新能源动力电池生产基地项目',
    description: '计划在华南建设年产20GWh动力电池工厂，意向投资50亿元',
    source: '展会',
    sourceKey: 'exhibition',
    contact: {
      name: '张明华',
      position: '投资总监',
      phone: '138****8888',
      email: 'zhangmh@example.com',
    },
    investment: 50,
    createTime: '2026-02-10 09:30',
    status: '待分配',
    statusKey: 'new',
  },
  {
    id: 2,
    name: '深圳华大基因区域总部',
    description: '设立华大基因华南区域总部及研发中心',
    source: '转介绍',
    sourceKey: 'referral',
    contact: {
      name: '李博士',
      position: '战略发展部总经理',
      phone: '139****6666',
      email: 'li.dr@example.com',
    },
    investment: 12,
    createTime: '2026-02-09 16:45',
    status: '待跟进',
    statusKey: 'following',
  },
  {
    id: 3,
    name: '某独角兽企业华南数据中心',
    description: '互联网头部企业计划建设华南区域数据中心',
    source: '官网',
    sourceKey: 'website',
    contact: {
      name: '王经理',
      position: '基建部负责人',
      phone: '137****9999',
      email: 'wang.j@example.com',
    },
    investment: 35,
    createTime: '2026-02-08 11:20',
    status: '待分配',
    statusKey: 'new',
  },
  {
    id: 4,
    name: '德国某精密制造企业中国总部',
    description: '德国隐形冠军企业计划设立中国总部及生产基地',
    source: '上门拜访',
    sourceKey: 'visit',
    contact: {
      name: 'Schmidt',
      position: '亚太区总裁',
      phone: '136****7777',
      email: 'schmidt@example.de',
    },
    investment: 8,
    createTime: '2026-02-07 14:30',
    status: '跟进中',
    statusKey: 'following',
  },
  {
    id: 5,
    name: '某人工智能芯片设计公司',
    description: '清华系AI芯片创业团队，已完成B轮融资',
    source: '合作伙伴',
    sourceKey: 'partner',
    contact: {
      name: '陈博士',
      position: 'CEO',
      phone: '135****5555',
      email: 'chen.ceo@example.com',
    },
    investment: 5,
    createTime: '2026-02-06 10:15',
    status: '已搁置',
    statusKey: 'pending',
  },
  {
    id: 6,
    name: '某香港高校科研成果转化项目',
    description: '香港中文大学新材料专利技术产业化',
    source: '电话咨询',
    sourceKey: 'phone',
    contact: {
      name: '刘教授',
      position: '技术转移办公室主任',
      phone: '852****1234',
      email: 'liu.prof@example.hk',
    },
    investment: 3,
    createTime: '2026-02-05 16:00',
    status: '待分配',
    statusKey: 'new',
  },
  {
    id: 7,
    name: '某跨境电商平台华南运营中心',
    description: '跨境电商头部企业计划设立华南运营总部',
    source: '社交媒体',
    sourceKey: 'social',
    contact: {
      name: '赵总监',
      position: '政府事务总监',
      phone: '134****4444',
      email: 'zhao@example.com',
    },
    investment: 15,
    createTime: '2026-02-04 09:00',
    status: '待跟进',
    statusKey: 'following',
  },
  {
    id: 8,
    name: '某智能驾驶解决方案提供商',
    description: '自动驾驶算法公司，计划建设测试基地',
    source: '邮件咨询',
    sourceKey: 'email',
    contact: {
      name: '孙工',
      position: '项目经理',
      phone: '133****3333',
      email: 'sun.pm@example.com',
    },
    investment: 6,
    createTime: '2026-02-03 15:45',
    status: '待分配',
    statusKey: 'new',
  },
];

// 统计数据
export const statistics = {
  total: 156,
  new: 45,
  following: 78,
  pending: 33,
};

// 汇总导出
export const leadsPoolMock = {
  leads,
  statistics,
};

export default leadsPoolMock;
