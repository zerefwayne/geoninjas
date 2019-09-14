<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase/init";

export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      db.collection("users")
        .get()
        .then(users => {
          users.forEach(doc => {
            let data = doc.data();

            if (data.geolocation) {
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map
              });

              //add click event to marker

              marker.addListener("click", () => {
                this.$router.push({
                  name: "ViewProfile",
                  params: {
                    id: doc.id
                  }
                });
              });
            }
          });
        });
    }
  },
  mounted() {
    let user = firebase.auth().currentUser;
    console.log(user);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        location => {
          this.lat = location.coords.latitude;
          this.lng = location.coords.longitude;

          // find user record and update coordinates

          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: location.coords.latitude,
                      lng: location.coords.longitude
                    }
                  })
                  .then(() => {
                    this.renderMap();
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            })
            .catch(err => {
              console.log(err);
            });
        },
        error => {
          console.log(error);
          this.renderMap();
        },
        {
          maximumAge: 60000,
          timeout: 3000
        }
      );
    } else {
      console.log("Geolocation not supported!");
      this.renderMap();
    }
  }
};
</script>

<style>
.google-map {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  background: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>