<template>
  <div class="main-container">
    <div v-if="loading" class="main-text w-8/12 bg-[gray] h-20"></div>
    <div v-else class="question-container">
      <h1 class="question-text">{{ advice }}</h1>
      <div class="alternatives-container">
        <button
          v-for="(alternativa, index) in alternativas"
          :key="index"
          @click="selectAlternative(index)"
          :class="[
            'alternative-button', 
            { selected: selectedAlternative === index },
            { correct: isAnswered && isCorrect(index) },
            { incorrect: isAnswered && !isCorrect(index) && selectedAlternative === index }
          ]"
          :disabled="isAnswered"
        >
          {{ alternativa }}
        </button>
      </div>
      <transition name="fade">
        <div v-if="isAnswered" class="answer-container">
          <p><strong>Resposta correta:</strong> {{ resposta }}</p>
          <p><strong>Justificativa:</strong> {{ justificativa }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      advice: '',
      loading: true,
      alternativas: [],
      justificativa: '',
      resposta: '',
      selectedAlternative: null,
      isAnswered: false,
    }
  },
  created() {
    this.getAdvice()
  },

  methods: {
    getAdvice() {
    //   const apiKey = process.env.apiKey
    //   const model = 'gpt-3.5-turbo'
    //   const url = 'https://api.openai.com/v1/chat/completions'
    //   const headers = {
    //     Authorization: `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json',
    //   }
    //   const data = {
    //     model,
    //     messages: [
    //       {
    //         role: 'system',
    //         content: 'Você é um professor de direito.',
    //       },
    //       {
    //         role: 'user',
    //         content:
    //           'Faça uma questão de direito penal de múltipla escolha em formato de JSON com os campos pergunta, alternativas a,b,c,d,e , letra_correta, justificativa',
    //       },
    //     ],
    //   }

    //   this.$axios
    //     .post(url, data, { headers })
    //     .then((response) => {
    //       // const result = response.data
    //       // const reply = result.choices[0].message.content
    //       this.loading = false
    //       try {
            const res = {
  "pergunta": "Quando um indivíduo pode ser considerado culpado em um crime?",
  "alternativas": {
    "a": "Quando há indícios de autoria e provas suficientes da materialidade do delito",
    "b": "Quando é declarado como culpado pelo juiz sem necessidade de provas",
    "c": "Quando é réu primário",
    "d": "Quando a pena é considerada branda",
    "e": "Quando possui antecedentes criminais"
  },
  "letra_correta": "a",
  "justificativa": "De acordo com o princípio da presunção de inocência, todos são considerados inocentes até que provas suficientes sejam apresentadas e a culpabilidade seja estabelecida pelo Juiz. Portanto, a alternativa correta é a letra 'a', pois é necessário que haja indícios de autoria e provas suficientes da materialidade do delito para que um indivíduo seja considerado culpado em um crime."
}

            this.advice = res.pergunta
            this.alternativas = res.alternativas
            this.justificativa = res.justificativa
            this.resposta = res.letra_correta
            this.loading = false
    },
    selectAlternative(index) {
      this.selectedAlternative = index
      this.isAnswered = true
    },
    isCorrect(index) {
      return this.alternativas[index] === this.resposta
    },
  },
}
</script>

<style>
.main-container {
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.question-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.question-text {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.alternatives-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.alternative-button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid #333;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.3s;
  width: 100%;
}

.alternative-button:hover {
  background-color: #f0f0f0;
}

.selected {
  background-color: #d3f9d8;
  border-color: #28a745;
}

.correct {
  background-color: #d3f9d8;
  border-color: #28a745;
}

.incorrect {
  background-color: #f9d8d8;
  border-color: #d82828;
}

.answer-container {
  margin-top: 20px;
  font-size: 18px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
