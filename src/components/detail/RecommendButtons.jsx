import React from 'react'
import { ReactComponent as Good } from '../../assets/good.svg'
import { ReactComponent as Bad } from '../../assets/bad.svg'

import IconButton from '../commons/IconButton'

export default function RecommendButtons({ onClick, recommend }) {
    return (
        <>
            <IconButton
                onClick={() => {
                    onClick.mutate('good')
                }}
                fill={recommend === 'good' && '#019e74'}
            >
                <Good />
            </IconButton>
            <IconButton
                onClick={() => {
                    onClick.mutate('bad')
                }}
                fill={recommend === 'bad' && 'rgb(229, 9, 20)'}
            >
                <Bad />
            </IconButton>
        </>
    )
}
