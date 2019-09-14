<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{name: 'GMap'}" class="brand-logo left">GeoNinjas</router-link>
        <ul class="right">
          <li v-if="!user">
            <router-link :to="{name: 'SignUp'}" tag="a">Sign Up</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{name: 'LogIn'}" tag="a">Log In</router-link>
          </li>
          <li v-if="user">{{ user.email }}</li>
          <li v-if="user">
            <a @click="logOut()">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "LogIn" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style>
</style>