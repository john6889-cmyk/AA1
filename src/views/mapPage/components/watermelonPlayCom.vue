<template>
  <div class="watermelonPlayCom">
    <div class="video-box" ref="videoBox"></div>
  </div>
</template>

<script>
import "xgplayer";
import FlvJsPlayer from "xgplayer-flv.js";
export default {
  //monitor的子组件
  props: {
    playUrl: {
      type: String
    }
  },
  data() {
    return {
      monitorUrl: null,
      playerInstance: null
    };
  },
  mounted() {
    // console.log(this.playUrl);
    // this.onVideo();
    this.$nextTick(() => {
      this.onVideo();
    });
  },
  // watch: {
  //   playUrl(val, oldVal) {
  //     if (val) {
  //       this.monitorUrl = val;
  //       console.log(this.monitorUrl, "+++++++++播放链接");
  //       this.onVideo();
  //       // this.$nextTick(() => {
  //       //   this.onVideo();
  //       // });
  //     }
  //   }
  // },
  methods: {
    onVideo() {
      if (this.playerInstance) {
        // console.log("初始化视频", this.playerInstance.destroy);
        // console.log(this.playerInstance);
        this.playerInstance.destroy(true);
        this.playerInstance = null;
        // return;
      }

      this.playerInstance = new FlvJsPlayer({
        //id: "video-box",
        el: this.$refs.videoBox,
        url: this.playUrl,
        // url: this.monitorUrl,
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
    }
  }
};
</script>

<style lang="scss" scoped>
.watermelonPlayCom {
  height: 100%;
  width: 100%;
}
</style>
