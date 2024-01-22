<template>
  <div class="barracks">
    <div class="barracks-map">
      <mapPage @mapClick="mapClick" :storehouseMapData="storehouseMapData">
      </mapPage>
    </div>
    <div class="changePageBtn"></div>
    <div class="map-left">
      <alarmSystem
        class="accessControl"
        :alarmDeviceOptions="alarmDeviceOptions"
        @changeAlarmSystem="changeAlarmSystem"
        :selAlarmSystemData="selAlarmSystemData"
        ref="accessControlCom"
      ></alarmSystem>
      <environmental
        class="environmental"
        :environmentOptions="environmentOptions"
        @changeEnvironment="changeEnvironment"
        :selEnvironmentData="selEnvironmentData"
        ref="environmentalCom"
      ></environmental>
    </div>
    <div class="map-content">
      <div class="back-button" @click="onBackPage">返回</div>
    </div>
    <div class="map-right">
      <!-- 灯光管理 -->
      <lightUnits
        class="lightUnits"
        :lightOptions="lightOptions"
        @changeLightUnits="changeLightUnits"
        @onChangeStatus="onChangeStatus"
        :selLightData="selLightData"
        ref="lightUnitsCom"
      ></lightUnits>
      <monitor
        class="monitor"
        :cameraOptions="cameraOptions"
        @changeMonitor="changeMonitor"
        :selCameraData="selCameraData"
        ref="monitorCom"
      ></monitor>
    </div>
  </div>
</template>

<script>
import mapPage from "../storehouse/components/map-page";
import environmental from "../storehouse/components/environmental";
import lightUnits from "../storehouse/components/lightUnits";
import monitor from "../storehouse/components/monitor";
import alarmSystem from "../storehouse/components/alarmSystem";
import {
  buildingDeviceList,
  cameraDeviceList,
  getSelDeviceDataById,
  controlResById
} from "@/service/camp/index.js";
export default {
  //仓库
  name: "storehouse",
  components: {
    mapPage,
    environmental,
    // ventilation,
    lightUnits,
    // printer,
    monitor,
    alarmSystem
  },
  data() {
    return {
      // campName: "营区A",
      campName: this.$route.query.label || "",
      buildingName: "仓库",
      storehouseMapData: [],
      alarmDeviceOptions: [],
      environmentOptions: [],
      lightOptions: [],
      cameraOptions: [],
      selAlarmSystemData: {},
      selEnvironmentData: {},
      selLightData: {},
      selCameraData: {}
    };
  },
  mounted() {
    this.getBuildingDeviceList();
  },
  methods: {
    mapClick(val) {
      if (val.type == "camera") {
        this.changeMonitor(val.resId);
        this.$refs.monitorCom.changeSelected(val.resId);
      } else if (val.type == "alarm") {
        this.changeAlarmSystem(val.resId);
        this.$refs.accessControlCom.changeSelected(val.resId);
      } else if (val.type == "environmentDetection") {
        this.changeEnvironment(val.resId);
        this.$refs.environmentalCom.changeSelected(val.resId);
      } else {
        this.changeLightUnits(val.resId);
        this.$refs.lightUnitsCom.changeSelected(val.resId);
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
        if (res.statusCode == 200) {
          this.storehouseMapData = res.data.data;
          this.alarmDeviceOptions = this.storehouseMapData.filter(
            (val, index) => {
              return val.type == "alarm";
            }
          );
          this.environmentOptions = this.storehouseMapData.filter(
            (val, index) => {
              return val.type == "environmentDetection";
            }
          );
          this.lightOptions = this.storehouseMapData.filter((val, index) => {
            return val.type == "light";
          });

          this.cameraOptions = this.storehouseMapData.filter((val, index) => {
            return val.type == "camera";
          });
        }
      });
    },
    //通过id查询报警系统
    changeAlarmSystem(id) {
      getSelDeviceDataById(id).then(res => {
        if (res.statusCode == 200) {
          this.selAlarmSystemData = res.data;
          // console.log(this.selAlarmSystemData, "报警系统");
        }
      });
    },
    //通过id查询环境检测设备
    changeEnvironment(id) {
      getSelDeviceDataById(id).then(res => {
        if (res.statusCode == 200) {
          this.selEnvironmentData = res.data;
          // console.log(res.data, "环境设备");
        }
      });
    },

    //查询灯光
    changeLightUnits(id) {
      getSelDeviceDataById(id).then(res => {
        if (res.statusCode == 200) {
          this.selLightData = res.data;
          // console.log(res.data, "灯光设备");
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
    onChangeStatus(id, command) {
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
    width: 18%;
    display: flex;
    flex-direction: column;
    margin: 15px;
    .accessControl {
      flex: 1;
    }
    .environmental {
      flex: 2;
      margin-top: 15px;
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
    display: flex;
    flex-direction: column;
    margin: 15px;
    .lightUnits {
      flex: 1;
      overflow: auto;
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
