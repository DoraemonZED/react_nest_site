import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f5f5f5',  // 更柔和的浅色背景
          dark: '#0a0a0a',   // 更自然的深色背景
        },
        brand: '#AFB42B',
      },
      fontSize: {
        // 添加响应式字体大小
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "nextui", // 添加前缀避免样式冲突
      addCommonColors: true, // 添加通用颜色
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        spacingUnit: 4, // 基础间距单位
        disabledOpacity: 0.5, // 禁用状态透明度
        dividerWeight: "1px", // 分割线宽度
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
      },
      themes: {
        light: {
          colors: {
            background: "#f8f9fa",  // 更柔和的背景色
            foreground: "#2D3748",  // 更深的文字颜色
            primary: {
              50: "#f7f8ea",
              100: "#ecefc8",
              200: "#dfe3a3",
              300: "#cfd477",
              400: "#bfc54c",
              500: "#AFB42B", // 主色调
              600: "#8c9022",
              700: "#696c1a",
              800: "#464711",
              900: "#232309",
              DEFAULT: "#AFB42B",
              foreground: "#ffffff",
            },
            content1: "#f1f3f5",    // 更柔和的卡片背景色
            content2: "#4A5568",    // 更柔和的次要文字
            content3: "#718096",    // 更柔和的辅助文字
            focus: "#AFB42B",
          }
        },
        dark: {
          colors: {
            background: "#001524",
            foreground: "#ECEDEE",
            primary: {
              50: "#f7f8ea",
              100: "#ecefc8",
              200: "#dfe3a3",
              300: "#cfd477",
              400: "#bfc54c",
              500: "#AFB42B",
              600: "#8c9022",
              700: "#696c1a",
              800: "#464711",
              900: "#232309",
              DEFAULT: "#AFB42B",
              foreground: "#ffffff",
            },
            content1: "#0f2537",
            content2: "#94a3b8",
            content3: "#64748b",
            focus: "#AFB42B",
          }
        }
      }
    })
  ]
}
