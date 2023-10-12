import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet, { ContentType, PersonType, SearchData } from '../utils/useGet'
import PersonCard from '../components/PersonCard'
import ContentCard from '../components/ContentCard'

const SearchWrapper = styled.div``

function Search() {
    const { word } = useParams()
    const { data } = useGet('https://api.themoviedb.org/3/search/multi', {
        language: 'ko-KR',
        query: word,
    }) as { data: SearchData }

    const person = data?.results.filter((el) => {
        return el.media_type === 'person'
    })

    const movie = data?.results.filter((el) => {
        return el.media_type === 'movie'
    })

    const tv = data?.results.filter((el) => {
        return el.media_type === 'tv'
    })

    return (
        data && (
            <SearchWrapper>
                <div>person</div>
                {person.map((el) => {
                    return (
                        <PersonCard
                            key={el.id}
                            id={String(el.id)}
                            data={el as PersonType}
                        />
                    )
                })}
                <div>movie</div>
                {movie.map((el) => {
                    return (
                        <ContentCard
                            key={el.id}
                            id={String(el.id)}
                            data={el as ContentType}
                            mediaType="movie"
                        />
                    )
                })}
                <div>tv</div>
                {tv.map((el) => {
                    return (
                        <ContentCard
                            key={el.id}
                            id={String(el.id)}
                            data={el as ContentType}
                            mediaType="tv"
                        />
                    )
                })}
            </SearchWrapper>
        )
    )
}

export default Search
