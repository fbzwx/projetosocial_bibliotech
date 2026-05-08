import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const errorText = document.getElementById("loginError");

// LOGIN EMAIL/SENHA
window.entrar = async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);

    errorText.textContent = "";
    window.location.href = "../pesquisa/pesquisa.html";

  } catch (error) {

    if (error.code === "auth/user-not-found") {
      alert("Usuário não encontrado");

    } else if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/invalid-credential"
    ) {
      errorText.textContent = "Senha ou email incorretos";

    } else {
      errorText.textContent = "Erro ao fazer login";
    }
  }
};

// LOGIN GOOGLE
window.googleLogin = async function () {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);

    window.location.href = "../pesquisa/pesquisa.html";

  } catch (error) {
    errorText.textContent = "Erro ao entrar com Google";
  }
};