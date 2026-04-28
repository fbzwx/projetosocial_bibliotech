function abrirlivro(title, author, imgSrc, description, pdf) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalAuthor').innerText = author;
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalDesc').innerText = description;

    document.getElementById('modalPdf').href = pdf;

    document.getElementById('modal').style.display = 'flex';

}
function fecharLivro() {
    document.getElementById('modal').style.display = 'none';
}


const filtro = document.getElementById("filtroLivros");
const livros = document.querySelectorAll(".livroz");

filtro.addEventListener("change", function () {

    const categoria = this.value;

    livros.forEach(function (livro) {

        if (categoria === "todos") {
            livro.style.display = "flex";
        }

        else if (livro.dataset.categoria === categoria) {
            livro.style.display = "flex";
        }

        else {
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

        let titulo = removerAcentos(livro.querySelector("h3").innerText.toLowerCase());
        let autor = removerAcentos(livro.querySelector("h5").innerText.toLowerCase());

        if (titulo.includes(texto) || autor.includes(texto)) {
            livro.style.display = "flex";
        } else {
            livro.style.display = "none";
        }

    });

});

function toggleFavorito(botao, id) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.includes(id)) {
        // remover
        favoritos = favoritos.filter(item => item !== id);
        botao.classList.remove('ativo');
    } else {
        // adicionar
        favoritos.push(id);
        botao.classList.add('ativo');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}


// quando carregar a página, manter selecionados
window.onload = function() {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    document.querySelectorAll('.btn-favorito').forEach(botao => {
        let id = botao.getAttribute('data-id');

        if (favoritos.includes(id)) {
            botao.classList.add('ativo');
        }
    });
}