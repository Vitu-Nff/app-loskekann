<template>
  <TextfieldMasked
    ref="textfield"
    v-model="diaMesAno"
    :label="label"
    :mask="$getDataMask()"
    :rules="rules"
    :validate-on-blur="!validateOnInput"
    :disabled="isDisabled || isLoading"
    :validate="validate"
    :required="required"
    :loading.sync="isLoading"
    :valid="valid"
    :load-linear="loadLinear"
    :type="date"
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
  name: 'InputData',
  components: { TextfieldMasked },
  mixins: [textfield],
  props: {
    label: {
      type: String,
      default: 'Data'
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'A Data é obrigatória.', v => this.$validarDiaMesAno(v) || 'Data inválida. Confira se o valor segue o modelo: DD/MM/AAAA.']
          : [v => (this.$validarDiaMesAno(v) || !v) || 'Data inválida. Confira se o valor segue o modelo: DD/MM/AAAA.']
      }
    }
  },
  data () {
    return {
      diaMesAno: this.value
    }
  }
}

</script>
