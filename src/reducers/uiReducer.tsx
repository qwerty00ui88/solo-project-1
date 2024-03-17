import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface UiState {
    status:
        | 'AUTH_LOADING'
        | 'AUTH_SUCCESS'
        | 'AUTH_FAIL'
        | 'LOGOUT_LOADING'
        | 'LOGOUT_SUCCESS'
        | 'LOGOUT_ERROR'
        | 'USEGET_LOADING'
        | 'USEGET_SUCCESS'
        | 'USEGET_ERROR'
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
})

export const { setUi } = uiSlice.actions
export const selectUi = (state: RootState) => state.ui
export default uiSlice.reducer
