<template>
  <div class="outSideBox">
    <!-- <div class="title">
      <slot name="title"></slot>
    </div> -->
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.outSideBox {
  width: 100%;
  height: 100%;
  background: url("../../assets/smartJ-img/borders.png") no-repeat;
  background-size: 100% 100%;
  // .title {
  //   height: 40px;
  //   width: 100%;
  //   line-height: 40px;
  //   margin: 0 auto;
  // }
  .content {
    height: 100%;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
}
</style>
