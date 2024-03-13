import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { xlargeRadius } from '../../style/border'

interface PosterType {
    mediaType: string | null
    id: number | null
    posterPath: string | null
}

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

function Poster({ mediaType, id, posterPath }: PosterType) {
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {id ? (
                <Link to={`/detail/${mediaType}/${id}`}>
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
            )}
        </>
    )
}

export default Poster
