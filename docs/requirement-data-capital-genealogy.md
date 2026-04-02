# 集团系挖潜功能 - 数据需求文档

## 1. 文档信息

| 项目 | 内容 |
|------|------|
| 功能名称 | 集团系挖潜 |
| 涉及页面 | 集团系挖潜列表页、集团系挖潜详情页 |
| 数据来源表 | `o_lx_wz_business_info_non_discl`（企业经营信息）、`o_lx_wz_company_group_info`（集团及成员企业信息） |
| 交付方式 | JSON 数据文件 |
| 文档版本 | v1.0 |
| 更新日期 | 2026-04-01 |

---

## 2. 数据需求概述

### 2.1 数据表关系

```
┌─────────────────────────────────────────────────────────────────┐
│                    o_lx_wz_company_group_info                    │
│                    (集团及成员企业信息表)                         │
├─────────────────────────────────────────────────────────────────┤
│  集团信息: group_name                                            │
│  成员企业: company_name, company_credit_code                     │
│  成员关系: main_member_level（0级=主体企业，1级=一级，2级=二级）      │
│  行业信息: industry_code（代码，用于计算）, industry（名称，展示）│
│  地区信息: province（省）, city（市）, district（区）            │
│  经营信息: business_status, registered_capital,                 │
│           establishment_date                                    │
│  股权信息: main_company_holding_ratio（主体企业控股比例）        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 通过 company_credit_code 关联
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  o_lx_wz_business_info_non_discl                 │
│                    (企业经营信息-非公开年报)                      │
├─────────────────────────────────────────────────────────────────┤
│  企业标识: UNISCID (统一社会信用代码)                            │
│  企业名称: CompanyName                                           │
│  财务数据: ASSGRO(资产总额), LIAGRO(负债总额),                   │
│           MAIBUSINC(主营业收入), NETINC(净利润),                │
│           PROGRO(利润总额), RATGRO(纳税总额),                   │
│           TOTEQU(所有者权益), VENDINC(营业总收入)               │
│  人员数据: EMPNUM(企业人数)                                      │
└─────────────────────────────────────────────────────────────────┘
```

**表结构说明**：
- 本表存储集团及其所有成员企业的信息，包括主体企业和各级子公司
- **成员级别（main_member_level）**：标识企业在集团中的层级关系
  - `0级`：主体企业（集团的核心企业）
  - `1级`：一级子公司
  - `2级`：二级子公司
  - `3级`：参股企业
- **行业信息**：
  - `industry_code`：行业代码，用于数据计算和筛选（如判断是否属于制造业）
  - `industry`：行业名称，用于前端展示
- **地区信息**：`province`（省）、`city`（市）、`district`（区），替代原来的`region`字段
- **主体企业控股比例（main_company_holding_ratio）**：主体企业对该成员企业的控股比例

**重要说明**：
- 所有涉及行业筛选、行业分类的计算逻辑，都应使用 `industry_code` 字段
- 前端展示时，使用 `industry` 字段显示行业名称
- 地区判断（如判断是否属于前海）应使用 `province`/`city`/`district` 字段组合判断

### 2.2 数据加工流程

```
原始数据表
    │
    ├──► 集团信息提取 ──► 集团列表数据
    │
    ├──► 成员企业关联 ──► 成员企业数据
    │
    ├──► 财务数据汇总 ──► 营收计算
    │
    └──► 招商模型计算 ──► 四大模型筛选结果
```

### 2.3 数据交付清单

| 序号 | 数据文件 | 说明 | 依赖表 |
|------|---------|------|--------|
| 1 | `group_list.json` | 集团列表数据 | `o_lx_wz_company_group_info` |
| 2 | `clan_detail.json` | 集团详情数据 | `o_lx_wz_company_group_info` |
| 3 | `member_companies.json` | 成员企业数据 | `o_lx_wz_company_group_info` |
| 4 | `business_info.json` | 企业经营数据 | `o_lx_wz_business_info_non_discl` |

---

## 3. 集团列表数据需求

### 3.1 数据文件: `group_list.json`

**用途**: 集团系挖潜列表页展示

**数据加工逻辑**:

```sql
-- 1. 从集团表中提取所有集团（按group_name分组）
SELECT DISTINCT 
    group_name
FROM o_lx_wz_company_group_info;

-- 2. 提取每个集团的主体企业信息（main_member_level = '0'）
SELECT 
    group_name,
    company_name as main_company_name,
    company_credit_code as main_company_credit_code
FROM o_lx_wz_company_group_info
WHERE main_member_level = '0';

-- 3. 计算每个集团的成员企业数
SELECT 
    group_name,
    COUNT(*) as member_count
FROM o_lx_wz_company_group_info
GROUP BY group_name;

-- 4. 计算每个集团在前海的企业数（city='深圳市' AND district='前海'）
SELECT 
    group_name,
    COUNT(*) as local_member_count
FROM o_lx_wz_company_group_info
WHERE city = '深圳市' AND district = '前海'
GROUP BY group_name;

-- 5. 计算每个集团在外地（非前海）的企业数
SELECT 
    group_name,
    COUNT(*) as outside_member_count
FROM o_lx_wz_company_group_info
WHERE city != '深圳市' OR district != '前海'
GROUP BY group_name;

-- 6. 关联经营数据计算营收
-- 通过 company_credit_code = UNISCID 关联
```

