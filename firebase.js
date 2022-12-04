import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtcDg092MQD-AFjV9lvxtFb_2wykSfSJ4",
  authDomain: "e-bazar-1c970.firebaseapp.com",
  projectId: "e-bazar-1c970",
  //databaseURL: "https://e-bazar-1c970.firebaseio.com",
  storageBucket: "e-bazar-1c970.appspot.com",
  messagingSenderId: "134982904466",
  appId: "1:134982904466:web:410b5a774fd104ca4b944b",
  measurementId: "G-D5EYPHP8SP",
};

const app = firebase.initializeApp(firebaseConfig);
//const authentication = getAuth(app);
export default firebase;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase


