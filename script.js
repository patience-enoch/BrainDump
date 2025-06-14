
document.addEventListener('DOMContentLoaded', () => {
  const recordBtn = document.getElementById('recordBtn');
  const toggleDarkMode = document.getElementById('toggleDarkMode');
  const toggleFeatures = document.getElementById('toggleFeatures');
  const advancedFeatures = document.getElementById('advancedFeatures');
  const folderNameInput = document.getElementById('folderName');
  const createFolderBtn = document.getElementById('createFolder');
  const folderSelect = document.getElementById('folderSelect');
  const fontPicker = document.getElementById('fontPicker');
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const notesList = document.getElementById('notesList');
  const deleteSelectedBtn = document.getElementById('deleteSelected');
  const quote = document.getElementById('quote');

  const quotes = [
    "Your brain is not a storage room. Let it flow.",
    "Write it down now, sort it later.",
    "One tap closer to clarity.",
    "Your future self will thank you.",
    "Brain fog? Not anymore."
  ];
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  let notes = [];
  let currentFolder = 'Default';

  function renderNotes() {
    notesList.innerHTML = '';
    notes.filter(note => note.folder === currentFolder).forEach((note, index) => {
      const li = document.createElement('li');
      li.textContent = note.text;
      li.style.fontFamily = fontPicker.value;
      li.style.fontSize = fontSizeSlider.value + 'px';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.index = index;
      li.prepend(checkbox);
      notesList.appendChild(li);
    });
  }

  recordBtn.onclick = () => {
    const note = prompt("Voice memo (text):");
    if (note) {
      notes.push({ text: note, folder: currentFolder });
      renderNotes();
    }
  };

  toggleDarkMode.onclick = () => {
    document.body.classList.toggle('dark');
  };

  toggleFeatures.onclick = () => {
    advancedFeatures.style.display = advancedFeatures.style.display === 'none' ? 'block' : 'none';
  };

  createFolderBtn.onclick = () => {
    const folderName = folderNameInput.value.trim();
    if (folderName) {
      const option = document.createElement('option');
      option.value = folderName;
      option.textContent = folderName;
      folderSelect.appendChild(option);
      folderNameInput.value = '';
    }
  };

  folderSelect.onchange = () => {
    currentFolder = folderSelect.value;
    renderNotes();
  };

  fontPicker.onchange = renderNotes;
  fontSizeSlider.oninput = renderNotes;

  deleteSelectedBtn.onclick = () => {
    const checkboxes = notesList.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
      const index = checkbox.dataset.index;
      notes.splice(index, 1);
    });
    renderNotes();
  };

  advancedFeatures.style.display = 'none';
  const defaultOption = document.createElement('option');
  defaultOption.value = 'Default';
  defaultOption.textContent = 'Default';
  folderSelect.appendChild(defaultOption);
  folderSelect.value = 'Default';
});
