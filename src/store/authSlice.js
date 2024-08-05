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
      console.log("my payload data ",action.payload.data.$id)
      state.id = action.payload.data.$id;
      state.data = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.id = null;
      state.data = null;
    },
  },
});


export const {login,logout} = authSlice.actions;

export default authSlice.reducer;