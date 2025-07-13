import React, { useState } from 'react';
import API from '../api';

const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert("No token found. Please login again.");

    let userId;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id;
    } catch (error) {
      return alert("Invalid token format.");
    }

    const newTask = {
      title,
      description,
      completed: false,
      time: new Date().toLocaleDateString(),
      userId,
    };

    try {
      const { data } = await API.post('/tasks', newTask);
      setTasks(prev => [...prev, data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error("Task creation failed:", err);
    }
  };

  return (
    <section className="task-form">
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <button onClick={addTask}>Add</button>
    </section>
  );
};

export default TaskForm;
