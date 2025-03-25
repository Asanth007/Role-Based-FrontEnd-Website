import React, { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent"; // Ensure this exists
import styles from "../styles/Reports.module.scss"; // SCSS module
import Loading from "./Loading";
const ReportPage = () => {
  const [kpis, setKpis] = useState(null);
  const [chartTypes, setChartTypes] = useState({
    chart1: "bar",
    chart2: "line",
    chart3: "pie",
    chart4: "area",
  });

  useEffect(() => {
    const dummyData = {
      kpis: {
        totalUsers: 1200,
        revenue: 25000,
        totalReports: 300,
        pendingTasks: 45,
      },
    };

    setTimeout(() => {
      setKpis(dummyData.kpis);
    }, 1000); // Simulate API delay
  }, []);

  const handleChartChange = (chart, type) => {
    setChartTypes((prev) => ({ ...prev, [chart]: type }));
  };

  if (!kpis)
    return (
      <div><Loading/></div>
    );

  const chartColors = ["#6c5ce7", "#c792ea", "#ff7675", "#00cec9"];
  const chartData = [
    { name: "Users", value: kpis.totalUsers, color: chartColors[0] },
    { name: "Revenue", value: kpis.revenue, color: chartColors[1] },
    { name: "Reports", value: kpis.totalReports, color: chartColors[2] },
    { name: "Pending", value: kpis.pendingTasks, color: chartColors[3] },
  ];

  return (
    <div className={styles["report-page"]}>
      <h2 className={styles.title}>Admin Report Dashboard</h2>

      {/* KPI Cards */}
      <div className={styles["kpi-cards"]}>
        <div className={styles["kpi-card"]}>📊 Total Users: {kpis.totalUsers}</div>
        <div className={styles["kpi-card"]}>💰 Revenue: ${kpis.revenue}</div>
        <div className={styles["kpi-card"]}>📝 Reports: {kpis.totalReports}</div>
        <div className={styles["kpi-card"]}>⏳ Pending: {kpis.pendingTasks}</div>
      </div>

      {/* Charts Section */}
      <div className={styles["charts-grid"]}>
        {["chart1", "chart2", "chart3", "chart4"].map((chartKey, index) => (
          <div key={chartKey} className={styles["chart-container"]}>
            <select
              value={chartTypes[chartKey]}
              onChange={(e) => handleChartChange(chartKey, e.target.value)}
              className={styles["chart-select"]}
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="area">Area Chart</option>
              <option value="radar">Radar Chart</option>
            </select>
            <ChartComponent type={chartTypes[chartKey]} data={chartData} colors={chartColors} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
