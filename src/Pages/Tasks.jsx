import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Tasks.module.scss"; // Ensure you have styles

const API_URL = "https://jsonplaceholder.typicode.com/todos"; // Dummy API

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch tasks on mount
  useEffect(() => {
    axios
      .get(`${API_URL}?_limit=5`) // Get first 5 tasks
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add a new task
  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task = { title: newTask, completed: false };
    axios
      .post(API_URL, task)
      .then((res) => {
        setTasks([...tasks, res.data]);
        setNewTask("");
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  // Delete a task
  const deleteTask = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.error("Error deleting task:", err));
  };

  // Start editing a task
  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.title);
  };

  // Update a task
  const updateTask = (id) => {
    axios
      .put(`${API_URL}/${id}`, { title: editText })
      .then(() => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, title: editText } : task)));
        setEditingTask(null);
        setEditText("");
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  return (
    <div className={styles.taskContainer}>
      <h2>Task Manager</h2>

      {/* Add Task */}
      <div className={styles.taskInput}>
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {editingTask === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => updateTask(task.id)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
