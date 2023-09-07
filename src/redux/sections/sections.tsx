import { Status } from "@/utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SectionState {
  section: Status;
}

const initialState: SectionState = {
  section: Status.LEARNING,
};

export const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<Status>) => {
      state.section = action.payload;
    },
  },
});

export const { setSection } = sectionSlice.actions;

export default sectionSlice.reducer;
