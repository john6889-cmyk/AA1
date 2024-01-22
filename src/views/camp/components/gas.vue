<template>
  <div class="gasCom">
    <outSidebox>
      <div slot="content" class="gasContent">
        <div class="contentHearder">
          <span class="hearder-title">燃气管理</span>
          <el-select
            v-model="selectDevide"
            placeholder="请选择"
            size="mini"
            style="width:40%"
          >
            <el-option
              v-for="item in gasValveOptions"
              :key="item.resId"
              :value="item.resId"
              :label="item.equipmentName"
            >
            </el-option>
          </el-select>
        </div>
        <div class="content-bd">
          <div class="content-top">
            <div class="gasBasicInformation">
              <div
                style="display:flex; justify-content:flex-start;align-item:center; margin-bottom:15px;"
              >
                <i
                  style="display:inline-block; width:5px; height:18px; background-color:#409EFF; margin-right:7px;"
                ></i>
                <span>基本信息</span>
              </div>

              <ul>
                <li>
                  <i class="icon iconfont">&#xe6a7;</i>名称：<span>
                    {{ selGasValveData.name || "-" }}</span
                  >
                </li>
                <li>
                  <i class="icon iconfont">&#xe671;</i>品牌：<span>
                    {{ selGasValveData.vendor || "-" }}</span
                  >
                </li>
                <li>
                  <i class="icon iconfont">&#xe643;</i>状态：
                  <span
                    v-if="
                      selGasValveData &&
                        selGasValveData.property &&
                        selGasValveData.property.status == 'open'
                    "
                  >
                    开</span
                  >
                  <span v-else> 关</span>
                </li>
                <li>
                  <i class="icon iconfont">&#xe63c;</i>手动控制：
                  <!-- <i
                    class="controlBtn iconfont"
                    >&#xe687;
                    </i
                  > -->
                  <el-button
                    size="mini"
                    type="primary"
                    @click="onChangeStatus"
                    :loading="loading"
                  >
                    <span
                      v-if="
                        selGasValveData &&
                          selGasValveData.property &&
                          selGasValveData.property.status == 'open'
                      "
                    >
                      关</span
                    >
                    <span v-else> 开</span></el-button
                  >
                </li>
              </ul>
            </div>
            <div class="gasDashboard">
              <gasDashboard class="pressure" ref="pressure"></gasDashboard>
              <gasDashboard
                class="temperature"
                ref="temperature"
              ></gasDashboard>
            </div>
          </div>
          <div class="content-bottom">
            <div
              class="gasFlow_title"
              style="display:flex; justify-content:flex-start;align-item:center; margin-bottom:15px;"
            >
              <i
                style="display:inline-block; width:5px; height:18px; background-color:#409EFF; margin-right:7px;"
              ></i>
              <span>燃气流量</span>
            </div>
            <div class="flowTable">
              <el-table
                :data="gasFlowList"
                style="width: 100%"
                size="mini"
                :cell-style="cellStyle"
                :header-cell-style="getRowClass"
              >
                <el-table-column
                  prop="date"
                  label="日期"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="flow"
                  label="进气量"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="quali"
                  label="状态"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span></span>
                    <span
                      v-if="scope.row.quali == '合格'"
                      style="color:#67C23A;"
                    >
                      {{ scope.row.quali }}
                    </span>
                    <span v-else style="color:#F56C6C;">
                      {{ scope.row.quali }}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </outSidebox>
  </div>
</template>

