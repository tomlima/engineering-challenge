export default {
  telemetry: false,
  head: {
    title: 'Pipo saúde | Exercício Engenharia v2',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }]
  },

  css: ['~/assets/scss/global.scss', 'boxicons/css/boxicons.min.css'],

  components: true,

  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },

  plugins: [{ src: '~/plugins/validate.js', mode: 'client' }],

  modules: ['@nuxt/content'],
  buildModules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    preload: true,
    families: {
      Poppins: [100, 300, 400, 700]
    }
  }
}
