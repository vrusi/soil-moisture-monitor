<template>
  <div :id="plant.id" class="card">
    <v-card class="mx-auto">
      <v-img
        lazy-src
        max-height="500"
        max-width="600"
        :src="plant.imagePath ? plant.imagePath : 'https://image.flaticon.com/icons/png/512/628/628283.png'"
      ></v-img>

      <v-container>
        <v-row align="center">
          <v-col>
            <v-form v-if="isEditing" style="width: 100%; padding: 0px 16px;">
              <v-text-field
                v-model="newImagePath"
                :rules="newImagePathRules"
                :counter="2048"
                label="New Image Path"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col>
            <v-card-title
              v-if="!isEditing"
              style="padding-bottom: 0px;"
            >{{ plant.name ? plant.name : "None"}}</v-card-title>

            <v-card-title v-else style="padding: 0px 16px;">
              <v-form style="width: 100%">
                <v-text-field
                  v-model="newName"
                  :rules="newNameRules"
                  :counter="255"
                  label="Plant Name"
                ></v-text-field>
              </v-form>
            </v-card-title>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col>
            <v-card-subtitle
              :style="'color: ' + plantStatus[1] + '; padding-top: 0px;'"
            >{{ plantStatus[0] }}</v-card-subtitle>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="2" style="text-align: center;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  :color="iconColor"
                  :size="iconSize"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >fa-percentage</v-icon>
              </template>
              <span>{{ tooltipPercentage }}</span>
            </v-tooltip>
          </v-col>

          <v-col>{{ plant.lastMoisturePercentage ? plant.lastMoisturePercentage : 'None' }}</v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="2" style="text-align: center;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :color="iconColor" :size="iconSize" dark v-bind="attrs" v-on="on">fa-tint</v-icon>
              </template>
              <span>{{ tooltipValue }}</span>
            </v-tooltip>
          </v-col>
          <v-col>{{ plant.lastMoistureValue ? plant.lastMoistureValue : 'None'}}</v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="2" style="text-align: center;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  :color="iconColor"
                  :size="iconSize"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >fa-microchip</v-icon>
              </template>
              <span>{{ tooltipSensor }}</span>
            </v-tooltip>
          </v-col>
          <v-col v-if="!isEditing">
            <router-link v-if="sensor" :to="'sensors#' + sensor.id">
              <a>{{ sensor.label }}</a>
            </router-link>

            <span v-else>None</span>

            <v-spacer></v-spacer>
          </v-col>

          <v-col v-else>
            <v-select
              :items="[...sensors, 'None']"
              :item-text="'label'"
              :item-value="'id'"
              :placeholder="sensor ? sensor.label : 'None'"
              label="Change sensor"
              v-model="newSensor"
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
          <v-card-text
            v-if="!isEditing"
          >Recommended moisture: {{ plant.recommendedMoisturePercentage ? plant.recommendedMoisturePercentage + ' %' : 'None' }}</v-card-text>
          <v-card-text v-else>
            <v-form style="padding: 0px 16px;">
              <v-text-field
                v-model="newRecommendedMoisturePercentage"
                type="number"
                label="Recommended Moisture Percentage"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-text v-if="!isEditing" style="text-align: justify;">{{ plant.description }}</v-card-text>
          <v-card-text v-else>
            <v-form lazy-validation v-model="valid" ref="form" style="padding: 0px 16px;">
              <v-text-field
                v-model="newDescription"
                :rules="newDescriptionRules"
                :counter="2048"
                label="Description"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deletePlant">DELETE</v-btn>
            <v-btn text @click="savePlant" v-if="isEditing && changesMade" :disabled="!valid">SAVE</v-btn>
            <v-btn text @click="cancelEdit" v-if="isEditing">CANCEL</v-btn>
            <v-btn text @click="editPlant" v-if="!isEditing">EDIT</v-btn>
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
      newName: "",
      newSensor: null,
      newDescription: "",
      newRecommendedMoisturePercentage: null,
      newImagePath: "",
      iconColor: "black",
      iconSize: "medium",
      tooltipPercentage: "Current soil moisture percentage",
      tooltipValue: "Current soil moisture capacitance value",
      tooltipSensor: "The sensor currently monitoring this plant",
      newDescriptionRules: [
        (v) =>
          v.length <= 2048 || "Description must be less than 2048 characters",
      ],
      newNameRules: [
        (v) => v.length <= 255 || "Plant name must be less than 255 characters",
      ],
      newImagePathRules: [
        (v) =>
          v.length <= 2048 || "Image path must be less than 2048 characters",
      ],
      valid: false,
    };
  },

  props: ["plant"],

  computed: {
    sensor() {
      return this.$store.getters.sensorByPlantID(this.plant.id);
    },
    sensors() {
      return this.$store.getters.sensors;
    },

    changesMade() {
      return !(
        this.newName === "" &&
        this.newSensor === null &&
        this.newDescription === "" &&
        this.newRecommendedMoisturePercentage === null &&
        this.newImagePath === ""
      );
    },

    plantStatus() {
      var current = this.plant.lastMoisturePercentage;
      var recommended = this.plant.recommendedMoisturePercentage;

      if (!current || !recommended) {
        return ["Unknown", "gray"];
      }

      if (current >= recommended - 5 && current <= recommended + 5) {
        return ["Great", "green"];
      } else if (current >= recommended - 10 && current <= recommended + 10) {
        return ["Very good", "mediumseagreen"];
      } else if (current >= recommended - 20 && current <= recommended + 20) {
        return ["Good", "olive"];
      } else if (current >= recommended - 30 && current <= recommended + 30) {
        return ["Not Good", "salmon"];
      } else if (current >= recommended - 40 && current <= recommended + 40) {
        return ["Bad", "indianred"];
      } else {
        return ["Very bad", "firebrick"];
      }
    },
  },

  methods: {
    resetFormData() {
      this.newName = "";
      this.newSensor = null;
      this.newDescription = "";
      this.newRecommendedMoisturePercentage = null;
      this.newImagePath = "";
    },

    cancelEdit() {
      this.resetFormData();
      this.isEditing = false;
    },

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
            newName: this.newName ? this.newName : this.plant.name,
            newDescription: this.newDescription
              ? this.newDescription
              : this.plant.description,
            newRecommendedMoisturePercentage: this
              .newRecommendedMoisturePercentage
              ? this.newRecommendedMoisturePercentage
              : this.plant.recommendedMoisturePercentage,
            newImagePath: this.newImagePath
              ? this.newImagePath
              : this.plant.imagePath,
          }
        );

        this.$store.commit("UPDATE_PLANT", responsePlant.data);

        /* If a new sensor was picked */
        if (this.newSensor != null) {
          /* Detach the plant from the currently attached sensor */
          var sensorToDetach = this.$store.getters.sensorByPlantID(
            this.plant.id
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
                notes: sensorToDetach.notes,
              }
            );

            this.$store.commit("UPDATE_SENSOR", responseDetach.data);
          }

          /* Attach a new sensor if it was selected */
          if (this.newSensor != "None") {
            var sensorToAttach = this.$store.getters.sensorByID(
              this.newSensor.id
            );

            const responseAttach = await window.axios.patch(
              "/sensors/" + sensorToAttach.id,
              {
                id: sensorToAttach.id,
                label: sensorToAttach.label,
                plantID: this.plant.id,
                airValue: sensorToAttach.airValue,
                waterValue: sensorToAttach.waterValue,
                version: sensorToAttach.version,
                notes: sensorToAttach.notes,
              }
            );

            this.$store.commit("UPDATE_SENSOR", responseAttach.data);
          }
        }

        this.resetFormData();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
