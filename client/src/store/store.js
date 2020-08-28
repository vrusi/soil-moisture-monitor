import Vue from "vue";
import Vuex from "vuex";
import plants from "./modules/plants";
import sensors from "./modules/sensors";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    plants,
    sensors,
  },
});
