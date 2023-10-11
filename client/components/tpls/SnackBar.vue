<template>
  <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" top>
    {{ mensagem }}
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      snackbar: false,
      color: null,
      mensagem: null,
      timeout: null
    }
  },
  created () {
    this.$nuxt.$on('snackbar', (mensagem, tipo, timeout) => {
      this.color = this.alterarCor(tipo)
      this.mensagem = mensagem
      this.timeout = timeout || 4000
      this.snackbar = true
    })
  },
  destroyed () {
    this.$nuxt.$off('snackbar')
  },
  methods: {
    alterarCor (tipo) {
      let color = null
      switch (tipo) {
        case 'warning' :
          color = 'orange'
          break
        case 'success' :
          color = 'green'
          break
        case 'info' :
          color = 'blue'
          break
        case 'error' :
          color = 'red'
          break
        default:
      }
      return color
    }
  }
}
</script>

<style lang="scss" scoped></style>
