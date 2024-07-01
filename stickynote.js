document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const addNoteButton = document.getElementById("addNote");

    addNoteButton.addEventListener("click", addNote);

    function addNote() {
        const note = document.createElement("div");
        note.classList.add("note");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "✖";
        note.appendChild(deleteButton);

        const textarea = document.createElement("textarea");
        note.appendChild(textarea);

        note.style.top = `${Math.random() * (board.clientHeight - 150)}px`;
        note.style.left = `${Math.random() * (board.clientWidth - 150)}px`;

        board.appendChild(note);

        note.addEventListener("mousedown", (e) => startDrag(e, note));
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteNote(note);
        });

        note.addEventListener("click", (e) => {
            e.stopPropagation();
            selectNote(note);
        });

        document.addEventListener("click", deselectNotes);
    }

    function startDrag(e, note) {
        const shiftX = e.clientX - note.getBoundingClientRect().left;
        const shiftY = e.clientY - note.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            note.style.left = pageX - shiftX + 'px';
            note.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        note.onmouseup = () => {
            document.removeEventListener("mousemove", onMouseMove);
            note.onmouseup = null;
        };

        note.ondragstart = () => false;
    }

    function deleteNote(note) {
        note.remove();
    }

    function selectNote(note) {
        deselectNotes();
        note.classList.add("selected");
    }

    function deselectNotes() {
        const notes = document.querySelectorAll(".note");
        notes.forEach(note => note.classList.remove("selected"));
    }
});