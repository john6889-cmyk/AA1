<template>
  <div class="monitorCom">
    <div class="monitorInfo">
      <div slot="content" class="monitorContent">
        <div class="contentHearder">
          <i
            style="display: inline-block;height: 20px;
      width: 8px;
      background-color: #3ccafc;
      margin-right: 5px;"
          ></i>
          <span class="hearder-title">监控信息</span>
          <!-- <el-select
            v-model="selectDevide"
            placeholder="请选择"
            size="mini"
            style="width:40%"
          >
            <el-option
              v-for="item in cameraOptions"
              :key="item.resId"
              :value="item.resId"
              :label="item.equipmentName"
            >
            </el-option>
          </el-select> -->
        </div>
        <div
          class="bottom-bd"
          ref="contentBd"
          v-if="cameraList && cameraList.length > 0"
        >
          <div
            v-for="(item, index) in cameraList"
            :key="index"
            class="content-bottom"
          >
            <div class="content-bd">
              <ul class="content-top">
                <li>
                  <i class="icon iconfont">&#xe67d;</i>IP：
                  <span>{{ item.ip || "-" }} </span>
                </li>
              </ul>
              <el-card class="content-bottom">
                <watermelonPlayCom :playUrl="item.url"></watermelonPlayCom>
                <!-- <div class="video-box" id="video-box" playUrl="item.url"></div> -->
                <!-- <video id="viedo2" controls autoplay class="video-box">
              <source
                class="source-box"
                :src="selCameraData.url"
                type="video/mp4"
              />
            </video> -->
              </el-card>
            </div>
          </div>
        </div>
        <div class="bottom-bd emptyMonitor" ref="contentBd" v-else>
          暂无设备
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import outSidebox from "@/components/campComponents/outSidebox";
// import volume from "xgplayer/dist/controls/volume";
// import playbackRate from "xgplayer/dist/controls/playbackRate";
import "xgplayer";
import FlvJsPlayer from "xgplayer-flv.js";
import watermelonPlayCom from "../components/watermelonPlayCom.vue";
// import "./.xgplayer/skin/index.js";
export default {
  props: {
    // cameraOptions: {
    //   type: Array
    // },
    // selCameraData: {
    //   type: Object
    // },
    cameraList: {
      type: Array
    }
  },
  data() {
    return {
      selectDevide: null,
      monitorUrl: null,
      playerInstance: null
    };
  },
  watch: {
    // cameraOptions: {
    //   handler(val, oldVal) {
    //     if (val) {
    //       this.selectDevide = this.cameraOptions[0].resId;
    //     }
    //   },
    //   deep: true //true 深度监听
    // },
    // selectDevide(val, oldVal) {
    //   if (val) {
    //     this.$emit("changeMonitor", val);
    //   }
    // },
    // selCameraData: {
    //   handler(val, oldVal) {
    //     if (val) {
    //       if (val.url) {
    //         this.monitorUrl = val.url;
    //         // console.log("播放url", this.monitorUrl);
    //         this.onVideo();
    //       }
    //     }
    //   }
    // }
  },
  components: {
    outSidebox,
    watermelonPlayCom
  },
  mounted() {
    this.initScroll();
  },
  methods: {
    initScroll() {
      this.$nextTick(() => {
        this.$refs.contentBd.scrollTop = 0;
      });
    },
    onVideo() {
      if (this.playerInstance) {
        // console.log("初始化视频", this.playerInstance.destroy);
        // console.log(this.playerInstance);
        this.playerInstance.destroy(true);
        this.playerInstance = null;
        // return;
      }
      this.playerInstance = new FlvJsPlayer({
        id: "video-box",
        url: this.monitorUrl,
        // controlPlugins: [volume, playbackRate],
        fluid: true,
        autoplay: true
        // volume: 0.6,
        // videoInit: true,
        // preloadTime: 30,
        // minCachedTime: 5,
        // cors: true
        // playbackRate: [0.5, 0.75, 1, 1.5, 2] //传入倍速可选数组
      });
    },
    changeSelected(id) {
      this.selectDevide = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.monitorCom {
  height: 100%;
  width: 100%;
  color: #fff;

  .monitorInfo {
    height: 100%;
    .monitorContent {
      width: 100%;
      height: 100%;

      // padding: 5px;
      // box-sizing: border-box;
      .contentHearder {
        margin: 15px 0;
        font-size: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;
        // background-color: pink;

        .hearder-title {
          margin-right: 15px;
          font-size: 16px;
          font-weight: 600;
          // color: #3ccafc;
        }
      }
      .emptyMonitor {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        background-color: rgba(6, 23, 64, 0.8);
      }

      .bottom-bd {
        height: calc(100% - 30px);
        overflow: auto;
        .content-bottom {
          .content-bd {
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            border-radius: 4px;
            background-color: rgba(6, 23, 64, 0.8);
            margin-bottom: 14px;
            .icon {
              color: #409eff;
              font-size: 17px;
              margin-right: 5px;
            }
            .content-top {
              width: 100%;
              flex: 1;
              list-style-type: none;
              text-align: left;
              margin: 0;
              margin-left: -40px;
              margin-bottom: 20px;
              font-size: 14px !important;
              li:not(:last-child) {
                margin-bottom: 10px;
              }
            }
            .content-bottom {
              flex: 2;
              height: 0;
              width: 100%;
              display: flex;
              align-items: stretch;
              .video-box {
                height: 100%;
                width: 100%;
              }
              .source-box {
                height: 100%;
                width: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.monitorCom {
  .el-input__inner {
    background: url("../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-card__body {
    height: 100%;
    width: 100%;
    padding: 0;
  }
  .el-card {
    border: 0;
  }
}
</style>
