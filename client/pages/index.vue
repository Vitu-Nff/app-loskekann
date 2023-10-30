<template>
  <main>
    <Hero
      title="Marcos Losekann"
      subtitle="“Temos o mundo para cobrir.”"
      image="/img/marcos_bw.png"
    />
    <ArticleCard
      tema="Internacional"
      titulo="Risco & Paixão: A Jornada de Marcos Losekann, de Londres à Israel."
      texto="Ser correspondente é uma fase importante na vida do repórter, do ponto de vista da grandiosidade do que se faz. Temos o mundo para cobrir."
      local="Israel"
      :imagem="$baseUrl + '/img/articles/israel.png'"
    >
      <template #acoes>
        <button>Example 1</button>
        <button>Example 2</button>
      </template>
    </ArticleCard>
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
      epoca="Correspondente"
      conteudo="Lorem ipsum ... (seu conteúdo aqui) ..."
    />
  </main>
</template>

<script>

import loading from '~/plugins/mixin/loading'
import Hero from '~/components/site/Hero.vue'
import ArticleCard from '~/components/site/ArticleCardHome.vue'
import ArticleHeader from '~/components/site/ArticleHeader.vue'
import ArticleBody from '~/components/site/ArticleBody.vue'

export default {

  name: 'IndexPage',
  auth: false,

  components: {
    Hero,
    ArticleCard,
    ArticleHeader,
    ArticleBody
  },
  mixins: [loading],

  data () {
    return {
    }
  },

  computed: {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {
  }
}

</script>

<style scoped>

</style>

<style>

</style>
