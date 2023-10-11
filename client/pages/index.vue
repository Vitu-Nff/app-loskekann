<template>
  <v-container fluid class="rounded-container app-branco px-md-8 py-md-8 px-2 py-2">
    <v-col
      cols="12"
      md="4"
      lg="2"
      order="2"
      md-order="1"
    >
      {{ $baseUrl }}
      <v-img :src="$baseUrl + '/img/marcos_bw.png'" />
    </v-col>
    <v-col
      cols="12"
      md="4"
      lg="2"
      order="1"
      md-order="2"
    >
      <h1>
        Marcos Losekann
      </h1>
      <h5>
        “Temos o mundo para cobrir.”
      </h5>
    </v-col>
  </v-container>
</template>

<script>

import loading from '~/plugins/mixin/loading'

export default {

  name: 'IndexPage',
  auth: false,

  components: {
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

<style>

</style>
