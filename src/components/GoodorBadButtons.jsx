import React from 'react'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import useRecommend from '../hooks/useRecommend'

export default function GoodorBadButtons({ data, recommendStatus }) {
    const { recommend, updateRecommend } = useRecommend(
        data.mediaType,
        data.tmdbId,
        recommendStatus
    )

    const handleRecommend = (status) => {
        updateRecommend.mutate(status)
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => handleRecommend('good')}
                aria-label="good"
            >
                <Good fill={recommend === 'good' ? '#019e74' : '#e5e5e5'} />
            </button>
            <button
                type="button"
                onClick={() => handleRecommend('bad')}
                aria-label="bad"
            >
                <Bad
                    fill={recommend === 'bad' ? 'rgb(229, 9, 20)' : '#e5e5e5'}
                />
            </button>
        </div>
    )
}
