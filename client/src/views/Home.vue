<template>
  <div class="home">
    <form @submit.prevent="addSensor">
      <input v-model="form.label" type="text" />
      <input v-model="form.airValue" type="number" />
      <input v-model="form.waterValue" type="number" />
      <input v-model="form.version" type="text" />
      <button type="submit">Add Sensor</button>
    </form>
    <ul>
      <li v-for="sensor in sensors" :key="sensor.id">
        {{sensor.id}}
        {{sensor.label}}
        {{sensor.airValue}}
        {{sensor.waterValue}}
        {{sensor.version}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sensors: [],
      form: {
        label: "",
        airValue: 0,
        waterValue: 0,
        version: ""
      }
    };
  },

  async mounted() {
    try {
      const response = await window.axios.get("sensors");
      this.sensors = response.data;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async addSensor() {
      try {
        const response = await window.axios.post("/sensors", {
          label: this.form.label,
          airValue: this.form.airValue,
          waterValue: this.form.waterValue,
          version: this.form.version
        });

        this.sensors.push(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
