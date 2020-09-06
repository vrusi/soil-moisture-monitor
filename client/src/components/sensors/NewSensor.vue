<template>
  <div>
    <h1>New Sensor</h1>
    <form @submit.prevent="addSensor">
      <v-select
        :items="[...plants, 'None']"
        :item-text="'name'"
        :item-value="'id'"
        :placeholder="'None'"
        label="Attach to a plant"
        v-model="plant"
        dense
        outlined
        return-object
      ></v-select>
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
      plant: null,
      label: "",
      airValue: null,
      waterValue: null,
      version: "",
    };
  },
  computed: {
    plants() {
      return this.$store.getters.plants;
    },
  },
  methods: {
    async addSensor() {
      try {
        var sensorAlreadyAttached = this.$store.getters.sensorByPlantID(
          this.plant.id
        );

        if (sensorAlreadyAttached) {
          const responseDetach = await window.axios.patch("/sensors/" + sensorAlreadyAttached.id, {
            plantID: null,
            id: sensorAlreadyAttached.id,
            label: sensorAlreadyAttached.label,
            airValue: sensorAlreadyAttached.airValue,
            waterValue: sensorAlreadyAttached.waterValue,
            version: sensorAlreadyAttached.version,
          });

          this.$store.commit("UPDATE_SENSOR", responseDetach.data);
        }

        const response = await window.axios.post("/sensors", {
          plantID: this.plant.id,
          label: this.label,
          airValue: this.airValue,
          waterValue: this.waterValue,
          version: this.version,
        });

        this.$store.commit("ADD_SENSOR", response.data);

        this.plant = null;
        this.label = "";
        this.airValue = null;
        this.waterValue = null;
        this.version = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>