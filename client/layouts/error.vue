<template>
  <div>
    <div class="d-flex align-center justify-center px-8 py-8" style="width: 100vw; height: 100vh; font-weight: 600; flex-direction: column; gap: 1rem">
      <a :href="$baseUrl">
        <img :src="$baseUrl + 'logo.png'" class="logo-header" style=" filter: grayscale(1); height: 50px; opacity: 0.5;">
      </a>
      <h2 class="text-center" style="opacity: 0.5;">
        Oops... Desculpe!<br>
        {{ errorMessage }}
      </h2>
      <p v-if="error.statusCode === 404" style="opacity: 0.25;">
        Redirecionando...
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return this.errorMessage
  },
  computed: {
    errorMessage () {
      return this.error.statusCode === 404 ? 'Página não encontrada' : 'Algo de errado aconteceu'
    }
  },
  mounted () {
    if (this.error.statusCode === 404) {
      setTimeout(() => {
        const siteUrl = process.env.SITE_URL.endsWith('/')
          ? process.env.SITE_URL.slice(0, -1)
          : process.env.SITE_URL
        const redirecionamento = siteUrl + this.$route.path
        window.location.href = redirecionamento
      }, 500)
    }
  }
}
</script>

<style scoped>
</style>
