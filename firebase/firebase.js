import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhLOg2JXGjepRihKLDuOpDo0dOgXTvpbc",
  authDomain: "projeto-social-bibliotec-f60e8.firebaseapp.com",
  projectId: "projeto-social-bibliotec-f60e8",
  storageBucket: "projeto-social-bibliotec-f60e8.firebasestorage.app",
  messagingSenderId: "418574234749",
  appId: "1:418574234749:web:fb4b96b5079fa8e5b3ad14",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
