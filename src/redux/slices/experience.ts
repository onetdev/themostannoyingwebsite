import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ExperienceState {
  mockChat: boolean;
  wheelOfFortune: boolean;
  exitPrompt: boolean;
  contentPaywall: boolean;
}

const initialState: ExperienceState = {
  mockChat: true,
  wheelOfFortune: true,
  exitPrompt: true,
  contentPaywall: true,
};

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setMockChat: (state, action: PayloadAction<boolean>) => {
      state.mockChat = action.payload;
    },
    setWheelOfFortune: (state, action: PayloadAction<boolean>) => {
      state.wheelOfFortune = action.payload;
    },
    setExitPrompt: (state, action: PayloadAction<boolean>) => {
      state.exitPrompt = action.payload;
    },
    setContentPaywall: (state, action: PayloadAction<boolean>) => {
      state.contentPaywall = action.payload;
    },
  },
});

export const actions = experienceSlice.actions;
export default experienceSlice.reducer;
