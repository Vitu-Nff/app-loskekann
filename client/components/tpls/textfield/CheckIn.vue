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
    :hint="checkOut && !store ? 'Preencha o Check-In para filtrar data de estadia.' : ''"
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
  name: 'InputCheckIn',
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
        this.setFiltros({ filtros: 'checkIn', value })
      }
    },
    ...mapState({
      store: state => state.filtros.payload.checkIn,
      checkOut: state => state.filtros.payload.checkOut,
      selectedLanguageId: state => state.idioma.selectedLanguage.id
    }),
    label () {
      switch (this.selectedLanguageId) {
        case 'pt-br':
          return 'Chegada'
        case 'en-us':
          return 'Check-in'
        case 'es-es':
          return 'Llegada'
        default:
          return 'Check-in'
      }
    }
  },
  methods: {
    ...mapActions('filtros', ['setFiltros'])
  }
}
</script>
