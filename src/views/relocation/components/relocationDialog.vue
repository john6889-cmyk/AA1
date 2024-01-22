<template>
  <div class="relocationDialogCom">
    <el-dialog
      :visible.sync="checkVisible"
      width="440px"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <div slot="title" class="relocation_title">
        <span>迁移设备</span>
      </div>
      <div class="formbd">
        <el-form
          label-width="80px"
          size="medium"
          ref="relocationForm"
          :model="formData"
          :rules="formRules"
        >
          <!-- <el-form-item label="源营区：">
            <el-select placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="迁移至：" prop="campsite">
            <el-select placeholder="请选择活动区域" v-model="formData.campsite">
              <el-option
                v-for="item in campsiteOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini" class="closebtn"
          >关闭</el-button
        >
        <el-button type="primary" size="mini" slot="reference" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: { campsite: "" },
      checkVisible: false,
      campsiteOptions: [
        {
          key: "营区A",
          value: "营区A"
        },
        {
          key: "营区B",
          value: "营区B"
        },
        {
          key: "营区C",
          value: "营区C"
        }
      ],
      formRules: {
        campsite: [
          { required: true, message: "请选择迁移目的营区", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.checkVisible = false;
    },
    openDialog() {
      this.checkVisible = true;
    },
    submit() {
      this.$refs.relocationForm.validate(valid => {
        if (valid) {
          // console.log(this.formData, "迁移参数");
          this.$emit("onRelocationCamp", this.formData);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.relocationDialogCom {
  .el-dialog {
    .el-dialog__header {
      // background: #336699 !important;
      // border-bottom: 1px solid #ccc;
      font-size: 18px;
      .relocation_title {
        // color: white;
        text-align: left;
      }
      .el-input__inner {
        width: 100px;
      }
    }
    .el-dialog__body {
      margin: 0 auto;
      .formbd {
        width: 100%;
        .el-form {
          width: 100%;
          .el-form-item {
            width: 100%;
            .el-form-item__content {
              width: 100%;
              margin-left: 0 !important;
              .el-select {
                width: calc(92% - 100px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
