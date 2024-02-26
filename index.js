async function searchNotes() {
    const searchInput = document.getElementById('search').value;
    // Implement the search functionality using the CRUD CRUD API
    try {
      const response = await fetch('https://crudcrud.com/api/2db9ebe53e8944c18e64fd638dfd7396/yourNotesCollection');
      const data = await response.json();
      const filteredNotes = data.filter(note => note.title.toLowerCase().includes(searchInput.toLowerCase()));
      document.getElementById('showing').textContent = filteredNotes.length;
      // Display the filtered notes
      displayNotes(filteredNotes);
    } catch (error) {
      console.error('Error searching notes:', error);
    }
  }
  
  async function addBook() {
    const newTitleInput = document.getElementById('newTitle');
    const noteDescriptionInput = document.getElementById('noteDescription');
    const newTitle = newTitleInput.value;
    const noteDescription = noteDescriptionInput.value;
    // Implement the add functionality using the CRUD CRUD API
    try {
      const response = await fetch('https://crudcrud.com/api/2db9ebe53e8944c18e64fd638dfd7396/yourNotesCollection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, description: noteDescription }),
      });
      const data = await response.json();
      // Fetch the updated list of notes and display them
      fetchAndDisplayNotes();
      // Clear the input fields
      newTitleInput.value = '';
      noteDescriptionInput.value = '';
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }
  
  
  async function deleteBook(bookId) {
    // Implement the delete functionality using the CRUD CRUD API
    try {
      await fetch(`https://crudcrud.com/api/2db9ebe53e8944c18e64fd638dfd7396/yourNotesCollection/${bookId}`, {
        method: 'DELETE',
      });
      // Fetch the updated list of notes and display them
      fetchAndDisplayNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }
  
  async function fetchAndDisplayNotes() {
    try {
      const response = await fetch('https://crudcrud.com/api/2db9ebe53e8944c18e64fd638dfd7396/yourNotesCollection');
      const data = await response.json();
      document.getElementById('totalBooks').textContent = data.length;
      displayNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
  
  function displayNotes(notes) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    notes.forEach(note => {
      const li = document.createElement('li');
      li.textContent = `${note.title}: ${note.description}`;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteBook(note._id));
      li.appendChild(deleteButton);
      bookList.appendChild(li);
    });
  }
  
  // Fetch the initial book list on page load
  window.onload = fetchAndDisplayNotes;