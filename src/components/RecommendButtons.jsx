import React from 'react'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import useRecommend from '../hooks/useRecommend'
import IconButton from './commons/IconButton'

export default function RecommendButtons({ data, recommendStatus }) {
    const { recommend, updateRecommend } = useRecommend(
        data.mediaType,
        data.tmdbId,
        recommendStatus
    )

    const handleRecommend = (status) => {
        updateRecommend.mutate(status)
    }

    return (
        <>
            <IconButton onClick={() => handleRecommend('good')}>
                <Good fill={recommend === 'good' ? '#019e74' : '#e5e5e5'} />
            </IconButton>
            <IconButton onClick={() => handleRecommend('bad')}>
                <Bad
                    fill={recommend === 'bad' ? 'rgb(229, 9, 20)' : '#e5e5e5'}
                />
            </IconButton>
        </>
    )
}
