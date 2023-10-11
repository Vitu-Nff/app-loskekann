<template>
  <div v-show="showPopup" class="footer-popup">
    Utilizamos Armazenamento Local para registrar dados simples como seus Favoritos, etc!
    <button class="ml-1 px-8 py-1" @click="agree">
      Continuar
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPopup: !this.isAgreed()
    }
  },
  methods: {
    isAgreed () {
      if (process.client && !process.server) {
        return localStorage.getItem('agreedToLocalStorage') === 'true'
      } else {
        return true
      }
    },
    agree () {
      if (process.client && !process.server) {
        localStorage.setItem('agreedToLocalStorage', 'true')
      }
      this.showPopup = false
    }
  }
}
</script>

<style scoped>
.footer-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  z-index: 999999999999;
}

button {
  background-color: white;
  color: #333;
}
</style>
