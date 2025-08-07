import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './Redux/Slice/sidebarSlice';
import weatherReducer from "./Redux/Slice/weatherSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    weather: weatherReducer,

  }
});