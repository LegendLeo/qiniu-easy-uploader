<template>
  <div class="flex-wrapper">
    <el-upload
      class="upload-box"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :file-list="imageList"
      list-type="picture"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div
        class="el-upload__tip"
        slot="tip"
      >只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageList: []
    }
  }
}
</script>

<style lang="less" scoped>
.upload-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
