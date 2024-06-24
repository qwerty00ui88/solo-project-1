import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { xlargeRadius } from '../../style/border'
import { largeSize, boldWeight } from '../../style/font'
import { ReactComponent as Star } from '../../assets/star.svg'

const PosterWrapper = styled(Link)`
    position: relative;
`

const Image = styled.img`
    width: ${(props) => props.$width};
    border-radius: ${(props) => props.$borderRadius};
    aspect-ratio: 2/3;
`

const Empty = styled.div`
    width: 100%;
    aspect-ratio: 2/3;
    background-color: #878787;
    border-radius: ${xlargeRadius};
`

const Description = styled.div`
    flex: 1;
    padding: 15px 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 0 0 ${xlargeRadius} ${xlargeRadius};
    background-image: linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 1)
    );
`

const Title = styled.div`
    font-size: ${largeSize};
    font-weight: ${boldWeight};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Vote = styled.div`
    display: flex;
    align-items: center;
`

export default function Poster({
    data,
    width,
    borderRadius = undefined,
    description = false,
}) {
    const { mediaType, tmdbId, posterPath } = data
    return tmdbId ? (
        <PosterWrapper to={`/detail/${mediaType}/${tmdbId}`}>
            <Image
                alt="포스터 이미지"
                src={
                    posterPath
                        ? `https://image.tmdb.org/t/p/w500${posterPath}`
                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
                }
                $width={width}
                $borderRadius={borderRadius}
            />
            {description && (
                <Description>
                    <Title>{data.title}</Title>
                    <Vote>
                        <Star />
                        {data.voteAverage?.toFixed(1)}
                    </Vote>
                </Description>
            )}
        </PosterWrapper>
    ) : (
        <Empty />
    )
}
