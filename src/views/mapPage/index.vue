<template>
  <div id="homePage">
    <map-page :mapData="mapData" @mapOk="mapOk"></map-page>
    <div class="contentList">
      <div class="showIcon">
        <span>物流车：</span>
        <img src="../../assets/img/快递.png" alt="" />
        <span>战区：</span>
        <img src="../../assets/img/战区.png" alt="" />
        <span>智慧营区：</span>
        <div class="smart"></div>
      </div>

      <div class="left">
        <div class="title">智慧营区</div>
        <div class="camp-operation">
          <span class="statistics">共3个智慧营区</span>
          <el-select
            v-model="selectValueArea"
            placeholder="请选择"
            size="mini"
            class="operationRight"
            @change="areaChange"
          >
            <el-option
              v-for="item in selectOptionsArea"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="camp-content">
          <div
            style="margin: 10px 0;font-size:16px; font-weight: 600;display:flex; justify-content:flex-start;align-items:center;  argin-bottom:15px;"
          >
            <i
              style=" display: inline-block;height: 20px; width: 8px;background-color: #3ccafc;margin-right: 5px;"
            ></i>
            <span>
              温湿度
            </span>
          </div>
          <!-- <div class="detial">滞留人数: {{ currentArea.personnel }}</div>
          <div class="detial">用电情况: {{ currentArea.Electricity }}</div>
          <div class="detial">湿度:{{ currentArea.humidity }}</div> -->
          <div class="detial">
            平均温度：{{ campTemperaAndHumi.temperature }}­°C
          </div>
          <div class="detial">平均湿度：{{ campTemperaAndHumi.humidity }}%</div>
          <div class="graph" style="flex-direction: column;">
            <div class="humiture">
              <Dashboard
                :value="campTemperaAndHumi.humidity"
                unit="%"
                name="湿度"
                style="width: 49%;margin-right: 4%;height:100%;"
              ></Dashboard>
              <Dashboard
                :value="campTemperaAndHumi.temperature"
                unit="­°C"
                name="温度"
                style="width: 49%;"
              ></Dashboard>
            </div>

            <monitor :cameraList="cameraList" class="camera-com"> </monitor>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧物流 -->
    <div class="rightContent">
      <div class="title">物流信息</div>
      <div class="operation">
        <span class="statistics">共2个物流信息</span>
        <el-select
          v-model="selectValueLogistics"
          placeholder="请选择"
          size="mini"
          class="operationRight"
          @change="logisticsChange"
        >
          <el-option
            v-for="item in selectOptionsLogistics"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="content">
        <div class="detial">订单编号：{{ currentLogistics.id }}</div>
        <div class="detial">发件人：{{ currentLogistics.senderName }}</div>
        <div class="detial">发件人电话：{{ currentLogistics.senderPhone }}</div>
        <div class="detial">收件人：{{ currentLogistics.userName }}</div>
        <div class="detial">收件人电话：{{ currentLogistics.userPhone }}</div>
        <!-- <div class="detial">当前位置：{{ current_location }}</div>
        <div class="detial">
          预计收货时间：{{ currentLogistics.e_receiving_time }}
        </div> -->
        <div class="logistics" style="margin-top:15px;">
          <span class="iconClass"></span>
          <span>物流详情信息</span>
        </div>
        <div class="logistics-ditali">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :hide-timestamp="false"
            >
              <!-- <div
                slot="dot"
                v-if="activity.icon === 'el-icon-truck'"
                class="dot-style"
              >
                <span class="icon iconfont iconClass">&#xe602;</span>
              </div>
              <div
                slot="dot"
                v-if="activity.content === '已下单'"
                class="dot-style"
              >
                <span class="icon iconfont">&#xe60c;</span>
              </div> -->
              <el-card>
                <div>{{ activity.content }}</div>
                <div>{{ activity.timestamp }}</div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>

        <div class="QR-code">
          <!-- <img :src="this.qrCodeImg" alt="" class="qrCodeImg" /> -->
          <span
            class="iconfont"
            style="font-size:4vw;color:rgba(64,158,255,0.8);"
            @click="onGetQrCode"
            >&#xe7b5;</span
          >
          <br />
          <i class="icon iconfont" style="color:#DCDFE6;">&#xe600;</i>
          <span style="font-size:12px; color:#DCDFE6;">点击获取二维码</span>
        </div>
      </div>
    </div>
    <qrCodeDialog ref="qrCodeDialog"></qrCodeDialog>
  </div>
