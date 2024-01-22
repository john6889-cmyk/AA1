<template>
  <div class="conferenceTerminal">
    <outSidebox>
      <div slot="content" class="terminalContent">
        <div class="contentHearder">
          <span class="hearder-title">会议终端</span>
          <el-select
            v-model="terminal"
            placeholder="请选择"
            size="mini"
            style="width:40%"
            v-if="conferenceDeviceOptions.length > 0"
          >
            <el-option
              v-for="item in conferenceDeviceOptions"
              :key="item.resId"
              :value="item.resId"
              :label="item.equipmentName"
            >
            </el-option>
          </el-select>
        </div>
        <el-card class="content-bd">
          <ul v-if="conferenceDeviceOptions.length > 0">
            <!-- <li>
              <i class="icon iconfont">&#xe67d;</i> IP地址：<span
                >大泽动力汽油发电机</span
              >
            </li> -->
            <li>
              <i class="icon iconfont">&#xe671;</i>品牌：<span>{{
                selTerminalData.vendor || "-"
              }}</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe6a7;</i>名称：<span>{{
                selTerminalData.name || "-"
              }}</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe67d;</i>IP：<span
                >{{ selTerminalData.property.ip || "-" }}
              </span>
            </li>
            <li>
              <i class="icon iconfont">&#xe615;</i>位置：<span>办公楼</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe643;</i>状态：
              <span
                v-if="
                  selTerminalData.property && selTerminalData.property.status
                "
              >
                忙碌</span
              >
              <span v-else> 空闲</span>
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
    conferenceDeviceOptions: {
      type: Array
    },
    selTerminalData: {
      type: Object
    }
  },
  data() {
    return {
      terminal: null
    };
  },
  watch: {
    conferenceDeviceOptions: {
      handler(val, oldVal) {
        if (val && val.length > 0) {
          this.terminal = this.conferenceDeviceOptions[0].resId;
        } else {
          this.terminal = null;
        }
      },
      deep: true //true 深度监听
    },
    terminal(val, oldVal) {
      if (val) {
        this.$emit("changeTerminal", val);
      }
    }
  },
  components: {
    outSidebox
  },
  methods: {
    changeSelected(id) {
      this.terminal = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.conferenceTerminal {
  height: 100%;
  width: 100%;
  color: #fff;
  .terminalContent {
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
        color: #e4e7ed;
        font-size: 14px;
      }
    }
  }
}
</style>
<style lang="scss">
.conferenceTerminal {
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
