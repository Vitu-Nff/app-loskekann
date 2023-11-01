/**
 * Estado inicial do módulo.
 *
 * @returns {Object} Estado inicial
 */
export const state = () => ({
  todos: [],
  atual: null
})

/**
 * Mutations são funções responsáveis por alterar o estado diretamente.
 */
export const mutations = {
  /**
   * Define a lista de artigos.
   *
   * @param {Object} state - Estado atual do módulo.
   * @param {Array} artigos - Lista de artigos a ser definida.
   */
  SET_ARTIGOS (state, artigos) {
    state.todos = artigos
  },

  /**
   * Define o artigo atual.
   *
   * @param {Object} state - Estado atual do módulo.
   * @param {Object} artigo - Artigo a ser definido como atual.
   */
  SET_ARTIGO_ATUAL (state, artigo) {
    state.atual = artigo
  }
}

/**
 * Actions são funções responsáveis por efetuar operações assíncronas e,
 * quando finalizadas, chamam uma mutation para alterar o estado.
 */
export const actions = {
  /**
   * Busca todos os artigos presentes na pasta static/articles e extrai apenas
   * as propriedades desejadas de cada artigo.
   *
   * @param {Function} commit - Função utilizada para disparar uma mutation.
   */
  getTodosArtigos ({ commit }) {
    const contexto = require.context('~/static/articles', false, /\.json$/)
    const artigos = []

    contexto.keys().forEach((chave) => {
      const nomeArquivo = chave.replace(/\.json$/, '').replace('./', '') // Extrai o nome do arquivo sem extensão
      const artigoCompleto = contexto(chave)

      const artigoResumido = {
        nomeArquivo, // Inclui o nome do arquivo para uso posterior
        tema: artigoCompleto.tema,
        titulo: artigoCompleto.titulo,
        subtitulo: artigoCompleto.subtitulo,
        local: artigoCompleto.local,
        imagem: artigoCompleto.imagem
      }

      artigos.push(artigoResumido)
    })

    commit('SET_ARTIGOS', artigos)
  },

  /**
   * Busca um artigo específico pelo nome do arquivo.
   */
  async getArtigo ({ commit }, nome) {
    try {
      const artigo = await import(`~/static/articles/${nome}.json`)
      commit('SET_ARTIGO_ATUAL', artigo)
    } catch (erro) {
      console.error('Erro ao buscar o artigo:', erro)
      commit('SET_ARTIGO_ATUAL', null)
    }
  }
}
