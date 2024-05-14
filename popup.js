document.addEventListener('DOMContentLoaded', function() {
  const noteForm = document.getElementById('noteForm');
  const noteInput = document.getElementById('note');
  const savedNotesDiv = document.getElementById('savedNotes');
  const clearButton = document.getElementById('clearButton');
  const toggleButton = document.getElementById('toggle-mode-button');

  // Handle form submission to save the note
  noteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (noteInput.value !== "") {
      const note = noteInput.value;
      saveNote(note);
      noteInput.value = '';
    }
  });

  // Load saved notes from localStorage and display them
  const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
  displaySavedNotes(savedNotes);

  // Function to save the note to localStorage
  function saveNote(note) {
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
    savedNotes.push(note);
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    displaySavedNotes(savedNotes);
  }

  // Function to display saved notes
  function displaySavedNotes(savedNotes) {
    savedNotesDiv.innerHTML = '';
    savedNotes.forEach(note => {
      const newNote = document.createElement('li');
      newNote.textContent = note;
      newNote.classList.add('saved-note');
      savedNotesDiv.appendChild(newNote);
    });
  }

  // Attach event listener to clearButton
  clearButton.addEventListener('click', clearNotes);

  // Attach event listener to toggleButton
  toggleButton.addEventListener('click', function() {
    toggleMode(toggleButton);
  });

  if (localStorage.getItem('colorModeNoteSaver') === 'dark') toggleMode(toggleButton, false);
});

// Function to clear all notes
function clearNotes() {
  localStorage.removeItem('savedNotes');
  const savedNotesDiv = document.getElementById('savedNotes');
  savedNotesDiv.innerHTML = ''; // Clear displayed notes
}

function toggleMode(activatedButton, changeSavedState = true) {
  activatedButton.querySelector('i').classList.toggle('fa-moon');
  activatedButton.querySelector('i').classList.toggle('fa-sun');
  document.querySelector('body').classList.toggle('dark-mode');
  if (changeSavedState) localStorage.setItem('colorModeNoteSaver', localStorage.getItem('colorModeNoteSaver') === 'dark' ? 'light' : 'dark');
}
