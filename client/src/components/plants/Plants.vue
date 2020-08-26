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
  data() {
    return {
      plants: [],
    };
  },

  components: {
    appPlant: Plant,
    appNewPlant: NewPlant,
  },

  async mounted() {
    try {
      const responsePlants = await window.axios.get("plants");
      this.plants = responsePlants.data;
      console.log(responsePlants);
    } catch (error) {
      console.log(error);
    }
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