// components/Tasks.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../../context/notes/NotesContext";
import TaskItem from '../../components/TaskItem';
import AddTask from '../../components/AddTask';
import TaskModal from '../../components/TaskModal';

const Tasks = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "", dueDate: new Date() });

    useEffect(() => {
        getNotes();
    }, []);

    const updateNote = (note) => {
        setCurrentNote(note);
        setShowEditModal(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editNote(currentNote.id, currentNote.title, currentNote.description, currentNote.tag, currentNote.dueDate);
        setShowEditModal(false);
    };

    const handleEditChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
    };

    const handleEditDateChange = (date) => {
        setCurrentNote({ ...currentNote, dueDate: date });
    };

    return (
        <>
            <AddTask />
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={currentNote.title}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={currentNote.description}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Tag</label>
                                <select
                                    name="tag"
                                    value={currentNote.tag}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                                    required
                                >
                                    <option value="">Select Tag</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Other Project">Other Project</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Due Date</label>
                                <DatePicker
                                    selected={currentNote.dueDate}
                                    onChange={handleEditDateChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="flex flex-col mt-5">
                {notes.map((note) => (
                    <TaskItem key={note._id} updateNote={updateNote} note={note} />
                ))}
            </div>
        </>
    );
};

export default Tasks;
