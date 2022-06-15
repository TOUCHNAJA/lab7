import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAXCfRl4gRV8NyzpH_RHTHl4PIw-OFPHs8",
  authDomain: "crud-69996.firebaseapp.com",
  projectId: "crud-69996",
  storageBucket: "crud-69996.appspot.com",
  messagingSenderId: "213154628120",
  appId: "1:213154628120:web:d3ee83dbe6a7748249b96d",
  measurementId: "G-38ZMZG931X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


const firestore = firebase.firestore();

export default firebase;