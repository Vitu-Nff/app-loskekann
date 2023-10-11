<template>
  <SelectBase
    ref="select"
    v-model="idBeneficio"
    :items="items"
    label="Benefício"
    item-text="DescBeneficio"
    item-value="IdBeneficio"
    no-data-text="Nenhum beneficio encontrado"
    rota="beneficio/getBeneficios"
    :params="params()"
    :loading.sync="isLoading"
    :disabled="isDisabled"
    :selecionado="selecionado"
    :required="required"
    :rules="rules"
    :valid="valid"
    :multiple="multiple"
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
  name: 'SelectBeneficio',
  components: { SelectBase },
  mixins: [select],
  props: {
    idCooperativa: {
      type: [String],
      default: undefined
    },
    idPacoteTarifa: {
      type: [String],
      default: undefined
    },
    cpfCnpj: {
      type: [String],
      default: undefined
    },
    ativo: {
      type: Boolean,
      default: false
    },
    exigePacoteTarifa: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'O Benefício é obrigatório.']
          : []
      }
    }
  },
  data () {
    return {
      idBeneficio: this.value
    }
  },
  methods: {
    params () {
      return {
        IdPacoteTarifa: this.idPacoteTarifa ? this.$apenasNumeros(this.idPacoteTarifa) : undefined,
        IdCooperativa: this.idCooperativa ? this.$apenasNumeros(this.idCooperativa) : undefined,
        NumCpfCnpj: this.cpfCnpj ? this.$apenasNumeros(this.cpfCnpj) : undefined,
        BolAtivo: this.ativo ? 1 : undefined
      }
    },
    async buscarPorContaCorrente (idCooperativa = this.idCooperativa, cpfCnpj = this.cpfCnpj, numContaCorrente = this.contaCorrente) {
      const rotaCC = 'beneficio/buscarPacoteDeTarifaContaCorrente'
      const paramsCC = {
        IdCooperativa: idCooperativa,
        NumCpfCnpj: cpfCnpj,
        NumContaCorrente: numContaCorrente
      }
      return await this.$refs.select.buscarOpcoes(paramsCC, rotaCC)
    },
    async buscarBeneficioPorAssociado (idCooperativa = this.idCooperativa, cpfCnpj = this.cpfCnpj, bolBeneficioAtual = true) {
      const rotaBA = 'beneficio/associado/getBeneficiosAssociado'
      const paramsBA = {
        IdCooperativa: idCooperativa,
        NumCpfCnpj: cpfCnpj,
        BolBeneficioAtual: bolBeneficioAtual ? 1 : undefined
      }
      return await this.$refs.select.buscarOpcoes(paramsBA, rotaBA)
    },
    async buscarOpcoes (params, rota) {
      await this.$nextTick()
      if (this.exigePacoteTarifa && !this.idPacoteTarifa) {
        return
      }
      return await this.$refs.select.buscarOpcoes(params, rota)
    }
  }
}
</script>
