<template>
  <div class="environmentalCom">
    <outSidebox>
      <div slot="content" class="environmentalContent">
        <div class="contentHearder">
          <span class="hearder-title">环境检测</span>
          <el-select
            v-model="selectDevide"
            placeholder="请选择"
            size="mini"
            style="width:40%"
            v-if="environmentOptions.length > 0"
          >
            <el-option
              v-for="item in environmentOptions"
              :key="item.resId"
              :value="item.resId"
              :label="item.equipmentName"
            >
            </el-option>
          </el-select>
        </div>
        <div class="content-bd">
          <div class="content" v-if="environmentOptions.length > 0">
            <ul>
              <li>
                <i class="icon iconfont">&#xe6a7;</i>名称：<span>{{
                  selEnvironmentData.name || "-"
                }}</span>
              </li>
              <li>
                <i class="icon iconfont">&#xe671;</i>品牌：<span>{{
                  selEnvironmentData.vendor || "-"
                }}</span>
              </li>
              <li>
                <i class="icon iconfont">&#xe615;</i>位置：<span>营房</span>
              </li>
              <!-- <li>
              <i class="icon iconfont">&#xe617;</i>温度：<span>****</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe894;</i>湿度：<span>****</span>
            </li> -->
              <li
                v-if="
                  selEnvironmentData.property &&
                    selEnvironmentData.property.light
                "
              >
                <i class="icon iconfont">&#xe608;</i> 光照强度：<span>
                  {{ selEnvironmentData.property.light }}</span
                >
              </li>

              <li
                v-if="
                  selEnvironmentData.property &&
                    selEnvironmentData.property.air_quality
                "
              >
                <i class="icon iconfont">&#xe632;</i>空气质量：<span>{{
                  selEnvironmentData.property.air_quality
                }}</span>
              </li>
              <li
                v-if="
                  selEnvironmentData.property &&
                    selEnvironmentData.property.noise
                "
              >
                <i class="icon iconfont">&#xe61c;</i>噪声：<span>{{
                  selEnvironmentData.property.noise
                }}</span>
              </li>
            </ul>
            <environment ref="environment"></environment>
          </div>
          <div class="emptyData" v-else>暂无设备</div>
        </div>
      </div>
    </outSidebox>
  </div>
</template>

<script>
import outSidebox from "@/components/campComponents/outSidebox";
import { getDashboardOption } from "./echartOption";
import environment from "./environment";
export default {
  props: ["value", "desc", "environmentOptions", "selEnvironmentData"],
  data() {
    return {
      selectDevide: null
    };
  },
  watch: {
    environmentOptions: {
      handler(val, oldVal) {
        if (val && val.length > 0) {
          this.selectDevide = this.environmentOptions[0].resId;
        } else {
          this.selectDevide = null;
        }
      },
      deep: true //true 深度监听
    },
    selectDevide(val, oldVal) {
      if (val) {
        this.$emit("changeEnvironment", val);
      }
    },
    selEnvironmentData: {
      handler(val, oldVal) {
        if (val) {
          this.$refs.environment.assignment(
            val.property.temperature,
            val.property.humidity
          );
        }
      },
      deep: true //true 深度监听
    }
  },
  components: {
    outSidebox,
    environment
  },
  methods: {
    changeSelected(id) {
      this.selectDevide = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.environmentalCom {
  height: 100%;
  width: 100%;
  color: #fff;
  .environmentalContent {
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
      .content {
        height: 100%;
        width: 100%;
        .icon {
          color: #409eff;
          font-size: 17px;
          margin-right: 5px;
        }
        ul {
          width: 100%;
          // background-color: hsla(0, 0%, 91%, 0.1);
          list-style-type: none;
          text-align: left;
          margin: 0;
          margin-left: -40px;
          font-size: 14px !important;
          li:not(:last-child) {
            margin-bottom: 10px;
          }
        }
        .showPiechart {
          height: 400px;
          width: 100%;
        }
      }
      .emptyData {
        // height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #c0c4cc;
        font-size: 14px;
        display: flex;
        margin-top: 40%;

        // margin-top: 40%;
      }
    }
  }
}
</style>
<style lang="scss">
.environmentalCom {
  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-card {
    .el-card__body {
      width: 100%;
      height: 100%;
      ul {
        height: 100%;
        width: 100%;
        overflow: auto;
      }
      .emptyData {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
