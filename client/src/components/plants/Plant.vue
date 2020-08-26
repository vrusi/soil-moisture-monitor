<template>
  <div class="row">
    <div class="card" style="width:50rem;">
      <img
        class="card-img-top"
        src="https://image.flaticon.com/icons/png/512/628/628283.png"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">{{ plant.name }}</h5>
        <p class="card-text">{{ plant.conditions }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">PLANT STATUS</li>
        <li class="list-group-item">Moisture Percentage: {{ plant.lastMoisturePercentage }}</li>
        <li class="list-group-item">Moisture Value: {{ plant.lastMoistureValue }}</li>
      </ul>
      <div class="card-body">
        <button class="btn btn-primary">MORE</button>
        <button class="btn btn-primary" @click="deletePlant">DELETE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

<style scoped>
img {
  width: 150px;
}

.card {
  border: 1px solid lightgray;
  border-radius: 2px;
}
</style>