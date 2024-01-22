import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    activeNav: ""
  },
  mutations: {
    setMenus(state, activeNav) {
      state.activeNav = activeNav;
      localStorage.setItem("activeNav", JSON.stringify(activeNav));
    }
  },
  actions: {},
  modules: {}
});
