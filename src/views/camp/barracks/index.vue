<template>
    <div class="barracks">
        <div class="barracks-map">
            <mapPage @mapClick="mapClick" :barracksMapData="barracksMapData">
            </mapPage>
        </div>
        <div class="changePageBtn"></div>
        <div class="map-left">
            <!-- 人体传感器 -->
            <accessControl class="accessControl" :smartLockOptions="humanBodySensor" @changeSmartLock="changeSmartLock" @onChangeLockStatus="changeSmartLock" :selSmartLockData="humidResults" ref="smartLockCom"></accessControl>
            <!-- 天燃气报警传感器管理 -->
            <ventilation class="ventilation" :windowOpenerOptions="naturalGas" :selVentilationData="gasResults" @changeVentilation="changeVentilation" @onChangeStatus="changeVentilation" ref="ventilationCom"></ventilation>
            <!-- 灯光管理 -->
            <lightUnits class="lightUnits" :lightOptions="lightOptions" @changeLightUnits="changeLightUnits" @onChangeStatus="onChangeStatus" :selLightData="selLightData" ref="lightUnitsCom"></lightUnits>
        </div>
        <div class="map-content">
            <!-- <div class="back-button" @click="onBackPage">返回</div> -->
        </div>
        <div class="map-right">
            <!-- 环境检测 -->
            <environmental class="environmental" :temperaAndHumiData="temperaAndHumiData" :humid="humid" @changeEnvironment="changeEnvironment"></environmental>
            <!-- 摄像头监视开窗器管理 -->
            <openDoorControl class="openDoorControl" ref="openDoorControl"></openDoorControl>
            <!-- 智能插座管理 暖风机 -->
            <socketControl class="socketControl" :smartLockOptions="smartSockets" @changeSmartLock="smartSocket" @onChangeSmartStatus="onChangeSmartStatus" :selSmartLockData="smartResults" ref="socketControl"></socketControl>
        </div>
    </div>
</template>

