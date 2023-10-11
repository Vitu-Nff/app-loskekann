import loading from '~/plugins/mixin/loading'
import disable from '~/plugins/mixin/disable'

export default {
  mixins: [loading, disable],
  name: 'CustomCombobox',
  props: {
    value: {
      required: true,
      validator: prop => ['string'].includes(typeof prop) || prop === null
    },
    items: {
      type: Array,
      required: true,
      sync: true
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    maskFunction: {
      type: Function,
      default: value => value
    },
    label: {
      type: String,
      default: 'Combobox'
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    loadLinear: {
      type: Boolean,
      default: false
    },
    tratarItems: {
      type: Boolean,
      default: false
    },
    apenasNumeros: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Boolean,
      default: true
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
    selecionado: {
      type: Object,
      default: undefined,
      sync: true
    },
    tratamento: {
      type: Function,
      default: (v) => { return v }
    },
    rota: {
      type: String,
      default: undefined
    },
    params: {
      type: [Object, Array, String],
      default: undefined
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
      localValue: this.value
    }
  },
  computed: {
    itensTratados () {
      if (!this.tratarItems) {
        return this.items
      }
      return this.items.map((item) => {
        const itemTratado = { ...item }
        itemTratado.valor_original = itemTratado[this.itemText]
        itemTratado[this.itemText] = this._aplicarFormatacao(itemTratado[this.itemText])
        return itemTratado
      })
    }
  },
  methods: {
    async setValue (v) {
      // Exclusivo para forçar sincronização com alguem componente pai wrapper sem criar um loop infinito de update
      this._tratarValorInterno(v)
      await this.$nextTick()
      this.$emit('update:valid', this.$refs?.combobox?.validate?.())
    },
    updateValue (value) {
      const valorAntigo = this.localValue
      this._tratarValorInterno(value)
      this._emitirUpdate(this.localValue, valorAntigo)
    },
    _tratarValorInterno (value) {
      if (!value) {
        this._tratarNull(value)
      } else if (typeof value === 'object') {
        this._tratarObject(value)
      } else if (typeof value === 'string') {
        this._tratarString(value)
      }
    },
    _tratarNull () {
      this.localValue = ''
    },
    _tratarObject (object) {
      this.localValue = object[this.itemText]
    },
    _tratarString (string) {
      this.localValue = string
      this.localValue = this._aplicarFormatacao(string)
    },
    _aplicarFormatacao (string) {
      string = this.apenasNumeros ? this.$apenasNumeros(string) : string
      return this.maskFunction(string)
    },
    async _emitirUpdate (valorNovo = this.localValue, valorAntigo) {
      if (valorNovo !== valorAntigo) {
        await this.getSelecionado(valorNovo)
        this.$emit('change', valorNovo)
      }
      this.$emit('input', valorNovo)
    },
    async getSelecionado (string = this.localValue) {
      const itemSelecionado = await this.itensTratados.find(item => item[this.itemText] === string) ?? {}
      this.$emit('update:selecionado', itemSelecionado)
      return itemSelecionado
    },
    preSelecionar (array = this.items) {
      if (this.localValue) {
        this._emitirUpdate(this.localValue, null)
      } else if (array.length === 1) {
        this._tratarString(array[0][this.itemValue])
        this._emitirUpdate(this.localValue, null)
      }
    },
    async buscarOpcoes (params = this.params, rota = this.rota, id = this.idSelecionado, index = this.itemValue, updateFunction = this.updateValue) {
      await this.$nextTick()
      if (!rota) {
        return
      }
      if (params === undefined) {
        params = this.params
      }
      this.isLoading = true
      try {
        const response = await this.$store.dispatch(rota, params)
        const responseTratada = response.map(this.tratamento)
        this.preSelecionar(responseTratada)
        this.$emit('update:items', responseTratada)
      } finally {
        this.isLoading = false
      }
    }
  }
}
