<template>
  <main>
    <ArticleHeader
      local="Israel"
      texto-local="Temos<br>o mundo<br><span style='opacity: 0.75'>para cobrir</span>"
      :imagem-inicial="$baseUrl + '/img/articles/israel.png'"
      :imagem-local="$baseUrl + '/img/maps/israel_map.png'"
      :imagem2="$baseUrl + '/img/articles/bullet.png'"
      :imagem3="$baseUrl + '/img/articles/helmet.png'"
      light
    />
    <ArticleBody
      tema="INTERNACIONAL"
      headline="Risco & Paixão: A Jornada de Marcos Losekann,"
      subtitulo="Ser correspondente é uma fase importante na vida do repórter, do ponto de vista da grandiosidade do que se faz. Temos o mundo para cobrir."
      localizacao="ISRAEL"
      periodo="2006 - 2011"
      cargo="Correspondente"
      conteudo="Lorem ipsum ... (seu conteúdo aqui) ..."
    />
  </main>
</template>

<script>

import loading from '~/plugins/mixin/loading'
import ArticleHeader from '~/components/site/ArticleHeader.vue'
import ArticleBody from '~/components/site/ArticleBody.vue'

export default {

  name: 'ArticlePage',
  auth: false,

  components: {
    ArticleHeader,
    ArticleBody
  },
  mixins: [loading],
  transition: 'page',

  async asyncData ({ params, store }) {
    await store.dispatch('articles/getArtigo', params.nome)

    return {
      artigoAtual: store.state.articles.atual
    }
  },

  data () {
    return {
      light: true
    }
  }

}
</script>
