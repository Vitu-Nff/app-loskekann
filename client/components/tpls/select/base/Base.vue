<template>
  <v-select
    ref="select"
    :value="idSelecionado"
    :label="label"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    :required="required"
    :clearable="clearable"
    :loading="isLoading"
    :disabled="disabled || items.length === 0 || isLoading"
    :rules="rules"
    :no-data-text="noDataText"
    :multiple="multiple"
    color="primary"
    v-bind="inputProps"
    class="custom-input responsive-input"
    :class="!loadLinear ? 'remove-load-linear' : ''"
    outlined
    hide-details
    dense
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @input="updateValue"
  >
    <template v-show="!loadLinear" #progress>
      <v-progress-circular
        class="align-self-center ml-5"
        indeterminate
        color="primary"
      />
    </template>
    <template v-show="multiple" #selection="{ item, index }">
      <span v-show="index === 0">
        {{ idSelecionado.length > 1 ? idSelecionado.length == items.length ? 'Qualquer ' + label : idSelecionado.length + ' selecionados' : item[itemText] }}
      </span>
    </template>

    <template v-show="multiple" #prepend-item>
      <v-list-item
        ripple
        @mousedown.prevent
        @click="selecionarTudo"
      >
        <v-list-item-action v-show="multiple">
          <v-icon color="primary">
            {{ idSelecionado.length < items.length ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked' }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ idSelecionado.length < items.length ? 'Selecionar todos' : 'Limpar seleção' }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2" />
    </template>
  </v-select>
</template>
<script>

import select from '~/plugins/mixin/select'

export default {
  name: 'SelectBase',
  mixins: [select]
}
</script>

<style>

.v-select--outlined fieldset{
  display: flex;
  padding: 0.625rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid #9E9E9E;
}

.custom-input .v-select__selections span, .custom-input label {
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
