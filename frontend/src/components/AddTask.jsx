// components/AddTask.jsx
import React, { useState } from 'react';
import TaskModal from './TaskModal';

const AddTask = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="container my-3">
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(true)}
            >
                Create Task
            </button>
            <TaskModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default AddTask;
