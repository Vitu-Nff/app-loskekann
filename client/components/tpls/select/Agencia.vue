<template>
  <SelectBase
    ref="select"
    v-model="idAgencia"
    :items="items"
    label="Agência"
    item-text="DescNomePa"
    item-value="IdPa"
    no-data-text="Nenhum Ponto de Atendimento encontrado."
    rota="cooperativa/getPas"
    :params="params()"
    :loading.sync="isLoading"
    :disabled="isDisabled"
    :selecionado="selecionado"
    :required="required"
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
  name: 'SelectAgencia',
  components: { SelectBase },
  mixins: [select],
  props: {
    idCooperativa: {
      required: true,
      validator: prop => ['string', 'number'].includes(typeof prop) || prop === null || prop === undefined
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'A Agência é obrigatória.']
          : []
      }
    }
  },
  data () {
    return {
      idAgencia: this.value
    }
  },
  mounted () {
    if (!this.$valorVazioOuFalso(this.idCooperativa)) {
      this.buscarOpcoes()
    }
  },
  methods: {
    buscarAgencia (idCooperativa = this.idCooperativa) {
      if (idCooperativa) {
        this.buscarOpcoes()
      } else {
        this.updateValue(null)
      }
    },
    params (idCooperativa = this.idCooperativa) {
      return { IdCooperativa: idCooperativa }
    }
  }
}
</script>
