import loading from '~/plugins/mixin/loading'
import disable from '~/plugins/mixin/disable'
export default {
  mixins: [loading, disable],
  props: {
    value: {
      required: true,
      validator: prop => ['string', 'number'].includes(typeof prop) || prop === null
    },
    mask: {
      type: [Array, Function, String],
      default: () => []
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    loadLinear: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Nome'
    },
    required: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'O campo ' + this.label + ' é obrigatório.']
          : []
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    validateOnInput: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Boolean,
      default: true
    },
    valid: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localValue: this.value
    }
  },
  methods: {
    async setValue (v) {
      // Exclusivo para forçar sincronização com alguem componente pai wrapper
      this.localValue = v
      await this.$nextTick()
      this.$emit('update:valid', this.$refs?.textfield?.validate?.())
    },
    updateValue (value) {
      const valorAntigo = this.localValue
      this.setValue(value)
      this.$emit('input', value)
      if (valorAntigo !== this.localValue) {
        this.$emit('change', value)
        this.$emit('update:valid', this.$refs?.textfield?.validate?.())
      }
    }
  }
}
