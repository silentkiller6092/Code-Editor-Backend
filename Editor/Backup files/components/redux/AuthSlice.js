import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    full_name: "",
    email: "",
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      const { full_name, email } = action.payload;
      state.full_name = full_name;
      state.email = email;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.full_name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
