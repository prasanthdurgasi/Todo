// src/pages/Todo.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import '../styles/todo.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [username, setUsername] = useState('');

  // Fetch user and tasks after mounting
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      setUsername(res.data.name);
      fetchTasks(); // Only fetch tasks after confirming user
    } catch (err) {
      console.error('Not authenticated, redirecting to login.');
      window.location.href = '/login';
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!title.trim()) return;

    try {
      if (editId) {
        const res = await API.put(`/tasks/${editId}`, {
          title,
          description,
          time: new Date().toLocaleDateString(),
        });
        setTasks(tasks.map(task => task._id === editId ? res.data : task));
        setEditId(null);
      } else {
        const res = await API.post('/tasks', {
          title,
          description,
          time: new Date().toLocaleDateString(),
        });
        setTasks([...tasks, res.data]);
      }

      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleComplete = async (index) => {
    const updated = [...tasks];
    const task = updated[index];
    task.completed = !task.completed;
    setTasks(updated);
    try {
      await API.put(`/tasks/${task._id}`, { completed: task.completed });
    } catch (err) {
      console.error('Failed to update completion status:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await API.get('/auth/logout'); // ✅ changed from POST to GET
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h2>Welcome, {username} 👋</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="todo-form">
        <input
          type="text"
          placeholder="Enter a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>{editId ? 'Update' : 'Add'}</button>
      </div>

      <section className="task-display">
        {tasks.map((task, index) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleComplete(index)}
              />
              <span className={task.completed ? 'completed' : ''}>
                {task.description}
              </span>
            </label>
            <p>{task.time}</p>
            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>✏️</button>
              <button onClick={() => handleDelete(task._id)}>🗑️</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Todo;
