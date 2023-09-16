import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { login, logout } from './userReducer'

interface UiState {
    status:
        | 'AUTH_LOADING'
        | 'AUTH_SUCCESS'
        | 'AUTH_FAIL'
        | 'LOGOUT_LOADING'
        | 'LOGOUT_SUCCESS'
        | 'LOGOUT_FAIL'
}

const initialState: UiState = {
    status: 'AUTH_LOADING',
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setUi: (state, action) => {
            state.status = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = 'AUTH_LOADING'
        })
        builder.addCase(login.fulfilled, (state) => {
            state.status = 'AUTH_SUCCESS'
        })
        builder.addCase(login.rejected, (state) => {
            state.status = 'AUTH_FAIL'
        })
        builder.addCase(logout.pending, (state) => {
            state.status = 'LOGOUT_LOADING'
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.status = 'LOGOUT_SUCCESS'
        })
        builder.addCase(logout.rejected, (state) => {
            state.status = 'LOGOUT_FAIL'
        })
    },
})

export const { setUi } = uiSlice.actions

export const selectUi = (state: RootState) => state.ui

export default uiSlice.reducer
