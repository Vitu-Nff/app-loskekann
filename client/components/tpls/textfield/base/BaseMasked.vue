<template>
  <div style="display: flex; align-items: center; position: relative;">
    <v-text-field
      ref="textfield"
      v-mask="mask"
      :value="localValue"
      :label="label"
      :validate-on-blur="!validateOnInput"
      :required="required"
      :clearable="clearable"
      :disabled="(isDisabled || isLoading)"
      :loading="isLoading"
      :rules="validate ? rules : []"
      :type="type"
      class="custom-input responsive-input"
      :class="!loadLinear ? 'remove-load-linear' : ''"
      outlined
      hide-details
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
  mixins: [textfield]
}
</script>
<style>

.v-text-field--outlined fieldset{
  display: flex;
  padding: 0.625rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid #9E9E9E;
}

.custom-input input, .custom-input label {
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 142.857% */
}

.remove-load-linear .v-progress-linear.v-progress-linear--absolute {
  display: none !important;
  height: 0 !important;
}

</style>
