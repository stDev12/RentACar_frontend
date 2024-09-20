import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout(state) {
            state.user = null
            state.isAuthenticated = false
        },
        updateUserDetails(state, action) {
            state.user = action.payload
        }
    }
})

export const { login, logout, updateUserDetails } = userSlice.actions
export const selectUser = state => state.user.user

export default userSlice.reducer


