import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card, CardContent } from "../components/Card"; // Corrected import
import ChartComponent from "../components/ChartComponent";
import styles from "../styles/Dashboard.module.scss";
import style from "../styles/Card.module.scss";

export const Dashboard = () => {
  const role = useSelector((state) => state.auth.role) || "employee"; // Default to "employee"
  
  useEffect(() => {
    console.log("User Role:", role);
    console.log("Notifications for this role:", notifications[role]);
  }, [role]);

  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedChart, setSelectedChart] = useState("bar");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        const data = response.data.products.slice(0, 5).map((product) => ({
          name: product.title,
          value: product.rating,
        }));
        setChartData(data);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        setError("Failed to load data. Please try again later.");
      });
  }, []);

  const notifications = {
    admin: [
      { id: 1, message: "New user signed up!" },
      { id: 2, message: "Server updated successfully." },
      { id: 3, message: "Monthly report generated." },
      { id: 4, message: "New security patch applied." },
    ],
    hr: [
      { id: 1, message: "New job application received." },
      { id: 2, message: "Employee performance report available." },
      { id: 3, message: "Payroll processing completed." },
      { id: 4, message: "Upcoming recruitment drive scheduled." },
    ],
    employee: [
      { id: 1, message: "New company announcement!" },
      { id: 2, message: "Upcoming team meeting on Friday." },
      { id: 3, message: "Performance review feedback available." },
      { id: 4, message: "Company-wide holiday on April 10th." },
    ],
  };

  return (
    <main className={styles.dashboard}>
      <div className={styles.gridContainer}>
        {/* Notifications Section */}
        <div className={styles.gridItem}>
          <h3>Notifications</h3>
          {notifications[role]?.length > 0 ? (
            notifications[role].map((note) => (
              <Card key={note.id} className={style.card}>
                <CardContent>{note.message}</CardContent>
              </Card>
            ))
          ) : (
            <p>No notifications available.</p>
          )}
        </div>

        {/* Chart Selector */}
        <div className={styles.gridItem}>
          <h3>Chart Selector</h3>
          <select
            className={styles.selected}
            onChange={(e) => setSelectedChart(e.target.value)}
            value={selectedChart}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="area">Area Chart</option>
            <option value="radar">Radar Chart</option>
          </select>
        </div>
      </div>

      {/* Chart Display */}
      {error ? (
        <div className={styles.errorBox}>
          <p>{error}</p>
        </div>
      ) : (
        <div className={styles.chartContainer}>
          <h3>Statistics</h3>
          <ChartComponent type={selectedChart} data={chartData} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
