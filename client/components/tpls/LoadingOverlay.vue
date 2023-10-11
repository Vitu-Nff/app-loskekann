<template>
  <v-overlay
    :value="loading"
    :style="`z-index: ${zindex}`"
  >
    <v-progress-circular
      v-show="!tip"
      class="loading"
      indeterminate
      size="50"
      width="5"
    />
    <div v-show="!!tip" class="loading-w-tip">
      <v-progress-circular
        class="loading"
        indeterminate
        size="50"
        width="5"
      />
      <div class="tip-container">
        <p class="tip">
          {{ tip }}
        </p>
        <div>
          <div class="dot-flashing" />
        </div>
      </div>
    </div>
  </v-overlay>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      tip: '',
      zindex: 5
    }
  },
  created () {
    this.$nuxt.$on('loading-overlay', (loading, tip, opcoes) => {
      this.loading = loading ?? false
      this.tip = tip ?? ''
      this.zindex = tip ? 300 : 100
      this.zindex = opcoes?.zindex ? opcoes.zindex : this.zindex
    })
  }
}
</script>
<style>
.loading-w-tip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.tip {
  width: 100%;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  line-height: 0.8rem;
  text-align: center;
}

.tip-container {
  display: flex;
  align-items: flex-end;
  grid-gap: 12px;
  gap: 12px;
  padding: 8px 17px 8px 8px;
  background-color: rgba(0,0,0,0.3);
  border-radius: 4px;
}

.dot-flashing {
  position: relative;
  width: 2px;
  height: 2px;
  border-radius: 5px;
  background-color: #fff;
  color: #fff;
  animation: dot-flashing 2s infinite linear;
}
.dot-flashing::before, .dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before {
  left: -5px;
  width: 2px;
  height: 2px;
  border-radius: 5px;
  background-color: #fff;
  color: #fff;
  animation: dot-flashing-before 2s infinite;
}
.dot-flashing::after {
  left: 5px;
  width: 2px;
  height: 2px;
  border-radius: 5px;
  background-color: #fff;
  color: #fff;
  animation: dot-flashing-after 2s infinite;
}

@keyframes dot-flashing-before {
  0%, 19% {
    background-color: rgba(255, 255, 255, 0);
  }
  20%, 100% {
    background-color: #fff;
  }
}

@keyframes dot-flashing {
  0%, 39% {
    background-color: rgba(255, 255, 255, 0);
  }
  40%, 100% {
    background-color: #fff;
  }
}

@keyframes dot-flashing-after {
  0%, 59% {
    background-color: rgba(255, 255, 255, 0);
  }
  60%, 100% {
    background-color: #fff;
  }
}

</style>
