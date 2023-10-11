import loading from '~/plugins/mixin/loading.js'
import disable from '~/plugins/mixin/disable.js'
export default {
  name: 'BotaoSimples',
  mixins: [loading, disable],
  props: {
    icon: {
      type: String,
      default: undefined
    },
    tooltip: {
      type: String,
      default: undefined
    },
    outlined: {
      type: Boolean,
      default: false
    },
    texto: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: '0'
    },
    width: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: undefined
    },
    text: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    }
  }
}
