<template>
  <div class="relocation">
    <div class="relocation-box">
      <searchBoxCom class="search-box" @onSearchChange="onSearchChange">
      </searchBoxCom>
      <div class="list-box">
        <div class="table-top">
          <div class="table-title">
            <span
              style="display:inline-block; width:6px; height:24px; background-color:#409EFF; margin-right:9px;"
            ></span>
            设备列表
          </div>
          <div class="operationBtn">
            <el-button type="warning" size="mini" @click="goRelocation">
              <!-- <i class="el-icon-s-promotion" style="font-size:15px;"></i> -->
              迁移</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="resetDevices"
              :loading="resetBtnLoading"
            >
              <!-- <i class="el-icon-refresh" style="font-size:15px;"></i> -->
              还原</el-button
            >
          </div>
        </div>
        <div class="table-bd">
          <listTableCom
            :deviceAllData="deviceAllData"
            @onPageSizeChange="onPageSizeChange"
            @selectedChange="selectedChange"
            @onPageNumChange="onPageNumChange"
            ref="listTableCom"
          ></listTableCom>
        </div>
      </div>
    </div>
    <relocationDialog
      ref="relocationDialog"
      @onRelocationCamp="onRelocationCamp"
    ></relocationDialog>
  </div>
</template>

<script>
import searchBoxCom from "./components/searchBoxCom.vue";
import listTableCom from "./components/listTableCom.vue";
import relocationDialog from "./components/relocationDialog.vue";
import {
  allDeviceList,
  resetDeviceList,
  moveDevices
} from "@/service/relocation/index.js";
export default {
  data() {
    return {
      searchFormData: {
        campsite: "",
        district: "",
        chName: ""
      },
      pageData: {
        pageNum: 1,
        pageSize: 15
      },
      deviceAllData: [],
      resetBtnLoading: false,
      selectIdList: []
    };
  },
  components: {
    searchBoxCom,
    listTableCom,
    relocationDialog
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    onSearchChange(formData) {
      this.pageData.pageNum = 1;
      this.searchFormData = formData;
      this.getTableList();
    },
    getTableList() {
      this.$refs.listTableCom.openLoading();
      const reqData = {
        ...this.searchFormData,
        ...this.pageData
      };
      allDeviceList(reqData).then(res => {
        if (res.statusCode == 200) {
          for (let item of res.data.list) {
            for (let property in item) {
              if (item[property] === "" || item[property] === null) {
                item[property] = "-";
              }
            }
          }
          setTimeout(() => {
            this.$refs.listTableCom.closeLoading();
            this.deviceAllData = res.data;
          }, 300);
        }
      });
    },
    onPageSizeChange(size) {
      this.pageData.pageSize = size;
      this.getTableList();
    },
    onPageNumChange(num) {
      // console.log(num, "===================");
      this.pageData.pageNum = num;
      this.getTableList();
    },
    //还原设备
    resetDevices() {
      this.$confirm("此操作会将已迁移的设备恢复至初始化，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.resetBtnLoading = true;
          setTimeout(() => {
            resetDeviceList().then(res => {
              if (res.statusCode == 200) {
                this.resetBtnLoading = false;
                this.$message.success("设备已还原成功");
                this.getTableList();
              }
            });
          }, 300);
        })
        .catch(() => {
          return;
        });
    },

    goRelocation() {
      if (this.selectIdList.length > 0) {
        this.$refs.relocationDialog.openDialog();
      } else {
        this.$message({
          message: "请在表格左侧勾选需要迁移的设备",
          type: "warning",
          duration: 5000
        });
      }
    },
    // 表格选择
    selectedChange(ids) {
      this.selectIdList = ids;
    },
    //迁移设备
    onRelocationCamp(formData) {
      let param = {
        resIdList: this.selectIdList,
        ...formData
      };
      moveDevices(param).then(res => {
        if (res.statusCode == 200) {
          this.$refs.relocationDialog.handleClose();
          this.$message.success("设备已迁移成功");
          this.getTableList();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.relocation {
  // background-color: #040c1f;
  background-color: #eeeff4;
  height: calc(100vh - 60px);
  display: flex;
  .relocation-box {
    height: 100%;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    // background-color: skyblue;
    .search-box {
      height: 60px;
      background-color: #fff;
      padding: 0 15px;
      box-sizing: border-box;
    }
    .list-box {
      margin-top: 15px;
      height: calc(100% - 75px);
      background-color: #fff;
      padding: 15px 20px;
      box-sizing: border-box;
      .table-top {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
        .table-title {
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 600;
          color: #303133;
        }
        .operationBtn {
          margin-right: 30px;
        }
      }
      .table-bd {
        height: calc(100% - 44px);
        // background-color: skyblue;
      }
    }
  }
}
</style>
