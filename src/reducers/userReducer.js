import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        isLoggedIn: false,
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.userId = null
            state.isLoggedIn = false
        },
    },
})

export const { login, logout } = userSlice.actions

export const selectIsLoggedIn = (state) => state.user.isLoggedIn

export default userSlice.reducer
