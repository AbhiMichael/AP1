import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    activeItem: 'dashboard'
  },
  reducers: {
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    }
  }
});

export const { setActiveItem } = sidebarSlice.actions;
export default sidebarSlice.reducer;