import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { xlargeRadius } from '../../style/border'
import { RankItemType } from '../../types/common'

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

function Poster({ data }: { data: RankItemType }) {
    const { mediaType, tmdbId, itemImagePath } = data
    return tmdbId ? (
        <Link to={`/detail/${mediaType}/${tmdbId}`}>
            <Image
                alt="포스터 이미지"
                src={
                    itemImagePath
                        ? `https://image.tmdb.org/t/p/w500${itemImagePath}`
                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
                }
            />
        </Link>
    ) : (
        <Empty />
    )
}

export default Poster
