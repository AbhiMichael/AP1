import { createSlice } from "@reduxjs/toolkit";

const Purchased = createSlice({
    name: "purchased",
    initialState: [],
    reducers: {
        buyProduct: (state, action) => {
            state.push(action.payload);
        },
    },
});

export default Purchased.reducer;
export const { buyProduct } = Purchased.actions;