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
    random() {
      const number = Math.floor(Math.random() * 200)
      this.number = number
    },

    getAdvice() {
      this.random()
      const idsSalvos = JSON.parse(localStorage.getItem('advices') || '[]')
      if (idsSalvos.includes(this.number)) {
        if (idsSalvos.length < 200) {
          this.getAdvice()
        } else {
          localStorage.clear()
          this.getAdvice()
        }
      } else {
        this.$axios
          .get(`https://api.adviceslip.com/advice/${this.number}`)
          .then((res) => {
            this.loading = false
            this.advice = res.data.slip.advice
            idsSalvos.push(this.number)
            localStorage.setItem('advices', JSON.stringify(idsSalvos))
          })
      }
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
