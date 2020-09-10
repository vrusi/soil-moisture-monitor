<template>
  <div :id="sensor.id" class="card">
    <v-card class="mx-auto">
      <v-card-title v-if="!isEditing">{{ sensor.label ? sensor.label : "None" }}</v-card-title>
      <v-card-title v-else>
        <v-form ref="form" :lazy-validation="true" v-model="valid" style="width: 100%;">
          <v-text-field
            v-model="newLabel"
            :rules="newLabelRules"
            :counter="255"
            label="Sensor Label"
          ></v-text-field>
        </v-form>
      </v-card-title>

      <v-container>
        <v-row align="center">
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
          <v-col v-else>
            <v-form ref="form" :lazy-validation="true" v-model="valid">
              <v-select
                :items="[...plants, 'None']"
                :item-text="'name'"
                :item-value="'id'"
                :placeholder="plant ? plant.name : 'None'"
                label="Choose a plant"
                v-model="newPlant"
                return-object
              ></v-select>
            </v-form>
          </v-col>
        </v-row>

        <v-row align="center">
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
            <v-form ref="form" :lazy-validation="true" v-model="valid" style="width: 100%;">
              <v-text-field v-model="newAirValue" label="Air Value" type="number"></v-text-field>
            </v-form>
          </v-col>
        </v-row>

        <v-row align="center">
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
            <v-form ref="form" :lazy-validation="true" v-model="valid" style="width: 100%;">
              <v-text-field v-model="newWaterValue" label="Water Value" type="number"></v-text-field>
            </v-form>
          </v-col>
        </v-row>

        <v-row align="center">
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
            <v-form ref="form" :lazy-validation="true" v-model="valid" style="width: 100%;">
              <v-text-field
                v-model="newVersion"
                :rules="newVersionRules"
                :counter="255"
                label="Version"
              ></v-text-field>
            </v-form>
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
            <v-btn text @click="saveSensor" v-if="isEditing && changesMade" :disabled="!valid">SAVE</v-btn>
            <v-btn text @click="cancelEdit" v-if="isEditing">CANCEL</v-btn>
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
  data() {
    return {
      show: false,
      isEditing: false,
      valid: true,
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
      newLabelRules: [
        (v) => v.length <= 255 || "Label must be less than 255 characters",
        (v) =>
          !this.$store.getters.sensorLabelAlreadyExists(v) ||
          "This label is already taken",
      ],
      newVersionRules: [
        (v) =>
          v.length <= 255 || "The version must be less than 255 characters",
      ],
    };
  },

  props: ["sensor"],

  computed: {
    plant() {
      return this.$store.getters.plantByID(this.sensor.plantID);
    },

    plants() {
      return this.$store.getters.plants || [];
    },

    changesMade() {
      return !(
        this.newLabel === "" &&
        this.newPlant === null &&
        this.newAirValue === null &&
        this.newWaterValue === null &&
        this.newVersion === ""
      );
    },
  },

  methods: {
    resetFormData() {
      this.newLabel = "";
      this.newPlant = null;
      this.newAirValue = null;
      this.newWaterValue = null;
      this.newVersion = "";
    },

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

    cancelEdit() {
      this.isEditing = false;
      this.resetFormData();
      this.$refs.form.resetValidation();
    },

    async saveSensor() {
      try {
        this.isEditing = !this.isEditing;

        /* Remove the plant from the sensor it's currectly associated with */
        if (this.newPlant) {
          var sensorToDetach = this.$store.getters.sensorByPlantID(
            this.newPlant.id
          );
        }

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
            plantID: this.newPlant ? this.newPlant.id : this.sensor.plantID,
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

        this.resetFormData();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>