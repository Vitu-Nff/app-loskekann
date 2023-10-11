// # Mixin: Disabled

// Este mixin fornece um método padronizado para controlar o estado de carregamento em componentes.

// ## Data:
// localDisabled: Boolean // Define o estado interno de carregamento. O valor inicial é 'false'.

// ## Props:
// disabled: Boolean // Um sinalizador para controlar o estado de carregamento de componentes externos. A propriedade é sincronizada com o componente pai.

// ## Computadas:
// isDisabled:
//     get() - Retorna o estado atual de carregamento. Se 'localDisabled' ou 'disabled' forem verdadeiros, retorna 'true'.
//     set(bol) - Atualiza o valor de 'localDisabled' e emite dois eventos: um para atualizar a prop 'disabled' no componente pai e outro para informar outros componentes do novo estado de carregamento.

// Este mixin é útil por várias razões:
// 1. **Padronização**: Ao usar esse mixin em vários componentes, você garante que todos eles lidam com o estado de carregamento de maneira consistente. Isso facilita a manutenção do código, pois há apenas um lugar onde o manejo do carregamento precisa ser ajustado, se necessário.
// 2. **Reusabilidade**: Em vez de ter que escrever o mesmo código em vários componentes para controlar o estado de carregamento, você pode apenas incluir este mixin.
// 3. **Flexibilidade**: O mixin permite controlar o estado de carregamento internamente (usando 'localDisabled') e externamente (usando 'disabled'). Isso torna o componente mais flexível e adaptável a diferentes necessidades.
export default {
  data () {
    return {
      localDisabled: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
      sync: true
    },
    dependeDe: {
      type: [Array],
      default: undefined
    }
  },
  computed: {
    isDisabled: {
      get () {
        const dependenciaIndisponivel = this?.dependeDe
          ? this.dependeDe.some((dependencia) => {
            return !dependencia || (dependencia?.loading ?? false) || (!dependencia?.value ?? false) || (!dependencia?.valid ?? false)
          })
          : false
        return this.localDisabled || this.disabled || dependenciaIndisponivel
      },
      set (bol) {
        this.localDisabled = bol
        this.$emit('update:disabled', bol)
        this.$emit('disabled', bol, this)
      }
    }
  },
  methods: {
    emitDisabled (bol) {
      this.$emit('disabled', bol)
    }
  }
}
