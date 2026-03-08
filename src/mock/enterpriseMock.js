/**
 * Enterprise Mock Data - 企业清单模拟数据
 * 包含真实的深圳企业和全国企业，支持多产业关联
 */

// 行政区划代码（前6位）：440300=深圳，310000=上海，110000=北京，330100=杭州，320500=苏州
const areaCodes = {
  shenzhen: '440300',
  shanghai: '310000',
  beijing: '110000',
  hangzhou: '330100',
  suzhou: '320500',
  chengdu: '510100',
  wuhan: '420100',
  xian: '610100'
};

// 20家模拟企业数据
export const enterprises = [
  {
    id: 'ent-001',
    name: '华为技术有限公司',
    creditCode: '914403001923832123',
    establishDate: '1987-09-15',
    registeredCapital: '4034113.182万人民币',
    address: '深圳市龙岗区坂田华为基地',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '网络与通信', segment: '通信设备', subSegment: '基站设备', product: '5G基站' },
      { chain: '网络与通信', segment: '终端设备', subSegment: '智能手机', product: null },
      { chain: '半导体与集成电路', segment: '芯片设计', subSegment: '数字芯片', product: 'SoC' }
    ]
  },
  {
    id: 'ent-002',
    name: '腾讯科技（深圳）有限公司',
    creditCode: '91440300708461136T',
    establishDate: '1998-11-11',
    registeredCapital: '2000000万人民币',
    address: '深圳市南山区高新区科技中一路腾讯大厦35层',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '软件与信息服务', segment: '互联网服务', subSegment: '数字内容', product: '游戏' },
      { chain: '软件与信息服务', segment: '云计算', subSegment: 'PaaS', product: null },
      { chain: '软件与信息服务', segment: '人工智能', subSegment: 'AI应用', product: '智慧城市' }
    ]
  },
  {
    id: 'ent-003',
    name: '中兴通讯股份有限公司',
    creditCode: '91440300192383123W',
    establishDate: '1997-11-18',
    registeredCapital: '461303.4254万人民币',
    address: '深圳市南山区高新技术产业园科技南路中兴通讯大厦',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '网络与通信', segment: '通信设备', subSegment: '基站设备', product: '5G基站' },
      { chain: '网络与通信', segment: '终端设备', subSegment: '智能手机', product: null },
      { chain: '半导体与集成电路', segment: '芯片设计', subSegment: '数字芯片', product: null }
    ]
  },
  {
    id: 'ent-004',
    name: '比亚迪股份有限公司',
    creditCode: '914403001923832456',
    establishDate: '1995-02-10',
    registeredCapital: '291114.2855万人民币',
    address: '深圳市大鹏新区葵涌街道延安路一号',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '新能源汽车', segment: '整车制造', subSegment: '乘用车', product: '纯电动汽车' },
      { chain: '新能源汽车', segment: '动力电池', subSegment: '电池系统', product: '磷酸铁锂电池' },
      { chain: '半导体与集成电路', segment: '芯片设计', subSegment: '数字芯片', product: 'MCU' }
    ]
  },
  {
    id: 'ent-005',
    name: '大疆创新科技有限公司',
    creditCode: '91440300790459123Y',
    establishDate: '2006-11-06',
    registeredCapital: '3000万人民币',
    address: '深圳市南山区西丽街道仙茶路1号大疆天空之城',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '智能机器人', segment: '无人机', subSegment: '消费级无人机', product: '航拍无人机' },
      { chain: '智能机器人', segment: '无人机', subSegment: '行业级无人机', product: '农业植保机' },
      { chain: '网络与通信', segment: '终端设备', subSegment: 'IoT终端', product: '智能穿戴' }
    ]
  },
  {
    id: 'ent-006',
    name: '中芯国际集成电路制造有限公司',
    creditCode: '913100007109123456',
    establishDate: '2000-04-03',
    registeredCapital: '768000万美元',
    address: '上海市浦东新区张江路18号',
    areaCode: areaCodes.shanghai,
    isShenzhen: false,
    belongsTo: [
      { chain: '半导体与集成电路', segment: '晶圆制造', subSegment: '逻辑代工', product: '先进制程(<28nm)' },
      { chain: '半导体与集成电路', segment: '晶圆制造', subSegment: '特色工艺', product: '功率器件' },
      { chain: '半导体与集成电路', segment: '晶圆制造', subSegment: '封测服务', product: null }
    ]
  },
  {
    id: 'ent-007',
    name: '阿里巴巴集团控股有限公司',
    creditCode: '913301007996123456',
    establishDate: '1999-09-09',
    registeredCapital: '100000万美元',
    address: '浙江省杭州市余杭区五常街道文一西路969号',
    areaCode: areaCodes.hangzhou,
    isShenzhen: false,
    belongsTo: [
      { chain: '软件与信息服务', segment: '互联网服务', subSegment: '电商平台', product: '综合电商' },
      { chain: '软件与信息服务', segment: '云计算', subSegment: 'IaaS', product: '云服务器' },
      { chain: '软件与信息服务', segment: '人工智能', subSegment: 'AI应用', product: '智能金融' }
    ]
  },
  {
    id: 'ent-008',
    name: '京东方科技集团股份有限公司',
    creditCode: '911100001011123456',
    establishDate: '1993-04-09',
    registeredCapital: '384596.3061万人民币',
    address: '北京市朝阳区酒仙桥路10号',
    areaCode: areaCodes.beijing,
    isShenzhen: false,
    belongsTo: [
      { chain: '超高清视频显示', segment: '面板制造', subSegment: 'LCD面板', product: '大尺寸面板' },
      { chain: '超高清视频显示', segment: '面板制造', subSegment: 'OLED面板', product: '柔性OLED' },
      { chain: '半导体与集成电路', segment: '芯片设计', subSegment: '数字芯片', product: '显示驱动芯片' }
    ]
  },
  {
    id: 'ent-009',
    name: '迈瑞生物医疗电子股份有限公司',
    creditCode: '91440300708489123U',
    establishDate: '1999-01-25',
    registeredCapital: '121569.1528万人民币',
    address: '深圳市南山区高新技术产业园区科技南十二路迈瑞大厦',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '生物医药', segment: '医疗器械', subSegment: '诊断设备', product: '医学影像设备' },
      { chain: '生物医药', segment: '医疗器械', subSegment: '治疗设备', product: '监护设备' },
      { chain: '网络与通信', segment: '终端设备', subSegment: 'IoT终端', product: '智能穿戴' }
    ]
  },
  {
    id: 'ent-010',
    name: '顺丰控股股份有限公司',
    creditCode: '914403001923234567',
    establishDate: '1993-03-26',
    registeredCapital: '490520.1103万人民币',
    address: '深圳市福田区华富街道莲花一村社区皇岗路5001号深业上城',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '现代物流', segment: '快递物流', subSegment: '时效快递', product: null },
      { chain: '现代物流', segment: '供应链物流', subSegment: '冷链物流', product: null },
      { chain: '软件与信息服务', segment: '互联网服务', subSegment: '生活服务', product: '本地生活' }
    ]
  },
  {
    id: 'ent-011',
    name: '立讯精密工业股份有限公司',
    creditCode: '91440300723089123L',
    establishDate: '2004-05-24',
    registeredCapital: '711825.3201万人民币',
    address: '深圳市宝安区沙井街道蚝四西部工业区',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '网络与通信', segment: '终端设备', subSegment: '智能手机', product: null },
      { chain: '网络与通信', segment: '终端设备', subSegment: 'IoT终端', product: '智能穿戴' },
      { chain: '新能源汽车', segment: '汽车电子', subSegment: '车载电子', product: '车载显示屏' }
    ]
  },
  {
    id: 'ent-012',
    name: '中国平安保险（集团）股份有限公司',
    creditCode: '914403001923345678',
    establishDate: '1988-03-21',
    registeredCapital: '1828024.141万人民币',
    address: '深圳市福田区益田路5033号平安金融中心',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '金融科技', segment: '保险科技', subSegment: '人寿保险', product: null },
      { chain: '金融科技', segment: '保险科技', subSegment: '财产保险', product: null },
      { chain: '软件与信息服务', segment: '互联网服务', subSegment: '生活服务', product: '金融科技' }
    ]
  },
  {
    id: 'ent-013',
    name: '北方华创科技集团股份有限公司',
    creditCode: '911100007448123456',
    establishDate: '2001-09-28',
    registeredCapital: '52987.1815万人民币',
    address: '北京市朝阳区酒仙桥东路1号院6号楼',
    areaCode: areaCodes.beijing,
    isShenzhen: false,
    belongsTo: [
      { chain: '半导体与集成电路', segment: '半导体设备', subSegment: '晶圆制造设备', product: '刻蚀设备' },
      { chain: '半导体与集成电路', segment: '半导体设备', subSegment: '封装测试设备', product: null },
      { chain: '半导体与集成电路', segment: '半导体材料', subSegment: '晶圆材料', product: null }
    ]
  },
  {
    id: 'ent-014',
    name: '海康威视数字技术股份有限公司',
    creditCode: '913301007602123456',
    establishDate: '2001-11-30',
    registeredCapital: '933582.067万人民币',
    address: '浙江省杭州市滨江区阡陌路555号',
    areaCode: areaCodes.hangzhou,
    isShenzhen: false,
    belongsTo: [
      { chain: '网络与通信', segment: '终端设备', subSegment: 'IoT终端', product: '智能安防' },
      { chain: '智能机器人', segment: '无人机', subSegment: '行业级无人机', product: null },
      { chain: '软件与信息服务', segment: '人工智能', subSegment: 'AI应用', product: '智慧城市' }
    ]
  },
  {
    id: 'ent-015',
    name: '大族激光科技产业集团股份有限公司',
    creditCode: '91440300708489123D',
    establishDate: '1999-03-04',
    registeredCapital: '105173.354万人民币',
    address: '深圳市南山区深南大道9988号大族科技中心大厦',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '高端装备制造', segment: '激光装备', subSegment: '激光切割', product: null },
      { chain: '半导体与集成电路', segment: '半导体设备', subSegment: '晶圆制造设备', product: '激光刻蚀' },
      { chain: '新能源汽车', segment: '动力电池', subSegment: '电池设备', product: null }
    ]
  },
  {
    id: 'ent-016',
    name: '长电科技股份有限公司',
    creditCode: '913202007205123456',
    establishDate: '1998-11-06',
    registeredCapital: '177955.3万人民币',
    address: '江苏省江阴市澄江镇长山路78号',
    areaCode: areaCodes.suzhou,
    isShenzhen: false,
    belongsTo: [
      { chain: '半导体与集成电路', segment: '晶圆制造', subSegment: '封测服务', product: '先进封装' },
      { chain: '半导体与集成电路', segment: '半导体材料', subSegment: '封装材料', product: null },
      { chain: '半导体与集成电路', segment: '半导体设备', subSegment: '封装测试设备', product: null }
    ]
  },
  {
    id: 'ent-017',
    name: '汇川技术股份有限公司',
    creditCode: '914403007412123456',
    establishDate: '2003-04-10',
    registeredCapital: '263609.822万人民币',
    address: '深圳市宝安区新安街道留仙二路鸿辉工业园',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '高端装备制造', segment: '工业自动化', subSegment: '变频器', product: null },
      { chain: '新能源汽车', segment: '汽车电子', subSegment: '电机电控', product: null },
      { chain: '半导体与集成电路', segment: '芯片设计', subSegment: '模拟芯片', product: '电源管理' }
    ]
  },
  {
    id: 'ent-018',
    name: '科大讯飞股份有限公司',
    creditCode: '913400007117123456',
    establishDate: '1999-12-30',
    registeredCapital: '232440.4545万人民币',
    address: '安徽省合肥市高新区望江西路666号',
    areaCode: '340100',
    isShenzhen: false,
    belongsTo: [
      { chain: '软件与信息服务', segment: '人工智能', subSegment: '算法框架', product: '智能语音' },
      { chain: '软件与信息服务', segment: '人工智能', subSegment: 'AI应用', product: '智慧教育' },
      { chain: '网络与通信', segment: '终端设备', subSegment: 'IoT终端', product: '智能家居' }
    ]
  },
  {
    id: 'ent-019',
    name: '招商银行股份有限公司',
    creditCode: '914403001923456789',
    establishDate: '1987-03-31',
    registeredCapital: '2521984.5601万人民币',
    address: '深圳市福田区深南大道7088号招商银行大厦',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '金融科技', segment: '银行科技', subSegment: '商业银行', product: null },
      { chain: '金融科技', segment: '金融科技', subSegment: '数字支付', product: null },
      { chain: '软件与信息服务', segment: '互联网服务', subSegment: '生活服务', product: '金融科技' }
    ]
  },
  {
    id: 'ent-020',
    name: '华大基因股份有限公司',
    creditCode: '914403007556123456',
    establishDate: '2010-07-09',
    registeredCapital: '41433.1234万人民币',
    address: '深圳市盐田区北山工业区综合楼',
    areaCode: areaCodes.shenzhen,
    isShenzhen: true,
    belongsTo: [
      { chain: '生物医药', segment: '基因检测', subSegment: '基因测序', product: null },
      { chain: '生物医药', segment: '医疗器械', subSegment: '诊断设备', product: '基因测序仪' },
      { chain: '软件与信息服务', segment: '人工智能', subSegment: 'AI应用', product: '智能医疗' }
    ]
  }
];

// 根据节点路径筛选企业
export const filterEnterprisesByNode = (nodePath) => {
  return enterprises.filter(ent => {
    return ent.belongsTo.some(belong => {
      // 逐级匹配
      if (nodePath.chain && belong.chain !== nodePath.chain) return false;
      if (nodePath.segment && belong.segment !== nodePath.segment) return false;
      if (nodePath.subSegment && belong.subSegment !== nodePath.subSegment) return false;
      if (nodePath.product && belong.product !== nodePath.product) return false;
      return true;
    });
  });
};

// 按区域筛选企业
export const filterEnterprisesByArea = (enterprises, areaType) => {
  if (areaType === 'all') return enterprises;
  if (areaType === 'shenzhen') return enterprises.filter(e => e.isShenzhen);
  if (areaType === 'other') return enterprises.filter(e => !e.isShenzhen);
  return enterprises;
};

// 获取企业所属的产业路径（用于列表展示）
export const getEnterpriseNodePaths = (enterprise, currentNodeName) => {
  // 找到与当前节点匹配的路径
  return enterprise.belongsTo.filter(belong => {
    return Object.values(belong).includes(currentNodeName);
  });
};
