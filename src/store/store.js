import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../reducers/current-user-slice";
import casesReducer from "../reducers/cases-slice";
import officersReducer from "../reducers/officers-slice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    cases: casesReducer,
    officers: officersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});