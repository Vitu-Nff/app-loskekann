import loading from '../loading'
import disable from '../disable'
import inputEmits from './inputEmits'

export default {
  mixins: [loading, disable, inputEmits],
  name: 'CustomCombobox',
  props: {
    value: {
      required: true,
      validator: prop => ['string'].includes(typeof prop) || prop === null
    },
    items: {
      type: Array,
      required: true
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    buscaAutomatica: {
      type: Boolean,
      default: false
    },
    loadLinear: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'O campo é obrigatório.']
          : []
      }
    },
    selecionado: {
      type: Object,
      default: undefined,
      sync: true
    },
    validate: {
      type: Boolean,
      default: true
    },
    valid: {
      type: Boolean,
      default: undefined,
      sync: true
    }
  },
  methods: {
    async updateValue (value, array = this.items) {
      this.$refs.combobox.setValue(value)
      await this.getSelecionado(value, array)
      this.$emit('input', value)
    },
    async preSelecionar () {
      await this.$refs.combobox.preSelecionar()
    },
    async getSelecionado (value, array) {
      return await this.$refs.combobox.getSelecionado(value, array)
    },
    async buscarOpcoes (params) {
      await this.$nextTick()
      return await this.$refs.combobox.buscarOpcoes(params)
    }
  }
}
