<template>
  <main>
    <Hero
      title="Marcos Losekann"
      subtitle="“Temos o mundo para cobrir.”"
      image="/img/marcos_bw.png"
    />
    <v-container class="rounded-container app-branco mb-12">
      <v-row class="px-4 py-16 px-md-16">
        <v-col
          cols="12"
          md="6"
          align-self="center"
          class="py-16 px-0 px-md-8"
        >
          <article>
            <h6 class="article-theme">
              Internacional
            </h6>
            <h2 class="article-headline">
              Risco & Paixão: A Jornada de Marcos Losekann, de Londres à Israel.
            </h2>
            <p class="article-subtitle">
              Ser correspondente é uma fase importante na vida do repórter, do ponto de vista da grandiosidade do que se faz. Temos o mundo para cobrir.
            </p>
            <p class="article-location">
              Israel
            </p>
          </article>
          <nav>
            <button>Example</button>
            <button>Example</button>
          </nav>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center align-center"
          style="position: relative; min-height: 450px;"
        >
          <div class="d-flex justify-center mt-n16" style="position: relative; width: 100%; height: 100%;">
            <img style="position: absolute; object-fit: contain; object-position: center top; scale: 2; transform-origin: center top;" width="75%" height="100%" :src="$baseUrl + '/img/articles/israel.png'">
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>

import loading from '~/plugins/mixin/loading'
import Hero from '~/components/site/Hero.vue'

export default {

  name: 'IndexPage',
  auth: false,

  components: {
    Hero
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
.article-theme {
  color: #868686;
  font-family: Montserrat;
  font-size: 1.33969rem;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  text-transform: uppercase;
  padding-bottom: 8px;
}

.article-headline {
  color: #323232;
  font-family: Libre Baskerville;
  font-size: 1.96488rem;
  font-style: normal;
  font-weight: 700;
  line-height: 115%;
  padding-bottom: 16px;
}

.article-subtitle {
  color: #868686;
  font-family: Montserrat;
  font-size: 1.33969rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  min-height: 140px;
  padding-bottom: 16px;
}

.article-location {
  color: #868686;
  font-family: Montserrat;
  font-size: 1.07175rem;
  font-style: normal;
  font-weight: 300;
  line-height: 149.1%;
  text-transform: uppercase;
}

</style>
