<template>
  <div>
    <div id="app">
      <app-header></app-header>
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/plants">Plants</router-link>|
        <router-link to="/sensors">Sensors</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    appHeader: Header,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
