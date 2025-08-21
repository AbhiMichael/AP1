import { createSlice } from "@reduxjs/toolkit";

const Product = createSlice({
    name: "product",
    initialState: [
        { id: 1, name: "Smartphone X10", available: 5, rating: 4.5 },
        { id: 2, name: "Wireless Headphones Z", available: 2, rating: 4.2 },
        { id: 3, name: "Gaming Laptop Pro", available: 0, rating: 4.8 },
        { id: 4, name: "Smartwatch Gen 5", available: 3, rating: 4.0 },
        { id: 5, name: "Bluetooth Speaker", available: 5, rating: 4.3 },
        { id: 6, name: "Smartwatch Gen 7", available: 2, rating: 4.1 },
    

    ],
    reducers: {
        decreaseCount: (state, action) => {
            const item = state.find((e) => e.id == action.payload);
            item.available -= 1;
        },
    },
});

export default Product.reducer;
export const { decreaseCount } = Product.actions;