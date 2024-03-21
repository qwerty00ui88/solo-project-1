import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
        },
    },
})

export const { login, logout } = userSlice.actions

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn

export default userSlice.reducer
