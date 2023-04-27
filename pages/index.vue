<template>
  <!-- <div class="m-5">
    <h1 class="text-center">Conselhos diarios</h1>
    <p class="text-center p-3 border-2">{{ advice }}</p>
  </div> -->
  <div class="main-container">
    <!-- <h1 class="text-center">Conselhos diarios</h1> -->
    <h1 class="main-text w-full">{{ advice }}</h1>
    <span @click="getAdvice">gerar outro</span>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`https://api.adviceslip.com/advice`)
    return {
      advice: data.slip.advice,
    }
  },
  data() {
    return {
      advice: '',
    }
  },
  created() {
    this.getAdvice()
  },
  methods: {
    getAdvice() {
      this.$axios.get(`https://api.adviceslip.com/advice`).then((res) => {
        console.log(res)
        this.advice = res.slip.advice
      })
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
  color: #333;
}
</style>
