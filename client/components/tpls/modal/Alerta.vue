<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      :max-width="width"
    >
      <v-card style="padding: 1rem;">
        <div id="icone" class="text-center py-4">
          <v-btn
            class="mx-2"
            :color="cor"
            fab
            outlined
            large
          >
            <v-icon>
              {{ icone }}
            </v-icon>
          </v-btn>
        </div>
        <div id="titulo" class="text-h5 text-center w-100 mt-2">
          {{ titulo }}
        </div>
        <v-card-text class="text-center mb-1">
          {{ mensagem }}
        </v-card-text>
        <v-card-actions class="mb-1">
          <v-btn
            v-show="btnFechar"
            text
            @click="fecharModal(callbackFechar)"
          >
            Fechar
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            :href="link"
            @click="fecharModal(callback)"
          >
            {{ botao }}
          </v-btn>
          <v-spacer v-show="!btnFechar" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ModalAlerta',
  data () {
    return {
      dialog: false,
      mensagem: 'Teste',
      titulo: 'Teste',
      botao: 'Ok',
      icone: 'mdi-exclamation',
      cor: 'red',
      width: '500px',
      callback: false,
      btnFechar: false,
      link: null,
      callbackFechar: '',
      data: null
    }
  },
  created () {
    this.$nuxt.$on('modal-alerta-erro', (mensagem, titulo, opcoes, callback) => {
      if (!mensagem) {
        return
      }
      this.mensagem = mensagem ?? 'Confira os dados fornecidos'
      this.titulo = titulo ?? ''
      // Opções
      this.icone = opcoes?.icone ?? 'mdi-exclamation'
      this.botao = opcoes?.botao ?? 'Tentar novamente'
      this.link = opcoes?.link ?? null
      this.cor = opcoes?.cor ?? 'appVermelho'
      this.width = opcoes?.width ?? '500px'
      this.btnFechar = opcoes?.btnFechar ?? false
      this.callbackFechar = opcoes?.callbackFechar ?? ''
      // Callback
      this.callback = callback ?? false
      this.dialog = true
    })
  },
  destroyed () {
    this.$nuxt.$off('modal-alerta-erro')
  },
  methods: {
    fecharModal (callback) {
      this.dialog = false
      if (callback) {
        callback?.()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
