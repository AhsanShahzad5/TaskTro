// components/TaskItem.jsx
import React, { useContext } from 'react';
import noteContext from "../context/notes/NotesContext";

const TaskItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md m-2">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <div>
                    <button
                        className="text-red-500 mx-2"
                        onClick={() => deleteNote(note._id)}
                    >
                        Delete
                    </button>
                    <button
                        className="text-red-500 mx-2"
                        onClick={() => updateNote(note)}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <p className="text-gray-700 mt-2">{note.description}</p>
            <p className="text-gray-500 mt-1">{note.tag}</p>
            <p className="text-gray-500 mt-1">Due Date: {new Date(note.dueDate).toLocaleDateString()}</p>
        </div>
    );
};

export default TaskItem;
