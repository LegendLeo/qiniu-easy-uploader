<template>
  <div
    class="flex-wrapper"
    v-loading.body="loading"
  >
    <el-upload
      class="upload-box"
      action
      :drag="true"
      accept
      :auto-upload="false"
      :on-change="choosePicture"
      :on-exceed="handleExceed"
      multiple
      :limit="5"
      :disabled="imageList.length > 4"
      :file-list="imageList"
      list-type="picture"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">拖拽图片到此处，或<em>选择图片上传</em></div>
      <div
        class="el-upload__tip"
        slot="tip"
      >只能上传图片文件，且不超过1Mb，最多一次上传5张</div>
    </el-upload>
    <!-- <div class="upload-list__item">
      <i class="el-icon-close"></i>
    </div> -->
    <el-button
      type="primary"
      class="btn-submit"
      :disabled="imageList.length === 0"
      @click="submitUpload"
    >上传</el-button>
  </div>
</template>

<script>
import { uploadImage } from '@/utils'

export default {
  data () {
    return {
      imageList: [],
      loading: false
    }
  },
  methods: {
    choosePicture (file, fileList) {
      this.imageList = fileList
    },
    submitUpload () {
      this.loading = true
      uploadImage(this.imageList)
        .then(res => {
          console.log(res)
          this.loading = false
          this.$message.success('上传成功！')
          this.$store.commit('changeImageUrl', res)
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleExceed () {
      this.$message.error('最多一次上传5张图片')
    }
  }
}
</script>

<style lang="less">
.upload-box {
  margin-top: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .el-upload {
    display: flex;
    justify-content: center;
  }
  .el-upload__tip {
    margin-top: 15px;
  }
}
.btn-submit {
  margin: 20px 0 !important;
}
.upload-list {
  margin: 0;
  padding: 0;
  list-style: none;
  &__item {
    overflow: hidden;
    z-index: 0;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 10px 10px 90px;
    height: 92px;
    width: 100%;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    &-thumbnail {
      vertical-align: middle;
      display: inline-block;
      width: 70px;
      height: 70px;
      float: left;
      position: relative;
      z-index: 1;
      margin-left: -80px;
    }
  }
}
</style>
