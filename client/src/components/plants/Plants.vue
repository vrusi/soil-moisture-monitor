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
        <app-plant v-for="plant in plants" :key="plant.id" :plant="plant" style="margin: 30px"></app-plant>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <hr />

    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <app-new-plant></app-new-plant>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import Plant from "./Plant.vue";
import NewPlant from "./NewPlant.vue";

export default {
  components: {
    appPlant: Plant,
    appNewPlant: NewPlant,
  },

  computed: {
    plants() {
      return this.$store.getters.plants;
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