# Componente: DatatableBase

Este componente base é usado para criar tabelas de dados estilizadas.
Ele emite eventos de atualização sempre que um item é modificado na lista.
As funções de busca e tratamento de itens podem ser personalizadas através de propriedades, permitindo um alto grau de flexibilidade no seu uso.

# Props Necessárias:
:headers = []
:items = []
:item-key = ""
:loading = Bol
:sort-by = ""
:sort-desc = Bol
:filtro = Function
:sem-pesquisa = Bol
:footer-props = {}

# Mixin datatable

Este mixin fornece um conjunto de propriedades e métodos úteis para a funcionalidade do componente DatatableBase.

## Props do Mixin:
rota: String
params: [Object, Array, String]
sortBy: String
sortDesc: Bol
semPesquisa: Bol
filtro: Function
pesquisa: Bol
items: Array
itemKey: String
tratamento: Function
headers: [Object, Array]
footerProps: Object
apenasPesquisa: Bol

## Métodos do Mixin:
buscarItens(): Obtém uma lista de itens a partir de uma rota e parâmetros especificados.
verificarPesquisa(): Verifica se um filtro foi aplicado.
atualizarLista(): Atualiza a lista de itens após uma resposta de busca.
_getIndex(): Retorna o índice de um item especificado em uma lista.

# Mixin loading

Este mixin é usado para controlar o estado de carregamento do componente DatatableBase.

## Prop do Mixin:
loading: Bol

## Computed do Mixin:
isLoading: Retorna o estado atual de carregamento do componente.

Os métodos e propriedades não prefixados com um sublinhado (_) são destinados para uso externo. Os métodos e propriedades prefixados com um sublinhado (_) são destinados para uso interno.

<template>
  <Datatable
    :headers="headers"
    :items="items"
    :loading="isLoading"
    :item-key="itemKey"
    :sort-by="sortBy"
    :sort-desc="sortDesc"
    :filtro="filtragem"
    :sem-pesquisa="semPesquisa"
    loading-text="Carregando... Por favor aguarde"
    no-results-text="Nenhum registro encontrado"
    no-data-text="Nenhum registro encontrado"
    :footer-props="footerProps"
  >
    <template v-for="(slot, name) in $scopedSlots" #[name]="props">
      <slot :name="name" v-bind="props" />
    </template>
  </Datatable>
</template>
<script>
import Datatable from './base/Base.vue'
import datatable from '~/plugins/mixin/datatable'

export default {
  name: 'DatatableBase',
  components: {
    Datatable
  },
  mixins: [datatable]
}

</script>
