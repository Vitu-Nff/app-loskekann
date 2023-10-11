<template>
  <TextfieldMasked
    ref="textfield"
    v-model="celular"
    :label="label"
    :mask="$getTelefoneMask()"
    :rules="rules"
    :validate-on-blur="!validateOnInput"
    :disabled="isDisabled || isLoading"
    :validate="validate"
    :required="required"
    :loading.sync="isLoading"
    :valid="valid"
    :load-linear="loadLinear"
    clearable
    @update:valid="emitValid"
    @focus="emitFocus"
    @blur="emitBlur"
    @change="emitChange"
    @input="updateValue"
  />
</template>

<script>

import TextfieldMasked from './base/BaseMasked.vue'
import textfield from '~/plugins/mixin/wrapper/textfield'

export default {
  name: 'InputCelular',
  components: { TextfieldMasked },
  mixins: [textfield],
  props: {
    label: {
      type: String,
      default: 'Número de Telefone/Celular'
    },
    apenasCelular: {
      type: Boolean,
      default: false
    },
    apenasTelefone: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default () {
        const rules = [v => (this.$validarTelefoneCelular(v) || !v) || 'Número Inválido. Verifique o valor inserido.',
          this.required ? v => !!v || 'O Número é obrigatório.' : true,
          this.apenasCelular ? v => this.$apenasNumeros(v).length === 11 || 'Número Inválido. Verifique o valor inserido.' : true,
          this.apenasTelefone ? v => this.$apenasNumeros(v).length === 10 || 'Número Inválido. Verifique o valor inserido.' : true
        ]
        return rules
      }
    }
  },
  data () {
    return {
      celular: this.value
    }
  }
}

</script>
