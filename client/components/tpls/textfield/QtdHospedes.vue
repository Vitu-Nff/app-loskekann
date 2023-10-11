<template>
  <v-text-field
    ref="select"
    v-model="computedValue"
    :label="label"
    :loading.sync="isLoading"
    :disabled="isDisabled"
    class="custom-input responsive-input"
    outlined
    dense
    type="number"
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
  name: 'InputHospedes',
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
        this.setFiltros({ filtros: 'qtdeHospedes', value })
      }
    },
    ...mapState({
      store: state => state.filtros.payload.qtdeHospedes,
      selectedLanguageId: state => state.idioma.selectedLanguage.id
    }),
    label () {
      switch (this.selectedLanguageId) {
        case 'pt-br':
          return 'Qtd. Hóspedes'
        case 'en-us':
          return '# of Guests'
        case 'es-es':
          return 'Nº Invitados'
        default:
          return 'Qtd. Hóspedes'
      }
    }
  },
  methods: {
    ...mapActions('filtros', ['setFiltros'])
  }
}
</script>
