import loading from '../loading'
import disable from '../disable'
import inputEmits from './inputEmits'

export default {
  mixins: [loading, disable, inputEmits],
  props: {
    value: {
      required: true,
      validator: prop => ['string', 'number'].includes(typeof prop) || prop === null || prop === undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    validateOnInput: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Boolean,
      default: true
    },
    loadLinear: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: false,
      sync: true
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'O Campo é obrigatório.']
          : []
      }
    }
  },
  methods: {
    async updateValue (value) {
      this.$emit('input', value)
      await this.$nextTick()
      this.$refs.textfield.setValue(value)
    }
  }
}
