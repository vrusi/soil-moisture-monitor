<template>
  <div class="col">
    <app-plant v-for="plant in plants" :key="plant.id" :plant="plant" style="margin: 30px"></app-plant>
    <hr />
    <app-new-plant></app-new-plant>
  </div>
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
  },
};
</script>

<style>
</style>