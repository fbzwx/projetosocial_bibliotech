const nome = localStorage.getItem("nome");

if(nome){
  document.getElementById("area-login").style.display = "none";
  document.getElementById("area-usuario").style.display = "block";
  document.getElementById("nomeUsuario").innerText = "Bem-vindo, " + nome;
}

