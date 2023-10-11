<template>
  <TextfieldMonetario
    ref="textfield"
    v-model="valor"
    :label="label"
    :vmoney="formatacao"
    :rules="rules"
    :validate-on-blur="!validateOnInput"
    :disabled="isDisabled || isLoading"
    :loading.sync="isLoading"
    :validate="validate"
    :required="required"
    :valid="valid"
    :load-linear="loadLinear"
    @update:valid="emitValid"
    @focus="emitFocus"
    @blur="emitBlur"
    @change="emitChange"
    @input="updateValue"
  />
</template>

<script>

import TextfieldMonetario from './base/BaseMonetario.vue'
import textfield from '~/plugins/mixin/wrapper/textfield'

export default {
  name: 'InputDinheiroOuPorcentagem',
  components: { TextfieldMonetario },
  mixins: [textfield],
  props: {
    label: {
      type: String,
      default: 'Valor'
    },
    required: {
      type: Boolean,
      default: false
    },
    valorMinimo: {
      type: [Number],
      default: undefined
    },
    valorMaximo: {
      type: [Number],
      default: undefined
    },
    percentual: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default () {
        return this.computedRules
      }
    }
  },
  data () {
    return {
      valor: this.value
    }
  },
  computed: {
    computedRules () {
      return [
        this.required ? v => this.converterParaDecimal(v) > 0.00 || 'O Valor é obrigatório.' : true,
        this.valorMinimo ? v => this.converterParaDecimal(v) > this.valorMinimo || 'O valor deve ser superior a ' + (this.percentual ? (this.valorMinimo + ' %') : ('R$ ' + this.valorMinimo)) + '.' : true,
        this.valorMaximo ? v => this.converterParaDecimal(v) < this.valorMaximo || 'O valor deve ser inferior a ' + (this.percentual ? (this.valorMaximo + ' %') : ('R$ ' + this.valorMaximo)) + '.' : true
      ]
    }
  },
  methods: {
    // Por conta do v-money, a ordem aqui é invertida em relação a um componente textfield normal
    async updateValue (value) {
      await this.$nextTick()
      this.$refs.textfield.setValue(value)
      await this.$nextTick()
      await this.$nextTick()
      this.$emit('input', value)
    },
    formatacao () {
      return {
        decimal: ',',
        thousands: '.',
        prefix: this.percentual ? '' : 'R$ ',
        suffix: this.percentual ? ' %' : '',
        precision: 2,
        masked: false
      }
    },
    converterParaDecimal (str) {
      if (this.$valorVazioOuFalso(str)) {
        return 0.00
      }
      // Remove tudo que não for dígito ou vírgula
      str = str.replace(/[^0-9,]/g, '')
      // Substitui vírgula por ponto (para considerar números como 2,00)
      str = str.replace(/,/g, '.')
      return parseFloat(str).toFixed(2)
    }
  }
}

</script>
