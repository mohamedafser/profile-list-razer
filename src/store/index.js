import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reudcer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
