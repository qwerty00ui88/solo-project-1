import React from 'react'
import useFavorite from '../hooks/useFavorite'
import { ReactComponent as Favorite } from '../assets/favorite.svg'
import IconButton from './commons/IconButton'

export default function FavoriteButton({ mediaType, tmdbId, favorite }) {
    const { isFavorite, updateFavorite } = useFavorite(
        mediaType,
        tmdbId,
        favorite
    )

    return (
        <IconButton
            onClick={() => {
                updateFavorite.mutate()
            }}
        >
            <Favorite fill={isFavorite ? '#FFD700' : '#e5e5e5'} />
        </IconButton>
    )
}
