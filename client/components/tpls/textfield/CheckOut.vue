<template>
  <v-text-field
    ref="select"
    v-model="computedValue"
    :label="label"
    :loading.sync="isLoading"
    :disabled="isDisabled"
    type="date"
    class="custom-input responsive-input"
    outlined
    dense
    clearable
    :hint="checkIn && !store ? 'Preencha o Check-Out para filtrar data de estadia.' : ''"
    persistent-hint
    :rules="rules"
    :required="required"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import loading from '~/plugins/mixin/loading'
import disable from '~/plugins/mixin/disable'
import TextWrapper from '~/components/site/typo/TextWrapper.vue'

export default {
  name: 'InputCheckout',
  mixins: [disable, loading],
  component: {
    TextWrapper
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      fault: false
    },
    rules: {
      type: [Array],
      default () { return [] }
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.store
      },
      set (value) {
        this.setFiltros({ filtros: 'checkOut', value })
      }
    },
    ...mapState({
      store: state => state.filtros.payload.checkOut,
      checkIn: state => state.filtros.payload.checkIn,
      selectedLanguageId: state => state.idioma.selectedLanguage.id
    }),
    label () {
      switch (this.selectedLanguageId) {
        case 'pt-br':
          return 'Saída'
        case 'en-us':
          return 'Check-out'
        case 'es-es':
          return 'Salida'
        default:
          return 'Check-out'
      }
    }
  },
  methods: {
    ...mapActions('filtros', ['setFiltros'])
  }
}
</script>
