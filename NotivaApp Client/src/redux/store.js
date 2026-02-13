import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/notes/noteSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    // 'notes' is the name of this state slice in the store
    // Any component can access it via: state.notes
    notes: noteReducer,
    // 'auth' is the name of this state slice for authentication
    // Access via: state.auth
    auth: authReducer,
  },
});
