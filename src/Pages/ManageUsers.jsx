import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/authSlice";
import styles from "../styles/AdminManageUsers.module.scss";

const AdminManageUsers = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Employee", // Default role
    password: "password123", // Default password
  });

  const handleRemoveUser = (email) => {
    dispatch(removeUser(email));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      dispatch(addUser(newUser));
      setNewUser({ name: "", email: "", role: "Employee", password: "password123" }); // Reset form
    }
  };

  return (
    <div className={styles.adminPage}>
      <h1>Manage Users</h1>

      {/* Add User Form */}
      <div className={styles.addUserForm}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="Admin">Admin</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>
        <button onClick={handleAddUser} className={styles.addBtn}>
          Add User
        </button>
      </div>

      {/* User Table */}
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleRemoveUser(user.email)} className={styles.removeBtn}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageUsers;
