<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <div class="article-container">
      <div class="header">
        <p class="theme mb-1">
          {{ tema }}
        </p>
        <h2 class="headline-title libre mb-1">
          {{ headline }}
        </h2>
        <p class="subtitle mb-4">
          {{ subtitulo }}
        </p>
        <p class="location">
          {{ localizacao }}
        </p>
      </div>
      <div class="sidebar">
        <p class="period">
          {{ periodo }}
        </p>
        <p class="epoch">
          {{ epoca }}
        </p>
      </div>
      <div class="content" v-html="conteudo" />
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    tema: {
      type: String,
      required: true
    },
    headline: {
      type: String,
      required: true
    },
    subtitulo: {
      type: String,
      required: true
    },
    localizacao: {
      type: String,
      required: true
    },
    periodo: {
      type: String,
      required: true
    },
    epoca: {
      type: String,
      required: true
    },
    conteudo: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.article-container {
  display: grid;
  grid-template-columns: 3fr 1fr; /* 3 partes para o conteúdo e 1 parte para a barra lateral */
  gap: 1rem;
}

.header .theme {
  color: #868686;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
}

.header .headline-title {
  color: #323232;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 115%;
}

.header .subtitle {
  color: #868686;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  min-height: 140px;
}

.header .location {
  color: #868686;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
}

.period {
  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
}

.epoch {
  color: rgba(0, 0, 0, 0.65);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sidebar .period, .sidebar .epoch {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) { /* Mudança para o layout móvel */
  .article-container {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "sidebar"
      "content";
  }

  .header {
    grid-area: header;
  }

  .sidebar {
    grid-area: sidebar;
    align-items: flex-start; /* Alinhe à esquerda no layout móvel */
  }

  .content {
    grid-area: content;
    color: rgba(0, 0, 0, 0.75);
    font-family: Montserrat;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 2.1rem */
  }
}
</style>
