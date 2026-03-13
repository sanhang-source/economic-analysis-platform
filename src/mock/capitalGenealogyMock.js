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
  // 平安系成员 - 前海金融业代表
  '1': [
    // 前海本地企业（存量）- 高营收
    { id: '101', name: '中国平安保险（集团）股份有限公司', level: 'core', capital: '182.8亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 980, creditCode: '91440300192350207W', foundedDate: '1988-03-21', address: '深圳市福田区益田路5033号平安金融中心' },
    { id: '102', name: '平安银行股份有限公司', level: 'first', capital: '194亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 850, creditCode: '91440300192185379H', foundedDate: '1987-12-22', address: '深圳市罗湖区深南东路5047号平安银行大厦' },
    { id: '103', name: '平安证券股份有限公司', level: 'first', capital: '138亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 520, creditCode: '914403001000234534', foundedDate: '1996-07-18', address: '深圳市福田区福田街道益田路5033号平安金融中心' },
    { id: '104', name: '平安信托有限责任公司', level: 'first', capital: '130亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 380, creditCode: '914403001000171432', foundedDate: '1996-07-22', address: '深圳市福田区福田街道益田路5033号平安金融中心' },
    { id: '105', name: '深圳前海微众银行股份有限公司', level: 'first', capital: '42亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 320, creditCode: '9144030031977063XH', foundedDate: '2014-12-16', address: '深圳市南山区桃园路田厦国际中心' },
    { id: '106', name: '平安资产管理有限责任公司', level: 'first', capital: '15亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 180, creditCode: '91310000710935012N', foundedDate: '2005-05-27', address: '深圳市福田区益田路5033号平安金融中心' },
    { id: '107', name: '平安融资租赁有限公司', level: 'second', capital: '20亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 85, creditCode: '91310000059345678M', foundedDate: '2012-09-27', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '108', name: '平安创赢资本管理有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 45, creditCode: '91440300MA5D8N9R8K', foundedDate: '2016-08-15', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '109', name: '平安医疗健康管理股份有限公司', level: 'first', capital: '8亿人民币', region: 'local', regionName: '前海', industry: '医疗', revenue: 120, creditCode: '91440300MA5F8N9R7K', foundedDate: '2015-03-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '110', name: '平安智慧城市科技股份有限公司', level: 'second', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '科技', revenue: 68, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2018-09-20', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（外流）- 近3年成立的高质量企业
    { id: '111', name: '平安普惠融资担保有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '上海', industry: '金融', revenue: 0, creditCode: '91310000710934567M', foundedDate: '2022-06-15', address: '上海市浦东新区陆家嘴环路1333号' },
    { id: '112', name: '平安好医（杭州）投资管理有限公司', level: 'second', capital: '3亿人民币', region: 'outside', regionName: '杭州', industry: '医疗', revenue: 0, creditCode: '91330110MA1G8Q3R8N', foundedDate: '2023-03-10', address: '杭州市滨江区网商路599号' },
    { id: '113', name: '平安科技（北京）有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '北京', industry: '科技', revenue: 0, creditCode: '91110108772556789L', foundedDate: '2022-11-20', address: '北京市朝阳区建国路88号' },
    { id: '114', name: '平安养老保险股份有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '上海', industry: '金融', revenue: 280, creditCode: '91310000710945678M', foundedDate: '2004-12-13', address: '上海市浦东新区陆家嘴环路1333号' },
    
    // 外地高营收企业（存量外流）
    { id: '115', name: '平安消费金融有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '重庆', industry: '金融', revenue: 120, creditCode: '91500100MA60ABCDEF', foundedDate: '2020-04-09', address: '重庆市渝北区黄山大道中段52号' },
    { id: '116', name: '平安理财有限责任公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '成都', industry: '金融', revenue: 95, creditCode: '91510100MA60GHIJKL', foundedDate: '2020-08-18', address: '成都市高新区天府大道北段1480号' },
    { id: '117', name: '平安资产管理（香港）有限公司', level: 'first', capital: '10亿港元', region: 'outside', regionName: '香港', industry: '金融', revenue: 156, creditCode: '-', foundedDate: '2005-08-10', address: '香港中环交易广场' },
    { id: '118', name: '平安证券（香港）有限公司', level: 'second', capital: '5亿港元', region: 'outside', regionName: '香港', industry: '金融', revenue: 88, creditCode: '-', foundedDate: '2006-03-15', address: '香港中环皇后大道中99号' },
    
    // 产业缺口企业（外地高营收，前海无布局）
    { id: '119', name: '平安汽车制造有限公司', level: 'first', capital: '80亿人民币', region: 'outside', regionName: '合肥', industry: '汽车制造', revenue: 320, creditCode: '91340100MA60XYZABC', foundedDate: '2018-05-20', address: '合肥市经开区繁华大道' },
    { id: '120', name: '平安新能源科技有限公司', level: 'first', capital: '60亿人民币', region: 'outside', regionName: '常州', industry: '新能源', revenue: 280, creditCode: '91320400MA60DEFGHI', foundedDate: '2019-08-15', address: '常州市新北区长江北路' },
    { id: '121', name: '平安生物医药有限公司', level: 'first', capital: '45亿人民币', region: 'outside', regionName: '苏州', industry: '生物医药', revenue: 195, creditCode: '91320500MA60JKLMNO', foundedDate: '2017-11-10', address: '苏州市工业园区星湖街' },
    { id: '122', name: '平安半导体有限公司', level: 'second', capital: '30亿人民币', region: 'outside', regionName: '无锡', industry: '半导体', revenue: 128, creditCode: '91320200MA60PQRSTU', foundedDate: '2020-02-28', address: '无锡市新吴区太湖大道' },
  ],
  
  // 招商系成员 - 前海港航物流代表
  '2': [
    // 前海本地企业（存量）
    { id: '201', name: '招商局集团有限公司', level: 'core', capital: '169亿人民币', region: 'local', regionName: '前海', industry: '港航物流', revenue: 680, creditCode: '914403001000123456', foundedDate: '1872-12-26', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '202', name: '招商银行股份有限公司', level: 'first', capital: '252.2亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 520, creditCode: '914403001000777777', foundedDate: '1987-03-31', address: '深圳市福田区深南大道7088号招商银行大厦' },
    { id: '203', name: '招商证券股份有限公司', level: 'first', capital: '86.9亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 280, creditCode: '91440300192350798X', foundedDate: '1991-08-01', address: '深圳市福田区福田街道福华一路111号' },
    { id: '204', name: '招商局蛇口工业区控股股份有限公司', level: 'first', capital: '79.2亿人民币', region: 'local', regionName: '前海', industry: '地产', revenue: 420, creditCode: '91440300192345678M', foundedDate: '1992-02-19', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '205', name: '招商局港口集团股份有限公司', level: 'first', capital: '19.4亿人民币', region: 'local', regionName: '前海', industry: '港航物流', revenue: 380, creditCode: '91440300192378901M', foundedDate: '1991-06-18', address: '深圳市南山区蛇口兴华路6号南海意库' },
    { id: '206', name: '招商局通商融资租赁有限公司', level: 'second', capital: '30亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 85, creditCode: '91440300MA5F8N9R8K', foundedDate: '2016-11-08', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '207', name: '招商局资本投资有限责任公司', level: 'second', capital: '20亿人民币', region: 'local', regionName: '前海', industry: '金融', revenue: 120, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2012-08-10', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '208', name: '招商积余物业管理有限公司', level: 'second', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '地产', revenue: 95, creditCode: '91440300192345678M', foundedDate: '1985-05-03', address: '深圳市南山区蛇口兴华路6号南海意库' },
    
    // 外地企业（近3年成立）
    { id: '209', name: '中外运跨境电商物流有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '上海', industry: '现代物流', revenue: 0, creditCode: '91310000MA1FL7R80D', foundedDate: '2023-01-15', address: '上海市浦东新区物流大道123号' },
    { id: '210', name: '招商局能源运输股份有限公司', level: 'first', capital: '81.1亿人民币', region: 'outside', regionName: '上海', industry: '港航物流', revenue: 320, creditCode: '91310000132201245M', foundedDate: '2004-12-31', address: '上海市浦东新区世纪大道1589号长泰国际金融大厦' },
    { id: '211', name: '招商局邮轮科技有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '厦门', industry: '港航物流', revenue: 0, creditCode: '91350200MA1G8Q3R8N', foundedDate: '2022-08-20', address: '厦门市湖里区东港北路29号' },
    { id: '212', name: '招商局检测认证控股有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '重庆', industry: '科技', revenue: 0, creditCode: '91500100MA60ABCDEF', foundedDate: '2023-05-10', address: '重庆市江北区港城工业园' },
    
    // 外地高营收企业
    { id: '213', name: '中国外运股份有限公司', level: 'first', capital: '72.5亿人民币', region: 'outside', regionName: '北京', industry: '现代物流', revenue: 680, creditCode: '91110000100012345M', foundedDate: '2002-11-20', address: '北京市朝阳区安定路5号院10号楼' },
    { id: '214', name: '招商局创新科技（集团）有限公司', level: 'first', capital: '15亿人民币', region: 'outside', regionName: '香港', industry: '科技', revenue: 45, creditCode: '-', foundedDate: '2019-01-08', address: '香港干诺道中168-200号信德中心' },
    { id: '215', name: '招商局太平湾开发投资有限公司', level: 'first', capital: '50亿人民币', region: 'outside', regionName: '大连', industry: '地产', revenue: 28, creditCode: '91210200MA60UVWXYZ', foundedDate: '2020-09-20', address: '大连市瓦房店市太平湾临港经济区' },
    
    // 产业缺口企业
    { id: '216', name: '招商局重工（江苏）有限公司', level: 'first', capital: '40亿人民币', region: 'outside', regionName: '南通', industry: '海工装备', revenue: 280, creditCode: '91320600MA60ABCDEF', foundedDate: '2013-06-18', address: '南通市海门区长江路' },
    { id: '217', name: '招商局新材料科技有限公司', level: 'second', capital: '15亿人民币', region: 'outside', regionName: '宁波', industry: '新材料', revenue: 95, creditCode: '91330200MA60GHIJKL', foundedDate: '2018-09-15', address: '宁波市北仑区新碶街道' },
    { id: '218', name: '招商局智能装备有限公司', level: 'second', capital: '12亿人民币', region: 'outside', regionName: '东莞', industry: '智能制造', revenue: 78, creditCode: '91441900MA60MNOPQR', foundedDate: '2019-11-20', address: '东莞市松山湖高新区' },
  ],
  
  // 顺丰系成员 - 前海现代物流代表
  '3': [
    // 前海本地企业（存量）
    { id: '301', name: '顺丰控股股份有限公司', level: 'core', capital: '49亿人民币', region: 'local', regionName: '前海', industry: '现代物流', revenue: 520, creditCode: '91440300192345892M', foundedDate: '1993-03-26', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '302', name: '深圳顺丰泰森控股（集团）有限公司', level: 'first', capital: '10亿人民币', region: 'local', regionName: '前海', industry: '现代物流', revenue: 380, creditCode: '91440300MA5D8N9R8K', foundedDate: '2013-08-21', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '303', name: '顺丰速运有限公司', level: 'first', capital: '1.5亿人民币', region: 'local', regionName: '前海', industry: '现代物流', revenue: 680, creditCode: '91440300715245678M', foundedDate: '2013-07-25', address: '深圳市福田区益田路6009号新世界中心' },
    { id: '304', name: '顺丰航空有限公司', level: 'first', capital: '15亿人民币', region: 'local', regionName: '前海', industry: '现代物流', revenue: 280, creditCode: '91440300680356789M', foundedDate: '2009-02-09', address: '深圳市宝安区国际机场航站四路1111号' },
    { id: '305', name: '顺丰同城实业股份有限公司', level: 'first', capital: '9.4亿人民币', region: 'local', regionName: '前海', industry: '现代物流', revenue: 85, creditCode: '91440300MA5G8G8R8N', foundedDate: '2019-06-21', address: '深圳市福田区华富街道莲花一村社区皇岗路5001号' },
    { id: '306', name: '顺丰供应链有限公司', level: 'first', capital: '5亿人民币', region: 'local', regionName: '前海', industry: '供应链', revenue: 156, creditCode: '91440300MA5F8N9R8K', foundedDate: '2015-08-18', address: '深圳市前海深港合作区前湾一路1号' },
    { id: '307', name: '顺丰科技有限公司', level: 'second', capital: '8亿人民币', region: 'local', regionName: '前海', industry: '科技', revenue: 120, creditCode: '91440300MA5G8Q3R8N', foundedDate: '2009-04-07', address: '深圳市南山区高新南一道飞亚达大厦' },
    { id: '308', name: '深圳顺丰国际供应链管理有限公司', level: 'second', capital: '3亿人民币', region: 'local', regionName: '前海', industry: '供应链', revenue: 68, creditCode: '91440300MA5F8N9R7K', foundedDate: '2016-05-20', address: '深圳市前海深港合作区前湾一路1号' },
    
    // 外地企业（近3年成立）
    { id: '309', name: '顺丰冷链物流有限公司', level: 'first', capital: '10亿人民币', region: 'outside', regionName: '上海', industry: '现代物流', revenue: 0, creditCode: '91310000MA1FL7R80D', foundedDate: '2022-04-15', address: '上海市青浦区华新镇华隆路1758号' },
    { id: '310', name: '顺丰快运有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '杭州', industry: '现代物流', revenue: 0, creditCode: '91330110MA1G8Q3R8N', foundedDate: '2023-02-28', address: '杭州市余杭区五常街道丰岭路' },
    { id: '311', name: '顺丰无人机科技有限公司', level: 'second', capital: '5亿人民币', region: 'outside', regionName: '赣州', industry: '科技', revenue: 0, creditCode: '91360700MA1G8Q3R8N', foundedDate: '2022-09-10', address: '江西省赣州市南康区龙岭镇' },
    { id: '312', name: '顺丰跨境电子商务（广州）有限公司', level: 'second', capital: '3亿人民币', region: 'outside', regionName: '广州', industry: '跨境电商', revenue: 0, creditCode: '91440101MA1G8Q3R8N', foundedDate: '2023-06-20', address: '广州市花都区花东镇机场大道' },
    
    // 外地高营收企业
    { id: '313', name: '嘉里物流联网有限公司', level: 'associate', capital: '10亿港元', region: 'outside', regionName: '香港', industry: '现代物流', revenue: 420, creditCode: '-', foundedDate: '1981-04-16', address: '香港新界葵涌货柜码头南路88号嘉里货仓' },
    { id: '314', name: 'Flexport飞协博国际货运代理（上海）有限公司', level: 'associate', capital: '2亿美元', region: 'outside', regionName: '上海', industry: '现代物流', revenue: 180, creditCode: '91310000MA1FL7R80D', foundedDate: '2013-01-01', address: '上海市浦东新区陆家嘴环路1000号' },
    { id: '315', name: '顺心捷达物流有限公司', level: 'second', capital: '8亿人民币', region: 'outside', regionName: '广州', industry: '现代物流', revenue: 156, creditCode: '91440101MA60ABCDEF', foundedDate: '2018-03-15', address: '广州市白云区太和镇' },
    { id: '316', name: '丰巢科技有限公司', level: 'associate', capital: '25亿人民币', region: 'outside', regionName: '深圳', industry: '科技', revenue: 45, creditCode: '91440300MA5D8N9R8K', foundedDate: '2015-06-06', address: '深圳市南山区科技园' },
    
    // 产业缺口企业
    { id: '317', name: '顺丰智能制造有限公司', level: 'first', capital: '20亿人民币', region: 'outside', regionName: '苏州', industry: '智能制造', revenue: 128, creditCode: '91320500MA60GHIJKL', foundedDate: '2019-07-20', address: '苏州市工业园区星龙街' },
    { id: '318', name: '顺丰新能源物流车有限公司', level: 'second', capital: '15亿人民币', region: 'outside', regionName: '西安', industry: '新能源', revenue: 85, creditCode: '91610100MA60MNOPQR', foundedDate: '2020-11-10', address: '西安市高新区锦业路' },
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
