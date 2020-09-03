<template>
  <div :id="plant.id" class="card" style="width:50rem;">
    <v-card class="mx-auto" max-width="344">
      <v-img src="https://image.flaticon.com/icons/png/512/628/628283.png" height="200px"></v-img>

      <v-card-title v-if="!isEditing">{{ plant.name ? plant.name : "None"}}</v-card-title>
      <v-card-title v-else>
        <input v-model="newName" type="text" :placeholder="plant.name" />
      </v-card-title>

      <v-card-subtitle>PLANT STATUS</v-card-subtitle>

      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
        >Moisture Percentage: {{ plant.lastMoisturePercentage ? plant.lastMoisturePercentage : 'None' }}</li>
      </ul>
      <v-card-actions style="display: inline;">
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <ul>
            <li
              class="list-group-item"
            >Moisture Value: {{ plant.lastMoistureValue ? plant.lastMoistureValue : 'None'}}</li>

            <li v-if="!isEditing" class="list-group-item">
              Associated Sensor:
              <router-link v-if="sensor" :to="'sensors#' + sensor.id">
                <a>{{sensor.label}}</a>
              </router-link>

              <p v-else>None</p>
            </li>

            <li v-else class="list-group-item">
              <v-select
                :items="[...sensors, 'None']"
                :item-text="'label'"
                :item-value="'id'"
                :placeholder="sensor ? sensor.label : 'None'"
                label="Change sensor"
                v-model="newSensor"
                dense
                outlined
                return-object
              ></v-select>
            </li>
          </ul>

          <v-card-text v-if="!isEditing">{{ plant.conditions }}</v-card-text>
          <v-card-text v-else>
            <input v-model="newConditions" type="text" :placeholder="plant.conditions" />
          </v-card-text>

          <v-btn text @click="deletePlant">DELETE</v-btn>
          <v-btn text @click="savePlant" v-if="isEditing">SAVE</v-btn>
          <v-btn text @click="editPlant" v-else>EDIT</v-btn>
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
    newName: "",
    newSensor: null,
    newConditions: "",
  }),

  props: ["plant"],

  computed: {
    sensor() {
      return this.$store.getters.sensorByPlantID(this.plant.id);
    },
    sensors() {
      return this.$store.getters.sensors;
    },
  },

  methods: {
    async deletePlant() {
      try {
        const response = await window.axios.delete("/plants/" + this.plant.id);
        this.$store.commit("DELETE_PLANT", response.data);
      } catch (error) {
        console.log(error);
      }
    },

    editPlant() {
      this.isEditing = true;
    },

    async savePlant() {
      try {
        this.isEditing = !this.isEditing;

        const responsePlant = await window.axios.patch(
          "/plants/" + this.plant.id,
          {
            newName: this.newName,
            newConditions: this.newConditions,
          }
        );

        this.$store.commit("UPDATE_PLANT", responsePlant.data);

        if (this.newSensor == null) return;

        /* Detach the plant from the currently attached sensor */
        var sensorToDetach = this.$store.getters.sensorByPlantID(this.plant.id);

        if (sensorToDetach) {
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
        }

        /* Attach a new sensor if it was selected */
        if (this.newSensor == "None") return;

        var sensorToAttach = this.$store.getters.sensorByID(this.newSensor.id);

        const responseAttach = await window.axios.patch(
          "/sensors/" + sensorToAttach.id,
          {
            id: sensorToAttach.id,
            label: sensorToAttach.label,
            plantID: this.plant.id,
            airValue: sensorToAttach.airValue,
            waterValue: sensorToAttach.waterValue,
            version: sensorToAttach.version,
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
