import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query/react";
import authReducer from "./features/auth/authSlice.js"
import { apiSlice } from "./api/apiSlice.js";
import MovieReducer from "./features/movies/movieSlice.js"


const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,

         auth:authReducer,
          movies:MovieReducer,    
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true,
    
})
setupListeners(store.dispatch);
export default store;