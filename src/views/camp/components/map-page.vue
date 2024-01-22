<template>
  <!-- 页面中间的营区地图 -->
  <div id="viewDiv">
    <!-- <stars class="stars" style="color:#fff;">123</stars>   -->
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import api from "@/assets/api/api";
import axios from "@/assets/api/axios";
import PublicMethod from "@/util/PublicMethod";
// import stars from "../components/stars"

export default {
  name: "map-page",
  props: {
    campMapData: {
      type: Array
    }
  },
  data() {
    return {
      map: null,
      views: null,
      geometryLayer: null,
      options: api.api.optionsUrl
    };
  },
  mounted() {
    this.createQuery();
  },
  methods: {
    createQuery() {
      let that = this;
      loadModules(
        [
          "esri/Map",
          "esri/Basemap",
          "esri/layers/MapImageLayer",
          "esri/views/MapView"
        ],
        this.options
      )
        .then(([Map, Basemap, MapImageLayer, MapView]) => {
          var basemap = new Basemap({
            baseLayers: [
              new MapImageLayer({
                url:
                  "http://192.168.140.147:6080/arcgis/rest/services/yingqu/MapServer",
                title: "Basemap"
              })
            ],
            title: "basemap",
            id: "basemap"
          });
          that.map = new Map({
            basemap: basemap
          });

          // 视图创建
          that.views = new MapView({
            container: "viewDiv",
            map: that.map,
            zoom: 18
          });

          //去除地图小图标
          that.views.ui.components = [];
          // 地图上点的点击事件
          that.views.on("click", function(event) {
            console.log("点击", event);
            that.mapClick(event);
            // console.log(event, "点击");
          });

          //地图上的点加载
          that.views.when(
            function() {
              // This function will execute once the promise is
              that.getMapData();
            },
            function(error) {
              // This function will execute if the promise is rejected due to an error
            }
          );
        })
        .catch(error => {
          // console.log(error);
        });
    },
    /**
     * 地图点击
     */
    mapClick(event) {
      console.log("点击", event);
      let that = this;
      event.stopPropagation();
      this.views.hitTest(event).then(function(resp) {
        if (resp.results.length !== 0) {
          let value = resp.results[0].graphic.attributes;
          that.$emit("mapClick", value);
        }
      });
    },
    /**
     * 地图点请求
     * */
    getMapData() {
      let that = this;

      let dataArr = this.campMapData;
      dataArr.map(value => {
        that.markMap(value);
      });
      // axios.get(api.api.getMapData2).then(res => {
      //   // console.log(res.data.data);
      //   let dataArr = res.data.data;
      //   dataArr.map(value => {
      //     that.markMap(value);
      //   });
      // });
    },

    /**
     * 打点
     * */
    markMap(value) {
      let that = this;
      loadModules(["esri/Graphic"], this.options).then(([Graphic]) => {
        let graphicData = PublicMethod.picMarker(value.type, value.data);
        graphicData["attributes"]["type"] = value.type;
        graphicData["attributes"]["resId"] = value.resId;
        let markerStart = new Graphic(graphicData);
        that.views.graphics.add(markerStart);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/*内网*/
@import url("https://js.arcgis.com/4.13/esri/themes/light/main.css");
#viewDiv {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background-color: #000;
  /* background:url("../../../assets/smartJ-img/bg.jpg") no-repeat;
    background-size: 100%; */

  // .stars{
  //     height:100%;
  //     width:100%;
  //     // z-index: -99;
  //     position:relative;
  // }
}
</style>
