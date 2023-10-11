<template>
  <v-dialog
    :value="value"
    :max-width="width"
  >
    <v-card
      class="ma-0 pa-0"
      :loading="isLoading"
      :disable="isDisabled"
    >
      <v-card-title v-show="!noHeader" :class="'mb-2 ' + (!icone && !titulo && !subtitulo ? ' py-1' : '')" style="border-bottom: solid 1px rgb(0 0 0 / 0.05);">
        <div class="d-flex justify-space-between align-center pb-0" style="width: 100%; min-width: 100%;">
          <div>
            <v-stepper flat vertical class="py-0">
              <v-stepper-step
                id="modal-header"
                :class="'px-0 py-2 ma-0 w-100 ' + (icone ? ' ' : ' no-icon')"
                :complete="true"
                :complete-icon="icone"
                step="1"
              >
                <span style="font-size: 1.5rem; font-weight: 450;">{{ titulo }}</span>
                <small style="padding-top: 2px; font-size: 0.75rem;">{{ subtitulo }}</small>
              </v-stepper-step>
            </v-stepper>
          </div>
          <div style="min-width: fit-content;">
            <Botao
              icon="mdi-close"
              color="appCinza"
              tooltip="Fechar"
              text
              dark
              @click="() => $emit('close')"
            />
          </div>
        </div>
      </v-card-title>
      <v-card-text class="py-0">
        <slot name="conteudo" />
      </v-card-text>
      <v-card-actions class="justify-space-between px-6 py-4 mt-2" style="border-top: solid 1px rgb(0 0 0 / 0.05);">
        <slot name="acoes" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Botao from '~/components/tpls/actions/base/Base.vue'

import modalMixin from '~/plugins/mixin/modal.js'

export default {
  name: 'ModalBaseLayout',
  components: {
    Botao
  },
  mixins: [modalMixin],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: '460px'
    },
    titulo: {
      type: [String],
      default: undefined
    },
    subtitulo: {
      type: [String],
      default: undefined
    },
    icone: {
      type: [String],
      default: undefined
    }
  }
}
</script>

<style>
#modal-header span.v-stepper__step__step.primary {
  background-color: rgb(0 0 0 / 0.05) !important;
  height: 42px;
  min-width: 42px;
  width: 42px;
}
#modal-header i.v-icon.notranslate.mdi.theme--light {
    color: #00a194 !important;
    font-size: 1.5rem;
}

#modal-header.no-icon span.v-stepper__step__step.primary {
  display: none !important;
}

#modal-header.no-icon i.v-icon.notranslate.mdi.theme--light {
  display: none !important;
}

@media (max-width: 599px) { /* sm breakpoint */
  #modal-header span.v-stepper__step__step.primary {
    display: none !important;
  }

  #modal-header i.v-icon.notranslate.mdi.theme--light {
    display: none !important;
  }
}
</style>
