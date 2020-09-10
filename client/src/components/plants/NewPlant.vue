<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 style="text-align: center;">Add a new plant</h1>

        <v-form :lazy-validation="true" v-model="valid" ref="form">
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
    async addPlant() {
      try {
        const response = await window.axios.post("/plants", {
          sensorID: this.sensor ? this.sensor.id : null,
          name: this.name,
          description: this.description,
        });

        this.$store.commit("ADD_PLANT", response.data);

        this.sensor = null;
        this.name = "";
        this.description = "";
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