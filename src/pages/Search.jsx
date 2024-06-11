import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ContentCard from '../components/ContentCard'
import { ContentList } from './Content'

const SearchWrapper = styled.main``

export default function Search() {
    const location = useLocation()
    const data = location.state

    return (
        data && (
            <SearchWrapper>
                {/* <div>person</div>
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
                </PeopleList> */}
                <div>movie</div>
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
                <div>tv</div>
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
