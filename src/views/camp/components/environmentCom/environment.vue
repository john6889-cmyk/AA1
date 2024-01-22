<template>
  <div class="environment-box">
    <div class="environment-main">
      <!-- <div class="environment-title">
           <span class="p-title" style="font-size:16px">智慧环境</span>
           </div> -->
      <div style="margin-top:14px;">
        平均温度：<span style="display:inline-block;margin-right:24px;"
          >{{ temperature }}°C</span
        >
        平均湿度：<span>{{ humidity }}%</span>
      </div>
      <div class="environment-show">
        <div class="temperature" ref="temperature">
          <dashboard
            :value="temperature"
            desc="­°C"
            style="position:relative;bottom:8px;"
          >
          </dashboard>
          <span style="display:inline-block;position:relative;bottom:12px;"
            >温度</span
          >
        </div>
        <div class="humidity">
          <dashboard
            :value="humidity"
            desc="%"
            style="position:relative;bottom:8px;"
          ></dashboard>
          <span style="display:inline-block; position:relative;bottom:12px;"
            >湿度</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashboard from "./Dashboard";
export default {
  components: {
    dashboard
  },
  data() {
    return {
      temperature: "",
      humidity: ""
    };
  },
  mounted() {},
  methods: {
    changeTemperaAndHumi(t, h) {
      this.temperature = t;
      this.humidity = h;
    }
  }
};
</script>

<style scoped lang="scss">
.environment-box {
  //   background-color: hsla(0, 0%, 91%, 0.1);
  padding: 0px 4px 15px 4px;
  border-radius: 4px;
  margin-top: 14px;
  width: 100%;
  //   height: 100%;
  //   background: url(" ../../../../assets/smartJ-img/borders.png") no-repeat;
  background-size: 100% 100%;
  //   padding-top: 20px;
  color: #fff;

  .environment-main {
    width: 100%;
    font-size: 14px;
    .environment-title {
      margin: 10px 0;
    }
    .environment-show {
      width: 100%;
      height: 200px;
      display: flex;
      font-size: 14px;
      .temperature {
        flex: 1;
        text-align: center;
        margin: 0 auto;
      }
      .humidity {
        flex: 1;
      }
    }
  }
}
</style>
<style lang="scss"></style>