<script>
import outSidebox from "@/components/campComponents/outSidebox";
import gasDashboard from "./gasCom/gasDashboard.vue";
export default {
  props: {
    gasValveOptions: {
      type: Array
    },
    selGasValveData: {
      type: Object
    },
    gasFlowList: {
      type: Array
    },
    soketGasDeviceData: {
      type: Object
    }
  },
  data() {
    return {
      selectDevide: null,
      controlCommand: "",
      loading: false
    };
  },
  components: {
    outSidebox,
    gasDashboard
  },
  mounted() {
    if (this.gasValveOptions) {
      this.selectDevide = this.gasValveOptions[0].resId;
    }
  },
  watch: {
    selGasValveData: {
      handler(newVal, oldVal) {
        if (newVal) {
          console.log("传过来给儿子的", newVal);
          if (newVal.property.in_pressure && newVal.property.temperature) {
            this.$refs.pressure.changeDashData(
              "压强",
              newVal.property.in_pressure,
              "KPa"
            );
            this.$refs.temperature.changeDashData(
              "温度",
              newVal.property.temperature,
              "℃"
            );
          } else {
            this.$refs.pressure.changeDashData(
              "压强",
              newVal.property.in_pressure,
              "KPa"
            );
            this.$refs.temperature.changeDashData(
              "温度",
              newVal.property.temperature,
              "℃"
            );
          }
        }
      },
      deep: true
    },
    gasValveOptions: {
      handler(val, oldVal) {
        // console.log("gas", val);
        if (val) {
          this.selectDevide = this.gasValveOptions[0].resId;
          // console.log("gas", this.selectDevide);
        }
      },
      deep: true //true 深度监听
    },
    selectDevide(val, oldVal) {
      if (val) {
        this.$emit("changeGasValve", val);
      }
    }

    // soketGasDeviceData: {
    //   handler(val, oldVal) {
    //     if (val) {
    //       setTimeout(() => {
    //         // console.log("父亲传给儿子", val);
    //       }, 8000);
    //       if (val.out_pressure || val.temperature) {
    //         // console.log("================", val.out_pressure);
    //         this.$refs.pressure.changeDashData("压强", val.out_pressure, "KPa");
    //         this.$refs.temperature.changeDashData("温度", val.temperature, "℃");
    //       }
    //     }
    //   },
    //   deep: true //true 深度监听
    // }
  },
  methods: {
    // 实现单元格文本居中
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center;padding:4px 0 4px 0;background-color:#061740;";
    },
    //设置表格第一行的颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#409EFF;text-align:center;padding:4px 0 4px 0;background-color:#061740;";
      } else {
        return "";
      }
    },
    //点击地图查找
    changeSelected(id) {
      this.selectDevide = id;
    },
    onChangeStatus() {
      let status = "open";
      if (
        this.selGasValveData &&
        this.selGasValveData.property &&
        this.selGasValveData.property.status
      ) {
        status =
          this.selGasValveData.property.status == "open" ? "close" : "open";
      }
      this.$emit("onChangeStatus", this.selectDevide, status);
      this.loading = true;
    },
    closeBtnLoading() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.gasCom {
  height: 100%;
  width: 100%;
  color: #fff;
  .gasContent {
    width: 100%;
    height: 100%;
    padding: 15px 0;
    box-sizing: border-box;
    // padding: 5px;
    // box-sizing: border-box;
    .contentHearder {
      height: 50px;
      line-height: 50px;
      width: 100%;
      // background-color: pink;

      .hearder-title {
        margin-right: 15px;
        font-size: 16px;
      }
    }
    .content-bd {
      height: calc(100% - 50px);
      width: 100%;
      display: flex;
      flex-direction: column;
      // background-color: #fff;
      .content-top {
        flex: 2;
        height: 0;
        width: 100%;
        background-color: rgba(6, 23, 64, 0.8);
        border-radius: 5px;
        // padding: 15px;
        box-sizing: border-box;
        // background-color: pink;
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        .gasBasicInformation {
          flex: 1;
          padding: 15px 15px 0 15px;
          ul {
            width: 100%;
            list-style-type: none;
            text-align: left;
            margin: 0;
            margin-left: -40px;
            font-size: 14px !important;
            .icon {
              color: #409eff;
              font-size: 17px;
              margin-right: 5px;
            }
            li:not(:last-child) {
              margin-bottom: 10px;
            }
            li {
              display: flex;
              align-items: center;
            }
            .controlBtn {
              font-size: 29px;
              color: #409eff;
            }
          }
        }
        .gasDashboard {
          flex: 1.4;
          height: 0;
          display: flex;
          .pressure {
            margin-right: 5px;
            // background-color: skyblue;
            flex: 1;
          }
          .temperature {
            // background-color: skyblue;
            flex: 1;
          }
        }
      }
      .content-bottom {
        flex: 2;
        height: 0;
        width: 100%;
        background-color: rgba(6, 23, 64, 0.8);
        border-radius: 5px;
        padding: 15px;
        box-sizing: border-box;
        // background-color: skyblue;
        .gasFlow_title {
          height: 22px;
        }
        .flowTable {
          height: calc(100% - 37px);
          overflow: auto;
          margin-bottom: 15px;
          background-color: rgba(6, 23, 64, 0.8);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.gasCom {
  .el-input__inner {
    background: url("../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .content-bd {
    .el-button {
      padding: 5px 15px;
    }
    .el-card__body {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
    }
  }
  // .el-table th,
  // .el-table tr {
  //   background-color: none;
  // }
  .el-table {
    background-color: rgba(6, 23, 64, 0.9);
    color: rgba(158, 204, 224, 0.9);
    height: 100%;
    .el-table__header-wrapper {
      height: 32px;
    }
    .el-table__body-wrapper {
      height: calc(100% - 32px);
      overflow: auto;
    }
    .el-table__empty-block {
      background-color: rgba(6, 23, 64, 0.9);
    }
  }
  .body .el-table::before {
    z-index: inherit;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 0.05208vw solid #04284b;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: #04284b !important;
  }
  .el-table__body {
    overflow: auto;

    .el-table__body-wrapper {
      background-color: #04284b !important;
    }
    .el-table .cell.el-tooltip {
      background-color: #04284b !important;
    }
  }
}
</style>
