<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Soil Moisture Monitor</router-link>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link to="/plants" activeClass="active" tag="li">
            <a>Plants</a>
          </router-link>
          <router-link to="/sensors" activeClass="active" tag="li">
            <a>Sensors</a>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
};
</script>