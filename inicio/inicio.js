
import { db } from "../firebase/firebase.js";

console.log("Firebase funcionando");

const nome = localStorage.getItem("nome");

if(nome){
  document.getElementById("area-login").style.display = "none";
  document.getElementById("area-usuario").style.display = "block";
  document.getElementById("nomeUsuario").innerText = "Bem-vindo, " + nome;
}

