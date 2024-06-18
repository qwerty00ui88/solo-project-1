import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getData } from '../api/server'

export default function useFavorite(mediaType, tmdbId, favorite) {
    const { isLoggedIn } = useSelector((state) => state.user)
    const [isFavorite, setIsFavorite] = useState(favorite)

    const updateFavorite = useMutation({
        mutationFn: () => {
            if (isLoggedIn) {
                return getData('/favorite/toggle', {
                    params: {
                        mediaType,
                        tmdbId,
                    },
                })
            }

            return alert('로그인해 주세요.')
        },
        onSuccess: (res) => {
            if (res.code === 200) setIsFavorite(!isFavorite)
            else alert(res.error_message)
        },
    })

    return { isFavorite, updateFavorite }
}
