import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyAg32Y9p9DZrpx5YYEPJ8vZsC7ccGG3C0I",
  authDomain: "geoninjas-50502.firebaseapp.com",
  databaseURL: "https://geoninjas-50502.firebaseio.com",
  projectId: "geoninjas-50502",
  storageBucket: "",
  messagingSenderId: "1042631735769",
  appId: "1:1042631735769:web:abd8bd1ece7cc9241a81c8"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
