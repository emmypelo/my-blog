
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlices";
import categoryReducer from "../slices/category/categorySlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer
  },
});
export default store;
