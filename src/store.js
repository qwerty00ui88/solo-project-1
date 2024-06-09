import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './reducers/uiReducer'
import userReducer from './reducers/userReducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
    },
})
