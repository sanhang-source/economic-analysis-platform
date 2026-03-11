import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Space,
  Typography,
  message,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  SafetyOutlined,
  ArrowRightOutlined,
  LineChartOutlined,
  ApartmentOutlined,
  FileProtectOutlined,
  GlobalOutlined,
  BankOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

/**
 * LoginPage - 全屏沉浸式科技风登录页
 * 五大功能模块展示
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('8K7M');
  const [showLogin, setShowLogin] = useState(false);
  const [displayTitle, setDisplayTitle] = useState('');
  const [activeModule, setActiveModule] = useState(0);
  const canvasRef = useRef(null);

  const fullTitle = '经济运行分析平台';

  // 五大功能模块数据
  const modules = [
    {
      icon: <LineChartOutlined />,
      name: '经济运行',
      desc: '全景监测·智能预警·辅助决策',
      color: '#1677ff',
    },
    {
      icon: <ApartmentOutlined />,
      name: '产业大脑',
      desc: '链上洞察·强链补链·集群培育',
      color: '#00d4aa',
    },
    {
      icon: <FileProtectOutlined />,
      name: '政策引擎',
      desc: '智能匹配·沙盒推演·精准滴灌',
      color: '#faad14',
    },
    {
      icon: <GlobalOutlined />,
      name: '招商引资',
      desc: '资本透视·项目管理·线索挖掘',
      color: '#eb2f96',
    },
    {
      icon: <BankOutlined />,
      name: '企业档案',
      desc: '数字画像·风险雷达·服务直达',
      color: '#13c2c2',
    },
  ];

  // 重置选中状态
  useEffect(() => {
    if (showLogin) {
      setActiveModule(null);
    }
  }, [showLogin]);

  // 卡片轮播点亮效果
  useEffect(() => {
    if (showLogin) return;
    
    const timer = setInterval(() => {
      setActiveModule((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % modules.length;
      });
    }, 2500);
    
    return () => clearInterval(timer);
  }, [showLogin, modules.length]);

  // 粒子动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(22, 119, 255, 0.6)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(22, 119, 255, ${0.3 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 生成随机验证码
  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  // 处理登录
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('登录成功！');
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #0d1b2a 100%)' }}>
      {/* 粒子画布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'transparent' }}
      />

      {/* 网格背景 */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(22, 119, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22, 119, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 发光圆环装饰 */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(22, 119, 255, 0.6) 0%, transparent 70%)' }} />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(0, 212, 170, 0.5) 0%, transparent 70%)' }} />

      {/* 底部登录按钮 - 固定在底部，始终在DOM中 */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-20 flex flex-col items-center pb-8 transition-opacity duration-300" 
        style={{ 
          opacity: showLogin ? 0 : 1,
          pointerEvents: showLogin ? 'none' : 'auto',
        }}
      >
        {/* 登录入口按钮 */}
        <Button
          type="primary"
          size="large"
          onClick={() => setShowLogin(true)}
          className="animate-glow mb-4"
          style={{
            height: 50,
            paddingLeft: 40,
            paddingRight: 40,
            borderRadius: 25,
            fontSize: 16,
            fontWeight: 500,
            background: 'linear-gradient(135deg, #1677ff 0%, #096dd9 100%)',
            border: 'none',
            boxShadow: '0 0 25px rgba(22, 119, 255, 0.5), 0 0 50px rgba(22, 119, 255, 0.3)',
          }}
        >
          进入系统 <ArrowRightOutlined className="ml-2" />
        </Button>

        {/* 版权信息 */}
        <div className="text-gray-500 text-sm">
          © 深圳征信服务有限公司
        </div>
      </div>

      {/* 主内容区 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        
        {!showLogin ? (
          // 默认展示：沉浸式品牌页
          <div className="text-center animate-fade-in max-w-5xl pb-32">
            {/* Logo */}
            <div className="mb-6">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                style={{ 
                  background: 'linear-gradient(135deg, #1677ff 0%, #00d4aa 100%)',
                  boxShadow: '0 0 50px rgba(22, 119, 255, 0.5), 0 0 80px rgba(0, 212, 170, 0.3)',
                }}
              >
                <GlobalOutlined className="text-white text-3xl" />
              </div>
            </div>

            {/* 主标题 */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider">
              {fullTitle}
            </h1>

            {/* 副标题 */}
            <div className="mb-8">
              <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-shimmer">
                驱动区域经济高质量发展
              </span>
            </div>

            {/* 五大功能模块 - 水平排列 */}
            <div className="flex justify-center items-stretch gap-4 md:gap-5 flex-wrap">
              {modules.map((module, index) => (
                <div
                  key={module.name}
                  className="relative cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setActiveModule(index)}
                  onMouseLeave={() => setActiveModule(null)}
                  style={{ width: 180 }}
                >
                  <Card
                    className="h-full border-0 transition-all duration-300 hover:scale-105"
                    style={{
                      background: activeModule === index 
                        ? `linear-gradient(135deg, ${module.color}25, ${module.color}10)` 
                        : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${activeModule === index ? module.color + '60' : 'rgba(255, 255, 255, 0.15)'}`,
                      boxShadow: activeModule === index 
                        ? `0 8px 32px ${module.color}30` 
                        : '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                    styles={{ 
                      body: {
                        padding: '20px 16px',
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    }}
                  >
                    {/* 图标 */}
                    <div 
                      className="text-3xl mb-3"
                      style={{ 
                        color: module.color,
                        filter: activeModule === index ? `drop-shadow(0 0 8px ${module.color})` : 'none',
                        transition: 'filter 0.3s ease',
                      }}
                    >
                      {module.icon}
                    </div>
                    
                    {/* 名称 */}
                    <div className="font-bold text-white text-base mb-2">
                      {module.name}
                    </div>
                    
                    {/* 描述 - 始终显示 */}
                    <div className="text-xs text-gray-400 leading-relaxed whitespace-nowrap">
                      {module.desc}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // 登录表单
          <div className="animate-expand-in w-full max-w-md">
            <Card
              className="border-0"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 16,
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* 返回按钮 */}
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => setShowLogin(false)}
                className="mb-4 -ml-2"
              >
                返回
              </Button>

              {/* 标题 */}
              <div className="text-center mb-8">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #1677ff 0%, #00d4aa 100%)' }}
                >
                  <GlobalOutlined className="text-white text-2xl" />
                </div>
                <Title level={3} className="!mb-1 !mt-0">用户登录</Title>
                <Text type="secondary" className="text-sm">欢迎回到经济运行分析平台</Text>
              </div>

              {/* 登录表单 */}
              <Form
                form={form}
                name="login"
                onFinish={handleLogin}
                autoComplete="off"
                size="large"
              >
                <Form.Item name="username">
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="请输入账号"
                    style={{ borderRadius: 8, height: 44 }}
                  />
                </Form.Item>

                <Form.Item name="password">
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="请输入密码"
                    style={{ borderRadius: 8, height: 44 }}
                  />
                </Form.Item>

                {/* 验证码 */}
                <Form.Item name="captcha">
                  <Space.Compact style={{ width: '100%' }}>
                    <Input
                      prefix={<SafetyOutlined className="text-gray-400" />}
                      placeholder="请输入验证码"
                      style={{ borderRadius: '8px 0 0 8px', height: 44 }}
                    />
                    <div 
                      className="h-11 px-4 flex items-center justify-center cursor-pointer select-none"
                      style={{ 
                        width: 100,
                        background: '#f5f5f5',
                        borderRadius: '0 8px 8px 0',
                        border: '1px solid #d9d9d9',
                        borderLeft: 'none',
                      }}
                      onClick={refreshCaptcha}
                    >
                      <span 
                        className="text-lg font-bold tracking-widest"
                        style={{
                          background: 'linear-gradient(45deg, #1677ff, #00d4aa, #722ed1)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontFamily: 'monospace',
                        }}
                      >
                        {captchaCode}
                      </span>
                    </div>
                  </Space.Compact>
                </Form.Item>

                {/* 记住密码 */}
                <Form.Item className="!mb-4">
                  <div className="flex items-center justify-between">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <a className="text-sm text-blue-600 hover:text-blue-700">忘记密码？</a>
                  </div>
                </Form.Item>

                {/* 登录按钮 */}
                <Form.Item className="!mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    style={{
                      height: 48,
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 500,
                      background: 'linear-gradient(135deg, #1677ff 0%, #096dd9 100%)',
                    }}
                  >
                    立即登录
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        )}
      </div>

      {/* CSS 动画 */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-pulse-ring {
          border: 2px solid rgba(22, 119, 255, 0.5);
          animation: pulse-ring 2s ease-out infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 25px rgba(22, 119, 255, 0.5), 0 0 50px rgba(22, 119, 255, 0.3); }
          50% { box-shadow: 0 0 35px rgba(22, 119, 255, 0.7), 0 0 70px rgba(22, 119, 255, 0.5); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes expand-in {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        .animate-expand-in {
          animation: expand-in 0.4s ease-out;
        }


      `}</style>
    </div>
  );
};

export default LoginPage;
