/**
 * 企业族群页面mock数据 - 前海真实版
 * 基于前海合作区实际情况构建，用于前海演示
 * 
 * 前海重点产业：金融、现代物流、信息服务、科技服务、总部经济
 */

// 辅助函数：将注册资本字符串转换为数值（万元）
export const parseCapitalToNumber = (capitalStr) => {
  if (!capitalStr) return 0;
  const num = parseFloat(capitalStr.replace(/[^0-9.]/g, ''));
  if (capitalStr.includes('亿美元')) return num * 7 * 10000;
  if (capitalStr.includes('万美元')) return num * 7;
  if (capitalStr.includes('亿港元')) return num * 0.9 * 10000;
  if (capitalStr.includes('万港元')) return num * 0.9;
  if (capitalStr.includes('亿人民币')) return num * 10000;
  if (capitalStr.includes('万人民币')) return num;
  return num;
};

// 集团系数据 - 在前海有实际布局的集团
export const groupList = [
  {
    id: '1',
    name: '平安系',
    coreCompany: '中国平安保险（集团）股份有限公司',
    count: 48,
    shenzhenCount: 32,
    totalCapital: '2800亿',
    owner: '马明哲',
    color: '#fa8c16',
    groupTotalRevenue: 11000,
    qianhaiRevenue: 4200,
    coreInfo: {
      foundedDate: '1988-03-21',
      registeredCapital: '182.8亿人民币',
      creditCode: '91440300192330789Y',
      address: '深圳市福田区益田路5033号平安金融中心',
      employees: '约28万人',
      industries: ['金融', '医疗', '科技'],
      email: 'contact@pingan.com.cn',
    }
  },
  {
    id: '2',
    name: '招商系',
    coreCompany: '招商局集团有限公司',
    count: 36,
    shenzhenCount: 28,
    totalCapital: '1800亿',
    owner: '缪建民',
    color: '#13c2c2',
    groupTotalRevenue: 4200,
    qianhaiRevenue: 1680,
    coreInfo: {
      foundedDate: '1872-12-26',
      registeredCapital: '169亿人民币',
      creditCode: '91110000100005220B',
      address: '深圳市南山区蛇口兴华路6号南海意库',
      employees: '约25万人',
      industries: ['港航物流', '金融', '地产'],
      email: 'contact@cmhk.com',
    }
  },
  {
    id: '3',
    name: '顺丰系',
    coreCompany: '顺丰控股股份有限公司',
    count: 28,
    shenzhenCount: 18,
    totalCapital: '320亿',
    owner: '王卫',
    color: '#f5222d',
    groupTotalRevenue: 2675,
    qianhaiRevenue: 680,
    coreInfo: {
      foundedDate: '1993-03-26',
      registeredCapital: '49亿人民币',
      creditCode: '91440300192350527A',
      address: '深圳市福田区益田路6009号',
      employees: '约50万人',
      industries: ['现代物流', '供应链', '航空'],
      email: 'contact@sf-express.com',
    }
  },
  {
    id: '4',
    name: '腾讯系',
    coreCompany: '腾讯控股有限公司',
    count: 42,
    shenzhenCount: 28,
    totalCapital: '850亿',
    owner: '马化腾',
    color: '#1677ff',
    groupTotalRevenue: 5601,
    qianhaiRevenue: 420,
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
    id: '5',
    name: '中信系',
    coreCompany: '中国中信集团有限公司',
    count: 24,
    shenzhenCount: 12,
    totalCapital: '1200亿',
    owner: '朱鹤新',
    color: '#722ed1',
    groupTotalRevenue: 6200,
    qianhaiRevenue: 280,
    coreInfo: {
      foundedDate: '1979-10-04',
      registeredCapital: '2053亿人民币',
      creditCode: '91110000101730960L',
      address: '北京市朝阳区新源南路6号京城大厦',
      employees: '约20万人',
      industries: ['综合金融', '先进制造', '新能源'],
      email: 'contact@citic.com',
    }
  },
  {
    id: '6',
    name: '华润系',
    coreCompany: '华润（集团）有限公司',
    count: 32,
    shenzhenCount: 22,
    totalCapital: '600亿',
    owner: '王祥明',
    color: '#1890ff',
    groupTotalRevenue: 6860,
    qianhaiRevenue: 520,
    coreInfo: {
      foundedDate: '1938-01-01',
      registeredCapital: '200亿人民币',
      creditCode: '91440300715233489N',
      address: '香港湾仔港湾道26号华润大厦',
      employees: '约37万人',
      industries: ['地产', '消费', '电力', '医药'],
      email: 'contact@crc.com.hk',
    }
  },
  {
    id: '7',
    name: '中集系',
    coreCompany: '中国国际海运集装箱（集团）股份有限公司',
    count: 22,
    shenzhenCount: 16,
    totalCapital: '380亿',
    owner: '麦伯良',
    color: '#fa541c',
    groupTotalRevenue: 1275,
    qianhaiRevenue: 420,
    coreInfo: {
      foundedDate: '1980-01-14',
      registeredCapital: '53.9亿人民币',
      creditCode: '91440300192356038P',
      address: '深圳市南山区蛇口工业区港湾大道2号',
      employees: '约6万人',
      industries: ['集装箱', '道路运输车辆', '能源装备', '海洋工程'],
      email: 'contact@cimc.com',
    }
  },
  {
    id: '8',
    name: '万科系',
    coreCompany: '万科企业股份有限公司',
    count: 26,
    shenzhenCount: 14,
    totalCapital: '420亿',
    owner: '郁亮',
    color: '#52c41a',
    groupTotalRevenue: 5038,
    qianhaiRevenue: 380,
    coreInfo: {
      foundedDate: '1984-05-30',
      registeredCapital: '116.3亿人民币',
      creditCode: '91440300192350002K',
      address: '深圳市盐田区大梅沙环梅路33号万科中心',
      employees: '约8万人',
      industries: ['房地产开发', '物业服务', '物流仓储', '商业运营'],
      email: 'contact@vanke.com',
    }
  },
  {
    id: '9',
    name: '微众银行系',
    coreCompany: '深圳前海微众银行股份有限公司',
    count: 12,
    shenzhenCount: 12,
    totalCapital: '42亿',
    owner: '顾敏',
    color: '#eb2f96',
    groupTotalRevenue: 380,
    qianhaiRevenue: 380,
    coreInfo: {
      foundedDate: '2014-12-16',
      registeredCapital: '42亿人民币',
      creditCode: '9144030031977063XH',
      address: '深圳市南山区桃园路田厦国际中心',
      employees: '约3000人',
      industries: ['数字银行', '金融科技'],
      email: 'contact@webank.com',
    }
  },
  {
    id: '10',
    name: '京东系',
    coreCompany: '京东集团股份有限公司',
    count: 18,
    shenzhenCount: 6,
    totalCapital: '300亿',
    owner: '刘强东',
    color: '#f5222d',
    groupTotalRevenue: 10462,
    qianhaiRevenue: 180,
    coreInfo: {
      foundedDate: '1998-06-18',
      registeredCapital: '3亿人民币',
      creditCode: '9111030277265104XY',
      address: '北京市大兴区亦庄经济开发区科创十一街18号',
      employees: '约45万人',
      industries: ['电商', '物流', '科技', '健康'],
      email: 'contact@jd.com',
    }
  },
  {
    id: '11',
    name: '阿里系',
    coreCompany: '阿里巴巴集团控股有限公司',
    count: 22,
    shenzhenCount: 5,
    totalCapital: '500亿',
    owner: '张勇',
    color: '#fa8c16',
    groupTotalRevenue: 8687,
    qianhaiRevenue: 120,
    coreInfo: {
      foundedDate: '1999-06-28',
      registeredCapital: '50亿美元',
      creditCode: '91330100799655058B',
      address: '杭州市余杭区文一西路969号阿里巴巴西溪园区',
      employees: '约23万人',
      industries: ['电商', '云计算', '数字媒体', '金融科技'],
      email: 'contact@alibaba-inc.com',
    }
  },
  {
    id: '12',
    name: '卓越系',
    coreCompany: '卓越置业集团有限公司',
    count: 16,
    shenzhenCount: 12,
    totalCapital: '80亿',
    owner: '李华',
    color: '#13c2c2',
    groupTotalRevenue: 680,
    qianhaiRevenue: 280,
    coreInfo: {
      foundedDate: '1996-06-21',
      registeredCapital: '25亿人民币',
      creditCode: '91440300279304067K',
      address: '深圳市福田区金田路2030号卓越世纪中心',
      employees: '约8000人',
      industries: ['房地产开发', '商业运营', '物业管理'],
      email: 'contact@excegroup.com',
    }
  },
];

// 合并所有企业列表
export const allClanList = [...groupList];

