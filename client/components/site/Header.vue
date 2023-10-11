<template>
  <nav id="header" class="nav-row">
    <v-container class="px-md-4 py-3">
      <v-row align="center" justify="center">
        <v-col align="start" cols="6" md="4">
          <v-icon>mdi-menu</v-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-col>
        <v-col align="center" cols="6" md="4">
          <a>HISTÓRIA</a>
          <a>CARREIRA</a>
          <a>GLOBO</a>
          <a>VIDA</a>
        </v-col>
        <v-col align="end" cols="6" md="4">
          <a>LIVROS</a>
        </v-col>
      </v-row>
    </v-container>
  </nav>
</template>

<script>

import loading from '~/plugins/mixin/loading'

export default {

  name: 'HeaderSite',
  components: {
  },
  mixins: [loading],
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

<style>
  #header.nav-row {
    z-index: 115;
    background: #FFF;
    @media (min-width: 599px) {
      border-bottom: 1px solid rgba(128, 128, 128, 0.25);
    }
  }

  #header .logo-header {
    height: 2.25rem;
  }
</style>
