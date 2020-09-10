<template>
  <div :id="sensor.id" class="card">
    <v-card class="mx-auto">
      <v-card-title v-if="!isEditing">{{ sensor.label ? sensor.label : "None" }}</v-card-title>
      <v-card-title v-else>
        <input v-model="newLabel" type="text" :placeholder="sensor.label" />
      </v-card-title>

      <v-container>
        <v-row>
          <v-col cols="2" style="text-align: center;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :color="iconColor" :size="iconSize" dark v-bind="attrs" v-on="on">fa-leaf</v-icon>
              </template>
              <span>{{ tooltipPlant }}</span>
            </v-tooltip>
          </v-col>
          <v-col v-if="!isEditing">
            <router-link v-if="plant" :to="'plants#' + this.sensor.plantID">
              <a>{{ plant.name }}</a>
            </router-link>
            <span v-if="!plant">None</span>
          </v-col>
          <v-col v-else cols="6">
            <v-select
              :items="[...plants, 'None']"
              :item-text="'name'"
              :item-value="'id'"
              :placeholder="plant ? plant.name : 'None'"
              label="Choose a plant"
              v-model="newPlant"
              dense
              return-object
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2" style="text-align: center;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :color="iconColor" :size="iconSize" dark v-bind="attrs" v-on="on">fa-wind</v-icon>
              </template>
              <span>{{ tooltipAirValue }}</span>
            </v-tooltip>
          </v-col>
          <v-col v-if="!isEditing">{{ sensor.airValue ? sensor.airValue : "None"}}</v-col>
          <v-col v-else>
            <input v-model="newAirValue" type="text" :placeholder="sensor.airValue" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2" style="text-align: center;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :color="iconColor" :size="iconSize" dark v-bind="attrs" v-on="on">fa-water</v-icon>
              </template>
              <span>{{ tooltipWaterValue }}</span>
            </v-tooltip>
          </v-col>
          <v-col v-if="!isEditing">{{ sensor.waterValue ? sensor.waterValue : "None"}}</v-col>
          <v-col v-else>
            <input v-model="newWaterValue" type="text" :placeholder="sensor.waterValue" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2" style="text-align: center;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :color="iconColor" :size="iconSize" dark v-bind="attrs" v-on="on">fa-info</v-icon>
              </template>
              <span>{{ tooltipVersion }}</span>
            </v-tooltip>
          </v-col>

          <v-col v-if="!isEditing">{{ sensor.version ? sensor.version : "None"}}</v-col>
          <v-col v-else>
            <input v-model="newVersion" type="text" :placeholder="sensor.version" />
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
          <v-card-text
            style="text-align: justify;"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis velit vel accumsan viverra. Nunc ac dui ullamcorper, efficitur arcu a, consequat augue. Vestibulum vel laoreet est. Donec in facilisis enim, condimentum mollis massa. Mauris ullamcorper vehicula arcu, vel vehicula dui venenatis id.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deleteSensor">DELETE</v-btn>
            <v-btn text @click="saveSensor" v-if="isEditing">SAVE</v-btn>
            <v-btn text @click="editSensor" v-else>EDIT</v-btn>
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
    newLabel: "",
    newPlant: null,
    newAirValue: null,
    newWaterValue: null,
    newVersion: "",
    tooltipPlant: "The plant this sensor is currently monitoring",
    tooltipAirValue: "Air Value",
    tooltipWaterValue: "Water Value",
    tooltipVersion: "Sensor Version",
    iconColor: "black",
    iconSize: "medium",
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
        await window.axios.delete("/sensors/" + this.sensor.id);
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