<template>
  <div class="row">
    <div class="card" style="width:50rem;">
      <h1>{{ sensor.label }}</h1>
      <div class="card-body">
        <h5 class="card-title">Associated Plant: {{ plant ? plant.name : 'None'}}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Air Value: {{ sensor.airValue }}</li>
        <li class="list-group-item">Water Value: {{ sensor.waterValue }}</li>
        <li class="list-group-item">Version: {{ sensor.version }}</li>
      </ul>
      <div class="card-body">
        <button class="btn btn-primary">MORE</button>
        <button class="btn btn-primary" @click="deleteSensor">DELETE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: ["sensor"],

  computed: {
    plant() {
      return this.$store.getters.plantById(this.sensor.plantID);
    },
  },

  methods: {
    async deleteSensor() {
      try {
        const response = await window.axios.delete(
          "/sensors/" + this.sensor.id
        );
        console.log(response);
        this.$emit("deleteSensor", this.sensor);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 150px;
}

.card {
  border: 1px solid lightgray;
  border-radius: 2px;
}
</style>