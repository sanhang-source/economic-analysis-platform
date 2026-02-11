import React, { useState } from 'react';
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
  GlobalOutlined,
  ApiOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

/**
 * LoginPage - 登录页面
 * 左右分屏布局：左侧科技感背景 + Slogan，右侧登录表单
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('8K7M');

  // 生成随机验证码
  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  // 处理登录（免校验，直接登录）
  const handleLogin = () => {
    setLoading(true);
    
    // 模拟登录延迟
    setTimeout(() => {
      message.success('登录成功！');
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen flex">
      {/* 左侧 - 科技感背景区域 */}
      <div 
        className="w-1/2 relative flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #0d1b2a 100%)',
        }}
      >
        {/* 科技感网格背景 */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(22, 119, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(22, 119, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* 发光圆环装饰 */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(22, 119, 255, 0.4) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 170, 0.3) 0%, transparent 70%)',
          }}
        />

        {/* 连接线装饰 */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1677ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="40%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="30%" y1="80%" x2="70%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="60%" y1="10%" x2="90%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
          <circle cx="40%" cy="60%" r="4" fill="#1677ff" />
          <circle cx="70%" cy="40%" r="4" fill="#00d4aa" />
          <circle cx="90%" cy="50%" r="4" fill="#1677ff" />
        </svg>

        {/* 图标装饰 */}
        <div className="absolute top-12 left-12 text-blue-400 opacity-40">
          <GlobalOutlined style={{ fontSize: 120 }} />
        </div>
        <div className="absolute bottom-20 right-20 text-cyan-400 opacity-30">
          <ApiOutlined style={{ fontSize: 80 }} />
        </div>
        <div className="absolute top-1/3 right-12 text-blue-500 opacity-20">
          <NodeIndexOutlined style={{ fontSize: 100 }} />
        </div>

        {/* Slogan 内容 */}
        <div className="relative z-10 text-center px-12">
          {/* Logo 区域 */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #1677ff 0%, #00d4aa 100%)',
                boxShadow: '0 8px 32px rgba(22, 119, 255, 0.4)',
              }}
            >
              <GlobalOutlined className="text-white text-3xl" />
            </div>
            <span className="text-white text-2xl font-bold tracking-wider">
              经济运行分析平台
            </span>
          </div>

          {/* 主 Slogan */}
          <h1 className="text-4xl font-bold text-white leading-tight mb-6 tracking-wide">
            经济运行分析
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
            <span className="text-cyan-400 text-lg font-medium tracking-widest">
              驱动区域经济高质量发展
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>

          {/* 副文案 */}
          <p className="text-blue-200 text-base leading-relaxed max-w-md mx-auto opacity-80">
            招商引资 · 产业分析 · 企业画像 · 经济监测<br/>
            一站式经济运行监测分析平台
          </p>
        </div>
      </div>

      {/* 右侧 - 登录表单区域 */}
      <div className="w-1/2 bg-white flex items-center justify-center relative">
        {/* 背景装饰 */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 opacity-5"
          style={{
            background: 'radial-gradient(circle, #1677ff 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 opacity-5"
          style={{
            background: 'radial-gradient(circle, #00d4aa 0%, transparent 70%)',
          }}
        />

        {/* 登录表单卡片 */}
        <Card
          className="w-[420px] shadow-2xl border-0 relative z-10"
          style={{
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo + 标题 */}
          <div className="text-center mb-8">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #1677ff 0%, #00d4aa 100%)',
              }}
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
            <Form.Item
              name="username"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="请输入账号"
                style={{ borderRadius: 8, height: 44 }}
              />
            </Form.Item>

            <Form.Item
              name="password"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="请输入密码"
                style={{ borderRadius: 8, height: 44 }}
              />
            </Form.Item>

            {/* 验证码 */}
            <Form.Item
              name="captcha"
            >
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
                <a className="text-sm text-blue-600 hover:text-blue-700">
                  忘记密码？
                </a>
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

        {/* 底部版权 */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <Text type="secondary" className="text-xs text-gray-400">
            &copy; 深圳征信服务有限公司
          </Text>
          <div className="mt-2 space-x-4">
            <a className="text-xs text-gray-400 hover:text-gray-600">隐私政策</a>
            <a className="text-xs text-gray-400 hover:text-gray-600">服务条款</a>
            <a className="text-xs text-gray-400 hover:text-gray-600">帮助中心</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
