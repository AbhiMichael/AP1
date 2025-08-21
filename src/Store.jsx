import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './Redux/Slice/sidebarSlice';
import weatherReducer from "./Redux/Slice/weatherSlice";
import productSlice from "./Redux/Slice/ProductSlice";
import cartSlice from "./Redux/Slice/CartSlice";
import purchasedSlice from "./Redux/Slice/PurchasedSlice";
import formReducer from "./Redux/Slice/formSlice";
import locationReducer from './Redux/Slice/locationSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    weather: weatherReducer,
    product: productSlice,
    cart: cartSlice,
    purchased: purchasedSlice,
    form: formReducer,
    location: locationReducer,

  }
});