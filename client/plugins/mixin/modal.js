import loading from './loading.js'
import disable from '~/plugins/mixin/disable'
export default {
  mixins: [loading, disable],
  data () {
    return {
      key: '0',
      dialog: false,
      dados: undefined,
      IdBotao: undefined
    }
  },
  methods: {
    definirDados (dados) {
      if (dados?.IdBotao) {
        this.IdBotao = dados?.IdBotao ?? ''
        this.key = this.IdBotao
        delete dados.IdBotao
      }
      this.key = Math.floor(Math.random() * 3)
      this.dados = dados
    },
    fecharModal (dados) {
      this.localLoading = true
      this.$emit('close', dados)
      if (!this.IdBotao) {
        this.$emit('encerrado-sem-vinculo', dados)
      }
      if (this.IdBotao) {
        this.$nuxt.$emit('modal-concluido-' + this.IdBotao, dados)
      }
    }
  }
}
