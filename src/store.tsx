import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
