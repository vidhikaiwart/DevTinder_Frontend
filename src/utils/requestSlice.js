import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice ({
    name: "request",
    initialState: [],
    reducers: { 
        addRequest: (state, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            return state.filter((req) => req._id !== action.payload);;
        }
    }               
})

export const { addRequest , removeRequest} = requestSlice.actions;      
export default requestSlice.reducer;