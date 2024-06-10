import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet from '../utils/useGet'
import PersonCard from '../components/PersonCard'
import ContentCard from '../components/ContentCard'
import { ContentList, PeopleList } from './Content'

const SearchWrapper = styled.main``

export default function Search() {
    const { word } = useParams()
    const { data } = useGet('https://api.themoviedb.org/3/search/multi', {
        language: 'ko-KR',
        query: word,
    })

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
                <PeopleList>
                    {person.map((el) => {
                        return (
                            <PersonCard
                                key={el.id}
                                id={String(el.id)}
                                data={el}
                            />
                        )
                    })}
                </PeopleList>
                <div>movie</div>
                <ContentList>
                    {movie.map((el) => {
                        return (
                            <ContentCard
                                key={el.id}
                                id={String(el.id)}
                                data={el}
                                mediaType="movie"
                            />
                        )
                    })}
                </ContentList>
                <div>tv</div>
                <ContentList>
                    {tv.map((el) => {
                        return (
                            <ContentCard
                                key={el.id}
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
