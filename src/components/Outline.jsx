import React from 'react'
import { styled } from 'styled-components'
import { titleWeb, xlargeSize } from '../style/font'

import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Star } from '../assets/star.svg'
import RecommendButtons from './RecommendButtons'
import FavoriteButton from './FavoriteButton'
import { default as CommentButton } from './commons/IconButton'

const OutlineWrapper = styled.div`
    height: 100%;
    display: flex;
    padding: 2.4vw 3vw;
    column-gap: 3rem;
    background: ${(props) =>
        `no-repeat center url(https://image.tmdb.org/t/p/w1280${props.$backdropPath})`};
    background-color: rgba(0, 0, 0, 0.83);
    background-blend-mode: overlay;
`

const OutlineLeft = styled.img`
    width: 300px;
    aspect-ratio: 2/3;
`

const OutlineRight = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`

const MainInfo = styled.div``

const Title = styled.h2`
    font-size: ${titleWeb};
`

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`

const Facts = styled.div`
    display: flex;
    & > *:not(:last-child) {
        margin-right: 0.8rem;
    }
`

const GenreList = styled.ul`
    display: flex;
    & > li:not(:last-child)::after {
        content: '·';
        display: inline-block;
        text-align: center;
        width: 10px;
    }
`

const VoteAvg = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`

const DetailedInfo = styled.div``

const Tagline = styled.div``

const Buttons = styled.div`
    display: flex;
    gap: 0.8rem;
`

export default function Outline({
    data,
    recommendStatus,
    favorite,
    myComment,
    handleIsClick,
}) {
    const { title, releaseDate, runtime, tagline } = data

    return (
        data && (
            <OutlineWrapper $backdropPath={data.backdropPath}>
                <OutlineLeft
                    src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                    alt="posterImage"
                />
                <OutlineRight>
                    <MainInfo>
                        <Title>{title}</Title>
                        <Facts>
                            <span>{releaseDate}</span>
                            <GenreList>
                                {data.genres?.map((el) => {
                                    return <li key={el.name}>{el.name}</li>
                                })}
                            </GenreList>
                            {data.mediaType === 'movie' && (
                                <span>{`${runtime}분`}</span>
                            )}
                        </Facts>
                    </MainInfo>
                    <VoteAvg>
                        <Star />
                        {data.voteAverage?.toFixed(1)}
                    </VoteAvg>
                    {data.mediaType === 'movie' && <Tagline>{tagline}</Tagline>}
                    <DetailedInfo>
                        {data.overview && (
                            <>
                                <SubTitle>개요</SubTitle>
                                <div>{data.overview}</div>
                            </>
                        )}
                    </DetailedInfo>
                    <Buttons>
                        <RecommendButtons
                            data={data}
                            recommendStatus={recommendStatus}
                        />
                        <FavoriteButton
                            mediaType={data.mediaType}
                            tmdbId={data.tmdbId}
                            favorite={favorite}
                        />
                        <CommentButton onClick={handleIsClick}>
                            <Edit fill={myComment ? '#FFD700' : '#e5e5e5'} />
                        </CommentButton>
                    </Buttons>
                </OutlineRight>
            </OutlineWrapper>
        )
    )
}
