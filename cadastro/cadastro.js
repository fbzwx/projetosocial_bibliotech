

import { auth } from "./firebase.js";


import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
}from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";




// CADASTRO EMAIL/SENHA
window.cadastrar = async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

    await updateProfile(userCredential.user, {
      displayName: nome
    });

    window.location.href = "../pesquisa/pesquisa.html";

  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};


// GOOGLE LOGIN
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("googleBtn").addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);

      window.location.href = "../pesquisa/pesquisa.html";

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  });
});
