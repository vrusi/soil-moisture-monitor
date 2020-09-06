<template>
  <div :id="sensor.id" class="card" style="width:50rem;">
    <v-card class="mx-auto" max-width="344">
      <v-card-title v-if="!isEditing">{{ sensor.label ? sensor.label : "None" }}</v-card-title>
      <v-card-title v-else>
        <input v-model="newLabel" type="text" :placeholder="sensor.label" />
      </v-card-title>

      <v-card-subtitle v-if="!isEditing">
        Associated Plant:
        <router-link :to="'plants#' + this.sensor.plantID">
          <a>{{ plant ? plant.name : 'None'}}</a>
        </router-link>
      </v-card-subtitle>

      <v-card-subtitle v-else>
        <v-select
          :items="[...plants, 'None']"
          :item-text="'name'"
          :item-value="'id'"
          :placeholder="plant ? plant.name : 'None'"
          label="Attach to a different plant"
          v-model="newPlant"
          dense
          outlined
          return-object
        ></v-select>
      </v-card-subtitle>

      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-if="!isEditing"
        >Air Value: {{ sensor.airValue ? sensor.airValue : "None"}}</li>
        <li class="list-group-item" v-else>
          Air Value:
          <input v-model="newAirValue" type="text" :placeholder="sensor.airValue" />
        </li>
        <li
          class="list-group-item"
          v-if="!isEditing"
        >Water Value: {{ sensor.waterValue ? sensor.waterValue : "None"}}</li>
        <li class="list-group-item" v-else>
          Water Value:
          <input v-model="newWaterValue" type="text" :placeholder="sensor.waterValue" />
        </li>

        <li
          class="list-group-item"
          v-if="!isEditing"
        >Version: {{ sensor.version ? sensor.version : "None"}}</li>
        <li class="list-group-item" v-else>
          Version:
          <input v-model="newVersion" type="text" :placeholder="sensor.version" />
        </li>
      </ul>

      <v-card-actions style="display:inline;">
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-btn text @click="deleteSensor">DELETE</v-btn>
          <v-btn text @click="saveSensor" v-if="isEditing">SAVE</v-btn>
          <v-btn text @click="editSensor" v-else>EDIT</v-btn>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    isEditing: false,
    newLabel: "",
    newPlant: null,
    newAirValue: null,
    newWaterValue: null,
    newVersion: "",
  }),

  props: ["sensor"],

  computed: {
    plant() {
      return this.$store.getters.plantByID(this.sensor.plantID);
    },

    plants() {
      return this.$store.getters.plants;
    },
  },

  methods: {
    async deleteSensor() {
      try {
        await window.axios.delete(
          "/sensors/" + this.sensor.id
        );
        this.$store.commit("DELETE_SENSOR", this.sensor.id);
      } catch (error) {
        console.log(error);
      }
    },

    editSensor() {
      this.isEditing = true;
    },

    async saveSensor() {
      try {
        this.isEditing = !this.isEditing;

        /* Remove the plant from the sensor it's currectly associated with */
        var sensorToDetach = this.$store.getters.sensorByPlantID(
          this.newPlant.id
        );

        const responseDetach = await window.axios.patch(
          "/sensors/" + sensorToDetach.id,
          {
            id: sensorToDetach.id,
            label: sensorToDetach.label,
            plantID: null,
            airValue: sensorToDetach.airValue,
            waterValue: sensorToDetach.waterValue,
            version: sensorToDetach.version,
          }
        );

        this.$store.commit("UPDATE_SENSOR", responseDetach.data);

        /* Attach the plant to the current sensor */
        const responseAttach = await window.axios.patch(
          "/sensors/" + this.sensor.id,
          {
            id: this.sensor.id,
            label: this.newLabel ? this.newLabel : this.sensor.label,
            plantID: this.newPlant.id ? this.newPlant.id : this.sensor.plantID,
            airValue: this.newAirValue
              ? this.newAirValue
              : this.sensor.airValue,
            waterValue: this.newWaterValue
              ? this.newWaterValue
              : this.sensor.waterValue,
            version: this.newVersion ? this.newVersion : this.sensor.version,
          }
        );

        this.$store.commit("UPDATE_SENSOR", responseAttach.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>