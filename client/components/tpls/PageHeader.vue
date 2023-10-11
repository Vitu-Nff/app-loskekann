<template>
  <v-row :class="'d-flex align-center teste ' + (!$slots.botoes ? 'mt-4 mb-5' : ' mb-1')">
    <v-col
      class="d-flex"
      cols="12"
      md="8"
    >
      <v-icon v-if="icone !== ''" class="mr-2">
        {{ icone }}
      </v-icon>
      <slot v-else name="icone" />
      <h2>
        <template v-if="titulo !== ''">
          {{ titulo }}
        </template>
        <slot v-else name="titulo" />
      </h2>
    </v-col>
    <v-col class="d-flex align-right mb-1" cols="12" md="4">
      <slot name="botoes" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    titulo: {
      type: String,
      default: ''
    },
    icone: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>

</style>
