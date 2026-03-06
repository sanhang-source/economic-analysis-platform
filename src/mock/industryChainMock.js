/**
 * IndustryChain Mock Data - 深圳区域产业数据
 * 基于深圳市真实产业情况构建
 * 数据参考：深圳市统计局、深圳市工信局公开数据
 */

// 为节点生成唯一ID
let nodeIdCounter = 0;
const generateNodeId = () => `node-${++nodeIdCounter}`;

// 递归为所有节点添加ID
const addNodeIds = (nodes, parentId = null) => {
  return nodes.map((node, index) => {
    const id = generateNodeId();
    const newNode = {
      ...node,
      id,
      parentId,
      path: parentId ? `${parentId}.${index}` : `${index}`,
    };
    if (node.children) {
      newNode.children = addNodeIds(node.children, id);
    }
    return newNode;
  });
};

// 原始产业链数据 - 基于深圳真实情况
const rawIndustryChains = [
  {
    id: 'chain-network',
    name: '网络与通信',
    icon: '📡',
    color: '#1677ff',
    stats: {
      shenzhenCount: 28450,
      nationalCount: 45800,
      percentage: 62.1
    },
    hierarchy: [
      {
        name: '通信设备',
        enterpriseCount: 8200,
        children: [
          {
            name: '基站设备',
            enterpriseCount: 2850,
            children: [
              { name: '5G基站', enterpriseCount: 1650 },
              { name: '4G基站', enterpriseCount: 980 },
              { name: '小基站', enterpriseCount: 220 }
            ]
          },
          {
            name: '传输设备',
            enterpriseCount: 2650,
            children: [
              { name: '光传输', enterpriseCount: 1380 },
              { name: '微波传输', enterpriseCount: 720 },
              { name: '卫星传输', enterpriseCount: 550 }
            ]
          },
          {
            name: '核心网设备',
            enterpriseCount: 2700,
            children: [
              { name: '交换机', enterpriseCount: 1150 },
              { name: '路由器', enterpriseCount: 1050 },
              { name: '网关', enterpriseCount: 500 }
            ]
          }
        ]
      },
      {
        name: '终端设备',
        enterpriseCount: 12800,
        children: [
          {
            name: '智能手机',
            enterpriseCount: 5200,
            children: [
              { name: '5G手机', enterpriseCount: 3200 },
              { name: '4G手机', enterpriseCount: 1450 },
              { name: '折叠屏手机', enterpriseCount: 550 }
            ]
          },
          {
            name: 'IoT终端',
            enterpriseCount: 4800,
            children: [
              { name: '智能穿戴', enterpriseCount: 2100 },
              { name: '智能家居', enterpriseCount: 1750 },
              { name: '车载终端', enterpriseCount: 950 }
            ]
          },
          {
            name: '通信模组',
            enterpriseCount: 2800,
            children: [
              { name: '5G模组', enterpriseCount: 1350 },
              { name: '4G模组', enterpriseCount: 920 },
              { name: 'NB-IoT模组', enterpriseCount: 530 }
            ]
          }
        ]
      },
      {
        name: '光通信',
        enterpriseCount: 7450,
        children: [
          {
            name: '光模块',
            enterpriseCount: 2980,
            children: [
              { name: '100G+高速光模块', enterpriseCount: 850 },
              { name: '25G/50G光模块', enterpriseCount: 1150 },
              { name: '10G及以下光模块', enterpriseCount: 980 }
            ]
          },
          {
            name: '光纤光缆',
            enterpriseCount: 2850,
            children: [
              { name: '通信光纤', enterpriseCount: 1420 },
              { name: '特种光纤', enterpriseCount: 780 },
              { name: '光缆组件', enterpriseCount: 650 }
            ]
          },
          {
            name: '光器件',
            enterpriseCount: 1620,
            children: [
              { name: '激光器', enterpriseCount: 650 },
              { name: '探测器', enterpriseCount: 520 },
              { name: '光开关', enterpriseCount: 450 }
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
      shenzhenCount: 42500,
      nationalCount: 98500,
      percentage: 43.1
    },
    hierarchy: [
      {
        name: '基础软件',
        enterpriseCount: 6200,
        children: [
          {
            name: '操作系统',
            enterpriseCount: 1150,
            children: [
              { name: '移动OS', enterpriseCount: 280 },
              { name: '物联网OS', enterpriseCount: 380 },
              { name: '服务器OS', enterpriseCount: 320 },
              { name: '嵌入式OS', enterpriseCount: 170 }
            ]
          },
          {
            name: '数据库',
            enterpriseCount: 1680,
            children: [
              { name: '关系型', enterpriseCount: 480 },
              { name: 'NoSQL', enterpriseCount: 620 },
              { name: '时序数据库', enterpriseCount: 320 },
              { name: '图数据库', enterpriseCount: 260 }
            ]
          },
          {
            name: '中间件',
            enterpriseCount: 3370,
            children: [
              { name: '应用服务器', enterpriseCount: 780 },
              { name: '消息队列', enterpriseCount: 820 },
              { name: '缓存中间件', enterpriseCount: 620 },
              { name: '微服务框架', enterpriseCount: 1150 }
            ]
          }
        ]
      },
      {
        name: '云计算',
        enterpriseCount: 7800,
        children: [
          {
            name: 'IaaS',
            enterpriseCount: 2100,
            children: [
              { name: '云服务器', enterpriseCount: 620 },
              { name: '云存储', enterpriseCount: 520 },
              { name: '云网络', enterpriseCount: 550 },
              { name: '裸金属', enterpriseCount: 410 }
            ]
          },
          {
            name: 'PaaS',
            enterpriseCount: 3050,
            children: [
              { name: '容器服务', enterpriseCount: 820 },
              { name: 'DevOps', enterpriseCount: 680 },
              { name: '低代码平台', enterpriseCount: 880 },
              { name: 'AI平台', enterpriseCount: 670 }
            ]
          },
          {
            name: 'SaaS',
            enterpriseCount: 2650,
            children: [
              { name: '办公协同', enterpriseCount: 620 },
              { name: 'CRM/ERP', enterpriseCount: 780 },
              { name: '财税法务', enterpriseCount: 480 },
              { name: '垂直行业', enterpriseCount: 770 }
            ]
          }
        ]
      },
      {
        name: '人工智能',
        enterpriseCount: 11500,
        children: [
          {
            name: 'AI芯片',
            enterpriseCount: 2650,
            children: [
              { name: '云端训练', enterpriseCount: 480 },
              { name: '云端推理', enterpriseCount: 620 },
              { name: '边缘AI', enterpriseCount: 870 },
              { name: '终端AI', enterpriseCount: 680 }
            ]
          },
          {
            name: '算法框架',
            enterpriseCount: 3650,
            children: [
              { name: '深度学习框架', enterpriseCount: 380 },
              { name: '大模型', enterpriseCount: 820 },
              { name: '计算机视觉', enterpriseCount: 1150 },
              { name: '智能语音', enterpriseCount: 650 },
              { name: 'NLP', enterpriseCount: 650 }
            ]
          },
          {
            name: 'AI应用',
            enterpriseCount: 5200,
            children: [
              { name: '智慧城市', enterpriseCount: 1450 },
              { name: '智能金融', enterpriseCount: 920 },
              { name: '智能医疗', enterpriseCount: 780 },
              { name: '智能制造', enterpriseCount: 1150 },
              { name: '自动驾驶', enterpriseCount: 900 }
            ]
          }
        ]
      },
      {
        name: '互联网服务',
        enterpriseCount: 17000,
        children: [
          {
            name: '电商平台',
            enterpriseCount: 4850,
            children: [
              { name: '综合电商', enterpriseCount: 620 },
              { name: '跨境电商', enterpriseCount: 1420 },
              { name: '社交电商', enterpriseCount: 1580 },
              { name: '直播电商', enterpriseCount: 1230 }
            ]
          },
          {
            name: '数字内容',
            enterpriseCount: 6200,
            children: [
              { name: '游戏', enterpriseCount: 2050 },
              { name: '视频', enterpriseCount: 1420 },
              { name: '音乐', enterpriseCount: 920 },
              { name: '阅读', enterpriseCount: 1150 },
              { name: '动漫', enterpriseCount: 860 }
            ]
          },
          {
            name: '生活服务',
            enterpriseCount: 5950,
            children: [
              { name: '本地生活', enterpriseCount: 1720 },
              { name: '在线教育', enterpriseCount: 1220 },
              { name: '在线医疗', enterpriseCount: 920 },
              { name: '金融科技', enterpriseCount: 1150 },
              { name: '出行服务', enterpriseCount: 940 }
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
      shenzhenCount: 15200,
      nationalCount: 35200,
      percentage: 43.2
    },
    hierarchy: [
      {
        name: '芯片设计',
        enterpriseCount: 7800,
        children: [
          {
            name: '数字芯片',
            enterpriseCount: 3850,
            children: [
              { name: 'CPU/GPU', enterpriseCount: 250 },
              { name: 'AI芯片', enterpriseCount: 580 },
              { name: 'MCU', enterpriseCount: 1680 },
              { name: 'SoC', enterpriseCount: 1340 }
            ]
          },
          {
            name: '模拟芯片',
            enterpriseCount: 2650,
            children: [
              { name: '电源管理', enterpriseCount: 1120 },
              { name: '信号链', enterpriseCount: 850 },
              { name: '射频芯片', enterpriseCount: 680 }
            ]
          },
          {
            name: '传感器芯片',
            enterpriseCount: 1300,
            children: [
              { name: '图像传感器', enterpriseCount: 420 },
              { name: 'MEMS传感器', enterpriseCount: 480 },
              { name: '环境传感器', enterpriseCount: 400 }
            ]
          }
        ]
      },
      {
        name: '晶圆制造',
        enterpriseCount: 0,
        children: [
          {
            name: '逻辑代工',
            enterpriseCount: 120,
            children: [
              { name: '先进制程(<28nm)', enterpriseCount: 15 },
              { name: '成熟制程(28nm+)', enterpriseCount: 105 }
            ]
          },
          {
            name: '特色工艺',
            enterpriseCount: 180,
            children: [
              { name: '功率器件', enterpriseCount: 75 },
              { name: '模拟工艺', enterpriseCount: 65 },
              { name: 'MEMS工艺', enterpriseCount: 40 }
            ]
          },
          {
            name: '封测服务',
            enterpriseCount: 80,
            children: [
              { name: '先进封装', enterpriseCount: 35 },
              { name: '传统封装', enterpriseCount: 45 }
            ]
          }
        ]
      },
      {
        name: '半导体材料',
        enterpriseCount: 2280,
        children: [
          {
            name: '晶圆材料',
            enterpriseCount: 580,
            children: [
              { name: '硅片', enterpriseCount: 240 },
              { name: '化合物半导体', enterpriseCount: 220 },
              { name: 'SOI', enterpriseCount: 120 }
            ]
          },
          {
            name: '工艺材料',
            enterpriseCount: 1050,
            children: [
              { name: '光刻胶', enterpriseCount: 280 },
              { name: '电子特气', enterpriseCount: 350 },
              { name: 'CMP材料', enterpriseCount: 250 },
              { name: '靶材', enterpriseCount: 170 }
            ]
          },
          {
            name: '封装材料',
            enterpriseCount: 650,
            children: [
              { name: '引线框架', enterpriseCount: 270 },
              { name: '基板', enterpriseCount: 240 },
              { name: '塑封料', enterpriseCount: 140 }
            ]
          }
        ]
      },
      {
        name: '设备零部件',
        enterpriseCount: 4740,
        children: [
          {
            name: '前道设备',
            enterpriseCount: 2050,
            children: [
              { name: '光刻设备', enterpriseCount: 120 },
              { name: '刻蚀设备', enterpriseCount: 280 },
              { name: '薄膜沉积', enterpriseCount: 350 },
              { name: '检测设备', enterpriseCount: 780 },
              { name: '清洗设备', enterpriseCount: 520 }
            ]
          },
          {
            name: '后道设备',
            enterpriseCount: 1820,
            children: [
              { name: '划片机', enterpriseCount: 280 },
              { name: '贴片机', enterpriseCount: 420 },
              { name: '焊线机', enterpriseCount: 350 },
              { name: '测试分选', enterpriseCount: 770 }
            ]
          },
          {
            name: '关键零部件',
            enterpriseCount: 870,
            children: [
              { name: '真空系统', enterpriseCount: 250 },
              { name: '光学系统', enterpriseCount: 280 },
              { name: '精密机械', enterpriseCount: 340 }
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
      shenzhenCount: 12150,
      nationalCount: 21800,
      percentage: 55.7
    },
    hierarchy: [
      {
        name: '工业机器人',
        enterpriseCount: 2850,
        children: [
          {
            name: '多关节机器人',
            enterpriseCount: 780,
            children: [
              { name: '六轴机器人', enterpriseCount: 450 },
              { name: 'SCARA', enterpriseCount: 250 },
              { name: '协作机器人', enterpriseCount: 80 }
            ]
          },
          {
            name: '移动机器人',
            enterpriseCount: 1080,
            children: [
              { name: 'AGV', enterpriseCount: 600 },
              { name: 'AMR', enterpriseCount: 280 },
              { name: '无人叉车', enterpriseCount: 200 }
            ]
          },
          {
            name: '特种机器人',
            enterpriseCount: 990,
            children: [
              { name: '焊接机器人', enterpriseCount: 320 },
              { name: '喷涂机器人', enterpriseCount: 250 },
              { name: '码垛机器人', enterpriseCount: 230 },
              { name: '检测机器人', enterpriseCount: 190 }
            ]
          }
        ]
      },
      {
        name: '服务机器人',
        enterpriseCount: 2480,
        children: [
          {
            name: '商用服务',
            enterpriseCount: 1050,
            children: [
              { name: '清洁机器人', enterpriseCount: 380 },
              { name: '配送机器人', enterpriseCount: 320 },
              { name: '引导机器人', enterpriseCount: 240 },
              { name: '安防机器人', enterpriseCount: 110 }
            ]
          },
          {
            name: '家用服务',
            enterpriseCount: 850,
            children: [
              { name: '扫地机器人', enterpriseCount: 450 },
              { name: '教育机器人', enterpriseCount: 240 },
              { name: '陪伴机器人', enterpriseCount: 160 }
            ]
          },
          {
            name: '医疗机器人',
            enterpriseCount: 580,
            children: [
              { name: '手术机器人', enterpriseCount: 110 },
              { name: '康复机器人', enterpriseCount: 250 },
              { name: '护理机器人', enterpriseCount: 220 }
            ]
          }
        ]
      },
      {
        name: '特种机器人',
        enterpriseCount: 5820,
        children: [
          {
            name: '无人机',
            enterpriseCount: 4320,
            children: [
              { name: '消费级', enterpriseCount: 1580 },
              { name: '行业级', enterpriseCount: 1980 },
              { name: '载人级', enterpriseCount: 760 }
            ]
          },
          {
            name: '水下机器人',
            enterpriseCount: 780,
            children: [
              { name: 'ROV', enterpriseCount: 420 },
              { name: 'AUV', enterpriseCount: 180 },
              { name: '水下无人机', enterpriseCount: 180 }
            ]
          },
          {
            name: '空间机器人',
            enterpriseCount: 720,
            children: [
              { name: '卫星服务', enterpriseCount: 280 },
              { name: '空间探测', enterpriseCount: 180 },
              { name: '在轨维护', enterpriseCount: 260 }
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
    id: 'chain-new-energy',
    name: '新能源汽车',
    icon: '🚗',
    color: '#52c41a',
    stats: {
      shenzhenCount: 8200,
      nationalCount: 32800,
      percentage: 25.0
    },
    hierarchy: [
      {
        name: '动力电池',
        enterpriseCount: 1850,
        children: [
          {
            name: '电芯制造',
            enterpriseCount: 280,
            children: [
              { name: '磷酸铁锂', enterpriseCount: 165 },
              { name: '三元锂电', enterpriseCount: 85 },
              { name: '固态电池', enterpriseCount: 30 }
            ]
          },
          {
            name: '电池系统',
            enterpriseCount: 620,
            children: [
              { name: 'BMS', enterpriseCount: 280 },
              { name: '电池包', enterpriseCount: 240 },
              { name: '热管理', enterpriseCount: 100 }
            ]
          },
          {
            name: '电池材料',
            enterpriseCount: 950,
            children: [
              { name: '正极材料', enterpriseCount: 250 },
              { name: '负极材料', enterpriseCount: 230 },
              { name: '电解液', enterpriseCount: 200 },
              { name: '隔膜', enterpriseCount: 155 },
              { name: '集流体', enterpriseCount: 115 }
            ]
          }
        ]
      },
      {
        name: '电驱系统',
        enterpriseCount: 1680,
        children: [
          {
            name: '驱动电机',
            enterpriseCount: 520,
            children: [
              { name: '永磁同步', enterpriseCount: 300 },
              { name: '交流异步', enterpriseCount: 140 },
              { name: '轮毂电机', enterpriseCount: 80 }
            ]
          },
          {
            name: '电机控制器',
            enterpriseCount: 420,
            children: [
              { name: 'IGBT模块', enterpriseCount: 140 },
              { name: 'SiC器件', enterpriseCount: 80 },
              { name: '控制板', enterpriseCount: 200 }
            ]
          },
          {
            name: '减速器',
            enterpriseCount: 280,
            children: [
              { name: '单级减速', enterpriseCount: 170 },
              { name: '多挡变速', enterpriseCount: 65 },
              { name: '电驱桥', enterpriseCount: 45 }
            ]
          }
        ]
      },
      {
        name: '智能网联',
        enterpriseCount: 2280,
        children: [
          {
            name: '智能驾驶',
            enterpriseCount: 980,
            children: [
              { name: '激光雷达', enterpriseCount: 145 },
              { name: '毫米波雷达', enterpriseCount: 220 },
              { name: '摄像头', enterpriseCount: 240 },
              { name: '域控制器', enterpriseCount: 265 },
              { name: '算法方案', enterpriseCount: 110 }
            ]
          },
          {
            name: '智能座舱',
            enterpriseCount: 780,
            children: [
              { name: '中控屏', enterpriseCount: 185 },
              { name: '液晶仪表', enterpriseCount: 165 },
              { name: 'HUD', enterpriseCount: 80 },
              { name: '语音交互', enterpriseCount: 205 },
              { name: '车联网', enterpriseCount: 145 }
            ]
          },
          {
            name: '线控底盘',
            enterpriseCount: 520,
            children: [
              { name: '线控制动', enterpriseCount: 165 },
              { name: '线控转向', enterpriseCount: 120 },
              { name: '空气悬架', enterpriseCount: 140 },
              { name: '线控换挡', enterpriseCount: 95 }
            ]
          }
        ]
      },
      {
        name: '整车制造',
        enterpriseCount: 2390,
        children: [
          {
            name: '乘用车',
            enterpriseCount: 1080,
            children: [
              { name: '轿车', enterpriseCount: 380 },
              { name: 'SUV', enterpriseCount: 520 },
              { name: 'MPV', enterpriseCount: 180 }
            ]
          },
          {
            name: '商用车',
            enterpriseCount: 720,
            children: [
              { name: '客车', enterpriseCount: 250 },
              { name: '物流车', enterpriseCount: 340 },
              { name: '专用车', enterpriseCount: 130 }
            ]
          },
          {
            name: '代工服务',
            enterpriseCount: 590,
            children: [
              { name: '整车ODM', enterpriseCount: 310 },
              { name: '零部件配套', enterpriseCount: 280 }
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
      shenzhenCount: 4200,
      nationalCount: 15200,
      percentage: 27.6
    },
    hierarchy: [
      {
        name: '生物制药',
        enterpriseCount: 850,
        children: [
          {
            name: '创新药',
            enterpriseCount: 320,
            children: [
              { name: '抗体药物', enterpriseCount: 125 },
              { name: '细胞基因治疗', enterpriseCount: 85 },
              { name: '重组蛋白', enterpriseCount: 70 },
              { name: '疫苗', enterpriseCount: 40 }
            ]
          },
          {
            name: '仿制药',
            enterpriseCount: 320,
            children: [
              { name: '化学仿制药', enterpriseCount: 210 },
              { name: '生物类似药', enterpriseCount: 110 }
            ]
          },
          {
            name: 'CXO服务',
            enterpriseCount: 210,
            children: [
              { name: 'CRO', enterpriseCount: 85 },
              { name: 'CDMO', enterpriseCount: 75 },
              { name: 'CMO', enterpriseCount: 50 }
            ]
          }
        ]
      },
      {
        name: '医疗器械',
        enterpriseCount: 1850,
        children: [
          {
            name: '诊断设备',
            enterpriseCount: 620,
            children: [
              { name: '影像设备', enterpriseCount: 205 },
              { name: '体外诊断', enterpriseCount: 265 },
              { name: '监护设备', enterpriseCount: 110 },
              { name: '内窥镜', enterpriseCount: 40 }
            ]
          },
          {
            name: '治疗设备',
            enterpriseCount: 560,
            children: [
              { name: '手术机器人', enterpriseCount: 85 },
              { name: '放疗设备', enterpriseCount: 55 },
              { name: '激光治疗', enterpriseCount: 205 },
              { name: '透析设备', enterpriseCount: 175 },
              { name: '呼吸机', enterpriseCount: 40 }
            ]
          },
          {
            name: '耗材',
            enterpriseCount: 670,
            children: [
              { name: '高值耗材', enterpriseCount: 270 },
              { name: '低值耗材', enterpriseCount: 300 },
              { name: '试剂', enterpriseCount: 100 }
            ]
          }
        ]
      },
      {
        name: '精准医疗',
        enterpriseCount: 980,
        children: [
          {
            name: '基因检测',
            enterpriseCount: 380,
            children: [
              { name: '基因测序', enterpriseCount: 145 },
              { name: '基因编辑', enterpriseCount: 65 },
              { name: '伴随诊断', enterpriseCount: 125 },
              { name: '早筛', enterpriseCount: 45 }
            ]
          },
          {
            name: '合成生物',
            enterpriseCount: 320,
            children: [
              { name: '基因合成', enterpriseCount: 100 },
              { name: '蛋白质工程', enterpriseCount: 85 },
              { name: '代谢工程', enterpriseCount: 85 },
              { name: '酶工程', enterpriseCount: 50 }
            ]
          },
          {
            name: '智慧医疗',
            enterpriseCount: 280,
            children: [
              { name: 'AI辅助诊断', enterpriseCount: 100 },
              { name: '远程医疗', enterpriseCount: 85 },
              { name: '健康管理', enterpriseCount: 95 }
            ]
          }
        ]
      },
      {
        name: '医药商业',
        enterpriseCount: 520,
        children: [
          {
            name: '医药流通',
            enterpriseCount: 270,
            children: [
              { name: '批发', enterpriseCount: 150 },
              { name: '零售', enterpriseCount: 85 },
              { name: '电商', enterpriseCount: 35 }
            ]
          },
          {
            name: '医疗服务',
            enterpriseCount: 250,
            children: [
              { name: '第三方检验', enterpriseCount: 105 },
              { name: '第三方影像', enterpriseCount: 70 },
              { name: '医疗信息化', enterpriseCount: 75 }
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
      shenzhenCount: 6200,
      nationalCount: 20500,
      percentage: 30.2
    },
    hierarchy: [
      {
        name: '显示面板',
        enterpriseCount: 980,
        children: [
          {
            name: 'LCD',
            enterpriseCount: 380,
            children: [
              { name: '大尺寸TV', enterpriseCount: 145 },
              { name: '中小尺寸', enterpriseCount: 160 },
              { name: '商显', enterpriseCount: 75 }
            ]
          },
          {
            name: 'OLED',
            enterpriseCount: 340,
            children: [
              { name: '刚性OLED', enterpriseCount: 145 },
              { name: '柔性OLED', enterpriseCount: 130 },
              { name: '折叠屏', enterpriseCount: 65 }
            ]
          },
          {
            name: 'Mini/Micro LED',
            enterpriseCount: 260,
            children: [
              { name: 'Mini LED背光', enterpriseCount: 120 },
              { name: 'Micro LED直显', enterpriseCount: 85 },
              { name: 'LED芯片', enterpriseCount: 55 }
            ]
          }
        ]
      },
      {
        name: '显示材料',
        enterpriseCount: 1520,
        children: [
          {
            name: '玻璃基板',
            enterpriseCount: 320,
            children: [
              { name: 'TFT玻璃', enterpriseCount: 150 },
              { name: '盖板玻璃', enterpriseCount: 100 },
              { name: '柔性基底', enterpriseCount: 70 }
            ]
          },
          {
            name: '发光材料',
            enterpriseCount: 400,
            children: [
              { name: '液晶材料', enterpriseCount: 165 },
              { name: 'OLED材料', enterpriseCount: 150 },
              { name: '量子点', enterpriseCount: 85 }
            ]
          },
          {
            name: '偏光片/滤光片',
            enterpriseCount: 350,
            children: [
              { name: '偏光片', enterpriseCount: 150 },
              { name: '彩膜', enterpriseCount: 115 },
              { name: '增亮膜', enterpriseCount: 85 }
            ]
          },
          {
            name: '驱动IC',
            enterpriseCount: 450,
            children: [
              { name: 'TDDI', enterpriseCount: 170 },
              { name: 'OLED驱动', enterpriseCount: 155 },
              { name: 'TCON', enterpriseCount: 125 }
            ]
          }
        ]
      },
      {
        name: '显示设备',
        enterpriseCount: 2350,
        children: [
          {
            name: 'TV',
            enterpriseCount: 550,
            children: [
              { name: '8K TV', enterpriseCount: 150 },
              { name: '4K TV', enterpriseCount: 260 },
              { name: '激光电视', enterpriseCount: 80 },
              { name: '投影', enterpriseCount: 60 }
            ]
          },
          {
            name: '显示器',
            enterpriseCount: 750,
            children: [
              { name: '电竞显示器', enterpriseCount: 310 },
              { name: '办公显示器', enterpriseCount: 260 },
              { name: '专业显示器', enterpriseCount: 180 }
            ]
          },
          {
            name: '商显',
            enterpriseCount: 1050,
            children: [
              { name: '数字标牌', enterpriseCount: 360 },
              { name: '会议平板', enterpriseCount: 330 },
              { name: 'LED大屏', enterpriseCount: 245 },
              { name: '透明屏', enterpriseCount: 115 }
            ]
          }
        ]
      },
      {
        name: '内容制作',
        enterpriseCount: 1350,
        children: [
          {
            name: '拍摄设备',
            enterpriseCount: 450,
            children: [
              { name: '8K摄像机', enterpriseCount: 115 },
              { name: '无人机航拍', enterpriseCount: 210 },
              { name: '运动相机', enterpriseCount: 125 }
            ]
          },
          {
            name: '制作系统',
            enterpriseCount: 480,
            children: [
              { name: '转播车', enterpriseCount: 75 },
              { name: '非编系统', enterpriseCount: 200 },
              { name: '虚拟制作', enterpriseCount: 130 },
              { name: 'AI修复', enterpriseCount: 75 }
            ]
          },
          {
            name: '内容平台',
            enterpriseCount: 420,
            children: [
              { name: '超高清频道', enterpriseCount: 125 },
              { name: '流媒体平台', enterpriseCount: 190 },
              { name: 'VR内容', enterpriseCount: 105 }
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
      shenzhenCount: 4800,
      nationalCount: 28500,
      percentage: 16.8
    },
    hierarchy: [
      {
        name: '电子信息材料',
        enterpriseCount: 1580,
        children: [
          {
            name: '半导体材料',
            enterpriseCount: 450,
            children: [
              { name: '硅片', enterpriseCount: 105 },
              { name: '光刻胶', enterpriseCount: 90 },
              { name: '电子特气', enterpriseCount: 120 },
              { name: 'CMP材料', enterpriseCount: 85 },
              { name: '靶材', enterpriseCount: 50 }
            ]
          },
          {
            name: '显示材料',
            enterpriseCount: 410,
            children: [
              { name: '液晶材料', enterpriseCount: 120 },
              { name: 'OLED材料', enterpriseCount: 140 },
              { name: '玻璃基板', enterpriseCount: 85 },
              { name: '偏光片', enterpriseCount: 65 }
            ]
          },
          {
            name: 'PCB材料',
            enterpriseCount: 720,
            children: [
              { name: '覆铜板', enterpriseCount: 250 },
              { name: '铜箔', enterpriseCount: 200 },
              { name: '树脂', enterpriseCount: 165 },
              { name: '油墨', enterpriseCount: 105 }
            ]
          }
        ]
      },
      {
        name: '新能源材料',
        enterpriseCount: 1050,
        children: [
          {
            name: '锂电材料',
            enterpriseCount: 580,
            children: [
              { name: '正极材料', enterpriseCount: 155 },
              { name: '负极材料', enterpriseCount: 140 },
              { name: '电解液', enterpriseCount: 120 },
              { name: '隔膜', enterpriseCount: 100 },
              { name: '集流体', enterpriseCount: 65 }
            ]
          },
          {
            name: '光伏材料',
            enterpriseCount: 280,
            children: [
              { name: '硅料', enterpriseCount: 55 },
              { name: '硅片', enterpriseCount: 70 },
              { name: '电池片', enterpriseCount: 85 },
              { name: '组件', enterpriseCount: 70 }
            ]
          },
          {
            name: '氢能材料',
            enterpriseCount: 190,
            children: [
              { name: '膜电极', enterpriseCount: 75 },
              { name: '双极板', enterpriseCount: 55 },
              { name: '储氢材料', enterpriseCount: 60 }
            ]
          }
        ]
      },
      {
        name: '先进金属材料',
        enterpriseCount: 880,
        children: [
          {
            name: '稀土功能材料',
            enterpriseCount: 240,
            children: [
              { name: '永磁材料', enterpriseCount: 105 },
              { name: '催化材料', enterpriseCount: 70 },
              { name: '发光材料', enterpriseCount: 65 }
            ]
          },
          {
            name: '高温合金',
            enterpriseCount: 160,
            children: [
              { name: '航空合金', enterpriseCount: 70 },
              { name: '燃气轮机', enterpriseCount: 50 },
              { name: '核电材料', enterpriseCount: 40 }
            ]
          },
          {
            name: '轻合金',
            enterpriseCount: 480,
            children: [
              { name: '铝合金', enterpriseCount: 250 },
              { name: '镁合金', enterpriseCount: 140 },
              { name: '钛合金', enterpriseCount: 90 }
            ]
          }
        ]
      },
      {
        name: '高性能复合材料',
        enterpriseCount: 1290,
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
            enterpriseCount: 450,
            children: [
              { name: '结构陶瓷', enterpriseCount: 195 },
              { name: '功能陶瓷', enterpriseCount: 170 },
              { name: '陶瓷基复材', enterpriseCount: 85 }
            ]
          },
          {
            name: '高分子材料',
            enterpriseCount: 460,
            children: [
              { name: '工程塑料', enterpriseCount: 205 },
              { name: '特种橡胶', enterpriseCount: 140 },
              { name: '高性能纤维', enterpriseCount: 115 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-logistics',
    name: '现代物流',
    icon: '📦',
    color: '#722ed1',
    stats: {
      shenzhenCount: 18500,
      nationalCount: 52000,
      percentage: 35.6
    },
    hierarchy: [
      {
        name: '快递物流',
        enterpriseCount: 6200,
        children: [
          {
            name: '快递服务',
            enterpriseCount: 2800,
            children: [
              { name: '国内快递', enterpriseCount: 1650 },
              { name: '国际快递', enterpriseCount: 680 },
              { name: '同城配送', enterpriseCount: 470 }
            ]
          },
          {
            name: '仓储服务',
            enterpriseCount: 2200,
            children: [
              { name: '智能仓储', enterpriseCount: 850 },
              { name: '冷链仓储', enterpriseCount: 620 },
              { name: '普通仓储', enterpriseCount: 730 }
            ]
          },
          {
            name: '末端配送',
            enterpriseCount: 1200,
            children: [
              { name: '驿站服务', enterpriseCount: 480 },
              { name: '智能快递柜', enterpriseCount: 350 },
              { name: '无人配送', enterpriseCount: 370 }
            ]
          }
        ]
      },
      {
        name: '供应链服务',
        enterpriseCount: 5200,
        children: [
          {
            name: '供应链整合',
            enterpriseCount: 1850,
            children: [
              { name: '采购执行', enterpriseCount: 680 },
              { name: '分销执行', enterpriseCount: 720 },
              { name: '供应链金融', enterpriseCount: 450 }
            ]
          },
          {
            name: '跨境物流',
            enterpriseCount: 1680,
            children: [
              { name: '国际货代', enterpriseCount: 620 },
              { name: '保税物流', enterpriseCount: 520 },
              { name: '海外仓', enterpriseCount: 540 }
            ]
          },
          {
            name: '物流科技',
            enterpriseCount: 1670,
            children: [
              { name: '物流SaaS', enterpriseCount: 580 },
              { name: '智能调度', enterpriseCount: 520 },
              { name: '物流大数据', enterpriseCount: 570 }
            ]
          }
        ]
      },
      {
        name: '专业物流',
        enterpriseCount: 7100,
        children: [
          {
            name: '冷链物流',
            enterpriseCount: 1850,
            children: [
              { name: '食品冷链', enterpriseCount: 850 },
              { name: '医药冷链', enterpriseCount: 520 },
              { name: '生鲜冷链', enterpriseCount: 480 }
            ]
          },
          {
            name: '危险品物流',
            enterpriseCount: 680,
            children: [
              { name: '化工物流', enterpriseCount: 280 },
              { name: '电池物流', enterpriseCount: 220 },
              { name: '特种运输', enterpriseCount: 180 }
            ]
          },
          {
            name: '大件物流',
            enterpriseCount: 2580,
            children: [
              { name: '家电物流', enterpriseCount: 980 },
              { name: '家具物流', enterpriseCount: 850 },
              { name: '建材物流', enterpriseCount: 750 }
            ]
          },
          {
            name: '即时物流',
            enterpriseCount: 1990,
            children: [
              { name: '外卖配送', enterpriseCount: 850 },
              { name: '即时零售', enterpriseCount: 680 },
              { name: '跑腿服务', enterpriseCount: 460 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-fintech',
    name: '金融科技',
    icon: '💳',
    color: '#13c2c2',
    stats: {
      shenzhenCount: 12800,
      nationalCount: 38500,
      percentage: 33.2
    },
    hierarchy: [
      {
        name: '支付结算',
        enterpriseCount: 3200,
        children: [
          {
            name: '第三方支付',
            enterpriseCount: 850,
            children: [
              { name: '移动支付', enterpriseCount: 420 },
              { name: '互联网支付', enterpriseCount: 280 },
              { name: '跨境支付', enterpriseCount: 150 }
            ]
          },
          {
            name: '清算结算',
            enterpriseCount: 680,
            children: [
              { name: '支付清算', enterpriseCount: 280 },
              { name: '资金结算', enterpriseCount: 240 },
              { name: '对账服务', enterpriseCount: 160 }
            ]
          },
          {
            name: '支付技术',
            enterpriseCount: 1670,
            children: [
              { name: '支付网关', enterpriseCount: 520 },
              { name: '风控系统', enterpriseCount: 620 },
              { name: '反欺诈', enterpriseCount: 530 }
            ]
          }
        ]
      },
      {
        name: '数字金融',
        enterpriseCount: 4200,
        children: [
          {
            name: '数字银行',
            enterpriseCount: 980,
            children: [
              { name: '直销银行', enterpriseCount: 350 },
              { name: '开放银行', enterpriseCount: 320 },
              { name: '虚拟银行', enterpriseCount: 310 }
            ]
          },
          {
            name: '智能投顾',
            enterpriseCount: 1180,
            children: [
              { name: '智能理财', enterpriseCount: 480 },
              { name: '智能保险', enterpriseCount: 380 },
              { name: '量化投资', enterpriseCount: 320 }
            ]
          },
          {
            name: '区块链金融',
            enterpriseCount: 2040,
            children: [
              { name: '供应链金融', enterpriseCount: 720 },
              { name: '数字货币', enterpriseCount: 580 },
              { name: '数字资产', enterpriseCount: 740 }
            ]
          }
        ]
      },
      {
        name: '金融基础设施',
        enterpriseCount: 5400,
        children: [
          {
            name: '征信服务',
            enterpriseCount: 1280,
            children: [
              { name: '企业征信', enterpriseCount: 520 },
              { name: '个人征信', enterpriseCount: 480 },
              { name: '大数据风控', enterpriseCount: 280 }
            ]
          },
          {
            name: '金融安全',
            enterpriseCount: 1680,
            children: [
              { name: '身份认证', enterpriseCount: 620 },
              { name: '数据安全', enterpriseCount: 580 },
              { name: '交易安全', enterpriseCount: 480 }
            ]
          },
          {
            name: '金融云服务',
            enterpriseCount: 2440,
            children: [
              { name: '核心系统', enterpriseCount: 850 },
              { name: '渠道系统', enterpriseCount: 720 },
              { name: '数据中台', enterpriseCount: 870 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-culture',
    name: '文化创意',
    icon: '🎨',
    color: '#eb2f96',
    stats: {
      shenzhenCount: 22800,
      nationalCount: 68500,
      percentage: 33.3
    },
    hierarchy: [
      {
        name: '数字内容',
        enterpriseCount: 9200,
        children: [
          {
            name: '游戏动漫',
            enterpriseCount: 3850,
            children: [
              { name: '游戏研发', enterpriseCount: 1680 },
              { name: '游戏运营', enterpriseCount: 980 },
              { name: '动漫制作', enterpriseCount: 720 },
              { name: '电竞产业', enterpriseCount: 470 }
            ]
          },
          {
            name: '数字影视',
            enterpriseCount: 2880,
            children: [
              { name: '网络视频', enterpriseCount: 1180 },
              { name: '短视频', enterpriseCount: 920 },
              { name: '网络直播', enterpriseCount: 780 }
            ]
          },
          {
            name: '数字音乐',
            enterpriseCount: 1680,
            children: [
              { name: '音乐平台', enterpriseCount: 520 },
              { name: '音乐制作', enterpriseCount: 680 },
              { name: '版权运营', enterpriseCount: 480 }
            ]
          },
          {
            name: '数字阅读',
            enterpriseCount: 790,
            children: [
              { name: '网络文学', enterpriseCount: 320 },
              { name: '数字出版', enterpriseCount: 280 },
              { name: '有声阅读', enterpriseCount: 190 }
            ]
          }
        ]
      },
      {
        name: '创意设计',
        enterpriseCount: 6200,
        children: [
          {
            name: '工业设计',
            enterpriseCount: 2280,
            children: [
              { name: '产品设计', enterpriseCount: 980 },
              { name: '结构设计', enterpriseCount: 720 },
              { name: '包装设计', enterpriseCount: 580 }
            ]
          },
          {
            name: '平面设计',
            enterpriseCount: 1680,
            children: [
              { name: '品牌设计', enterpriseCount: 680 },
              { name: '广告设计', enterpriseCount: 580 },
              { name: 'UI设计', enterpriseCount: 420 }
            ]
          },
          {
            name: '建筑设计',
            enterpriseCount: 1420,
            children: [
              { name: '建筑设计', enterpriseCount: 580 },
              { name: '室内设计', enterpriseCount: 520 },
              { name: '景观设计', enterpriseCount: 320 }
            ]
          },
          {
            name: '时尚设计',
            enterpriseCount: 820,
            children: [
              { name: '服装设计', enterpriseCount: 320 },
              { name: '珠宝设计', enterpriseCount: 280 },
              { name: '配饰设计', enterpriseCount: 220 }
            ]
          }
        ]
      },
      {
        name: '文化服务',
        enterpriseCount: 7400,
        children: [
          {
            name: '会展服务',
            enterpriseCount: 1850,
            children: [
              { name: '展会运营', enterpriseCount: 720 },
              { name: '会议服务', enterpriseCount: 620 },
              { name: '展馆运营', enterpriseCount: 510 }
            ]
          },
          {
            name: '文化旅游',
            enterpriseCount: 2680,
            children: [
              { name: '主题公园', enterpriseCount: 520 },
              { name: '文创园区', enterpriseCount: 920 },
              { name: '文化场馆', enterpriseCount: 680 },
              { name: '旅游服务', enterpriseCount: 560 }
            ]
          },
          {
            name: '广告传媒',
            enterpriseCount: 1980,
            children: [
              { name: '广告代理', enterpriseCount: 780 },
              { name: '媒介投放', enterpriseCount: 580 },
              { name: '公关传播', enterpriseCount: 620 }
            ]
          },
          {
            name: '知识产权',
            enterpriseCount: 890,
            children: [
              { name: '版权服务', enterpriseCount: 320 },
              { name: '商标服务', enterpriseCount: 280 },
              { name: '专利服务', enterpriseCount: 290 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chain-marine',
    name: '海洋经济',
    icon: '🌊',
    color: '#1890ff',
    stats: {
      shenzhenCount: 3500,
      nationalCount: 25800,
      percentage: 13.6
    },
    hierarchy: [
      {
        name: '海洋装备',
        enterpriseCount: 880,
        children: [
          {
            name: '船舶制造',
            enterpriseCount: 280,
            children: [
              { name: '游艇制造', enterpriseCount: 105 },
              { name: '公务船艇', enterpriseCount: 85 },
              { name: '特种船舶', enterpriseCount: 90 }
            ]
          },
          {
            name: '海洋工程',
            enterpriseCount: 320,
            children: [
              { name: '海上平台', enterpriseCount: 95 },
              { name: '海底设备', enterpriseCount: 125 },
              { name: '港口机械', enterpriseCount: 100 }
            ]
          },
          {
            name: '海洋仪器',
            enterpriseCount: 280,
            children: [
              { name: '海洋监测', enterpriseCount: 105 },
              { name: '水下机器人', enterpriseCount: 95 },
              { name: '深海装备', enterpriseCount: 80 }
            ]
          }
        ]
      },
      {
        name: '海洋电子信息',
        enterpriseCount: 920,
        children: [
          {
            name: '海洋通信',
            enterpriseCount: 320,
            children: [
              { name: '卫星通信', enterpriseCount: 125 },
              { name: '水声通信', enterpriseCount: 105 },
              { name: '岸基通信', enterpriseCount: 90 }
            ]
          },
          {
            name: '海洋探测',
            enterpriseCount: 380,
            children: [
              { name: '声纳系统', enterpriseCount: 145 },
              { name: '海洋传感', enterpriseCount: 135 },
              { name: '海洋测绘', enterpriseCount: 100 }
            ]
          },
          {
            name: '智慧海洋',
            enterpriseCount: 220,
            children: [
              { name: '海洋大数据', enterpriseCount: 85 },
              { name: '海洋AI', enterpriseCount: 75 },
              { name: '海洋物联网', enterpriseCount: 60 }
            ]
          }
        ]
      },
      {
        name: '海洋服务',
        enterpriseCount: 1080,
        children: [
          {
            name: '海洋运输',
            enterpriseCount: 380,
            children: [
              { name: '集装箱运输', enterpriseCount: 145 },
              { name: '散货运输', enterpriseCount: 125 },
              { name: '港口物流', enterpriseCount: 110 }
            ]
          },
          {
            name: '海洋旅游',
            enterpriseCount: 320,
            children: [
              { name: '邮轮经济', enterpriseCount: 105 },
              { name: '滨海旅游', enterpriseCount: 125 },
              { name: '海洋运动', enterpriseCount: 90 }
            ]
          },
          {
            name: '海洋环保',
            enterpriseCount: 220,
            children: [
              { name: '海洋监测', enterpriseCount: 85 },
              { name: '污染治理', enterpriseCount: 75 },
              { name: '生态修复', enterpriseCount: 60 }
            ]
          },
          {
            name: '海洋能源',
            enterpriseCount: 160,
            children: [
              { name: '海上风电', enterpriseCount: 65 },
              { name: '海洋能', enterpriseCount: 55 },
              { name: '海上油气', enterpriseCount: 40 }
            ]
          }
        ]
      },
      {
        name: '海洋生物',
        enterpriseCount: 620,
        children: [
          {
            name: '海洋生物制药',
            enterpriseCount: 180,
            children: [
              { name: '海洋药物', enterpriseCount: 75 },
              { name: '海洋生物制品', enterpriseCount: 65 },
              { name: '海洋保健品', enterpriseCount: 40 }
            ]
          },
          {
            name: '海洋生物材料',
            enterpriseCount: 160,
            children: [
              { name: '海藻材料', enterpriseCount: 65 },
              { name: '贝壳材料', enterpriseCount: 55 },
              { name: '海洋蛋白', enterpriseCount: 40 }
            ]
          },
          {
            name: '海洋渔业',
            enterpriseCount: 280,
            children: [
              { name: '海水养殖', enterpriseCount: 125 },
              { name: '远洋捕捞', enterpriseCount: 85 },
              { name: '水产品加工', enterpriseCount: 70 }
            ]
          }
        ]
      }
    ]
  }
];

// 为所有节点添加ID
export const industryChains = rawIndustryChains.map(chain => ({
  ...chain,
  hierarchy: addNodeIds(chain.hierarchy)
}));

// 统计数据 - 基于深圳真实情况计算
export const industryChainStats = {
  totalChains: industryChains.length,
  totalShenzhenEnterprises: industryChains.reduce((sum, chain) => sum + chain.stats.shenzhenCount, 0),
  totalNationalEnterprises: industryChains.reduce((sum, chain) => sum + chain.stats.nationalCount, 0),
  averagePercentage: (industryChains.reduce((sum, chain) => sum + chain.stats.percentage, 0) / industryChains.length).toFixed(1)
};

// 根据节点ID查找节点
export const findNodeById = (chainId, nodeId) => {
  const chain = industryChains.find(c => c.id === chainId);
  if (!chain) return null;
  
  const searchInNodes = (nodes) => {
    for (const node of nodes) {
      if (node.id === nodeId) return node;
      if (node.children) {
        const found = searchInNodes(node.children);
        if (found) return found;
      }
    }
    return null;
  };
  
  return searchInNodes(chain.hierarchy);
};

// 获取所有节点路径（用于搜索）
export const getAllNodePaths = (chainId) => {
  const chain = industryChains.find(c => c.id === chainId);
  if (!chain) return [];
  
  const paths = [];
  
  const traverse = (nodes, parentNames = []) => {
    nodes.forEach(node => {
      const currentPath = [...parentNames, node.name];
      paths.push({
        id: node.id,
        name: node.name,
        path: currentPath,
        enterpriseCount: node.enterpriseCount,
        level: currentPath.length
      });
      if (node.children) {
        traverse(node.children, currentPath);
      }
    });
  };
  
  traverse(chain.hierarchy);
  return paths;
};
