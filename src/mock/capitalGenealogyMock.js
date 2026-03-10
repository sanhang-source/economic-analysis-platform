/**
 * 企业族群页面mock数据
 * 基于深圳真实企业信息
 */

// 集团系数据 - 深圳本地知名集团
export const groupList = [
  { 
    id: '1', 
    name: '腾讯系', 
    coreCompany: '腾讯控股有限公司', 
    count: 156, 
    shenzhenCount: 68,
    totalCapital: '850亿', 
    owner: '马化腾', 
    color: '#1677ff',
    coreInfo: {
      foundedDate: '1998-11-11',
      registeredCapital: '1000万港元',
      creditCode: '91440300708486197T',
      employees: '约10万人',
      industries: ['互联网', '游戏', '金融科技', '云计算'],
      address: '深圳市南山区海天二路33号腾讯滨海大厦',
      email: 'contact@tencent.com',
    }
  },
  { 
    id: '2', 
    name: '华为系', 
    coreCompany: '华为投资控股有限公司', 
    count: 142, 
    shenzhenCount: 85,
    totalCapital: '1200亿', 
    owner: '任正非', 
    color: '#fa541c',
    coreInfo: {
      foundedDate: '1987-09-15',
      registeredCapital: '340.5亿人民币',
      creditCode: '91440300192378788X',
      employees: '约19.5万人',
      industries: ['通信设备', '消费电子', '云计算', '芯片'],
      address: '深圳市龙岗区坂田华为基地',
      email: 'contact@huawei.com',
    }
  },
  { 
    id: '3', 
    name: '平安系', 
    coreCompany: '中国平安保险（集团）股份有限公司', 
    count: 128, 
    shenzhenCount: 72,
    totalCapital: '2800亿', 
    owner: '马明哲', 
    color: '#fa8c16',
    coreInfo: {
      foundedDate: '1988-03-21',
      registeredCapital: '182.8亿人民币',
      creditCode: '91440300192350207W',
      employees: '约28万人',
      industries: ['保险', '银行', '投资', '医疗'],
      address: '深圳市福田区益田路5033号平安金融中心',
      email: 'contact@pingan.com.cn',
    }
  },
  { 
    id: '4', 
    name: '比亚迪系', 
    coreCompany: '比亚迪股份有限公司', 
    count: 98, 
    shenzhenCount: 45,
    totalCapital: '580亿', 
    owner: '王传福', 
    color: '#722ed1',
    coreInfo: {
      foundedDate: '1995-02-10',
      registeredCapital: '29.1亿人民币',
      creditCode: '91440300192345815X',
      employees: '约60万人',
      industries: ['新能源汽车', '电池', '电子', '轨道交通'],
      address: '深圳市坪山区比亚迪路3009号',
      email: 'contact@byd.com',
    }
  },
  { 
    id: '5', 
    name: '万科系', 
    coreCompany: '万科企业股份有限公司', 
    count: 86, 
    shenzhenCount: 38,
    totalCapital: '420亿', 
    owner: '郁亮', 
    color: '#52c41a',
    coreInfo: {
      foundedDate: '1984-05-30',
      registeredCapital: '116.3亿人民币',
      creditCode: '91440300192184756X',
      employees: '约8万人',
      industries: ['房地产开发', '物业服务', '物流仓储', '商业运营'],
      address: '深圳市盐田区大梅沙环梅路33号万科中心',
      email: 'contact@vanke.com',
    }
  },
  { 
    id: '6', 
    name: '招商系', 
    coreCompany: '招商局集团有限公司', 
    count: 78, 
    shenzhenCount: 52,
    totalCapital: '1800亿', 
    owner: '缪建民', 
    color: '#13c2c2',
    coreInfo: {
      foundedDate: '1872-12-26',
      registeredCapital: '169亿人民币',
      employees: '约25万人',
      industries: ['综合金融', '地产开发', '港口运营', '航运物流'],
      address: '深圳市南山区蛇口兴华路6号南海意库',
      email: 'contact@cmhk.com',
    }
  },
  { 
    id: '7', 
    name: '顺丰系', 
    coreCompany: '顺丰控股股份有限公司', 
    count: 68, 
    shenzhenCount: 42,
    totalCapital: '320亿', 
    owner: '王卫', 
    color: '#f5222d',
    coreInfo: {
      foundedDate: '1993-03-26',
      registeredCapital: '49亿人民币',
      employees: '约50万人',
      industries: ['快递物流', '供应链', '航空', '科技'],
      address: '深圳市福田区益田路6009号',
      email: 'contact@sf-express.com',
    }
  },
  { 
    id: '8', 
    name: '中兴系', 
    coreCompany: '中兴通讯股份有限公司', 
    count: 52, 
    shenzhenCount: 28,
    totalCapital: '280亿', 
    owner: '李自学', 
    color: '#1890ff',
    coreInfo: {
      foundedDate: '1985-02-07',
      registeredCapital: '46.9亿人民币',
      employees: '约7.4万人',
      industries: ['通信设备', '5G', '芯片', '智能终端'],
      address: '深圳市南山区高新技术产业园',
      email: 'contact@zte.com.cn',
    }
  },
  { 
    id: '9', 
    name: '大疆系', 
    coreCompany: '深圳市大疆创新科技有限公司', 
    count: 35, 
    shenzhenCount: 24, 
    color: '#2f4554',
    coreInfo: {
      foundedDate: '2006-11-06',
      registeredCapital: '3000万人民币',
      employees: '约1.4万人',
      industries: ['无人机', '影像系统', '机器人', '教育'],
      address: '深圳市南山区西丽街道仙茶路',
      email: 'contact@dji.com',
    }
  },
  { 
    id: '10', 
    name: '迈瑞系', 
    coreCompany: '深圳迈瑞生物医疗电子股份有限公司', 
    count: 28, 
    shenzhenCount: 18,
    totalCapital: '150亿', 
    owner: '李西廷', 
    color: '#eb2f96',
    coreInfo: {
      foundedDate: '1991-10-05',
      registeredCapital: '12.1亿人民币',
      employees: '约1.8万人',
      industries: ['医疗器械', 'IVD', '医学影像', '生命信息'],
      address: '深圳市南山区高新技术产业园',
      email: 'contact@mindray.com',
    }
  },
  { 
    id: '11', 
    name: '正威系', 
    coreCompany: '正威国际集团有限公司', 
    count: 42, 
    shenzhenCount: 15,
    totalCapital: '380亿', 
    owner: '王文银', 
    color: '#faad14',
    coreInfo: {
      foundedDate: '1999-06-28',
      registeredCapital: '50亿人民币',
      employees: '约2万人',
      industries: ['有色金属', '新材料', '半导体', '产业投资'],
      address: '深圳市福田区深南大道7888号东海国际中心',
      email: 'contact@amer.com.cn',
    }
  },
  { 
    id: '12', 
    name: '立讯系', 
    coreCompany: '立讯精密工业股份有限公司', 
    count: 38, 
    shenzhenCount: 12,
    totalCapital: '220亿', 
    owner: '王来春', 
    color: '#13c2c2',
    coreInfo: {
      foundedDate: '2004-05-24',
      registeredCapital: '71.2亿人民币',
      employees: '约23万人',
      industries: ['消费电子', '汽车电子', '通信设备', '精密制造'],
      address: '深圳市宝安区沙井街道蚝四西部工业区',
      email: 'contact@luxshare-ict.com',
    }
  },
];

