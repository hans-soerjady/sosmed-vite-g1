import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountReducer";
import { hasRegisterReducer } from "./hasRegisterReducer";

export const globalState = configureStore({
  reducer: {
    accountReducer,
    hasRegisterReducer,
  },
});
