<template>
  <div>
    <!-- Exibir a pergunta e a resposta gerada pelo Chatbot GPT -->
    <h1>Pergunta: {{ question }}</h1>
    <h2>Resposta: {{ answer }}</h2>

    <!-- Botão para enviar a pergunta e obter a resposta do Chatbot GPT -->
    <button @click="fetchAnswer">Obter Resposta</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: 'this is a test',
      answer: 'reste',
    }
  },
  methods: {
    async fetchAnswer() {
      try {
        const response = await this.$axios.post('/completions', {
          prompt: `Pergunta: ${this.question}\nResposta: `,
          model: 'gpt-3.5-turbo',
        })

        // Extrair a resposta da resposta da API
        this.answer = response.data.choices[0].text.trim()
      } catch (error) {
        console.error('Erro ao obter resposta do Chatbot GPT:', error)
      }
    },
  },
}
</script>
