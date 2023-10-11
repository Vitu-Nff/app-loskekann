import loading from '~/plugins/mixin/loading'
import disable from '~/plugins/mixin/disable'

export default {
  mixins: [loading, disable],
  props: {
    value: {
      required: true,
      validator: prop => ['string', 'number', 'array', 'object'].includes(typeof prop) || prop === null || prop === undefined
    },
    selecionado: {
      type: [Object, Array],
      default: undefined,
      sync: true
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      required: true,
      sync: true
    },
    itemText: {
      type: String,
      required: true
    },
    itemValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Nome'
    },
    rota: {
      type: String,
      default: undefined
    },
    params: {
      type: [Object, Array, String],
      default: undefined
    },
    loadLinear: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
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
          ? [v => !!v || 'O campo é obrigatório.']
          : []
      }
    },
    noDataText: {
      type: String,
      default: undefined
    },
    tratamento: {
      type: Function,
      default: (v) => { return v }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: undefined
    },
    buscaAutomatica: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      idSelecionado: this.value
    }
  },
  async mounted () {
    this.$emit('mounted')
    if (this.buscaAutomatica) {
      await this.$nextTick()
      this.buscarOpcoes()
    }
  },
  methods: {
    async setValue (v) {
      // Exclusivo para forçar sincronização com alguem componente pai wrapper
      this.idSelecionado = v
      await this.$nextTick()
      this.$emit('update:valid', this.$refs?.select?.validate?.())
    },
    async updateValue (value = this.idSelecionado, array = this.items) {
      const valorAntigo = this.idSelecionado
      this.setValue(value)
      await this.getSelecionado(value, array)
      await this.$nextTick()
      this.$emit('input', value)
      if (valorAntigo !== value) {
        this.$emit('change', value)
      }
    },
    preSelecionar (array = this.items, index = this.itemValue, id = this.idSelecionado, updateFunction = this.updateValue) {
      if (this.multiple && !this.$valorVazioOuFalso(id)) {
        const idsValidos = Array.isArray(id) ? id.filter(itemId => array.some(item => item[index] === itemId)) : []
        updateFunction(idsValidos, array)
        return
      }
      if (!this.$valorVazioOuFalso(id)) {
        const itemExiste = array.some(item => item[index] === id)
        this.idSelecionado = itemExiste ? id : undefined
        updateFunction(this.idSelecionado, array)
        return
      }
      if (array && array.length === 1) {
        updateFunction(array[0][index], array)
      }
    },
    getSelecionado (id = this.idSelecionado, array = this.items, index = this.itemValue) {
      if (this.$valorVazioOuFalso(id)) {
        this.$emit('update:selecionado', {})
        return {}
      }
      const itemsArray = array
      const itemSelecionado = this.multiple ? itemsArray.filter(item => id.includes(item[index])) : itemsArray.find(item => item[index] === id)
      this.$emit('update:selecionado', itemSelecionado)
      return itemSelecionado
    },
    async buscarOpcoes (params, rota = this.rota, id = this.idSelecionado, index = this.itemValue, updateFunction = this.updateValue) {
      await this.$nextTick()
      if (!rota) {
        return
      }
      if (params === undefined) {
        params = this.params
      }
      try {
        this.isLoading = true
        const response = await this.$store.dispatch(rota, params)
        const responseTratada = response.map(this.tratamento)
        this.preSelecionar(responseTratada, index, id, updateFunction)
        this.$emit('update:items', responseTratada)
        return responseTratada
      } finally {
        this.isLoading = false
      }
    },
    async selecionarTudo () {
      if (!this.multiple) {
        return
      }
      await this.$nextTick()
      if (this.idSelecionado.length === this.items.length) {
        this.updateValue([])
        return
      }
      const todasAsOpcoes = this.items.map(item => item[this.itemValue])
      this.updateValue(todasAsOpcoes)
    }
  }
}
