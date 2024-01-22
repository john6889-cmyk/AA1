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
      <div class="leftTop">
        <div class="title">智慧营区</div>
        <div class="operation">
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
        <div class="content">
          <div class="detial">滞留人数: {{ currentArea.personnel }}</div>
          <div class="detial">用电情况: {{ currentArea.Electricity }}</div>
          <div class="detial">湿度:{{ currentArea.humidity }}</div>
          <div class="graph">
            <Dashboard
              :value="currentArea.humidity"
              name="湿度"
              style="width: 49%;margin-right: 2%"
            ></Dashboard>
            <Dashboard
              :value="currentArea.temperature"
              name="温度"
              style="width: 49%;"
            ></Dashboard>
          </div>
        </div>
      </div>
      <div class="leftBottom">
        <div class="title">储油系统</div>
        <div class="operation" style="margin-bottom: 16px">
          <span class="statistics">共4个储油系统</span>
          <el-select
            v-model="selectValueOil"
            placeholder="请选择"
            size="mini"
            class="operationRight"
            @change="oilChange"
          >
            <el-option
              v-for="item in selectOptionsOil"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="content">
          <div class="graph">
            <polo-chart :value="oilArr"></polo-chart>
          </div>
        </div>
      </div>
    </div>
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
        <div class="detial">订单编号：{{ currentLogistics.order_number }}</div>
        <div class="detial">发件人：{{ currentLogistics.send_people }}</div>
        <div class="detial">物流内容：{{ currentLogistics.content }}</div>
        <div class="detial">当前位置：{{ current_location }}</div>
        <div class="detial">
          预计收货时间：{{ currentLogistics.e_receiving_time }}
        </div>
        <div class="logistics">
          <span class="iconClass"></span>
          <span>物流详情信息</span>
        </div>
        <div class="logistics-ditali">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :color="activity.color"
              :hide-timestamp="false"
            >
              <div
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
              </div>
              <el-card>
                <div>{{ activity.content }}</div>
                <div>{{ activity.timestamp }}</div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapPage from "./components/map-page";
import axios from "../../assets/api/axios";
import api from "../../assets/api/api";
import Dashboard from "./components/Dashboard";
import barChart from "./components/bar-chart";
import poloChart from "./components/polo";
import {
  logisticsOptions,
  orderDetailInfo
} from "@/service/logistics/index.js";
export default {
  name: "index",
  components: {
    mapPage,
    Dashboard,
    barChart,
    poloChart
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      mapData: {},
      selectOptionsArea: [
        {
          value: "智慧军营1",
          label: "智慧军营1"
        },
        {
          value: "智慧军营2",
          label: "智慧军营2"
        },
        {
          value: "智慧军营3",
          label: "智慧军营3"
        }
      ],
      selectValueArea: "智慧军营1",
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
      // selectOptionsLogistics: [],
      selectOptionsLogistics: [
        {
          value: "J民融合JSH物流1",
          label: "264873246732"
        },
        {
          value: "J民融合JSH物流2",
          label: "264156412151"
        }
      ],
      selectValueLogistics: "",
      activitiesAll: [],
      activities: [],
      timer: null,
      areaAll: [],
      currentArea: {},
      oilAll: [],
      currentOil: {},
      logisticsAll: [],
      currentLogistics: {},
      current_location: ""
    };
  },
  created() {
    this.getData();
    this.getlogisticsOptions();
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
  methods: {
    getlogisticsOptions() {
      logisticsOptions().then(res => {
        if (res.statusCode == 200) {
          this.selectOptionsLogistics = res.data.orderList;
          console.log("物流数据", this.selectOptionsLogistics);
          // this.selectValueLogistics = this.selectOptionsLogistics[0].value;
        }
      });
    },

    getData() {
      let that = this;
      axios.get(api.api.getMapData).then(res => {
        this.mapData = res.data.data || {};
        this.areaAll = res.data.dataList[0];
        this.currentArea = res.data.dataList[0]["智慧军营1"];
        this.oilAll = res.data.dataList[2];
        this.currentOil = res.data.dataList[2]["J民融合J油工程1"];
        this.logisticsAll = res.data.dataList[1];
        this.currentLogistics = res.data.dataList[1]["J民融合JSH物流1"];
        this.activitiesAll =
          res.data.dataList[1]["J民融合JSH物流1"]["activitiesAll"];
        this.activitieData();
      });
    },

    activitieData() {
      let i = 1;
      let that = this;
      if (this.timer) {
        clearInterval(this.timer);
      }
      that.activities = that.activitiesAll.slice(0, i);
      that.current_location =
        that.activities[that.activities.length - 1].content;
      this.timer = setInterval(function() {
        if (i > that.activitiesAll.length) {
          i = 1;
        }
        i++;
        that.activities = that.activitiesAll.slice(0, i - 1);
        let obj = JSON.parse(JSON.stringify(that.activitiesAll[i - 1]));
        obj["icon"] = "el-icon-truck";
        that.activities.push(obj);
        that.current_location = obj.content;
      }, 50000);
    },
    areaChange(value) {
      this.currentArea = this.areaAll[value];
    },
    oilChange(value) {
      this.currentOil = this.oilAll[value];
    },
    //
    logisticsChange() {},
    // logisticsChange(value) {
    //   this.currentLogistics = this.logisticsAll[value];
    //   this.activitiesAll = this.logisticsAll[value]["activitiesAll"];
    //   this.activitieData();
    // },
    mapOk() {}
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped></style>
