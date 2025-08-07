import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state ,action)=>{
            // yaha pe data ayenga and hum yaha pe store ka intial value update kar rahe hai
            state.userInfo=action.payload;
// saath saath localstorrage mein bhi update kr rahe hai
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
            // 30days expiration days
            const expirationTime= new Date().getTime() + 30*24*60*60*1000;
            localStorage.setItem("expirationTime",expirationTime);
        },
        logout:(state)=>{
            state.userInfo=null;
            localStorage.clear();
        }

    }
})

export const {setCredentials,logout}= authSlice.actions;
export default authSlice.reducer; 