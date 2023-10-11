export default {
  methods: {
    toggleModal (nome, bol, dados) {
      this.$emit('toggle-modal', nome, bol, dados)
    },
    abrirModal (nome, bol, dados) {
      this.$emit('abrir-modal', nome, bol, dados)
    },
    modalConcluido (nome, bol, dados) {
      this.$emit('modal-concluido', nome, bol, dados)
    }
  }
}