// 上市系数据 - 深圳A股/港股上市公司
export const listedList = [
  { 
    id: 'l1', 
    name: '工业富联系', 
    coreCompany: '富士康工业互联网股份有限公司', 
    count: 45, 
    shenzhenCount: 28,
    totalCapital: '520亿', 
    owner: '李军旗', 
    color: '#1677ff',
    coreInfo: {
      foundedDate: '2015-03-06',
      registeredCapital: '198.7亿人民币',
      employees: '约19万人',
      industries: ['工业互联网', '智能制造', '云计算', '5G设备'],
      address: '深圳市龙华区龙华街道东环二路2号',
      email: 'contact@fii-foxconn.com',
    }
  },
  { 
    id: 'l2', 
    name: '招商银行系', 
    coreCompany: '招商银行股份有限公司', 
    count: 38, 
    shenzhenCount: 22,
    totalCapital: '890亿', 
    owner: '缪建民', 
    color: '#fa8c16',
    coreInfo: {
      foundedDate: '1987-04-08',
      registeredCapital: '252.2亿人民币',
      employees: '约11万人',
      industries: ['零售银行', '公司金融', '投行', '资产管理'],
      address: '深圳市福田区深南大道7088号招商银行大厦',
      email: 'contact@cmbchina.com',
    }
  },
  { 
    id: 'l3', 
    name: '金地系', 
    coreCompany: '金地（集团）股份有限公司', 
    count: 32, 
    shenzhenCount: 18,
    totalCapital: '280亿', 
    owner: '凌克', 
    color: '#52c41a',
    coreInfo: {
      foundedDate: '1988-01-20',
      registeredCapital: '45.1亿人民币',
      employees: '约1.5万人',
      industries: ['房地产开发', '物业管理', '商业地产', '产业地产'],
      address: '深圳市福田区福田街道岗厦社区深南大道2007号',
      email: 'contact@gemdale.com',
    }
  },
  { 
    id: 'l4', 
    name: '中集系', 
    coreCompany: '中国国际海运集装箱（集团）股份有限公司', 
    count: 58, 
    shenzhenCount: 35,
    totalCapital: '380亿', 
    owner: '麦伯良', 
    color: '#722ed1',
    coreInfo: {
      foundedDate: '1980-01-14',
      registeredCapital: '53.9亿人民币',
      employees: '约6万人',
      industries: ['集装箱', '道路运输车辆', '能源装备', '海洋工程'],
      address: '深圳市南山区蛇口工业区港湾大道2号',
      email: 'contact@cimc.com',
    }
  },
  { 
    id: 'l5', 
    name: '深高速系', 
    coreCompany: '深圳高速公路集团股份有限公司', 
    count: 18, 
    shenzhenCount: 15,
    totalCapital: '120亿', 
    owner: '廖湘文', 
    color: '#fa541c',
    coreInfo: {
      foundedDate: '1996-12-30',
      registeredCapital: '21.8亿人民币',
      employees: '约6000人',
      industries: ['高速公路', '城市基础设施', '清洁能源', '环保'],
      address: '深圳市龙华区益田路6009号新世界商务中心',
      email: 'contact@sz-expressway.com',
    }
  },
  { 
    id: 'l6', 
    name: '深信服系', 
    coreCompany: '深信服科技股份有限公司', 
    count: 24, 
    shenzhenCount: 18,
    totalCapital: '95亿', 
    owner: '何朝曦', 
    color: '#1890ff',
    coreInfo: {
      foundedDate: '2000-12-25',
      registeredCapital: '4.2亿人民币',
      employees: '约9000人',
      industries: ['网络安全', '云计算', '基础架构', 'AI'],
      address: '深圳市南山区学苑大道1001号南山智园',
      email: 'contact@sangfor.com.cn',
    }
  },
  { 
    id: 'l7', 
    name: '汇川技术系', 
    coreCompany: '深圳市汇川技术股份有限公司', 
    count: 28, 
    shenzhenCount: 16,
    totalCapital: '110亿', 
    owner: '朱兴明', 
    color: '#13c2c2',
    coreInfo: {
      foundedDate: '2003-04-10',
      registeredCapital: '26.6亿人民币',
      employees: '约2万人',
      industries: ['工业自动化', '电梯', '新能源汽车', '轨道交通'],
      address: '深圳市宝安区新安街道留仙二路鸿威工业园',
      email: 'contact@inovance.com',
    }
  },
  { 
    id: 'l8', 
    name: '顺丰同城系', 
    coreCompany: '顺丰同城实业股份有限公司', 
    count: 15, 
    shenzhenCount: 12,
    totalCapital: '48亿', 
    owner: '孙海金', 
    color: '#f5222d',
    coreInfo: {
      foundedDate: '2019-06-21',
      registeredCapital: '9.4亿人民币',
      employees: '约50万人',
      industries: ['即时配送', '同城物流', '即时零售', '冷链'],
      address: '深圳市福田区华富街道莲花一村社区皇岗路5001号',
      email: 'contact@sf-cityrush.com',
    }
  },
];

