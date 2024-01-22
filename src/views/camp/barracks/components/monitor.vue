<template>
  <div class="monitorCom">
    <outSidebox>
      <div slot="content" class="monitorContent">
        <div class="contentHearder">
          <span class="hearder-title">监控信息</span>
          <el-select
            v-model="selectDevide"
            placeholder="请选择"
            size="mini"
            style="width:40%"
            v-if="cameraOptions.length > 0"
          >
            <el-option
              v-for="item in cameraOptions"
              :key="item.resId"
              :value="item.resId"
              :label="item.equipmentName"
            >
            </el-option>
          </el-select>
        </div>
        <div class="content-bd" v-if="cameraOptions.length > 0">
          <ul class="content-top">
            <li>
              <i class="icon iconfont">&#xe65a;</i>大类：<span
                >视频监控系统</span
              >
            </li>
            <li>
              <i class="icon iconfont">&#xe649;</i>小类：<span>{{
                selCameraData.type || "-"
              }}</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe671;</i>品牌：<span>{{
                selCameraData.brand || "-"
              }}</span>
            </li>
            <li>
              <i class="icon iconfont">&#xe730;</i>型号：<span>{{
                selCameraData.model || "-"
              }}</span>
            </li>
            <!-- <li><i class="icon iconfont">&#xe637;</i>版本：<span>0.0</span></li> -->
            <li>
              <i class="icon iconfont">&#xe67d;</i>IP：<span>{{
                selCameraData.ip || "-"
              }}</span>
            </li>
            <!-- <li><i class="icon iconfont">&#xe66f;</i>端口：<span>80</span></li>
            <li>
              <i class="icon iconfont">&#xe6b2;</i>协议：<span>http</span>
            </li> -->
          </ul>
          <el-card class="content-bottom">
            <div class="video-box" id="video-box"></div>
          </el-card>
        </div>
        <div class="emptyData" v-else>暂无设备</div>
      </div>
    </outSidebox>
  </div>
</template>

<script>
import outSidebox from "@/components/campComponents/outSidebox";
import volume from "xgplayer/dist/controls/volume";
import playbackRate from "xgplayer/dist/controls/playbackRate";
import "xgplayer";
import FlvJsPlayer from "xgplayer-flv.js";
export default {
  props: {
    cameraOptions: {
      type: Array
    },
    selCameraData: {
      type: Object
    }
  },
  data() {
    return {
      selectDevide: null,
      monitorUrl: null
    };
  },
  components: {
    outSidebox
  },
  watch: {
    cameraOptions: {
      handler(val, oldVal) {
        if (val && val.length > 0) {
          this.selectDevide = this.cameraOptions[0].resId;
        } else {
          this.selectDevide = null;
        }
      },
      deep: true //true 深度监听
    },
    selectDevide(val, oldVal) {
      if (val) {
        this.$emit("changeMonitor", val);
      }
    },
    selCameraData: {
      handler(val, oldVal) {
        if (val) {
          if (val.url) {
            this.monitorUrl = val.url;
            // console.log("播放url", this.monitorUrl);
            this.onVideo();
          }
        }
      }
    }
  },
  methods: {
    onVideo() {
      let player = new FlvJsPlayer({
        id: "video-box",
        url: this.monitorUrl,
        controlPlugins: [volume, playbackRate],
        fluid: true,
        autoplay: true,
        volume: 0.6,
        videoInit: true,
        preloadTime: 30,
        minCachedTime: 5,
        cors: true
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
  .monitorContent {
    width: 100%;
    height: 100%;
    // padding: 5px;
    // box-sizing: border-box;
    .contentHearder {
      height: 50px;
      line-height: 50px;
      width: 100%;
      // background-color: pink;

      .hearder-title {
        margin-right: 15px;
        font-size: 16px;
      }
    }
    .content-bd {
      height: calc(100% - 50px);
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
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
    .emptyData {
      color: #c0c4cc;
      font-size: 14px;
      display: flex;
      justify-content: center;
      margin-top: 40%;
    }
  }
}
</style>
<style lang="scss">
.monitorCom {
  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-card__body {
    height: 100%;
    width: 100%;
  }
}
</style>
