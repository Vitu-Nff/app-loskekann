<template>
  <v-app style="background:#eaeaec; position: relative; z-index: 99999999999999999999">
    <div class="px-md-10 px-4">
      <Header />
      <v-main>
        <TplsSnackBar />
        <div>
          <Nuxt />
        </div>
        <LocalStorageAgreement />
        <LoadingOverlay />
        <SweetAlert />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import LoadingOverlay from '~/components/tpls/LoadingOverlay'
import SweetAlert from '~/components/tpls/modal/Alerta'

import Header from '~/components/site/Header.vue'
import LocalStorageAgreement from '~/components/LocalStorageAgreement.vue'

export default {
  name: 'DefaultLayout',
  components: {
    LocalStorageAgreement,
    Header,
    LoadingOverlay,
    SweetAlert
  },
  created () {
    if (process.client) {
      this.$store.dispatch('favoritos/loadFavoritos')
      this.$store.dispatch('regioes/loadRegioes')
      this.$store.dispatch('propriedades/buscarPropriedades')
    }
  },
  destroyed () {
    this.$nuxt.$off('set-menu')
  },
  mounted () {
    window.addEventListener('load', this.onPageLoad)
  },
  beforeDestroy () {
    window.removeEventListener('load', this.onPageLoad)
  },
  methods: {
    onPageLoad () {
      this.$store.commit('SET_LOADING', false)
    },
    setTitle (titulo) {
      this.tituloPagina = titulo
    }
  }
}
</script>
