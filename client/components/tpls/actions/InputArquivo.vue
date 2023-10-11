<template>
  <v-row>
    <v-col md="8" cols="12">
      <v-file-input
        ref="fileInput"
        :key="refreshKey"
        v-model="arquivo"
        :disabled="isDisabled || isLoading"
        :loading="isLoading"
        :label="label"
        :prepend-icon="icone ? icone : ''"
        :error-messages="erro"
        :accept="accept"
        :required="required"
        :chips="multiple"
        :multiple="multiple"
        dense
        filled
      />
    </v-col>

    <v-col md="4" cols="12">
      <v-btn
        elevation="0"
        color="primary"
        width="100%"
        height="52"
        :disabled="isLoading"
        @click="onClick(arquivo)"
      >
        {{ botao }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>

import loading from '~/plugins/mixin/loading'
import disable from '~/plugins/mixin/disable'

export default {
  mixins: [loading, disable],
  props: {
    value: {
      required: true,
      validator: prop => ['string', 'number', 'object', 'array'].includes(typeof prop) || prop === null || prop === undefined
    },
    multiple: {
      type: [Boolean],
      default: false
    },
    required: {
      type: [Boolean],
      default: false
    },
    label: {
      type: [String],
      default: 'Selecione um arquivo.'
    },
    accept: {
      type: [String, Array],
      default: undefined
    },
    callback: {
      type: [Function],
      default: undefined
    },
    responseCallback: {
      type: [Function],
      default: undefined
    },
    rota: {
      type: [String],
      default: undefined
    },
    param: {
      type: [String],
      default: 'Arquivo'
    },
    paramsExtra: {
      type: [Object],
      default: undefined
    },
    icone: {
      type: [String],
      default: undefined
    },
    botao: {
      type: [String],
      default: 'Enviar'
    },
    valid: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
      refreshKey: 0,
      erro: [],
      arquivo: this.value
    }
  },
  methods: {
    // Apenas para forçar atualização por um elemento pai
    setValue (value) {
      this.arquivo = value
      this.$emit('input', value)
      this.refreshKey++
    },
    async onClick (arquivo = this.arquivo) {
      try {
        this.isLoading = true
        await this._validarArquivo(arquivo)
        this.setValue(this.arquivo)
        this.$emit('update:valid', true)
        this.$emit('input-valido', this.arquivo)
        if (this.callback) {
          await this.callback(arquivo)
        }
      } catch (error) {
        this.$emit('update:valid', false)
        // if (error?.response?.data?.mensagem) {
        //   this.$nuxt.$emit('snackbar', error.response.data.mensagem, 'error')
        // }
      } finally {
        await this.$nextTick()
        this.$emit('input', this.arquivo)
        this.isLoading = false
      }
    },
    async importarArquivo (payload = this.payload(), rota = this.rota) {
      const response = await this.$store.dispatch(rota, payload)
      if (this.responseCallback) {
        await this.responseCallback(response)
      }
      return response
    },
    payload () {
      const payload = new FormData()
      payload.append(this.param, this.arquivo)
      return payload
    },
    _validarArquivo (arquivo) {
      this.erro = ''
      if (!arquivo && this.required) {
        this.erro = 'Selecione um arquivo.'
        const error = this.$buildError('Selecione um arquivo.')
        throw error
      } else if (this.accept) {
        const isValidType = Array.isArray(this.accept)
          ? this.accept.includes(arquivo?.type ?? '')
          : ((arquivo?.type ?? '') === this.accept)

        if (!isValidType) {
          this.erro = 'Selecione um arquivo válido.'
          const error = this.$buildError('Selecione um arquivo válido.')
          throw error
        }
      }
      return this.erro === ''
    }
  }
}

</script>
