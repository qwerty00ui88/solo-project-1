import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './reducers/uiReducer'
import userReducer from './reducers/userReducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
