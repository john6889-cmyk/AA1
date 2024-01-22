<template>
  <div class="searchBoxCom">
    <el-form
      label-width="80px"
      class="searchBoxForm"
      size="small"
      :model="formData"
      ref="searchForm"
    >
      <el-form-item label="所在营区:" prop="campsite">
        <el-select placeholder="请选择活动区域" v-model="formData.campsite">
          <el-option
            v-for="item in campsiteOptions"
            :key="item.key"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在位置:" prop="district">
        <el-select placeholder="请选择活动区域" v-model="formData.district">
          <el-option
            v-for="item in districtOptions"
            :key="item.key"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备大类:" prop="chName">
        <el-input v-model="formData.chName"></el-input
      ></el-form-item>
      <el-form-item class="btnBox">
        <el-button size="mini" type="primary" @click="submitForm"
          >搜索</el-button
        >
        <el-button size="mini" @click="resetForm"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        campsite: "",
        district: "",
        chName: ""
      },
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
      districtOptions: [
        {
          key: "营房",
          value: "营房"
        },
        {
          key: "办公室",
          value: "办公室"
        },
        {
          key: "仓库",
          value: "仓库"
        }
      ]
    };
  },
  methods: {
    submitForm() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.$emit("onSearchChange", this.formData);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.searchForm.resetFields();
      this.$emit("onSearchChange", this.formData);
    }
  }
};
</script>

<style lang="scss" scoped>
.searchBoxCom {
  width: 100%;
  height: 100%;
  .searchBoxForm {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss">
.searchBoxCom {
  .el-form-item {
    margin-bottom: 0 !important;
    margin-right: 20px;
  }
  .el-form-item:not(:last-child) {
  }
  .btnBox {
    margin-right: 0px;
    display: flex;
    justify-content: flex-start;
    .el-form-item__content {
      margin-left: 40px !important;
    }
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
