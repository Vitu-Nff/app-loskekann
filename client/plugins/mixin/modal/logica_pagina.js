export default {
  data () {
    return {
      modal: {}
    }
  },
  methods: {
    toggleModal (nome, bol, dados) {
      this.$set(this.modal, nome, bol)
      if (!bol) { return }
      this.$nextTick(() => {
        this.$refs[nome]?.abrirModal(dados)
      })
    }
  }
}
