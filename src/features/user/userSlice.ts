import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  agrupaciones: never[];
  imagen_perfil: string;
  login: boolean;
  sobre_mi: string;
  rol: string;
  banner: string;
  puntuados?: never[];
}

const initialState = {
  id: "",
  nombre: "",
  apellido: "",
  agrupaciones: [],
  imagen_perfil: "",
  login: false,
  credential: {},
  sobre_mi: "",
  rol: "",
  banner: "",
  email: "",
  puntuados: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        id,
        nombre,
        apellido,
        agrupaciones,
        imagen_perfil,
        sobre_ti,
        banner,
        puntuados,
      } = action.payload;
      state.nombre = nombre;
      state.id = id;
      state.apellido = apellido;
      state.agrupaciones = agrupaciones;
      state.imagen_perfil = imagen_perfil;
      state.login = true;
      state.sobre_mi = sobre_ti;
      state.banner = banner;
      if (puntuados !== undefined) {
        state.puntuados = puntuados;
      }
    },

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
    updateBanner: (state, action) => {
      state.banner = action.payload;
    },

    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    resetUserState: () => {
      return initialState;
    },
    updatePuntuados: (state, action) => {
      state.puntuados = action.payload;
    },
  },
});

export const getUserName = (state: { user: UserState }) => state.user.nombre;
export const userLogged = (state: { user: UserState }) => state.user.login;
export const getUserEmail = (state: { user: UserState }) => state.user.email;
export const getUserApellido = (state: { user: UserState }) =>
  state.user.apellido;
export const getUserAgrupaciones = (state: { user: UserState }) =>
  state.user.agrupaciones;
export const getUserImagenPerfil = (state: { user: UserState }) =>
  state.user.imagen_perfil;

export const getUserSobreMi = (state: { user: UserState }) =>
  state.user.sobre_mi;

export const getUserId = (state: { user: UserState }) => state.user.id;
export const getPuntuados = (state: { user: UserState }) =>
  state.user.puntuados;
export const getBannerImage = (state: { user: UserState }) => state.user.banner;
export const getUserLogin = (state: { user: UserState }) => state.user.login;
export const {
  updateEmail,
  updateName,
  updateApellido,
  updateAgrupaciones,
  updateImagenPerfil,
  updateLogin,
  updateCredential,
  updateSobreMi,
  updateUser,
  resetUserState,
  updatePuntuados,
} = userSlice.actions;

export default userSlice.reducer;
