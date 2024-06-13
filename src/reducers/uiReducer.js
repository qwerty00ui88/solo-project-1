import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
export const selectUi = (state) => state.ui
export default uiSlice.reducer
