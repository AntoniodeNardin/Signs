<template>
  <div class="main-container">
    <span class="main-text w-8/12 bg-[gray] h-20" v-if="loading"></span>
    <h1 @click="getAdvice" v-else class="main-text w-8/12">{{ advice }}</h1>
  </div>
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
    }
  },
  methods: {
    async getAdvice() {
      await this.$axios.get(`https://api.adviceslip.com/advice`).then((res) => {
        this.advice = res.data.slip.advice
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
