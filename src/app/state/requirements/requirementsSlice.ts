import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequirementsState {
  requirements: string[];
}

const initialState: RequirementsState = {
  requirements: [],
}

const requirementsSlice = createSlice({
  name: "requirements",
  initialState,
  reducers: {
    setRequirements: (state, action: PayloadAction<string[]>) => {
      state.requirements = action.payload;
    },
    resetRequirements: (state) => {
      state.requirements = [];
    }
  },
});

export const { setRequirements, resetRequirements } = requirementsSlice.actions;

export default requirementsSlice.reducer; 