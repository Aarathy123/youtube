import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDaBP78m9vatXxWrStyxfgOB4qL_ilxMPU",
  authDomain: "prod-8da38.firebaseapp.com",
  databaseURL: "https://prod-8da38-default-rtdb.firebaseio.com",
  projectId: "prod-8da38",
  storageBucket: "prod-8da38.appspot.com",
  messagingSenderId: "221038562078",
  appId: "1:221038562078:web:0a7e4297205796f665570f",
  measurementId: "G-X1NTPKWQ31",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
