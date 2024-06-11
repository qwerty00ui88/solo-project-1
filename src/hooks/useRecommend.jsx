import { useQuery } from '@tanstack/react-query'
import { getData } from '../api/server'

export default function useRecommend(mediaType, tmdbId, status) {
    const recommendQuery = useQuery({
        queryKey: ['recommend'], // 의존성 추가
        queryFn: () => {
            getData('/recommend', {
                params: {
                    mediaType,
                    tmdbId,
                    status,
                },
            })
        },
    })

    return { recommendQuery }
}
