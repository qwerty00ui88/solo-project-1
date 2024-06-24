import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { semiboldWeight, xxlargeSize } from '../style/font'
import Poster from '../components/commons/Poster'
import { xlargeRadius } from '../style/border'

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
                            <Poster
                                key={el.tmdbId}
                                data={{ ...el, mediaType: 'movie' }}
                                width="15rem"
                                borderRadius={xlargeRadius}
                                description
                            />
                        )
                    })}
                </ContentList>
                <Category>TV</Category>
                <ContentList>
                    {data.tvList.map((el) => {
                        return (
                            <Poster
                                key={el.tmdbId}
                                data={{ ...el, mediaType: 'tv' }}
                                width="15rem"
                                borderRadius={xlargeRadius}
                                description
                            />
                        )
                    })}
                </ContentList>
            </SearchWrapper>
        )
    )
}
