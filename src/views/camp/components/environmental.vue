<template>
  <div class="environmentalCom">
    <outSidebox>
      <div slot="content" class="environmentalContent">
        <div class="contentHearder">
          <span class="hearder-title">环境检测</span>
        </div>
        <div class="content-bd">
          <environment ref="environment"></environment>
        </div>
      </div>
    </outSidebox>
  </div>
</template>

<script>
import outSidebox from "@/components/campComponents/outSidebox";
import { getDashboardOption } from "./environmentCom/echartOption";
import environment from "./environmentCom/environment";
export default {
  props: ["humid", "temperaAndHumiData"],
  data() {
    return {
      // terminal: "设备1",
    };
  },
  watch: {
    temperaAndHumiData: {
      handler(val, oldVal) {
        if (val) {
          this.$refs.environment.changeTemperaAndHumi(
            val.property.temperature,
            val.property.humidity
          );
        }
      },
      deep: true //true 深度监听
    },
    humid: {
      handler(val) {
        if (val) {
          this.$emit("changeEnvironment", val[0].resId);
        }
      },
      deep: true
    }
  },
  components: {
    outSidebox,
    environment
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
    .contentHearder {
      height: 50px;
      line-height: 50px;
      width: 100%;
      .hearder-title {
        margin-right: 15px;
        font-size: 16px;
      }
    }
    .content-bd {
      height: calc(100% - 50px);
      width: 100%;
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
      .showPiechart {
        height: 400px;
        width: 100%;
      }
    }
  }
}
</style>
<style lang="scss">
.environmentalCom {
  .el-input__inner {
    background: url("../../../assets/img/按钮.png") no-repeat;
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
    }
  }
}
</style>
