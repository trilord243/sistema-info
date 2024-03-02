import { createSlice } from "@reduxjs/toolkit";
interface UserState {
  nombre: string;
  apellido: string;
  agrupaciones: string[];
  imagen_perfil: string;
  login: boolean;
  sobre_mi: string;
  rol: string;
}

const initialState = {
  nombre: "",
  apellido: "",
  agrupaciones: [],
  imagen_perfil: "",
  login: false,
  credential: {},
  sobre_mi: "",
  rol: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.nombre = action.payload;
    },
    updateApellido: (state, action) => {
      state.apellido = action.payload;
    },
    updateAgrupaciones: (state, action) => {
      state.agrupaciones = action.payload;
    },
    updateImagenPerfil: (state, action) => {
      state.imagen_perfil = action.payload;
    },
    updateLogin: (state, action) => {
      state.login = action.payload;
    },
    updateCredential: (state, action) => {
      state.credential = action.payload;
    },
    updateSobreMi: (state, action) => {
      state.sobre_mi = action.payload;
    },
  },
});

export const getUserName = (state: { user: UserState }) => state.user.nombre;
export const getUserApellido = (state: { user: UserState }) =>
  state.user.apellido;
export const getUserAgrupaciones = (state: { user: UserState }) =>
  state.user.agrupaciones;
export const getUserImagenPerfil = (state: { user: UserState }) =>
  state.user.imagen_perfil;

export const {
  updateName,
  updateApellido,
  updateAgrupaciones,
  updateImagenPerfil,
  updateLogin,
  updateCredential,
  updateSobreMi,
} = userSlice.actions;

export default userSlice.reducer;
