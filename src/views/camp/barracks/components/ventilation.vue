<template>
  <div class="ventilationCom">
    <outSidebox>
      <div slot="content" class="ventilationContent">
        <div class="contentHearder">
          <span class="hearder-title">天燃气报警传感器管理</span>
        </div>
        <el-card class="content-bd">
          <ul v-if="windowOpenerOptions.length > 0">
            <li>
              <i class="icon iconfont">&#xe6a7;</i>名称：<span>
                {{ gasData.name || "-" }}</span
              >
            </li>
            <li>
              <i class="icon iconfont">&#xe671;</i>品牌：<span>
                {{ gasData.vendor || "-" }}</span
              >
            </li>
            <li>
              <i class="icon iconfont">&#xe615;</i>位置：<span>营房</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe643;</i>天燃气浓度：
              <span> {{ gasData.property.density }}%</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe63c;</i>手动控制：
              <el-button
                size="mini"
                type="primary"
                @click="onChangeStatus"
                :loading="loading"
              >
                刷新</el-button
              >
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
    windowOpenerOptions: {
      type: Array
    },
    selVentilationData: {
      type: Object
    }
  },
  data() {
    return {
      selectDevide: null,
      controlCommand: "",
      loading: false,
      gasData: { property: {} }
    };
  },
  watch: {
    windowOpenerOptions: {
      handler(val, oldVal) {
        if (val && val.length > 0) {
          this.selectDevide = this.windowOpenerOptions[0].resId;
        } else {
          this.selectDevide = null;
        }
      },
      deep: true //true 深度监听
    },
    selectDevide(val, oldVal) {
      if (val) {
        this.$emit("changeVentilation", val);
      }
    },
    selVentilationData: {
      handler(val, oldVal) {
        if (val) {
          this.gasData = val;
          if (
            val.property &&
            val.property.status &&
            val.property.status == "open"
          ) {
            this.controlCommand = "close";
          } else {
            this.controlCommand = "open";
          }
        }
      },
      deep: true //true 深度监听
    }
  },
  components: {
    outSidebox
  },
  methods: {
    changeSelected(id) {
      this.selectDevide = id;
    },
    onChangeStatus() {
      this.$emit("onChangeStatus", this.selectDevide, true);
      this.loading = true;
    },
    closeBtnLoading() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.ventilationCom {
  height: 100%;
  width: 100%;
  color: #fff;
  .ventilationContent {
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
        li {
          display: flex;
          align-items: center;
        }
        .controlBtn {
          font-size: 29px;
          color: #409eff;
        }
      }
      .emptyData {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #c0c4cc;
        font-size: 14px;
        display: flex;

        // margin-top: 40%;
      }
    }
  }
}
</style>
<style lang="scss">
.ventilationCom {
  .el-button {
    padding: 5px 15px;
  }
  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-card__body {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .emptyData {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
