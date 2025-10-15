import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  // Import the user reducer
import feedReducer from "./feedSlice";
const appStore = configureStore({
    reducer:{
        user : userReducer,  // Add the user reducer to the store
        feed : feedReducer,
    }
});

export default appStore;