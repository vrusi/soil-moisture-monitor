<template>
  <div :id="sensor.id" class="card" style="width:50rem;">
    <v-card class="mx-auto" max-width="344">
      <v-card-title>{{ sensor.label }}</v-card-title>

      <v-card-subtitle>
        Associated Plant:
        <router-link :to="'plants#' + this.sensor.plantID">
          <a>{{ plant ? plant.name : 'None'}}</a>
        </router-link>
      </v-card-subtitle>

      <ul class="list-group list-group-flush">
        <li class="list-group-item">Air Value: {{ sensor.airValue }}</li>
        <li class="list-group-item">Water Value: {{ sensor.waterValue }}</li>
        <li class="list-group-item">Version: {{ sensor.version }}</li>
      </ul>

      <v-card-actions style="display:inline;">
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>SOME TEXT FOR THE SENSOR?</v-card-text>
          <v-btn text @click="deleteSensor">DELETE</v-btn>
          <v-btn text @click="editSensor">EDIT</v-btn>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
  }),

  props: ["sensor"],

  computed: {
    plant() {
      return this.$store.getters.plantByID(this.sensor.plantID);
    },
  },

  methods: {
    async deleteSensor() {
      try {
        const response = await window.axios.delete(
          "/sensors/" + this.sensor.id
        );
        console.log(response);
        this.$emit("deleteSensor", this.sensor);
      } catch (error) {
        console.log(error);
      }
    },

    editSensor() {},
  },
};
</script>

<style scoped>
</style>