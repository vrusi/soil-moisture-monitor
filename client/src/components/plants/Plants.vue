<template>
  <div align="center" class="col">
    <app-plant
      v-for="plant in plants"
      :key="plant.id"
      :plant="plant"
      style="margin: 30px"
      @deletePlant="removePlant"
    ></app-plant>
    <hr />
    <app-new-plant @newPlant="addPlant"></app-new-plant>
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

  methods: {
    addPlant(plant) {
      this.plants = [...this.plants, plant];
    },
    removePlant(plant) {
      this.plants.splice(this.plants.indexOf(plant), 1);
    },
  },
};
</script>

<style>
</style>