<template>
  <div class="printerCom">
    <outSidebox>
      <div slot="content" class="printerContent">
        <div class="contentHearder">
          <span class="hearder-title">打印机管理</span>
          <el-select
            v-model="selectDevide"
            placeholder="请选择"
            size="mini"
            style="width:40%"
            v-if="printerOptions.length > 0"
          >
            <el-option
              v-for="item in printerOptions"
              :key="item.resId"
              :value="item.resId"
              :label="item.equipmentName"
            >
            </el-option>
          </el-select>
        </div>
        <el-card class="content-bd">
          <ul v-if="printerOptions.length > 0">
            <li>
              <i class="icon iconfont">&#xe65a;</i>大类：<span>
                {{ selPrinterData.deviceCategory || "-" }}
                办公自动化系统</span
              >
            </li>
            <li>
              <i class="icon iconfont">&#xe649;</i>小类：<span>
                {{ selPrinterData.deviceType || "-" }}</span
              >
            </li>
            <li>
              <i class="icon iconfont">&#xe671;</i>品牌：<span>{{
                selPrinterData.vendor || "-"
              }}</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe730;</i>型号：<span>{{
                selPrinterData.brand || "-"
              }}</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe637;</i>版本：<span>未知</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe67d;</i>IP：<span>{{
                selPrinterData.ip || "-"
              }}</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe66f;</i>端口：<span>{{
                selPrinterData.port || "-"
              }}</span>
            </li>
          </ul>
          <div class="emptyData" v-else>暂无设备</div>
        </el-card>
      </div>
    </outSidebox>
  </div>
</template>

<script>
import outSidebox from "@/components/campComponents/outSidebox";
export default {
  props: {
    printerOptions: {
      type: Array
    },
    selPrinterData: {
      type: Object
    }
  },
  data() {
    return {
      selectDevide: null
    };
  },
  watch: {
    printerOptions: {
      handler(val, oldVal) {
        if (val && val.length > 0) {
          this.selectDevide = this.printerOptions[0].resId;
        } else {
          this.selectDevide = null;
        }
      },
      deep: true //true 深度监听
    },
    selectDevide(val, oldVal) {
      if (val) {
        this.$emit("changePrinter", val);
      }
    }
  },
  components: {
    outSidebox
  },
  methods: {
    changeSelected(id) {
      this.selectDevide = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.printerCom {
  height: 100%;
  width: 100%;
  color: #fff;
  .printerContent {
    width: 100%;
    height: 100%;
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
      // background-color: #fff;
      .icon {
        color: #409eff;
        font-size: 17px;
        margin-right: 5px;
      }
      ul {
        width: 100%;
        list-style-type: none;
        text-align: left;
        margin: 0;
        margin-left: -40px;
        font-size: 14px !important;
        li:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .emptyData {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #c0c4cc;
        font-size: 14px;
      }
    }
  }
}
</style>
<style lang="scss">
.printerCom {
  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-card__body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .emptyData {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
