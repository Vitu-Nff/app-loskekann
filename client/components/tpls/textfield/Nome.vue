<template>
  <TextfieldSimples
    ref="textfield"
    v-model="nome"
    :label="label"
    :rules="rules"
    :validate-on-blur="!validateOnInput"
    :disabled="isDisabled || isLoading"
    :loading.sync="isLoading"
    :validate="validate"
    :required="required"
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

import TextfieldSimples from './base/BaseSimples.vue'
import textfield from '~/plugins/mixin/wrapper/textfield'

export default {
  name: 'InputNome',
  components: { TextfieldSimples },
  mixins: [textfield],
  props: {
    label: {
      type: String,
      default: 'Nome'
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? this.sobrenome ? [v => !!v || 'O Nome é obrigatório.', v => (v && v.trim().split(' ').length > 1) || 'Insira ao menos um nome e um sobrenome.'] : [v => !!v || 'O Nome é obrigatório.']
          : []
      }
    },
    sobrenome: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      nome: this.value
    }
  }
}

</script>
