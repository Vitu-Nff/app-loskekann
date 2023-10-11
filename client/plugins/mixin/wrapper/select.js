import loading from '../loading'
import disable from '../disable'
import inputEmits from './inputEmits'

export default {
  mixins: [loading, disable, inputEmits],
  props: {
    apenasLogica: {
      type: Boolean,
      default: false
    },
    value: {
      default: undefined,
      validator: prop => ['string', 'number', 'array', 'object'].includes(typeof prop) || prop === null || prop === undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    buscaAutomatica: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    selecionado: {
      type: [Object, Array],
      default: undefined,
      sync: true
    },
    valid: {
      type: Boolean,
      default: undefined,
      sync: true
    },
    loadLinear: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue (value, array = this.items) {
      this.$refs.select.setValue(value)
      this.getSelecionado(value, array)
      this.$emit('input', value)
    },
    async preSelecionar () {
      await this.$refs.select.preSelecionar()
    },
    getSelecionado (value, array) {
      return this.$refs.select.getSelecionado(value, array)
    },
    async buscarOpcoes (params, rota) {
      await this.$nextTick()
      return await this.$refs.select.buscarOpcoes(params, rota)
    }
  }
}
