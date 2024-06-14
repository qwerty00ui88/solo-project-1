import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { xlargeRadius } from '../../style/border'

const Image = styled.img`
    width: 100%;
    border-radius: ${xlargeRadius};
`

const Empty = styled.div`
    width: 100%;
    aspect-ratio: 2/3;
    background-color: #878787;
    border-radius: ${xlargeRadius};
`

export default function Poster({ data }) {
    const { mediaType, tmdbId, posterPath } = data
    return tmdbId ? (
        <Link to={`/detail/${mediaType}/${tmdbId}`}>
            <Image
                alt="포스터 이미지"
                src={
                    posterPath
                        ? `https://image.tmdb.org/t/p/w500${posterPath}`
                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
                }
            />
        </Link>
    ) : (
        <Empty />
    )
}