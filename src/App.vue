<template>
  <div id="app">
    <paste-area />
  </div>
</template>

<script>
import PasteArea from './components/PasteArea'

export default {
  name: 'app',
  created () {
    this.$axios.get('/api/uptoken')
      .then(res => {
        localStorage.setItem('token', res.data.uptoken)
      })
  },
  components: {
    PasteArea
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
