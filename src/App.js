import React, { useState } from 'react';
import './App.css';
import { notes as initialNotes } from './data';

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [currentNote, setCurrentNote] = useState("");

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: currentNote
    };
    setNotes([...notes, newNote]);
    setCurrentNote("");
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  };

  const updateNote = (id, newContent) => {
    const newNotes = notes.map(note => 
      note.id === id ? { ...note, content: newContent } : note
    );
    setNotes(newNotes);
  };

  return (
    <div className="App">
      <h1>Notes CRUD</h1>
      <div>
        <input 
          value={currentNote} 
          onChange={e => setCurrentNote(e.target.value)} 
          placeholder="Enter note content..."
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
            <button onClick={() => {
              const newContent = prompt("Edit note:", note.content);
              if (newContent) updateNote(note.id, newContent);
            }}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
