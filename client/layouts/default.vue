<template>
  <v-app :style="{ backgroundColor: page?.light ?? false ? 'white' : '#eaeaec' }" style="position: relative; z-index: 99">
    <div class="px-2 px-md-8 px-lg-16 pb-16">
      <Header />
      <v-main class="pb-16">
        <TplsSnackBar />
        <div class="pb-16">
          <transition name="fade">
            <Nuxt />
          </transition>
        </div>
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

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    LoadingOverlay,
    SweetAlert
  },

  computed: {
    page () {
      return this.$nuxt.$route.matched[0].instances.default
    }
  },

  destroyed () {
    this.$nuxt.$off('set-menu')
  },
  // mounted () {
  //   window.addEventListener('load', this.onPageLoad)
  // },
  // beforeDestroy () {
  //   window.removeEventListener('load', this.onPageLoad)
  // },
  methods: {
    // onPageLoad () {
    //   this.$store.commit('SET_LOADING', false)
    // },
    setTitle (titulo) {
      this.tituloPagina = titulo
    }
  }
}
</script>
