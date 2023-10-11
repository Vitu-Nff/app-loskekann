<template>
  <Botao
    :width="width"
    :height="height"
    :icon="icon"
    :icon-right="iconRight"
    :texto="texto"
    :tooltip="tooltip"
    :color="color"
    :outlined="outlined"
    :disabled="isDisabled"
    :loading="isLoading"
    :dark="dark"
    @click="abrirModal"
  />
</template>

<script>
import Botao from '~/components/tpls/actions/base/Base.vue'
import botaoMixin from '~/plugins/mixin/botao.js'

export default {
  name: 'BtnModal',
  components: { Botao },
  mixins: [botaoMixin],
  props: {
    dados: {
      type: [Object, String],
      default: undefined
    },
    modal: {
      type: [String],
      default: undefined
    }
  },
  data () {
    return {
      idBotao: null,
      dialog: false
    }
  },
  methods: {
    abrirModal (dados = this.dados) {
      this.isLoading = true
      this.ouvirConclusaoModal()
      this.$emit('toggle-modal', this.modal, true, { ...dados, IdBotao: this.idBotao })
      this.$emit('abrir-modal', this.modal, true, { ...dados, IdBotao: this.idBotao })
    },
    fecharModal (dados) {
      this.standby()
      this.$emit('toggle-modal', this.modal, false, dados)
      this.$emit('modal-concluido', this.modal, false, dados)
      this.isLoading = false
    },
    ouvirConclusaoModal () {
      this.idBotao = Math.random().toString(36).substring(7)
      this.$nuxt.$on('modal-concluido-' + this.idBotao, (dados) => {
        this.fecharModal(dados)
      })
    },
    standby () {
      this.$nuxt.$off('modal-concluido-' + this.idBotao)
      this.idBotao = null
    }
  }
}
</script>
