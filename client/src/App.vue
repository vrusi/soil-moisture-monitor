<template>
  <v-app>
    <v-main>
      <app-header></app-header>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    appHeader: Header,
  },

  async mounted() {
    try {
      const responseSensors = await window.axios.get("sensors");
      const sensors = responseSensors.data;
      this.$store.commit("SET_SENSORS", sensors);

      const responsePlants = await window.axios.get("plants");
      const plants = responsePlants.data;
      this.$store.commit("SET_PLANTS", plants);

      /* fake measurements data */
      /* for (var i = 0; i < 100; i++) {
        var min = 1445;
        var max = 3600;
        var moistureValueGen = Math.floor(Math.random() * (max - min)) + min;
        var hundredPercent = max - min;
        var moisturePercentageGen =
          ((moistureValueGen - min) / hundredPercent) * 100;

        await window.axios.post("/measurements", {
          sensorID: 1,
          plantID: 1,
          moistureValue: moistureValueGen,
          moisturePercentage: moisturePercentageGen,
        });
      } */
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
body {
  background: antiquewhite !important;
}
</style>
