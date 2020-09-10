<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col v-if="!loaded">
        <div class="text-center ma-12">
          <v-progress-circular indeterminate color="green"></v-progress-circular>
        </div>
      </v-col>
      <v-col v-else>
        <app-sensor
          v-for="sensor in sensors"
          :key="sensor.id"
          :sensor="sensor"
          style="margin: 30px"
          @deleteSensor="removeSensor"
        ></app-sensor>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <hr />

    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <app-new-sensor @newSensor="addSensor"></app-new-sensor>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
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

    loaded() {
      return (
        !this.$store.getters.plantsLoading &&
        !this.$store.getters.sensorsLoading
      );
    },
  },
};
</script>

<style>
</style>