<template>
  <div class="home">
    <form ref="formSensor" @submit.prevent="addSensor">
      <input v-model="formSensor.label" type="text" placeholder="label"/>
      <input v-model="formSensor.airValue" type="number" placeholder="air value"/>
      <input v-model="formSensor.waterValue" type="number" placeholder="water value"/>
      <input v-model="formSensor.version" type="text" placeholder="version"/>
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

    <form ref="formPlant" @submit.prevent="addPlant">
      <input v-model="formPlant.sensorID" type="number" placeholder="sensor ID"/>
      <input v-model="formPlant.name" type="text" placeholder="plant name"/>
      <input v-model="formPlant.conditions" type="text" placeholder="plant conditions"/>
      <button type="submit">Add Plant</button>
    </form>
    <ul>
      <li v-for="plant in plants" :key="plant.id">
        {{plant.id}}
        {{plant.sensorID}}
        {{plant.name}}
        {{plant.conditions}}
        {{plant.lastMoistureValue}}
        {{plant.lastMoisturePercentage}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sensors: [],
      formSensor: {
        label: "",
        airValue: null,
        waterValue: null,
        version: ""
      },
      plants: [],
      formPlant: {
        sensorID: null,
        name: "",
        conditions: ""
      }
    };
  },

  async mounted() {
    try {
      const responseSensors = await window.axios.get("sensors");
      this.sensors = responseSensors.data;
      console.log(responseSensors);

      const responsePlants = await window.axios.get("plants");
      this.plants = responsePlants.data;
      console.log(responsePlants);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async addSensor() {
      try {
        const response = await window.axios.post("/sensors", {
          label: this.formSensor.label,
          airValue: this.formSensor.airValue,
          waterValue: this.formSensor.waterValue,
          version: this.formSensor.version
        });

        this.sensors.push(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async addPlant() {
      try {
        const response = await window.axios.post("/plants", {
          sensorID: this.formPlant.sensorID,
          name: this.formPlant.name,
          conditions: this.formPlant.conditions
        });

        this.plants.push(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
