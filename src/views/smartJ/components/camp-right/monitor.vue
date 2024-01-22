<template>
  <div class="monitor-box">
    <div class="monitor-main">
      <div class="monitor-title">
        <span class="p-title">监控信息</span>
        <el-select
          v-model="currentVideo"
          placeholder="请选择"
          size="mini"
          style="width:40%"
          value-key="id"
        >
          <el-option
            v-for="item in videoDataList"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <el-card class="monitor-video" style="margin-bottom:10px;">
      <video
        id="viedo1"
        width="100%"
        height="125px"
        :src="`/static/smartJ-video/${currentVideo.videoResources}`"
        controls
        autoplay
      >
        <!-- <source src="../../../../assets/smartJ-video/test.mp4" type="video/mp4">  -->
        <!-- <source :src="`/static/smartJ-video/${currentVideo.videoResources}`" type="video/mp4">  -->
      </video>
    </el-card>
    <el-card class="monitor-video">
      <video id="viedo2" width="100%" height="125px" controls autoplay>
        <source
          src="../../../../assets/smartJ-video/test2.mp4"
          type="video/mp4"
        />
      </video>
    </el-card>
    <el-pagination small layout="prev, pager, next" :total="50" class="page">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["videoDataList"],
  data() {
    return {
      currentVideo: {}
    };
  },
  created() {},
  methods: {},
  watch: {
    videoDataList(newValue, oldValue) {
      if (newValue) {
        // console.log(newValue[0])
        this.currentVideo = newValue[0];
        // console.log(this.currentVideo)
      }
    }
  }
};
</script>

<style scoped lang="scss">
.monitor-box {
  .page {
    margin-top: 5px;
  }
  width: 100%;
  height: 100%;
  background: url(" ../../../../assets/smartJ-img/borders.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 20px;
  color: #fff;
  .monitor-main {
    .monitor-title {
      margin: 10px 0;
    }
    & > ul {
      width: 100%;
      text-align: left;
      list-style-type: none;
      margin: 0;
      margin-left: -40px;
      font-size: 14px;
      li {
        margin: 10px 0;
      }
    }
    .p-title {
      display: inline-block;
      margin-right: 20px;
    }
    padding-left: 30px;
    color: #fff;
    margin-bottom: 10px;
  }
  .monitor-video {
    width: 90%;
    margin: 0 auto;
    font-size: 14px;
  }
}
</style>
<style lang="scss">
.monitor-box {
  .el-card__header {
    padding-top: 14px;
    padding-bottom: 14px;
  }
  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-select .el-input .el-select__caret {
    color: #fff;
  }

  .el-pagination--small button {
    background-color: rgba(0, 0, 0, 0.01);
    color: #fff;
  }
  .el-pager li {
    background-color: rgba(0, 0, 0, 0.01);
    color: #fff;
  }
  .el-pager li.active {
    color: #409eff;
  }
}
</style>
