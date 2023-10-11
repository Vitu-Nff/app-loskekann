<template>
  <SelectBase
    ref="select"
    v-model="idCooperativa"
    :items="items"
    label="Cooperativa"
    item-text="DescNomeCooperativa"
    item-value="IdCooperativa"
    no-data-text="Nenhuma Cooperativa encontrada"
    rota="cooperativa/getCooperativas"
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
  name: 'SelectCooperativa',
  components: { SelectBase },
  mixins: [select],
  props: {
    categoriaVinculadaUsuario: {
      type: Boolean,
      default: false
    },
    addCentral: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'A Cooperativa é obrigatória.']
          : []
      }
    }
  },
  data () {
    return {
      idCooperativa: this.value
    }
  },
  methods: {
    params () {
      return {
        BolComCategoriaVinculadoUsuario: this.categoriaVinculadaUsuario ? '1' : null,
        BolAddCentral: this.addCentral ? '1' : null
      }
    }
  }
}
</script>
