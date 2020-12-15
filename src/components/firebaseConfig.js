import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDlnvbuTxWkBOVUzQgVhV0OYoFj518eKXA",
  authDomain: "cocktail-app-1d4cb.firebaseapp.com",
  databaseURL: "https://cocktail-app-1d4cb.firebaseio.com",
  projectId: "cocktail-app-1d4cb",
  storageBucket: "cocktail-app-1d4cb.appspot.com",
  messagingSenderId: "1018175919514",
  appId: "1:1018175919514:web:f444ce6e05bce81ef39623",
  measurementId: "G-0MCDNYD42B",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export const firestore = fire.firestore();

export default fire;