<script>
// 地图子组件
import mapPage from "../barracks/components/map-page";
// 环境检测
import environmental from "../components/environmental";
// 通风设备管理
import ventilation from "../barracks/components/ventilation";
// 灯光管理
import lightUnits from "../barracks/components/lightUnits";
// 监控信息
import monitor from "../barracks/components/monitor";
// 门禁系统
import accessControl from "../barracks/components/accessControl";
// 开窗器管理
import openDoorControl from "../barracks/components/openDoorControl";
// 智能插座管理
import socketControl from "../barracks/components/socketControl";
import {
    buildingDeviceList,
    cameraDeviceList,
    getSelDeviceDataById,
    controlResById,
    controlPlugById,
    getTemperaAndHumi
} from "@/service/camp/index.js";
export default {
    //营房
    name: "barracks",
    data() {
        return {
            campName: this.$route.query.label || "",
            buildingName: "仓库",
            barracksMapData: [],
            smartLockOptions: [],
            doorSensorOptions: [],
            windowOpenerOptions: [],
            environmentOptions: [],
            cameraOptions: [],
            selSmartLockData: {},
            selVentilationData: {},
            selLightData: {},
            selEnvironmentData: {
                name: "",
                vendor: "",
                property: {
                    temperature: "",
                    humidity: "",
                    light: "",
                    air_quality: "",
                    noise: ""
                }
            },
            selCameraData: {},
            // 所有的灯设备
            lightOptions: [],
            // 所有的人体传感器设备
            humanBodySensor: [],
            // 天燃气报警设备
            naturalGas: [],
            // 温湿传感器设备
            humid: [],
            // 智能插座设备
            smartSockets: [],
            // 灯状态查询结果
            lightResults: {},
            // 天燃气状态查询结果
            gasResults: {},
            // 人体传感器状态查询结果
            humidResults: {},
            // 温湿传感器查询结果
            temperaAndHumiData: {},
            // 智能插座查询结果
            smartResults: {},
            // 环境检测定时器
            timer: null
        };
    },
    components: {
        mapPage,
        environmental,
        ventilation,
        lightUnits,
        // printer,
        monitor,
        accessControl,
        openDoorControl,
        socketControl
    },
    mounted() {
        this.getBuildingDeviceList();
    },
    methods: {
        // 智能插座控制
        onChangeSmartStatus(id, command) {
          controlPlugById(id, command).then(res => {
                setTimeout(() => {
                    if (res.statusCode == 200) {
                        this.smartSocket(id);
                        this.$refs.socketControl.closeBtnLoading();
                        this.$message.success(res.message);
                    } else {
                        this.smartSocket(id);
                        this.$refs.socketControl.closeBtnLoading();
                        this.$message({
                            showClose: true,
                            message: res.message,
                            type: "warning",
                            duration: 5000
                        });
                    }
                }, 1500);
            });
        },
        // 灯光控制
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
        },
        // 地图点击事件
        mapClick(val) {
            if (val.type == "camera") {
                this.changeMonitor(val.resId);
                this.$refs.monitorCom.changeSelected(val.resId);
            } else if (val.type == "smartLock") {
                this.changeSmartLock(val.resId);
                this.$refs.smartLockCom.changeSelected(val.resId);
            } else if (val.type == "doorSensor") {
                this.changeSmartLock(val.resId);
                this.$refs.smartLockCom.changeSelected(val.resId);
            } else if (val.type == "windowOpener") {
                this.changeVentilation(val.resId);
                this.$refs.ventilationCom.changeSelected(val.resId);
            } else if (val.type == "light") {
                this.changeLightUnits(val.resId);
                this.$refs.lightUnitsCom.changeSelected(val.resId);
            } else {
                this.changeEnvironment(val.resId);
                this.$refs.environmentalCom.changeSelected(val.resId);
            }
        },
        // 返回上一页
        onBackPage() {
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
                    this.barracksMapData = res.data.data; //办公楼地图数据
                    // 过滤所有的灯设备
                    this.lightOptions = this.barracksMapData.filter((val, index) => {
                        return val.type == "light";
                    });
                    // 过滤所有的人体传感器设备
                    this.humanBodySensor = this.barracksMapData.filter((val, index) => {
                        return val.type == "人体传感器";
                    });
                    // 过滤所有的天燃气设备
                    this.naturalGas = this.barracksMapData.filter((val, index) => {
                        return val.type == "天然气报警器";
                    });
                    // 过滤所有的温湿传感器设备
                    this.humid = this.barracksMapData.filter((val, index) => {
                        return val.type == "温湿传感器";
                    });
                    // 过滤所有的智能插座设备
                    this.smartSockets = this.barracksMapData.filter((val, index) => {
                        return val.type == "插座";
                    });
                }
            });
        },
        //通过id查询智能插座状态
        smartSocket(id, bool) {
            getSelDeviceDataById(id)
                .then(res => {
                    if (res.statusCode == 200) {
                        this.smartResults = res.data;
                        console.log(this.smartResults);
                        if (bool) {
                            this.$message.success("状态已更新!");
                            this.$refs.smartLockCom.loading = false;
                        }
                    }
                })
                .catch(err => {
                    this.$refs.smartLockCom.loading = false;
                });
        },
        //通过id查询人体传感器
        changeSmartLock(id, bool) {
            getSelDeviceDataById(id)
                .then(res => {
                    if (res.statusCode == 200) {
                        this.humidResults = res.data;
                        if (bool) {
                            this.$message.success(this.humidResults.property.message);
                            this.$refs.smartLockCom.loading = false;
                        }
                    }
                })
                .catch(err => {
                    this.$refs.smartLockCom.loading = false;
                });
        },
        //通过id查看天燃气报警传感器
        changeVentilation(id, bool) {
            getSelDeviceDataById(id).then(res => {
                if (res.statusCode == 200) {
                    this.gasResults = res.data;
                    if (bool) {
                        this.$message.success(
                            `当前天燃气浓度为: ${this.gasResults.property.density}%`
                        );
                        this.$refs.ventilationCom.loading = false;
                    }
                }
            });
        },
        //查灯光
        changeLightUnits(id) {
            getSelDeviceDataById(id).then(res => {
                if (res.statusCode == 200) {
                    this.selLightData = res.data;
                }
            });
        },
        //查温湿
        changeEnvironment(id) {
            getSelDeviceDataById(id).then(res => {
                if (res.statusCode == 200) {
                    this.temperaAndHumiData = res.data;
                }
            });
            if (this.timer) {
                clearInterval(this.timer);
            } else {
                this.timer = setInterval(() => {
                    getSelDeviceDataById(id).then(res => {
                        if (res.statusCode == 200) {
                            this.temperaAndHumiData = res.data;
                        }
                    });
                }, 30000);
            }
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

        onChangeLockStatus(id, command) {}
    }
};
</script>

<style lang="scss" scoped>
.barracks {
    position: relative;
    .barracks-map {}
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
            cursor: pointer; // background-color: pink;
        }
    }
    .map-right {
        position: absolute;
        right: 0;
        top: 0;
        height: calc(100% - 30px);
        width: 18%; // border: 1px solid #000;
        display: flex;
        flex-direction: column;
        margin: 15px; // background-color: skyblue;
        .environmental {
            flex: 1;
            margin-bottom: 10px;
        }
        .openDoorControl {
            flex: 1;
            margin-bottom: 10px;
        }
        .socketControl {
            flex: 1;
        }
    }
}
</style>

<style lang="scss">
.barracks {
    .el-card {
        border: 0;
        background-color: rgba(6, 23, 64, 0.8); // background-color: hsla(0, 0%, 91%, 0.1);
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
