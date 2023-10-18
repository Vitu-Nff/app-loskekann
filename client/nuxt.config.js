require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Losekann',
    title: 'Marcos Losekann',
    htmlAttrs: {
      lang: 'pt-BR'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/site/index.scss'
  ],
  // importing a custom loader. this will overwrite the default loader
  loading: '~/components/LoadingBar.vue',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/vue-the-mask.js',
    '@plugins/v-money.js',
    '@plugins/util.js',
    '@/plugins/base-url.js',
    { src: '~/plugins/swiper.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/google-fonts'
    // '@nuxtjs/google-gtag'
  ],

  // 'google-gtag': {
  //   id: '',
  //   config: {
  //     anonymize_ip: true,
  //     send_page_view: true,
  //     linker: {
  //       domains: ['marcoslosekann.com']
  //     }
  //   },
  //   debug: false,
  //   disableAutoPageTrack: false
  // },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/autenticar',
            method: 'post'
          },
          user: false,
          logout: false
        },
        token: {
          property: 'access_token',
          maxAge: 1296000 // 15 dias
        }
      }
    },
    resetOnError: true
  },

  server: {
    host: '0.0.0.0' // default: localhost
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    headers: {
      Authorization: 'Basic ' + process.env.API_KEY,
      'Content-Type': 'application/json'
    },
    proxy: true // Can be also an object with default options
  },

  proxy: {
    // '/api/': {
    //   target: process.env.API_URL,
    //   pathRewrite: { '^/api/': '' }
    // }
  },

  googleFonts: {
    families: {
      Montserrat: [100, 200, 300, 400, 500, 600, 700, 800],
      'Libre+Baskerville': [300, 400, 500, 600, 700],
      'Cormorant+Garamond': true
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: false,
    defaultAssets: {
      font: {
        family: 'Montserrat'
      }
      //     icons: false
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#323232',
          'app-cinza': '#EAEAEC',
          'app-branco': '#FFFFFF',
          'app-laranja': '#dc7808',
          'app-turquesa': '#00A194',
          'app-verde-medio': '#76b72a',
          'app-verde-claro': '#c7d300',
          'app-verde-escuro': '#00353e',
          'app-roxo': '#4c3c8f',
          'app-vermelho': '#E03E3E'
        }
      }
    }
  },

  // Env variables
  publicRuntimeConfig: {
    captchaKey: process.env.CAPTCHA_KEY,
    siteUrl: process.env.SITE_URL,
    imageUrl: process.env.IMAGE_URL,
    apartmentUrl: process.env.PROPRIEDADE_URL,
    baseUrl: process.env.BASE_URL
  },
  env: {
    CAPTCHA_KEY: process.env.CAPTCHA_KEY,
    SITE_URL: process.env.SITE_URL,
    imaIMAGE_URLgeUrl: process.env.IMAGE_URL,
    PROPRIEDADE_URL: process.env.PROPRIEDADE_URL,
    BASE_URL: process.env.BASE_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'defu'
    ]
  },
  router: {
    middleware: ['auth']
  }
}