**输出字段**:

| 字段名 | 类型 | 加工逻辑 | 示例 |
|--------|------|---------|------|
| id | string | 集团唯一标识，使用拼音或英文缩写 | "jd-clan" |
| name | string | group_name | "京东系" |
| coreCompany | string | main_member_level='0' 的 company_name | "京东集团" |
| coreCompanyCreditCode | string | main_member_level='0' 的 company_credit_code | "911100008XXXXXXXXX" |
| groupTotalRevenue | number | 集团所有成员企业的 VENDINC 总和 | 12000 |
| localRevenue | number | 集团在前海地区成员企业的 VENDINC 总和 | 1020 |
| penetrationRate | number | (localRevenue / groupTotalRevenue) × 100%，保留1位小数 | 8.5 |
| memberCount | number | 该集团的成员企业总数 | 42 |
| localMemberCount | number | 第4步计算的 local_member_count | 8 |
| outsideMemberCount | number | 第5步计算的 outside_member_count | 34 |

**数据示例**:

```json
[
  {
    "id": "jd-clan",
    "name": "京东系",
    "coreCompany": "京东集团",
    "coreCompanyCreditCode": "911100008XXXXXXXXX",
    "groupTotalRevenue": 12000,
    "localRevenue": 1020,
    "penetrationRate": 8.5,
    "memberCount": 42,
    "localMemberCount": 8,
    "outsideMemberCount": 34
  }
]
```

### 3.2 营收计算逻辑

#### 3.2.1 集团总营收计算

**计算目标**：统计某个集团所有成员企业的营业总收入之和。

**计算步骤**：
1. **获取成员企业列表**：从 `o_lx_wz_company_group_info` 表中，筛选出该集团的所有成员企业，获取它们的统一社会信用代码
2. **查询经营数据**：对每个成员企业，通过统一社会信用代码关联 `o_lx_wz_business_info_non_discl` 表，获取其营业总收入（VENDINC 字段）
3. **汇总计算**：将所有成员企业的营业总收入相加，得到集团总营收

**关键字段说明**：
- `company_credit_code`：集团成员企业信息表中的企业唯一标识
- `UNISCID`：企业经营信息表中的统一社会信用代码
- `VENDINC`：企业经营信息表中的营业总收入字段，单位：亿元

**计算逻辑代码**：

```javascript
function calculateGroupTotalRevenue(groupName) {
  // 1. 获取该集团所有成员企业的统一社会信用代码
  const creditCodes = query(`
    SELECT company_credit_code 
    FROM o_lx_wz_company_group_info 
    WHERE group_name = '${groupName}'
  `);
  
  // 2. 从经营数据表中获取各企业的营业总收入(VENDINC)
  let totalRevenue = 0;
  for (const code of creditCodes) {
    const revenue = query(`
      SELECT VENDINC 
      FROM o_lx_wz_business_info_non_discl 
      WHERE UNISCID = '${code}'
    `);
    totalRevenue += parseFloat(revenue) || 0;
  }
  
  return totalRevenue; // 单位：亿元
}
```

#### 3.2.2 前海营收计算

**计算目标**：统计某个集团在前海地区的成员企业的营业总收入之和。

**计算步骤**：
1. **筛选前海企业**：从 `o_lx_wz_company_group_info` 表中，筛选出该集团且地区为"前海"的成员企业
2. **查询经营数据**：对这些前海成员企业，关联 `o_lx_wz_business_info_non_discl` 表获取营业总收入
3. **汇总计算**：将所有前海成员企业的营业总收入相加，得到前海营收

**与集团总营收的区别**：
- 集团总营收：包含该集团所有地区（全国范围）的成员企业
- 前海营收：仅包含地区字段 `region = '前海'` 的成员企业

**计算逻辑代码**：

```javascript
function calculatelocalRevenue(groupName) {
  // 1. 获取该集团在前海地区的成员企业
  const creditCodes = query(`
    SELECT company_credit_code 
    FROM o_lx_wz_company_group_info 
    WHERE group_name = '${groupName}' 
    AND region = '前海'
  `);
  
  // 2. 汇总这些企业的营业总收入
  let localRevenue = 0;
  for (const code of creditCodes) {
    const revenue = query(`
      SELECT VENDINC 
      FROM o_lx_wz_business_info_non_discl 
      WHERE UNISCID = '${code}'
    `);
    localRevenue += parseFloat(revenue) || 0;
  }
  
  return localRevenue; // 单位：亿元
}
```

---

## 4. 集团详情数据需求

### 4.1 数据文件: `clan_detail.json`

**用途**: 集团系挖潜详情页头部信息展示

**输出字段**:

