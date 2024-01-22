<template>
  <div ref="polo" style="width: 100%;height: 100%;"></div>
</template>

<script>
import "echarts-liquidfill";

export default {
  name: "polo",
  props: {
    value: {
      type: Object,
      request: true
    }
  },
  mounted() {
    // console.log(this.value);
    this.creatPolo();
  },
  watch: {
    value: {
      handler(val) {
        // console.log(val);
        this.creatPolo();
      },
      deep: true
    }
  },
  methods: {
    creatPolo() {
      let polo = this.$echarts.init(this.$refs.polo);
      let option = {
        backgroundColor: "#04184A",
        title: [
          {
            text: "温度",
            left: "16%",
            top: "9%",
            textAlign: "center",
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          },
          {
            text: "压力",
            left: "50%",
            top: "9%",
            textAlign: "center",
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          },
          {
            text: "储油量",
            left: "83%",
            top: "9%",
            textAlign: "center",
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          }
        ],

        series: [
          {
            type: "liquidFill",
            center: ["17%", "60%"],
            // 水球颜色
            color: ["#0B5E8B", "#227DB3", "#3F91CC"],
            data: [
              this.value.temperature / 100,
              (this.value.temperature - 10) / 100,
              (this.value.temperature - 5) / 100
            ],
            radius: "57%",
            label: {
              normal: {
                fontSize: 20
              }
            },
            // outline  外边
            outline: {
              borderDistance: 5,
              itemStyle: {
                borderWidth: 5,
                borderColor: "#00C0FF"
              }
            },
            // 内图 背景色 边
            backgroundStyle: {
              color: "rgba(0,37,83,0.8)"
            }
          },
          {
            type: "liquidFill",
            // 水球颜色
            color: ["#49d088", "#38b470", "#2aaf66"],
            center: ["50%", "60%"],
            data: [
              this.value.pressure / 100,
              (this.value.pressure - 10) / 100,
              (this.value.pressure - 5) / 100
            ],
            radius: "57%",
            label: {
              normal: {
                fontSize: 20
              }
            },
            // outline  外边
            outline: {
              borderDistance: 5,
              itemStyle: {
                borderWidth: 5,
                borderColor: "#00FFB0"
              }
            },
            // 内图 背景色 边
            backgroundStyle: {
              color: "rgba(0,37,83,0.8)"
            }
          },
          {
            type: "liquidFill",
            // 水球颜色
            color: ["#E3B340", "#F4B30E", "#EACE36"],
            center: ["83%", "60%"],
            data: [
              this.value.oil_storage / 100,
              (this.value.oil_storage - 10) / 100,
              (this.value.oil_storage - 5) / 100
            ],
            radius: "57%",
            label: {
              normal: {
                fontSize: 20
              }
            },
            // outline  外边
            outline: {
              borderDistance: 5,
              itemStyle: {
                borderWidth: 5,
                borderColor: "#FFBF11"
              }
            },
            // 内图 背景色 边
            backgroundStyle: {
              color: "rgba(0,37,83,0.8)"
            }
          }
        ]
      };
      polo.setOption(option);
    }
  }
};
</script>

<style scoped></style>
