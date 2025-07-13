import React, { useState } from 'react';
import API from '../api';

const TaskList = ({ tasks, setTasks }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(task => task._id !== id));
  };

  const startEdit = (task, index) => {
    setEditIndex(index);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = async (id) => {
    const updatedTask = {
      title: editTitle,
      description: editDescription,
    };

    const { data } = await API.put(`/tasks/${id}`, updatedTask);
    const newTasks = [...tasks];
    newTasks[editIndex] = data;
    setTasks(newTasks);
    setEditIndex(null);
  };

  return (
    <section className="task-display">
      {tasks.map((task, index) => (
        <div key={task._id} className="task-card">
          {editIndex === index ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <button onClick={() => saveEdit(task._id)}>💾 Save</button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
                {task.description}
              </label>
              <p>{task.time}</p>
              <button onClick={() => startEdit(task, index)}>✏️ Edit</button>
              <button className="delete-btn" onClick={() => deleteTask(task._id)}>🗑️</button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default TaskList;
