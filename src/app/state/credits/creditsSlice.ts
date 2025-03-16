import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreditsState {
  credits: number;
}

const initialState: CreditsState = {
  credits: 0
}

const creditsSlice = createSlice({
  name: "credits",
  initialState,
  reducers: {
    setCredits: (state, action: PayloadAction<number>) => {
      state.credits = action.payload;
    },
    resetCredits: (state) => {
      state.credits = 0;
    }
  },
});

export const { setCredits, resetCredits } = creditsSlice.actions;

export default creditsSlice.reducer; 