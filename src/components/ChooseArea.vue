<template>
  <div class="flex-wrapper"
    v-loading.body="loading">
    <el-upload class="upload-box"
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
      list-type="picture">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">拖拽图片到此处，或<em>选择图片上传</em></div>
      <div class="el-upload__tip"
        slot="tip">只能上传图片文件，且不超过1Mb，最多一次上传5张</div>
    </el-upload>
    <transition-group tag="ul"
      class="upload-list"
      name="el-fade-in-linear">
      <li class="upload-list__item"
        v-for="(item, index) in imageList"
        :key="item.name">
        <img :src="item.url"
          class="upload-list__item-thumbnail">
        <div class="upload-list__item-content">
          <span>{{ item.name }}</span>
          <el-input v-if="item.uri"
            :value="item.uri"
            size="small"
            readonly>
            <template slot="prepend">URL:</template>
            <template slot="append">
              <span v-clipboard:copy="item.uri"
                v-clipboard:success="handleCopied">复制</span>
            </template>
          </el-input>
          <el-input v-if="item.mdUri"
            :value="item.mdUri"
            size="small"
            readonly>
            <template slot="prepend"> MD:</template>
            <template slot="append">
              <span v-clipboard:copy="item.mdUri"
                v-clipboard:success="handleCopied">复制</span>
            </template>
          </el-input>
        </div>
        <i class="el-icon-close"
          @click="deleteItem(index)"></i>
      </li>
    </transition-group>
    <el-button type="primary"
      class="btn-submit"
      :disabled="imageList.length === 0"
      @click="submitUpload">上传</el-button>
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
    deleteItem (index) {
      this.imageList.splice(index, 1)
    },
    submitUpload () {
      this.loading = true
      uploadImage(this.imageList)
        .then(res => {
          console.log(res)
          this.loading = false
          this.$message.success('上传成功！')
          this.imageList.forEach(item => {
            let curItem = res.find(val => {
              let key = val.key.replace(/-\d{8}\./, '.')
              return key === item.name
            })
            console.log(curItem)
            item.uri = curItem.uri
            item.originName = item.name.replace(/\.\w{3,4}$/, '')
            item.mdUri = `![${item.originName}](${curItem.uri})`
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleExceed () {
      this.$message.error('最多一次上传5张图片')
    },
    handleCopied () {
      this.$message.success('复制成功！')
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
.flex-wrapper .btn-submit {
  margin: 20px 0 !important;
}
.el-upload-list {
  display: none;
}
.upload-list {
  width: 500px;
  margin: 0;
  padding: 0;
  list-style: none;
  &__item {
    overflow: hidden;
    z-index: 0;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 10px 10px 90px;
    height: 120px;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    position: relative;
    width: 100%;
    &-thumbnail {
      vertical-align: middle;
      width: 98px;
      height: 98px;
      float: left;
      position: relative;
      z-index: 1;
      margin-left: -80px;
    }
    &-content {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-around;
      .el-input {
        width: calc(100% - 12px);
        margin-left: 10px;
        &-group__prepend {
          width: 40px;
          padding-left: 0;
          padding-right: 10px;
          text-align: right;
        }
        &-group__append {
          padding: 0 10px;
          cursor: pointer;
        }
        &:last-of-type {
          margin-top: 5px;
        }
      }
    }
    .el-icon-close {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      opacity: 0.75;
      color: #606266;
    }
    &:hover .el-icon-close {
      display: inline-block;
    }
  }
}
</style>
