<template>
  <span>
    <v-tooltip v-show="tooltip" bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          :style="texto ? 'width:100%;' : ''"
          :icon="!texto"
          :text="text"
          :color="color"
          :disabled="isDisabled"
          :loading="isLoading"
          :class="dark || !texto ? '' : 'white--text'"
          :rounded="rounded"
          :elevation="elevation"
          :outlined="outlined"
          :width="width"
          :height="height"
          v-bind="attrs"
          v-on="on"
          @click="() => $emit('click')"
        >
          <span v-show="iconRight" :class="texto ? 'mr-2' : ''">{{ texto }}</span>
          <v-icon v-show="icon">
            {{ icon }}
          </v-icon>
          <span v-show="!iconRight" :class="texto ? 'ml-2' : ''">{{ texto }}</span>
        </v-btn>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
    <v-btn
      v-show="!tooltip"
      :style="texto ? 'width:100%;' : ''"
      :icon="!texto"
      :text="text"
      :color="color"
      :disabled="isDisabled"
      :loading="isLoading"
      :class="dark || !texto ? '' : 'white--text'"
      :rounded="rounded"
      :elevation="elevation"
      :outlined="outlined"
      :width="width"
      :height="height"
      @click="() => $emit('click')"
    >
      <span v-show="iconRight" :class="texto ? 'mr-2' : ''">{{ texto }}</span>
      <v-icon v-show="icon">
        {{ icon }}
      </v-icon>
      <span v-show="!iconRight" :class="texto ? 'ml-2' : ''">{{ texto }}</span>
    </v-btn>
  </span>
</template>

<script>
import botao from '~/plugins/mixin/botao.js'
export default {
  name: 'BotaoSimples',
  mixins: [botao]
}
</script>
