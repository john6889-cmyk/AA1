// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router";
import axios from "./assets/api/axios";
import store from "./store";
import "./assets/css/index.scss";
//配置 echarts
import echarts from "echarts";
import "./util/directives";
// 全局注入  可以通过 this.$xxx 使用该变量，不需要每次都 import 引入
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
// 引入iconfont
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/iconfont.js";
import "./assets/camp-icon/iconfont.css";
import "./assets/camp-icon/iconfont.js";

// import Player from "xgplayer/dist/simple_player";
// import volume from "xgplayer/dist/controls/volume";
// import playbackRate from "xgplayer/dist/controls/playbackRate";
// Vue.use(Player);

Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
