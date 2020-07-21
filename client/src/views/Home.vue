<template>
  <div class="home">
    <p>hello</p>
    <div>
      <p>Add a new sensor:</p>
      <form ref="formAddSensor" @submit.prevent="addSensor">
        <input v-model="formAddSensor.label" type="text" placeholder="label" />
        <input v-model="formAddSensor.airValue" type="number" placeholder="air value" />
        <input v-model="formAddSensor.waterValue" type="number" placeholder="water value" />
        <input v-model="formAddSensor.version" type="text" placeholder="version" />
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

    <div>
      <p>Add a new plant:</p>
      <form ref="formAddPlant" @submit.prevent="addPlant">
        <v-select :options="sensors" placeholder="sensor label" v-model="formAddPlant.sensor"></v-select>
        <input v-model="formAddPlant.name" type="text" placeholder="plant name" />
        <input v-model="formAddPlant.conditions" type="text" placeholder="plant conditions" />
        <button type="submit">Add Plant</button>
      </form>
      <ul>
        <li v-for="plant in plants" :key="plant.id">
          {{plant.id}}
          {{plant.name}}
          {{plant.conditions}}
          {{plant.lastMoistureValue}}
          {{plant.lastMoisturePercentage}}
        </li>
      </ul>
      {{formAddPlant.sensor}}
    </div>

    <div>
      <p>Update an existing plant:</p>
      <form ref="formUpdatePlant" @submit.prevent="updatePlant">
        <v-select
          :options="plants"
          label="name"
          placeholder="plant to be updated"
          v-model="formUpdatePlant.plant"
        ></v-select>
        <input
          v-if="formUpdatePlant.plant !== null"
          v-model="formUpdatePlant.newName"
          type="text"
          placeholder="new name"
        />
        <input
          v-if="formUpdatePlant.plant !== null"
          v-model="formUpdatePlant.newConditions"
          type="text"
          placeholder="new conditions"
        />
        <v-select
          v-if="formUpdatePlant.plant != null" 
          :options="sensors"
          placeholder="change the sensor"
          v-model="formUpdatePlant.newSensor"
        ></v-select>
        <button type="submit">Update Plant</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sensors: [],
      formAddSensor: {
        label: "",
        airValue: null,
        waterValue: null,
        version: ""
      },
      plants: [],
      formAddPlant: {
        sensor: null,
        name: "",
        conditions: ""
      },
      formUpdatePlant: {
        plant: null,
        newSensor: null,
        newName: "",
        newConditions: ""
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
          label: this.formAddSensor.label,
          airValue: this.formAddSensor.airValue,
          waterValue: this.formAddSensor.waterValue,
          version: this.formAddSensor.version
        });

        this.sensors.push(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async addPlant() {
      try {
        const response = await window.axios.post("/plants", {
          sensorID: this.formAddPlant.sensor.id,
          name: this.formAddPlant.name,
          conditions: this.formAddPlant.conditions
        });

        this.plants.push(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async updatePlant() {
      try {
        const response = await window.axios.patch(
          "/plants/" + this.formUpdatePlant.plant.id,
          {
            newName: this.formUpdatePlant.newName,
            newConditions: this.formUpdatePlant.newConditions,
            newSensorID: this.formUpdatePlant.newSensor != null ? this.formUpdatePlant.newSensor.id : null
          }
        );

        this.plants.splice(this.plants.indexOf(this.formUpdatePlant.plant), 1);
        this.plants.push(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
body {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-text-size-adjust: none;
}

h1,
.muted {
  color: #2c3e5099;
}

h1 {
  font-size: 26px;
  font-weight: 600;
}

#app {
  max-width: 30em;
  margin: 1em auto;
}
</style>