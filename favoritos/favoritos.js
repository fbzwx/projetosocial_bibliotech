import { auth, db } from "../firebase/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const lista = document.getElementById("listaFavoritos");
const nomeUsuario = document.getElementById("nomeUsuario");
const fotoUsuario = document.getElementById("fotoUsuario");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Se não houver utilizador logado, redireciona para o login
    window.location.href = "../login/login.html";
    return;
  }

  // Preenche dados do perfil (opcional)
  if (nomeUsuario) nomeUsuario.innerText = user.displayName || "Meu Perfil";
  if (fotoUsuario && user.photoURL) fotoUsuario.src = user.photoURL;

  lista.innerHTML = "<p>A carregar os teus favoritos...</p>";

  try {
    // Referência para a subcoleção "favorites" dentro do documento do utilizador
    const favoritesCollection = collection(db, "users", user.uid, "favorites");
    const querySnapshot = await getDocs(favoritesCollection);

    if (querySnapshot.empty) {
      lista.innerHTML = "<p>Ainda não tens livros favoritados.</p>";
      return;
    }

    lista.innerHTML = ""; // Limpa a mensagem de carregamento
querySnapshot.forEach((doc) => {
  const livro = doc.data();
  
  // Se o campo 'titulo' não existir, ele usa o ID do documento (ex: "O Relogio de Ouro")
  const titulo = livro.titulo || doc.id; 
  const autor = livro.autor || "Autor não informado";
  const capa = livro.capa || "https://via.placeholder.com/220x300?text=Sem+Capa";

  lista.innerHTML += `
    <div class="livro">
      <img src="${capa}" alt="Capa do livro">
      <h2>${titulo}</h2>
      <p>${autor}</p>
    </div>
  `;
});
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    lista.innerHTML = "<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>";
  }
});

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

asquerySnapshot.forEach((doc) => {
    try {
        const livro = doc.data();
        
        // 1. Garantir que temos os textos (ou fallback)
        const titulo = livro.titulo || doc.id; 
        const autor = livro.autor || "Autor não informado";
        
        // 2. Limpar o caminho da capa (remover espaços e garantir que existe)
        let capaLink = "";
        if (livro.capa && typeof livro.capa === 'string') {
            capaLink = livro.capa.trim();
        } else {
            capaLink = "../capa_livros/padrao.jpg"; // Imagem caso o campo esteja vazio
        }

        // 3. Criar o elemento via DOM (mais seguro que innerHTML +=)
        const divLivro = document.createElement("div");
        divLivro.classList.add("livro");

        divLivro.innerHTML = `
            <img src="${capaLink}" alt="Capa do livro" onerror="this.onerror=null;this.src='../capa_livros/padrao.jpg';">
            <h2>${titulo}</h2>
            <p>${autor}</p>
        `;

        lista.appendChild(divLivro);

    } catch (err) {
        console.error("Erro ao renderizar um livro específico:", err);
    }
});