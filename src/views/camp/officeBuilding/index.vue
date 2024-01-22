<template>
  <div class="officeBuilding">
    <div class="officeBuilding-map">
      <mapPage @mapClick="mapClick" :officeMapData="officeMapData"> </mapPage>
    </div>
    <div class="changePageBtn">
      <!-- <el-button type="primary" size="mini">营房</el-button>
      <el-button type="primary" size="mini">仓库</el-button>
      <el-button type="primary" size="mini">办公楼</el-button> -->
      <!-- <el-page-header @back="goBack" content="详情页面"> </el-page-header> -->
    </div>
    <div class="map-left">
      <conferenceTerminal
        class="conferenceTerminal"
        :conferenceDeviceOptions="conferenceDeviceOptions"
        :selTerminalData="selTerminalData"
        @changeTerminal="changeTerminal"
        ref="conferenceTerminalCom"
      ></conferenceTerminal>
      <ventilation
        class="ventilation"
        :windowOpenerOptions="windowOpenerOptions"
        :selVentilationData="selVentilationData"
        @changeVentilation="changeVentilation"
        @onChangeStatus="onChangeStatus"
        ref="ventilationCom"
      ></ventilation>
      <lightUnits
        class="lightUnits"
        :lightOptions="lightOptions"
        :selLightData="selLightData"
        @changeLightUnits="changeLightUnits"
        @onChangeLightStatus="onChangeLightStatus"
        ref="lightUnitsCom"
      ></lightUnits>
    </div>
    <div class="map-content">
      <div class="back-button" @click="onBackPage">返回</div>
    </div>
    <div class="map-right">
      <printer
        class="printer"
        :printerOptions="printerOptions"
        :selPrinterData="selPrinterData"
        @changePrinter="changePrinter"
        ref="printerCom"
      ></printer>
      <monitor
        class="monitor"
        :cameraOptions="cameraOptions"
        :selCameraData="selCameraData"
        @changeMonitor="changeMonitor"
        ref="monitorCom"
      ></monitor>
    </div>
  </div>
</template>

