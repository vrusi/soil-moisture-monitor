<template>
  <div class="row">
    <div class="card" style="width:50rem;">
      <h1>{{ sensor.label }}</h1>
      <div class="card-body">
        <h5 class="card-title">Associated Plant: {{ sensor.plantID }}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Air Value: {{ sensor.airValue }}</li>
        <li class="list-group-item">Water Value: {{ sensor.waterValue }}</li>
        <li class="list-group-item">Version: {{ sensor.version }}</li>
      </ul>
      <div class="card-body">
        <a :href="'/sensors/' + sensor.id" class="card-link">MORE</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plants: [],
    };
  },
  props: ["sensor"],
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