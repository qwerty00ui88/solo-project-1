import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    genre: [],
}

export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setGenre: (state, action) => {
            state.genre = action.payload
        },
    },
})
