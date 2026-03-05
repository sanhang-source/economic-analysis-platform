/**
 * IndustryChain Mock Data - 产业链概览数据
 * 按深圳企业占比排序的产业链列表
 */

// 产业链数据 - 按深圳占比降序排列
export const industryChains = [
  {
    id: 'chain-network',
    name: '网络与通信',
    icon: '📡',
    color: '#1677ff',
    stats: {
      shenzhenCount: 28560,
      nationalCount: 45000,
      percentage: 63.5
    },
    description: '深圳优势产业，华为、中兴全球领先',
    hierarchy: [
      {
        name: '通信设备',
        enterpriseCount: 8600,
        children: [
          {
            name: '基站设备',
            enterpriseCount: 3200,
            children: [
              { name: '5G基站', enterpriseCount: 1800 },
              { name: '4G基站', enterpriseCount: 1200 },
              { name: '小基站', enterpriseCount: 200 }
            ]
          },
          {
            name: '传输设备',
            enterpriseCount: 2800,
            children: [
              { name: '光传输', enterpriseCount: 1500 },
              { name: '微波传输', enterpriseCount: 800 },
              { name: '卫星传输', enterpriseCount: 500 }
            ]
          },
          {
            name: '核心网设备',
            enterpriseCount: 2600,
            children: [
              { name: '交换机', enterpriseCount: 1200 },
              { name: '路由器', enterpriseCount: 1000 },
              { name: '网关', enterpriseCount: 400 }
            ]
          }
        ]
      },
      {
        name: '终端设备',
        enterpriseCount: 12500,
        children: [
          {
            name: '智能手机',
            enterpriseCount: 5800,
            children: [
              { name: '5G手机', enterpriseCount: 3500 },
              { name: '4G手机', enterpriseCount: 1800 },
              { name: '折叠屏手机', enterpriseCount: 500 }
            ]
          },
          {
            name: 'IoT终端',
            enterpriseCount: 4200,
            children: [
              { name: '智能穿戴', enterpriseCount: 1800 },
              { name: '智能家居', enterpriseCount: 1500 },
              { name: '车载终端', enterpriseCount: 900 }
            ]
          },
          {
            name: '通信模组',
            enterpriseCount: 2500,
            children: [
              { name: '5G模组', enterpriseCount: 1200 },
              { name: '4G模组', enterpriseCount: 800 },
              { name: 'NB-IoT模组', enterpriseCount: 500 }
            ]
          }
        ]
      },
      {
        name: '光通信',
        enterpriseCount: 7460,
        children: [
          {
            name: '光模块',
            enterpriseCount: 3200,
            children: [
              { name: '100G+高速光模块', enterpriseCount: 800 },
              { name: '25G/50G光模块', enterpriseCount: 1200 },
              { name: '10G及以下光模块', enterpriseCount: 1200 }
            ]
          },
          {
            name: '光纤光缆',
            enterpriseCount: 2800,
            children: [
              { name: '通信光纤', enterpriseCount: 1500 },
              { name: '特种光纤', enterpriseCount: 800 },
              { name: '光缆组件', enterpriseCount: 500 }
            ]
          },
          {
            name: '光器件',
            enterpriseCount: 1460,
            children: [
              { name: '激光器', enterpriseCount: 600 },
              { name: '探测器', enterpriseCount: 500 },
              { name: '光开关', enterpriseCount: 360 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-semiconductor',
    name: '半导体与集成电路',
    icon: '🔷',
    color: '#722ed1',
    stats: {
      shenzhenCount: 18650,
      nationalCount: 35000,
      percentage: 53.3
    },
    description: '设计环节强，制造环节需补强',
    hierarchy: [
      {
        name: '芯片设计',
        enterpriseCount: 8200,
        children: [
          {
            name: '数字芯片',
            enterpriseCount: 4200,
            children: [
              { name: 'CPU/GPU', enterpriseCount: 280 },
              { name: 'AI芯片', enterpriseCount: 650 },
              { name: 'MCU', enterpriseCount: 1800 },
              { name: 'SoC', enterpriseCount: 1470 }
            ]
          },
          {
            name: '模拟芯片',
            enterpriseCount: 2800,
            children: [
              { name: '电源管理', enterpriseCount: 1200 },
              { name: '信号链', enterpriseCount: 900 },
              { name: '射频芯片', enterpriseCount: 700 }
            ]
          },
          {
            name: '传感器芯片',
            enterpriseCount: 1200,
            children: [
              { name: '图像传感器', enterpriseCount: 400 },
              { name: 'MEMS传感器', enterpriseCount: 500 },
              { name: '环境传感器', enterpriseCount: 300 }
            ]
          }
        ]
      },
      {
        name: '晶圆制造',
        enterpriseCount: 580,
        children: [
          {
            name: '逻辑代工',
            enterpriseCount: 180,
            children: [
              { name: '先进制程(<28nm)', enterpriseCount: 20 },
              { name: '成熟制程(28nm+)', enterpriseCount: 160 }
            ]
          },
          {
            name: '特色工艺',
            enterpriseCount: 280,
            children: [
              { name: '功率器件', enterpriseCount: 120 },
              { name: '模拟工艺', enterpriseCount: 100 },
              { name: 'MEMS工艺', enterpriseCount: 60 }
            ]
          },
          {
            name: '封测服务',
            enterpriseCount: 120,
            children: [
              { name: '先进封装', enterpriseCount: 50 },
              { name: '传统封装', enterpriseCount: 70 }
            ]
          }
        ]
      },
      {
        name: '半导体材料',
        enterpriseCount: 2560,
        children: [
          {
            name: '晶圆材料',
            enterpriseCount: 680,
            children: [
              { name: '硅片', enterpriseCount: 280 },
              { name: '化合物半导体', enterpriseCount: 250 },
              { name: 'SOI', enterpriseCount: 150 }
            ]
          },
          {
            name: '工艺材料',
            enterpriseCount: 1200,
            children: [
              { name: '光刻胶', enterpriseCount: 320 },
              { name: '电子特气', enterpriseCount: 400 },
              { name: 'CMP材料', enterpriseCount: 280 },
              { name: '靶材', enterpriseCount: 200 }
            ]
          },
          {
            name: '封装材料',
            enterpriseCount: 680,
            children: [
              { name: '引线框架', enterpriseCount: 280 },
              { name: '基板', enterpriseCount: 250 },
              { name: '塑封料', enterpriseCount: 150 }
            ]
          }
        ]
      },
      {
        name: '设备零部件',
        enterpriseCount: 7310,
        children: [
          {
            name: '前道设备',
            enterpriseCount: 3200,
            children: [
              { name: '光刻设备', enterpriseCount: 180 },
              { name: '刻蚀设备', enterpriseCount: 450 },
              { name: '薄膜沉积', enterpriseCount: 520 },
              { name: '检测设备', enterpriseCount: 1200 },
              { name: '清洗设备', enterpriseCount: 850 }
            ]
          },
          {
            name: '后道设备',
            enterpriseCount: 2800,
            children: [
              { name: '划片机', enterpriseCount: 450 },
              { name: '贴片机', enterpriseCount: 680 },
              { name: '焊线机', enterpriseCount: 520 },
              { name: '测试分选', enterpriseCount: 1150 }
            ]
          },
          {
            name: '关键零部件',
            enterpriseCount: 1310,
            children: [
              { name: '真空系统', enterpriseCount: 380 },
              { name: '光学系统', enterpriseCount: 420 },
              { name: '精密机械', enterpriseCount: 510 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-new-energy',
    name: '新能源汽车',
    icon: '🚗',
    color: '#52c41a',
    stats: {
      shenzhenCount: 15800,
      nationalCount: 32000,
      percentage: 49.4
    },
    description: '比亚迪龙头带动，三电系统完善',
    hierarchy: [
      {
        name: '动力电池',
        enterpriseCount: 4200,
        children: [
          {
            name: '电芯制造',
            enterpriseCount: 680,
            children: [
              { name: '磷酸铁锂', enterpriseCount: 380 },
              { name: '三元锂电', enterpriseCount: 220 },
              { name: '固态电池', enterpriseCount: 80 }
            ]
          },
          {
            name: '电池系统',
            enterpriseCount: 1520,
            children: [
              { name: 'BMS', enterpriseCount: 680 },
              { name: '电池包', enterpriseCount: 580 },
              { name: '热管理', enterpriseCount: 260 }
            ]
          },
          {
            name: '电池材料',
            enterpriseCount: 2000,
            children: [
              { name: '正极材料', enterpriseCount: 520 },
              { name: '负极材料', enterpriseCount: 480 },
              { name: '电解液', enterpriseCount: 420 },
              { name: '隔膜', enterpriseCount: 320 },
              { name: '集流体', enterpriseCount: 260 }
            ]
          }
        ]
      },
      {
        name: '电驱系统',
        enterpriseCount: 3800,
        children: [
          {
            name: '驱动电机',
            enterpriseCount: 1200,
            children: [
              { name: '永磁同步', enterpriseCount: 680 },
              { name: '交流异步', enterpriseCount: 320 },
              { name: '轮毂电机', enterpriseCount: 200 }
            ]
          },
          {
            name: '电机控制器',
            enterpriseCount: 980,
            children: [
              { name: 'IGBT模块', enterpriseCount: 320 },
              { name: 'SiC器件', enterpriseCount: 180 },
              { name: '控制板', enterpriseCount: 480 }
            ]
          },
          {
            name: '减速器',
            enterpriseCount: 620,
            children: [
              { name: '单级减速', enterpriseCount: 380 },
              { name: '多挡变速', enterpriseCount: 150 },
              { name: '电驱桥', enterpriseCount: 90 }
            ]
          }
        ]
      },
      {
        name: '智能网联',
        enterpriseCount: 5200,
        children: [
          {
            name: '智能驾驶',
            enterpriseCount: 2200,
            children: [
              { name: '激光雷达', enterpriseCount: 320 },
              { name: '毫米波雷达', enterpriseCount: 480 },
              { name: '摄像头', enterpriseCount: 520 },
              { name: '域控制器', enterpriseCount: 580 },
              { name: '算法方案', enterpriseCount: 300 }
            ]
          },
          {
            name: '智能座舱',
            enterpriseCount: 1800,
            children: [
              { name: '中控屏', enterpriseCount: 420 },
              { name: '液晶仪表', enterpriseCount: 380 },
              { name: 'HUD', enterpriseCount: 180 },
              { name: '语音交互', enterpriseCount: 480 },
              { name: '车联网', enterpriseCount: 340 }
            ]
          },
          {
            name: '线控底盘',
            enterpriseCount: 1200,
            children: [
              { name: '线控制动', enterpriseCount: 380 },
              { name: '线控转向', enterpriseCount: 280 },
              { name: '空气悬架', enterpriseCount: 320 },
              { name: '线控换挡', enterpriseCount: 220 }
            ]
          }
        ]
      },
      {
        name: '整车制造',
        enterpriseCount: 2600,
        children: [
          {
            name: '乘用车',
            enterpriseCount: 1200,
            children: [
              { name: '轿车', enterpriseCount: 420 },
              { name: 'SUV', enterpriseCount: 580 },
              { name: 'MPV', enterpriseCount: 200 }
            ]
          },
          {
            name: '商用车',
            enterpriseCount: 800,
            children: [
              { name: '客车', enterpriseCount: 280 },
              { name: '物流车', enterpriseCount: 380 },
              { name: '专用车', enterpriseCount: 140 }
            ]
          },
          {
            name: '代工服务',
            enterpriseCount: 600,
            children: [
              { name: '整车ODM', enterpriseCount: 320 },
              { name: '零部件配套', enterpriseCount: 280 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-software',
    name: '软件与信息服务',
    icon: '💻',
    color: '#13c2c2',
    stats: {
      shenzhenCount: 45200,
      nationalCount: 98000,
      percentage: 46.1
    },
    description: '互联网产业发达，腾讯、华为云领先',
    hierarchy: [
      {
        name: '基础软件',
        enterpriseCount: 6800,
        children: [
          {
            name: '操作系统',
            enterpriseCount: 1200,
            children: [
              { name: '移动OS', enterpriseCount: 280 },
              { name: '物联网OS', enterpriseCount: 420 },
              { name: '服务器OS', enterpriseCount: 320 },
              { name: '嵌入式OS', enterpriseCount: 180 }
            ]
          },
          {
            name: '数据库',
            enterpriseCount: 1800,
            children: [
              { name: '关系型', enterpriseCount: 520 },
              { name: 'NoSQL', enterpriseCount: 680 },
              { name: '时序数据库', enterpriseCount: 320 },
              { name: '图数据库', enterpriseCount: 280 }
            ]
          },
          {
            name: '中间件',
            enterpriseCount: 3800,
            children: [
              { name: '应用服务器', enterpriseCount: 880 },
              { name: '消息队列', enterpriseCount: 920 },
              { name: '缓存中间件', enterpriseCount: 680 },
              { name: '微服务框架', enterpriseCount: 1320 }
            ]
          }
        ]
      },
      {
        name: '云计算',
        enterpriseCount: 8200,
        children: [
          {
            name: 'IaaS',
            enterpriseCount: 2200,
            children: [
              { name: '云服务器', enterpriseCount: 680 },
              { name: '云存储', enterpriseCount: 520 },
              { name: '云网络', enterpriseCount: 580 },
              { name: '裸金属', enterpriseCount: 420 }
            ]
          },
          {
            name: 'PaaS',
            enterpriseCount: 3200,
            children: [
              { name: '容器服务', enterpriseCount: 880 },
              { name: 'DevOps', enterpriseCount: 720 },
              { name: '低代码平台', enterpriseCount: 920 },
              { name: 'AI平台', enterpriseCount: 680 }
            ]
          },
          {
            name: 'SaaS',
            enterpriseCount: 2800,
            children: [
              { name: '办公协同', enterpriseCount: 680 },
              { name: 'CRM/ERP', enterpriseCount: 820 },
              { name: '财税法务', enterpriseCount: 520 },
              { name: '垂直行业', enterpriseCount: 780 }
            ]
          }
        ]
      },
      {
        name: '人工智能',
        enterpriseCount: 12000,
        children: [
          {
            name: 'AI芯片',
            enterpriseCount: 2800,
            children: [
              { name: '云端训练', enterpriseCount: 520 },
              { name: '云端推理', enterpriseCount: 680 },
              { name: '边缘AI', enterpriseCount: 920 },
              { name: '终端AI', enterpriseCount: 680 }
            ]
          },
          {
            name: '算法框架',
            enterpriseCount: 3800,
            children: [
              { name: '深度学习框架', enterpriseCount: 420 },
              { name: '大模型', enterpriseCount: 880 },
              { name: '计算机视觉', enterpriseCount: 1200 },
              { name: '智能语音', enterpriseCount: 680 },
              { name: 'NLP', enterpriseCount: 620 }
            ]
          },
          {
            name: 'AI应用',
            enterpriseCount: 5400,
            children: [
              { name: '智慧城市', enterpriseCount: 1520 },
              { name: '智能金融', enterpriseCount: 980 },
              { name: '智能医疗', enterpriseCount: 820 },
              { name: '智能制造', enterpriseCount: 1200 },
              { name: '自动驾驶', enterpriseCount: 880 }
            ]
          }
        ]
      },
      {
        name: '互联网服务',
        enterpriseCount: 18200,
        children: [
          {
            name: '电商平台',
            enterpriseCount: 5200,
            children: [
              { name: '综合电商', enterpriseCount: 680 },
              { name: '跨境电商', enterpriseCount: 1520 },
              { name: '社交电商', enterpriseCount: 1680 },
              { name: '直播电商', enterpriseCount: 1320 }
            ]
          },
          {
            name: '数字内容',
            enterpriseCount: 6800,
            children: [
              { name: '游戏', enterpriseCount: 2200 },
              { name: '视频', enterpriseCount: 1520 },
              { name: '音乐', enterpriseCount: 980 },
              { name: '阅读', enterpriseCount: 1200 },
              { name: '动漫', enterpriseCount: 880 }
            ]
          },
          {
            name: '生活服务',
            enterpriseCount: 6200,
            children: [
              { name: '本地生活', enterpriseCount: 1820 },
              { name: '在线教育', enterpriseCount: 1320 },
              { name: '在线医疗', enterpriseCount: 980 },
              { name: '金融科技', enterpriseCount: 1200 },
              { name: '出行服务', enterpriseCount: 880 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-robot',
    name: '智能机器人',
    icon: '🤖',
    color: '#fa8c16',
    stats: {
      shenzhenCount: 8600,
      nationalCount: 22000,
      percentage: 39.1
    },
    description: '大疆、优必选等企业带动，应用场景丰富',
    hierarchy: [
      {
        name: '工业机器人',
        enterpriseCount: 3200,
        children: [
          {
            name: '多关节机器人',
            enterpriseCount: 880,
            children: [
              { name: '六轴机器人', enterpriseCount: 520 },
              { name: 'SCARA', enterpriseCount: 280 },
              { name: '协作机器人', enterpriseCount: 80 }
            ]
          },
          {
            name: '移动机器人',
            enterpriseCount: 1200,
            children: [
              { name: 'AGV', enterpriseCount: 680 },
              { name: 'AMR', enterpriseCount: 320 },
              { name: '无人叉车', enterpriseCount: 200 }
            ]
          },
          {
            name: '特种机器人',
            enterpriseCount: 1120,
            children: [
              { name: '焊接机器人', enterpriseCount: 380 },
              { name: '喷涂机器人', enterpriseCount: 280 },
              { name: '码垛机器人', enterpriseCount: 260 },
              { name: '检测机器人', enterpriseCount: 200 }
            ]
          }
        ]
      },
      {
        name: '服务机器人',
        enterpriseCount: 2800,
        children: [
          {
            name: '商用服务',
            enterpriseCount: 1200,
            children: [
              { name: '清洁机器人', enterpriseCount: 420 },
              { name: '配送机器人', enterpriseCount: 380 },
              { name: '引导机器人', enterpriseCount: 280 },
              { name: '安防机器人', enterpriseCount: 120 }
            ]
          },
          {
            name: '家用服务',
            enterpriseCount: 980,
            children: [
              { name: '扫地机器人', enterpriseCount: 520 },
              { name: '教育机器人', enterpriseCount: 280 },
              { name: '陪伴机器人', enterpriseCount: 180 }
            ]
          },
          {
            name: '医疗机器人',
            enterpriseCount: 620,
            children: [
              { name: '手术机器人', enterpriseCount: 120 },
              { name: '康复机器人', enterpriseCount: 280 },
              { name: '护理机器人', enterpriseCount: 220 }
            ]
          }
        ]
      },
      {
        name: '特种机器人',
        enterpriseCount: 1600,
        children: [
          {
            name: '无人机',
            enterpriseCount: 980,
            children: [
              { name: '消费级', enterpriseCount: 320 },
              { name: '行业级', enterpriseCount: 480 },
              { name: '载人级', enterpriseCount: 180 }
            ]
          },
          {
            name: '水下机器人',
            enterpriseCount: 320,
            children: [
              { name: 'ROV', enterpriseCount: 180 },
              { name: 'AUV', enterpriseCount: 80 },
              { name: '水下无人机', enterpriseCount: 60 }
            ]
          },
          {
            name: '空间机器人',
            enterpriseCount: 300,
            children: [
              { name: '卫星服务', enterpriseCount: 120 },
              { name: '空间探测', enterpriseCount: 80 },
              { name: '在轨维护', enterpriseCount: 100 }
            ]
          }
        ]
      },
      {
        name: '核心零部件',
        enterpriseCount: 1000,
        children: [
          {
            name: '减速器',
            enterpriseCount: 280,
            children: [
              { name: '谐波减速器', enterpriseCount: 120 },
              { name: 'RV减速器', enterpriseCount: 100 },
              { name: '行星减速器', enterpriseCount: 60 }
            ]
          },
          {
            name: '伺服系统',
            enterpriseCount: 380,
            children: [
              { name: '伺服电机', enterpriseCount: 180 },
              { name: '伺服驱动', enterpriseCount: 120 },
              { name: '编码器', enterpriseCount: 80 }
            ]
          },
          {
            name: '控制器',
            enterpriseCount: 340,
            children: [
              { name: '运动控制', enterpriseCount: 180 },
              { name: '力控', enterpriseCount: 80 },
              { name: '视觉控制', enterpriseCount: 80 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-biomedical',
    name: '生物医药',
    icon: '💊',
    color: '#eb2f96',
    stats: {
      shenzhenCount: 5800,
      nationalCount: 15000,
      percentage: 38.7
    },
    description: '迈瑞、华大基因龙头带动，创新能力较强',
    hierarchy: [
      {
        name: '生物制药',
        enterpriseCount: 1200,
        children: [
          {
            name: '创新药',
            enterpriseCount: 480,
            children: [
              { name: '抗体药物', enterpriseCount: 180 },
              { name: '细胞基因治疗', enterpriseCount: 120 },
              { name: '重组蛋白', enterpriseCount: 100 },
              { name: '疫苗', enterpriseCount: 80 }
            ]
          },
          {
            name: '仿制药',
            enterpriseCount: 420,
            children: [
              { name: '化学仿制药', enterpriseCount: 280 },
              { name: '生物类似药', enterpriseCount: 140 }
            ]
          },
          {
            name: 'CXO服务',
            enterpriseCount: 300,
            children: [
              { name: 'CRO', enterpriseCount: 120 },
              { name: 'CDMO', enterpriseCount: 100 },
              { name: 'CMO', enterpriseCount: 80 }
            ]
          }
        ]
      },
      {
        name: '医疗器械',
        enterpriseCount: 2800,
        children: [
          {
            name: '诊断设备',
            enterpriseCount: 980,
            children: [
              { name: '影像设备', enterpriseCount: 320 },
              { name: '体外诊断', enterpriseCount: 420 },
              { name: '监护设备', enterpriseCount: 180 },
              { name: '内窥镜', enterpriseCount: 60 }
            ]
          },
          {
            name: '治疗设备',
            enterpriseCount: 880,
            children: [
              { name: '手术机器人', enterpriseCount: 120 },
              { name: '放疗设备', enterpriseCount: 80 },
              { name: '激光治疗', enterpriseCount: 320 },
              { name: '透析设备', enterpriseCount: 280 },
              { name: '呼吸机', enterpriseCount: 80 }
            ]
          },
          {
            name: '耗材',
            enterpriseCount: 940,
            children: [
              { name: '高值耗材', enterpriseCount: 380 },
              { name: '低值耗材', enterpriseCount: 420 },
              { name: '试剂', enterpriseCount: 140 }
            ]
          }
        ]
      },
      {
        name: '精准医疗',
        enterpriseCount: 1200,
        children: [
          {
            name: '基因检测',
            enterpriseCount: 480,
            children: [
              { name: '基因测序', enterpriseCount: 180 },
              { name: '基因编辑', enterpriseCount: 80 },
              { name: '伴随诊断', enterpriseCount: 160 },
              { name: '早筛', enterpriseCount: 60 }
            ]
          },
          {
            name: '合成生物',
            enterpriseCount: 380,
            children: [
              { name: '基因合成', enterpriseCount: 120 },
              { name: '蛋白质工程', enterpriseCount: 100 },
              { name: '代谢工程', enterpriseCount: 100 },
              { name: '酶工程', enterpriseCount: 60 }
            ]
          },
          {
            name: '智慧医疗',
            enterpriseCount: 340,
            children: [
              { name: 'AI辅助诊断', enterpriseCount: 120 },
              { name: '远程医疗', enterpriseCount: 100 },
              { name: '健康管理', enterpriseCount: 120 }
            ]
          }
        ]
      },
      {
        name: '医药商业',
        enterpriseCount: 600,
        children: [
          {
            name: '医药流通',
            enterpriseCount: 320,
            children: [
              { name: '批发', enterpriseCount: 180 },
              { name: '零售', enterpriseCount: 100 },
              { name: '电商', enterpriseCount: 40 }
            ]
          },
          {
            name: '医疗服务',
            enterpriseCount: 280,
            children: [
              { name: '第三方检验', enterpriseCount: 120 },
              { name: '第三方影像', enterpriseCount: 80 },
              { name: '医疗信息化', enterpriseCount: 80 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-display',
    name: '超高清视频显示',
    icon: '📺',
    color: '#1890ff',
    stats: {
      shenzhenCount: 7200,
      nationalCount: 20000,
      percentage: 36.0
    },
    description: '华星光电、创维等企业带动，面板产业集聚',
    hierarchy: [
      {
        name: '显示面板',
        enterpriseCount: 1200,
        children: [
          {
            name: 'LCD',
            enterpriseCount: 480,
            children: [
              { name: '大尺寸TV', enterpriseCount: 180 },
              { name: '中小尺寸', enterpriseCount: 200 },
              { name: '商显', enterpriseCount: 100 }
            ]
          },
          {
            name: 'OLED',
            enterpriseCount: 420,
            children: [
              { name: '刚性OLED', enterpriseCount: 180 },
              { name: '柔性OLED', enterpriseCount: 160 },
              { name: '折叠屏', enterpriseCount: 80 }
            ]
          },
          {
            name: 'Mini/Micro LED',
            enterpriseCount: 300,
            children: [
              { name: 'Mini LED背光', enterpriseCount: 140 },
              { name: 'Micro LED直显', enterpriseCount: 100 },
              { name: 'LED芯片', enterpriseCount: 60 }
            ]
          }
        ]
      },
      {
        name: '显示材料',
        enterpriseCount: 1800,
        children: [
          {
            name: '玻璃基板',
            enterpriseCount: 380,
            children: [
              { name: 'TFT玻璃', enterpriseCount: 180 },
              { name: '盖板玻璃', enterpriseCount: 120 },
              { name: '柔性基底', enterpriseCount: 80 }
            ]
          },
          {
            name: '发光材料',
            enterpriseCount: 480,
            children: [
              { name: '液晶材料', enterpriseCount: 200 },
              { name: 'OLED材料', enterpriseCount: 180 },
              { name: '量子点', enterpriseCount: 100 }
            ]
          },
          {
            name: '偏光片/滤光片',
            enterpriseCount: 420,
            children: [
              { name: '偏光片', enterpriseCount: 180 },
              { name: '彩膜', enterpriseCount: 140 },
              { name: '增亮膜', enterpriseCount: 100 }
            ]
          },
          {
            name: '驱动IC',
            enterpriseCount: 520,
            children: [
              { name: 'TDDI', enterpriseCount: 200 },
              { name: 'OLED驱动', enterpriseCount: 180 },
              { name: 'TCON', enterpriseCount: 140 }
            ]
          }
        ]
      },
      {
        name: '显示设备',
        enterpriseCount: 2800,
        children: [
          {
            name: 'TV',
            enterpriseCount: 680,
            children: [
              { name: '8K TV', enterpriseCount: 180 },
              { name: '4K TV', enterpriseCount: 320 },
              { name: '激光电视', enterpriseCount: 100 },
              { name: '投影', enterpriseCount: 80 }
            ]
          },
          {
            name: '显示器',
            enterpriseCount: 920,
            children: [
              { name: '电竞显示器', enterpriseCount: 380 },
              { name: '办公显示器', enterpriseCount: 320 },
              { name: '专业显示器', enterpriseCount: 220 }
            ]
          },
          {
            name: '商显',
            enterpriseCount: 1200,
            children: [
              { name: '数字标牌', enterpriseCount: 420 },
              { name: '会议平板', enterpriseCount: 380 },
              { name: 'LED大屏', enterpriseCount: 280 },
              { name: '透明屏', enterpriseCount: 120 }
            ]
          }
        ]
      },
      {
        name: '内容制作',
        enterpriseCount: 1400,
        children: [
          {
            name: '拍摄设备',
            enterpriseCount: 480,
            children: [
              { name: '8K摄像机', enterpriseCount: 120 },
              { name: '无人机航拍', enterpriseCount: 220 },
              { name: '运动相机', enterpriseCount: 140 }
            ]
          },
          {
            name: '制作系统',
            enterpriseCount: 520,
            children: [
              { name: '转播车', enterpriseCount: 80 },
              { name: '非编系统', enterpriseCount: 220 },
              { name: '虚拟制作', enterpriseCount: 140 },
              { name: 'AI修复', enterpriseCount: 80 }
            ]
          },
          {
            name: '内容平台',
            enterpriseCount: 400,
            children: [
              { name: '超高清频道', enterpriseCount: 120 },
              { name: '流媒体平台', enterpriseCount: 180 },
              { name: 'VR内容', enterpriseCount: 100 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-material',
    name: '新材料',
    icon: '🧪',
    color: '#fa541c',
    stats: {
      shenzhenCount: 5200,
      nationalCount: 28000,
      percentage: 18.6
    },
    description: '电子信息材料、新能源材料等细分领域发展迅速',
    hierarchy: [
      {
        name: '电子信息材料',
        enterpriseCount: 1800,
        children: [
          {
            name: '半导体材料',
            enterpriseCount: 520,
            children: [
              { name: '硅片', enterpriseCount: 120 },
              { name: '光刻胶', enterpriseCount: 100 },
              { name: '电子特气', enterpriseCount: 140 },
              { name: 'CMP材料', enterpriseCount: 100 },
              { name: '靶材', enterpriseCount: 60 }
            ]
          },
          {
            name: '显示材料',
            enterpriseCount: 480,
            children: [
              { name: '液晶材料', enterpriseCount: 140 },
              { name: 'OLED材料', enterpriseCount: 160 },
              { name: '玻璃基板', enterpriseCount: 100 },
              { name: '偏光片', enterpriseCount: 80 }
            ]
          },
          {
            name: 'PCB材料',
            enterpriseCount: 800,
            children: [
              { name: '覆铜板', enterpriseCount: 280 },
              { name: '铜箔', enterpriseCount: 220 },
              { name: '树脂', enterpriseCount: 180 },
              { name: '油墨', enterpriseCount: 120 }
            ]
          }
        ]
      },
      {
        name: '新能源材料',
        enterpriseCount: 1200,
        children: [
          {
            name: '锂电材料',
            enterpriseCount: 680,
            children: [
              { name: '正极材料', enterpriseCount: 180 },
              { name: '负极材料', enterpriseCount: 160 },
              { name: '电解液', enterpriseCount: 140 },
              { name: '隔膜', enterpriseCount: 120 },
              { name: '集流体', enterpriseCount: 80 }
            ]
          },
          {
            name: '光伏材料',
            enterpriseCount: 320,
            children: [
              { name: '硅料', enterpriseCount: 60 },
              { name: '硅片', enterpriseCount: 80 },
              { name: '电池片', enterpriseCount: 100 },
              { name: '组件', enterpriseCount: 80 }
            ]
          },
          {
            name: '氢能材料',
            enterpriseCount: 200,
            children: [
              { name: '膜电极', enterpriseCount: 80 },
              { name: '双极板', enterpriseCount: 60 },
              { name: '储氢材料', enterpriseCount: 60 }
            ]
          }
        ]
      },
      {
        name: '先进金属材料',
        enterpriseCount: 1000,
        children: [
          {
            name: '稀土功能材料',
            enterpriseCount: 280,
            children: [
              { name: '永磁材料', enterpriseCount: 120 },
              { name: '催化材料', enterpriseCount: 80 },
              { name: '发光材料', enterpriseCount: 80 }
            ]
          },
          {
            name: '高温合金',
            enterpriseCount: 180,
            children: [
              { name: '航空合金', enterpriseCount: 80 },
              { name: '燃气轮机', enterpriseCount: 60 },
              { name: '核电材料', enterpriseCount: 40 }
            ]
          },
          {
            name: '轻合金',
            enterpriseCount: 540,
            children: [
              { name: '铝合金', enterpriseCount: 280 },
              { name: '镁合金', enterpriseCount: 160 },
              { name: '钛合金', enterpriseCount: 100 }
            ]
          }
        ]
      },
      {
        name: '高性能复合材料',
        enterpriseCount: 1200,
        children: [
          {
            name: '碳纤维',
            enterpriseCount: 380,
            children: [
              { name: 'T300-T700', enterpriseCount: 180 },
              { name: 'T800+', enterpriseCount: 120 },
              { name: '碳纤维制品', enterpriseCount: 80 }
            ]
          },
          {
            name: '高性能陶瓷',
            enterpriseCount: 420,
            children: [
              { name: '结构陶瓷', enterpriseCount: 180 },
              { name: '功能陶瓷', enterpriseCount: 160 },
              { name: '陶瓷基复材', enterpriseCount: 80 }
            ]
          },
          {
            name: '高分子材料',
            enterpriseCount: 400,
            children: [
              { name: '工程塑料', enterpriseCount: 180 },
              { name: '特种橡胶', enterpriseCount: 120 },
              { name: '高性能纤维', enterpriseCount: 100 }
            ]
          }
        ]
      }
    ]
  }
];

// 统计数据
export const industryChainStats = {
  totalChains: industryChains.length,
  totalShenzhenEnterprises: industryChains.reduce((sum, chain) => sum + chain.stats.shenzhenCount, 0),
  totalNationalEnterprises: industryChains.reduce((sum, chain) => sum + chain.stats.nationalCount, 0),
  averagePercentage: (industryChains.reduce((sum, chain) => sum + chain.stats.percentage, 0) / industryChains.length).toFixed(1)
};