| 字段名 | 类型 | 加工逻辑 | 示例 |
|--------|------|---------|------|
| id | string | 集团唯一标识 | "jd-clan" |
| name | string | group_name | "京东系" |
| coreCompany | string | main_member_level='0' 的 company_name | "京东集团" |
| coreCompanyCreditCode | string | main_member_level='0' 的 company_credit_code | "911100008XXXXXXXXX" |
| logo | string | 集团Logo URL（如有） | "/logos/jd.png" |
| groupTotalRevenue | number | 集团总营收 | 12000 |
| localRevenue | number | 前海营收 | 1020 |
| penetrationRate | number | (localRevenue / groupTotalRevenue) * 100 | 8.5 |
| memberCount | number | 成员企业总数 | 42 |
| localMemberCount | number | 本地企业数 | 8 |
| outsideMemberCount | number | 外地企业数 | 34 |

#### 4.1.1 渗透率计算

**计算目标**：计算集团在前海的业务渗透程度，即前海营收占集团总营收的比例。

**业务含义**：
- 渗透率反映集团在前海地区的业务布局深度
- 渗透率越低，说明集团在前海的业务占比越小，潜在招商空间越大
- 前端根据渗透率划分等级：高潜能攻坚(<10%)、重点扩容(10%-25%)、稳健护盘(≥25%)

**计算公式**：
```
渗透率 = (前海营收 / 集团总营收) × 100%
```

**计算步骤**：
1. 获取集团总营收（已计算）
2. 获取前海营收（已计算）
3. 用前海营收除以集团总营收，乘以100得到百分比
4. 结果保留1位小数

**计算逻辑代码**：

```javascript
// 渗透率计算
penetrationRate = (localRevenue / groupTotalRevenue) * 100;
// 结果保留1位小数
```

**示例**：
- 集团总营收：12000亿元
- 前海营收：1020亿元
- 渗透率 = (1020 / 12000) × 100% = 8.5%

**数据示例**:

```json
{
  "id": "jd-clan",
  "name": "京东系",
  "coreCompany": "京东集团",
  "coreCompanyCreditCode": "911100008XXXXXXXXX",
  "logo": "/logos/jd.png",
  "groupTotalRevenue": 12000,
  "localRevenue": 1020,
  "penetrationRate": 8.5,
  "memberCount": 42,
  "localMemberCount": 8,
  "outsideMemberCount": 34
}
```

---

## 5. 成员企业数据需求

### 5.1 数据文件: `member_companies.json`

**用途**: 集团系挖潜详情页成员企业清单、招商机会列表

**数据加工说明**：

成员企业数据需要从两张表中关联获取：
1. **主表**：`o_lx_wz_company_group_info` - 存储集团成员企业的基本信息和关联关系
2. **关联表**：`o_lx_wz_business_info_non_discl` - 存储企业的经营数据

**关联逻辑**：
- 通过 `company_credit_code`（集团表） = `UNISCID`（经营表）进行关联
- 使用 LEFT JOIN 确保即使某些企业没有经营数据，也能显示基本信息

**查询步骤**：
1. 从集团表中筛选指定集团的成员企业
2. 关联经营表获取财务数据
3. 对字段进行映射转换（如地区映射、级别映射）

**SQL查询逻辑**：

```sql
-- 基础查询：关联集团表和经营表
SELECT 
    g.group_name,
    g.company_name,
    g.company_credit_code,
    g.business_status,
    g.registered_capital,
    g.establishment_date,
    g.main_member_level,
    g.industry_code,
    g.industry,
    g.province,
    g.city,
    g.district,
    g.main_company_holding_ratio,
    b.CompanyName as business_company_name,
    b.VENDINC as revenue,
    b.EMPNUM as employee_count,
    b.ASSGRO as total_assets,
    b.LIAGRO as total_liabilities,
    b.NETINC as net_profit,
    b.PROGRO as total_profit,
    b.RATGRO as tax_amount,
    b.TOTEQU as total_equity,
    b.MAIBUSINC as main_business_income
FROM o_lx_wz_company_group_info g
LEFT JOIN o_lx_wz_business_info_non_discl b 
    ON g.company_credit_code = b.UNISCID
WHERE g.group_name = '京东系';
```

**输出字段**:

| 字段名 | 类型 | 加工逻辑 | 示例 |
|--------|------|---------|------|
| id | string | 企业唯一标识 | "jd-001" |
| name | string | company_name | "京东集团华南总部" |
| creditCode | string | company_credit_code | "91440300XXXXXXXXXX" |
| industryCode | string | industry_code（用于计算） | "I64" |
| industry | string | industry（用于展示） | "互联网" |
| province | string | province | "广东省" |
| city | string | city | "深圳市" |
| district | string | district | "前海" |
| region | string | 地区标识：'local'表示前海，'outside'表示外地 | "local" |
| regionName | string | 地区名称（如前海）或城市名 | "前海" |
| level | string | main_member_level映射：0/core/first/second/associate | "core" |
| levelName | string | 中文级别名称 | "核心" |
| capital | string | registered_capital | "10亿人民币" |
| foundedDate | string | establishment_date | "2015-06-18" |
| revenue | number | VENDINC（营业总收入） | 65 |
| employeeCount | number | EMPNUM（企业人数） | 5000 |
| businessStatus | string | business_status | "存续" |
| mainCompanyHoldingRatio | number | main_company_holding_ratio | 35.5 |

**成员级别映射**:

