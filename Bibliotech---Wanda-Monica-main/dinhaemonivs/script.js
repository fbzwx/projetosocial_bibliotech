const livros = document.querySelectorAll(".livro, .manga");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeBtn = document.getElementById("closeModal");

livros.forEach(livro => {
    livro.addEventListener("click", () => {
        modalTitle.textContent = livro.alt;
        modalText.textContent = livro.dataset.info;
        modal.style.display = "block";
        overlay.style.display = "block";
    });
});

closeBtn.onclick = overlay.onclick = () => {
    modal.style.display = "none";
    overlay.style.display = "none";
};
