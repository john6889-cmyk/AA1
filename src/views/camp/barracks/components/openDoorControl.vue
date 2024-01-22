<template>
  <div class="accessControlCom">
    <outSidebox>
      <div slot="content" class="accessControlContent">
        <div class="contentHearder">
          <span class="hearder-title">摄像头监视开窗器</span>
        </div>
        <el-card class="content-bd" id="vs">
          <!-- <div class="emptyData" v-else>暂无设备</div> -->
        </el-card>
      </div>
    </outSidebox>
  </div>
</template>

<script>
import outSidebox from "@/components/campComponents/outSidebox";
import FlvPlayer from "xgplayer-flv";

export default {
  data() {
    return {};
  },
  mounted() {
    let player = new FlvPlayer({
      id: "vs",
      url:
        "http://192.168.140.25:8866/live?url=rtsp://admin:12345@192.168.229.200",
      videoInit: true,
      autoplay: true,
      isLive: false,
      preloadTime: 1,
      minCachedTime: 1,
      isLive: true,
      controls: false
    });
    console.log(player.currentTime);
  },
  components: {
    outSidebox
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.accessControlCom {
  height: 100%;
  width: 100%;
  color: #fff;
  .accessControlContent {
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
      height: calc(100% - 50px) !important;
      width: 100% !important;
      .icon {
        color: #409eff;
        font-size: 17px;
        margin-right: 5px;
      }
      ul {
        width: 100%;
        list-style-type: none;
        text-align: left;
        margin: 0;
        margin-left: -40px;
        font-size: 14px !important;
        li:not(:last-child) {
          margin-bottom: 10px;
        }
        li {
          display: flex;
          align-items: center;
        }
        .controlBtn {
          font-size: 29px;
          color: #409eff;
        }
      }
      .emptyData {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #c0c4cc;
        font-size: 14px;
        display: flex;

        // margin-top: 40%;
      }
    }
  }
}
</style>
<style lang="scss">
.accessControlCom {
  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-button {
    padding: 5px 15px;
  }
  .el-card__body {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .emptyData {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