| 原始值 | 映射值 | 中文名 | 说明 |
|--------|--------|--------|------|
| 0 | core | 核心 | 主体企业 |
| 1 | first | 一级 | 一级子公司 |
| 2 | second | 二级 | 二级子公司 |
| 3 | associate | 关联 | 参股企业 |

**地区判断逻辑**:

| 判断条件 | region值 | regionName值 |
|---------|----------|--------------|
| city='深圳市' AND district='前海' | local | "前海" |
| 其他情况 | outside | city值（如"上海市"）|

**重要说明**：
- **行业筛选**：所有涉及行业分类、行业筛选的计算，使用 `industry_code` 字段（如判断是否属于制造业）
- **行业展示**：前端展示使用 `industry` 字段
- **地区筛选**：判断是否属于前海，应使用 `city='深圳市' AND district='前海'`
- **地区展示**：展示地区名称时，优先使用 `district`，如为空则使用 `city`

**数据示例**:

```json
{
  "jd-clan": [
    {
      "id": "jd-001",
      "name": "京东集团华南总部",
      "creditCode": "91440300XXXXXXXXXX",
      "industry": "互联网",
      "region": "local",
      "regionName": "前海",
      "level": "core",
      "levelName": "核心",
      "capital": "10亿人民币",
      "foundedDate": "2015-06-18",
      "revenue": 65,
      "employeeCount": 5000,
      "businessStatus": "存续",
      "controllerHoldingRatio": 35.5
    }
  ]
}
```

---

## 6. 图表数据需求

### 6.1 存量盘对标 - 行业营收落差数据

**数据文件**: `industry_gap_data.json`

**业务目标**：分析集团在各行业的全国营收与前海营收之间的差距，识别招商机会大的行业。

**计算逻辑说明**：

1. **数据分组**：按行业对集团成员企业进行分组
2. **营收汇总**：对每个行业，分别计算：
   - 全国营收：该行业所有成员企业的营收总和
   - 前海营收：该行业在前海地区的成员企业营收总和
3. **落差计算**：落差 = 全国营收 - 前海营收
   - 落差越大，说明该行业在全国的营收规模远大于前海，招商潜力越大
4. **排序筛选**：按落差从小到大排序，取前8个行业展示

**计算步骤**：

```javascript
function calculateIndustryGap(groupName) {
  // 1. 获取集团所有成员企业
  const members = query(`
    SELECT company_credit_code, industry, region
    FROM o_lx_wz_company_group_info
    WHERE group_name = '${groupName}'
  `);
  
  // 2. 按行业汇总营收
  const industryMap = {};
  for (const member of members) {
    const revenue = query(`
      SELECT VENDINC 
      FROM o_lx_wz_business_info_non_discl 
      WHERE UNISCID = '${member.company_credit_code}'
    `);
    
    const revenueValue = parseFloat(revenue) || 0;
    
    // 初始化行业数据
    if (!industryMap[member.industry]) {
      industryMap[member.industry] = {
        industry: member.industry,
        nationalRevenue: 0,
        localRevenue: 0
      };
    }
    
    // 累加全国营收
    industryMap[member.industry].nationalRevenue += revenueValue;
    
    // 累加前海营收（仅当企业位于前海时：city='深圳市' AND district='前海'）
    if (member.city === '深圳市' && member.district === '前海') {
      industryMap[member.industry].localRevenue += revenueValue;
    }
  }
  
  // 3. 计算落差并排序（按落差从大到小）
  const result = Object.values(industryMap)
    .map(item => ({
      ...item,
      gap: item.nationalRevenue - item.localRevenue
    }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 8); // 取前8个
  
  return result;
}
```

**输出字段**:

| 字段名 | 类型 | 说明 |
|--------|------|------|
| industry | string | 行业名称 |
| nationalRevenue | number | 全国营收（亿元） |
| localRevenue | number | 前海营收（亿元） |
| gap | number | 落差 = 全国营收 - 前海营收 |

**数据示例**:

```json
{
  "jd-clan": [
    {
      "industry": "现代物流",
      "nationalRevenue": 500,
      "localRevenue": 80,
      "gap": 420
    }
  ]
}
```

### 6.2 增量盘风口 - 近三年投资偏好数据

**数据文件**: `investment_trend_data.json`

**业务目标**：分析集团近三年的战略投资偏好，识别重点布局的新兴行业。

**计算逻辑说明**：

1. **筛选新设企业**：找出近3年内新成立的成员企业
   - 通过 `establishment_date` 字段判断成立时间
   - 只考虑核心层级企业（0级/1级/2级，即主体企业、一级子公司、二级子公司）
   - 注册资本门槛：≥5000万元（体现投资力度）

2. **按行业汇总**：对每个行业，汇总新设企业的注册资本
   - 注册资本反映投资规模
   - 需要处理注册资本字段的格式（如"10000万人民币"转换为数值）

3. **排序展示**：按投资金额排序，展示投资热度最高的行业

**筛选条件**：
| 条件 | 说明 |
|------|------|
| 成立日期 | 近3年内（从当前日期往前推3年） |
| 成员级别 | 0级（主体企业）、1级（一级子公司）、2级（二级子公司） |
| 注册资本 | ≥5000万元 |

