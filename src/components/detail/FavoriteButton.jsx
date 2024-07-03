import React from 'react'
import { ReactComponent as Favorite } from '../../assets/favorite.svg'
import IconButton from '../commons/IconButton'

export default function FavoriteButton({ onClick, isFavorite }) {
    return (
        <IconButton
            onClick={() => onClick.mutate()}
            fill={isFavorite && '#FFD700'}
        >
            <Favorite />
        </IconButton>
    )
}
