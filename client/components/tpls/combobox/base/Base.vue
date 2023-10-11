<template>
  <v-combobox
    ref="combobox"
    :value="localValue"
    :label="label"
    :items="itensTratados"
    :item-text="itemText"
    :item-value="itemValue"
    :required="required"
    :clearable="clearable"
    :disabled="(disabled || isLoading)"
    :loading="isLoading"
    :rules="validate ? rules : []"
    v-bind="inputProps"
    class="responsive-input"
    dense
    filled
    @click="(e) => $emit('click', e)"
    @focus="(e) => $emit('focus', e)"
    @input="updateValue"
  >
    <template v-show="!loadLinear" #progress>
      <v-progress-circular
        class="align-self-center ml-5"
        indeterminate
        color="primary"
      />
    </template>
  </v-combobox>
</template>

<script>

import comboboxMixin from '~/plugins/mixin/combobox'

export default {
  name: 'ComboboxBase',
  mixins: [comboboxMixin]
}
</script>