**计算步骤**：

```javascript
function calculateInvestmentTrend(groupName) {
  // 计算3年前的日期
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  
  // 1. 筛选符合条件的成员企业
  const newCompanies = query(`
    SELECT g.company_credit_code, g.industry_code, g.industry, g.registered_capital, g.establishment_date
    FROM o_lx_wz_company_group_info g
    WHERE g.group_name = '${groupName}'
    AND g.establishment_date >= '${threeYearsAgo.toISOString().split('T')[0]}'
    AND g.main_member_level IN ('0', '1', '2')
    AND CAST(REPLACE(REPLACE(g.registered_capital, '万人民币', ''), '万人民币', '') AS DECIMAL) >= 5000
  `);
  
  // 2. 按行业汇总注册资本（使用industry_code计算，industry展示）
  const industryCapital = {};
  for (const company of newCompanies) {
    const capital = parseCapital(company.registered_capital); // 转换为万元
    // 使用industry_code作为key，industry作为展示名称
    const key = company.industry_code;
    if (!industryCapital[key]) {
      industryCapital[key] = { name: company.industry, capital: 0 };
    }
    industryCapital[key].capital += capital;
  }
  
  // 3. 转换为亿元并排序
  const result = Object.entries(industryCapital)
    .map(([industry, capital]) => ({
      industry,
      capital: (capital / 10000).toFixed(1) // 转换为亿元
    }))
    .sort((a, b) => parseFloat(b.capital) - parseFloat(a.capital));
  
  return result;
}
```

**输出字段**:

| 字段名 | 类型 | 说明 |
|--------|------|------|
| industry | string | 行业名称 |
| capital | string | 注册资本（亿元），保留1位小数 |

### 6.3 增量盘流向 - 城市流向数据

**数据文件**: `city_flow_data.json`

**业务目标**：分析集团近三年的新增投资流向哪些城市，识别投资外流的 destination。

**计算逻辑说明**：

1. **筛选外地新设企业**：找出近3年在外地（非前海）新成立的成员企业
   - 与"增量盘风口"类似，但增加地区筛选条件：`city != '深圳市' OR district != '前海'`
   - 同样只考虑核心层级企业，注册资本≥5000万元

2. **按城市汇总**：对每个城市，汇总新设企业的注册资本
   - 反映集团在各城市的投资布局

3. **取Top5**：按投资金额排序，取前5个城市展示
   - 这些城市是集团新增投资的主要目的地
   - 前海可以针对性地制定政策，吸引这些投资回流

**与"增量盘风口"的区别**：
| 维度 | 增量盘风口 | 增量盘流向 |
|------|-----------|-----------|
| 分析角度 | 按行业 | 按城市 |
| 范围 | 全部新设企业 | 仅外地新设企业 |
| 目的 | 识别投资热点行业 | 识别投资外流城市 |

**计算步骤**：

```javascript
function calculateCityFlow(groupName) {
  // 计算3年前的日期
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  
  // 1. 筛选外地新成立企业（非前海：city != '深圳市' OR district != '前海'）
  const outsideNewCompanies = query(`
    SELECT g.city, g.registered_capital
    FROM o_lx_wz_company_group_info g
    WHERE g.group_name = '${groupName}'
    AND g.establishment_date >= '${threeYearsAgo.toISOString().split('T')[0]}'
    AND g.main_member_level IN ('0', '1', '2')
    AND CAST(REPLACE(REPLACE(g.registered_capital, '万人民币', ''), '万人民币', '') AS DECIMAL) >= 5000
    AND (g.city != '深圳市' OR g.district != '前海')
  `);
  
  // 2. 按城市汇总注册资本
  const cityCapital = {};
  for (const company of outsideNewCompanies) {
    const capital = parseCapital(company.registered_capital);
    cityCapital[company.city] = (cityCapital[company.city] || 0) + capital;
  }
  
  // 3. 转换为亿元并排序取Top5
  const result = Object.entries(cityCapital)
    .map(([city, capital]) => ({
      city,
      capital: (capital / 10000).toFixed(1)
    }))
    .sort((a, b) => parseFloat(b.capital) - parseFloat(a.capital))
    .slice(0, 5);
  
  return result;
}
```

**输出字段**:

| 字段名 | 类型 | 说明 |
|--------|------|------|
| city | string | 城市名称 |
| capital | string | 注册资本（亿元），保留1位小数 |

---

## 7. 招商模型数据需求

### 7.1 四大招商模型说明

| 模型 | 名称 | 目标 | 筛选条件 |
|------|------|------|---------|
| 模型1 | 产贸分离机会 | 引导制造业企业将销售结算放在前海 | 外地 + 核心层级 + 营收>1亿 + 制造业/能源/重工 + 集团前海无商贸子公司 |
| 模型2 | 新兴总部引入 | 引入战略新兴产业功能总部 | 外地 + 核心层级 + 近3年新成立 + 注资>5000万 + 战略新兴产业 |
| 模型3 | 产值统筹结算 | 跨区域制造产值统筹与结算归集 | 前海有实体制造(>5000万) + 异地有同类核心子公司(>5000万) |
| 模型4 | 供应链金融 | 大型实体集团供应链金融中心引入 | 千亿级/百亿级大集团 + 成员>30家 + 前海无金融类子公司 |

