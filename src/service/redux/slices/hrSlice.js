import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hr: "",
    hrId: "",
    email: "",
    loggedIn: false,
}

export const hrAuthSlice = createSlice({
    name: "hrAuth",
    initialState,
    reducers: {
        hrLogin: ((state, action) => { 
            state.hr = action.payload.hr;
            state.hrId = action.payload.hrId;
            state.email = action.payload.email;
            state.loggedIn = action.payload.loggedIn;
        }),
        hrLogout: (state => {
            state.hr = "";
            state.hrId = "";
            state.email = "";
            state.loggedIn = false;
            localStorage.removeItem('hrToken')
        })
    }
})

export const { hrLogin, hrLogout } = hrAuthSlice.actions;

export default hrAuthSlice;