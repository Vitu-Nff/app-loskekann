<template>
  <v-dialog
    v-model="dialog"
    persistent
    :max-width="width"
  >
    <v-card
      :loading="isLoading"
    >
      <v-card-title class="text-h5">
        {{ titulo }}
      </v-card-title>
      <v-card-text>
        {{ mensagem }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="appVermelho"
          text
          :disabled="isLoading"
          @click="validar(false)"
        >
          Não
        </v-btn>
        <v-btn
          color="primary"
          text
          :disabled="isLoading"
          @click="validar(true)"
        >
          Sim
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import modalMixin from '~/plugins/mixin/modal.js'

export default {
  name: 'ModalConfirmar',
  mixins: [modalMixin],
  props: {
    width: {
      type: String,
      default: '500'
    },
    vinculadoBotao: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      mensagem: '',
      titulo: '',
      data: null
    }
  },
  created () {
    if (!this.vinculadoBotao) {
      this.$nuxt.$on('abrir-modal-confirmar', (mensagem, titulo, data) => {
        this.mensagem = mensagem
        this.titulo = titulo
        this.data = data
        this.dialog = true
      })
    }
  },
  destroyed () {
    this.$nuxt.$off('abrir-modal-confirmar')
  },
  methods: {
    abrirModal (dados) {
      this.definirDados(dados)
      this.mensagem = this.dados?.mensagem ?? ''
      this.titulo = this.dados?.titulo ?? ''
      this.data = this.dados?.dados
      this.dialog = true
    },
    validar (valor) {
      this.$emit('confirmar-validacao', valor, this.data)
      this.fecharModal({ confirmado: valor, dados: this.data })
    }
  }
}
</script>

<style lang="scss" scoped></style>
