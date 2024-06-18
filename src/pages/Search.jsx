import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ContentCard from '../components/search/ContentCard'
import { semiboldWeight, xxlargeSize } from '../style/font'

const SearchWrapper = styled.main``

const Category = styled.h3`
    font-size: ${xxlargeSize};
    font-weight: ${semiboldWeight};
`

const ContentList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 1.2rem;
`

export default function Search() {
    const location = useLocation()
    const data = location.state

    return (
        data && (
            <SearchWrapper>
                <Category>Movie</Category>
                <ContentList>
                    {data.movieList.map((el) => {
                        return (
                            <ContentCard
                                key={el.tmdbId}
                                id={String(el.id)}
                                data={el}
                                mediaType="movie"
                            />
                        )
                    })}
                </ContentList>
                <Category>TV</Category>
                <ContentList>
                    {data.tvList.map((el) => {
                        return (
                            <ContentCard
                                key={el.tmdbId}
                                id={String(el.id)}
                                data={el}
                                mediaType="tv"
                            />
                        )
                    })}
                </ContentList>
            </SearchWrapper>
        )
    )
}
