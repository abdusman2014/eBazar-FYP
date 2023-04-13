// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtcDg092MQD-AFjV9lvxtFb_2wykSfSJ4",
  authDomain: "e-bazar-1c970.firebaseapp.com",
  projectId: "e-bazar-1c970",
  storageBucket: "e-bazar-1c970.appspot.com",
  messagingSenderId: "134982904466",
  appId: "1:134982904466:web:f2fd0e16105b8ee94b944b",
  measurementId: "G-5PCG76EZMC"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const authentication = getAuth(app);
export default firebase;