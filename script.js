// ====================================================
// 1. DOM Element Selection (using querySelector)
// ====================================================
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all-btn");

// Storage key for localStorage
const STORAGE_KEY = "quicknotes_app_data";

// ====================================================
// 2. Application State & Storage
// ====================================================
// Array of objects: [{ id, text, category, createdAt }]
let notes = loadNotesFromStorage();

// Load notes safely using JSON.parse
function loadNotesFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse notes from localStorage:", e);
      return [];
    }
  }
  return [];
}

// Save notes using JSON.stringify
function saveNotesToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ====================================================
// 3. Helper: Date Formatter
// ====================================================
function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(date);
}

// ====================================================
// 4. Update Note Count Function
// ====================================================
function updateNoteCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// ====================================================
// 5. Render Function (Never uses innerHTML for user text)
// ====================================================
function render(notesToRender = notes) {
  // Clear the list container
  notesList.replaceChildren();

  // If there are search results or notes exist
  const query = searchInput.value.trim();

  if (notesToRender.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-state";
    
    if (query !== "") {
      emptyLi.textContent = "No notes match your search.";
    } else {
      emptyLi.textContent = "No notes available. Add one above!";
    }
    notesList.appendChild(emptyLi);
    updateNoteCount(notes.length);
    return;
  }

  // Iterate over each note object and build DOM elements
  notesToRender.forEach((note) => {
    // <li> wrapper for card
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;
    li.dataset.id = note.id;

    // Content container
    const contentDiv = document.createElement("div");
    contentDiv.className = "note-content";

    // Note Text (using textContent for XSS protection)
    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text;

    // Metadata container (category badge + date)
    const metaDiv = document.createElement("div");
    metaDiv.className = "note-meta";

    const badgeSpan = document.createElement("span");
    badgeSpan.className = "category-badge";
    badgeSpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    metaDiv.appendChild(badgeSpan);
    metaDiv.appendChild(dateSpan);

    contentDiv.appendChild(textP);
    contentDiv.appendChild(metaDiv);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", `Delete note: ${note.text.substring(0, 20)}...`);

    // Attach delete event directly
    deleteBtn.addEventListener("click", () => {
      deleteNote(note.id);
    });

    // Assemble and append to list
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });

  // Always reflect the total notes count in the counter
  updateNoteCount(notes.length);
}

