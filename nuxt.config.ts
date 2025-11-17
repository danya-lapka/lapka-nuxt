// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/ui/style.scss'],

  postcss: {
    plugins: {
      cssnano: {}
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:math";'
        }
      }
    },
    vue: {
      script: {
        propsDestructure: true
      }
    },
    assetsInclude: ['**/*.svg']
  },

  app: {
    head: {
      title: 'Лапка',
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'description', content: 'Лапка' }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    }
  },

  modules: ['@nuxt/fonts', '@nuxt/image'],
  
  fonts: {
    processCSSVariables: true,
    families: [
      {
        name: 'Monocraft',
        src: './app/assets/fonts/monocraft/Monocraft-Regular.ttf',
        weight: 400,
        style: 'normal',
        provider: 'local'
      },
      {
        name: 'Monocraft',
        src: './app/assets/fonts/monocraft/Monocraft-Regular.ttf',
        weight: 400,
        style: 'normal',
        provider: 'local'
      },
      {
        name: 'Monocraft',
        src: './app/assets/fonts/monocraft/Monocraft-Regular.ttf',
        weight: 400,
        style: 'normal',
        provider: 'local'
      },
      { 
        name: 'Unbounded',
        provider: 'google'
      }
    ]
  },

  image: {
    format: ['png'],
    screens: {
      'xs': 576,
      'sm': 768,
      'md': 1024,
      'bg': 1440,
      'lg': 1920,
    }
  },
  
  runtimeConfig: {
    // приватные (только сервер)
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,

    // публичные (клиент + сервер)
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
});