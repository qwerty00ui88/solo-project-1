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
        return { email: user.email, uid: user.uid }
    }
)

export const logout = createAsyncThunk('users/logout', async () => {
    initializeApp(firebaseConfig)
    const auth = getAuth()
    signOut(auth)
})

interface UserState {
    user: {
        value: { email: string | null; uid: string | null }
        type: 'idle' | 'pendding' | 'fulfilled' | 'rejected'
    }
}

const initialState: UserState = {
    user: { value: { email: null, uid: null }, type: 'idle' },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.user.type = 'pendding'
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.user.value = action.payload
            state.user.type = 'fulfilled'
        })
        builder.addCase(login.rejected, (state) => {
            state.user.type = 'rejected'
        })
        builder.addCase(logout.pending, (state) => {
            state.user.type = 'pendding'
        })
        builder.addCase(logout.fulfilled, () => initialState)
        builder.addCase(logout.rejected, () => initialState)
    },
})

// export const {} = userSlice.actions

export const selectAuth = (state: RootState) => state.user.user

export default userSlice.reducer
