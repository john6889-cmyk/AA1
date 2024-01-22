<template>
  <div class="alarmSystemCom">
    <outSidebox>
      <div slot="content" class="alarmSystemContent">
        <div class="contentHearder">
          <span class="hearder-title">报警系统</span>
          <el-select
            v-model="selectDevide"
            placeholder="请选择"
            size="mini"
            style="width:40%"
            v-if="alarmDeviceOptions.length > 0"
          >
            <el-option
              v-for="item in alarmDeviceOptions"
              :key="item.resId"
              :value="item.resId"
              :label="item.equipmentName"
            >
            </el-option>
          </el-select>
        </div>
        <el-card class="content-bd">
          <div class="content" v-if="alarmDeviceOptions.length > 0">
            <ul v-if="alarmDeviceOptions.length > 0">
              <li>
                <i class="icon iconfont">&#xe6a7;</i>名称：<span>{{
                  selAlarmSystemData.name || "-"
                }}</span>
              </li>
              <li>
                <i class="icon iconfont">&#xe671;</i>品牌：<span>{{
                  selAlarmSystemData.vendor || "-"
                }}</span>
              </li>
              <li>
                <i class="icon iconfont">&#xe615;</i>位置：<span>仓库</span>
              </li>
              <li>
                <i class="icon iconfont">&#xe643;</i>状态：
                <span
                  v-if="
                    selAlarmSystemData &&
                      selAlarmSystemData.property &&
                      selAlarmSystemData.property.status
                  "
                >
                  开</span
                >
                <span v-else> 关</span>
              </li>
            </ul>
            <span
              class="alarmIcon iconfont"
              v-if="
                selAlarmSystemData &&
                  selAlarmSystemData.property &&
                  selAlarmSystemData.property.status == true
              "
              >&#xe67a;</span
            >
            <span class="alarmIconClose iconfont" v-else>&#xe67a;</span>
          </div>
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
    alarmDeviceOptions: {
      type: Array
    },
    selAlarmSystemData: {
      type: Object
    }
  },
  data() {
    return {
      selectDevide: null
    };
  },
  watch: {
    alarmDeviceOptions: {
      handler(val, oldVal) {
        if (val && val.length > 0) {
          this.selectDevide = this.alarmDeviceOptions[0].resId;
        } else {
          this.selectDevide = null;
        }
      },
      deep: true //true 深度监听
    },
    selectDevide(val, oldVal) {
      if (val) {
        this.$emit("changeAlarmSystem", val);
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
.alarmSystemCom {
  height: 100%;
  width: 100%;
  color: #fff;
  .alarmSystemContent {
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
      .content {
        width: 100%;
        height: 100%;
        position: relative;
        .alarmIconClose {
          position: absolute;
          font-size: 48px;
          top: 25%;
          right: 26%;
          color: #909399;
        }
        .alarmIcon {
          position: absolute;
          font-size: 48px;
          top: 15%;
          right: 26%;
          color: rgba(255, 153, 0, 0.7);
          // color: #ff9900;
        }
        .icon {
          color: #409eff;
          font-size: 17px;
          margin-right: 5px;
        }
        ul {
          width: 100%;
          height: 100%;
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
.alarmSystemCom {
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
