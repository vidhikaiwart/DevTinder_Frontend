import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  // Import the user reducer
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";


const appStore = configureStore({
    reducer:{
        user : userReducer,  // Add the user reducer to the store
        feed : feedReducer,
        connection : connectionReducer,
        requests: requestReducer,
    },
});

export default appStore;