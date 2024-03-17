import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
  routes: string;
}

const initialState: HistoryState = {
  routes: "",
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addRoute: (state, action: PayloadAction<string>) => {
      state.routes = action.payload;
    },
  },
});

export const getRoutes = (state: { history: HistoryState }) =>
  state.history.routes;

export const { addRoute } = historySlice.actions;

export default historySlice.reducer;
