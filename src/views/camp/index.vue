<template>
  <div class="barracks">
    <div class="barracks-map">
      <mapPage @mapClick="mapClick" :campMapData="campMapData"> </mapPage>
    </div>
    <div class="map-left" v-if="gasValveOptions.length != 0">
      <gas
        class="gas"
        :gasValveOptions="gasValveOptions"
        @changeGasValve="changeGasValve"
        :selGasValveData="selGasValveData"
        :gasFlowList="gasFlowList"
        @onChangeStatus="onChangeStatus"
        :soketGasDeviceData="soketGasDeviceData"
        ref="gasCom"
      ></gas>
      <!-- <alarmSystem class="accessControl"></alarmSystem>
      <lightUnits class="lightUnits"></lightUnits> -->
    </div>
    <div class="map-content">
      <div
        v-for="(item, index) in showBtnList"
        :key="index"
        style="display:inline-block;"
      >
        <div class="changePageBtn" @click="goChangePage(item.name)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="map-right">
      <!-- <environmental
        class="environmental"
        :temperaAndHumiData="temperaAndHumiData"
      ></environmental>
      <monitor
        class="monitor"
        :cameraOptions="cameraOptions"
        @changeMonitor="changeMonitor"
        :selCameraData="selCameraData"
        ref="monitorCom"
      ></monitor> -->
    </div>
  </div>
</template>

<script>
import mapPage from "../camp/components/map-page.vue";
import environmental from "../camp/components/environmental";
import monitor from "../camp/components/monitor";
import gas from "../camp/components/gas.vue";
import { soketUrl } from "@/service/request";
import Stomp from "stompjs";
import {
  buildingDeviceList,
  cameraDeviceList,
  getSelDeviceDataById,
  getGasFlowData,
  getTemperaAndHumi,
  controlResById,
  getBtnList
} from "@/service/camp/index.js";
export default {
  //营区
  name: "camp",
  data() {
    return {
      campName: "营区A",
      // campName: this.$route.query.label || "",
      buildingName: "",
      campMapData: [],
      cameraOptions: [],
      gasValveOptions: [],
      selCameraData: {},
      selGasValveData: {},
      gasFlowList: [],
      temperaAndHumiData: {},
      stompClientSubInstance: null,
      soketGasDeviceData: {},
      showBtnList: [] //显示按钮列表（营区B目前没办公楼）
    };
  },
  components: {
    mapPage,
    environmental,
    gas,
    // ventilation,
    // printer,
    monitor
  },
  watch: {
    ["$route.query.label"](val) {
      this.campName = val;
      if (val) {
        this.getBuildingDeviceList();
        this.temperaAndHumi();
        this.initWebSocket();
        this.btnList(); //获取营区按钮列表
      }
    }
  },
  mounted() {
    this.getBuildingDeviceList();
    this.temperaAndHumi();
    // this.initWebSocket();
    this.btnList(); //获取营区按钮列表
    console.log(4654654);
  },
  methods: {
    initWebSocket() {
      this.stompClient = Stomp.client(soketUrl);
      this.stompClient.heartbeat.outgoing = 20000;
      this.stompClient.debug = null;
      this.stompClient.heartbeat.incoming = 0;
      this.stompClient.connect({}, frame => {
        //订阅实时流量
        // this.stompClient.subscribe("/getStatusByResId", data => {
        //   console.log(JSON.parse(data.body), "websoket传输");
        // });
        // setTimeout(() => {
        //   this.stompClient.send("13");
        // }, 1000);
      });
    },

    mapClick(val) {
      if (val.type == "camera") {
        this.changeMonitor(val.resId);
        this.$refs.monitorCom.changeSelected(val.resId);
      } else {
        this.changeGasValve(val.resId);
        this.$refs.gasCom.changeSelected(val.resId);
      }
    },

    goChangePage(name) {
      (name = "营房"), (this.campName = "营区A");
      // console.log(name, "点击");
      if (name == "营区物流") {
        this.$router.push({
          path: "/"
        });
        this.$store.commit("setMenus", "logistics");
      } else if (name == "办公楼") {
        this.$router.push({
          path: "/OfficeBuilding",
          query: { label: this.campName }
        });
      } else if (name == "营房") {
        this.$router.push({
          path: "/Barracks",
          query: { label: this.campName }
        });
      } else {
        this.$router.push({
          path: "/Storehouse",
          query: { label: this.campName }
        });
      }
      this.$store.commit("setMenus", this.campName);
    },
    //获取按钮列表
    btnList() {
      getBtnList(this.campName).then(res => {
        if (res.statusCode == 200) {
          // this.showBtnList = res.data.btnList;
          this.showBtnList = [];
        }
      });
    },
    getBuildingDeviceList() {
      // const reqData = {
      //   ...this.campName
      // };
      buildingDeviceList(this.campName, this.buildingName).then(res => {
        if (res.statusCode == 200) {
          this.campMapData = res.data.data;
          this.cameraOptions = this.campMapData.filter((val, index) => {
            return val.type == "camera";
          });
          this.gasValveOptions = this.campMapData.filter((val, index) => {
            return val.type == "pressureValve" || val.type == "leakageValve";
          });
        }
      });
    },

    temperaAndHumi() {
      getTemperaAndHumi(this.campName).then(res => {
        if (res.statusCode == 200) {
          this.temperaAndHumiData = res.data;
        }
      });
    },
    //查摄像头
    changeMonitor(id) {
      cameraDeviceList(this.campName, this.buildingName).then(res => {
        if (res.statusCode == 200) {
          let newArr = res.data.data.filter(item => {
            return item.resId == id;
          });
          this.selCameraData = newArr[0];
        }
      });
    },

    changeGasValve(id) {
      getSelDeviceDataById(id).then(res => {
        if (res.statusCode == 200) {
          this.selGasValveData = res.data;
        }
      });

      getGasFlowData(id).then(res => {
        if (res.statusCode == 200) {
          this.gasFlowList = res.data.flowList;
          // console.log(this.gasFlowList, "燃气历史流量");
        }
      });
    },

    //查阀门
    // changeGasValve(id) {
    //   // setTimeout(() => {
    //   //   this.stompClient.send("/getStatusByResId", {}, JSON.stringify([id]));
    //   // }, 2000);
    //   // this.stompClient.unsubscribe();
    //   if (this.stompClientSubInstance) {
    //     this.stompClientSubInstance.unsubscribe();
    //     this.stompClientSubInstance = null;
    //   }
    //   if (this.stompClient && this.stompClient.ws.readyState == 1) {
    //     // console.log("test");
    //     this.stompClientSubInstance = this.stompClient.subscribe(
    //       "/topic/" + id,
    //       data => {
    //         this.soketGasDeviceData = JSON.parse(data.body);
    //       }
    //     );
    //     this.stompClient.send("/test/" + id, {}, "");
    //   }

    //   getSelDeviceDataById(id).then(res => {
    //     if (res.statusCode == 200) {
    //       this.selGasValveData = res.data;
    //       console.log(this.selGasValveData, "单个阀门");
    //     }
    //   });

    //   getGasFlowData(id).then(res => {
    //     if (res.statusCode == 200) {
    //       this.gasFlowList = res.data.flowList;
    //       // console.log(this.gasFlowList, "燃气历史流量");
    //     }
    //   });
    // },

    //手动控制阀门
    onChangeStatus(id, command) {
      controlResById(id, command).then(res => {
        if (res.statusCode == 200) {
          this.changeGasValve(id);
          this.$refs.gasCom.closeBtnLoading();
          this.$message.success(res.message);
        } else {
          this.changeGasValve(id);
          this.$refs.gasCom.closeBtnLoading();
          this.$message({
            showClose: true,
            message: res.message,
            type: "warning",
            duration: 5000
          });
          // this.$message.warning(res.message);
        }
      });
    }
  },
  destroyed() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
};
</script>

