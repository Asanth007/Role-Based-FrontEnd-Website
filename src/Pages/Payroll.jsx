import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "../styles/Payroll.module.scss";
import Loading from "../components/Loading";
export const PayrollPage = () => {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        
        // Generate payroll details
        const payrollData = response.data.map(user => ({
          name: user.name,
          role: "Employee",
          salary: Math.floor(Math.random() * 5000) + 3000, 
          bonus: Math.floor(Math.random() * 500) + 100, 
          deductions: Math.floor(Math.random() * 300) + 50, 
        }));

        // Calculate total pay
        payrollData.forEach(employee => {
          employee.totalPay = (employee.salary + employee.bonus - employee.deductions).toFixed(2);
        });

        setPayroll(payrollData);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  if (loading) return <Loading/>;

  return (
    <motion.div 
      className={styles.payrollPage}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h1 className={styles.title}>Payroll Management</h1>
      <table className={styles.payrollTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Total Pay</th>
          </tr>
        </thead>
        <tbody>
          {payroll.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>₹{employee.salary.toFixed(2)}</td>
              <td>₹{employee.bonus.toFixed(2)}</td>
              <td>₹{employee.deductions.toFixed(2)}</td>
              <td>₹{employee.totalPay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default PayrollPage;
