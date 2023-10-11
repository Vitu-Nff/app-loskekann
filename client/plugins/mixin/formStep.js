import loading from '~/plugins/mixin/loading.js'
import disable from '~/plugins/mixin/disable'

export default {
  inject: ['formPai', 'listasPai'],
  mixins: [loading, disable],
  props: {
    step: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      valido: false,
      bolEnviado: false
    }
  },
  computed: {
    formIsLoading () {
      return Object.values(this.form).some(field => field.loading)
    },
    form () {
      return this.formPai
    },
    formStep () {
      return this.step ? this.formPai[this.step] : this.formPai
    },
    listas () {
      return this.listasPai
    }
  },
  methods: {
    async validar (formulario = this.step ? this.formPai[this.step] : this.formPai) {
      await this.$nextTick()
      await this.$validarFormulario(this.$refs.form, formulario.valido, true, this.bolEnviado)
    }
  }
}
