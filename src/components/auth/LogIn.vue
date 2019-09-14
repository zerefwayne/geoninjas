<template>
  <div class="app-login container">
    <form class="card-panel" @submit.prevent="logIn()">
      <h4 class="center deep-purple-text">Log In</h4>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Log In</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase";

export default {
  name: "LogIn",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    logIn() {
      this.feedback = null;

      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.$router.push({name: 'GMap'})
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Please enter all details.";
      }
    }
  }
};
</script>

<style>
.app-login {
  max-width: 400px;
  margin-top: 100px;
}

.app-login h4 {
  font-size: 2.4em;
}

.app-login .field {
  margin-bottom: 16px;
}
</style>