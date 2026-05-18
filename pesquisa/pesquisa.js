import { auth, db } from "../firebase/firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("nomeUsuario").innerText =
      "Bem-vindo, " + user.displayName;

    const foto = document.getElementById("fotoUsuario");

    if (user.photoURL) {
      foto.src = user.photoURL;
    } else {
      foto.style.display = "none";
    }

    carregarFavoritos();
  } else {
    window.location.href = "../login/login.html";
  }
});

function abrirlivro(title, author, imgSrc, description, pdf) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalAuthor").innerText = author;
  document.getElementById("modalImg").src = imgSrc;
  document.getElementById("modalDesc").innerText = description;
  document.getElementById("modalPdf").href = pdf;
  document.getElementById("modal").style.display = "flex";
}

window.abrirlivro = abrirlivro;

function fecharLivro() {
  document.getElementById("modal").style.display = "none";
}

window.fecharLivro = fecharLivro;

const filtro = document.getElementById("filtroLivros");
const livros = document.querySelectorAll(".livroz");

filtro.addEventListener("change", function () {
  const categoria = this.value;

  livros.forEach(function (livro) {
    if (categoria === "todos" || livro.dataset.categoria === categoria) {
      livro.style.display = "flex";
    } else {
      livro.style.display = "none";
    }
  });
});

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const pesquisa = document.getElementById("pesquisa");
const livru = document.querySelectorAll(".livroz");

pesquisa.addEventListener("keyup", function () {
  let texto = removerAcentos(pesquisa.value.toLowerCase());

  livru.forEach(function (livro) {
    let titulo = removerAcentos(
      livro.querySelector("h3").innerText.toLowerCase(),
    );
    let autor = removerAcentos(
      livro.querySelector("h5").innerText.toLowerCase(),
    );

    if (titulo.includes(texto) || autor.includes(texto)) {
      livro.style.display = "flex";
    } else {
      livro.style.display = "none";
    }
  });
});

// ✅ Agora recebe titulo, autor e capa para salvar no Firestore
async function toggleFavorito(botao, id, titulo, autor, capa) {
  const user = auth.currentUser;

  if (!user) {
    alert("Faça login para favoritar livros.");
    return;
  }

  const ref = doc(db, "users", user.uid, "favorites", id);
  const favoritoExiste = await getDoc(ref);

  if (favoritoExiste.exists()) {
    await deleteDoc(ref);
    botao.classList.remove("ativo");
  } else {
    await setDoc(ref, {
      id: id,
      titulo: titulo,
      autor: autor,
      capa: capa,
    });
    botao.classList.add("ativo");
  }
}

window.toggleFavorito = toggleFavorito;

async function carregarFavoritos() {
  const user = auth.currentUser;
  if (!user) return;

  document.querySelectorAll(".favori").forEach(async (botao) => {
    const id = botao.getAttribute("data-id");
    const ref = doc(db, "users", user.uid, "favorites", id);
    const favoritoExiste = await getDoc(ref);

    if (favoritoExiste.exists()) {
      botao.classList.add("ativo");
    }
  });
}
