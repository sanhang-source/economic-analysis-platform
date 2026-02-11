/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1677ff',
          50: '#e6f4ff',
          100: '#bae0ff',
          200: '#91caff',
          300: '#69b1ff',
          400: '#4096ff',
          500: '#1677ff',
          600: '#0958d9',
          700: '#003eb3',
          800: '#002c8c',
          900: '#001d66',
        },
        bg: {
          gray: '#f5f5f5',
          white: '#ffffff',
        },
      },
      boxShadow: {
        'header': '0 1px 4px rgba(0,21,41,0.08)',
        'card': '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.1)',
        'sider': '0 0 20px rgba(0,0,0,0.06), 4px 0 16px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 禁用与 Ant Design 冲突的默认样式
    preflight: false,
  },
}
