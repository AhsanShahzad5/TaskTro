// components/TaskItem.jsx
import React, { useState, useContext } from 'react';
import noteContext from "../context/notes/NotesContext";

const TaskItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;
    const { note, updateNote } = props;
    const [btnIsChecked, setbtnIsChecked] = useState(false);
    const handleStatusChange = () => {
        const newStatus = note.status === "in-progress" ? "done" : "in-progress";
        editNote(note._id, note.title, note.description, note.tag, note.dueDate, newStatus);
        setbtnIsChecked(!btnIsChecked);
    };



    return (
        <div className={`bg-white p-4 rounded-lg shadow-md m-2 ${note.status === 'done' ? 'bg-gray-200 line-through' : ''} `}>
            <div className="flex justify-between items-center">

                
                <input
                    type="checkbox"
                    name="taskStatus"
                    id="taskStatus"
                    className={` border-red-500 rounded-full w-3 h-3 cursor-pointer mr-3.5 ${btnIsChecked ? 'bg-red-500' : 'bg-white'}`}
                    onClick={handleStatusChange}
                />



                <h3 className="text-xl font-semibold">{note.title}</h3>
                <div>
                    {/* <button onClick={handleStatusChange}>
                        {note.status === "in-progress" ? "Mark as Done" : "Mark as In-Progress"}
                </button> */}


                    <button
                        className="text-red-500 mx-2 hover:text-underline-red-500 hover:underline hover:decoration-red-400"
                        onClick={() => deleteNote(note._id)}
                    >
                        Delete
                    </button>
                    <button
                        className="text-red-500 mx-2 hover:underline hover:decoration-red-400"
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
