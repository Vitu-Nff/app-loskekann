<template>
  <nav id="header" class="nav-header nav-row py-2">
    <v-container class="px-md-16 py-3">
      <v-row align="center" justify="center">
        <v-col class="d-flex justify-space-between d-md-block" cols="12" md="4">
          <v-icon class="interactible" color="black">
            mdi-menu
          </v-icon>
          <v-icon class="interactible ml-md-4" color="black">
            mdi-magnify
          </v-icon>
        </v-col>
        <v-col class="justify-space-between d-none d-md-flex" align="center" cols="6" md="4">
          <a class="interactible">HISTÓRIA</a>
          <a class="interactible">CARREIRA</a>
          <a class="interactible">GLOBO</a>
          <a class="interactible">VIDA</a>
        </v-col>
        <v-col class="d-none d-md-block" align="end" cols="6" md="4">
          <a class="interactible">LIVROS</a>
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
  }
</style>

<style scoped>

.nav-header {
  color: #000;
  font-size: 0.785rem;
  font-style: normal;
  font-weight: 600;
}
</style>