</template>

<script>
import mapPage from "./components/map-page"; //地图
import axios from "../../assets/api/axios";
import api from "../../assets/api/api";
import Dashboard from "./components/Dashboard";
import barChart from "./components/bar-chart";
import poloChart from "./components/polo";
import qrCodeDialog from "./components/qrCodeDialog";
import monitor from "./components/monitor"; //视频
import {
  logisticsOptions,
  orderDetailInfo,
  campList,
  getTemperaAndHumi,
  cameraDeviceList
} from "@/service/logistics/index.js";
export default {
  name: "index",
  components: {
    mapPage,
    Dashboard,
    barChart,
    poloChart,
    qrCodeDialog,
    monitor
  },
  data() {
    return {
      reverse: true,
      defaultProps: {
        children: "children",
        label: "label"
      },
      mapData: [],
      selectOptionsArea: [
        // {
        //   value: "营区A",
        //   label: "营区A"
        // },
        // {
        //   value: "智慧军营2",
        //   label: "智慧军营2"
        // },
        // {
        //   value: "智慧军营3",
        //   label: "智慧军营3"
        // }
      ],
      selectValueArea: "",
      selectOptionsOil: [
        {
          value: "J民融合J油工程1",
          label: "J民融合J油工程1"
        },
        {
          value: "J民融合J油工程2",
          label: "J民融合J油工程2"
        },
        {
          value: "J民融合J油工程3",
          label: "J民融合J油工程3"
        },
        {
          value: "J民融合J油工程4",
          label: "J民融合J油工程4"
        }
      ],
      selectValueOil: "J民融合J油工程1",

      // selectOptionsLogistics: [
      //   {
      //     value: "J民融合JSH物流1",
      //     label: "264873246732"
      //   },
      //   {
      //     value: "J民融合JSH物流2",
      //     label: "264156412151"
      //   }
      // ],
      selectOptionsLogistics: [],
      selectValueLogistics: "",
      activitiesAll: [],
      activities: [],
      timer: null,
      areaAll: [],
      currentArea: {}, //董当前区域的温湿度(暂时废弃)
      campTemperaAndHumi: {},
      oilAll: [],
      currentOil: {},
      logisticsAll: [],
      currentLogistics: {},
      current_location: "",
      qrCodeImg: "",
      cameraList: [] //摄像头信息
    };
  },
  created() {
    this.getData();
    this.getlogisticsOptions();
    this.getCampList();
  },
  computed: {
    oilArr() {
      let oilAll = {};
      oilAll["temperature"] = this.currentOil["temperature"];
      oilAll["pressure"] = this.currentOil["pressure"];
      oilAll["oil_storage"] = this.currentOil["oil_storage"];
      return oilAll;
    }
  },
  watch: {
    selectValueLogistics(val, oldVal) {
      if (val) {
        this.getLogisticsInfo();
      }
    },
    selectOptionsArea: {
      handler(val, oldval) {
        if (val) {
          this.selectValueArea = this.selectOptionsArea[0].value;
        }
        // if (val && this.$route.query.label == "") {
        //   this.selectValueArea = this.selectOptionsArea[0].value;
        // } else if (val && this.$route.query.label == "营区A") {
        //   this.selectValueArea = this.selectOptionsArea[0].value;
        // }
      },
      deep: true
    },
    selectValueArea(val, oldVal) {
      if (val) {
        this.temperaAndHumi();
        this.getCameraDeviceList("营区A");
        //让后端修改格式
        // console.log("智慧营区选择", val);
      }
    }
  },
  methods: {
    getCameraDeviceList(val) {
      cameraDeviceList(val).then(res => {
        if (res.statusCode == 200) {
          this.cameraList = res.data.data;
        }
      });
    },
    //获取营区温湿度
    temperaAndHumi() {
      getTemperaAndHumi(this.selectValueArea).then(res => {
        if (res.statusCode == 200) {
          this.campTemperaAndHumi = res.data;
        }
      });
    },

    //获取营区下拉列表
    getCampList() {
      campList().then(res => {
        if (res.statusCode == 200) {
          this.selectOptionsArea = res.data.campList;
        }
      });
    },
    onGetQrCode() {
      this.$refs.qrCodeDialog.openDialog(this.qrCodeImg);
    },
    //获取物流编号options
    getlogisticsOptions() {
      logisticsOptions().then(res => {
        if (res.statusCode == 200) {
          this.selectOptionsLogistics = res.data.orderList;
          this.selectValueLogistics = this.selectOptionsLogistics[0].value;
        }
      });
    },

    //通过物流编号获取物流信息
    getLogisticsInfo() {
      orderDetailInfo(this.selectValueLogistics).then(res => {
        if (res.statusCode == 200) {
          this.currentLogistics = res.data;
          this.activities = res.data.activitiesAll;
          this.qrCodeImg =
            "data:image/png;base64," + this.currentLogistics.qrCode;
        }
      });
    },

    getData() {
      let that = this;
      axios.get(api.api.getMapData).then(res => {
        //营区地图上的绘制
        this.mapData = res.data.data;
        //储油（暂时废弃）
        this.oilAll = res.data.dataList[2];
        this.currentOil = res.data.dataList[2]["J民融合J油工程1"];
        this.logisticsAll = res.data.dataList[1];
        this.activitieData();
      });
    },
    activitieData() {},
    areaChange() {},
    oilChange(value) {
      this.currentOil = this.oilAll[value];
    },
    // logisticsChange(val) {
    //   this.currentLogistics = this.logisticsAll[value];
    // },
    logisticsChange(value) {
      this.activitiesAll = this.logisticsAll[value]["activitiesAll"];
      this.activitieData();
    },
    mapOk() {}
  },

  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="scss">
.left {
  background-color: #fff;
  background: url("../../assets/smartJ-img/borders.png") no-repeat;
  background-size: 100% 100%;
  width: 23vw;
  height: calc(100% - 100px);

  margin-top: 10px;
  margin-bottom: 20px;
  padding: 0 30px;
  box-sizing: border-box;
  .title {
    color: #fff;
    margin-top: 15px;
  }

  .camp-operation {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-around;
  }
  .camp-content {
    color: #fff;
    height: calc(100% - 90px);
  }
  .graph {
    height: calc(100% - 120px);
    .humiture {
      height: 140px;
      display: flex;
      margin-bottom: 5px;
    }
    .camera-com {
      height: calc(100% - 200px);
    }
  }
}

.rightContent {
  position: relative;
  .content {
    display: flex;
    flex-direction: column;
    height: calc(100% - 95px);
    .logistics-ditali {
      height: 100%;
      .el-timeline {
        // overflow: auto;
      }
    }
  }
  .QR-code {
    position: absolute;
    // width: 80px;
    // height: 80px;
    top: 15%;
    right: 10%;
    .qrCodeImg {
      // height: auto;
      // max-width: 100%;
      // max-height: 100%;
      // vertical-align: bottom;
      // bottom: 0;
      // -o-object-fit: fill;
      // object-fit: fill;
      // width: 100%;
      // height: 100%;
      object-fit: cover;
    }
  }
}
</style>
