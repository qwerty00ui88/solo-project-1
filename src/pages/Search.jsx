import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ContentCard from '../components/ContentCard'
import { ContentList } from './Content'
import { semiboldWeight, xxlargeSize } from '../style/font'

const SearchWrapper = styled.main``

const Category = styled.h3`
    font-size: ${xxlargeSize};
    font-weight: ${semiboldWeight};
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
