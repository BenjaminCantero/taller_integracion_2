// Obtén el modal
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");

// Obtén el botón que abre el modal
const openModalBtn = document.getElementById("openModalBtn");

// Obtén el <span> que cierra el modal
const closeModalBtn = document.getElementById("closeModalBtn");

// Cuando el usuario haga clic en el botón, muestra el modal
openModalBtn.onclick = function() {
    modal.classList.add("active");
    modalContent.classList.add("active");
}

// Cuando el usuario haga clic en <span> (x), cierra el modal
closeModalBtn.onclick = function() {
    modal.classList.remove("active");
    modalContent.classList.remove("active");
}

// Cuando el usuario haga clic fuera del contenido del modal, cierra el modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.remove("active");
        modalContent.classList.remove("active");
    }
}

