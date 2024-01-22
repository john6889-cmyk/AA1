<template>
  <div class="lightUnitsCom">
    <outSidebox>
      <div slot="content" class="lightUnitsContent">
        <div class="contentHearder">
          <span class="hearder-title">灯光管理</span>
          <el-select
            v-model="selectDevide"
            placeholder="请选择"
            size="mini"
            style="width:40%"
            v-if="lightOptions.length > 0"
          >
            <el-option
              v-for="item in lightOptions"
              :key="item.resId"
              :value="item.resId"
              :label="item.equipmentName"
            >
            </el-option>
          </el-select>
        </div>
        <el-card class="content-bd">
          <div class="content" v-if="lightOptions.length > 0">
            <ul>
              <li v-if="selLightData.name != ''">
                <i class="icon iconfont">&#xe6a7;</i>名称：<span>{{
                  selLightData.name || "-"
                }}</span>
              </li>
              <li v-if="selLightData.name != ''">
                <i class="icon iconfont">&#xe671;</i>品牌：<span>{{
                  selLightData.vendor || "-"
                }}</span>
              </li>
              <li>
                <i class="icon iconfont">&#xe615;</i>位置：<span>仓库</span>
              </li>
              <li>
                <i class="icon iconfont">&#xe643;</i>状态：
                <span
                  v-if="
                    selLightData &&
                      selLightData.property &&
                      selLightData.property.status == 'open'
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
                >&#xe687;</i
              > -->
                <el-button
                  size="mini"
                  type="primary"
                  @click="onChangeStatus"
                  :loading="loading"
                >
                  <span
                    v-if="
                      selLightData &&
                        selLightData.property &&
                        selLightData.property.status == 'open'
                    "
                  >
                    关</span
                  >
                  <span v-else> 开</span></el-button
                >
              </li>
            </ul>
            <span
              class="lightOpen iconfont"
              v-if="
                selLightData &&
                  selLightData.property &&
                  selLightData.property.status == 'open'
              "
            >
              &#xe636;</span
            >
            <span v-else class="lightclose iconfont"> &#xe636;</span>
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
    lightOptions: {
      type: Array
    },
    selLightData: {
      type: Object
    }
  },
  data() {
    return {
      // 设备id
      selectDevide: null,
      controlCommand: "",
      loading: false
    };
  },
  watch: {
    lightOptions: {
      handler(val, oldVal) {
        if (val && val.length > 0) {
          this.selectDevide = this.lightOptions[0].resId;
        } else {
          this.selectDevide = null;
        }
      },
      deep: true //true 深度监听
    },
    selectDevide(val, oldVal) {
      if (val) {
        this.$emit("changeLightUnits", val);
      }
    },
    selLightData: {
      handler(val, oldVal) {
        if (val) {
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
      this.$emit("onChangeStatus", this.selectDevide, this.controlCommand);
      this.loading = true;
    },
    closeBtnLoading() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.lightUnitsCom {
  height: 100%;
  width: 100%;
  color: #fff;
  .lightUnitsContent {
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
        .lightclose {
          position: absolute;
          font-size: 62px;
          top: 25%;
          right: 18%;
          color: #909399;
        }
        .lightOpen {
          position: absolute;
          font-size: 62px;
          top: 25%;
          right: 18%;
          color: rgba(255, 153, 0, 0.7);
        }
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
.lightUnitsCom {
  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-button {
    padding: 5px 15px;
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
