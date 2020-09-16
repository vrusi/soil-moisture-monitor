<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 style="text-align: center;">Add a new plant</h1>

        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="255"
            label="Plant Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="description"
            :rules="descriptionRules"
            :counter="2048"
            label="Plant Description"
            required
          ></v-text-field>

          <v-text-field
            v-model="recommendedMoisturePercentage"
            label="Recommended Moisture Percentage"
            type="number"
          ></v-text-field>

          <v-text-field
            v-model="imagePath"
            :rules="imagePathRules"
            :counter="2048"
            label="Image Path"
          ></v-text-field>

          <br />

          <v-select
            :items="[...sensors, 'None']"
            :item-text="'label'"
            :item-value="'id'"
            :placeholder="'None'"
            label="Choose a sensor"
            v-model="sensor"
            return-object
          ></v-select>

          <v-btn @click="addPlant" :disabled="!valid" color="success" class="mr-4">Add Plant</v-btn>
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
      sensor: null,
      name: "",
      description: "",
      imagePath: "",
      recommendedMoisturePercentage: null,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 255 || "Name must be less than 255 characters",
      ],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          v.length <= 2048 || "Description must be less than 2048 characters",
      ],
      imagePathRules: [
        (v) =>
          v.length <= 2048 || "Image path must be less than 2048 characters",
      ],
    };
  },

  computed: {
    sensors() {
      return this.$store.getters.sensors;
    },
  },

  methods: {
    resetFormData() {
      this.sensor = null;
      this.name = "";
      this.description = "";
      this.recommendedMoisturePercentage = null;
      this.imagePath = "";
    },

    async addPlant() {
      try {

        const responsePlant = await window.axios.post("/plants", {
          sensorID: this.sensor ? this.sensor.id : null,
          name: this.name,
          description: this.description,
          recommendedMoisturePercentage: this.recommendedMoisturePercentage,
          imagePath: this.imagePath,
        });

        this.$store.commit("ADD_PLANT", responsePlant.data);

        if (this.sensor) {
          var sensorToAttach = this.$store.getters.sensorByID(
            this.sensor.id
          );
        }

        if (sensorToAttach) {
          const responseSensor = await window.axios.patch(
            "/sensors/" + sensorToAttach.id,
            {
              id: sensorToAttach.id,
              label: sensorToAttach.label,
              plantID: responsePlant.data.id,
              airValue: sensorToAttach.airValue,
              waterValue: sensorToAttach.waterValue,
              version: sensorToAttach.version,
              notes: sensorToAttach.notes,
            }
          );

          this.$store.commit("UPDATE_SENSOR", responseSensor.data);
        }

        this.resetFormData();
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