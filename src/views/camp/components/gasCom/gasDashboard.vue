<template>
  <div class="gasDashboardCom" ref="gasDashboardCom"></div>
</template>

<script>
export default {
  data() {
    return {
      mychart: null,
      dashboardTitle: "",
      dashboardData: "0",
      unit: ""
    };
  },
  mounted() {
    this.gasParameter();
  },
  methods: {
    changeDashData(t, d, u) {
      this.dashboardTitle = t;
      this.dashboardData = d;
      this.unit = u;
      console.log("------------子儿子", this.dashboardData, this.unit);
      this.gasParameter();
    },
    gasParameter() {
      this.mychart = this.$echarts.init(this.$refs.gasDashboardCom);
      window.addEventListener("resize", () => {
        this.mychart.resize();
      });
      var targetValue = 200;
      var realValue = 88;
      var data = {
        title: "仪表盘",
        value: ((100 * realValue) / targetValue).toFixed(2)
        // color: {
        //     pieMini: '#ffca1c', //小圆形颜色
        //     pieMiniMini: '#fff', //小小圆形颜色
        //     piePlus: '#5DD1FA', //大圆形颜色
        //     value: '#687284', //底部数值颜色
        // },
      };

      let option = {
        title: [
          {
            text: this.dashboardTitle,
            top: "98%",
            left: "41%",
            padding: [-30, 0],
            textStyle: {
              color: "#fff",
              fontSize: 14,
              align: "center",
              fontWeight: "400"
            }
          }
        ],
        // backgroundColor: "#062a44",
        series: [
          {
            name: "刻度1",
            type: "gauge",
            center: ["50%", "50%"],
            radius: "62%",
            min: 0, //最小刻度
            max: 100, //最大刻度
            splitNumber: 10, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, "#42B3D0"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: "#42B3D0",
              distance: 25,
              fontSize: 10,
              formatter: function(v) {
                switch (v + "") {
                  case "0":
                    return "0";
                  case "10":
                    return "10";
                  case "20":
                    return "20";
                  case "30":
                    return "30";
                  case "40":
                    return "40";
                  case "50":
                    return "50";
                  case "60":
                    return "60";
                  case "70":
                    return "70";
                  case "80":
                    return "80";
                  case "90":
                    return "90";
                  case "100":
                    return "100";
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {
                color: "#42B3D0", //用颜色渐变函数不起作用
                width: 1
              },
              length: -8
            }, //刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: "#01B661" //用颜色渐变函数不起作用
              }
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {
            name: "仪表盘2",
            type: "gauge",
            center: ["50%", "50%"],
            radius: "38%",
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [
                  [this.dashboardData / 100, "#42B3D0"],
                  [1, "#111F42"]
                ],
                width: 6
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            itemStyle: {
              show: false
            },
            detail: {
              formatter: value => {
                if (value !== 0) {
                  // var num = Math.round(value);
                  // console.log("this.unit", this.unit);
                  // return parseInt(num).toFixed(0) + "%";
                  return Number(value).toFixed(2) + this.unit;
                } else {
                  return 0;
                }
              },
              offsetCenter: [0, "120%"],
              textStyle: {
                padding: [0, 0, 80, 0],
                fontSize: 12,
                fontWeight: "700",
                color: "#fff"
              }
            },
            title: {
              color: "#fff",
              fontSize: 8,
              offsetCenter: [0, "-25%"]
            },
            data: [
              {
                // "name": "目标值："+targetValue+"万吨",
                // value: 60
                value: this.dashboardData
              }
            ],
            pointer: {
              show: false,
              length: "75%",
              width: 20 //指针粗细
            }
          }
        ]
      };
      this.mychart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.gasDashboardCom {
  height: 100%;
  width: 100%;
}
</style>
