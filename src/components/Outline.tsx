import React from 'react'
import { styled } from 'styled-components'
import useGet, { ContentDetail } from '../utils/useGet'

const OutlineWrapper = styled.div`
    background-color: gray;
    height: 100%;
    display: flex;
    padding: 2.4vw 3vw;
`

const OutlineLeft = styled.img``
const OutlineRight = styled.div`
    flex: 1;
`

function Outline({ id }: { id: string }) {
    const { data, loading, error } = useGet<ContentDetail>(
        `https://api.themoviedb.org/3/movie/${id}`,
        { language: 'ko-KR' }
    ) as { data: ContentDetail; loading: boolean; error: null | Error }

    // eslint-disable-next-line no-console
    console.log({ data, loading, error })

    return (
        data && (
            <OutlineWrapper>
                <OutlineLeft
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt=""
                />

                <OutlineRight>
                    <div>{data.title}</div>
                    <div>{data.release_date}</div>
                    <ul>
                        {data.genres.map((el) => {
                            return <li key={el.name}>{el.name}</li>
                        })}
                    </ul>
                    <div>{data.runtime}</div>
                    <div>{data.vote_average.toFixed(1)}</div>
                    <div>{data.tagline}</div>
                    {data.overview && (
                        <>
                            <div>개요</div>
                            <div>{data.overview}</div>
                        </>
                    )}
                </OutlineRight>
            </OutlineWrapper>
        )
    )
}

export default Outline
