<template>
  <div>
    <app-header></app-header>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["initPlants", "initSensors"]),
  },

  components: {
    appHeader: Header,
  },

  async mounted() {
    try {
      const responseSensors = await window.axios.get("sensors");
      const sensors = responseSensors.data;
      this.initSensors(sensors);

      const responsePlants = await window.axios.get("plants");
      const plants = responsePlants.data;
      this.initPlants(plants)

    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
