import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/LeaveManagement.module.scss";
import Loading from "../components/Loading";
export const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [newLeave, setNewLeave] = useState({ name: "", reason: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch existing leave requests
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5") // Fake API
      .then((response) => {
        const leaveData = response.data.map((item) => ({
          id: item.id,
          name: `Employee ${item.id}`,
          reason: item.title,
          date: "2025-03-24", // Static date for demo
        }));
        setLeaves(leaveData);
      })
      .catch((error) => console.error("Error fetching leaves:", error))
      .finally(() => setLoading(false));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  // Add new leave request
  const handleAddLeave = () => {
    if (!newLeave.name || !newLeave.reason || !newLeave.date) return alert("All fields are required!");

    const leave = { ...newLeave, id: Date.now() };
    setLeaves([...leaves, leave]);
    setNewLeave({ name: "", reason: "", date: "" });
    setIsModalOpen(false);
  };

  // Delete leave request
  const handleDelete = (id) => {
    setLeaves(leaves.filter((leave) => leave.id !== id));
  };

  if (loading) return <Loading/>;

  return (
    <div className={styles.leaveManagement}>
      <h1>Leave Management</h1>

      {/* Leave List */}
      <div className={styles.leaveList}>
        {leaves.map((leave) => (
          <div key={leave.id} className={styles.leaveCard}>
            <p><strong>{leave.name}</strong></p>
            <p>📅 {leave.date}</p>
            <p>📝 {leave.reason}</p>
            <button className={styles.deleteBtn} onClick={() => handleDelete(leave.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Add Leave Button */}
      <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>+ Request Leave</button>

      {/* Modal for New Leave Request */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Request Leave</h2>
            <input type="text" name="name" placeholder="Employee Name" value={newLeave.name} onChange={handleChange} />
            <input type="date" name="date" value={newLeave.date} onChange={handleChange} />
            <textarea name="reason" placeholder="Reason for leave" value={newLeave.reason} onChange={handleChange} />
            <button onClick={handleAddLeave}>Submit</button>
            <button className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