// 成员企业数据 - 基于前海真实企业分布（新增revenue字段，单位：亿元）
export const memberCompaniesData = {
  // 平安系成员 - 前海营收4200亿
  '1': [
    // 前海本地企业（存量）- 营收总和4200亿
    { id: '101', name: '中国平安保险（集团）股份有限公司', level: 'core', capital: '182.8亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 1200, creditCode: '91440300192350207W', foundedDate: '1988-03-21', address: '深圳市福田区益田路5033号平安金融中心' },
    { id: '102', name: '平安银行股份有限公司', level: 'first', capital: '194亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 980, creditCode: '91440300192185379H', foundedDate: '1987-12-22', address: '深圳市罗湖区深南东路5047号平安银行大厦' },
    { id: '103', name: '平安证券股份有限公司', level: 'first', capital: '138亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 580, creditCode: '914403001000234534', foundedDate: '1996-07-18', address: '深圳市福田区福田街道益田路5033号平安金融中心' },
    { id: '104', name: '平安信托有限责任公司', level: 'first', capital: '130亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 420, creditCode: '914403001000171432', foundedDate: '1996-07-22', address: '深圳市福田区福田街道益田路5033号平安金融中心' },
    { id: '105', name: '深圳前海微众银行股份有限公司', level: 'first', capital: '42亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 380, creditCode: '9144030031977063XH', foundedDate: '2014-12-16', address: '深圳市南山区桃园路田厦国际中心' },
    { id: '106', name: '平安资产管理有限责任公司', level: 'first', capital: '15亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 220, creditCode: '91310000710935012N', foundedDate: '2005-05-27', address: '深圳市福田区益田路5033号平安金融中心' },
    { id: '107', name: '平安融资租赁有限公司', level: 'second', capital: '20亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 120, creditCode: '91310000059345678M', foundedDate: '2012-09-27', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '108', name: '平安创赢资本管理有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 85, creditCode: '91440300MA5D8N9R8K', foundedDate: '2016-08-15', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '109', name: '平安医疗健康管理股份有限公司', level: 'first', capital: '8亿人民币', region: 'local', regionName: '前海', industry: '卫生', revenue: 135, creditCode: '91440300MA5F8N9R7K', foundedDate: '2015-03-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '110', name: '平安智慧城市科技股份有限公司', level: 'second', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '信息技术', revenue: 80, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2018-09-20', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '111', name: '平安普惠融资担保有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '上海', industry: '金融', revenue: 0, creditCode: '91310000710934567M', foundedDate: '2024-06-15', address: '上海市浦东新区陆家嘴环路1333号' },
    { id: '112', name: '平安好医（杭州）投资管理有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '杭州', industry: '卫生', revenue: 0, creditCode: '91330110MA1G8Q3R8N', foundedDate: '2024-03-10', address: '杭州市滨江区网商路599号' },
    { id: '113', name: '平安科技（北京）有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '北京', industry: '软件', revenue: 0, creditCode: '91110108772556789L', foundedDate: '2024-11-20', address: '北京市朝阳区建国路88号' },
    { id: '114', name: '平安新能源科技（常州）有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '常州', industry: '电气机械', revenue: 0, creditCode: '91320400MA60DEFGHI', foundedDate: '2025-01-15', address: '常州市新北区长江北路' },
    { id: '115', name: '平安智能制造（苏州）有限公司', level: 'second', capital: '10亿人民币', region: 'outside', regionName: '苏州', industry: '制造', revenue: 0, creditCode: '91320500MA60JKLMNO', foundedDate: '2025-02-20', address: '苏州市工业园区星湖街' },
    { id: '116', name: '平安数字科技（成都）有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '成都', industry: '软件', revenue: 0, creditCode: '91510100MA60GHIJKL', foundedDate: '2025-03-18', address: '成都市高新区天府大道北段1480号' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '117', name: '平安养老保险股份有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '上海', industry: '金融', revenue: 380, creditCode: '91310000710945678M', foundedDate: '2004-12-13', address: '上海市浦东新区陆家嘴环路1333号' },
    { id: '118', name: '平安消费金融有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '重庆', industry: '金融', revenue: 220, creditCode: '91500100MA60ABCDEF', foundedDate: '2020-04-09', address: '重庆市渝北区黄山大道中段52号' },
    { id: '119', name: '平安理财有限责任公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '成都', industry: '金融', revenue: 165, creditCode: '91510100MA60GHIJKL', foundedDate: '2020-08-18', address: '成都市高新区天府大道北段1480号' },
    { id: '120', name: '平安资产管理（香港）有限公司', level: 'first', capital: '10亿港元', region: 'outside', regionName: '香港', industry: '金融', revenue: 280, creditCode: '-', foundedDate: '2005-08-10', address: '香港中环交易广场' },
    { id: '121', name: '平安证券（香港）有限公司', level: 'second', capital: '5亿港元', region: 'outside', regionName: '香港', industry: '金融', revenue: 125, creditCode: '-', foundedDate: '2006-03-15', address: '香港中环皇后大道中99号' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '122', name: '平安汽车制造有限公司', level: 'first', capital: '80亿人民币', region: 'outside', regionName: '合肥', industry: '制造', revenue: 450, creditCode: '91340100MA60XYZABC', foundedDate: '2018-05-20', address: '合肥市经开区繁华大道' },
    { id: '123', name: '平安新能源科技有限公司', level: 'first', capital: '60亿人民币', region: 'outside', regionName: '常州', industry: '电气机械', revenue: 320, creditCode: '91320400MA60DEFGHI', foundedDate: '2019-08-15', address: '常州市新北区长江北路' },
    { id: '124', name: '平安生物医药有限公司', level: 'first', capital: '45亿人民币', region: 'outside', regionName: '苏州', industry: '制造', revenue: 195, creditCode: '91320500MA60JKLMNO', foundedDate: '2017-11-10', address: '苏州市工业园区星湖街' },
    { id: '125', name: '平安半导体有限公司', level: 'second', capital: '30亿人民币', region: 'outside', regionName: '无锡', industry: '制造', revenue: 128, creditCode: '91320200MA60PQRSTU', foundedDate: '2020-02-28', address: '无锡市新吴区太湖大道' },
  ],
  
  // 招商系成员 - 前海营收1680亿
  '2': [
    // 前海本地企业（存量）- 营收总和1680亿
    { id: '201', name: '招商局集团有限公司', level: 'core', capital: '169亿人民币', region: 'local', regionName: '前海', industry: '物流运输', revenue: 420, creditCode: '914403001000123456', foundedDate: '1872-12-26', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '202', name: '招商银行股份有限公司', level: 'first', capital: '252.2亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 380, creditCode: '914403001000777777', foundedDate: '1987-03-31', address: '深圳市福田区深南大道7088号招商银行大厦' },
    { id: '203', name: '招商证券股份有限公司', level: 'first', capital: '86.9亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 220, creditCode: '91440300192350798X', foundedDate: '1991-08-01', address: '深圳市福田区福田街道福华一路111号' },
    { id: '204', name: '招商局蛇口工业区控股股份有限公司', level: 'first', capital: '79.2亿人民币', region: 'local', regionName: '前海', industry: '房地产', revenue: 280, creditCode: '91440300192345678M', foundedDate: '1992-02-19', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '205', name: '招商局港口集团股份有限公司', level: 'first', capital: '19.4亿人民币', region: 'local', regionName: '前海', industry: '水上运输', revenue: 185, creditCode: '91440300192378901M', foundedDate: '1991-06-18', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '206', name: '招商局通商融资租赁有限公司', level: 'second', capital: '30亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 65, creditCode: '91440300MA5F8N9R8K', foundedDate: '2016-11-08', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '207', name: '招商局资本投资有限责任公司', level: 'second', capital: '20亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 85, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2012-08-10', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '208', name: '招商积余物业管理有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '房地产', revenue: 45, creditCode: '91440300192345678M', foundedDate: '1985-05-03', address: '深圳市南山区蛇口兴华路6号南海意库' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '209', name: '中外运跨境电商物流有限公司', level: 'first', capital: '12亿人民币', region: 'outside', regionName: '上海', industry: '物流运输', revenue: 0, creditCode: '91310000MA1FL7R80D', foundedDate: '2024-01-15', address: '上海市浦东新区物流大道123号' },
    { id: '210', name: '招商局邮轮科技有限公司', level: 'first', capital: '8亿人民币', region: 'outside', regionName: '厦门', industry: '水上运输', revenue: 0, creditCode: '91350200MA1G8Q3R8N', foundedDate: '2024-08-20', address: '厦门市湖里区东港北路29号' },
    { id: '211', name: '招商局检测认证控股有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '重庆', industry: '软件', revenue: 0, creditCode: '91500100MA60ABCDEF', foundedDate: '2024-05-10', address: '重庆市江北区港城工业园' },
    { id: '212', name: '招商局智能制造（苏州）有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '苏州', industry: '制造', revenue: 0, creditCode: '91320500MA1H8Q3R8N', foundedDate: '2025-02-18', address: '苏州市工业园区招商智造园' },
    { id: '213', name: '招商局新能源科技（合肥）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '合肥', industry: '电气机械', revenue: 0, creditCode: '91340100MA1I8Q3R8N', foundedDate: '2025-03-22', address: '合肥市经开区招商新能源基地' },
    { id: '214', name: '招商局数字科技（杭州）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1J8Q3R8N', foundedDate: '2025-04-15', address: '杭州市滨江区招商数字科技园' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '215', name: '招商局能源运输股份有限公司', level: 'first', capital: '81.1亿人民币', region: 'outside', regionName: '上海', industry: '水上运输', revenue: 420, creditCode: '91310000132201245M', foundedDate: '2004-12-31', address: '上海市浦东新区世纪大道1589号长泰国际金融大厦' },
    { id: '216', name: '中国外运股份有限公司', level: 'first', capital: '72.5亿人民币', region: 'outside', regionName: '北京', industry: '物流运输', revenue: 580, creditCode: '91110000100012345M', foundedDate: '2002-11-20', address: '北京市朝阳区安定路5号院10号楼' },
    { id: '217', name: '招商局创新科技（集团）有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '香港', industry: '信息技术', revenue: 85, creditCode: '-', foundedDate: '2019-01-08', address: '香港干诺道中168-200号信德中心' },
    { id: '218', name: '招商局太平湾开发投资有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '大连', industry: '房地产', revenue: 42, creditCode: '91210200MA60UVWXYZ', foundedDate: '2020-09-20', address: '大连市瓦房店市太平湾临港经济区' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '219', name: '招商局重工（江苏）有限公司', level: 'first', capital: '40亿人民币', region: 'outside', regionName: '南通', industry: '制造', revenue: 320, creditCode: '91320600MA60ABCDEF', foundedDate: '2013-06-18', address: '南通市海门区长江路' },
    { id: '220', name: '招商局新材料科技有限公司', level: 'second', capital: '15亿人民币', region: 'outside', regionName: '宁波', industry: '制造', revenue: 125, creditCode: '91330200MA60GHIJKL', foundedDate: '2018-09-15', address: '宁波市北仑区新碶街道' },
    { id: '221', name: '招商局智能装备有限公司', level: 'second', capital: '12亿人民币', region: 'outside', regionName: '东莞', industry: '通用设备', revenue: 98, creditCode: '91441900MA60MNOPQR', foundedDate: '2019-11-20', address: '东莞市松山湖高新区' },
  ],
  
  // 顺丰系成员 - 前海营收680亿
  '3': [
    // 前海本地企业（存量）- 营收总和680亿
    { id: '301', name: '顺丰控股股份有限公司', level: 'core', capital: '49亿人民币', region: 'local', regionName: '前海', industry: '物流运输', revenue: 280, creditCode: '91440300192345892M', foundedDate: '1993-03-26', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '302', name: '深圳顺丰泰森控股（集团）有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '物流运输', revenue: 180, creditCode: '91440300MA5D8N9R8K', foundedDate: '2013-08-21', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '303', name: '顺丰速运有限公司', level: 'first', capital: '1.5亿人民币', region: 'local', regionName: '前海', industry: '物流运输', revenue: 120, creditCode: '91440300715245678M', foundedDate: '2013-07-25', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '304', name: '顺丰航空有限公司', level: 'first', capital: '15亿人民币', region: 'local', regionName: '前海', industry: '装卸搬运仓储', revenue: 45, creditCode: '91440300680356789M', foundedDate: '2009-02-09', address: '深圳市宝安区国际机场航站四路1111号' },
    { id: '305', name: '顺丰同城实业股份有限公司', level: 'first', capital: '9.4亿人民币', region: 'local', regionName: '前海', industry: '装卸搬运仓储', revenue: 25, creditCode: '91440300MA5G8G8R8N', foundedDate: '2019-06-21', address: '深圳市福田区华富街道莲花一村社区皇岗路5001号' },
    { id: '306', name: '顺丰供应链有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '物流运输', revenue: 18, creditCode: '91440300MA5F8N9R8K', foundedDate: '2015-08-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '307', name: '顺丰科技有限公司', level: 'second', capital: '8亿人民币', region: 'local', regionName: '前海', industry: '软件', revenue: 12, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2009-04-07', address: '深圳市南山区高新南一道飞亚达大厦' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '308', name: '顺丰冷链物流有限公司', level: 'first', capital: '12亿人民币', region: 'outside', regionName: '上海', industry: '装卸搬运仓储', revenue: 0, creditCode: '91310000MA1FL7R80D', foundedDate: '2024-04-15', address: '上海市青浦区华新镇华隆路1758号' },
    { id: '309', name: '顺丰无人机科技有限公司', level: 'first', capital: '8亿人民币', region: 'outside', regionName: '赣州', industry: '软件', revenue: 0, creditCode: '91360700MA1G8Q3R8N', foundedDate: '2024-09-10', address: '江西省赣州市南康区龙岭镇' },
    { id: '310', name: '顺丰跨境电子商务（广州）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '广州', industry: '批发零售', revenue: 0, creditCode: '91440101MA1G8Q3R8N', foundedDate: '2024-06-20', address: '广州市花都区花东镇机场大道' },
    { id: '311', name: '顺丰智能制造（苏州）有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '苏州', industry: '通用设备', revenue: 0, creditCode: '91320500MA1H8Q3R8N', foundedDate: '2025-01-18', address: '苏州市工业园区顺丰智造园' },
    { id: '312', name: '顺丰新能源物流车有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '西安', industry: '电气机械', revenue: 0, creditCode: '91610100MA60MNOPQR', foundedDate: '2025-02-28', address: '西安市高新区锦业路' },
    { id: '313', name: '顺丰智慧供应链（青岛）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '青岛', industry: '多式联运', revenue: 0, creditCode: '91370200MA1O8Q3R8N', foundedDate: '2025-03-22', address: '青岛市西海岸新区顺丰智慧供应链中心' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '314', name: '嘉里物流联网有限公司', level: 'associate', capital: '10亿港元', region: 'outside', regionName: '香港', industry: '装卸搬运仓储', revenue: 520, creditCode: '-', foundedDate: '1981-04-16', address: '香港新界葵涌货柜码头南路88号嘉里货仓' },
    { id: '315', name: 'Flexport飞协博国际货运代理（上海）有限公司', level: 'associate', capital: '2亿美元', region: 'outside', regionName: '上海', industry: '物流运输', revenue: 180, creditCode: '91310000MA1FL7R80D', foundedDate: '2013-01-01', address: '上海市浦东新区陆家嘴环路1000号' },
    { id: '316', name: '顺心捷达物流有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '广州', industry: '物流运输', revenue: 156, creditCode: '91440101MA60ABCDEF', foundedDate: '2018-03-15', address: '广州市白云区太和镇' },
    { id: '317', name: '丰巢科技有限公司', level: 'associate', capital: '25亿人民币', region: 'outside', regionName: '深圳', industry: '软件', revenue: 45, creditCode: '91440300MA5D8N9R8K', foundedDate: '2015-06-06', address: '深圳市南山区科技园' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '318', name: '顺丰智能制造有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '苏州', industry: '通用设备', revenue: 128, creditCode: '91320500MA60GHIJKL', foundedDate: '2019-07-20', address: '苏州市工业园区星龙街' },
    { id: '319', name: '顺丰航空货运有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '杭州', industry: '物流运输', revenue: 95, creditCode: '91330100MA60STUVWX', foundedDate: '2020-11-10', address: '杭州市萧山国际机场' },
  ],
  
  // 腾讯系成员 - 前海营收420亿
  '4': [
    // 前海本地企业（存量）- 营收总和420亿
    { id: '401', name: '腾讯控股有限公司', level: 'core', capital: '1000万港元', region: 'local', regionName: '前海', industry: '互联网', revenue: 180, creditCode: '91440300708486197T', foundedDate: '1998-11-11', address: '深圳市南山区海天二路33号腾讯滨海大厦' },
    { id: '402', name: '腾讯科技（深圳）有限公司', level: 'first', capital: '200亿人民币', region: 'local', regionName: '前海', industry: '信息技术', revenue: 95, creditCode: '91440300717867432W', foundedDate: '2000-02-24', address: '深圳市南山区科技园腾讯大厦' },
    { id: '403', name: '财付通支付科技有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '互联网', revenue: 68, creditCode: '91440300717867432W', foundedDate: '2005-04-20', address: '深圳市南山区科技园腾讯大厦' },
    { id: '404', name: '腾讯云计算（深圳）有限责任公司', level: 'first', capital: '50亿人民币', region: 'local', regionName: '前海', industry: '互联网', revenue: 45, creditCode: '91440300MA5D8N9R8K', foundedDate: '2010-09-15', address: '深圳市南山区科技园腾讯云大厦' },
    { id: '405', name: '腾讯音乐娱乐（深圳）有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '互联网', revenue: 22, creditCode: '91440300MA5F8N9R7K', foundedDate: '2016-07-12', address: '深圳市南山区科技园腾讯音乐大厦' },
    { id: '406', name: '腾讯影业有限公司', level: 'second', capital: '3亿人民币', region: 'local', regionName: '前海', industry: '文化娱乐', revenue: 10, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2015-09-08', address: '深圳市南山区科技园腾讯影业中心' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '407', name: '腾讯云智能（上海）有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '上海', industry: '互联网', revenue: 0, creditCode: '91310000MA1FL7R80D', foundedDate: '2024-02-18', address: '上海市浦东新区腾讯云智能中心' },
    { id: '408', name: '腾讯人工智能（北京）有限公司', level: 'first', capital: '12亿人民币', region: 'outside', regionName: '北京', industry: '软件', revenue: 0, creditCode: '91110000MA1G8Q3R8N', foundedDate: '2024-05-20', address: '北京市海淀区腾讯AI中心' },
    { id: '409', name: '腾讯数字科技（杭州）有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '杭州', industry: '软件', revenue: 0, creditCode: '91330100MA1H8Q3R8N', foundedDate: '2024-08-15', address: '杭州市余杭区腾讯数字科技园' },
    { id: '410', name: '腾讯智慧产业（成都）有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '成都', industry: '软件', revenue: 0, creditCode: '91510100MA1I8Q3R8N', foundedDate: '2025-01-22', address: '成都市高新区腾讯智慧产业园' },
    { id: '411', name: '腾讯云数据（贵阳）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '贵阳', industry: '信息技术', revenue: 0, creditCode: '91520100MA1J8Q3R8N', foundedDate: '2025-02-28', address: '贵阳市观山湖区腾讯云数据中心' },
    { id: '412', name: '腾讯创新科技（武汉）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '武汉', industry: '信息技术', revenue: 0, creditCode: '91420100MA1K8Q3R8N', foundedDate: '2025-03-18', address: '武汉市东湖高新区腾讯创新科技园' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '413', name: '腾讯科技（北京）有限公司', level: 'first', capital: '80亿人民币', region: 'outside', regionName: '北京', industry: '互联网', revenue: 680, creditCode: '91110000717867432W', foundedDate: '2005-06-20', address: '北京市海淀区西北旺东路10号院腾讯北京总部大楼' },
    { id: '414', name: '腾讯影业文化传播有限公司', level: 'second', capital: '10亿人民币', region: 'outside', regionName: '北京', industry: '文化娱乐', revenue: 125, creditCode: '91110000MA60ABCDEF', foundedDate: '2015-09-21', address: '北京市朝阳区腾讯影业中心' },
    { id: '415', name: '腾讯音乐娱乐集团', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '北京', industry: '文化娱乐', revenue: 280, creditCode: '91110000MA60GHIJKL', foundedDate: '2016-07-15', address: '北京市朝阳区腾讯音乐大厦' },
    { id: '416', name: '阅文集团有限公司', level: 'associate', capital: '10亿港元', region: 'outside', regionName: '香港', industry: '文化娱乐', revenue: 95, creditCode: '-', foundedDate: '2015-01-01', address: '香港湾仔腾讯大厦' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '417', name: '腾讯游戏（上海）有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '上海', industry: '文化娱乐', revenue: 520, creditCode: '91310000MA60MNOPQR', foundedDate: '2010-03-18', address: '上海市浦东新区腾讯游戏中心' },
    { id: '418', name: '腾讯电竞（杭州）有限公司', level: 'second', capital: '20亿人民币', region: 'outside', regionName: '杭州', industry: '文化娱乐', revenue: 165, creditCode: '91330100MA60STUVWX', foundedDate: '2018-06-22', address: '杭州市滨江区腾讯电竞产业园' },
    { id: '419', name: '腾讯智慧医疗（苏州）有限公司', level: 'second', capital: '15亿人民币', region: 'outside', regionName: '苏州', industry: '卫生', revenue: 85, creditCode: '91320500MA60YZABCD', foundedDate: '2019-09-10', address: '苏州市工业园区腾讯智慧医疗中心' },
  ],
  
  // 中信系成员 - 前海营收280亿
  '5': [
    // 前海本地企业（存量）- 营收总和280亿
    { id: '501', name: '中信证券股份有限公司', level: 'core', capital: '148.4亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 125, creditCode: '91440300710935012N', foundedDate: '1995-10-25', address: '深圳市福田区中心三路8号中信证券大厦' },
    { id: '502', name: '中信银行股份有限公司深圳分行', level: 'first', capital: '20亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 85, creditCode: '91440300717867432W', foundedDate: '2000-06-20', address: '深圳市福田区深南大道中信银行大厦' },
    { id: '503', name: '中信信托有限责任公司', level: 'first', capital: '12亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 42, creditCode: '91440300MA5D8N9R8K', foundedDate: '2004-08-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '504', name: '中信建投证券股份有限公司', level: 'first', capital: '8亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 18, creditCode: '91440300MA5F8N9R7K', foundedDate: '2005-11-02', address: '深圳市福田区中信建投大厦' },
    { id: '505', name: '中信资本控股有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 10, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2010-03-15', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '506', name: '中信智能制造（苏州）有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '苏州', industry: '通用设备', revenue: 0, creditCode: '91320500MA1H8Q3R8N', foundedDate: '2024-03-18', address: '苏州市工业园区中信智造园' },
    { id: '507', name: '中信新能源科技（合肥）有限公司', level: 'first', capital: '12亿人民币', region: 'outside', regionName: '合肥', industry: '制造', revenue: 0, creditCode: '91340100MA1I8Q3R8N', foundedDate: '2024-06-22', address: '合肥市经开区中信新能源基地' },
    { id: '508', name: '中信数字科技（杭州）有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1J8Q3R8N', foundedDate: '2024-09-15', address: '杭州市余杭区中信数字科技园' },
    { id: '509', name: '中信先进制造（东莞）有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '东莞', industry: '通用设备', revenue: 0, creditCode: '91441900MA1K8Q3R8N', foundedDate: '2025-01-20', address: '东莞市松山湖中信先进制造园' },
    { id: '510', name: '中信智慧城市（成都）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '成都', industry: '信息技术', revenue: 0, creditCode: '91510100MA1L8Q3R8N', foundedDate: '2025-02-28', address: '成都市高新区中信智慧城市中心' },
    { id: '511', name: '中信绿色能源（西安）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '西安', industry: '制造', revenue: 0, creditCode: '91610100MA1M8Q3R8N', foundedDate: '2025-03-22', address: '西安市高新区中信绿色能源基地' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '512', name: '中信银行股份有限公司', level: 'first', capital: '489.4亿人民币', region: 'outside', regionName: '北京', industry: '金融', revenue: 1850, creditCode: '91110000717867432W', foundedDate: '1995-05-10', address: '北京市东城区朝阳门北大街9号中信银行大厦' },
    { id: '513', name: '中信信托有限责任公司', level: 'first', capital: '100亿人民币', region: 'outside', regionName: '北京', industry: '金融', revenue: 420, creditCode: '91110000MA60ABCDEF', foundedDate: '2004-08-18', address: '北京市朝阳区中信信托大厦' },
    { id: '514', name: '中信保诚人寿保险有限公司', level: 'first', capital: '23.6亿人民币', region: 'outside', regionName: '北京', industry: '金融', revenue: 280, creditCode: '91110000MA60GHIJKL', foundedDate: '2000-09-28', address: '北京市朝阳区中信保诚大厦' },
    { id: '515', name: '中信资产管理有限公司', level: 'second', capital: '50亿人民币', region: 'outside', regionName: '北京', industry: '金融', revenue: 125, creditCode: '91110000MA60MNOPQR', foundedDate: '2010-03-15', address: '北京市朝阳区中信资产管理中心' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '516', name: '中信戴卡股份有限公司', level: 'first', capital: '30亿人民币', region: 'outside', regionName: '秦皇岛', industry: '汽车制造', revenue: 380, creditCode: '91330300MA60STUVWX', foundedDate: '1988-05-18', address: '秦皇岛市经济技术开发区中信戴卡产业园' },
    { id: '517', name: '中信重工机械股份有限公司', level: 'first', capital: '43.9亿人民币', region: 'outside', regionName: '洛阳', industry: '专用设备', revenue: 165, creditCode: '91410300MA60YZABCD', foundedDate: '2008-01-26', address: '洛阳市涧西区中信重工产业园' },
    { id: '518', name: '中信泰富特钢集团股份有限公司', level: 'first', capital: '45.6亿人民币', region: 'outside', regionName: '江阴', industry: '钢铁', revenue: 520, creditCode: '91320200MA60CDEFGH', foundedDate: '1993-05-18', address: '江阴市中信特钢产业园' },
    { id: '519', name: '中信海洋直升机股份有限公司', level: 'second', capital: '5.8亿人民币', region: 'outside', regionName: '天津', industry: '航空运输', revenue: 85, creditCode: '91120000MA60IJKLMN', foundedDate: '1999-02-11', address: '天津市滨海新区中信海直基地' },
  ],
  
  // 华润系成员 - 前海营收520亿
  '6': [
    // 前海本地企业（存量）- 营收总和520亿
    { id: '601', name: '华润万家有限公司', level: 'core', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '批发零售', revenue: 185, creditCode: '91440300717867432W', foundedDate: '1991-10-18', address: '深圳市罗湖区华润万家总部' },
    { id: '602', name: '华润置地（深圳）有限公司', level: 'first', capital: '50亿人民币', region: 'local', regionName: '前海', industry: '房地产', revenue: 125, creditCode: '91440300MA5D8N9R8K', foundedDate: '2000-06-20', address: '深圳市南山区华润置地大厦' },
    { id: '603', name: '华润三九医药股份有限公司', level: 'first', capital: '9.8亿人民币', region: 'local', regionName: '前海', industry: '制造', revenue: 85, creditCode: '91440300MA5F8N9R7K', foundedDate: '1999-04-21', address: '深圳市龙华区华润三九医药园' },
    { id: '604', name: '华润银行深圳分行', level: 'first', capital: '20亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 52, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2010-08-15', address: '深圳市福田区华润银行大厦' },
    { id: '605', name: '华润燃气（深圳）有限公司', level: 'second', capital: '8亿人民币', region: 'local', regionName: '前海', industry: '燃气供应', revenue: 38, creditCode: '91440300MA5H8Q3R8N', foundedDate: '2008-03-22', address: '深圳市南山区华润燃气中心' },
    { id: '606', name: '华润物业（深圳）有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '房地产', revenue: 22, creditCode: '91440300MA5J8Q3R8N', foundedDate: '2005-09-18', address: '深圳市南山区华润物业中心' },
    { id: '607', name: '华润创业有限公司', level: 'second', capital: '3亿人民币', region: 'local', regionName: '前海', industry: '批发业', revenue: 13, creditCode: '91440300MA5K8Q3R8N', foundedDate: '2012-05-10', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '608', name: '华润智慧科技（杭州）有限公司', level: 'first', capital: '12亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1J8Q3R8N', foundedDate: '2024-02-18', address: '杭州市余杭区华润智慧科技园' },
    { id: '609', name: '华润新能源（常州）有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '常州', industry: '电气机械', revenue: 0, creditCode: '91320400MA1K8Q3R8N', foundedDate: '2024-05-22', address: '常州市新北区华润新能源基地' },
    { id: '610', name: '华润智能制造（苏州）有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '苏州', industry: '制造', revenue: 0, creditCode: '91320500MA1L8Q3R8N', foundedDate: '2024-08-15', address: '苏州市工业园区华润智造园' },
    { id: '611', name: '华润数字科技（成都）有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '成都', industry: '信息技术', revenue: 0, creditCode: '91510100MA1M8Q3R8N', foundedDate: '2025-01-20', address: '成都市高新区华润数字科技园' },
    { id: '612', name: '华润健康产业（武汉）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '武汉', industry: '卫生', revenue: 0, creditCode: '91420100MA1N8Q3R8N', foundedDate: '2025-02-28', address: '武汉市东湖高新区华润健康产业园' },
    { id: '613', name: '华润绿色食品（青岛）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '青岛', industry: '批发零售', revenue: 0, creditCode: '91370200MA1O8Q3R8N', foundedDate: '2025-03-22', address: '青岛市西海岸新区华润绿色食品基地' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '614', name: '华润电力控股有限公司', level: 'first', capital: '100亿港元', region: 'outside', regionName: '香港', industry: '电力热力供应', revenue: 850, creditCode: '-', foundedDate: '2001-08-28', address: '香港湾仔华润大厦' },
    { id: '615', name: '华润燃气控股有限公司', level: 'first', capital: '50亿港元', region: 'outside', regionName: '香港', industry: '能源供应', revenue: 420, creditCode: '-', foundedDate: '2007-04-18', address: '香港湾仔华润大厦' },
    { id: '616', name: '华润啤酒（控股）有限公司', level: 'first', capital: '30亿港元', region: 'outside', regionName: '香港', industry: '批发零售', revenue: 320, creditCode: '-', foundedDate: '1993-12-01', address: '香港湾仔华润大厦' },
    { id: '617', name: '华润水泥控股有限公司', level: 'second', capital: '20亿港元', region: 'outside', regionName: '香港', industry: '建材', revenue: 185, creditCode: '-', foundedDate: '2003-03-28', address: '香港湾仔华润大厦' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '618', name: '华润微电子有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '无锡', industry: '电子设备制造', revenue: 280, creditCode: '91320200MA60PQRSTU', foundedDate: '2000-10-18', address: '无锡市新吴区华润微电子产业园' },
    { id: '619', name: '华润材料科技股份有限公司', level: 'first', capital: '35亿人民币', region: 'outside', regionName: '常州', industry: '化学原料和化学制品制造业', revenue: 165, creditCode: '91320400MA60UVWXYZ', foundedDate: '2008-06-22', address: '常州市新北区华润材料科技园' },
    { id: '620', name: '华润医疗器械（北京）有限公司', level: 'second', capital: '20亿人民币', region: 'outside', regionName: '北京', industry: '专业技术', revenue: 95, creditCode: '91110000MA60ABCDEF', foundedDate: '2015-09-10', address: '北京市大兴区华润医疗器械产业园' },
  ],
  
  // 中集系成员 - 前海营收420亿
  '7': [
    // 前海本地企业（存量）- 营收总和420亿
    { id: '701', name: '中国国际海运集装箱（集团）股份有限公司', level: 'core', capital: '53.9亿人民币', region: 'local', regionName: '前海', industry: '金属制品', revenue: 185, creditCode: '91440300192356038P', foundedDate: '1980-01-14', address: '深圳市南山区蛇口工业区港湾大道2号' },
    { id: '702', name: '中集车辆（集团）股份有限公司', level: 'first', capital: '20亿人民币', region: 'local', regionName: '前海', industry: '汽车制造', revenue: 95, creditCode: '91440300MA5D8N9R8K', foundedDate: '2002-03-18', address: '深圳市南山区蛇口工业区中集车辆中心' },
    { id: '703', name: '中集安瑞科控股有限公司', level: 'first', capital: '15亿人民币', region: 'local', regionName: '前海', industry: '电气机械', revenue: 72, creditCode: '91440300MA5F8N9R7K', foundedDate: '2004-08-22', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '704', name: '中集海洋工程有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '运输设备制造', revenue: 45, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2008-05-15', address: '深圳市南山区蛇口工业区中集海工基地' },
    { id: '705', name: '中集物流有限公司', level: 'second', capital: '8亿人民币', region: 'local', regionName: '前海', industry: '物流运输', revenue: 18, creditCode: '91440300MA5H8Q3R8N', foundedDate: '2010-09-20', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '706', name: '中集智能科技有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '信息技术', revenue: 5, creditCode: '91440300MA5J8Q3R8N', foundedDate: '2015-03-10', address: '深圳市南山区蛇口工业区中集智能中心' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '707', name: '中集智能制造（苏州）有限公司', level: 'first', capital: '12亿人民币', region: 'outside', regionName: '苏州', industry: '制造', revenue: 0, creditCode: '91320500MA1H8Q3R8N', foundedDate: '2024-03-18', address: '苏州市工业园区中集智造园' },
    { id: '708', name: '中集新能源科技（常州）有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '常州', industry: '电气机械', revenue: 0, creditCode: '91320400MA1I8Q3R8N', foundedDate: '2024-06-22', address: '常州市新北区中集新能源基地' },
    { id: '709', name: '中集数字科技（杭州）有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1J8Q3R8N', foundedDate: '2024-09-15', address: '杭州市余杭区中集数字科技园' },
    { id: '710', name: '中集智慧物流（青岛）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '青岛', industry: '物流运输', revenue: 0, creditCode: '91370200MA1K8Q3R8N', foundedDate: '2025-01-20', address: '青岛市西海岸新区中集智慧物流中心' },
    { id: '711', name: '中集绿色装备（合肥）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '合肥', industry: '装备制造', revenue: 0, creditCode: '91340100MA1L8Q3R8N', foundedDate: '2025-02-28', address: '合肥市经开区中集绿色装备基地' },
    { id: '712', name: '中集冷链科技（武汉）有限公司', level: 'second', capital: '3亿人民币', region: 'outside', regionName: '武汉', industry: '装备制造', revenue: 0, creditCode: '91420100MA1M8Q3R8N', foundedDate: '2025-03-22', address: '武汉市东西湖区中集冷链科技园' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '713', name: '中集集装箱控股有限公司', level: 'first', capital: '30亿港元', region: 'outside', regionName: '香港', industry: '集装箱', revenue: 380, creditCode: '-', foundedDate: '1994-02-18', address: '香港中环中集大厦' },
    { id: '714', name: '中集车辆（美国）有限公司', level: 'associate', capital: '2亿美元', region: 'outside', regionName: '美国', industry: '道路运输车辆', revenue: 165, creditCode: '-', foundedDate: '2006-08-22', address: '美国芝加哥中集车辆中心' },
    { id: '715', name: '中集来福士海洋工程有限公司', level: 'first', capital: '25亿人民币', region: 'outside', regionName: '烟台', industry: '海洋工程', revenue: 125, creditCode: '91370600MA60ABCDEF', foundedDate: '1977-05-18', address: '烟台市芝罘岛中集来福士基地' },
    { id: '716', name: '中集安瑞环科技股份有限公司', level: 'second', capital: '15亿人民币', region: 'outside', regionName: '南通', industry: '能源装备', revenue: 85, creditCode: '91320600MA60GHIJKL', foundedDate: '2010-06-15', address: '南通市海门区中集安瑞环产业园' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '717', name: '中集德立物流系统（苏州）有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '苏州', industry: '制造', revenue: 128, creditCode: '91320500MA60MNOPQR', foundedDate: '2015-08-20', address: '苏州市工业园区中集德立产业园' },
    { id: '718', name: '中集新材料（东莞）有限公司', level: 'second', capital: '12亿人民币', region: 'outside', regionName: '东莞', industry: '新材料', revenue: 95, creditCode: '91441900MA60STUVWX', foundedDate: '2018-03-10', address: '东莞市松山湖高新区中集新材料基地' },
  ],
  
  // 万科系成员 - 前海营收380亿
  '8': [
    // 前海本地企业（存量）- 营收总和380亿
    { id: '801', name: '万科企业股份有限公司', level: 'core', capital: '116.3亿人民币', region: 'local', regionName: '前海', industry: '房地产', revenue: 165, creditCode: '91440300192350002K', foundedDate: '1984-05-30', address: '深圳市盐田区大梅沙环梅路33号万科中心' },
    { id: '802', name: '万科物业发展股份有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '房地产', revenue: 85, creditCode: '91440300MA5D8N9R8K', foundedDate: '1990-12-01', address: '深圳市福田区万科物业中心' },
    { id: '803', name: '万科物流发展有限公司', level: 'first', capital: '15亿人民币', region: 'local', regionName: '前海', industry: '装卸搬运仓储', revenue: 62, creditCode: '91440300MA5F8N9R7K', foundedDate: '2015-06-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '804', name: '万科商业发展有限公司', level: 'first', capital: '8亿人民币', region: 'local', regionName: '前海', industry: '商务服务', revenue: 45, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2010-03-22', address: '深圳市福田区万科商业中心' },
    { id: '805', name: '万科酒店管理有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '商务服务', revenue: 18, creditCode: '91440300MA5H8Q3R8N', foundedDate: '2008-09-15', address: '深圳市南山区万科酒店管理公司' },
    { id: '806', name: '万科教育发展有限公司', level: 'second', capital: '3亿人民币', region: 'local', regionName: '前海', industry: '教育', revenue: 5, creditCode: '91440300MA5J8Q3R8N', foundedDate: '2015-05-10', address: '深圳市福田区万科教育中心' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '807', name: '万科智慧社区（杭州）有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1J8Q3R8N', foundedDate: '2024-02-18', address: '杭州市余杭区万科智慧社区中心' },
    { id: '808', name: '万科长租公寓（上海）有限公司', level: 'first', capital: '8亿人民币', region: 'outside', regionName: '上海', industry: '房地产', revenue: 0, creditCode: '91310000MA1K8Q3R8N', foundedDate: '2024-05-22', address: '上海市浦东新区万科长租公寓中心' },
    { id: '809', name: '万科康养产业（成都）有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '成都', industry: '卫生', revenue: 0, creditCode: '91510100MA1L8Q3R8N', foundedDate: '2024-08-15', address: '成都市高新区万科康养产业园' },
    { id: '810', name: '万科智慧物流（苏州）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '苏州', industry: '装卸搬运仓储', revenue: 0, creditCode: '91320500MA1M8Q3R8N', foundedDate: '2025-01-20', address: '苏州市工业园区万科智慧物流园' },
    { id: '811', name: '万科绿色建筑（武汉）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '武汉', industry: '房地产', revenue: 0, creditCode: '91420100MA1N8Q3R8N', foundedDate: '2025-02-28', address: '武汉市东湖高新区万科绿色建筑中心' },
    { id: '812', name: '万科文旅产业（青岛）有限公司', level: 'second', capital: '3亿人民币', region: 'outside', regionName: '青岛', industry: '商务服务', revenue: 0, creditCode: '91370200MA1O8Q3R8N', foundedDate: '2025-03-22', address: '青岛市西海岸新区万科文旅产业园' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '813', name: '万科（北京）企业有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '北京', industry: '房地产', revenue: 680, creditCode: '91110000717867432W', foundedDate: '1993-06-18', address: '北京市朝阳区万科北京中心' },
    { id: '814', name: '万科（上海）企业有限公司', level: 'first', capital: '45亿人民币', region: 'outside', regionName: '上海', industry: '房地产', revenue: 520, creditCode: '91310000MA60ABCDEF', foundedDate: '1994-08-22', address: '上海市浦东新区万科上海中心' },
    { id: '815', name: '万科（杭州）企业有限公司', level: 'first', capital: '35亿人民币', region: 'outside', regionName: '杭州', industry: '房地产', revenue: 380, creditCode: '91330100MA60GHIJKL', foundedDate: '1995-10-15', address: '杭州市余杭区万科杭州中心' },
    { id: '816', name: '万科（广州）企业有限公司', level: 'second', capital: '25亿人民币', region: 'outside', regionName: '广州', industry: '房地产', revenue: 165, creditCode: '91440100MA60MNOPQR', foundedDate: '1996-03-18', address: '广州市天河区万科广州中心' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '817', name: '万科冰雪事业部（吉林）有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '吉林', industry: '文化娱乐', revenue: 128, creditCode: '91220200MA60STUVWX', foundedDate: '2018-06-22', address: '吉林市万科松花湖度假区' },
    { id: '818', name: '万科海外发展有限公司', level: 'second', capital: '15亿人民币', region: 'outside', regionName: '香港', industry: '房地产', revenue: 95, creditCode: '-', foundedDate: '2015-09-10', address: '香港中环万科海外中心' },
  ],
  
  // 微众银行系成员 - 前海营收380亿
  '9': [
    // 前海本地企业（存量）- 营收总和380亿
    { id: '901', name: '深圳前海微众银行股份有限公司', level: 'core', capital: '42亿人民币', region: 'local', regionName: '前海', industry: '互联网', revenue: 220, creditCode: '9144030031977063XH', foundedDate: '2014-12-16', address: '深圳市南山区桃园路田厦国际中心' },
    { id: '902', name: '微众科技有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '互联网', revenue: 85, creditCode: '91440300MA5D8N9R8K', foundedDate: '2016-03-22', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '903', name: '微众信用服务有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 45, creditCode: '91440300MA5F8N9R7K', foundedDate: '2017-08-15', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '904', name: '微众数据科技有限公司', level: 'second', capital: '3亿人民币', region: 'local', regionName: '前海', industry: '信息技术', revenue: 22, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2018-05-10', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '905', name: '微众人工智能有限公司', level: 'second', capital: '2亿人民币', region: 'local', regionName: '前海', industry: '信息技术', revenue: 8, creditCode: '91440300MA5H8Q3R8N', foundedDate: '2019-09-18', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '906', name: '微众数字科技（杭州）有限公司', level: 'first', capital: '8亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1J8Q3R8N', foundedDate: '2024-03-18', address: '杭州市余杭区微众数字科技园' },
    { id: '907', name: '微众云计算（上海）有限公司', level: 'first', capital: '6亿人民币', region: 'outside', regionName: '上海', industry: '互联网', revenue: 0, creditCode: '91310000MA1K8Q3R8N', foundedDate: '2024-06-22', address: '上海市浦东新区微众云计算中心' },
    { id: '908', name: '微众区块链科技（北京）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '北京', industry: '信息技术', revenue: 0, creditCode: '91110000MA1L8Q3R8N', foundedDate: '2024-09-15', address: '北京市海淀区微众区块链中心' },
    { id: '909', name: '微众智慧金融（成都）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '成都', industry: '互联网', revenue: 0, creditCode: '91510100MA1M8Q3R8N', foundedDate: '2025-01-20', address: '成都市高新区微众智慧金融中心' },
    { id: '910', name: '微众创新科技（苏州）有限公司', level: 'second', capital: '3亿人民币', region: 'outside', regionName: '苏州', industry: '信息技术', revenue: 0, creditCode: '91320500MA1N8Q3R8N', foundedDate: '2025-02-28', address: '苏州市工业园区微众创新科技园' },
    { id: '911', name: '微众数据服务（武汉）有限公司', level: 'second', capital: '2亿人民币', region: 'outside', regionName: '武汉', industry: '信息技术', revenue: 0, creditCode: '91420100MA1O8Q3R8N', foundedDate: '2025-03-22', address: '武汉市东湖高新区微众数据服务中心' },
    
    // 外地高营收企业（存量外流）- 现金牛（微众银行主要业务在前海，外地业务较少）
    { id: '912', name: '微众银行（香港）有限公司', level: 'first', capital: '10亿港元', region: 'outside', regionName: '香港', industry: '金融', revenue: 85, creditCode: '-', foundedDate: '2018-06-15', address: '香港中环微众银行中心' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '913', name: '微众消费金融（上海）有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '上海', industry: '金融', revenue: 120, creditCode: '91310000MA60ABCDEF', foundedDate: '2019-03-18', address: '上海市浦东新区微众消费金融中心' },
    { id: '914', name: '微众财富管理（北京）有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '北京', industry: '金融', revenue: 65, creditCode: '91110000MA60GHIJKL', foundedDate: '2020-06-22', address: '北京市朝阳区微众财富管理中心' },
  ],
  
  // 京东系成员 - 前海营收约180亿
  '10': [
    // 前海本地企业（存量）- 营收总和约180亿
    { id: '1001', name: '京东集团华南总部', level: 'core', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '互联网', revenue: 65, creditCode: '91440300MA5D8N9R8K', foundedDate: '2015-06-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1002', name: '京东物流华南有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '物流运输', revenue: 42, creditCode: '91440300MA5F8N9R7K', foundedDate: '2017-03-22', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1003', name: '京东科技（深圳）有限公司', level: 'first', capital: '3亿人民币', region: 'local', regionName: '前海', industry: '信息技术', revenue: 28, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2018-09-10', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1004', name: '京东健康华南运营中心', level: 'second', capital: '2亿人民币', region: 'local', regionName: '前海', industry: '卫生', revenue: 18, creditCode: '91440300MA5H8Q3R8N', foundedDate: '2019-05-15', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1005', name: '京东云计算（深圳）有限公司', level: 'second', capital: '1.5亿人民币', region: 'local', regionName: '前海', industry: '信息技术', revenue: 15, creditCode: '91440300MA5J8Q3R8N', foundedDate: '2020-03-20', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1006', name: '京东数科深圳分公司', level: 'second', capital: '8000万人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 12, creditCode: '91440300MA5K8Q3R8N', foundedDate: '2020-08-12', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '1007', name: '京东智能产业园（上海）有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '上海', industry: '房地产', revenue: 0, creditCode: '91310000MA1FL7R80D', foundedDate: '2024-01-15', address: '上海市嘉定区京东智能产业园' },
    { id: '1008', name: '京东物流华北枢纽有限公司', level: 'first', capital: '12亿人民币', region: 'outside', regionName: '北京', industry: '物流运输', revenue: 0, creditCode: '91110000MA1G8Q3R8N', foundedDate: '2024-03-20', address: '北京市大兴区京东物流园' },
    { id: '1009', name: '京东智能制造（苏州）有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '苏州', industry: '制造', revenue: 0, creditCode: '91320500MA1H8Q3R8N', foundedDate: '2024-05-10', address: '苏州市工业园区京东智造园' },
    { id: '1010', name: '京东云计算（杭州）有限公司', level: 'first', capital: '8亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1I8Q3R8N', foundedDate: '2024-06-18', address: '杭州市余杭区京东云计算中心' },
    { id: '1011', name: '京东健康产业（成都）有限公司', level: 'first', capital: '6亿人民币', region: 'outside', regionName: '成都', industry: '卫生', revenue: 0, creditCode: '91510100MA1J8Q3R8N', foundedDate: '2024-08-22', address: '成都市高新区京东健康产业园' },
    { id: '1012', name: '京东新能源科技（合肥）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '合肥', industry: '电气机械', revenue: 0, creditCode: '91340100MA1K8Q3R8N', foundedDate: '2024-09-15', address: '合肥市经开区京东新能源基地' },
    { id: '1013', name: '京东跨境电商（广州）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '广州', industry: '批发零售', revenue: 0, creditCode: '91440100MA1L8Q3R8N', foundedDate: '2025-01-10', address: '广州市南沙区京东跨境电商园' },
    { id: '1014', name: '京东冷链物流（武汉）有限公司', level: 'second', capital: '3.5亿人民币', region: 'outside', regionName: '武汉', industry: '物流运输', revenue: 0, creditCode: '91420100MA1M8Q3R8N', foundedDate: '2025-02-28', address: '武汉市东西湖区京东冷链中心' },
    { id: '1015', name: '京东数字科技（南京）有限公司', level: 'second', capital: '3亿人民币', region: 'outside', regionName: '南京', industry: '金融', revenue: 0, creditCode: '91320100MA1N8Q3R8N', foundedDate: '2025-03-18', address: '南京市建邺区京东数字科技园' },
    { id: '1016', name: '京东智慧供应链（青岛）有限公司', level: 'second', capital: '2.5亿人民币', region: 'outside', regionName: '青岛', industry: '物流运输', revenue: 0, creditCode: '91370200MA1O8Q3R8N', foundedDate: '2025-04-22', address: '青岛市西海岸新区京东智慧供应链中心' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '1017', name: '京东零售集团', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '北京', industry: '批发零售', revenue: 5800, creditCode: '9111030277265104XY', foundedDate: '1998-06-18', address: '北京市大兴区亦庄经济开发区科创十一街18号' },
    { id: '1018', name: '京东物流股份有限公司', level: 'first', capital: '30亿人民币', region: 'outside', regionName: '北京', industry: '物流运输', revenue: 1650, creditCode: '9111030277265104XZ', foundedDate: '2012-08-17', address: '北京市大兴区亦庄经济开发区科创十一街18号' },
    { id: '1019', name: '京东科技控股股份有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '北京', industry: '信息技术', revenue: 420, creditCode: '9111030277265104YA', foundedDate: '2013-09-01', address: '北京市大兴区亦庄经济开发区科创十一街18号' },
    { id: '1020', name: '京东健康股份有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '北京', industry: '卫生', revenue: 380, creditCode: '9111030277265104YB', foundedDate: '2019-05-10', address: '北京市大兴区亦庄经济开发区科创十一街18号' },
    { id: '1021', name: '京东工业品有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '上海', industry: '批发零售', revenue: 285, creditCode: '91310000MA1FL7R80E', foundedDate: '2018-03-15', address: '上海市嘉定区京东工业品中心' },
    { id: '1022', name: '京东数科（上海）有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '上海', industry: '金融', revenue: 156, creditCode: '91310000MA1FL7R80F', foundedDate: '2016-07-20', address: '上海市浦东新区京东数科中心' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '1023', name: '京东智能制造（东莞）有限公司', level: 'first', capital: '25亿人民币', region: 'outside', regionName: '东莞', industry: '制造', revenue: 320, creditCode: '91441900MA60ABCDEF', foundedDate: '2020-06-15', address: '东莞市松山湖高新区京东智造园' },
    { id: '1024', name: '京东汽车服务有限公司', level: 'first', capital: '18亿人民币', region: 'outside', regionName: '天津', industry: '居民服务', revenue: 195, creditCode: '91120000MA60GHIJKL', foundedDate: '2021-03-22', address: '天津市武清区京东汽车服务园' },
    { id: '1025', name: '京东国际跨境贸易（杭州）有限公司', level: 'second', capital: '12亿人民币', region: 'outside', regionName: '杭州', industry: '批发零售', revenue: 168, creditCode: '91330100MA60MNOPQR', foundedDate: '2020-09-18', address: '杭州市滨江区京东国际中心' },
    { id: '1026', name: '京东农业科技（寿光）有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '潍坊', industry: '农林牧渔', revenue: 95, creditCode: '91370700MA60STUVWX', foundedDate: '2021-06-10', address: '寿光市京东农业科技园' },
  ],
  
  // 阿里系成员 - 前海营收120亿
  '11': [
    // 前海本地企业（存量）- 营收总和120亿
    { id: '1101', name: '阿里巴巴（深圳）技术有限公司', level: 'core', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '互联网', revenue: 45, creditCode: '91440300MA5D8N9R8K', foundedDate: '2015-06-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1102', name: '阿里云计算（深圳）有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '互联网', revenue: 35, creditCode: '91440300MA5F8N9R7K', foundedDate: '2016-03-22', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1103', name: '蚂蚁金服（深圳）信息技术有限公司', level: 'first', capital: '3亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 22, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2017-08-15', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1104', name: '阿里健康科技（深圳）有限公司', level: 'second', capital: '2亿人民币', region: 'local', regionName: '前海', industry: '卫生', revenue: 12, creditCode: '91440300MA5H8Q3R8N', foundedDate: '2018-05-10', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '1105', name: '阿里本地生活（深圳）有限公司', level: 'second', capital: '1亿人民币', region: 'local', regionName: '前海', industry: '居民服务', revenue: 6, creditCode: '91440300MA5J8Q3R8N', foundedDate: '2019-09-18', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '1106', name: '阿里云智能（上海）有限公司', level: 'first', capital: '12亿人民币', region: 'outside', regionName: '上海', industry: '互联网', revenue: 0, creditCode: '91310000MA1J8Q3R8N', foundedDate: '2024-02-18', address: '上海市浦东新区阿里云智能中心' },
    { id: '1107', name: '阿里巴巴数字科技（北京）有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '北京', industry: '信息技术', revenue: 0, creditCode: '91110000MA1K8Q3R8N', foundedDate: '2024-05-22', address: '北京市朝阳区阿里巴巴数字科技园' },
    { id: '1108', name: '阿里人工智能（杭州）有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1L8Q3R8N', foundedDate: '2024-08-15', address: '杭州市余杭区阿里人工智能中心' },
    { id: '1109', name: '阿里智慧物流（苏州）有限公司', level: 'second', capital: '6亿人民币', region: 'outside', regionName: '苏州', industry: '物流运输', revenue: 0, creditCode: '91320500MA1M8Q3R8N', foundedDate: '2025-01-20', address: '苏州市工业园区阿里智慧物流园' },
    { id: '1110', name: '阿里新能源科技（合肥）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '合肥', industry: '电气机械', revenue: 0, creditCode: '91340100MA1N8Q3R8N', foundedDate: '2025-02-28', address: '合肥市经开区阿里新能源基地' },
    { id: '1111', name: '阿里数字健康（成都）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '成都', industry: '卫生', revenue: 0, creditCode: '91510100MA1O8Q3R8N', foundedDate: '2025-03-22', address: '成都市高新区阿里数字健康园' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '1112', name: '阿里巴巴集团控股有限公司', level: 'core', capital: '50亿美元', region: 'outside', regionName: '杭州', industry: '互联网', revenue: 5200, creditCode: '91330100799655058B', foundedDate: '1999-06-28', address: '杭州市余杭区文一西路969号阿里巴巴西溪园区' },
    { id: '1113', name: '蚂蚁科技集团股份有限公司', level: 'first', capital: '350亿人民币', region: 'outside', regionName: '杭州', industry: '金融', revenue: 1180, creditCode: '91330100MA60ABCDEF', foundedDate: '2004-12-08', address: '杭州市西湖区万塘路18号蚂蚁Z空间' },
    { id: '1114', name: '阿里云计算有限公司', level: 'first', capital: '100亿人民币', region: 'outside', regionName: '杭州', industry: '互联网', revenue: 680, creditCode: '91330100MA60GHIJKL', foundedDate: '2009-09-10', address: '杭州市余杭区阿里云计算中心' },
    { id: '1115', name: '淘宝（中国）软件有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '杭州', industry: '批发零售', revenue: 420, creditCode: '91330100MA60MNOPQR', foundedDate: '2003-05-10', address: '杭州市余杭区淘宝城' },
    { id: '1116', name: '阿里巴巴（北京）软件服务有限公司', level: 'second', capital: '30亿人民币', region: 'outside', regionName: '北京', industry: '互联网', revenue: 185, creditCode: '91110000MA60STUVWX', foundedDate: '2007-06-18', address: '北京市朝阳区阿里巴巴北京总部' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '1117', name: '阿里巴巴本地生活服务公司', level: 'first', capital: '80亿人民币', region: 'outside', regionName: '上海', industry: '居民服务', revenue: 320, creditCode: '91310000MA60YZABCD', foundedDate: '2018-10-12', address: '上海市浦东新区阿里本地生活中心' },
    { id: '1118', name: '阿里健康信息技术有限公司', level: 'first', capital: '50亿港元', region: 'outside', regionName: '香港', industry: '卫生', revenue: 165, creditCode: '-', foundedDate: '2014-01-22', address: '香港中环阿里健康中心' },
    { id: '1119', name: '菜鸟网络科技有限公司', level: 'first', capital: '100亿人民币', region: 'outside', regionName: '杭州', industry: '物流运输', revenue: 480, creditCode: '91330100MA60CDEFGH', foundedDate: '2013-05-28', address: '杭州市余杭区菜鸟网络总部' },
  ],
  
  // 卓越系成员 - 前海营收280亿
  '12': [
    // 前海本地企业（存量）- 营收总和280亿
    { id: '1201', name: '卓越置业集团有限公司', level: 'core', capital: '25亿人民币', region: 'local', regionName: '前海', industry: '房地产开发', revenue: 125, creditCode: '91440300279304067K', foundedDate: '1996-06-21', address: '深圳市福田区金田路2030号卓越世纪中心' },
    { id: '1202', name: '卓越商业运营管理有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '商务服务', revenue: 68, creditCode: '91440300MA5D8N9R8K', foundedDate: '2005-08-15', address: '深圳市福田区卓越商业中心' },
    { id: '1203', name: '卓越物业管理股份有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '商务服务', revenue: 42, creditCode: '91440300MA5F8N9R7K', foundedDate: '2008-03-22', address: '深圳市福田区卓越物业中心' },
    { id: '1204', name: '卓越酒店管理有限公司', level: 'second', capital: '3亿人民币', region: 'local', regionName: '前海', industry: '商务服务', revenue: 28, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2010-09-18', address: '深圳市福田区卓越酒店管理公司' },
    { id: '1205', name: '卓越资产管理（深圳）有限公司', level: 'second', capital: '2亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 17, creditCode: '91440300MA5H8Q3R8N', foundedDate: '2015-05-10', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（近3年成立）- 高能级新项目
    { id: '1206', name: '卓越智慧社区（杭州）有限公司', level: 'first', capital: '8亿人民币', region: 'outside', regionName: '杭州', industry: '信息技术', revenue: 0, creditCode: '91330100MA1J8Q3R8N', foundedDate: '2024-03-18', address: '杭州市余杭区卓越智慧社区中心' },
    { id: '1207', name: '卓越长租公寓（上海）有限公司', level: 'first', capital: '6亿人民币', region: 'outside', regionName: '上海', industry: '房地产', revenue: 0, creditCode: '91310000MA1K8Q3R8N', foundedDate: '2024-06-22', address: '上海市浦东新区卓越长租公寓中心' },
    { id: '1208', name: '卓越康养产业（成都）有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '成都', industry: '卫生', revenue: 0, creditCode: '91510100MA1L8Q3R8N', foundedDate: '2024-09-15', address: '成都市高新区卓越康养产业园' },
    { id: '1209', name: '卓越智慧物流（苏州）有限公司', level: 'second', capital: '4亿人民币', region: 'outside', regionName: '苏州', industry: '装卸搬运仓储', revenue: 0, creditCode: '91320500MA1M8Q3R8N', foundedDate: '2025-01-20', address: '苏州市工业园区卓越智慧物流园' },
    { id: '1210', name: '卓越绿色建筑（武汉）有限公司', level: 'second', capital: '3亿人民币', region: 'outside', regionName: '武汉', industry: '房地产', revenue: 0, creditCode: '91420100MA1N8Q3R8N', foundedDate: '2025-02-28', address: '武汉市东湖高新区卓越绿色建筑中心' },
    { id: '1211', name: '卓越文旅产业（青岛）有限公司', level: 'second', capital: '2亿人民币', region: 'outside', regionName: '青岛', industry: '商务服务', revenue: 0, creditCode: '91370200MA1O8Q3R8N', foundedDate: '2025-03-22', address: '青岛市西海岸新区卓越文旅产业园' },
    
    // 外地高营收企业（存量外流）- 现金牛
    { id: '1212', name: '卓越（北京）置业有限公司', level: 'first', capital: '30亿人民币', region: 'outside', regionName: '北京', industry: '房地产开发', revenue: 185, creditCode: '91110000717867432W', foundedDate: '2006-08-22', address: '北京市朝阳区卓越北京中心' },
    { id: '1213', name: '卓越（上海）置业有限公司', level: 'first', capital: '25亿人民币', region: 'outside', regionName: '上海', industry: '房地产开发', revenue: 125, creditCode: '91310000MA60ABCDEF', foundedDate: '2008-05-18', address: '上海市浦东新区卓越上海中心' },
    { id: '1214', name: '卓越（广州）置业有限公司', level: 'second', capital: '15亿人民币', region: 'outside', regionName: '广州', industry: '房地产开发', revenue: 85, creditCode: '91440100MA60GHIJKL', foundedDate: '2010-09-10', address: '广州市天河区卓越广州中心' },
    { id: '1215', name: '卓越（杭州）置业有限公司', level: 'second', capital: '12亿人民币', region: 'outside', regionName: '杭州', industry: '房地产开发', revenue: 65, creditCode: '91330100MA60MNOPQR', foundedDate: '2012-03-22', address: '杭州市余杭区卓越杭州中心' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '1216', name: '卓越产业新城（东莞）有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '东莞', industry: '商务服务', revenue: 95, creditCode: '91441900MA60STUVWX', foundedDate: '2016-06-18', address: '东莞市松山湖高新区卓越产业新城' },
    { id: '1217', name: '卓越海外发展有限公司', level: 'second', capital: '10亿人民币', region: 'outside', regionName: '香港', industry: '房地产', revenue: 52, creditCode: '-', foundedDate: '2018-09-22', address: '香港中环卓越海外中心' },
  ],
};

// 为所有没有详细成员数据的集团生成默认成员数据
const generateDefaultMembers = (clanId, clanName, coreCompany, industry) => {
  const qianhaiIndustries = ['金融', '现代物流', '科技', '地产'];
  const outsideCities = ['上海', '北京', '杭州', '广州', '香港'];
  const members = [];
  
  // 核心企业
  members.push({
    id: `${clanId}01`,
    name: coreCompany,
    level: 'core',
    capital: '10亿人民币',
    region: 'local',
    regionName: '前海',
    industry: industry || qianhaiIndustries[0],
    revenue: 520,
    creditCode: '91440300192345678M',
    foundedDate: '2000-01-01',
    address: '深圳市前海深港合作区前湾一路1号'
  });
  
  // 前海本地企业（存量）- 高营收
  for (let i = 0; i < 8; i++) {
    members.push({
      id: `${clanId}1${i}`,
      name: `${clanName.replace('系', '')}${qianhaiIndustries[i % qianhaiIndustries.length]}有限公司`,
      level: 'first',
      capital: `${5 + Math.floor(Math.random() * 20)}亿人民币`,
      region: 'local',
      regionName: '前海',
      industry: qianhaiIndustries[i % qianhaiIndustries.length],
      revenue: 50 + Math.floor(Math.random() * 300),
      creditCode: `91440300MA${Math.floor(Math.random() * 10000000)}M`,
      foundedDate: `201${5 + Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-15`,
      address: '深圳市前海深港合作区前湾一路1号'
    });
  }
  
  // 外地企业（近3年成立）
  for (let i = 0; i < 4; i++) {
    const city = outsideCities[i % outsideCities.length];
    const foundedYear = 2022 + Math.floor(Math.random() * 2);
    members.push({
      id: `${clanId}2${i}`,
      name: `${clanName.replace('系', '')}${qianhaiIndustries[i % qianhaiIndustries.length]}（${city}）有限公司`,
      level: 'first',
      capital: `${3 + Math.floor(Math.random() * 10)}亿人民币`,
      region: 'outside',
      regionName: city,
      industry: qianhaiIndustries[i % qianhaiIndustries.length],
      revenue: 0,
      creditCode: `91440300MA${Math.floor(Math.random() * 10000000)}M`,
      foundedDate: `${foundedYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-15`,
      address: `${city}市高新区`
    });
  }
  
  // 外地高营收企业（存量外流）
  for (let i = 0; i < 3; i++) {
    const city = outsideCities[(i + 2) % outsideCities.length];
    members.push({
      id: `${clanId}3${i}`,
      name: `${clanName.replace('系', '')}${qianhaiIndustries[i % qianhaiIndustries.length]}（${city}）有限公司`,
      level: 'first',
      capital: `${8 + Math.floor(Math.random() * 15)}亿人民币`,
      region: 'outside',
      regionName: city,
      industry: qianhaiIndustries[i % qianhaiIndustries.length],
      revenue: 80 + Math.floor(Math.random() * 200),
      creditCode: `91440300MA${Math.floor(Math.random() * 10000000)}M`,
      foundedDate: `201${0 + Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-15`,
      address: `${city}市高新区`
    });
  }
  
  // 产业缺口企业
  const gapIndustries = ['智能制造', '生物医药', '新能源', '半导体'];
  for (let i = 0; i < 3; i++) {
    const city = outsideCities[(i + 4) % outsideCities.length];
    members.push({
      id: `${clanId}4${i}`,
      name: `${clanName.replace('系', '')}${gapIndustries[i]}有限公司`,
      level: 'first',
      capital: `${5 + Math.floor(Math.random() * 15)}亿人民币`,
      region: 'outside',
      regionName: city,
      industry: gapIndustries[i],
      revenue: 60 + Math.floor(Math.random() * 180),
      creditCode: `91440300MA${Math.floor(Math.random() * 10000000)}M`,
      foundedDate: `20${15 + Math.floor(Math.random() * 8)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-15`,
      address: `${city}市经济开发区`
    });
  }
  
  return members;
};

// 为缺少成员数据的企业生成默认数据
groupList.forEach(clan => {
  if (!memberCompaniesData[clan.id]) {
    memberCompaniesData[clan.id] = generateDefaultMembers(
      clan.id, 
      clan.name, 
      clan.coreCompany,
      clan.coreInfo?.industries?.[0]
    );
  }
});

// 区域选项
export const regionOptions = [
  { value: '全市', label: '全市' },
  { value: '南山区', label: '南山区' },
  { value: '福田区', label: '福田区' },
  { value: '宝安区', label: '宝安区' },
  { value: '龙岗区', label: '龙岗区' },
  { value: '前海', label: '前海合作区' },
];

// 级次映射配置
export const levelMap = {
  'core': { text: '核心企业', color: 'blue' },
  'first': { text: '一级子公司', color: 'green' },
  'second': { text: '二级子公司', color: 'orange' },
  'associate': { text: '参股企业', color: 'default' },
};

// 默认成员数据
export const defaultMembers = memberCompaniesData['1'] || [];
