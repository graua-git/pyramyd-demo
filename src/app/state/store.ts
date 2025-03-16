import { configureStore } from "@reduxjs/toolkit";
import requirementsReducer from "./requirements/requirementsSlice";
import creditsReducer from "./credits/creditsSlice";

export const store = configureStore({
  reducer: {
    requirements: requirementsReducer,
    credits: creditsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;