<style lang="scss" scoped>
.barracks {
  position: relative;
  .barracks-map {
  }
  // .changePageBtn {
  //   width: 18%;
  //   height: 40px;
  //   line-height: 40px;
  //   position: absolute;
  //   left: -50px;
  //   top: 0;
  // }
  .map-left {
    position: absolute;
    left: 0;
    top: 0;
    height: calc(100% - 30px);
    width: 20%;
    display: flex;
    flex-direction: column;
    margin: 15px;
    .gas {
      height: 100%;
      width: 100%;
    }
  }
  .map-content {
    position: absolute;
    top: 15px;
    left: 22%;
    .changePageBtn {
      display: inline-block;
      color: #fff;
      width: 86px;
      height: 27px;
      font-size: 14px;
      line-height: 27px;
      background: url("../../assets/img/按钮.png") no-repeat;
      background-size: cover;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .map-right {
    position: absolute;
    right: 0;
    top: 0;
    height: calc(100% - 30px);
    width: 20%;
    display: flex;
    flex-direction: column;
    margin: 15px;
    box-sizing: border-box;

    .environmental {
      flex: 1;
      // margin-top: 15px;
    }
    .monitor {
      flex: 2;
      margin-top: 15px;
    }
  }
}
</style>
<style lang="scss">
.barracks {
  .el-card {
    border: 0;
    background-color: rgba(6, 23, 64, 0.8);
    // background-color: hsla(0, 0%, 91%, 0.1);
    color: #fff;
  }
  ul {
    width: 100%;
    list-style-type: none;
    margin-left: -40px;
  }
}
</style>
