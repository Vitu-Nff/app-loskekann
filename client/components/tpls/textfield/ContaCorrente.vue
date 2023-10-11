<template>
  <TextfieldSimples
    ref="textfield"
    v-model="contaCorrente"
    label="Conta Corrente"
    :rules="rules"
    :validate-on-blur="!validateOnInput"
    :disabled="isDisabled || isLoading"
    :validate="validate"
    :required="required"
    :loading.sync="isLoading"
    :valid="valid"
    :load-linear="loadLinear"
    type="number"
    clearable
    @update:valid="emitValid"
    @focus="emitFocus"
    @blur="emitBlur"
    @change="emitChange"
    @input="updateValue"
  />
</template>

<script>

import TextfieldSimples from './base/BaseSimples.vue'
import textfield from '~/plugins/mixin/wrapper/textfield'

export default {
  name: 'InputContaCorrente',
  components: { TextfieldSimples },
  mixins: [textfield],
  props: {
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'A Conta Corrente é obrigatória.']
          : []
      }
    }
  },
  data () {
    return {
      contaCorrente: this.value
    }
  }
}

</script>
