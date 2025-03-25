import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Attendance.module.scss";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

export const EmployeeAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user)

  // Fetch existing attendance records (mock API)
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5") // Fake API
      .then((response) => {
        const data = response.data.map((item) => ({
          id: item.id,
          name: `Employee ${item.id}`,
          date: "2025-03-24", // Static date for demo
          status: Math.random() > 0.5 ? "Present" : "Absent", // Randomly assign status
        }));
        setAttendance(data);
      })
      .catch((error) => console.error("Error fetching attendance:", error))
      .finally(() => setLoading(false));
  }, []);
  
  // Mark Attendance
  const markAttendance = (status) => {
    const newEntry = {
      id: Date.now(),
      name: user.name, // Assume logged-in user
      date: new Date().toISOString().split("T")[0],
      status,
    };
    setAttendance([...attendance, newEntry]);
  };

  if (loading) return <Loading/>;

  return (
    <div className={styles.attendancePage}>
      <h1>Employee Attendance</h1>

      {/* Attendance Actions */}
      <div className={styles.actionButtons}>
        <button className={styles.presentBtn} onClick={() => markAttendance("Present")}>Mark Present</button>
        <button className={styles.absentBtn} onClick={() => markAttendance("Absent")}>Mark Absent</button>
      </div>

      {/* Attendance Table */}
      <div className={styles.tableContainer}>
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.date}</td>
                <td className={entry.status === "Present" ? styles.present : styles.absent}>
                  {entry.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
