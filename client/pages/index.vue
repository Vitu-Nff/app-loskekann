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
      imagem="/img/articles/israel.png"
    >
      <template #acoes>
        <button>Example 1</button>
        <button>Example 2</button>
      </template>
    </ArticleCard>
    <v-container>
      <div class="grid-container">
        <div class="grid-item yellow-grid">
          <div class="d-flex justify-center align-center rounded-container app-branco" style="width: 100%; height: 100%;">
            Conteúdo 01
          </div>
        </div>
        <div class="d-flex justify-center align-center grid-item green-grid">
          <div class="rounded-container app-branco" style="width: 100%; height: 100%;">
            Conteúdo 02
          </div>
        </div>
        <div class="d-flex justify-center align-center grid-item blue-grid">
          <div class="rounded-container app-branco" style="width: 100%; height: 100%;">
            Conteúdo 03
          </div>
        </div>
        <div class="d-flex justify-center align-center grid-item purple-grid">
          <div class="rounded-container app-branco" style="width: 100%; height: 100%;">
            Conteúdo 04
          </div>
        </div>
      </div>
    </v-container>
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
/* Estilos gerais */
.grid-container {
  display: grid;
  gap: 10px;
  min-height: 600px;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  /* border: 1px solid #ccc; */
}

/* Layout Desktop */
.grid-container {
  grid-template-areas:
    "yellow yellow yellow green green green"
    "yellow yellow yellow green green green"
    "yellow yellow yellow blue blue purple";
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.yellow-grid { grid-area: yellow; } /* background-color: yellow; } */
.green-grid  { grid-area: green; }  /* background-color: green; }*/
.blue-grid   { grid-area: blue; } /* background-color: blue; }*/
.purple-grid { grid-area: purple; } /* background-color: purple; }*/

/* Layout Tablet & Mobile */
@media (max-width: 1024px) {
  .grid-container {
    grid-template-areas:
      "yellow yellow yellow yellow"
      "yellow yellow yellow yellow"
      "yellow yellow yellow yellow"
      "yellow yellow yellow yellow"
      "green green green green"
      "green green green green"
      "green green green green"
      "blue blue purple purple"
      "blue blue purple purple";
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(9, 1fr);
  }
}

</style>
