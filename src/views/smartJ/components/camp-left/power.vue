<template>
  <div class="power-box">
    <span>智能电力</span>
    <div class="state">发电配电状态：<span>智能发电</span></div>
    <el-card class="power-generation">
      <div slot="header" class="clearfix ">
        发电配电情况
      </div>

      <ul>
        <li>发电机组：<span>大泽动力汽油发电机</span></li>
        <li>配电区域：<span>办公室、训练区</span></li>
        <li>发电功率：<span>50kw</span></li>
      </ul>
    </el-card>

    <el-card class="power-generation">
      <span class="p-title">用电情况：</span>
      <el-select
        v-model="currentQuarter"
        value-key="id"
        placeholder="请选择"
        size="mini"
        style="width:40%"
      >
        <el-option
          v-for="item in electricityDataList"
          :key="item.id"
          :label="item.name"
          :value="item"
        >
        </el-option>
      </el-select>
      <div class="power-consumption" id="power-consumption"></div>
    </el-card>
  </div>
</template>

<script>
// import axios from '../../assets/api/axios';
// import api from "../../assets/api/api";
import { getElectricityOptions } from "./echartOption";
export default {
  // name: "index",
  props: ["electricityDataList"],
  data() {
    return {
      currentQuarter: {},
      myChart: null
      //  options: [{
      //     value: '第一季度',
      //     label: ''
      //     }],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      this.myChart = this.$echarts.init(
        document.getElementById("power-consumption")
      );
      this.myChart.setOption({
        ...getElectricityOptions()
      });
    }
  },
  watch: {
    electricityDataList(newValue, oldValue) {
      if (newValue) {
        this.currentQuarter = newValue[0];
      }
    },
    currentQuarter(newValue, oldValue) {
      if (newValue.xList) {
        this.myChart.setOption({
          ...getElectricityOptions(newValue.xList, newValue.yList)
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.power-box {
  .state {
    margin: 10px 26px;
    font-size: 14px;
    text-align: left;
    //    color:#0CD3DB;
    //    color:#056085;
  }
  width: 100%;
  height: 100%;
  background: url(" ../../../../assets/smartJ-img/borders.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 20px;
  color: #fff;
  .power-generation {
    width: 100%;
    .power-consumption {
      width: 100%;
      height: 120px;
      margin: 0 auto;
      text-align: center;
    }
    width: 90%;
    font-size: 14px;
    margin: 0 auto;
    margin-bottom: 10px;
    ul {
      width: 100%;
      list-style-type: none;
      text-align: left;
      margin: 0;
      margin-left: -40px;
      li:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
.power-box {
  .el-card__header {
    padding-top: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #455a64;
  }
  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-select .el-input .el-select__caret {
    color: #fff;
  }
}
</style>
