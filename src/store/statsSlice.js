import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  streak: 0,
  totalPoints: 0,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    incrementStreak: (state) => {
      state.streak += 1;
    },
    resetStreak: (state) => {
      state.streak = 0;
    },
    addPoints: (state, action) => {
      state.totalPoints += action.payload;
    },
  },
});

export const { incrementStreak, resetStreak, addPoints } = statsSlice.actions;
export default statsSlice.reducer;
