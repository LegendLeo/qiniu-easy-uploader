<template>
  <div id="app">
    <el-tabs type="border-card" class="main-tabs">
      <el-tab-pane label="截图上传">
        <paste-area />
      </el-tab-pane>
      <el-tab-pane label="选图上传">
        <choose-area />
      </el-tab-pane>
    </el-tabs>
    <result-box :imgUrl="imgUrl" />
  </div>
</template>

<script>
import PasteArea from './components/PasteArea'
import ChooseArea from './components/ChooseArea'
import ResultBox from './components/ResultBox'

export default {
  name: 'app',
  created () {
    this.$axios.get('/api/uptoken')
      .then(res => {
        localStorage.setItem('token', res.data.uptoken)
      })
  },
  methods: {
    changeImageUrl (url) {
      this.imgUrl = url
    }
  },
  components: {
    PasteArea,
    ChooseArea,
    ResultBox
  }
}
</script>

<style lang="less">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.main-tabs {
  max-width: 1000px;
  min-height: 500px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  .el-tabs__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .el-tab-pane {
      flex: 1;
      display: flex;
    }
  }
}
.flex-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
