import { configureStore } from "@reduxjs/toolkit";

// config the store
const store = configureStore({
  reducer: {
    name: "function",
  },
});

export default store;
