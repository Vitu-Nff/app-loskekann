<template>
  <SelectBase
    ref="select"
    v-model="idPacoteTarifa"
    :items="items"
    label="Pacote de Tarifa"
    item-text="NomePacoteTarifa"
    item-value="IdPacoteTarifa"
    no-data-text="Nenhum Pacote de Tarifa encontrado"
    rota="tarifa/getTarifas"
    :params="params()"
    :loading.sync="isLoading"
    :disabled="isDisabled"
    :selecionado="selecionado"
    :required="required"
    :multiple="multiple"
    :rules="rules"
    :valid="valid"
    clearable
    :load-linear="loadLinear"
    :busca-automatica="buscaAutomatica"
    @update:items="emitItems"
    @update:selecionado="emitSelecionado"
    @update:valid="emitValid"
    @focus="emitFocus"
    @blur="emitBlur"
    @change="emitChange"
    @input="updateValue"
  />
</template>

<script>

import SelectBase from './base/Base.vue'
import select from '~/plugins/mixin/wrapper/select'

export default {
  name: 'SelectPacoteTarifa',
  components: { SelectBase },
  mixins: [select],
  props: {
    vinculoBeneficio: {
      type: Boolean,
      default: false
    },
    tipoPessoa: {
      type: String,
      default: undefined
    },
    contaCorrente: {
      type: String,
      default: undefined
    },
    cpfCnpj: {
      type: String,
      default: undefined
    },
    idCooperativa: {
      type: String,
      default: undefined
    },
    idBeneficio: {
      type: String,
      default: undefined
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'O Pacote de Tarifa é obrigatório.']
          : []
      }
    }
  },
  data () {
    return {
      idPacoteTarifa: this.value
    }
  },
  methods: {
    params () {
      return {
        IdCooperativa: this.idCooperativa ? this.$apenasNumeros(this.idCooperativa) : undefined,
        NumCpfCnpj: this.cpfCnpj ? this.$apenasNumeros(this.cpfCnpj) : undefined,
        NumContaCorrente: this.contaCorrente ? this.$apenasNumeros(this.contaCorrente) : undefined,
        IdBeneficio: this.idBeneficio ? this.$apenasNumeros(this.idBeneficio) : undefined,
        TipoPessoa: this.tipoPessoa ? this.tipoPessoa : this.cpfCnpj ? this.numCpfCnpj.length > 11 ? 'PJ' : 'PF' : undefined,
        BolVinculoBeneficio: this.vinculoBeneficio ? 1 : undefined
      }
    }
  }
}
</script>
