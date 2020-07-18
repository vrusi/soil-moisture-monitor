import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;
window.axios = axios;
axios.defaults.baseURL = 'http://localhost:3000';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
