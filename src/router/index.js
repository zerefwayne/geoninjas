import Vue from "vue";
import Router from "vue-router";
import GMap from "@/components/home/GMap.vue";
import SignUp from "@/components/auth/SignUp.vue";
import LogIn from "@/components/auth/LogIn.vue";
import ViewProfile from "@/components/profile/ViewProfile.vue";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "GMap",
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "LogIn",
      component: LogIn,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/profile/:id",
      name: "ViewProfile",
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({ name: "LogIn" });
    }
  } else {
    next();
  }
});

export default router;
