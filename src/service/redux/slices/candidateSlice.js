import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidates: [],
};

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
    clearCandidates: (state) => {
      state.candidates = [];
    },
  },
});

export const { setCandidates, clearCandidates } = candidateSlice.actions;

export default candidateSlice;
