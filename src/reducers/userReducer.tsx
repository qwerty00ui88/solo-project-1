import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { RootState } from '../store'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

export const login = createAsyncThunk(
    'users/login',
    async ({ email, password }: { email: string; password: string }) => {
        initializeApp(firebaseConfig)
        const auth = getAuth()
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return { uid: user.uid }
    }
)

export const logout = createAsyncThunk('users/logout', async () => {
    initializeApp(firebaseConfig)
    const auth = getAuth()
    await signOut(auth)
})

interface UserState {
    user: null | { uid: string }
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
        })
    },
})

export const { setUser } = userSlice.actions

export const selectAuth = (state: RootState) => state.user.user

export default userSlice.reducer
