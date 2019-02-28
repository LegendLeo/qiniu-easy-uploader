<template>
  <div id="app">
    <img src="./assets/logo.png">
    <el-button>el-button</el-button>
    <paste-area />
  </div>
</template>

<script>
import PasteArea from './components/PasteArea'

export default {
  name: 'app',
  created () {
    this.$axios.get('http://localhost:9000/api/uptoken')
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
