<template>
  <div class="camp">
    <!-- <div class="title">智慧营区</div> -->
    <!-- 中间的地图区域 -->

    <div class="map">
      <mapPage @mapClick="mapClick"> </mapPage>
    </div>

    <div class="camp-left">
      <div class="title">智慧军营</div>
      <passPage
        class="pass"
        :passDataList="passData"
        :realTime="realTimeData"
      ></passPage>
      <powerPage
        class="power"
        :electricityDataList="electricityData"
      ></powerPage>
    </div>

    <div class="camp-right">
      <environmentPage class="environment"></environmentPage>
      <monitorPage
        class="monitor"
        :videoDataList="VideoData"
        ref="monitorPage"
      ></monitorPage>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
//智慧营区主页
import apiCamp from "../../assets/api/smartJ";

import mapPage from "./components/map-page";
import passPage from "./components/camp-left/pass";
import powerPage from "./components/camp-left/power";

import environmentPage from "./components/camp-right/environment";
import monitorPage from "./components/camp-right/monitor";
export default {
  name: "index",
  components: {
    mapPage,
    passPage,
    powerPage,
    environmentPage,
    monitorPage
  },
  data() {
    return {
      passData: "",
      realTimeData: [],
      electricityData: [],
      VideoData: []
    };
  },
  created() {
    this.getPass();
    this.getRealTime();
    this.getElectricity();
    this.getVideo();
  },
  methods: {
    //地图点击
    mapClick(val) {
      // console.log(val);
      var currentVideo = this.VideoData.find(function(item, index) {
        return item.id == val.id;
      });
      // console.log(currentVideo);
      this.$refs.monitorPage.currentVideo = currentVideo;
      // console.log(this.$refs.monitorPage.currentVideo=val)
      // console.log(val)
    },
    //获取出入口
    getPass() {
      this.$axios.get(apiCamp.getPassData).then(res => {
        this.passData = res.data.data;
      });
    },
    //实时信息
    getRealTime() {
      this.$axios.get(apiCamp.getRealTimeData).then(res => {
        let arr = res.data.data;
        this.realTimeChange(arr);
      });
    },

    realTimeChange(arr) {
      var timer = setInterval(() => {
        var index = Math.floor(Math.random() * arr.length);
        arr[index].realTime = dayjs().format("MM-DD HH:mm:ss");
        this.realTimeData = arr[index];
      }, 2000);
    },

    //各楼宇用电情况
    getElectricity() {
      this.$axios.get(apiCamp.getElectricityData).then(res => {
        // console.log(res.data)
        this.electricityData = res.data.data;
      });
    },

    //干湿度

    //视频资源
    getVideo() {
      this.$axios.get(apiCamp.getMonitoringData).then(res => {
        // console.log(res.data);
        this.VideoData = res.data.data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.camp {
  position: relative;
  background: url("../../assets/smartJ-img/bg.jpg");
  background-size: cover;
  .camp-left {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    left: 0;
    width: 20%;
    height: calc(100vh - 60px);
    margin-left: 10px;
    margin-right: 10px;
    .title {
      color: #fff;
      font-size: 18px;
      margin: 10px 0;
      text-align: left;
      margin-left: 50px;
    }
    .pass {
      width: 98%;
      height: 37.4%;
      margin-bottom: 14px;
    }
    .power {
      width: 98%;
      height: 50%;
    }
  }
  .map {
    flex: 3;
  }
  .camp-right {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 20%;
    height: calc(100vh - 60px);
    margin-top: 40px;
    margin-right: 10px;
    margin-left: 10px;
    .environment {
      width: 98%;
      height: 35%;
      margin-bottom: 14px;
    }
    .monitor {
      width: 98%;
      height: 52%;
    }
  }
}
</style>
<style lang="scss">
.camp {
  .el-card {
    border: 0;
    background-color: hsla(0, 0%, 91%, 0.1);
    // background-color: #061740;
    color: #fff;
  }
}
</style>
