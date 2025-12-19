//this slice/reducers keep tracks of the auth services

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: "loading", // if loader is used instead of useState() in AuthLayout.jsx , nahi toh initially false rakhte hai status.
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true; 
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }

    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
