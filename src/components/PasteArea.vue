<template>
  <div class="flex-wrapper">
    <div class="img-wrapper">
      <div class="img-placeholder"
        v-if="!imgData">
        <div class="note">Ctrl + v 粘贴截图</div>
      </div>
      <img v-else
        :src="imgData"
        id="pasted-img">
    </div>
    <el-input v-model="imgName" class="submit-input" placeholder="在此填写文件名，默认为当前时间">
      <template slot="append">
        <el-button @click="uploadClipboard"
          :disabled="!imgData">上传</el-button>
      </template>
    </el-input>
    <div v-if="imgUrl"
      class="result-box">
      <el-input :value="imgUrl"
        readonly>
        <template slot="prepend">图片链接：</template>
        <el-button slot="append" v-clipboard:copy="imgUrl"
          v-clipboard:success="handleCopied">复制</el-button>
      </el-input>
      <el-input :value="markdownUrl"
        readonly>
        <template slot="prepend"> MD链接 ：</template>
        <el-button slot="append" v-clipboard:copy="markdownUrl"
          v-clipboard:success="handleCopied">复制</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import { uploadScreenshot } from '@/utils'

export default {
  name: 'PasteArea',
  data () {
    return {
      imgName: '',
      imgData: '',
      imgBlob: null,
      imgUrl: '',
      markdownUrl: ''
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
                // 输出base64编码以供页面上显示
                this.imgData = e.target.result
              }
            }
          }
        }
      })
    },
    uploadClipboard () {
      uploadScreenshot(this.imgBlob, this.imgName)
        .then(res => {
          this.$message.success('上传成功！')
          this.imgUrl = res.uri
          let imgName
          if (!this.imgName) {
            imgName = res.key.substr(0, 8)
          } else {
            imgName = this.imgName
          }
          this.markdownUrl = `![${imgName}](${res.uri})`
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleCopied () {
      this.$message.success('复制成功！')
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
.submit-input {
  width: 400px;
  .el-input-group__append {
    cursor: pointer;
  }
}
</style>

<style lang="less">
.result-box {
  display: flex;
  flex-direction: column;
  .el-input {
    width: 500px;
    margin-bottom: 15px;
    &-group__prepend {
      width: 90px;
      padding-left: 0;
      padding-right: 10px;
      text-align: right;
    }
  }
  .el-button {
    position: relative;
    z-index: 99;
  }
}
</style>
