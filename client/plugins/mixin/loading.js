// # Mixin: Loading

// Este mixin fornece um método padronizado para controlar o estado de carregamento em componentes.

// ## Data:
// localLoading: Boolean // Define o estado interno de carregamento. O valor inicial é 'false'.

// ## Props:
// loading: Boolean // Um sinalizador para controlar o estado de carregamento de componentes externos. A propriedade é sincronizada com o componente pai.

// ## Computadas:
// isLoading:
//     get() - Retorna o estado atual de carregamento. Se 'localLoading' ou 'loading' forem verdadeiros, retorna 'true'.
//     set(bol) - Atualiza o valor de 'localLoading' e emite dois eventos: um para atualizar a prop 'loading' no componente pai e outro para informar outros componentes do novo estado de carregamento.

// Este mixin é útil por várias razões:
// 1. **Padronização**: Ao usar esse mixin em vários componentes, você garante que todos eles lidam com o estado de carregamento de maneira consistente. Isso facilita a manutenção do código, pois há apenas um lugar onde o manejo do carregamento precisa ser ajustado, se necessário.
// 2. **Reusabilidade**: Em vez de ter que escrever o mesmo código em vários componentes para controlar o estado de carregamento, você pode apenas incluir este mixin.
// 3. **Flexibilidade**: O mixin permite controlar o estado de carregamento internamente (usando 'localLoading') e externamente (usando 'loading'). Isso torna o componente mais flexível e adaptável a diferentes necessidades.

export default {
  data () {
    return {
      localLoading: false
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
      sync: true
    }
  },
  computed: {
    isLoading: {
      get () {
        return this.localLoading || this.loading || this.$store.state.isLoading
      },
      set (bol) {
        this.localLoading = bol
        this.$emit('update:loading', bol)
        this.$emit('loading', bol, this)
      }
    }
  },
  methods: {
    emitLoading (bol, dados) {
      this.$emit('loading', bol, dados)
    }
  }
}