// 中国500强数据 - 深圳入榜企业
export const top500List = [
  { 
    id: 't1', 
    name: '平安集团', 
    coreCompany: '中国平安保险（集团）股份有限公司', 
    count: 128, 
    shenzhenCount: 72,
    totalCapital: '1.1万亿', 
    owner: '马明哲', 
    color: '#fa8c16',
    coreInfo: {
      foundedDate: '1988-03-21',
      registeredCapital: '182.8亿人民币',
      employees: '约28万人',
      industries: ['保险', '银行', '投资', '医疗'],
      address: '深圳市福田区益田路5033号平安金融中心',
      email: 'contact@pingan.com.cn',
    }
  },
  { 
    id: 't2', 
    name: '华为技术', 
    coreCompany: '华为投资控股有限公司', 
    count: 142, 
    shenzhenCount: 85,
    totalCapital: '6423亿', 
    owner: '任正非', 
    color: '#fa541c',
    coreInfo: {
      foundedDate: '1987-09-15',
      registeredCapital: '340.5亿人民币',
      employees: '约19.5万人',
      industries: ['通信设备', '消费电子', '云计算', '芯片'],
      address: '深圳市龙岗区坂田华为基地',
      email: 'contact@huawei.com',
    }
  },
  { 
    id: 't3', 
    name: '腾讯控股', 
    coreCompany: '腾讯控股有限公司', 
    count: 156, 
    shenzhenCount: 68,
    totalCapital: '5601亿', 
    owner: '马化腾', 
    color: '#1677ff',
    coreInfo: {
      foundedDate: '1998-11-11',
      registeredCapital: '1000万港元',
      employees: '约10万人',
      industries: ['互联网', '游戏', '金融科技', '云计算'],
      address: '深圳市南山区海天二路33号腾讯滨海大厦',
      email: 'contact@tencent.com',
    }
  },
  { 
    id: 't4', 
    name: '招商银行', 
    coreCompany: '招商银行股份有限公司', 
    count: 38, 
    shenzhenCount: 22,
    totalCapital: '3312亿', 
    owner: '缪建民', 
    color: '#722ed1',
    coreInfo: {
      foundedDate: '1987-04-08',
      registeredCapital: '252.2亿人民币',
      employees: '约11万人',
      industries: ['零售银行', '公司金融', '投行', '资产管理'],
      address: '深圳市福田区深南大道7088号招商银行大厦',
      email: 'contact@cmbchina.com',
    }
  },
  { 
    id: 't5', 
    name: '万科企业', 
    coreCompany: '万科企业股份有限公司', 
    count: 86, 
    shenzhenCount: 38,
    totalCapital: '5038亿', 
    owner: '郁亮', 
    color: '#52c41a',
    coreInfo: {
      foundedDate: '1984-05-30',
      registeredCapital: '116.3亿人民币',
      employees: '约8万人',
      industries: ['房地产开发', '物业服务', '物流仓储', '商业运营'],
      address: '深圳市盐田区大梅沙环梅路33号万科中心',
      email: 'contact@vanke.com',
    }
  },
  { 
    id: 't6', 
    name: '比亚迪', 
    coreCompany: '比亚迪股份有限公司', 
    count: 98, 
    shenzhenCount: 45,
    totalCapital: '6023亿', 
    owner: '王传福', 
    color: '#13c2c2',
    coreInfo: {
      foundedDate: '1995-02-10',
      registeredCapital: '29.1亿人民币',
      employees: '约60万人',
      industries: ['新能源汽车', '电池', '电子', '轨道交通'],
      address: '深圳市坪山区比亚迪路3009号',
      email: 'contact@byd.com',
    }
  },
  { 
    id: 't7', 
    name: '顺丰控股', 
    coreCompany: '顺丰控股股份有限公司', 
    count: 68, 
    shenzhenCount: 42,
    totalCapital: '2675亿', 
    owner: '王卫', 
    color: '#f5222d',
    coreInfo: {
      foundedDate: '1993-03-26',
      registeredCapital: '49亿人民币',
      employees: '约50万人',
      industries: ['快递物流', '供应链', '航空', '科技'],
      address: '深圳市福田区益田路6009号',
      email: 'contact@sf-express.com',
    }
  },
  { 
    id: 't8', 
    name: '正威集团', 
    coreCompany: '正威国际集团有限公司', 
    count: 42, 
    shenzhenCount: 15,
    totalCapital: '6080亿', 
    owner: '王文银', 
    color: '#faad14',
    coreInfo: {
      foundedDate: '1999-06-28',
      registeredCapital: '50亿人民币',
      employees: '约2万人',
      industries: ['有色金属', '新材料', '半导体', '产业投资'],
      address: '深圳市福田区深南大道7888号东海国际中心',
      email: 'contact@amer.com.cn',
    }
  },
  { 
    id: 't9', 
    name: '中集集团', 
    coreCompany: '中国国际海运集装箱（集团）股份有限公司', 
    count: 58, 
    shenzhenCount: 35,
    totalCapital: '1275亿', 
    owner: '麦伯良', 
    color: '#1890ff',
    coreInfo: {
      foundedDate: '1980-01-14',
      registeredCapital: '53.9亿人民币',
      employees: '约6万人',
      industries: ['集装箱', '道路运输车辆', '能源装备', '海洋工程'],
      address: '深圳市南山区蛇口工业区港湾大道2号',
      email: 'contact@cimc.com',
    }
  },
  { 
    id: 't10', 
    name: '中兴通讯', 
    coreCompany: '中兴通讯股份有限公司', 
    count: 52, 
    shenzhenCount: 28,
    totalCapital: '1229亿', 
    owner: '李自学', 
    color: '#2f4554',
    coreInfo: {
      foundedDate: '1985-02-07',
      registeredCapital: '46.9亿人民币',
      employees: '约7.4万人',
      industries: ['通信设备', '5G', '芯片', '智能终端'],
      address: '深圳市南山区高新技术产业园',
      email: 'contact@zte.com.cn',
    }
  },
];

