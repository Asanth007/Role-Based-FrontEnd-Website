import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import styles from "../styles/Navbar.module.scss";
import logo from "./assets/logo.png";

function Navbar({ role }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false); // Close menu on logout
    navigate("/");
  };

  // Function to close menu when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Alpha-Tech Logo" />
      </Link>

      {/* Hamburger Menu */}
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Menu */}
      <ul className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        {role ? (
          <>
            {role === "Admin" && (
              <>
                <li><Link to="/admin" onClick={closeMenu}>Dashboard</Link></li>
                <li><Link to="/manage-users" onClick={closeMenu}>Manage Users</Link></li>
                <li><Link to="/settings" onClick={closeMenu}>Settings</Link></li>
                <li><Link to="/reports" onClick={closeMenu}>Reports</Link></li>
              </>
            )}
            {role === "HR" && (
              <>
                <li><Link to="/hr" onClick={closeMenu}>Dashboard</Link></li>
                <li><Link to="/careers" onClick={closeMenu}>Recruitment</Link></li>
                <li><Link to="/leave-management" onClick={closeMenu}>Leave Management</Link></li>
                <li><Link to="/payroll" onClick={closeMenu}>Payroll</Link></li>
              </>
            )}
            {role === "Employee" && (
              <>
                <li><Link to="/employee" onClick={closeMenu}>Dashboard</Link></li>
                <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                <li><Link to="/attendance" onClick={closeMenu}>Attendance</Link></li>
                <li><Link to="/tasks" onClick={closeMenu}>Tasks</Link></li>
              </>
            )}
            {/* Logout Button */}
            <li>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contacts</Link></li>
            <li className={styles.logoutButton}><Link to="/login" onClick={closeMenu}>Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
