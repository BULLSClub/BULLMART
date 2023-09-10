// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARNf1NRpeUoAVl-Gu0NGc4zCwVmKqGP_c",
  authDomain: "bullsclub-8655a.firebaseapp.com",
  projectId: "bullsclub-8655a",
  storageBucket: "bullsclub-8655a.appspot.com",
  messagingSenderId: "183611305392",
  appId: "1:183611305392:web:f3a92c5ca8e986cb07fa75",
  measurementId: "G-5GH9XSK5DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);