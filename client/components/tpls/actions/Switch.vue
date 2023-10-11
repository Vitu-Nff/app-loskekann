<template>
  <v-switch
    v-model="localValue"
    :disabled="isDisabled || isLoading"
    :loading="isLoading"
    :label="isLoading ? 'Aguarde...' : label"
    v-bind="inputProps"
    inset
    @blur="onBlur"
    @change="onChange"
    @click="onClick"
    @focus="onFocus"
  />
</template>

<script>
import loading from '~/plugins/mixin/loading'
import disabled from '~/plugins/mixin/disable'

export default {
  name: 'BotaoSwitch',
  mixins: [loading, disabled],
  props: {
    value: {
      required: true,
      validator: prop => ['string', 'number', 'boolean'].includes(typeof prop) || prop === null || prop === undefined
    },
    label: {
      type: [String],
      required: false,
      default: ''
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    dados: {
      type: [Object, Array, String],
      default: ''
    },
    callback: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      localValue: this.value
    }
  },
  methods: {
    onBlur (event) {
      this.$emit('blur', event)
    },
    async onChange (bolValue, dados = this.dados) {
      if (this.callback) {
        try {
          this.isLoading = true
          const response = await this.callback(bolValue, dados)
          if (response?.mensagem) {
            this.$nuxt.$emit('snackbar', response.mensagem, 'success')
          }
        } catch (error) {
          this.$nuxt.$emit('snackbar', error.response.data.mensagem, 'error')
        } finally {
          this.isLoading = false
        }
      }
      this.$emit('input', bolValue)
      this.$emit('change', { bol: bolValue, dados: this.dados })
    },
    onClick (event) {
      this.$emit('click', event)
    },
    onFocus (event) {
      this.$emit('focus', event)
    }
  }
}
</script>
