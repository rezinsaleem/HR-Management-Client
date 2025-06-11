import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // The leaveData will be an array of leave objects
  leaveData: [], 
};

export const leaveSlice = createSlice({
  name: "leave", // Name of your slice
  initialState,
  reducers: {
    // Reducer to set the leave data
    setLeaveData: (state, action) => {
      // action.payload will be the array of leave objects
      state.leaveData = action.payload; 
    },
    // Optional: Reducer to clear the leave data
    clearLeaveData: (state) => {
      state.leaveData = [];
    },
  },
});

// Export the action creators
export const { setLeaveData, clearLeaveData } = leaveSlice.actions;

// Export the reducer
export default leaveSlice;