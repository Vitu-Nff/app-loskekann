export default {
  methods: {
    log (value) {
      // console.log(value)
    },
    emitValid (valid) {
      this.$emit('update:valid', valid)
    },
    emitItems (value) {
      this.$emit('update:items', value)
    },
    emitSelecionado (value) {
      this.$emit('update:selecionado', value)
    },
    emitBlur (value = this.value) {
      this.$emit('blur', value)
    },
    emitFocus (value = this.value) {
      this.$emit('focus', value)
    },
    emitChange (value) {
      this.$emit('change', value)
    }
  }
}
