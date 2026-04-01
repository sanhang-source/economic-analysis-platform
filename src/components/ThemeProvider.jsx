import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

/**
 * 加载指定主题的 CSS 文件
 */
const loadTheme = async (themeName) => {
  // 移除旧的主题样式（如果存在）
  const existing = document.getElementById('theme-style');
  if (existing) {
    existing.remove();
  }

  try {
    // 动态导入主题 CSS
    await import(`../styles/themes/${themeName}.css`);
    
    // 设置 data-theme 属性
    document.documentElement.setAttribute('data-theme', themeName);
    
    // 保存到 localStorage
    localStorage.setItem('app-theme', themeName);
    
    return true;
  } catch (error) {
    console.error(`加载主题 ${themeName} 失败:`, error);
    return false;
  }
};

/**
 * ThemeProvider - 主题上下文提供者
 * 
 * @param {Object} props
 * @param {string} props.defaultTheme - 默认主题名称
 * @param {React.ReactNode} props.children - 子组件
 */
export const ThemeProvider = ({ defaultTheme = 'client-deep-blue', children }) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 优先从 localStorage 读取，否则使用默认
    const init = async () => {
      const savedTheme = localStorage.getItem('app-theme') || defaultTheme;
      await loadTheme(savedTheme);
      setTheme(savedTheme);
      setLoaded(true);
    };
    
    init();
  }, [defaultTheme]);

  /**
   * 切换主题
   */
  const switchTheme = async (newTheme) => {
    if (newTheme === theme) return;
    
    const success = await loadTheme(newTheme);
    if (success) {
      setTheme(newTheme);
    }
  };

  if (!loaded) {
    // 加载中显示空白或 loading
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a192f'
      }}>
        <div style={{ color: '#64ffda' }}>加载中...</div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, availableThemes: ['client-default', 'client-deep-blue'] }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 使用主题的 Hook
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme 必须在 ThemeProvider 内使用');
  }
  return context;
};

export default ThemeProvider;
