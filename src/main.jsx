import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider';

// 默认导入深蓝主题（集团系挖潜专用）
import './styles/themes/client-deep-blue.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="client-deep-blue">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
