<template>
  <div class="app-signup container">
    <form class="card-panel" @submit.prevent="signUp()">
      <h4 class="center deep-purple-text">Sign Up</h4>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "../../firebase/init";
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signUp() {
      if (this.alias && this.email && this.password) {
        this.feedback = null;

        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        });

        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This alias already exists!";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref
                  .set({
                    alias: this.alias,
                    geolocation: null,
                    user_id: cred.user.uid
                  })
                  .then(() => {
                    this.$router.push({
                      name: "GMap"
                    });
                  });
              })
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
          }
        });
      } else {
        this.feedback = "Please enter all fields.";
      }
    }
  }
};
</script>

<style>
.app-signup {
  max-width: 400px;
  margin-top: 100px;
}

.app-signup h4 {
  font-size: 2.4em;
}

.app-signup .field {
  margin-bottom: 16px;
}
</style>