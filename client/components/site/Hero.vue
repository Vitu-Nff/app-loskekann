<template>
  <v-container class="rounded-container app-branco pa-0 mb-12" style="overflow: hidden">
    <v-row no-gutter>
      <v-col
        cols="12"
        md="6"
        order="2"
        order-md="1"
        class="d-flex justify-center justify-md-end ml-n8 ml-md-auto"
      >
        <div class="ml-n16 ml-md-auto mt-n12 hero-img">
          <img class="ml-n16 ml-md-auto" style="scale: 115%;" height="100%" :src="$baseUrl + image">
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        order="1"
        order-md="2"
        align-self="center"
        class="py-16 mt-8 mb-4"
      >
        <h1 class="title-marcos text-center text-md-left px-8">
          {{ title }}
        </h1>
        <p class="text-center text-md-left px-8 mt-4" style="font-size: 1rem; opacity: 0.6">
          {{ subtitle }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {

  name: 'HeroLandingPage',
  components: {
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  }
}

</script>

<style scoped>

.hero-img {

  height: 40vw;
  max-height: 640px;

  @media (max-width: 959px ) { /* md breakpoint */
    height: 54vh;
    max-height: 540px;
  }
}

.title-marcos {
  font-size: 3.5rem;
  line-height: 100%;

  @media (max-width: 959px ) { /* md breakpoint */
    font-size: 2.75rem;
  }
}

</style>
