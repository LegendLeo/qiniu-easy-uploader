<template>
  <div class="info-wrapper">
    <div
      class="list-item"
      v-for="item in $store.state.images"
      :key="item.hash">
      <el-input
        :value="item.url"
        readonly>
        <template slot="prepend">图片地址：</template>
      </el-input>
      <el-button
        v-clipboard:copy="item.url"
        v-clipboard:success="handleCopied"
      >复制</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: this.$store.state.images
    }
  },
  methods: {
    handleCopied () {
      this.$message.success('复制成功！')
    }
  }
}
</script>

<style lang="less" scoped>
.info-wrapper {
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .list-item {
    display: flex;
    margin-bottom: 10px;
    .el-input {
      max-width: 400px;
      flex: 1;
    }
    .el-button {
      position: relative;
      z-index: 99;
    }
  }
}
</style>
