import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,

  // auth info
  userId: null,
  phone: null,
  userType: null,
  outletId: null,

  // access control
  roles: [],
  permissions: [],
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action) => {
      const user = action.payload || {};
      // console.log('user from slice ', user);

      state.user = user;

      state.userId = user.id ?? null;
      state.phone = user.phone ?? null;
      state.userType = user.userType ?? null;
      state.outletId = user.outletId ?? null;

      state.roles = Array.isArray(user.roles) ? user.roles : [];
      state.permissions = Array.isArray(user.permissions)
        ? user.permissions
        : [];
    },

    setToken: (state, action) => {
      // console.log('token from slice ', action.payload);
      state.accessToken = action.payload || null;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;

      state.userId = null;
      state.phone = null;
      state.userType = null;
      state.outletId = null;

      state.roles = [];
      state.permissions = [];
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;