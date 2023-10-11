<template>
  <div v-show="loading">
    <TplsLoadingOverlay :loading="loading" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.start()
      setTimeout(() => this.finish(), 2000)
    })
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
