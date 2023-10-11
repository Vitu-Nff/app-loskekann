<script>
export default {
  props: {
    ptBr: {
      type: String,
      default: ''
    },
    esEs: {
      type: String,
      default: ''
    },
    enUs: {
      type: String,
      default: ''
    },
    default: {
      type: String,
      default: 'ptBr'
    }
  },
  computed: {
    selectedLanguage () {
      return this.toCamelCase(this.$store.state.idioma.selectedLanguage.id)
    },
    displayedText () {
      if (this[this.selectedLanguage] && this[this.selectedLanguage].length > 0) {
        return this[this.selectedLanguage]
      } else {
        return this[this.default]
      }
    }
  },
  methods: {
    toCamelCase (str) {
      return str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase()
      })
    }
  },
  render (createElement) {
    return createElement('span', this.displayedText)
  }
}
</script>
