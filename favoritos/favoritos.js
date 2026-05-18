import { auth, db } from "../firebase/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const lista = document.getElementById("listaFavoritos");
const nomeUsuario = document.getElementById("nomeUsuario");
const fotoUsuario = document.getElementById("fotoUsuario");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "../login/login.html";
    return;
  }

  if (nomeUsuario) nomeUsuario.innerText = user.displayName || "Meu Perfil";
  if (fotoUsuario && user.photoURL) fotoUsuario.src = user.photoURL;

  lista.innerHTML = "<p>Carregando favoritos...</p>";

  try {
    const favoritesCollection = collection(db, "users", user.uid, "favorites");
    const querySnapshot = await getDocs(favoritesCollection);

    if (querySnapshot.empty) {
      lista.innerHTML = "<p>Ainda não tens livros favoritados.</p>";
      return;
    }

    lista.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
      const livro = docSnap.data();
      const titulo = livro.titulo || docSnap.id;
      const autor = livro.autor || "Autor não informado";
      const capa =
        livro.capa || "https://via.placeholder.com/220x300?text=Sem+Capa";

      const divLivro = document.createElement("div");
      divLivro.classList.add("livro");
      divLivro.innerHTML = `
        <img src="${capa}" alt="Capa de ${titulo}"
             onerror="this.src='https://via.placeholder.com/220x300?text=Sem+Capa'">
        <h2>${titulo}</h2>
        <p>${autor}</p>
      `;
      lista.appendChild(divLivro);
    });
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    lista.innerHTML =
      "<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>";
  }
});
