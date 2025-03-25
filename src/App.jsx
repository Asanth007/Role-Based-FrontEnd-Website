import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./components/myForm";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./pages/Admin";
import HRPanel from "./Pages/HR";
import EmployeePanel from "./Pages/Employee";
import HomePage from "./Pages/Homepage";
import Unauthorized from "./components/UnauthorizedAccess";
import "./index.css"
import ProfilePage from "./components/ProfilePage";
import Services from "./Pages/Services";
import Settings from "./Pages/Settings";
import ContactPage from "./Pages/Contact";
import ReportPage from "./components/Report";
import TaskPage from "./Pages/Tasks";
import RecruitmentPage from "./Pages/RecruitmentPage";
import LeaveManagement from "./Pages/LeaveManagement";
import PayrollPage from "./Pages/Payroll";
import AdminManageUsers from "./Pages/ManageUsers";
import Attendance from "./Pages/EmployeeAttandance";
const App = () => {
  const role = useSelector((state) => state.auth.user?.role);
  const token = useSelector((state) => state.auth.token);
  
  return (
    
    <Router>
      <Navbar role={role} /> {/* Navbar always shown */}
      <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        <Route path="/services" element={<Services />} />
        
        {/* Role-based Protected Routes */}

        <Route path="/attendance" element={token ? <Attendance/>: <Navigate to="/login" />} />
        <Route path="/leave-management" element={token ?<LeaveManagement/> : <Navigate to="/login" />} />
        <Route path="/manage-users" element={token ?<AdminManageUsers/> : <Navigate to="/login" />} />
        <Route path="/payroll" element={token ?<PayrollPage/> : <Navigate to="/login" />} />
        <Route path="/reports" element={token ?<ReportPage/> : <Navigate to="/login" />} />
        <Route path="/careers" element={token ? <RecruitmentPage/> : <Navigate to="/login" />} />
        <Route path="/tasks" element={token ? <TaskPage/> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={token ? (role === "Admin" ? <AdminPanel /> : <Unauthorized />) : <Navigate to="/login" />} />
        <Route path="/hr" element={token ? (role === "HR" ? <HRPanel /> : <Unauthorized />) : <Navigate to="/login" />} />
        <Route path="/employee" element={token ? (role === "Employee" ? <EmployeePanel /> : <Unauthorized />) : <Navigate to="/login" />} />

      </Routes>

    </Router>
  );
};

export default App;
