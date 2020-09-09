<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 style="text-align: center;">Add a new sensor</h1>

        <v-form :lazy-validation="true" v-model="valid" ref="form">
          <v-text-field
            v-model="label"
            :rules="labelRules"
            :counter="255"
            label="Sensor Label"
            required
          ></v-text-field>

          <v-text-field v-model="airValue" label="Air Value" type="number"></v-text-field>

          <v-text-field v-model="waterValue" label="Water Value" type="number"></v-text-field>

          <v-text-field v-model="version" label="Sensor Version"></v-text-field>

          <v-select
            :items="[...plants, 'None']"
            :item-text="'name'"
            :item-value="'id'"
            :placeholder="'None'"
            label="Choose a plant to monitor"
            v-model="plant"
            dense
            outlined
            return-object
          ></v-select>

          <v-btn @click="addSensor" :disabled="!valid" color="success" class="mr-4">Add Sensor</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      plant: null,
      label: "",
      airValue: null,
      waterValue: null,
      version: "",
      labelRules: [
        (v) => !!v || "Label is required",
        (v) => v.length <= 255 || "Label must be less than 255 characters",
        (v) =>
          !this.$store.getters.sensorLabelAlreadyExists(v) ||
          "This label is already taken",
      ],
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
        if (this.plant) {
          var sensorAlreadyAttached = this.$store.getters.sensorByPlantID(
            this.plant.id
          );
        }

        if (sensorAlreadyAttached) {
          const responseDetach = await window.axios.patch(
            "/sensors/" + sensorAlreadyAttached.id,
            {
              plantID: null,
              id: sensorAlreadyAttached.id,
              label: sensorAlreadyAttached.label,
              airValue: sensorAlreadyAttached.airValue,
              waterValue: sensorAlreadyAttached.waterValue,
              version: sensorAlreadyAttached.version,
            }
          );

          this.$store.commit("UPDATE_SENSOR", responseDetach.data);
        }

        const response = await window.axios.post("/sensors", {
          plantID: this.plant ? this.plant.id : null,
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
        this.$refs.form.resetValidation();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>