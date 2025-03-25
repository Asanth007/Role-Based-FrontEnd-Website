import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock users
const mockUsers = [
  { email: "admin@example.com", password: "admin123#", role: "Admin", token: "adminToken", name: "Anish" },
  { email: "hr@example.com", password: "hr123#", role: "HR", token: "hrToken", name: "Hrithik" },
  { email: "employee@example.com", password: "employee123#", role: "Employee", token: "employeeToken", name: "Baasha" },
];

// Utility function to persist data in localStorage
const saveToLocalStorage = (users, user = null, token = null) => {
  localStorage.setItem("users", JSON.stringify(users));
  if (user && token) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};

// Retrieve stored users, user, and token on page reload
const storedUsers = JSON.parse(localStorage.getItem("users")) || mockUsers;
const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const storedToken = localStorage.getItem("token") || null;

// Async thunk for login
export const loginUser = createAsyncThunk("auth/loginUser", async (values, { rejectWithValue }) => {
  const user = storedUsers.find((u) => u.email === values.email && u.password === values.password);

  if (user) return user;
  return rejectWithValue("Invalid credentials");
});

// Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: storedUsers, // Store all users
    user: storedUser, // Restore logged-in user
    token: storedToken, // Restore token
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      saveToLocalStorage(state.users, null, null); // Clear user & token
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      saveToLocalStorage(state.users, state.user, state.token);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.email !== action.payload);
      saveToLocalStorage(state.users, state.user, state.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { role: action.payload.role, name: action.payload.name };
        state.token = action.payload.token;
        saveToLocalStorage(state.users, state.user, state.token); // Save login state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