### 7.2 模型1: 产贸分离机会

**业务目标**：识别集团在外地的高营收制造业企业，引导其将销售结算功能放在前海，享受前海的政策优惠。

**业务逻辑说明**：

1. **前置条件检查**：先判断该集团在前海是否已有商贸类子公司
   - 如果已有，说明集团已在前海布局商贸业务，不再重复推荐
   - 商贸类行业关键词：批发、贸易、零售

2. **筛选目标企业**：从外地成员企业中筛选符合以下条件的企业：
   - 地区：外地（非前海）
   - 层级：核心层级（0级/1级/2级，即主体企业、一级子公司、二级子公司）
   - 营收：≥1亿元（体现规模）
   - 行业：制造业、能源、重工等实体产业

3. **排序**：按营收降序排列，优先展示营收规模大的企业

**筛选条件汇总**：
| 条件 | 要求 |
|------|------|
| 集团前置条件 | 在前海无商贸类子公司 |
| 企业地区 | 外地 |
| 成员级别 | 0级（主体企业）/ 1级（一级子公司）/ 2级（二级子公司） |
| 营业收入 | ≥1亿元 |
| 行业代码 | C（制造业）、D（能源）、相关制造业代码 |

**计算逻辑**：

```javascript
function filterModel1(groupName, members) {
  // 1. 检查集团在前海是否有商贸类子公司
  // 使用industry_code判断：F51-批发、F52-零售、F51xx-贸易相关
  // 前海判断：city='深圳市' AND district='前海'
  const hasLocalTrading = members.some(m =>
    m.city === '深圳市' && m.district === '前海' &&
    (m.industryCode.startsWith('F51') || m.industryCode.startsWith('F52'))
  );
  
  // 如果已有商贸子公司，返回空列表
  if (hasLocalTrading) return [];
  
  // 2. 定义制造业相关行业代码（国民经济行业分类GB/T 4754）
  // C-制造业, D-电力热力燃气及水生产和供应业, 具体细分代码
  const manufacturingIndustryCodes = ['C', 'D', '36', '37', '38', '39', '40', '41', '42', '43'];
  
  // 3. 筛选符合条件的企业
  return members
    .filter(m =>
      (m.city !== '深圳市' || m.district !== '前海') &&  // 外地企业（非前海）
      ['0', '1', '2'].includes(m.level) &&       // 核心层级：0级/1级/2级
      (m.revenue || 0) >= 1 &&                   // 营收≥1亿
      manufacturingIndustryCodes.some(code => m.industryCode.startsWith(code))  // 制造业
    )
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0));  // 按营收降序
}
```

### 7.3 模型2: 新兴总部引入

**业务目标**：识别集团在外地新设立的战略新兴产业企业，引入其功能总部到前海。

**业务逻辑说明**：

1. **筛选新设企业**：找出近3年在外地新成立的成员企业
   - 通过成立日期判断，往前推3年
   - 新设企业代表集团的战略投资方向

2. **筛选新兴产业**：只关注战略新兴产业
   - 包括：人工智能、新能源、低空经济、新能源汽车、生物医药、半导体等
   - 这些产业是前海重点扶持的方向

3. **投资力度门槛**：注册资本≥5000万元
   - 体现集团对该业务的重视程度
   - 排除小规模试水项目

4. **排序**：按注册资本降序排列
   - 投资规模越大，越值得重点招商

**筛选条件汇总**：
| 条件 | 要求 |
|------|------|
| 企业地区 | 外地 |
| 成员级别 | 0级（主体企业）/ 1级（一级子公司）/ 2级（二级子公司） |
| 成立日期 | 近3年内 |
| 注册资本 | ≥5000万元 |
| 行业 | 人工智能、新能源、低空经济、新能源汽车、生物医药、半导体、芯片等 |

**计算逻辑**：

