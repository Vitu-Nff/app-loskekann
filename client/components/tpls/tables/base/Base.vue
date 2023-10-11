<template>
  <div>
    <v-row v-show="!semPesquisa">
      <v-col cols="12">
        <v-text-field
          v-model="pesquisar"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
          filled
          dense
        />
      </v-col>
    </v-row>
    <template v-if="filtro !== null">
      <v-data-table
        :headers="headers"
        :items="items"
        :item-key="itemKey"
        :search="pesquisar"
        :loading="loading"
        loading-text="Carregando... Por favor aguarde"
        no-results-text="Nenhum registro encontrado"
        no-data-text="Nenhum registro encontrado"
        :footer-props="footerProps"
        :custom-filter="filtro"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
      >
        <template v-for="(slot, name) in $scopedSlots" #[name]="item">
          <slot :name="name" v-bind="item" />
        </template>
      </v-data-table>
    </template>
    <template v-else>
      <v-data-table
        :headers="headers"
        :items="items"
        :item-key="itemKey"
        :search="pesquisar"
        :loading="loading"
        loading-text="Carregando... Por favor aguarde"
        no-results-text="Nenhum registro encontrado"
        no-data-text="Nenhum registro encontrado"
        :footer-props="footerProps"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
      >
        <template v-for="(slot, name) in $scopedSlots" #[name]="item">
          <slot :name="name" v-bind="item" />
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script>
export default {
  name: 'TableBase',
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => []
    },
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      required: true,
      default: false
    },
    semPesquisa: {
      type: Boolean,
      default: false
    },
    itemKey: {
      type: String,
      required: true,
      default: ''
    },
    filtro: {
      type: Function,
      required: false,
      default: null
    },
    sortBy: {
      type: String,
      required: false,
      default: ''
    },
    sortDesc: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      pesquisar: '',
      footerProps: {
        itemsPerPageText: 'Itens por página',
        itemsPerPageOptions: [5, 10, 25, 50]
      }
    }
  }
}
</script>
<style>

</style>
