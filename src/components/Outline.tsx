import React, { useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
import { MovieDetail, TVDetail } from '../utils/useGet'
import { titleWeb, xlargeSize } from '../style/font'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as Favorite } from '../assets/favorite.svg'

const OutlineWrapper = styled.div<{ $backdrop: string }>`
    height: 100%;
    display: flex;
    padding: 2.4vw 3vw;
    column-gap: 3rem;
    background: ${(props) =>
        `no-repeat center url(https://image.tmdb.org/t/p/w1280${props.$backdrop})`};
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

const VoteAvg = styled.div``

const DetailedInfo = styled.div``

const Tagline = styled.div``

function Outline({
    media,
    data,
    recommendStatus,
    isFavorite,
}: {
    media: string
    data: MovieDetail | TVDetail
    recommendStatus: null | 'good' | 'bad'
    isFavorite: boolean
}) {
    const [favorite, setFavorite] = useState<boolean>(isFavorite)
    const [recommend, setRecommend] = useState<null | 'good' | 'bad'>(
        recommendStatus
    )
    const title = (data as MovieDetail).title || (data as TVDetail).name
    const releaseDate =
        (data as MovieDetail).release_date || (data as TVDetail).first_air_date
    const { runtime } = data as MovieDetail

    return (
        data && (
            <OutlineWrapper $backdrop={data.backdrop_path}>
                <OutlineLeft
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
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
                            {media === 'movie' && <span>{`${runtime}분`}</span>}
                        </Facts>
                    </MainInfo>
                    <VoteAvg>{data.vote_average?.toFixed(1)}</VoteAvg>
                    <DetailedInfo>
                        {media === 'movie' && <Tagline>{data.tagline}</Tagline>}
                        {data.overview && (
                            <>
                                <SubTitle>개요</SubTitle>
                                <div>{data.overview}</div>
                            </>
                        )}
                    </DetailedInfo>
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                axios
                                    .get('http://localhost/recommend', {
                                        params: {
                                            mediaType: media,
                                            tmdbId: data.id,
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
                                    .get('http://localhost/recommend', {
                                        params: {
                                            mediaType: media,
                                            tmdbId: data.id,
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
                                    .get('http://localhost/favorite', {
                                        params: {
                                            mediaType: media,
                                            tmdbId: data.id,
                                        },
                                        withCredentials: true,
                                    })
                                    .then((response) => {
                                        if (response.data.code === 200) {
                                            setFavorite(!favorite)
                                        } else {
                                            // eslint-disable-next-line no-alert
                                            alert(response.data.error_message)
                                        }
                                    })
                            }}
                        >
                            <Favorite fill={favorite ? '#FFD700' : '#e5e5e5'} />
                        </button>
                    </div>
                </OutlineRight>
            </OutlineWrapper>
        )
    )
}

export default Outline
