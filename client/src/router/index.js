import Vue from 'vue';
import VueRouter from 'vue-router';

import Plants from "../components/plants/Plants.vue";
import Sensors from "../components/sensors/Sensors.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
  },

  {
    path: "/plants",
    component: Plants,
  },

  {
    path: "/sensors",
    component: Sensors,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
