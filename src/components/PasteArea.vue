<template>
  <div class="flex-wrapper">
    <div class="img-wrapper">
      <div
        class="img-placeholder"
        v-if="!imgData"
      >
        <div class="note">Ctrl + v 粘贴截图</div>
      </div>
      <img
        v-else
        :src="imgData"
        id="pasted-img"
      >
    </div>
    <el-button
      type="primary"
      @click="uploadClipboard"
      :disabled="!imgData"
    >上传</el-button>
  </div>
</template>

<script>
import { uploadScreenshot } from '@/utils'

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
            if (clipboardData.items[0].type.indexOf('image') !== -1) {
              blob = clipboardData.items[0].getAsFile()
              this.imgBlob = blob
              let render = new FileReader()
              render.readAsDataURL(blob)
              render.onload = e => {
                // 输出base64编码
                this.imgData = e.target.result
              }
            }
          }
        }
      })
    },
    uploadClipboard () {
      uploadScreenshot(this.imgBlob)
        .then(res => {
          this.$message.success('上传成功！')
          this.$store.commit('changeImageUrl', [res])
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.img-placeholder {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  .note {
    font-size: 12px;
    color: #606266;
  }
}
#pasted-img {
  max-width: 800px;
}
</style>
