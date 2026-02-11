// @ts-check
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Altru Programming Language',
  description: 'An experimental programming language designed for human-AI collaboration',
  
  // 多语言配置
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/en/guide/specification' },
          { text: 'GitHub', link: 'https://github.com/bxt-main/altru-lang' }
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Introduction',
              items: [
                { text: 'Quick Start', link: '/en/guide/quick-start' },
                { text: 'Design Principles', link: '/en/guide/design-principles' },
                { text: 'Language Comparison', link: '/en/guide/language-comparison' }
              ]
            },
            {
              text: 'Specification',
              items: [
                { text: 'Full Specification v0.2.1', link: '/en/specification/full' },
                { text: 'Type System', link: '/en/specification/type-system' },
                { text: 'Memory Management', link: '/en/specification/memory-management' },
                { text: 'Concurrency Model', link: '/en/specification/concurrency-model' },
                { text: 'Error Handling', link: '/en/specification/error-handling' },
                { text: 'AI Integration', link: '/en/specification/ai-integration' },
                { text: 'Toolchain', link: '/en/specification/toolchain' }
              ]
            }
          ]
        }
      }
    },
    zh: {
      label: '中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '文档', link: '/zh/guide/specification' },
          { text: 'GitHub', link: 'https://github.com/bxt-main/altru-lang' }
        ],
        sidebar: {
          '/zh/': [
            {
              text: '介绍',
              items: [
                { text: '快速开始', link: '/zh/guide/quick-start' },
                { text: '设计原则', link: '/zh/guide/design-principles' },
                { text: '与其他语言对比', link: '/zh/guide/language-comparison' }
              ]
            },
            {
              text: '规范',
              items: [
                { text: '完整规范 v0.2.1', link: '/zh/specification/full' },
                { text: '类型系统', link: '/zh/specification/type-system' },
                { text: '内存管理', link: '/zh/specification/memory-management' },
                { text: '并发模型', link: '/zh/specification/concurrency-model' },
                { text: '错误处理', link: '/zh/specification/error-handling' },
                { text: 'AI集成特性', link: '/zh/specification/ai-integration' },
                { text: '工具链', link: '/zh/specification/toolchain' }
              ]
            }
          ]
        }
      }
    }
  },

  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bxt-main/altru-lang' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present Altru Language Project'
    }
  }
})