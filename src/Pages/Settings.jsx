import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Settings.module.scss";

export const Settings = () => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user data

  if (!user) {
    return <p className={styles.errorMessage}>Access Denied. Please log in.</p>;
  }

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.settingsTitle}>Settings</h2>

      {/* Admin Settings */}
      {user.role === "Admin" && (
        <div className={styles.settingsSection}>
          <h3 className={styles.sectionTitle}>Admin Settings</h3>
          <ul className={styles.settingsList}>
            <li className={styles.settingsItem}>Manage Users</li>
            <li className={styles.settingsItem}>Company Settings</li>
            <li className={styles.settingsItem}>Role Configuration</li>
          </ul>
        </div>
      )}

      {/* HR Settings */}
      {user.role === "HR" && (
        <div className={styles.settingsSection}>
          <h3 className={styles.sectionTitle}>HR Settings</h3>
          <ul className={styles.settingsList}>
            <li className={styles.settingsItem}>Employee Records</li>
            <li className={styles.settingsItem}>Payroll Management</li>
            <li className={styles.settingsItem}>Policy Updates</li>
          </ul>
        </div>
      )}

      {/* Employee Settings */}
      {user.role === "Employee" && (
        <div className={styles.settingsSection}>
          <h3 className={styles.sectionTitle}>Employee Settings</h3>
          <ul className={styles.settingsList}>
            <li className={styles.settingsItem}>Update Profile</li>
            <li className={styles.settingsItem}>Change Password</li>
            <li className={styles.settingsItem}>Notification Preferences</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Settings;
