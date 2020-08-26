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
  data() {
    return {
      sensors: [],
    };
  },

  components: {
    appSensor: Sensor,
    appNewSensor: NewSensor,
  },

  async mounted() {
    try {
      const responseSensors = await window.axios.get("sensors");
      this.sensors = responseSensors.data;
      console.log(responseSensors);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {

    addSensor(sensor) {
      this.sensors = [...this.sensors, sensor];
    },
    
    removeSensor(sensor) {
      this.sensors.splice(this.sensors.indexOf(sensor), 1);
    },
  },
};
</script>

<style>
</style>