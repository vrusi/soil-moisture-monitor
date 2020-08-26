<template>
  <div style="align:center;">
    <p>Add a new sensor:</p>
    <form ref="formAddSensor" @submit.prevent="addSensor">
      <input v-model="label" type="text" placeholder="label" />
      <input v-model.number="airValue" type="number" placeholder="air value" />
      <input v-model.number="waterValue" type="number" placeholder="water value" />
      <input v-model="version" type="text" placeholder="version" />
      <button type="submit">Add Sensor</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label: "",
      airValue: null,
      waterValue: null,
      version: "",
    };
  },
  methods: {
    async addSensor() {
      try {
        const response = await window.axios.post("/sensors", {
          label: this.label,
          airValue: this.airValue,
          waterValue: this.waterValue,
          version: this.version,
        });

        //this.sensors.push(response.data);
        this.$emit('newSensor', response.data);
        console.log('RESPONSE DATA')
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>