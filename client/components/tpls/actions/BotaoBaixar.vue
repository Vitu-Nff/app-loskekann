<template>
  <Botao
    :width="width"
    :height="height"
    :icon="icon"
    :texto="texto"
    :tooltip="tooltip"
    :color="color"
    :outlined="outlined"
    :disabled="isDisabled"
    :loading="isLoading"
    :dark="dark"
    @click="baixar()"
  />
</template>
<script>

import Botao from '~/components/tpls/actions/base/Base.vue'
import botaoMixin from '~/plugins/mixin/botao.js'

export default {
  name: 'BtnBaixar',
  components: { Botao },
  mixins: [botaoMixin],
  props: {
    paramsObrigatorios: {
      type: Boolean,
      default: false
    },
    mensagemSemFiltro: {
      type: String,
      default: 'É preciso realizar algum filtro.'
    },
    nomeArquivo: {
      type: String,
      required: true
    },
    rota: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'mdi-file-download'
    },
    tooltip: {
      type: String,
      default: 'Baixar'
    },
    params: {
      type: [String, Object],
      default: ''
    }
  },
  data () {
    return {
      localLoading: false,
      dialog: false
    }
  },
  methods: {
    async baixar () {
      if (this.rota.length === 0) {
        return
      }

      try {
        this.isLoading = true
        this.verificarParametros()
      } catch (error) {
        this.$nuxt.$emit('snackbar', error.response.data.mensagem, 'error')
        this.isLoading = false
        return
      }

      try {
        const response = await this.$store.dispatch(this.rota, this.params)
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(new Blob([response.data]))
        link.setAttribute('download', this.nomeArquivo)
        document.body.appendChild(link)
        link.click()
        link.remove()
        this.$emit('baixado', true)
      } catch (error) {
        const reader = new FileReader()
        reader.readAsText(error.response.data)
        reader.onload = () => {
          const retorno = JSON.parse(reader.result)
          this.$nuxt.$emit('snackbar', retorno.mensagem, 'error')
        }
        this.$emit('erro', false)
      } finally {
        this.isLoading = false
      }
    },
    verificarParametros (params = this.params) {
      if (!this.paramsObrigatorios) {
        return true
      }
      const nenhumFiltroRealizado = Object.values(params).every(this.$valorVazioOuFalso)
      if (nenhumFiltroRealizado) {
        const error = this.$buildError(this.mensagemSemFiltro)
        throw error
      }
    }
  }
}
</script>

<style scoped>
</style>
