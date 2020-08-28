import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import store from "./store/store";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
window.axios = axios;
axios.defaults.baseURL = "http://localhost:3000";

Vue.component("v-select", vSelect);

export default {
  components: {
    vSelect
  }
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
