import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../states/cart-slice";
import userSlice from "../states/user-slice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice
    }
})