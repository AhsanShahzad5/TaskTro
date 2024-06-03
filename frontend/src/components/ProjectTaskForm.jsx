import React, { useState, useEffect } from 'react';

const ProjectTaskForm = ({ task, onSave, onDelete }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  const onChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(taskData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-red-500">Task Title</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={onChange}
          className="w-full p-2 border border-red-500 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-red-500">Description</label>
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={onChange}
          className="w-full p-2 border border-red-500 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-red-500">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={onChange}
          className="w-full p-2 border border-red-500 rounded"
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-red-500">Status</label>
        <select
          name="status"
          value={taskData.status}
          onChange={onChange}
          className="w-full p-2 border border-red-500 rounded"
        >
          <option value="Pending">done</option>
          <option value="In Progress">in-progress</option>
          {/* <option value="Completed">Completed</option> */}
        {/* </select> */}
      {/* </div> */}
      <div className="flex justify-end">
        {task && <button type="button" onClick={onDelete} className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>}
        <button type="submit" className="bg-red-500 text-white p-2 rounded">Save</button>
      </div>
    </form>
  );
};

export default ProjectTaskForm;
