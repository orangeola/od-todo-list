// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcfoXdR00ng8JUPUQRruXpWtNfjtythBU",
  authDomain: "odin-todo-list-e5836.firebaseapp.com",
  projectId: "odin-todo-list-e5836",
  storageBucket: "odin-todo-list-e5836.appspot.com",
  messagingSenderId: "869113743875",
  appId: "1:869113743875:web:9f8da55c7e77a9b2d41c36"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, app };