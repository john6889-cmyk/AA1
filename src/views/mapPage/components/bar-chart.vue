<template>
  <div ref="bar-chart" style="width: 100%;height: 100%;"></div>
</template>

<script>
export default {
  name: "bar-chart",
  mounted() {
    this.creatBarChart();
  },
  methods: {
    creatBarChart() {
      let barChart = this.$echarts.init(this.$refs["bar-chart"]);
      let option = {
        // backgroundColor: '#00265f',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          top: 40,
          right: 20,
          left: 40,
          bottom: 40
        },
        xAxis: [
          {
            type: "category",
            data: ["温度", "压力", "油量"],
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.12)"
              }
            },
            axisLabel: {
              margin: 10,
              color: "#e2e9ff",
              textStyle: {
                fontSize: 12
              }
            }
          }
        ],
        yAxis: [
          {
            name: "单位：%",
            axisLabel: {
              formatter: "{value}",
              color: "#e2e9ff"
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,1)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.12)"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: [300, 450, 479, 229, 210, 250, 120, 100],
            barWidth: "10px",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,244,255,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0,77,167,1)" // 100% 处的颜色
                    }
                  ],
                  false
                ),
                barBorderRadius: [30, 30, 30, 30],
                shadowColor: "rgba(0,160,221,1)",
                shadowBlur: 4
              }
            }
          }
        ]
      };
      barChart.setOption(option);
    }
  }
};
</script>

<style scoped></style>
