import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  id: null,
  data: null,
};

const authSlice = createSlice({
  name: "auth1",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      if (action.payload.data) {
        state.id = action.payload.data.$id;
      } else {
        state.id = action.payload.$id;
      }
      state.data = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.id = null;
      state.data = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
