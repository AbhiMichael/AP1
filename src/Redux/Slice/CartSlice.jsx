import { createSlice } from "@reduxjs/toolkit";

const Cart = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            if (state.find((e) => e.id === action.payload.id)) return state;
            state.push(action.payload);
        },
    },
});

export default Cart.reducer;
export const { addToCart } = Cart.actions;