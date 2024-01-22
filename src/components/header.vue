<template>
  <div class="headerBox">
    <span>营区设备仿真演示系统</span>
    <div class="tabNav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#091926"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- <el-menu-item index="MapPage">首页</el-menu-item> -->
        <el-submenu index="Camp">
          <template slot="title">营区</template>
          <el-menu-item index="营区A">营区A</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="Relocation">设备迁移</el-menu-item> -->
      </el-menu>
    </div>
    <!-- <span class="userIcon iconfont"
      >&#xe6a5;
      <span class="userName">wsn</span>
    </span> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "header",
  data() {
    return {
      activeIndex: "MapPage"
    };
  },
  computed: mapState(["activeNav"]),
  mounted() {
    this.activeIndex = this.$route.name ? this.$route.name : "MapPage";
    if (this.activeIndex == "Camp") {
      this.activeIndex = this.$route.query.label;
      this.$store.commit("setMenus", this.activeIndex);
    } else if (
      this.activeIndex == "Relocation" ||
      this.activeIndex == "MapPage"
    ) {
      this.activeIndex = this.activeIndex;
      this.$store.commit("setMenus", this.activeIndex);
    } else {
      this.activeIndex = this.$route.query.label;
      this.$store.commit("setMenus", this.$route.query.label);
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == "MapPage") {
        this.$router.push({
          path: "/"
        });
        // window.reload();
      } else if (key == "营区A") {
        this.$router.push({
          path: "/Barracks",
          query: { label: "营区A" }
        });
        location.reload();
      } else if (key == "营区B") {
        this.$router.push({
          path: "/Camp",
          query: { label: "营区B" }
        });
        location.reload();
      } else if (key == "营区C") {
        this.$router.push({
          path: "/Camp",
          query: { label: "营区C" }
        });
        location.reload();
      } else if (key == "Relocation") {
        this.$router.push("/Relocation");
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.headerBox {
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #091926;
  color: #fff;
  /* border-bottom: 1px solid #fff; */
  padding-left: 28px;
  font-size: 26px;
  position: relative;
}
.headerBox .userIcon {
  position: absolute;
  right: 60px;
  font-size: 22px;
  color: #dcdfe6;
}
.headerBox .tabNav {
  display: inline-block;
  position: absolute;
  right: 200px;
}
.headerBox .userIcon .userName {
  font-size: 16px;
  margin-left: 6px;
}
.headerBox .tabNav {
  height: 100%;
}

.headerBox .tabNav .el-menu-demo {
  height: 100%;
}
</style>
<style lang="scss">
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
