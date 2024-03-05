import { createSlice } from "@reduxjs/toolkit";
interface AdminState {
  admin: string;
  isLogged: boolean;
  profilePhoto: string;
}

const initialState = {
  admin: "",
  isLogged: false,
  profilePhoto: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdmin: (state, action) => {
      state.admin = action.payload;
      state.isLogged = true;
      state.profilePhoto =
        "https://firebasestorage.googleapis.com/v0/b/sistema-info-d52b6.appspot.com/o/admin%2FAdmin-Profile-Vector-PNG.png?alt=media&token=cad644c6-bf60-49ac-8ca8-3bd80d056673";
    },
    logout: (state) => {
      state.admin = "";
      state.isLogged = false;
    },
    profilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
    },
  },
});

export const getAdmin = (state: { admin: AdminState }) => state.admin.admin;

export const getIsLogged = (state: { admin: AdminState }) =>
  state.admin.isLogged;
export const getProhilePhoto = (state: { admin: AdminState }) =>
  state.admin.profilePhoto;
export const { updateAdmin, logout } = adminSlice.actions;

export default adminSlice.reducer;
