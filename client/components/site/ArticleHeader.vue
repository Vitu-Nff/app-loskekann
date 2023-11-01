<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container class="pa-0">
    <div class="grid-container">
      <div class="grid-item yellow-grid fade-up">
        <div :class="'d-flex justify-center align-center rounded-container ' + (light ? 'app-branco' : 'app-cinza')" style="position: absolute; width: 100%; height: 100%;">
          <img style="position: relative; margin-top: 25%; object-fit: contain;" height="130%" :src="imagemInicial">
        </div>
      </div>
      <div class="d-flex justify-center align-center grid-item green-grid fade-up">
        <div :class="'d-flex justify-center align-center rounded-container ' + (light ? 'app-branco' : 'app-cinza')" style="width: 100%; height: 100%;">
          <v-row class="pa-8" style="height: 100%">
            <v-col class="d-flex flex-column px-8">
              <p style="font-size: 1.5rem; font-weight: 500; opacity: 0.9;">
                {{ local }}
              </p>
              <p style="font-size: 2.5rem; font-weight: 800; opacity: 0.9; line-height: 100%; margin-top: auto" v-html="textoLocal" />
            </v-col>
            <v-col style="position: relative">
              <img style="position: absolute; object-fit: contain; object-position: center center; scale: 0.8; transform-origin: center center;" width="100%" height="100%" :src="imagemLocal">
            </v-col>
          </v-row>
        </div>
      </div>
      <!-- Imagem 2 -->
      <div class="d-flex justify-center align-center grid-item blue-grid fade-up">
        <div :class="'d-flex justify-center align-center rounded-container ' + (light ? 'app-branco' : 'app-cinza')" style="position: relative; width: 100%; height: 100%;">
          <img style="position: absolute; object-fit: contain; object-position: center center; scale: 0.75; transform-origin: center center;" width="100%" height="100%" :src="imagem2">
        </div>
      </div>
      <!-- Imagem 3 -->
      <div class="d-flex justify-center align-center grid-item purple-grid fade-up" style="position: relative;">
        <div :class="'d-flex justify-center align-center rounded-container ' + (light ? 'app-branco' : 'app-cinza')" style="width: 100%; height: 100%;">
          <img style="position: absolute; object-fit: contain; object-position: center center; scale: 0.75; transform-origin: center center;" width="100%" height="100%" :src="imagem3">
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    light: {
      type: Boolean,
      default: false
    },
    imagemInicial: {
      type: String,
      default: ''
    },
    local: {
      type: String,
      default: ''
    },
    imagemLocal: {
      type: String,
      default: ''
    },
    textoLocal: {
      type: String,
      default: ''
    },
    imagem2: {
      type: String,
      default: ''
    },
    imagem3: {
      type: String,
      default: ''
    }
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
  overflow: hidden;
  position: relative;
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

@keyframes fadeUp {
    0% {
        opacity: 0;
        transform: translateY(25px);
    }
    15% {
        opacity: 0;
        transform: translateY(25px);
    }
    35% {
        opacity: 1;
        transform: translateY(0);
    }
}
.fade-up {
    animation: fadeUp forwards;
    animation-timeline: view();
}

</style>
