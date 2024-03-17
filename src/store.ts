import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import adminReducer from "./features/admin/adminSlice";
import historyReducer from "./historySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
