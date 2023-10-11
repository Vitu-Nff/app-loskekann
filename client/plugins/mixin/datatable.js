import loading from '~/plugins/mixin/loading'
import disable from '~/plugins/mixin/disable'
export default {
  name: 'DatatableBeneficiosAssociado',
  mixins: [loading, disable],
  props: {
    rota: {
      type: String,
      default: undefined
    },
    params: {
      type: [Object, Array, String],
      default: undefined
    },
    sortBy: {
      type: String,
      default: undefined
    },
    sortDesc: {
      type: Boolean,
      default: false
    },
    semPesquisa: {
      type: Boolean,
      default: false
    },
    filtros: {
      type: [Array, Object],
      required: false,
      default: undefined
    },
    filtragem: {
      type: Function,
      required: false,
      default: null
    },
    items: {
      type: Array,
      required: true
    },
    itemKey: {
      type: String,
      required: true
    },
    tratamento: {
      type: Function,
      default: (v) => { return v }
    },
    headers: {
      type: [Object, Array],
      default: undefined
    },
    footerProps: {
      type: Object,
      default: undefined
    },
    apenasPesquisa: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (!this.apenasPesquisa) {
      this.buscarItens()
    }
  },
  methods: {
    async buscarItens (filtros = this.filtros, params = this.params, rota = this.rota) {
      try {
        this.isLoading = true
        this.verificarPesquisa(filtros)
        const payload = params !== undefined || filtros !== undefined ? { ...params, ...filtros } : ''
        const response = await this.$store.dispatch(rota, payload)
        this.atualizarLista(response.map(this.tratamento))
      } catch (error) {
        this.$nuxt.$emit('snackbar', error.response.data.mensagem, 'error')
      } finally {
        this.isLoading = false
      }
    },

    verificarPesquisa (filtros) {
      if (!this.apenasPesquisa) {
        return
      }
      const nenhumFiltroRealizado = Object.values(filtros).every(this.$valorVazioOuFalso)
      if (nenhumFiltroRealizado) {
        const error = this.$buildError('É preciso realizar algum filtro.')
        throw error
      }
    },

    atualizarItem (item) {
      this.atualizarLista(this.getArrayAtualizado(this.tratamento(item)))
    },

    adicionarItem (item, lista = this.items) {
      this.atualizarLista([this.tratamento(item), ...lista])
    },

    atualizarLista (lista) {
      this.$emit('update:items', lista ?? [])
    },

    getArrayAtualizado (item, lista = this.items, id = this.itemKey) {
      const i = this.getIndex(lista, id, item)
      if (i < 0) {
        return [...lista]
      }
      if (item.remover) {
        return [...lista.slice(0, i), ...lista.slice(i + 1)]
      }
      return [...lista.slice(0, i), item, ...lista.slice(i + 1)]
    },

    getIndex (lista, id, item) {
      return lista.findIndex(o => parseInt(o[id]) === parseInt(item[id]))
    }
  }
}
