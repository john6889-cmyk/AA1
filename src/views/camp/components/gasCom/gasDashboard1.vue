<template>
  <div class="gasDashboardCom" ref="gasDashboardCom"></div>
</template>

<script>
export default {
  data() {
    return {
      mychart: null
    };
  },
  mounted() {
    this.gasParameter();
  },
  methods: {
    gasParameter() {
      this.mychart = this.$echarts.init(this.$refs.gasDashboardCom);
      window.addEventListener("resize", () => {
        this.mychart.resize();
      });
      var dataArr = 44;
      var colorSet = {
        color: "#468EFD"
      };
      let option = {
        // backgroundColor: "#0E1327",
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },

        series: [
          {
            name: "外部线",
            type: "gauge",
            radius: "65%", // 动态
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              lineStyle: {
                color: [
                  [1, "#31F3FF"] // 动态
                ],
                width: 1
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
            detail: {
              show: false
            },
            title: {
              //标题
              show: false
            }
          },
          {
            name: "外部刻度",
            type: "gauge",
            radius: "75%",
            min: 0, //最小刻度
            max: 100, //最大刻度
            splitNumber: 10, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: false,
              lineStyle: {
                color: [[1, "rgba(0,0,0,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: "#31F3FF",
              fontSize: 20, // 动态
              distance: -20 // 动态
            }, //刻度标签。
            axisTick: {
              show: false
            }, //刻度样式
            splitLine: {
              show: false
            }
          },
          {
            name: "内部宽线条",
            type: "gauge",
            radius: "50%",
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              lineStyle: {
                color: [[1, "#122B3C"]],
                width: 40
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
            detail: {
              show: false
            },
            title: {
              show: false
            }
          },
          {
            name: "内部细线条",
            type: "gauge",
            radius: "40%",
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              lineStyle: {
                color: [[1, "#122B3C"]],
                width: 3
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
            detail: {
              show: false
            },
            title: {
              show: false
            }
          },
          {
            name: "间隔条形",
            type: "gauge",
            radius: "50%",
            z: 4,
            splitNumber: 10,
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: true,
              length: 20,
              splitNumber: 1,
              lineStyle: {
                color: "#122B3C",
                width: 0.8
              }
            },
            splitLine: {
              show: false
            },
            detail: {
              show: false
            },
            title: {
              show: false
            }
          },
          {
            name: "数据",
            type: "gauge",
            radius: "52.5%",
            z: 3,
            startAngle: 225,
            max: 100,
            endAngle: -45,
            axisLine: {
              lineStyle: {
                color: [
                  [dataArr / 100, "#31F3FF"], // 动态
                  [1, "#185363"]
                ],
                width: 20
              }
            },
            tooltip: {
              show: false
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
            detail: {
              show: true,
              fontWeight: "bold",
              fontSize: 22
            },
            pointer: {
              show: true,
              width: 3
            },
            data: [
              {
                name: "",
                value: dataArr
              }
            ]
          },
          // 内圆
          {
            name: "内圆环",
            type: "pie",
            radius: ["4%", "3%"],
            hoverAnimation: false,
            tooltip: {
              show: false
            },
            cursor: "default",
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              color: "#122B3C"
            },
            animation: false,
            data: [1]
          },
          // 内圆
          {
            name: "内圆环2",
            type: "pie",
            radius: "2%",
            hoverAnimation: false,
            cursor: "default",
            tooltip: {
              show: false
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              color: "#31F3FF"
            },
            animation: false,
            data: [1]
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
