<template>
  <TextfieldMasked
    ref="textfield"
    v-model="numCpfCnpj"
    label="CPF/CNPJ"
    :mask="$getCpfCnpjMask()"
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
  name: 'InputCpfCnpj',
  components: { TextfieldMasked },
  mixins: [textfield],
  props: {
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'O CPF/CNPJ é obrigatório.', v => this.$validarCpfCnpj(v) || 'Insira um CPF/CNPJ válido.']
          : [v => (!v || this.$validarCpfCnpj(v)) || 'Insira um CPF/CNPJ válido.']
      }
    }
  },
  data () {
    return {
      numCpfCnpj: this.value
    }
  }
}

</script>
