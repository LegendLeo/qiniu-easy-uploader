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
    <el-dialog
      title="七牛云配置"
      :visible.sync="dialogConfigVisible">
      <el-form label-width="100px">
        <el-form-item label="AccessKey:">
          <el-input v-model="qiniuInfo.accessKey"></el-input>
        </el-form-item>
        <el-form-item label="SecretKey:">
          <el-input v-model="qiniuInfo.secretKey"></el-input>
        </el-form-item>
        <el-form-item label="Bucket:">
          <el-input v-model="qiniuInfo.bucket"></el-input>
        </el-form-item>
        <el-form-item label="Domain:">
          <el-input v-model="qiniuInfo.domain"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postUploadToken(true)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import PasteArea from './components/PasteArea'
import ChooseArea from './components/ChooseArea'

export default {
  name: 'app',
  data () {
    return {
      hasConfig: localStorage.getItem('hasConfig'),
      dialogConfigVisible: false,
      qiniuInfo: JSON.parse(localStorage.getItem('qiniuInfo')) || {}
    }
  },
  created () {
    if (this.hasConfig) {
      // 如果服务端有配置直接get获取token
      this.getUploadToken()
    } else if (this.qiniuInfo.hasOwnProperty('accessKey')) {
      // 如果服务端没有配置而本地存储有token，使用post方法获取token
      this.postUploadToken()
    } else {
      // 如果服务端没有配置，本地存储也没有token，使用post方法获取token（需先填写表单获取配置信息）
      this.$axios.get('/api/getconfig')
        .then(res => {
          let hasConfig = res.data.hasConfig
          if (hasConfig) {
            this.getUploadToken()
            localStorage.setItem('hasConfig', 1)
          } else {
            this.dialogConfigVisible = true
          }
        })
    }
  },
  methods: {
    getUploadToken () {
      this.$axios.get('/api/gettoken')
        .then(res => {
          localStorage.setItem('token', res.data.uptoken)
        })
    },
    postUploadToken (isStore) {
      if (isStore) {
        localStorage.setItem('qiniuInfo', JSON.stringify(this.qiniuInfo))
      }
      this.$axios.post('/api/posttoken', this.qiniuInfo)
        .then(res => {
          let token = res.data.uptoken
          localStorage.setItem('token', token)
          this.dialogConfigVisible = false
        })
    }
  },
  components: {
    PasteArea,
    ChooseArea
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
