<template>
  <div style="display: flex; align-items: center; position: relative;">
    <v-text-field
      ref="textfield"
      v-money="vmoney()"
      :value="localValue"
      :label="label"
      :validate-on-blur="!validateOnInput"
      :required="required"
      :clearable="clearable"
      :disabled="(isDisabled || isLoading)"
      :loading="isLoading"
      :rules="validate ? rules : []"
      :type="type"
      :class="'responsive-input ' + !loadLinear ? 'remove-load-linear' : ''"
      filled
      dense
      v-bind="inputProps"
      @change="$emit('change')"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @input="updateValue"
    />
    <v-progress-circular
      v-show="!loadLinear && isLoading"
      style="heigth: 26px; width: 26px; position: absolute; right: 14px; top: 12px;"
      indeterminate
      color="primary"
    />
  </div>
</template>
<script>

import textfield from '~/plugins/mixin/textfield'

export default {
  mixins: [textfield],
  props: {
    vmoney: {
      type: [String, Number, Array, Function],
      required: true
    }
  }
}
</script>
<style>
.remove-load-linear .v-input__append-inner > .v-input__icon.v-input__icon--append .v-progress-circular.v-progress-circular--indeterminate {
  visibility: hidden;
}

</style>
