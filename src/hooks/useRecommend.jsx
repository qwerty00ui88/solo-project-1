import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { getData } from '../api/server'
import { useAuthContext } from '../context/AuthContext'

export default function useRecommend({ mediaType, tmdbId, init = undefined }) {
    const { user } = useAuthContext()
    const [recommend, setRecommend] = useState(init)

    const initializeUserRecommend = (r) => {
        setRecommend(r)
    }

    const updateRecommend = useMutation({
        mutationFn: (clickedStatus) => {
            if (user) {
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
            if (res.code === 200) {
                setRecommend(res.result)
            } else alert(res.error_message)
        },
    })

    return { recommend, initializeUserRecommend, updateRecommend }
}
