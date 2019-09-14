<template>
  <div id="app">
    <app-navbar></app-navbar>
    <router-view/>
  </div>
</template>

<script>

import Navbar from './components/layouts/Navbar.vue'

export default {
  name: 'App',
  components: {
    "app-navbar": Navbar
  }
}
</script>

<style>

</style>
