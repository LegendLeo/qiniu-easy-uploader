<template>
  <div class="flex-wrapper">
    <div class="img-wrapper">
      <img
        v-show="imgData"
        :src="imgData"
        id="pasted-img"
      >
    </div>
    <el-button @click="uploadClipboard">上传</el-button>
    <div class="info-wrapper">
      <el-input :value="imgUrl">
        <template slot="prepend">图片地址：</template>
      </el-input>
      <el-button>复制</el-button>
    </div>
  </div>
</template>

<script>
import { uploadScreenshot } from '@/utils'

export default {
  name: 'PasteArea',
  data () {
    return {
      imgData: '',
      imgBlob: null,
      imgUrl: ''
    }
  },
  created () {
    this.setPasteImg()
  },
  methods: {
    setPasteImg () {
      // 粘贴事件
      document.addEventListener('paste', event => {
        if (event.clipboardData || event.originalEvent) {
          let clipboardData =
            event.clipboardData || event.originalEvent.clipboardData
          if (clipboardData.items) {
            let blob
            for (let i = 0; i < clipboardData.items.length; i++) {
              if (clipboardData.items[i].type.indexOf('image') !== -1) {
                blob = clipboardData.items[i].getAsFile()
              }
            }
            this.imgBlob = blob
            let render = new FileReader()
            render.readAsDataURL(blob)
            render.onload = e => {
              // 输出base64编码
              this.imgData = e.target.result
            }
          }
        }
      })
    },
    uploadClipboard () {
      const token = localStorage.getItem('token')
      uploadScreenshot(token, this.imgBlob)
        .then(res => {
          console.log(res)
          this.imgUrl = res.url
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
#pasted-img {
  max-width: 800px;
}
.info-wrapper {
  width: 500px;
  display: flex;
  justify-content: center;
  .el-input {
    max-width: 380px;
  }
  .el-button {
    position: relative;
    z-index: 99;
  }
}
</style>
