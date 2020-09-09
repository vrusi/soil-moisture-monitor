<template>
  <div :id="plant.id" class="card" style="width:50rem;">
    <v-card class="mx-auto" max-width="344">
      <v-img src="https://image.flaticon.com/icons/png/512/628/628283.png" height="200px"></v-img>

      <v-card-title v-if="!isEditing">{{ plant.name ? plant.name : "None"}}</v-card-title>
      <v-card-title v-else>
        <input v-model="newName" type="text" :placeholder="plant.name" />
      </v-card-title>

      <v-card-subtitle>PLANT STATUS</v-card-subtitle>

      <v-container>
        <v-row>
          <v-col cols="2" style="text-align:center;">
            <i class="fas fa-percentage"></i>
          </v-col>

          <v-col>{{ plant.lastMoisturePercentage ? plant.lastMoisturePercentage : 'None' }}</v-col>
        </v-row>

        <v-row>
          <v-col cols="2" style="text-align:center;">
            <i class="fas fa-tint"></i>
          </v-col>
          <v-col>{{ plant.lastMoistureValue ? plant.lastMoistureValue : 'None'}}</v-col>
        </v-row>

        <v-row v-if="!isEditing">
          <v-col cols="2" style="text-align:center;">
            <i class="fas fa-microchip"></i>
          </v-col>
          <v-col>
            <router-link v-if="sensor" :to="'sensors#' + sensor.id">
              <a>{{ sensor.label }}</a>
            </router-link>

            <span v-else>None</span>

            <v-spacer></v-spacer>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="2" style="text-align:center;">
            <i class="fas fa-microchip"></i>
          </v-col>
          <v-col>
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
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-card-text v-if="!isEditing" style="text-align: justify;">{{ plant.conditions }}</v-card-text>
          <v-card-text v-else>
            <input v-model="newConditions" type="text" :placeholder="plant.conditions" />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deletePlant">DELETE</v-btn>
            <v-btn text @click="savePlant" v-if="isEditing">SAVE</v-btn>
            <v-btn text @click="editPlant" v-else>EDIT</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
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
        await window.axios.delete("/plants/" + this.plant.id);
        this.$store.commit("DELETE_PLANT", this.plant.id);
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
