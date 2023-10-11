import loading from '~/plugins/mixin/loading.js'
import disable from '~/plugins/mixin/disable.js'
export default {
  name: 'DataTable',
  mixins: [loading, disable],
  props: {
    apenasPesquisa: {
      type: Boolean,
      default: false
    },
    semPesquisa: {
      type: Boolean,
      default: false
    },
    filtros: {
      type: [Object, Array],
      default: undefined
    },
    sortBy: {
      type: String,
      default: undefined
    },
    sortDesc: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buscarItens (filtros) {
      this.$refs.datatable.buscarItens(filtros)
    },

    atualizarItem (item) {
      this.$refs.datatable.atualizarItem(item)
    },

    removerItem (item) {
      this.$refs.datatable.atualizarItem({ ...item, remover: true })
    },

    adicionarItem (item) {
      this.$refs.datatable.adicionarItem(item)
    }

  }
}
