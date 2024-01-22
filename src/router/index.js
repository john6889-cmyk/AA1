import Vue from "vue";
import Router from "vue-router";
import MapPage from "../views/mapPage/index";
// import MapPage2 from '../views/smartJ'

import SmartJ from "../views/smartJ";
import Camp from "../views/camp";
import Relocation from "../views/relocation";
//仓库
import Storehouse from "../views/camp/storehouse";
//办公楼
import OfficeBuilding from "../views/camp/officeBuilding";
//营房
import Barracks from "../views/camp/barracks";
Vue.use(Router);
const VueRouterPush = Router.prototype.push;

Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};
export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "Camp",
      component: Camp
    },
    // {
    //   path: '/MapPage2',
    //   name: 'MapPage2',
    //   component: MapPage2
    // },
    // {
    //   path: "/SmartJ",
    //   name: "SmartJ",
    //   component: SmartJ
    // },
    {
      path: "/Camp",
      name: "Camp",
      component: Camp
    },
    {
      path: "/Storehouse",
      name: "Storehouse",
      component: Storehouse
    },
    {
      path: "/OfficeBuilding",
      name: "OfficeBuilding",
      component: OfficeBuilding
    },
    {
      path: "/Barracks",
      name: "Barracks",
      component: Barracks
    },
    {
      path: "/Relocation",
      name: "Relocation",
      component: Relocation
    }
  ]
});
