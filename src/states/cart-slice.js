import { createSlice } from "@reduxjs/toolkit";
import { getCartByUser } from "../services/cart";

const initialState = {
    items: [],
    isLoading: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        addToCount: (state, action) => {
            const findItem = state.items.find(item => item.cartItemId === action.payload.cartItemId)
            findItem.quantity += 1
        },
        subtractFromCount: (state, action) => {
            const findItem = state.items.find(item => item.cartItemId === action.payload.cartItemId)
            findItem.quantity -= 1
        },
        deleteFromCart: (state, action) => {
            state.items = state.items.filter(item => item.cartItemId !== action.payload.cartItemId)
        },
        updateExtras: (state, action) => {
            const findItem = state.items.find(item => item.cartItemId === action.payload.cartItemId)
            findItem.Extras = action.payload.extra
        }
    }
})

export const { setCartItems, setLoading, addToCart, addToCount, subtractFromCount, deleteFromCart, updateExtras } = cartSlice.actions

export const fetchCart = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const cartData = await getCartByUser(userId)
        dispatch(setCartItems(cartData))
        dispatch(setLoading(false))
    } catch (error) {
        console.log('error ', error.message)
        dispatch(setLoading(false))
    }
}

export const selectAllItems = state => state.cart.items
export const selectIsLoading = state => state.cart.isLoading

export const selectConutItems = state => state.cart.items.length


export default cartSlice.reducer


