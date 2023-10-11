# Componente
Componente criado para listarTelefonesGertel() do Associado vinculados a seu CpfCnpj
Atualiza :dadosTelefone.sync com o último item selecionado.
Emite eventos de @change sempre que o valor mudar, manualmente ou não.
Oferece uma função getSelecionado() para retornar o objeto selecionado, ou outro objeto com o Id desejado.
Formata automaticamente o itemValue para apresentação como itemText de um telefone fomratado com DDD usando nossa função do Utils.
** Funções _function devem ser utilizadas apenas internamente

# Props Necessárias:
v-model
:items.sync= []

# Props Opcionais:
:dadosTelefone.sync= {}

# Customização
label = ""
clearable = Bol
rules = []
loadLinear = Bol // Muda o tipo de visual do loading para uma linha

O componente pode receber uma prop :input-props com um objeto para personalizar seu comportamento sem afetar o componente pai.
Exemplo:
:input-props="{ hint: 'Selecione um objeto', persistentHint: true }"

<template>
  <Combobox
    ref="combobox"
    :value="numero"
    :items="items"
    :item-text="itemValue"
    :item-value="itemValue"
    :mask-function="$formatarTelefone"
    :label="label"
    :required="required"
    :clearable="clearable"
    :loading="isLoading"
    :disabled="disabled || isLoading"
    :rules="(required && !rules) ? regras : rules"
    :load-linear="loadLinear"
    apenas-numeros
    tratar-items
    :input-props="{ ...inputProps, hint: 'Você pode digitar um novo número caso ele não exista na lista', persistentHint: true }"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @input="updateValue"
  />
</template>
<script>

import { apenasNumeros } from '~/plugins/util'
import Combobox from '~/components/tpls/combobox/base/Base.vue'

export default {
  name: 'ComboboxTelefone',
  components: {
    Combobox
  },
  props: {
    value: {
      required: true,
      validator: prop => ['string', 'number'].includes(typeof prop) || prop === null
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      required: true
    },
    itemValue: {
      type: String,
      default: 'linha'
    },
    label: {
      type: String,
      default: 'Número de Telefone'
    },
    loading: {
      type: Boolean,
      default: false,
      sync: true
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
          ? [v => !!v || 'O Telefone é obrigatório.']
          : []
      }
    },
    dadosTelefone: {
      type: Object,
      required: true,
      sync: true
    }
  },
  data () {
    return {
      numero: this.value,
      localLoading: false
    }
  },
  computed: {
    isLoading () {
      return this.loading || this.localLoading
    }
  },
  methods: {
    async updateValue (value, array = this.items) {
      const valorAntigo = this.numero
      this.numero = value
      await this._atualizarDadosTelefone(value, array)
      this.$emit('input', value)
      if (valorAntigo !== value) {
        this.$emit('change', value)
      }
    },
    async _atualizarDadosTelefone (telefone = this.numero, array = this.items) {
      const dados = await this.$refs.combobox.getSelecionado(telefone, array)
      this.$emit('update:dadosTelefone', dados ?? {})
    },
    async _preSelecionar (telefone = this.numero, array = this.items) {
      if (telefone) {
        await this._atualizarDadosTelefone(telefone)
      } else if (array.length === 1) {
        await this._atualizarDadosTelefone(array[0][this.itemValue])
      }
    },
    async getSelecionado () {
      const item = await this.$refs.combobox.getSelecionado(this.numero)
      return item
    },
    async listarLinhasGertel (numCpfCnpj, idDoBeneficio) {
      this.localLoading = true
      this.$emit('update:loading', this.loading)
      await this.$store.dispatch(
        'beneficio/getInfoFormularioExtra',
        {
          idBeneficio: apenasNumeros(idDoBeneficio),
          params: {
            NumCpfCnpj: apenasNumeros(numCpfCnpj)
          }
        }
      )
        .then((response) => {
          this.$emit('update:items', response)
          this._preSelecionar(this.numero, response)
        })
        .catch(({ response }) => {
          const mensagemDeErro = response.data.mensagem + ': ' + response.data.log
          this.$nuxt.$emit('snackbar', mensagemDeErro, 'error')
        })
        .finally(() => {
          this.localLoading = false
          this.$emit('update:loading', this.loading)
        })
    }
  }
}
</script>
<style>

</style>