```javascript
function filterModel2(groupName, members) {
  // 计算3年前的日期
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  
  // 定义战略新兴产业代码（国民经济行业分类GB/T 4754）
  // I65-软件和信息技术服务业(人工智能), D44-电力热力生产和供应(新能源),
  // C36-汽车制造业(新能源汽车), C27-医药制造业(生物医药),
  // C39-计算机通信和其他电子设备制造业(半导体、芯片)
  const emergingIndustryCodes = ['I65', 'D44', 'C36', 'C27', 'C39', 'C40'];
  
  // 筛选符合条件的企业
  return members
    .filter(m => {
      const foundedDate = new Date(m.foundedDate);
      const capitalNum = parseCapital(m.capital);
      return (
        m.region !== 'local' &&                    // 外地企业
        ['0', '1', '2'].includes(m.level) &&       // 核心层级：0级/1级/2级
        foundedDate > threeYearsAgo &&             // 近3年新设
        capitalNum >= 5000 &&                      // 注资≥5000万
        emergingIndustryCodes.some(code => m.industryCode.startsWith(code))  // 新兴产业
      );
    })
    .sort((a, b) => parseCapital(b.capital) - parseCapital(a.capital));  // 按注资降序
}

### 7.4 模型3: 产值统筹结算

**业务目标**：识别跨区域布局制造业的大集团，推动其将产值统筹和结算功能归集到前海。

**业务逻辑说明**：

1. **前置条件检查**：确认集团在前海已有实体制造业
   - 前海有制造业基础，才能承接产值统筹功能
   - 营收门槛：≥5000万元（体现规模）

2. **筛选异地同类企业**：找出集团在外地、同行业的制造业企业
   - 地区：外地
   - 层级：核心层级（0级/1级/2级）
   - 营收：≥5000万元
   - 行业：与前海制造业同类

3. **业务价值**：
   - 这类集团在前海和外地都有制造实体
   - 可以通过前海的政策优势（如FT账户跨境资金池）
   - 实现产值统筹和结算归集

**筛选条件汇总**：
| 条件 | 要求 |
|------|------|
| 集团前置条件 | 在前海有制造业实体，且营收≥5000万 |
| 企业地区 | 外地 |
| 成员级别 | 0级（主体企业）/ 1级（一级子公司）/ 2级（二级子公司） |
| 营业收入 | ≥5000万元 |
| 行业代码 | C（制造业）、D（能源）、相关制造业代码 |

**计算逻辑**：

```javascript
function filterModel3(groupName, members) {
  // 定义制造业相关行业代码（国民经济行业分类GB/T 4754）
  // C-制造业, D-电力热力燃气及水生产和供应业
  const manufacturingIndustryCodes = ['C', 'D', '36', '37', '38', '39', '40', '41', '42', '43'];
  
  // 1. 检查前海是否有制造业且营收>5000万
  // 前海判断：city='深圳市' AND district='前海'
  const hasLocalManufacturing = members.some(m =>
    m.city === '深圳市' && m.district === '前海' &&
    (m.revenue || 0) >= 0.5 &&
    manufacturingIndustryCodes.some(code => m.industryCode.startsWith(code))
  );
  
  // 如果前海没有制造业基础，返回空列表
  if (!hasLocalManufacturing) return [];
  
  // 2. 返回异地的同类制造业企业
  return members
    .filter(m =>
      (m.city !== '深圳市' || m.district !== '前海') &&  // 外地企业（非前海）
      ['0', '1', '2'].includes(m.level) &&       // 核心层级：0级/1级/2级
      (m.revenue || 0) >= 0.5 &&                 // 营收≥5000万
      manufacturingIndustryCodes.some(code => m.industryCode.startsWith(code))  // 制造业
    )
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0));  // 按营收降序
}

### 7.5 模型4: 供应链金融

**业务目标**：识别大型实体集团，引入其供应链金融中心到前海。

**业务逻辑说明**：

1. **规模门槛**：集团成员企业数>30家
   - 成员企业越多，供应链金融需求越大
   - 体现集团的体量和供应链复杂度

2. **前置条件检查**：集团在前海无金融类子公司
   - 如果已有金融子公司，不再重复推荐
   - 使用行业代码判断：J66-货币金融服务、J67-资本市场服务、J68-保险业、J69-其他金融业

3. **目标客户**：返回集团本身（而非单个成员企业）
   - 供应链金融是集团层面的功能
   - 适合引入到前海设立金融总部

4. **业务价值**：
   - 大型集团有庞大的供应链体系
   - 前海有商业保理、融资租赁等金融政策优势
   - 可以实现深港跨境人民币直贷

**筛选条件汇总**：
| 条件 | 要求 |
|------|------|
| 集团规模 | 成员企业数 > 30家 |
| 集团前置条件 | 在前海无金融类子公司 |
| 目标客户 | 集团本身（主体企业）|

**计算逻辑**：

```javascript
function filterModel4(groupName, members, clanInfo) {
  // 1. 判断是否大型集团（成员数>30）
  const isLargeGroup = members.length > 30;
  
  // 2. 检查前海是否已有金融类子公司
  // 使用行业代码判断：J66-货币金融服务、J67-资本市场服务、J68-保险业、J69-其他金融业
  // 前海判断：city='深圳市' AND district='前海'
  const financeIndustryCodes = ['J66', 'J67', 'J68', 'J69'];
  const hasLocalFinance = members.some(m =>
    m.city === '深圳市' && m.district === '前海' &&
    financeIndustryCodes.some(code => m.industryCode.startsWith(code))
  );
  
  // 如果不满足条件，返回空列表
  if (!isLargeGroup || hasLocalFinance) return [];
  
  // 3. 返回集团本身作为目标客户
  return [{
    id: `model4-${clanInfo.id}`,
    name: clanInfo.coreCompany,
    industry: '供应链金融',
    region: 'outside',
    regionName: '异地总部',
    capital: '100亿人民币',
    foundedDate: '-',
    revenue: 0,
    level: 'core',
    isModel4Target: true
  }];
}
```

### 7.6 模型统计数据

**数据文件**: `model_stats.json`

**输出格式**:

```json
{
  "jd-clan": {
    "model1": 5,
    "model2": 3,
    "model3": 8,
    "model4": 1
  }
}
```

