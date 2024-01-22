<template>
  <div id="map">
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import api from "../../../assets/api/api";
import PublicMethod from "../../../util/PublicMethod";

export default {
  name: "search-map",
  // props: ["mapData"],
  props: {
    mapData: {
      type: Object,
      request: true
    }
  },
  data() {
    return {
      map: null,
      views: null,
      geometryLayer: null,
      moveLayer: null,
      options: api.api.optionsUrl,
      timer: null
    };
  },
  created() {
    this.createQuery();
  },
  // watch: {
  //   lineData: {
  //     handel(val) {
  //       console.log(val, "------------");
  //       this.showMap({ type: "MultiLineString", data: val });
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    createQuery() {
      let that = this;
      loadModules(
        ["esri/Map", "esri/views/SceneView", "esri/layers/GraphicsLayer"],
        this.options
      )
        .then(([Map, SceneView, GraphicsLayer]) => {
          that.map = new Map({
            basemap: "hybrid"
          });

          // 视图创建
          that.views = new SceneView({
            container: "viewDiv",
            center: [114.5, 32.15], //香港
            scale: 5000000,
            map: that.map
          });

          //去除地图小图标
          that.views.ui.components = [];

          //添加图层
          that.geometryLayer = new GraphicsLayer();
          that.map.add(that.geometryLayer);
          that.moveLayer = new GraphicsLayer();
          that.map.add(that.moveLayer);
          // 地图上点的点击事件
          that.views.on("click", function(event) {
            that.mapClick(event);
          });
          //地图上的点加载
          that.views.when(
            function() {
              // This function will execute once the promise is
              that.dataHandle(that.mapData);
              // that.moveTime();
              that.$emit("mapOk");
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
      // console.log(event);
      let that = this;
      event.stopPropagation();
      this.views.hitTest(event).then(response => {
        if (response.results.length !== 0) {
          let nameObj = {},
            str = "",
            attribute = response.results[0].graphic.attributes;
          if (attribute["type"] === "MultiPolygon") {
            //点击地图跳转对应营区页面
            this.$router.push({
              path: "/Camp",
              query: { label: attribute.label }
            });
            this.$store.commit("setMenus", attribute.label);
            // console.log("地图点击", attribute.label);
            nameObj = {
              personnel: "滞留人数",
              Electricity: "用电情况",
              humidity: "湿度"
            };
          } else if (attribute["type"] === "Point") {
            nameObj = {
              temperature: "温度",
              pressure: "压力",
              oil_storage: "储油量"
            };
          }
          for (let i in nameObj) {
            str += nameObj[i] + ":" + attribute[i] + `</br>`;
          }
          // console.log(attribute);
          let obj = {
            id: "searchAround",
            title: attribute["label"],
            content: str,
            location: event.mapPoint,
            actions: [{ id: "measure-this", title: "搜周边" }]
          };
          that.views.popup.open(obj);
          that.views.popup.on("trigger-action", function(event) {
            // console.log(event);
            if (event.action.id === "measure-this") {
            }
          });
        }
      });
    },
    dataHandle(val) {
      let value = val;
      for (let i of value) {
        for (let j of i["children"]) {
          this.showMap(j);
        }
      }
    },
    showMap(value) {
      let that = this;
      if (that.geometryLayer) {
        that.geometryLayer.removeAll();
      }
      loadModules(["esri/Graphic", "dojo/domReady!"], this.options)
        .then(([Graphic]) => {
          let graphic = null;
          let path = value.data;
          let attributes = {};
          let graphicData = {};
          switch (value.type) {
            case "Point":
              attributes = {
                type: value.type,
                temperature: value.temperature,
                pressure: value.pressure,
                oil_storage: value.oil_storage
              };
              graphicData = that.newGeometry("point", path);
              graphicData["attributes"] = attributes;
              graphic = new Graphic(graphicData);
              break;
            case "MultiLineString":
              // console.log("polyline-----------");
              graphicData = that.newGeometry("polyline", path);
              graphicData["attributes"] = attributes;
              graphic = new Graphic(graphicData);
              let markerStart = new Graphic(
                PublicMethod.picMarker("战区发", path[0])
              );
              let markerEnd = new Graphic(
                PublicMethod.picMarker("战区收", path[path.length - 1])
              );
              that.geometryLayer.addMany([markerStart, markerEnd]);
              // let markerMiddle = new Graphic(
              //   PublicMethod.picMarker("快递", path[2])
              // );
              // marker = new Graphic(
              //   that.newGeometry("polyline", path.slice(0, 3), [103, 194, 58])
              // );

              break;
            case "MultiPolygon":
              attributes = {
                label: value.label,
                type: value.type,
                personnel: value.personnel,
                Electricity: value.Electricity,
                humidity: value.humidity,
                temperature: value.temperature
              };
              graphicData = that.newGeometry("polygon", path);
              graphicData["attributes"] = attributes;
              graphic = new Graphic(graphicData);
              break;
          }
          that.geometryLayer.add(graphic); //将图形添加到图层中
        })
        .catch(error => {
          //   console.log(error);
        });
    },
    newGeometry(shape, value, colorStr) {
      let color = colorStr || [226, 119, 40];
      let obj = {};
      switch (shape) {
        case "point":
          obj = {
            geometry: {
              type: "point",
              latitude: value[0],
              longitude: value[1]
            },
            symbol: {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: color,
              outline: {
                color: [255, 255, 255],
                width: 1
              },
              size: 7
            }
          };
          return obj;
          break;
        case "polyline":
          obj = {
            geometry: {
              type: "polyline", // autocasts as new Polyline()
              paths: value
            },
            symbol: {
              type: "simple-line", // autocasts as SimpleLineSymbol()
              color: color,
              width: 4
            }
          };
          return obj;
          break;
        case "polygon":
          obj = {
            geometry: {
              type: "polygon", // autocasts as new Polygon()
              rings: value
            },
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: color,
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 1
              }
            }
          };
          return obj;
          break;
      }
    },
    moveTime() {
      let that = this;
      if (this.timer) {
        clearInterval(this.timer);
      }
      let data = this.mapData[1]["children"];
      let i = 0,
        j = 0;
      that.moveFun(data[0], i);
      that.moveFun(data[1], j);
      this.timer = setInterval(function() {
        i++;
        j++;
        if (i > data[0].data.length) {
          i = 0;
          that.moveFun(data[0]);
        }
        if (j > data[1].data.length) {
          j = 0;
        }
        that.moveFun(data[0], i);
        that.moveFun(data[1], j);
      }, 50000);
    },
    moveFun(data, i) {
      let that = this;
      if (this.moveLayer) {
        this.moveLayer.removeAll();
      }
      loadModules(["esri/Graphic", "dojo/domReady!"], this.options).then(
        ([Graphic]) => {
          // console.log(data,data.data, i);
          let markerMiddle = new Graphic(
            PublicMethod.picMarker("快递", data.data[i])
          );
          let marker = new Graphic(
            that.newGeometry("polyline", data.data.slice(0, i + 1), [
              103,
              194,
              58
            ])
          );
          that.moveLayer.addMany([markerMiddle, marker]);
        }
      );
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="scss">
/*内网*/
@import url("https://js.arcgis.com/4.13/esri/themes/light/main.css");

#map {
  width: 100%;
  height: calc(100vh - 60px);
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  color: #fff;
}

#viewDiv {
  text-align: left;
  height: calc(100vh - 60px);
  width: 100%;
  padding: 0;
}
</style>
<style lang="scss"></style>
