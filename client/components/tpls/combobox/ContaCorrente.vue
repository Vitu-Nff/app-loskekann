<template>
  <ComboboxBase
    ref="combobox"
    v-model="contaCorrente"
    label="Conta Corrente"
    :items="items"
    item-text="NumContaCorrente"
    item-value="NumContaCorrente"
    :selecionado="selecionado"
    rota="associado/listarContasCorrentes"
    :params="params()"
    :rules="rules"
    :disabled="isDisabled || isLoading"
    :loading.sync="isLoading"
    :validate="validate"
    :required="required"
    :valid="valid"
    clearable
    :load-linear="loadLinear"
    apenas-numeros
    :input-props="{ hint: 'Você pode digitar a conta corrente caso ela não exista na lista', 'persistent-hint': true }"
    @update:items="(items) => $emit('update:items', items)"
    @update:selecionado="(objeto) => $emit('update:selecionado', objeto)"
    @update:valid="emitValid"
    @focus="emitFocus"
    @blur="emitBlur"
    @change="emitChange"
    @input="updateValue"
  />
</template>

<script>

import ComboboxBase from './base/Base.vue'
import comboboxMixin from '~/plugins/mixin/wrapper/combobox'

export default {
  name: 'InputContaCorrente',
  components: { ComboboxBase },
  mixins: [comboboxMixin],
  props: {
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'A Conta Corrente é obrigatória.']
          : []
      }
    },
    idCooperativa: {
      type: String,
      default: undefined
    },
    cpfCnpj: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      contaCorrente: this.value
    }
  },
  methods: {
    params () {
      return { IdCooperativa: this.idCooperativa, NumCpfCnpj: this.$apenasNumeros(this.cpfCnpj) }
    }
  }
}
</script>
