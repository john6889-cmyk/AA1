<template>
  <div id="checkConfiguration">
    <el-dialog
      :visible.sync="checkVisible"
      width="480px"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div slot="title" class="configuration_title">
        <span>订单二维码</span>
      </div>
      <div>
        <img :src="this.qrCodeImg" alt="" class="qrCodeImg" />
      </div>
      <div>请扫描二维码获取更多信息</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">关闭</el-button>
        <!-- <el-button type="primary" size="mini" @click="submitForm"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkVisible: false,
      qrCodeImg: ""
    };
  },
  methods: {
    // submitForm() {
    //   //提交表单的内容  接口需要的数据
    // },
    handleClose() {
      this.checkVisible = false;
    },
    openDialog(img) {
      this.checkVisible = true;
      this.qrCodeImg = img;
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
}
.qrCodeImg {
  // height: auto;
  // max-width: 100%;
  // max-height: 100%;
  // vertical-align: bottom;
  // bottom: 0;
  // -o-object-fit: fill;
  // object-fit: fill;
  // width: 100%;
  // height: 100%;
  width: 280px;
  object-fit: cover;
}
</style>
<style lang="scss">
#checkConfiguration {
  .el-dialog {
    .el-dialog__header {
      // background: #174f88 !important;
      background: #0a1f4e !important;
      font-size: 16px;
      .configuration_title {
        color: white;
        text-align: left;
        font-size: 16px;
      }
    }
  }
}
</style>
