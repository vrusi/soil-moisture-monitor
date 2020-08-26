<template>
  <div>
    <h1>New Plant</h1>
    <form @submit.prevent="addPlant" style="margin: 30px;">
      <!-- TODO: sensors getter -->
      <v-select :options="sensors" placeholder="sensor label" v-model="sensor"></v-select>
      <input v-model="name" type="text" placeholder="plant name" />
      <input v-model="conditions" type="text" placeholder="plant conditions" />
      <button type="submit">Add Plant</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sensors: ["TODO: add sensors getter"],
      sensor: null,
      name: "",
      conditions: "",
    };
  },
  methods: {
    async addPlant() {
      try {
        const response = await window.axios.post("/plants", {
          sensorID: this.sensor ? this.sensor.id : null,
          name: this.name,
          conditions: this.conditions,
        });

        this.$emit("newPlant", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>