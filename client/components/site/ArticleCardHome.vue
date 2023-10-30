<template>
  <v-container class="rounded-container app-branco mb-12" style="position: relative; z-index: 10">
    <v-row class="px-8 px-md-16">
      <v-col
        :cols="12"
        :md="6"
        align-self="center"
        class="py-16 px-2 px-md-8"
        :order="inverter && $vuetify.breakpoint.mdAndUp ? 2 : 1"
      >
        <article>
          <h6 class="article-theme fade-up">
            {{ tema }}
          </h6>
          <h2 class="article-headline fade-up">
            {{ titulo }}
          </h2>
          <p class="article-subtitle fade-up">
            {{ texto }}
          </p>
          <p class="article-location fade-up">
            {{ local }}
          </p>
        </article>
        <nav class="fade-up">
          <slot name="acoes" />
        </nav>
      </v-col>
      <v-col
        :cols="12"
        :md="6"
        class="d-flex justify-center align-center"
        style="position: relative; min-height: 450px;"
        :order="inverter && $vuetify.breakpoint.mdAndUp ? 1 : 2"
      >
        <div class="d-flex justify-center mt-n16" style="position: relative; width: 100%; height: 100%;">
          <img class="fade-to-view" style="position: absolute; object-fit: contain; object-position: center top; scale: 1.25; transform-origin: center top;" width="75%" height="130%" :src="imagem">
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ArticleCardHome',
  props: {
    tema: {
      type: String,
      default: ''
    },
    titulo: {
      type: String,
      default: ''
    },
    texto: {
      type: String,
      default: ''
    },
    local: {
      type: String,
      default: ''
    },
    imagem: {
      type: String,
      default: ''
    },
    inverter: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(150px) rotate(-15deg);
    }
    10% {
        opacity: 0;
        transform: translateY(150px) rotate(-15deg);
    }
    60% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
    }
}

@keyframes fadeUp {
    0% {
        opacity: 0;
    }
    5% {
        opacity: 0;
        transform: translateY(50px);
    }
    60% {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-to-view {
    animation: fadeIn forwards;
    animation-timeline: view();
}

.fade-up {
    animation: fadeUp forwards;
    animation-timeline: view();
}
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
