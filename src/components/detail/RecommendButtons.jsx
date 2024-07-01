import React from 'react'
import { ReactComponent as Good } from '../../assets/good.svg'
import { ReactComponent as Bad } from '../../assets/bad.svg'

import IconButton from '../commons/IconButton'

export default function RecommendButtons({
    recommend,
    updateRecommend,
    commentRecommendUpdate,
}) {
    const handleOnClick = (clicked) => {
        updateRecommend.mutate(clicked)
        commentRecommendUpdate(recommend !== clicked && clicked)
    }

    return (
        <>
            <IconButton
                onClick={() => {
                    handleOnClick('good')
                }}
                fill={recommend === 'good' && '#019e74'}
            >
                <Good />
            </IconButton>
            <IconButton
                onClick={() => {
                    handleOnClick('bad')
                }}
                fill={recommend === 'bad' && 'rgb(229, 9, 20)'}
            >
                <Bad />
            </IconButton>
        </>
    )
}
