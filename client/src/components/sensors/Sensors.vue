<template>
  <div align="center" class="col">
    <app-sensor
      v-for="sensor in sensors"
      :key="sensor.id"
      :sensor="sensor"
      style="margin: 30px"
      @deleteSensor="removeSensor"
    ></app-sensor>
    <hr />
    <app-new-sensor @newSensor="addSensor"></app-new-sensor>
  </div>
</template>

<script>
import Sensor from "./Sensor.vue";
import NewSensor from "./NewSensor.vue";

export default {
  components: {
    appSensor: Sensor,
    appNewSensor: NewSensor,
  },

  methods: {
    addSensor(sensor) {
      this.sensors.push(sensor);
    },

    removeSensor(sensor) {
      this.sensors.splice(this.sensors.indexOf(sensor), 1);
    },
  },

  computed: {
    sensors() {
      return this.$store.getters.sensors;
    },
  },
};
</script>

<style>
</style>