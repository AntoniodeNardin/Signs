<template>
  <body>
    <div class="main-container" :style="{ backgroundColor: background }">
      <span v-if="loading" class="main-text w-8/12 bg-[gray] h-20"></span>
      <h1
        v-else
        class="main-text w-8/12"
        :style="{ color: textColor }"
        @click="getAdvice"
      >
        {{ advice }}
      </h1>
    </div>
  </body>
</template>
<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      advice: '',
      loading: true,
      background: '#f8f8f8',
      textColor: '#333',
    }
  },
  created() {
    this.setBackground()
    this.getAdvice()
  },

  methods: {
    getAdvice() {
      const apiKey = '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'
      const model = 'gpt-3.5-turbo'
      const url = 'https://api.openai.com/v1/chat/completions'
      const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
      const data = {
        model,
        messages: [
          { role: 'system', content: 'Você é um assistente de bate-papo.' },
          {
            role: 'user',
            content: 'De um conselho em poucas palavras',
          },
        ],
      }

      this.$axios
        .post(url, data, { headers })
        .then((response) => {
          const result = response.data
          const reply = result.choices[0].message.content
          this.loading = false
          this.advice = reply
        })
        .catch((error) => {
          console.error('Erro na requisição:', error.response.data)
        })
    },
    setBackground() {
      const agora = new Date()
      const hora = agora.getHours()
      if (hora < 6 || hora > 19) {
        this.background = '#333'
        this.textColor = '#f8f8f8'
      }
    },
  },
}
</script>
<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.main-container {
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
}

.main-text {
  font-size: 48px;
  font-weight: bold;
  cursor: pointer;
}
</style>
