// context/notes/NoteState.js

import NoteContext from "./NotesContext";
import { useState } from "react";
import { getAuthToken } from "../../utility/JWTtokenExport"; // Import the utility function

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    const token = getAuthToken();
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag, dueDate , status = "in-progress") => {
    const token = getAuthToken();
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({ title, description, tag, dueDate , status })
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    });
    await response.json();
    const newNotes = notes.filter(note => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag, dueDate,status) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ title, description, tag, dueDate , status })
        });

        const data = await response.json();
        if (response.ok) {
            let newNotes = notes.map(note => note._id === id ? data : note);
            setNotes(newNotes);
        } else {
            console.error('Failed to update note:', data);
        }
    } catch (error) {
        console.error('Error updating note:', error);
    }
};
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
