import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getData } from '../api/server'

export default function useRecommend(mediaType, tmdbId, recommendStatus) {
    const { isLoggedIn } = useSelector((state) => state.user)
    const [recommend, setRecommend] = useState(recommendStatus)

    const updateRecommend = useMutation({
        mutationFn: (clickedStatus) => {
            if (isLoggedIn) {
                return getData('/recommend', {
                    params: {
                        mediaType,
                        tmdbId,
                        status: clickedStatus,
                    },
                })
            }
            return alert('로그인해 주세요.')
        },
        onSuccess: (res) => {
            if (res.code === 200) setRecommend(res.result)
            else alert(res.error_message)
        },
    })

    return { recommend, updateRecommend }
}