<script>
import mapPage from "../officeBuilding/components/map-page";
import conferenceTerminal from "../officeBuilding/components/conferenceTerminal";
import ventilation from "../officeBuilding/components/ventilation";
import lightUnits from "../officeBuilding/components/lightUnits";
import printer from "../officeBuilding/components/printer";
import monitor from "../officeBuilding/components/monitor";
import {
  buildingDeviceList,
  cameraDeviceList,
  getSelDeviceDataById,
  controlResById
} from "@/service/camp/index.js";
export default {
  //  办公楼
  name: "officeBuilding",
  data() {
    return {
      // campName: "营区A",
      campName: this.$route.query.label || "",
      buildingName: "办公室",
      officeMapData: [],
      conferenceDeviceOptions: [],
      windowOpenerOptions: [],
      lightOptions: [],
      printerOptions: [],
      cameraOptions: [],
      selCameraData: {
        // brand: "",
        // data: [],
        // equipmentName: " ",
        // ip: " ",
        // model: " ",
        // resId: null,
        // type: "",
        // url: ""
      },
      selTerminalData: {
        // id: null,
        // name: "",
        // property: {
        //   status: false
        // },
        // resId: null,
        // vendor: " "
      },
      selVentilationData: {
        // id: null,
        // name: "",
        // property: {
        //   status: true
        // },
        // resId: null,
        // vendor: ""
      },
      selLightData: {},
      selPrinterData: {}
    };
  },
  components: {
    mapPage,
    conferenceTerminal,
    ventilation,
    lightUnits,
    printer,
    monitor
  },
  mounted() {
    this.getBuildingDeviceList();
    this.getCameraDeviceList();
  },
  methods: {
    mapClick(val) {
      // console.log("父亲", val);
      if (val.type == "camera") {
        this.changeMonitor(val.resId);
        this.$refs.monitorCom.changeSelected(val.resId);
      } else if (val.type == "conferenceTerminal") {
        this.changeTerminal(val.resId);
        this.$refs.conferenceTerminalCom.changeSelected(val.resId);
      } else if (val.type == "windowOpener") {
        this.changeVentilation(val.resId);
        this.$refs.ventilationCom.changeSelected(val.resId);
      } else if (val.type == "light") {
        this.changeLightUnits(val.resId);
        this.$refs.lightUnitsCom.changeSelected(val.resId);
      } else {
        this.changePrinter(val.resId);
        this.$refs.printerCom.changeSelected(val.resId);
      }
    },
    onBackPage() {
      // this.$router.push("/Camp");
      this.$router.push({
        path: "/Camp",
        query: { label: this.campName }
      });
    },

    //获取地图设备用于打点及分类下拉项
    getBuildingDeviceList() {
      buildingDeviceList(this.campName, this.buildingName).then(res => {
        // console.log(res.data, "办公楼数据");
        if (res.statusCode == 200) {
          this.officeMapData = res.data.data; //办公楼地图数据
          this.conferenceDeviceOptions = this.officeMapData.filter(
            (val, index) => {
              return val.type == "conferenceTerminal";
            }
          );
          this.windowOpenerOptions = this.officeMapData.filter((val, index) => {
            return val.type == "windowOpener";
          });
          this.lightOptions = this.officeMapData.filter((val, index) => {
            return val.type == "light";
          });
          this.printerOptions = this.officeMapData.filter((val, index) => {
            return val.type == "printer";
          });

          this.cameraOptions = this.officeMapData.filter((val, index) => {
            return val.type == "camera";
          });
        }
      });
    },

    getCameraDeviceList() {},
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
    //通过id查会议终端
    changeTerminal(id) {
      getSelDeviceDataById(id).then(res => {
        if (res.statusCode == 200) {
          this.selTerminalData = res.data;
          // console.log(this.selTerminalData, "会议终端单个信息");
        }
      });
    },
    //通过id查看通风设备
    changeVentilation(id) {
      getSelDeviceDataById(id).then(res => {
        if (res.statusCode == 200) {
          // console.log(res.data, "通风设备单个信息");
          this.selVentilationData = res.data;
        }
      });
    },
    //查灯光
    changeLightUnits(id) {
      getSelDeviceDataById(id).then(res => {
        if (res.statusCode == 200) {
          this.selLightData = res.data;
          // console.log(res.data, "灯光设备");
        }
      });
    },
    //查打印机
    changePrinter(id) {
      getSelDeviceDataById(id).then(res => {
        if (res.statusCode == 200) {
          // console.log(res.data, "打印机单个信息");
          this.selPrinterData = res.data;
        }
      });
    },
    onChangeStatus(id, command) {
      controlResById(id, command).then(res => {
        if (res.statusCode == 200) {
          this.changeVentilation(id);
          this.$refs.ventilationCom.closeBtnLoading();
          this.$message.success(res.message);
        } else {
          this.changeVentilation(id);
          this.$refs.ventilationCom.closeBtnLoading();
          this.$message({
            showClose: true,
            message: res.message,
            type: "warning",
            duration: 5000
          });
        }
      });
    },
    onChangeLightStatus(id, command) {
      controlResById(id, command).then(res => {
        setTimeout(() => {
          if (res.statusCode == 200) {
            this.changeLightUnits(id);
            this.$refs.lightUnitsCom.closeBtnLoading();
            this.$message.success(res.message);
          } else {
            this.changeLightUnits(id);
            this.$refs.lightUnitsCom.closeBtnLoading();
            this.$message({
              showClose: true,
              message: res.message,
              type: "warning",
              duration: 5000
            });
          }
        }, 1500);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.officeBuilding {
  position: relative;
  .officeBuilding-map {
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
    width: 18%;
    display: flex;
    flex-direction: column;
    margin: 15px;
    .conferenceTerminal {
      flex: 1;
    }
    .ventilation {
      flex: 1;
      margin: 15px 0;
    }
    .lightUnits {
      flex: 1;
    }
  }
  .map-content {
    position: absolute;
    top: 15px;
    left: 20%;
    .back-button {
      color: #fff;
      width: 86px;
      height: 27px;
      font-size: 14px;
      line-height: 27px;
      background: url("../../../assets/img/按钮.png") no-repeat;
      background-size: cover;
      cursor: pointer;
      // background-color: pink;
    }
  }
  .map-right {
    position: absolute;
    right: 0;
    top: 0;
    height: calc(100% - 30px);
    width: 18%;
    // border: 1px solid #000;
    display: flex;
    flex-direction: column;
    margin: 15px;
    // background-color: skyblue;
    .printer {
      flex: 1;
    }
    .monitor {
      flex: 2;
      margin-top: 15px;
    }
  }
}
</style>
<style lang="scss">
.officeBuilding {
  .el-card {
    border: 0;
    background-color: rgba(6, 23, 64, 0.8);
    // background-color: hsla(0, 0%, 91%, 0.1);
    // background-color: #061740;
    color: #fff;
  }
  ul {
    width: 100%;
    list-style-type: none;
    margin-left: -40px;
  }
}
</style>
