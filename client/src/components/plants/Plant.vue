<template>
  <div :id="this.plant.id" class="card" style="width:50rem;">
    <v-card class="mx-auto" max-width="344">
      <v-img src="https://image.flaticon.com/icons/png/512/628/628283.png" height="200px"></v-img>

      <v-card-title>{{ plant.name }}</v-card-title>

      <v-card-subtitle>PLANT STATUS</v-card-subtitle>

      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
        >Moisture Percentage: {{ plant.lastMoisturePercentage ? plant.lastMoisturePercentage : 'None' }}</li>
        <li
          class="list-group-item"
        >Moisture Value: {{ plant.lastMoistureValue ? plant.lastMoistureValue : 'None'}}</li>
      </ul>

      <v-card-actions>
        <v-btn text @click="deletePlant">DELETE</v-btn>

        <v-btn color="purple" text>Explore</v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>{{ plant.conditions }}</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
  }),

  props: ["plant"],

  methods: {
    async deletePlant() {
      try {
        const response = await window.axios.delete("/plants/" + this.plant.id);
        console.log(response);
        this.$emit("deletePlant", this.plant);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
