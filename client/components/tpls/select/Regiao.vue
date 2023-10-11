<template>
  <v-select
    ref="select"
    v-model="idSelecionados"
    :items="regioesTodas"
    :label="label"
    item-text=""
    item-value=""
    no-data-text="Nenhuma região encontrada"
    :loading.sync="isLoading"
    :disabled="isDisabled"
    multiple
    class="custom-input responsive-input"
    outlined
    dense
    @blur="handleSelectionChange"
  >
    <template #selection="{ item, index }">
      <span v-show="index === 0">
        {{ idSelecionados.length > 1 ? idSelecionados.length == regioesTodas.length ? qualquerText + label : idSelecionados.length + ' selecionados' : item }}
      </span>
    </template>

    <template #prepend-item>
      <v-list-item
        ripple
        @mousedown.prevent
        @click="selecionarTudo"
      >
        <v-list-item-action>
          <v-icon color="primary">
            {{ idSelecionados.length < regioesTodas.length ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked' }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <span v-show="idSelecionados.length < regioesTodas.length">
              {{ selecionarTodos }}
            </span>
            <span v-show="!(idSelecionados.length < regioesTodas.length)">
              {{ limparSelecao }}
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2" />
    </template>
  </v-select>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import loading from '~/plugins/mixin/loading'
import disable from '~/plugins/mixin/disable'
import TextWrapper from '~/components/site/typo/TextWrapper.vue'

export default {
  name: 'SelectRegioes',
  mixins: [disable, loading],
  component: {
    TextWrapper
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      regioesTodas: state => state.regioes.regioes || [],
      regioesSelecionadas: state => state.filtros.payload.regioes || [],
      selectedLanguageId: state => state.idioma.selectedLanguage.id
    }),
    idSelecionados: {
      get () {
        return this.regioesSelecionadas
      },
      set (v) {
        this.setFiltros({ filtros: 'regioes', value: v })
      }
    },
    label () {
      switch (this.selectedLanguageId) {
        case 'pt-br':
          return 'Região'
        case 'en-us':
          return 'Region'
        case 'es-es':
          return 'Región'
        default:
          return 'Região'
      }
    },
    selecionarTodos () {
      switch (this.selectedLanguageId) {
        case 'pt-br':
          return 'Selecionar Todos'
        case 'en-us':
          return 'Select All'
        case 'es-es':
          return 'Selecionar Todos'
        default:
          return 'Selecionar Todos'
      }
    },
    limparSelecao () {
      switch (this.selectedLanguageId) {
        case 'pt-br':
          return 'Limpar Seleção'
        case 'en-us':
          return 'Clear Selection'
        case 'es-es':
          return 'Selección Clara'
        default:
          return 'Limpar Seleção'
      }
    },
    qualquerText () {
      switch (this.selectedLanguageId) {
        case 'pt-br':
          return 'Qualquer '
        case 'en-us':
          return 'Any '
        case 'es-es':
          return 'Cualquier '
        default:
          return 'Qualquer '
      }
    }
  },
  created () {
    this.idSelecionados = this.regioesSelecionadas
  },
  methods: {
    ...mapActions('filtros', ['setFiltros']),
    handleSelectionChange () {
      if (!this.idSelecionados.length) {
        this.idSelecionados = [...this.regioesTodas]
      }
    },
    selecionarTudo () {
      if (this.idSelecionados.length < this.regioesTodas.length) {
        this.idSelecionados = this.regioesTodas
      } else {
        this.idSelecionados = []
      }
    }
  }
}
</script>
