import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface UserState {
    user: { email: string; uid: string } | null
}

// Define the initial state using that type
const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
    },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.user.user

export default userSlice.reducer