// 成员企业表格数据 - 按深圳真实企业系族组织
export const memberCompaniesData = {
  // 腾讯系成员
  '1': [
    { id: '101', name: '腾讯控股有限公司', level: 'core', capital: '1000万港元', region: 'outside', regionName: '开曼群岛', industry: '互联网', creditCode: '91440300708486197T', foundedDate: '1998-11-11', address: '深圳市南山区海天二路33号腾讯滨海大厦' },
    { id: '102', name: '深圳市腾讯计算机系统有限公司', level: 'first', capital: '6500万人民币', region: 'local', regionName: '深圳南山', industry: '互联网', creditCode: '9144030071526726XG', foundedDate: '1998-11-11', address: '深圳市南山区高新区科技中一路腾讯大厦35层' },
    { id: '103', name: '腾讯音乐娱乐集团', level: 'first', capital: '5000万美元', region: 'local', regionName: '深圳南山', industry: '数字娱乐', creditCode: '91440300MA5F2M3G8N', foundedDate: '2016-07-04', address: '深圳市南山区科技园科技中一路腾讯大厦' },
    { id: '104', name: '微信科技（深圳）有限公司', level: 'first', capital: '1亿人民币', region: 'local', regionName: '深圳南山', industry: '互联网', creditCode: '91440300310585787M', foundedDate: '2014-03-24', address: '深圳市南山区科技园科技中一路腾讯大厦' },
    { id: '105', name: '腾讯科技（北京）有限公司', level: 'first', capital: '8000万人民币', region: 'outside', regionName: '北京海淀', industry: '互联网', creditCode: '91110108772551635L', foundedDate: '2005-03-31', address: '北京市海淀区海淀大街38号银科大厦' },
    { id: '106', name: '腾讯科技（上海）有限公司', level: 'first', capital: '5000万人民币', region: 'outside', regionName: '上海徐汇', industry: '互联网', creditCode: '91310104798926108X', foundedDate: '2006-11-21', address: '上海市徐汇区漕河泾开发区田林路397号' },
    { id: '107', name: '酷狗音乐科技（深圳）有限公司', level: 'second', capital: '1200万人民币', region: 'local', regionName: '深圳福田', industry: '数字娱乐', creditCode: '91440300795425896P', foundedDate: '2006-11-21', address: '深圳市福田区华强北路赛格科技园' },
    { id: '108', name: '酷我音乐科技（深圳）有限公司', level: 'second', capital: '1000万人民币', region: 'local', regionName: '深圳福田', industry: '数字娱乐', creditCode: '91440300671850572B', foundedDate: '2008-01-28', address: '深圳市福田区深南大道1003号东方新天地' },
    { id: '109', name: '腾讯云计算（北京）有限责任公司', level: 'first', capital: '1亿人民币', region: 'outside', regionName: '北京', industry: '云计算', creditCode: '91110108399643399M', foundedDate: '2014-07-25', address: '北京市海淀区上地东路1号盈创动力大厦' },
    { id: '110', name: '财付通支付科技有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '深圳南山', industry: '金融科技', creditCode: '91440300792578686M', foundedDate: '2006-08-25', address: '深圳市南山区科技园科技中一路腾讯大厦' },
    { id: '111', name: '微众银行股份有限公司', level: 'associate', capital: '42亿人民币', region: 'local', regionName: '深圳南山', industry: '金融科技', creditCode: '9144030031977063XH', foundedDate: '2014-12-16', address: '深圳市南山区桃园路田厦国际中心' },
    { id: '112', name: '阅文集团', level: 'first', capital: '1亿美元', region: 'outside', regionName: '香港', industry: '数字内容', creditCode: '-', foundedDate: '2013-03-28', address: '香港九龙尖沙咀柯士甸道西1号环球贸易广场' },
  ],
  // 华为系成员
  '2': [
    { id: '201', name: '华为投资控股有限公司', level: 'core', capital: '340.5亿人民币', region: 'local', regionName: '深圳龙岗', industry: '通信设备', creditCode: '91440300192378788X', foundedDate: '1987-09-15', address: '深圳市龙岗区坂田华为基地' },
    { id: '202', name: '华为技术有限公司', level: 'first', capital: '399亿人民币', region: 'local', regionName: '深圳龙岗', industry: '通信设备', creditCode: '91440300192376798M', foundedDate: '1987-09-15', address: '深圳市龙岗区坂田华为总部办公楼' },
    { id: '203', name: '海思半导体有限公司', level: 'first', capital: '20亿人民币', region: 'local', regionName: '深圳龙岗', industry: '芯片', creditCode: '91440300710926283X', foundedDate: '2004-10-29', address: '深圳市龙岗区坂田华为基地H区' },
    { id: '204', name: '华为云计算技术有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '贵州贵安', industry: '云计算', creditCode: '91520900MA6J4KQ8X9', foundedDate: '2019-12-06', address: '贵州省贵安新区黔中大道' },
    { id: '205', name: '华为终端有限公司', level: 'first', capital: '30亿人民币', region: 'local', regionName: '深圳龙岗', industry: '消费电子', creditCode: '914403007556605345', foundedDate: '2012-11-23', address: '深圳市龙岗区坂田华为基地F区' },
    { id: '206', name: '华为数字能源技术有限公司', level: 'first', capital: '30亿人民币', region: 'local', regionName: '深圳福田', industry: '新能源', creditCode: '91440300MA5G8Q3R8N', foundedDate: '2021-06-07', address: '深圳市福田区香蜜湖街道华为数字能源总部' },
    { id: '207', name: '华为海思集成电路设计有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '深圳龙岗', industry: '芯片', creditCode: '91440300717889047X', foundedDate: '2004-10-29', address: '深圳市龙岗区坂田华为基地' },
    { id: '208', name: '华为机器有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '东莞松山湖', industry: '智能制造', creditCode: '91441900MA4W5Q9R8C', foundedDate: '2017-05-09', address: '东莞市松山湖园区环湖路华为机器园区' },
  ],
  // 平安系成员
  '3': [
    { id: '301', name: '中国平安保险（集团）股份有限公司', level: 'core', capital: '182.8亿人民币', region: 'local', regionName: '深圳福田', industry: '保险', creditCode: '91440300192350207W', foundedDate: '1988-03-21', address: '深圳市福田区益田路5033号平安金融中心' },
    { id: '302', name: '中国平安人寿保险股份有限公司', level: 'first', capital: '338亿人民币', region: 'local', regionName: '深圳福田', industry: '保险', creditCode: '914403007109307395', foundedDate: '2002-12-17', address: '深圳市福田区福田街道益田路5033号平安金融中心' },
    { id: '303', name: '中国平安财产保险股份有限公司', level: 'first', capital: '210亿人民币', region: 'local', regionName: '深圳福田', industry: '保险', creditCode: '914403007109307208', foundedDate: '2002-12-24', address: '深圳市福田区福田街道益田路5033号平安金融中心' },
    { id: '304', name: '平安银行股份有限公司', level: 'first', capital: '194亿人民币', region: 'local', regionName: '深圳福田', industry: '银行', creditCode: '91440300192185379H', foundedDate: '1987-12-22', address: '深圳市罗湖区深南东路5047号平安银行大厦' },
    { id: '305', name: '平安资产管理有限责任公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '上海浦东', industry: '资产管理', creditCode: '91310000710935012N', foundedDate: '2005-05-27', address: '上海市浦东新区陆家嘴环路1333号平安金融大厦' },
    { id: '306', name: '平安信托有限责任公司', level: 'first', capital: '130亿人民币', region: 'local', regionName: '深圳福田', industry: '信托', creditCode: '914403001000171432', foundedDate: '1996-07-22', address: '深圳市福田区福田街道益田路5033号平安金融中心' },
    { id: '307', name: '平安证券股份有限公司', level: 'first', capital: '138亿人民币', region: 'local', regionName: '深圳福田', industry: '证券', creditCode: '914403001000234534', foundedDate: '1996-07-18', address: '深圳市福田区福田街道益田路5033号平安金融中心' },
    { id: '308', name: '平安健康医疗科技有限公司', level: 'first', capital: '3.5亿美元', region: 'outside', regionName: '上海徐汇', industry: '互联网医疗', creditCode: '91310104MA1FR8M3X1', foundedDate: '2014-08-20', address: '上海市徐汇区凯滨路166号平安大厦' },
    { id: '309', name: '金融壹账通', level: 'first', capital: '1.2亿美元', region: 'outside', regionName: '上海', industry: '金融科技', creditCode: '91310000MA1FL7R80D', foundedDate: '2015-12-18', address: '上海市徐汇区凯滨路166号平安大厦' },
  ],
  // 比亚迪系成员
  '4': [
    { id: '401', name: '比亚迪股份有限公司', level: 'core', capital: '29.1亿人民币', region: 'local', regionName: '深圳坪山', industry: '新能源汽车', creditCode: '91440300192345815X', foundedDate: '1995-02-10', address: '深圳市坪山区比亚迪路3009号' },
    { id: '402', name: '比亚迪汽车有限公司', level: 'first', capital: '43.8亿人民币', region: 'outside', regionName: '西安', industry: '汽车制造', creditCode: '91610131735084619X', foundedDate: '1997-03-21', address: '西安市高新区新型工业园亚迪路2号' },
    { id: '403', name: '比亚迪半导体股份有限公司', level: 'first', capital: '4.5亿人民币', region: 'local', regionName: '深圳坪山', industry: '芯片', creditCode: '91440300715260631X', foundedDate: '2004-10-15', address: '深圳市坪山区比亚迪路3009号六角大楼' },
    { id: '404', name: '弗迪电池有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '深圳坪山', industry: '电池', creditCode: '91440300MA5G8G8R2L', foundedDate: '2019-05-05', address: '深圳市坪山区坑梓街道比亚迪路3009号' },
    { id: '405', name: '比亚迪电子（国际）有限公司', level: 'first', capital: '5亿港元', region: 'local', regionName: '深圳龙岗', industry: '电子制造', creditCode: '91440300715245678C', foundedDate: '2007-06-12', address: '深圳市龙岗区宝龙街道宝荷路3001号' },
    { id: '406', name: '弗迪动力有限公司', level: 'first', capital: '8亿人民币', region: 'local', regionName: '深圳坪山', industry: '汽车零部件', creditCode: '91440300MA5G8G9R3M', foundedDate: '2019-12-25', address: '深圳市坪山区坑梓街道比亚迪路3009号' },
    { id: '407', name: '比亚迪丰田电动车科技有限公司', level: 'associate', capital: '3.5亿人民币', region: 'local', regionName: '深圳坪山', industry: '新能源汽车', creditCode: '91440300MA5G3N5K8N', foundedDate: '2020-03-25', address: '深圳市坪山区比亚迪路3009号' },
  ],
  // 万科系成员
  '5': [
    { id: '501', name: '万科企业股份有限公司', level: 'core', capital: '116.3亿人民币', region: 'local', regionName: '深圳盐田', industry: '房地产开发', creditCode: '91440300192184756X', foundedDate: '1984-05-30', address: '深圳市盐田区大梅沙环梅路33号万科中心' },
    { id: '502', name: '深圳市万科地产有限公司', level: 'first', capital: '20亿人民币', region: 'local', regionName: '深圳福田', industry: '房地产开发', creditCode: '91440300192345892L', foundedDate: '1994-06-28', address: '深圳市福田区梅林路63号万科建筑研究中心' },
    { id: '503', name: '万物云空间科技服务股份有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '深圳福田', industry: '物业服务', creditCode: '91440300715245678M', foundedDate: '2001-02-20', address: '深圳市福田区香蜜湖街道侨香路3085号' },
    { id: '504', name: '深圳市万纬物流投资有限公司', level: 'first', capital: '50亿人民币', region: 'local', regionName: '深圳前海', industry: '物流仓储', creditCode: '91440300MA5F8N9R8K', foundedDate: '2017-12-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '505', name: '印力商用置业有限公司', level: 'first', capital: '30亿人民币', region: 'outside', regionName: '上海', industry: '商业地产', creditCode: '91310000710925678M', foundedDate: '2003-04-28', address: '上海市浦东新区世纪大道100号环球金融中心' },
    { id: '506', name: '万科泊寓公寓管理有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '深圳龙岗', industry: '长租公寓', creditCode: '91440300MA5D8N9R7K', foundedDate: '2016-05-18', address: '深圳市龙岗区坂田街道万科城社区' },
  ],
  // 招商系成员
  '6': [
    { id: '601', name: '招商局集团有限公司', level: 'core', capital: '169亿人民币', region: 'local', regionName: '深圳南山', industry: '综合金融', creditCode: '914403001000123456', foundedDate: '1872-12-26', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '602', name: '招商银行股份有限公司', level: 'first', capital: '252.2亿人民币', region: 'local', regionName: '深圳福田', industry: '银行', creditCode: '914403001000777777', foundedDate: '1987-03-31', address: '深圳市福田区深南大道7088号招商银行大厦' },
    { id: '603', name: '招商证券股份有限公司', level: 'first', capital: '86.9亿人民币', region: 'local', regionName: '深圳福田', industry: '证券', creditCode: '91440300192350798X', foundedDate: '1991-08-01', address: '深圳市福田区福田街道福华一路111号' },
    { id: '604', name: '招商局蛇口工业区控股股份有限公司', level: 'first', capital: '79.2亿人民币', region: 'local', regionName: '深圳南山', industry: '地产开发', creditCode: '91440300192345678M', foundedDate: '1992-02-19', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '605', name: '招商局港口集团股份有限公司', level: 'first', capital: '19.4亿人民币', region: 'local', regionName: '深圳南山', industry: '港口运营', creditCode: '91440300192378901M', foundedDate: '1991-06-18', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '606', name: '中国外运股份有限公司', level: 'first', capital: '72.5亿人民币', region: 'outside', regionName: '北京', industry: '物流', creditCode: '91110000100012345M', foundedDate: '2002-11-20', address: '北京市朝阳区安定路5号院10号楼' },
    { id: '607', name: '招商轮船股份有限公司', level: 'first', capital: '81.1亿人民币', region: 'outside', regionName: '上海', industry: '航运', creditCode: '91310000132201245M', foundedDate: '2004-12-31', address: '上海市浦东新区世纪大道1589号长泰国际金融大厦' },
  ],
  // 顺丰系成员
  '7': [
    { id: '701', name: '顺丰控股股份有限公司', level: 'core', capital: '49亿人民币', region: 'local', regionName: '深圳福田', industry: '快递物流', creditCode: '91440300192345892M', foundedDate: '1993-03-26', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '702', name: '深圳顺丰泰森控股（集团）有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '深圳福田', industry: '快递物流', creditCode: '91440300MA5D8N9R8K', foundedDate: '2013-08-21', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '703', name: '顺丰速运有限公司', level: 'first', capital: '1.5亿人民币', region: 'local', regionName: '深圳福田', industry: '快递物流', creditCode: '91440300715245678M', foundedDate: '2013-07-25', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '704', name: '顺丰航空有限公司', level: 'first', capital: '15亿人民币', region: 'local', regionName: '深圳宝安', industry: '航空运输', creditCode: '91440300680356789M', foundedDate: '2009-02-09', address: '深圳市宝安区国际机场航站四路1111号' },
    { id: '705', name: '顺丰同城实业股份有限公司', level: 'first', capital: '9.4亿人民币', region: 'local', regionName: '深圳福田', industry: '即时配送', creditCode: '91440300MA5G8G8R8N', foundedDate: '2019-06-21', address: '深圳市福田区华富街道莲花一村社区皇岗路5001号' },
    { id: '706', name: '顺丰供应链有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '深圳前海', industry: '供应链', creditCode: '91440300MA5F8N9R8K', foundedDate: '2015-08-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '707', name: '嘉里物流联网有限公司', level: 'associate', capital: '10亿港元', region: 'outside', regionName: '香港', industry: '国际物流', creditCode: '-', foundedDate: '1981-04-16', address: '香港新界葵涌货柜码头南路88号嘉里货仓' },
  ],
  // 中兴系成员
  '8': [
    { id: '801', name: '中兴通讯股份有限公司', level: 'core', capital: '46.9亿人民币', region: 'local', regionName: '深圳南山', industry: '通信设备', creditCode: '91440300192338322M', foundedDate: '1985-02-07', address: '深圳市南山区高新技术产业园科技南路55号' },
    { id: '802', name: '深圳市中兴康讯电子有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '深圳南山', industry: '电子制造', creditCode: '91440300715245678M', foundedDate: '1996-08-16', address: '深圳市南山区西丽街道留仙大道中兴工业园' },
    { id: '803', name: '中兴通讯（杭州）有限责任公司', level: 'first', capital: '3亿人民币', region: 'outside', regionName: '杭州', industry: '通信设备', creditCode: '91330100720045678M', foundedDate: '2000-06-16', address: '杭州市滨江区长河街道网商路699号' },
    { id: '804', name: '西安中兴通讯终端科技有限公司', level: 'first', capital: '2亿人民币', region: 'outside', regionName: '西安', industry: '智能终端', creditCode: '91610131750245678M', foundedDate: '2014-08-06', address: '西安市高新区唐延南路10号中兴产业园' },
    { id: '805', name: '深圳市中兴微电子技术有限公司', level: 'first', capital: '1.5亿人民币', region: 'local', regionName: '深圳南山', industry: '芯片', creditCode: '91440300715267890M', foundedDate: '2003-11-28', address: '深圳市南山区西丽街道留仙大道中兴工业园' },
    { id: '806', name: '广东中兴新通讯有限公司', level: 'associate', capital: '2亿人民币', region: 'local', regionName: '深圳南山', industry: '通信设备', creditCode: '91440300192345678M', foundedDate: '1993-04-23', address: '深圳市南山区高新技术产业园科技南路55号' },
  ],
  // 大疆系成员
  '9': [
    { id: '901', name: '深圳市大疆创新科技有限公司', level: 'core', capital: '3000万人民币', region: 'local', regionName: '深圳南山', industry: '无人机', creditCode: '91440300755660534L', foundedDate: '2006-11-06', address: '深圳市南山区西丽街道仙茶路51号大疆天空之城' },
    { id: '902', name: '大疆百旺科技有限公司', level: 'first', capital: '1亿人民币', region: 'local', regionName: '深圳宝安', industry: '无人机', creditCode: '91440300MA5D8N9R7K', foundedDate: '2015-08-28', address: '深圳市宝安区石岩街道石龙社区颐和路2号' },
    { id: '903', name: '深圳市大疆如影科技有限公司', level: 'first', capital: '5000万人民币', region: 'local', regionName: '深圳南山', industry: '影像系统', creditCode: '91440300MA5D8N9R6J', foundedDate: '2017-05-16', address: '深圳市南山区西丽街道仙茶路51号大疆天空之城' },
    { id: '904', name: '深圳市大疆教育科技有限公司', level: 'first', capital: '3000万人民币', region: 'local', regionName: '深圳南山', industry: '教育', creditCode: '91440300MA5F8N9R5H', foundedDate: '2019-03-21', address: '深圳市南山区西丽街道仙茶路51号大疆天空之城' },
    { id: '905', name: '美国大疆创新有限公司', level: 'first', capital: '1000万美元', region: 'outside', regionName: '美国洛杉矶', industry: '无人机', creditCode: '-', foundedDate: '2014-09-18', address: '3500 W Olive Ave, Burbank, CA 91505, USA' },
  ],
  // 迈瑞系成员
  '10': [
    { id: '1001', name: '深圳迈瑞生物医疗电子股份有限公司', level: 'core', capital: '12.1亿人民币', region: 'local', regionName: '深圳南山', industry: '医疗器械', creditCode: '91440300192383822M', foundedDate: '1991-10-05', address: '深圳市南山区高新技术产业园科技南十二路迈瑞大厦' },
    { id: '1002', name: '深圳迈瑞科技有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '深圳南山', industry: '医疗器械', creditCode: '91440300715245678M', foundedDate: '2001-06-28', address: '深圳市南山区高新技术产业园科技南十二路迈瑞大厦' },
    { id: '1003', name: '武汉迈瑞科技有限公司', level: 'first', capital: '3亿人民币', region: 'outside', regionName: '武汉', industry: '医疗器械', creditCode: '91420100728045678M', foundedDate: '2005-09-16', address: '武汉市东湖新技术开发区高新大道818号' },
    { id: '1004', name: '南京迈瑞生物医疗电子有限公司', level: 'first', capital: '2亿人民币', region: 'outside', regionName: '南京', industry: '医疗器械', creditCode: '91320100750245678M', foundedDate: '2008-03-25', address: '南京市江宁区醴泉路99号' },
    { id: '1005', name: '迈瑞电子（香港）有限公司', level: 'first', capital: '1亿港元', region: 'outside', regionName: '香港', industry: '医疗器械', creditCode: '-', foundedDate: '2000-05-18', address: '香港新界沙田香港科学园科技大道西10号' },
  ],
  // 正威系成员
  '11': [
    { id: '1101', name: '正威国际集团有限公司', level: 'core', capital: '50亿人民币', region: 'local', regionName: '深圳福田', industry: '有色金属', creditCode: '91440300192345678M', foundedDate: '1999-06-28', address: '深圳市福田区深南大道7888号东海国际中心' },
    { id: '1102', name: '全威（铜陵）铜业科技有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '安徽铜陵', industry: '铜加工', creditCode: '91340700733045678M', foundedDate: '2005-04-15', address: '安徽省铜陵市经济技术开发区' },
    { id: '1103', name: '深圳正威（集团）有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '深圳福田', industry: '产业投资', creditCode: '91440300715245678M', foundedDate: '2003-08-18', address: '深圳市福田区深南大道7888号东海国际中心' },
    { id: '1104', name: '正威半导体有限公司', level: 'first', capital: '50亿人民币', region: 'local', regionName: '深圳宝安', industry: '半导体', creditCode: '91440300MA5G8Q3R8N', foundedDate: '2020-11-12', address: '深圳市宝安区西乡街道桃花源科技创新园' },
  ],
  // 立讯系成员
  '12': [
    { id: '1201', name: '立讯精密工业股份有限公司', level: 'core', capital: '71.2亿人民币', region: 'local', regionName: '深圳宝安', industry: '消费电子', creditCode: '91440300734156693M', foundedDate: '2004-05-24', address: '深圳市宝安区沙井街道蚝四西部工业区立讯精密工业园' },
    { id: '1202', name: '昆山立讯精密模具有限公司', level: 'first', capital: '5亿人民币', region: 'outside', regionName: '苏州昆山', industry: '精密制造', creditCode: '91320583784345678M', foundedDate: '2009-09-08', address: '江苏省昆山市张浦镇益德路988号' },
    { id: '1203', name: '立讯电子科技（昆山）有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '苏州昆山', industry: '消费电子', creditCode: '91320583066245678M', foundedDate: '2013-06-28', address: '江苏省昆山市锦溪镇百胜路399号' },
    { id: '1204', name: '东莞立讯技术有限公司', level: 'first', capital: '8亿人民币', region: 'outside', regionName: '东莞', industry: '通信设备', creditCode: '91441900324745678M', foundedDate: '2015-04-22', address: '东莞市清溪镇北环路313号' },
    { id: '1205', name: '越南立讯精密有限公司', level: 'first', capital: '5000万美元', region: 'outside', regionName: '越南', industry: '消费电子', creditCode: '-', foundedDate: '2016-11-15', address: 'Lot CN-08, Que Vo Industrial Park, Bac Ninh Province, Vietnam' },
  ],
  // 工业富联系成员
  'l1': [
    { id: 'l101', name: '富士康工业互联网股份有限公司', level: 'core', capital: '198.7亿人民币', region: 'local', regionName: '深圳龙华', industry: '工业互联网', creditCode: '91440300MA5F3N8R9K', foundedDate: '2015-03-06', address: '深圳市龙华区龙华街道东环二路2号富士康科技园' },
    { id: 'l102', name: '深圳富桂精密工业有限公司', level: 'first', capital: '50亿人民币', region: 'local', regionName: '深圳龙华', industry: '智能制造', creditCode: '91440300715245678M', foundedDate: '1998-06-30', address: '深圳市龙华区龙华街道东环二路2号富士康科技园' },
    { id: 'l103', name: '佛山富桂精密工业有限公司', level: 'first', capital: '30亿人民币', region: 'outside', regionName: '佛山', industry: '智能制造', creditCode: '91440600783845678M', foundedDate: '2007-03-16', address: '广东省佛山市南海区狮山镇官窑虹岭路' },
    { id: 'l104', name: '工业富联（香港）有限公司', level: 'first', capital: '5亿港元', region: 'outside', regionName: '香港', industry: '投资控股', creditCode: '-', foundedDate: '2015-08-12', address: '香港九龙宏照道38号企业广场五期2座' },
    { id: 'l105', name: '北京亦庄智能科技有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '北京', industry: '云计算', creditCode: '91110302MA01F8N9R8K', foundedDate: '2018-09-25', address: '北京市大兴区亦庄经济技术开发区科创十街18号' },
  ],
  // 招商银行系成员
  'l2': [
    { id: 'l201', name: '招商银行股份有限公司', level: 'core', capital: '252.2亿人民币', region: 'local', regionName: '深圳福田', industry: '银行', creditCode: '914403001000777777', foundedDate: '1987-04-08', address: '深圳市福田区深南大道7088号招商银行大厦' },
    { id: 'l202', name: '招商永隆银行有限公司', level: 'first', capital: '50亿港元', region: 'outside', regionName: '香港', industry: '银行', creditCode: '-', foundedDate: '1933-02-25', address: '香港中环德辅道中45号永隆银行大厦' },
    { id: 'l203', name: '招银国际金融有限公司', level: 'first', capital: '30亿港元', region: 'outside', regionName: '香港', industry: '投行', creditCode: '-', foundedDate: '1997-08-28', address: '香港中环交易广场三期28楼' },
    { id: 'l204', name: '招银理财有限责任公司', level: 'first', capital: '50亿人民币', region: 'local', regionName: '深圳福田', industry: '理财', creditCode: '91440300MA5F8N9R8K', foundedDate: '2019-11-01', address: '深圳市福田区深南大道7088号招商银行大厦' },
    { id: 'l205', name: '招商基金管理有限公司', level: 'associate', capital: '13.1亿人民币', region: 'local', regionName: '深圳福田', industry: '基金管理', creditCode: '91440300710928093X', foundedDate: '2002-12-27', address: '深圳市福田区深南大道7088号招商银行大厦' },
  ],
  // 金地系成员
  'l3': [
    { id: 'l301', name: '金地（集团）股份有限公司', level: 'core', capital: '45.1亿人民币', region: 'local', regionName: '深圳福田', industry: '房地产开发', creditCode: '91440300192383822M', foundedDate: '1988-01-20', address: '深圳市福田区福田街道岗厦社区深南大道2007号金地中心' },
    { id: 'l302', name: '深圳市金地房地产有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '深圳福田', industry: '房地产开发', creditCode: '91440300192345678M', foundedDate: '1994-06-28', address: '深圳市福田区福田街道岗厦社区深南大道2007号金地中心' },
    { id: 'l303', name: '金地商置集团有限公司', level: 'first', capital: '5亿港元', region: 'outside', regionName: '香港', industry: '商业地产', creditCode: '-', foundedDate: '2012-10-18', address: '香港中环皇后大道中99号中环中心' },
    { id: 'l304', name: '金地物业管理集团公司', level: 'first', capital: '2亿人民币', region: 'local', regionName: '深圳福田', industry: '物业管理', creditCode: '91440300715245678M', foundedDate: '1993-03-15', address: '深圳市福田区福田街道岗厦社区深南大道2007号金地中心' },
    { id: 'l305', name: '稳盛（天津）投资管理有限公司', level: 'first', capital: '1亿人民币', region: 'outside', regionName: '天津', industry: '基金管理', creditCode: '91120116598745678M', foundedDate: '2012-08-16', address: '天津市滨海新区中新生态城动漫中路126号' },
  ],
  // 中集系成员
  'l4': [
    { id: 'l401', name: '中国国际海运集装箱（集团）股份有限公司', level: 'core', capital: '53.9亿人民币', region: 'local', regionName: '深圳南山', industry: '集装箱', creditCode: '91440300192384756X', foundedDate: '1980-01-14', address: '深圳市南山区蛇口工业区港湾大道2号中集集团研发中心' },
    { id: 'l402', name: '中集集装箱控股有限公司', level: 'first', capital: '20亿人民币', region: 'local', regionName: '深圳南山', industry: '集装箱', creditCode: '91440300715245678M', foundedDate: '1996-09-12', address: '深圳市南山区蛇口工业区港湾大道2号' },
    { id: 'l403', name: '中集车辆（集团）股份有限公司', level: 'first', capital: '18.9亿人民币', region: 'outside', regionName: '江门', industry: '道路运输车辆', creditCode: '91440700739845678M', foundedDate: '2003-06-24', address: '广东省江门市新会区大鳌镇沙角工业区' },
    { id: 'l404', name: '中集安瑞科控股有限公司', level: 'first', capital: '10亿港元', region: 'outside', regionName: '香港', industry: '能源装备', creditCode: '-', foundedDate: '2004-08-18', address: '香港德辅道中199号无限极广场32楼' },
    { id: 'l405', name: '中集海洋工程有限公司', level: 'first', capital: '15亿人民币', region: 'local', regionName: '深圳前海', industry: '海洋工程', creditCode: '91440300MA5G8Q3R8N', foundedDate: '2006-09-28', address: '深圳市前海深港合作区前湾一路1号' },
  ],
  // 深信服系成员
  'l6': [
    { id: 'l601', name: '深信服科技股份有限公司', level: 'core', capital: '4.2亿人民币', region: 'local', regionName: '深圳南山', industry: '网络安全', creditCode: '91440300715245678M', foundedDate: '2000-12-25', address: '深圳市南山区学苑大道1001号南山智园A1栋' },
    { id: 'l602', name: '深圳市深信服信息安全有限公司', level: 'first', capital: '1亿人民币', region: 'local', regionName: '深圳南山', industry: '网络安全', creditCode: '91440300MA5D8N9R8K', foundedDate: '2010-08-18', address: '深圳市南山区学苑大道1001号南山智园A1栋' },
    { id: 'l603', name: '北京深信服科技有限公司', level: 'first', capital: '5000万人民币', region: 'outside', regionName: '北京', industry: '网络安全', creditCode: '91110108587645678M', foundedDate: '2011-12-08', address: '北京市海淀区中关村大街27号中关村大厦' },
    { id: 'l604', name: '上海深信服信息科技有限公司', level: 'first', capital: '3000万人民币', region: 'outside', regionName: '上海', industry: '云计算', creditCode: '91310110MA1F8N9R8K', foundedDate: '2014-06-16', address: '上海市徐汇区虹梅路1905号远中科研楼' },
    { id: 'l605', name: '香港深信服科技有限公司', level: 'first', capital: '1000万港元', region: 'outside', regionName: '香港', industry: '网络安全', creditCode: '-', foundedDate: '2013-09-25', address: '香港九龙观塘道348号宏利广场' },
  ],
  // 汇川技术系成员
  'l7': [
    { id: 'l701', name: '深圳市汇川技术股份有限公司', level: 'core', capital: '26.6亿人民币', region: 'local', regionName: '深圳宝安', industry: '工业自动化', creditCode: '91440300715245678M', foundedDate: '2003-04-10', address: '深圳市宝安区新安街道留仙二路鸿威工业园E栋' },
    { id: 'l702', name: '苏州汇川技术有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '苏州', industry: '工业自动化', creditCode: '91320594784345678M', foundedDate: '2008-07-29', address: '江苏省苏州市吴中区越溪街道友翔路16号' },
    { id: 'l703', name: '深圳市汇川控制技术有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '深圳宝安', industry: '工业控制', creditCode: '91440300MA5D8N9R8K', foundedDate: '2012-11-20', address: '深圳市宝安区新安街道留仙二路鸿威工业园E栋' },
    { id: 'l704', name: '南京汇川工业视觉技术开发有限公司', level: 'first', capital: '2亿人民币', region: 'outside', regionName: '南京', industry: '机器视觉', creditCode: '91320115MA1M8N9R8K', foundedDate: '2015-08-18', address: '南京市江宁区苏源大道19号九龙湖国际企业总部园' },
    { id: 'l705', name: '联合动力汽车科技有限公司', level: 'first', capital: '8亿人民币', region: 'outside', regionName: '芜湖', industry: '新能源汽车', creditCode: '91340207MA2M8N9R8K', foundedDate: '2016-09-28', address: '安徽省芜湖市弋江区高新技术产业开发区漳河路18号' },
  ],
  // 中国500强企业成员
  't1': [
    { id: 't101', name: '中国平安保险（集团）股份有限公司', level: 'core', capital: '182.8亿人民币', region: 'local', regionName: '深圳福田', industry: '保险', creditCode: '91440300192350207W', foundedDate: '1988-03-21', address: '深圳市福田区益田路5033号平安金融中心' },
    { id: 't102', name: '平安寿险', level: 'first', capital: '338亿人民币', region: 'local', regionName: '深圳', industry: '保险', creditCode: '914403007109307395', foundedDate: '2002-12-17', address: '深圳市福田区益田路5033号平安金融中心' },
    { id: 't103', name: '平安产险', level: 'first', capital: '210亿人民币', region: 'local', regionName: '深圳', industry: '保险', creditCode: '914403007109307208', foundedDate: '2002-12-24', address: '深圳市福田区益田路5033号平安金融中心' },
  ],
  't2': [
    { id: 't201', name: '华为投资控股有限公司', level: 'core', capital: '340.5亿人民币', region: 'local', regionName: '深圳龙岗', industry: '通信设备', creditCode: '91440300192378788X', foundedDate: '1987-09-15', address: '深圳市龙岗区坂田华为基地' },
    { id: 't202', name: '华为技术', level: 'first', capital: '399亿人民币', region: 'local', regionName: '深圳', industry: '通信设备', creditCode: '91440300192376798M', foundedDate: '1987-09-15', address: '深圳市龙岗区坂田华为总部办公楼' },
    { id: 't203', name: '海思半导体', level: 'first', capital: '20亿人民币', region: 'local', regionName: '深圳', industry: '芯片', creditCode: '91440300710926283X', foundedDate: '2004-10-29', address: '深圳市龙岗区坂田华为基地H区' },
  ],
  't3': [
    { id: 't301', name: '腾讯控股有限公司', level: 'core', capital: '1000万港元', region: 'local', regionName: '深圳南山', industry: '互联网', creditCode: '91440300708486197T', foundedDate: '1998-11-11', address: '深圳市南山区海天二路33号腾讯滨海大厦' },
    { id: 't302', name: '腾讯计算机', level: 'first', capital: '6500万人民币', region: 'local', regionName: '深圳', industry: '互联网', creditCode: '9144030071526726XG', foundedDate: '1998-11-11', address: '深圳市南山区高新区科技中一路腾讯大厦' },
    { id: 't303', name: '腾讯音乐', level: 'first', capital: '5000万美元', region: 'local', regionName: '深圳', industry: '数字娱乐', creditCode: '91440300MA5F2M3G8N', foundedDate: '2016-07-04', address: '深圳市南山区科技园科技中一路腾讯大厦' },
  ],
  't6': [
    { id: 't601', name: '比亚迪股份有限公司', level: 'core', capital: '29.1亿人民币', region: 'local', regionName: '深圳坪山', industry: '新能源汽车', creditCode: '91440300192345815X', foundedDate: '1995-02-10', address: '深圳市坪山区比亚迪路3009号' },
    { id: 't602', name: '比亚迪汽车', level: 'first', capital: '43.8亿人民币', region: 'outside', regionName: '西安', industry: '汽车制造', creditCode: '91610131735084619X', foundedDate: '1997-03-21', address: '西安市高新区新型工业园亚迪路2号' },
    { id: 't603', name: '弗迪电池', level: 'first', capital: '10亿人民币', region: 'local', regionName: '深圳', industry: '电池', creditCode: '91440300MA5G8G8R2L', foundedDate: '2019-05-05', address: '深圳市坪山区坑梓街道比亚迪路3009号' },
  ],
};

// 区域选项
export const regionOptions = [
  { value: '全市', label: '全市' },
  { value: '南山区', label: '南山区' },
  { value: '福田区', label: '福田区' },
  { value: '宝安区', label: '宝安区' },
  { value: '龙岗区', label: '龙岗区' },
  { value: '龙华区', label: '龙华区' },
  { value: '罗湖区', label: '罗湖区' },
  { value: '光明区', label: '光明区' },
  { value: '盐田区', label: '盐田区' },
  { value: '坪山区', label: '坪山区' },
];

// 级次映射配置（用于表格列）
export const levelMap = {
  'core': { text: '核心企业', color: 'blue' },
  'first': { text: '一级子公司', color: 'green' },
  'second': { text: '二级子公司', color: 'orange' },
  'associate': { text: '参股企业', color: 'default' },
};

// 默认成员数据
export const defaultMembers = memberCompaniesData['1'] || [];
