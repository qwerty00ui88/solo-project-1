import React, { useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
import { titleWeb, xlargeSize } from '../style/font'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as Favorite } from '../assets/favorite.svg'
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Star } from '../assets/star.svg'
import { Comment } from '../pages/Detail'
import { ContentDetail } from '../types/content'

const OutlineWrapper = styled.div<{ $backdropPath: string | undefined }>`
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

function Outline({
    data,
    recommendStatus,
    favorite,
    myComment,
    handleIsClick,
}: {
    data: ContentDetail
    recommendStatus: null | 'good' | 'bad'
    favorite: boolean
    myComment: Comment
    handleIsClick: () => void
}) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [recommend, setRecommend] = useState<null | 'good' | 'bad'>(
        recommendStatus
    )
    const [isFavorite, setIsFavorite] = useState<boolean>(favorite)
    const { title, releaseDate, runtime, tagline } = data

    return (
        data && (
            <OutlineWrapper $backdropPath={data.backdropPath}>
                <OutlineLeft
                    src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                    alt=""
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
                        <button
                            type="button"
                            onClick={() => {
                                axios
                                    .get(`${serverUrl}/recommend`, {
                                        params: {
                                            mediaType: data.mediaType,
                                            tmdbId: data.tmdbId,
                                            status: 'good',
                                        },
                                        withCredentials: true,
                                    })
                                    .then((response) => {
                                        if (response.data.code === 200) {
                                            setRecommend(response.data.result)
                                        } else {
                                            // eslint-disable-next-line no-alert
                                            alert(response.data.error_message)
                                        }
                                    })
                                    .catch((error) => {
                                        // eslint-disable-next-line no-alert
                                        alert(error)
                                    })
                            }}
                            aria-label="good"
                        >
                            <Good
                                fill={
                                    recommend === 'good' ? '#019e74' : '#e5e5e5'
                                }
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                axios
                                    .get(`${serverUrl}/recommend`, {
                                        params: {
                                            mediaType: data.mediaType,
                                            tmdbId: data.tmdbId,
                                            status: 'bad',
                                        },
                                        withCredentials: true,
                                    })
                                    .then((response) => {
                                        if (response.data.code === 200) {
                                            setRecommend(response.data.result)
                                        } else {
                                            // eslint-disable-next-line no-alert
                                            alert(response.data.error_message)
                                        }
                                    })
                                    .catch((error) => {
                                        // eslint-disable-next-line no-alert
                                        alert(error)
                                    })
                            }}
                            aria-label="bad"
                        >
                            <Bad
                                fill={
                                    recommend === 'bad'
                                        ? 'rgb(229, 9, 20)'
                                        : '#e5e5e5'
                                }
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                axios
                                    .get(`${serverUrl}/favorite/toggle`, {
                                        params: {
                                            mediaType: data.mediaType,
                                            tmdbId: data.tmdbId,
                                        },
                                        withCredentials: true,
                                    })
                                    .then((response) => {
                                        if (response.data.code === 200) {
                                            setIsFavorite(!isFavorite)
                                        } else {
                                            // eslint-disable-next-line no-alert
                                            alert(response.data.error_message)
                                        }
                                    })
                            }}
                            aria-label="favorite"
                        >
                            <Favorite
                                fill={isFavorite ? '#FFD700' : '#e5e5e5'}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleIsClick()
                            }}
                            aria-label="edit"
                        >
                            <Edit fill={myComment ? '#FFD700' : '#e5e5e5'} />
                        </button>
                    </Buttons>
                </OutlineRight>
            </OutlineWrapper>
        )
    )
}

export default Outline
