-- ========================================================
-- 表名: o_lx_wz_company_group_info
-- 中文名: 集团及成员企业信息
-- 说明: 存储集团基本信息及集团内成员企业关联关系
-- 说明: 成员级别为0级的记录即为主体企业，无需单独的主体企业字段
-- ========================================================

CREATE TABLE IF NOT EXISTS o_lx_wz_company_group_info (
    -- 主键ID
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',

    -- 集团信息
    group_name VARCHAR(500) NOT NULL COMMENT '集团名称',

    -- 公司信息
    company_name VARCHAR(500) NOT NULL COMMENT '公司名称',
    company_credit_code VARCHAR(50) NOT NULL COMMENT '公司统一社会信用代码',

    -- 经营信息
    business_status VARCHAR(50) DEFAULT NULL COMMENT '经营状态',
    registered_capital VARCHAR(255) DEFAULT NULL COMMENT '注册资本',
    establishment_date DATE DEFAULT NULL COMMENT '成立时间',
    main_member_level VARCHAR(50) DEFAULT NULL COMMENT '成员级别（主体企业）：0级=主体企业',
    industry_code VARCHAR(50) DEFAULT NULL COMMENT '行业代码',
    industry VARCHAR(200) DEFAULT NULL COMMENT '行业名称',
    province VARCHAR(100) DEFAULT NULL COMMENT '省',
    city VARCHAR(100) DEFAULT NULL COMMENT '市',
    district VARCHAR(100) DEFAULT NULL COMMENT '区',

    -- 股权信息
    main_company_holding_ratio DECIMAL(5,2) DEFAULT NULL COMMENT '主体企业控股比例(%)',

    -- 审计字段
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by VARCHAR(100) DEFAULT NULL COMMENT '创建人',
    updated_by VARCHAR(100) DEFAULT NULL COMMENT '更新人',

    -- 主键约束
    PRIMARY KEY (id),

    -- 索引
    UNIQUE KEY uk_company_credit_code (company_credit_code) COMMENT '公司统一社会信用代码唯一索引',
    KEY idx_group_name (group_name) COMMENT '集团名称索引',
    KEY idx_company_name (company_name) COMMENT '公司名称索引',
    KEY idx_main_member_level (main_member_level) COMMENT '成员级别索引',
    KEY idx_industry_code (industry_code) COMMENT '行业代码索引',
    KEY idx_industry (industry) COMMENT '行业名称索引',
    KEY idx_province (province) COMMENT '省索引',
    KEY idx_city (city) COMMENT '市索引',
    KEY idx_district (district) COMMENT '区索引',
    KEY idx_establishment_date (establishment_date) COMMENT '成立时间索引',
    KEY idx_created_at (created_at) COMMENT '创建时间索引'

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='集团及成员企业信息';
