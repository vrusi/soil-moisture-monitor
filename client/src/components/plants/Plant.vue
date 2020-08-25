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
          <li class="list-group-item">PERCENTAGE</li>
          <li class="list-group-item">MOISTURE</li>
        </ul>
        <div class="card-body">
          <a :href="'/plants/' + plant.id" class="card-link">MORE</a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ["plant"],
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