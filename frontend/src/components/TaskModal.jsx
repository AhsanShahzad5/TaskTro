// components/TaskModal.jsx
import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import noteContext from "../context/notes/NotesContext";

const TaskModal = ({ showModal, setShowModal }) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [task, setTask] = useState({ title: "", description: "", tag: "", dueDate: new Date() });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setTask({ ...task, dueDate: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(task.title, task.description, task.tag, task.dueDate);
        setTask({ title: "", description: "", tag: "", dueDate: new Date() });
        setShowModal(false);
    };

    return (
        <>
            {showModal ? (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={task.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={task.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Tag</label>
                                <select
                                    name="tag"
                                    value={task.tag}
                                    onChange={handleChange}
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
                                    selected={task.dueDate}
                                    onChange={handleDateChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default TaskModal;
