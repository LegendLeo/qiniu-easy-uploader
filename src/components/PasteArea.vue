<template>
  <div>
    <img :src="imgData" alt="" id="pasted-img">
    <el-button @click="uploadClipboard">上传</el-button>
  </div>
</template>

<script>
import { uploadFile } from '@/utils'

export default {
  name: 'PasteArea',
  data () {
    return {
      imgData: '',
      imgBlob: null
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
            console.log(blob)
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
      uploadFile(token, this.imgBlob)
    }
  }
}
</script>

<style lang="less" scoped>
#pasted-img {
  max-width: 800px;
}
</style>
