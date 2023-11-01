<template>
  <main>
    <Hero
      title="Marcos Losekann"
      subtitle="“Temos o mundo para cobrir.”"
      image="/img/marcos_bw.png"
    />
    <ArticleCard
      v-for="artigo in artigos"
      :key="artigo.id"
      :tema="artigo.tema"
      :titulo="artigo.titulo"
      :texto="artigo.subtitulo"
      :local="artigo.local"
      :imagem="$baseUrl + artigo.imagem"
    >
      <template #acoes>
        <button @click="gotoArtigo(artigo)">
          Ler mais...
        </button>
      </template>
    </ArticleCard>
  </main>
</template>

<script>

import loading from '~/plugins/mixin/loading'
import Hero from '~/components/site/Hero.vue'
import ArticleCard from '~/components/site/ArticleCardHome.vue'

export default {

  name: 'IndexPage',
  auth: false,

  components: {
    Hero,
    ArticleCard
  },
  mixins: [loading],
  transition: 'page',

  async asyncData ({ store }) {
    await store.dispatch('articles/getTodosArtigos')
    return { artigos: store.state.articles.todos }
  },

  data () {
    return {
      light: false
    }
  },

  computed: {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {
    gotoArtigo (artigo) {
      this.$router.push(`/article/${artigo.nomeArquivo}`)
    }
  }

}

</script>

<style scoped>

</style>

<style>

</style>
