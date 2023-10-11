<template>
  <div id="recaptcha" class="g-recaptcha" :data-sitekey="siteKey" data-theme="light" />
</template>

<script>

export default {

  name: 'GoogleCaptcha',
  props: {
    siteKey: {
      type: String,
      required: true
    },
    lazyLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ativado: false
    }
  },
  mounted () {
    this.lazyLoad ? this.$nuxt.$on('ativar-captcha', this.loadCaptcha) : this.loadCaptcha()
    this.$nuxt.$on('reset-captcha', this.reset)
  },
  beforeDestroy () {
    this.$nuxt.$off('reset-captcha', this.reset)
    this.$nuxt.$off('ativar-captcha', this.reset)
  },
  methods: {
    loadCaptcha () {
      if (this.ativado || process.server) {
        return
      }
      const head = document.getElementsByTagName('head')[0]
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://www.google.com/recaptcha/api.js'
      head.appendChild(script)
      this.ativado = true
    },
    captchaConcluido () {
      const error = {
        data: {
          log: 'Erro na validação do formulário.',
          mensagem: 'Erro reCaptcha: Conclua o desafio reCaptcha'
        }
      }
      if (!process.client || !window.grecaptcha) {
        throw error
      }
      if (!window.grecaptcha.getResponse()) {
        throw error
      }
      return true
    },
    async verificarToken () {
      const Error = {
        data: {
          log: 'Erro na validação do formulário.',
          mensagem: 'Erro reCaptcha: Muitas tentativas. Aguarde e tente novamente.'
        }
      }
      if (!process.client || !window.grecaptcha) {
        return false
      }
      try {
        const dados = { token: window.grecaptcha.getResponse() }
        const response = await this.$store.dispatch('site/captcha/verificar', dados)
        return response
      } catch ({ response }) {
        throw response ?? Error
      }
    },
    reset () {
      if (process.client || window.grecaptcha) {
        window.grecaptcha.reset()
      }
    }
  }
}

</script>

<style>
#recaptcha > div {
  margin: auto;
}
</style>
