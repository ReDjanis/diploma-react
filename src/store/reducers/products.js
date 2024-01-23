import { createSlice } from "@reduxjs/toolkit";
import products from '../../pages/Products/Main/product';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: products,
        basket: [],
        count: 0,
        sum: 0,
    },
    reducers: {
        editBasket: (state, action) => {
            state.basket = action.payload
        },
        editCount: (state, action) => {
            state.count = action.payload
        },
        editSum: (state, action) => {
            state.sum = action.payload
        },
    },

})

export const { editBasket, editCount, editSum } = productsSlice.actions;
export default productsSlice.reducer;