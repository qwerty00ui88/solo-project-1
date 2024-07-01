import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { getData } from '../api/server'
import { useAuthContext } from '../context/AuthContext'

export default function useFavorite(mediaType, tmdbId, init) {
    const { user } = useAuthContext()
    const [isFavorite, setIsFavorite] = useState(init)

    const updateFavorite = useMutation({
        mutationFn: () => {
            if (user) {
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
