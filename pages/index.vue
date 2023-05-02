<template>
  <body>
    <div class="main-container" :style="{ backgroundColor: background }">
      <!-- <script src="//widget.horoscopovirtual.com.br/js/horoscopo.js?background=ffffff&color=585ca9&border=ffffff&text=585ca9&font=roboto&hv_campaign=itself"></script> -->
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
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`https://api.adviceslip.com/advice`)
    return {
      advice: data.slip.advice,
      loading: false,
    }
  },
  data() {
    return {
      advice: '',
      loading: true,
      background: '',
      textColor: '#333',
    }
  },
  created() {
    this.setBackground()
  },
  methods: {
    async getAdvice() {
      await this.$axios.get(`https://api.adviceslip.com/advice`).then((res) => {
        this.advice = res.data.slip.advice
      })
    },
    setBackground() {
      const agora = new Date() // Obtém a data e hora atual
      const hora = agora.getHours() // Obtém a hora atual (0-23)

      if (hora >= 6 && hora < 12) {
        // Se for de manhã (6h às 11h59min), muda a cor do fundo para amarelo
        this.background = '#FFF9C4'
      } else if (hora >= 12 && hora < 18) {
        // Se for de tarde (12h às 17h59min), muda a cor do fundo para laranja
        this.background = '#FFE0B2'
      } else if (hora >= 18 && hora < 22) {
        this.background = '#263238'
        this.textColor = 'white'
      } else {
        this.background = '#212121'
        this.textColor = 'white'
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
