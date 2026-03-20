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

const pesquisa = document.getElementById("pesquisa");
const livru = document.querySelectorAll(".livroz");

pesquisa.addEventListener("keyup", function () {

    let texto = pesquisa.value.toLowerCase();

    livru.forEach(function (livro) {

        let titulo = livro.querySelector("h3").innerText.toLowerCase();
        let autor = livro.querySelector("h5").innerText.toLowerCase();


        if (titulo.includes(texto) || autor.includes(texto)) {

        livro.style.display = "flex";
    }else {
        livro.style.display = "none";
    }

});

});
