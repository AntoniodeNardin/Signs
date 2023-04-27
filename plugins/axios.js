import axios from 'axios'

// Configuração global do Axios
export default ({ app }) => {
  // Configuração de base URL (opcional)
  axios.defaults.baseURL = 'https://api.openai.com/v1/' // Substitua pela URL da sua API

  // // Configuração de cabeçalhos (opcional)
  // axios.defaults.headers.common.Authorization =
  //   'Bearer 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' // Substitua pela autenticação necessária para sua API

  // Adicione o Axios ao contexto do aplicativo Nuxt
  app.$axios = axios
}
