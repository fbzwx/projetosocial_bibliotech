import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Import the functions you need from the SDKs you nee
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhLOg2JXGjepRihKLDuOpDo0dOgXTvpbc",
  authDomain: "projeto-social-bibliotec-f60e8.firebaseapp.com",
  projectId: "projeto-social-bibliotec-f60e8",
  storageBucket: "projeto-social-bibliotec-f60e8.firebasestorage.app",
  messagingSenderId: "418574234749",
  appId: "1:418574234749:web:fb4b96b5079fa8e5b3ad14"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };