import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe_-fiFBdcom3fGgjeFQVAQQU8SXmsPAI",
  authDomain: "neon2-4a71e.firebaseapp.com",
  projectId: "neon2-4a71e",
  storageBucket: "neon2-4a71e.appspot.com",
  messagingSenderId: "810962787090",
  appId: "1:810962787090:web:b98955ab87e37fa4c8f1cb",
  measurementId: "G-CVDF84EFSP",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export { auth };
export default db;
