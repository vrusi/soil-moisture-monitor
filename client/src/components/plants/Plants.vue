<template>
  <div align="center" class="col">
    <app-plant 
        v-for="plant in plants"
        :key="plant.id"
        :plant="plant"
        style="margin: 30px"></app-plant>
  </div>
</template>

<script>
import Plant from "./Plant.vue";

export default {
  data() {
    return {
      plants: [],
    };
  },

  components: {
    appPlant: Plant,
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
};
</script>

<style>
</style>