---

## 8. 数据评分计算

### 8.1 产业聚集度评分

**计算逻辑**:

```javascript
function calculateIndustryScore(industry) {
  const pillarIndustries = ['金融', '现代物流', '科技服务', '互联网', '软件', '信息技术', '人工智能'];
  const emergingIndustries = ['人工智能', '新能源', '低空经济', 'AI', '新能源汽车', '生物医药', '半导体', '芯片'];
  const manufacturingIndustries = ['制造业', '能源', '重工', '电气机械', '汽车制造', '装备制造', '金属制品'];
  
  // 使用哈希算法生成稳定评分
  const hash = industry.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);
  const normalizedHash = Math.abs(hash) % 100 / 100;
  
  if (pillarIndustries.includes(industry)) {
    return 90 + Math.floor(normalizedHash * 10); // 90-99分
  }
  if ([...manufacturingIndustries, ...emergingIndustries].includes(industry)) {
    return 70 + Math.floor(normalizedHash * 15); // 70-84分
  }
  return 40 + Math.floor(normalizedHash * 20); // 40-59分
}
```

### 8.2 集团紧密度评分

**计算逻辑**:

```javascript
function calculateClosenessScore(level, groupPenetrationRate) {
  // 地位分
  const levelScore = {
    core: 40,
    first: 30,
    second: 20,
    associate: 10
  }[level] || 10;
  
  // 熟客分：渗透率越高分越高 (0-60分)
  const penetrationScore = Math.min(Math.round(groupPenetrationRate * 1.5), 60);
  
  return Math.min(levelScore + penetrationScore, 100);
}
```

---

## 9. 数据交付规范

### 9.1 文件格式

- 格式: JSON
- 编码: UTF-8
- 缩进: 2个空格

### 9.2 文件命名

| 文件内容 | 文件名 | 示例 |
|---------|--------|------|
| 集团列表 | `group_list.json` | 所有集团的列表数据 |
| 集团详情 | `clan_detail.json` | 每个集团的详细信息 |
| 成员企业 | `member_companies.json` | 按集团分组的成员企业 |
| 行业落差 | `industry_gap_data.json` | 图表数据 |
| 投资趋势 | `investment_trend_data.json` | 图表数据 |
| 城市流向 | `city_flow_data.json` | 图表数据 |
| 模型统计 | `model_stats.json` | 四大模型统计 |

### 9.3 数据更新频率

| 数据类型 | 更新频率 | 说明 |
|---------|---------|------|
| 集团基础信息 | 月度 | 集团信息变更 |
| 成员企业信息 | 月度 | 企业新增/变更 |
| 经营数据 | 季度 | 财务数据更新 |
| 招商模型 | 实时 | 基于最新数据计算 |

### 9.4 数据示例文件

**完整数据示例**: `data-samples/capital-genealogy-sample.json`

```json
{
  "groupList": [...],
  "clanDetail": {...},
  "memberCompanies": {...},
  "industryGapData": {...},
  "investmentTrendData": {...},
  "cityFlowData": {...},
  "modelStats": {...}
}
```

---

## 10. 数据质量要求

### 10.1 完整性检查

| 检查项 | 要求 |
|--------|------|
| 集团信息 | 集团名称、核心企业名称不能为空 |
| 成员企业 | 企业名称、统一社会信用代码不能为空 |
| 经营数据 | 关键财务指标缺失率 < 5% |
| 关联关系 | 成员企业与集团关联率 = 100% |

### 10.2 准确性检查

| 检查项 | 要求 |
|--------|------|
| 统一社会信用代码 | 符合18位编码规则 |
| 日期格式 | 符合 YYYY-MM-DD 格式 |
| 金额数值 | 非负数，单位统一 |
| 渗透率计算 | 结果在 0-100% 范围内 |

### 10.3 一致性检查

| 检查项 | 要求 |
|--------|------|
| 集团总营收 | 等于各成员企业营收之和 |
| 成员企业数 | 列表页与详情页一致 |
| 地区分类 | 只有"前海"和"外地"两类 |

---

## 11. 附录

### 11.1 参考SQL

**获取集团列表**:

```sql
SELECT DISTINCT 
    group_name,
    main_company_name,
    main_company_credit_code
FROM o_lx_wz_company_group_info
WHERE business_status = '存续'
ORDER BY group_name;
```

**获取集团营收汇总**:

```sql
SELECT 
    g.group_name,
    SUM(CAST(b.VENDINC AS DECIMAL(18,2))) as total_revenue,
    SUM(CASE WHEN g.region = '前海' THEN CAST(b.VENDINC AS DECIMAL(18,2)) ELSE 0 END) as qianhai_revenue
FROM o_lx_wz_company_group_info g
LEFT JOIN o_lx_wz_business_info_non_discl b 
    ON g.company_credit_code = b.UNISCID
GROUP BY g.group_name;
```

### 11.2 相关文档

- 《集团系挖潜功能-前端开发需求文档.md》
- 《数据库表结构-o_lx_wz_business_info_non_discl.sql》
- 《数据库表结构-o_lx_wz_company_group_info.sql》
