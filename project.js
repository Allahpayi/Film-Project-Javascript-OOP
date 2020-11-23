const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clear-films");

// Loading all events

eventListener();
function eventListener() {
    form.addEventListener('submit', addFilm);
    document.addEventListener("DOMContentLoaded", () => {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardbody.addEventListener('click', deleteFilm);
    clear.addEventListener('click', clearAllFilms);
}

function addFilm(e) {
    e.preventDefault();
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        //Error Message
        UI.displayMessages("Fill in all fields...", "danger");
    }
    else {
        // Add Film
        const newFilm = new Film(title, director, url);
        UI.addFilmToUI(newFilm);
        Storage.addFilmToStorage(newFilm); // Add to Storage
        UI.displayMessages("The film was successfully added...", "success");
    }
    UI.clearInputs(titleElement, directorElement, urlElement);

}
function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Deletion is successful...", "success");
    }
}
function clearAllFilms() {
    if (confirm("Are you sure?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
}