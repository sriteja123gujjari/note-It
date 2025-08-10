const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function upadteStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function attachEvents() {
    const deleteBtns = notesContainer.querySelectorAll("img");
    deleteBtns.forEach(btn => {
        btn.onclick = function () {
            btn.parentElement.remove();
            upadteStorage();
        };
    });

    const noteContents = notesContainer.querySelectorAll(".note-content");
    noteContents.forEach(content => {
        content.oninput = upadteStorage;
    });
}

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    attachEvents();
}
showNotes();

createBtn.addEventListener("click", () => {
    const note = document.createElement("div");
    note.className = "note";

    const noteContent = document.createElement("div");
    noteContent.className = "note-content";
    noteContent.setAttribute("contenteditable", "true");

    const deleteBtn = document.createElement("img");
    deleteBtn.src = "delete.png";
    deleteBtn.onclick = function () {
        note.remove();
        upadteStorage();
    };

    noteContent.oninput = upadteStorage;

    note.appendChild(deleteBtn);
    note.appendChild(noteContent);
    notesContainer.appendChild(note);

    upadteStorage();
});